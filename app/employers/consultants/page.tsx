import Link from 'next/link';

export default function FindConsultantsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tighter mb-6">Find Consultants</h1>
      <div className="prose prose-slate max-w-none space-y-5 text-slate-700">
        <p>
          Independent and contract actuarial consultants are part of the same directory as
          permanent-role professionals, not a separate list. Filter by availability once you're
          in the directory to find people open to contract or freelance work specifically.
        </p>
        <p>
          <Link href="/directory" className="text-primary-600 font-medium underline underline-offset-2">
            Go to the Directory →
          </Link>
        </p>
      </div>
    </div>
  );
}
