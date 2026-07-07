export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tighter mb-6">Contact</h1>
      <div className="prose prose-slate max-w-none space-y-5 text-slate-700">
        <p>
          This platform is currently in a closed testing phase, ahead of real activation
          targeted for July/August 2027. For anything related to Find Actuaries or 3E
          Foundation — partnership enquiries, feedback on this test build, or general
          questions — reach out directly:
        </p>
        <p>
          <a href="mailto:admin@findactuaries.com" className="text-primary-600 font-medium underline underline-offset-2">
            admin@findactuaries.com
          </a>
        </p>
      </div>
    </div>
  );
}
