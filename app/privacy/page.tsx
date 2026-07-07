export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tighter mb-2">Privacy &amp; Data</h1>
      <p className="text-sm text-slate-500 mb-8">Test-phase position — last updated July 2026. This is not a final production policy.</p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Where things stand right now</h2>
          <p>
            This site is currently a closed test build, shared only with a small, named group.
            <strong> No database is connected.</strong> The eligibility and pathway results shown
            on the mentoring application forms are computed in your own browser, in real time —
            that logic does not depend on any server.
          </p>
          <p>
            For this test round only, submitting either mentoring form also sends what you entered
            to Formspree, a third-party form-processing service, which emails it to the person
            running this test so submissions can be reviewed afterward. This is a deliberate,
            temporary measure for testing — not a production database, not used for matching or
            assignment, and not retained beyond this test round.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">What will apply once real data collection begins</h2>
          <p>
            Ahead of real activation, targeted for July/August 2027, Find Actuaries Limited will
            register as data controller with Nigeria's NDPC, and a proper database — not a
            third-party form-notification service — will handle real applications. Data protection
            will be addressed on each jurisdiction's own terms, not a single blended policy:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Nigeria — Nigeria Data Protection Act 2023</li>
            <li>Kenya — Data Protection Act 2019</li>
            <li>Ghana — Data Protection Act 2012</li>
          </ul>
          <p>
            Hosting infrastructure is based in the United States. Once real applications are
            collected, this will constitute a cross-border data transfer under all three regimes
            above, and will be disclosed and consented to explicitly at the point of application —
            not assumed or buried in general terms.
          </p>
          <p>
            Applicants must be 18 or older, with no exception, regardless of local university
            entry-age norms — this removes an entire category of minors'-data handling
            requirements by policy rather than needing to manage them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">This test phase, specifically</h2>
          <p>
            Access to this build is limited to people who have been given the link directly. It is
            not indexed, not linked from findactuaries.com, and not intended for public use. If you
            were given access to test it, please treat it as an authorised engagement only — not a
            live service.
          </p>
        </section>
      </div>
    </div>
  );
}
