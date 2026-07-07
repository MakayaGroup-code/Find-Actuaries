export default function CorporateMembershipPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tighter mb-6">Corporate Membership</h1>
      <div className="prose prose-slate max-w-none space-y-5 text-slate-700">
        <p>
          Corporate membership — ongoing, structured access to the directory and mentoring
          pipeline for insurers, pension administrators, and consultancies — is being designed
          alongside the mentoring build, not yet live.
        </p>
        <p>
          If your organisation is interested in what this could look like, get in touch directly
          rather than waiting for a self-serve sign-up: {' '}
          <a href="mailto:admin@findactuaries.com" className="text-primary-600 font-medium underline underline-offset-2">
            admin@findactuaries.com
          </a>
        </p>
      </div>
    </div>
  );
}
