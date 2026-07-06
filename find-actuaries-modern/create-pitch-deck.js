const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Find Actuaries';
pptx.title = 'Find Actuaries - 2026 Rebuild';

// Slide 1: Title
let slide = pptx.addSlide();
slide.addText('FIND ACTUARIES', { x: 0.5, y: 2.2, w: 9, h: 1, fontSize: 48, bold: true, color: '0EA5E9', align: 'center' });
slide.addText('The Professional Network for Actuaries', { x: 0.5, y: 3.3, w: 9, h: 0.6, fontSize: 22, color: '334155', align: 'center' });
slide.addText('Originally built in 2001  •  Reimagined for 2026', { x: 0.5, y: 4.1, w: 9, h: 0.5, fontSize: 16, color: '64748B', align: 'center' });

// Slide 2: The Problem
slide = pptx.addSlide();
slide.addText('The Problem', { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true });
slide.addText([
  { text: '• UK actuarial talent shortage is real and growing', options: { bullet: false } },
  { text: '• Hard exams + long qualification path + competition from data science roles', options: { bullet: false } },
  { text: '• IFoA provides excellent regulation & education, but limited modern career infrastructure', options: { bullet: false } },
  { text: '• Recruiters dominate hiring — high fees, limited direct connections', options: { bullet: false } },
  { text: '• Emerging needs in Climate, AI/ML, Cyber are not well served by traditional directories', options: { bullet: false } },
], { x: 0.5, y: 1.6, w: 9, h: 4, fontSize: 18, color: '334155' });

// Slide 3: The Solution
slide = pptx.addSlide();
slide.addText('Our Solution', { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true });
slide.addText('A modern, independent, member-driven platform that connects actuaries with opportunity and each other.', { x: 0.5, y: 1.4, w: 9, h: 0.8, fontSize: 18 });
slide.addText([
  { text: '✓ Verified Professional Directory with rich specialisms (Climate, AI, Cyber, etc.)', options: { bullet: false } },
  { text: '✓ Direct Job & Gig Marketplace (permanent + contract/freelance)', options: { bullet: false } },
  { text: '✓ Smart Mentoring Matching', options: { bullet: false } },
  { text: '✓ Hybrid Events + "Change Happens" innovation workshops', options: { bullet: false } },
  { text: '✓ Employer tools: Talent search, direct outreach, analytics', options: { bullet: false } },
], { x: 0.5, y: 2.4, w: 9, h: 3.5, fontSize: 17, color: '334155' });

// Slide 4: Why Now
slide = pptx.addSlide();
slide.addText('Why Now? (2026 Timing)', { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true });
slide.addText([
  { text: '• Talent shortage is acute — companies struggling to hire', options: { bullet: false } },
  { text: '• Profession is evolving fast (AI, Climate Risk, Data Science)', options: { bullet: false } },
  { text: '• Next generation of actuaries expects modern digital experiences', options: { bullet: false } },
  { text: '• LinkedIn is too noisy — professionals want depth + verification', options: { bullet: false } },
  { text: '• Original 2001 vision was correct. Technology has finally caught up.', options: { bullet: false } },
], { x: 0.5, y: 1.6, w: 9, h: 4, fontSize: 18, color: '334155' });

// Slide 5: Business Model
slide = pptx.addSlide();
slide.addText('Business Model', { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true });
slide.addText([
  { text: 'Freemium for Individuals', options: { bold: true } },
  { text: 'Basic directory & job access = Free', options: { bullet: false } },
  { text: 'Premium (£49–99/year): Advanced search, messaging, event access, profile boosts', options: { bullet: false } },
  { text: '', options: { bullet: false } },
  { text: 'Employers & Corporate', options: { bold: true } },
  { text: 'Job postings + featured listings (paid)', options: { bullet: false } },
  { text: 'Corporate subscriptions (tiered by size) for unlimited talent access', options: { bullet: false } },
  { text: 'Event sponsorships & branded content', options: { bullet: false } },
], { x: 0.5, y: 1.5, w: 9, h: 4.5, fontSize: 17, color: '334155' });

// Slide 6: Competitive Advantage
slide = pptx.addSlide();
slide.addText('Competitive Advantage', { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true });
slide.addText([
  { text: '• Deep domain focus on actuaries (unlike LinkedIn)', options: { bullet: false } },
  { text: '• More agile & modern UX than IFoA tools', options: { bullet: false } },
  { text: '• Strong contract/freelance & mentoring focus (underserved)', options: { bullet: false } },
  { text: '• Independent positioning — complementary, not competing with IFoA', options: { bullet: false } },
  { text: '• First-mover advantage on AI-powered matching for the profession', options: { bullet: false } },
  { text: '• Proven original vision from 2001 with real heritage', options: { bullet: false } },
], { x: 0.5, y: 1.6, w: 9, h: 4, fontSize: 17, color: '334155' });

// Slide 7: Traction & Roadmap
slide = pptx.addSlide();
slide.addText('Roadmap & Traction', { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true });
slide.addText([
  { text: 'Phase 1 (Current)', options: { bold: true } },
  { text: 'Modern web platform with Directory + Jobs + Events + Mentoring (MVP complete)', options: { bullet: false } },
  { text: '', options: { bullet: false } },
  { text: 'Phase 2 (Next 6 months)', options: { bold: true } },
  { text: 'Real auth (LinkedIn), payments, advanced search, employer tools', options: { bullet: false } },
  { text: '', options: { bullet: false } },
  { text: 'Phase 3 (12 months)', options: { bold: true } },
  { text: 'AI matching engine, mobile app, API for partners, global expansion', options: { bullet: false } },
], { x: 0.5, y: 1.5, w: 9, h: 4.5, fontSize: 17, color: '334155' });

// Slide 8: The Ask
slide = pptx.addSlide();
slide.addText('The Ask', { x: 0.5, y: 0.5, w: 9, h: 0.8, fontSize: 32, bold: true });
slide.addText('We are seeking seed funding / strategic partnership to accelerate the rebuild and capture this clear market opportunity.', { x: 0.5, y: 1.5, w: 9, h: 1, fontSize: 18 });
slide.addText([
  { text: 'Use of Funds:', options: { bold: true } },
  { text: '• Engineering & AI development', options: { bullet: false } },
  { text: '• Marketing to actuarial community & employers', options: { bullet: false } },
  { text: '• Operations & compliance (GDPR, data security)', options: { bullet: false } },
  { text: '• Key hires (Community, Product, Growth)', options: { bullet: false } },
], { x: 0.5, y: 2.8, w: 9, h: 3, fontSize: 17, color: '334155' });

// Slide 9: Closing
slide = pptx.addSlide();
slide.addText('Find Actuaries', { x: 0.5, y: 2.0, w: 9, h: 1, fontSize: 40, bold: true, color: '0EA5E9', align: 'center' });
slide.addText('We were ahead of our time in 2001.\nWe are exactly on time in 2026.', { x: 0.5, y: 3.3, w: 9, h: 1.2, fontSize: 20, color: '334155', align: 'center' });
slide.addText('Let\'s build the future of the actuarial profession together.', { x: 0.5, y: 4.8, w: 9, h: 0.6, fontSize: 16, color: '64748B', align: 'center' });

pptx.writeFile({ fileName: '/home/workdir/artifacts/Find_Actuaries_2026_Pitch_Deck.pptx' })
  .then(() => console.log('Pitch deck created successfully!'))
  .catch(err => console.error(err));
