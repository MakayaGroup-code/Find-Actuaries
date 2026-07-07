// Password strength scoring aligned with NIST SP 800-63B guidance, which is
// the current authoritative standard and deliberately different from older
// "must have 1 uppercase, 1 number, 1 symbol" rules.
//
// The key point those older rules get wrong: composition requirements are a
// poor proxy for actual crackability. "P@ssw0rd1" satisfies every classic
// composition rule and still gets cracked in under a second, because it's a
// known pattern. A long, unusual passphrase with no symbols at all can be
// far stronger. So this scorer weights three things, in this order of
// importance:
//   1. Is it a known/common password, or a trivial variant of one? If so,
//      it's Very Weak regardless of length or character variety — this
//      matters more than anything else below.
//   2. Does it contain the user's own name or email? Trivially guessable
//      by anyone who knows the account holder, regardless of complexity.
//   3. Actual entropy: length x log2(character pool size), which is what
//      composition rules were always a rough, worse proxy for anyway.

export type StrengthTier = 'very_weak' | 'weak' | 'fair' | 'strong' | 'very_strong';

export interface StrengthResult {
  tier: StrengthTier;
  label: string;
  score: number; // 0-100, for the visual meter
  reasons: string[];
}

// A deliberately compact list of the most common breached/guessable
// passwords. Real production systems should check against a much larger
// corpus (e.g. the "Have I Been Pwned" Pwned Passwords API, which checks
// hundreds of millions of breached passwords without ever sending the
// actual password over the network via k-anonymity) — this list exists so
// the logic and its reasoning are visible and auditable in this codebase,
// not to replace that.
const COMMON_PASSWORDS = new Set([
  '123456', '123456789', 'qwerty', 'password', '12345', '12345678',
  '111111', '123123', '1234567890', '1234567', 'qwerty123', '000000',
  'iloveyou', '1q2w3e4r', 'qwertyuiop', '123', 'monkey', 'dragon',
  'letmein', 'trustno1', 'baseball', 'football', 'shadow', 'master',
  'jennifer', 'jordan', 'superman', 'harley', 'password1', 'password123',
  'admin', 'welcome', 'login', 'abc123', 'starwars', 'freedom', 'whatever',
  'qazwsx', 'zaq1zaq1', 'passw0rd', 'p@ssword', 'p@ssw0rd', 'access',
  'flower', 'hottie', 'loveme', 'jesus', 'ninja', 'mustang', 'princess',
  'solo', 'batman', 'daniel', 'hannah', 'summer', 'michael', 'charlie',
  '654321', 'sunshine', 'iloveyou1', 'nigeria', 'lagos', 'nigeria123',
  'actuary', 'actuary123', 'findactuaries',
]);

// Common keyboard-walk and repeated-character patterns worth catching
// even when not in the exact blocklist above.
function hasObviousPattern(pw: string): boolean {
  const lower = pw.toLowerCase();
  const walks = ['qwerty', 'asdf', 'zxcv', '1234', '2345', '3456', '4567', '5678', '6789', '0987', '9876'];
  if (walks.some(w => lower.includes(w))) return true;
  if (/(.)\1{2,}/.test(pw)) return true; // 3+ repeated chars in a row, e.g. "aaa"
  return false;
}

