const items = [
  "Cyber Security",
  "Cloud Security",
  "Application Security",
  "AI Security",
  "Decision Security Engineering"
];

export default function Evolution() {
  return (
    <section className="bg-[#05070D] py-32">
      <div className="mx-auto max-w-6xl px-8">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Evolution
        </p>

        <h2 className="mb-6 text-5xl font-bold">
          The Evolution of Security
        </h2>

        <p className="mb-16 max-w-3xl text-xl leading-9 text-slate-400">
          Every major technology shift created a new security discipline.
          Autonomous AI requires protecting decisions before execution.
        </p>

        <div className="space-y-6">

          {items.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 transition hover:border-sky-500 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between">

                <span className="text-2xl font-semibold">
                  {item}
                </span>

                {index !== items.length - 1 && (
                  <span className="text-3xl text-sky-400">
                    ↓
                  </span>
                )}

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