// Reverses common leetspeak substitutions so "P@ssw0rd1" is recognised as a
// variant of "password" rather than scored purely on raw entropy, which
// would otherwise treat it as reasonably strong just for having mixed
// character classes.
function normalizeLeetspeak(pw: string): string {
  return pw
    .toLowerCase()
    .replace(/@/g, 'a')
    .replace(/[013457\$]/g, ch => ({ '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '$': 's' } as Record<string, string>)[ch] || ch);
}

function matchesCommonPassword(password: string): boolean {
  const lower = password.toLowerCase();
  if (COMMON_PASSWORDS.has(lower)) return true;

  // Strip trailing digits from the raw password first — catches
  // "password1", "password123" as a literal numeral suffix, before any
  // leetspeak substitution has a chance to consume that trailing digit as
  // a letter instead (e.g. "1" -> "i"), which would hide the match.
  const rawStripped = lower.replace(/[0-9]+$/, '');
  if (rawStripped.length >= 4 && COMMON_PASSWORDS.has(rawStripped)) return true;

  // Then separately try leetspeak normalization, for symbol/digit-as-letter
  // substitutions like "P@ssw0rd" -> "password".
  const normalized = normalizeLeetspeak(password);
  if (COMMON_PASSWORDS.has(normalized)) return true;
  const normStripped = normalized.replace(/[0-9]+$/, '');
  if (normStripped.length >= 4 && COMMON_PASSWORDS.has(normStripped)) return true;

  return false;
}

const TIER_ORDER: StrengthTier[] = ['very_weak', 'weak', 'fair', 'strong', 'very_strong'];

function shiftTierDown(tier: StrengthTier, steps: number): StrengthTier {
  const idx = Math.max(0, TIER_ORDER.indexOf(tier) - steps);
  return TIER_ORDER[idx];
}

function containsPersonalInfo(pw: string, email?: string, name?: string): boolean {
  const lower = pw.toLowerCase();
  if (email) {
    const localPart = email.split('@')[0].toLowerCase();
    if (localPart.length >= 3 && lower.includes(localPart)) return true;
  }
  if (name) {
    const parts = name.toLowerCase().split(/\s+/).filter(p => p.length >= 3);
    if (parts.some(p => lower.includes(p))) return true;
  }
  return false;
}

function estimateEntropyBits(pw: string): number {
  let poolSize = 0;
  if (/[a-z]/.test(pw)) poolSize += 26;
  if (/[A-Z]/.test(pw)) poolSize += 26;
  if (/[0-9]/.test(pw)) poolSize += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) poolSize += 32;
  if (poolSize === 0) return 0;
  return pw.length * Math.log2(poolSize);
}

export function calculatePasswordStrength(
  password: string,
  email?: string,
  name?: string
): StrengthResult {
  if (!password) {
    return { tier: 'very_weak', label: 'Enter a password', score: 0, reasons: [] };
  }

  const reasons: string[] = [];

  // Gate 1: known/common password, including leetspeak variants and common
  // word-plus-digits patterns — overrides everything else below.
  if (matchesCommonPassword(password)) {
    return {
      tier: 'very_weak',
      label: 'Very weak — this is a known common password or a trivial variant of one',
      score: 5,
      reasons: ['Matches or closely resembles a password on common breach lists — crackable instantly regardless of length'],
    };
  }

  const obviousPattern = hasObviousPattern(password);
  if (obviousPattern) {
    reasons.push('Contains a keyboard-walk or repeated-character pattern');
  }

  // Gate 2: personal information.
  const hasPersonalInfo = containsPersonalInfo(password, email, name);
  if (hasPersonalInfo) {
    reasons.push('Contains your name or email — guessable by anyone who knows you');
  }

  // Gate 3: actual entropy, length-weighted per NIST 800-63B guidance
  // rather than composition-rule box-checking.
  const bits = estimateEntropyBits(password);
  if (password.length < 8) {
    reasons.push('Under 8 characters — NIST 800-63B treats this as the practical minimum');
  }

  let tier: StrengthTier;
  let score: number;

  if (bits < 28 || password.length < 8) {
    tier = 'very_weak'; score = 15;
  } else if (bits < 36) {
    tier = 'weak'; score = 35;
  } else if (bits < 60) {
    tier = 'fair'; score = 55;
  } else if (bits < 80) {
    tier = 'strong'; score = 78;
  } else {
    tier = 'very_strong'; score = 95;
  }

  // Penalties shift the tier DOWN from wherever entropy actually landed —
  // not just cap the top end. A password that scores "Fair" on raw entropy
  // but repeats one character, or contains your own name, is not actually
  // Fair; it needs to drop further, the same as a "Strong" one would.
  if (obviousPattern) {
    tier = shiftTierDown(tier, 2);
    score = Math.max(5, score - 40);
  }
  if (hasPersonalInfo) {
    tier = shiftTierDown(tier, 2);
    score = Math.max(5, score - 40);
  }

  const labels: Record<StrengthTier, string> = {
    very_weak: 'Very weak',
    weak: 'Weak',
    fair: 'Fair',
    strong: 'Strong',
    very_strong: 'Very strong',
  };

  return { tier, label: labels[tier], score, reasons };
}
