export default function Hero() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 via-[#05070D] to-[#05070D] px-6 pt-24">

      <div className="max-w-6xl text-center">

        <div className="mb-8 inline-block rounded-full border border-sky-700 bg-sky-950/40 px-5 py-2 text-sm tracking-[0.25em] text-sky-300">
          INTRODUCING A NEW ENGINEERING DISCIPLINE
        </div>

        <h1 className="text-7xl font-extrabold leading-tight md:text-8xl">
          Engineering Trust
          <br />
          Before Execution.
        </h1>

        <p className="mx-auto mt-10 max-w-4xl text-2xl leading-10 text-slate-400">
          Decision Security Engineering is an open engineering framework
          for protecting autonomous AI decisions before they execute.
        </p>

        <div className="mt-14 flex justify-center gap-6">
          <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-500">
            Read Whitepaper
          </button>

          <button className="rounded-xl border border-slate-700 px-8 py-4 text-lg hover:border-sky-400">
            Explore Framework
          </button>
        </div>

      </div>

    </section>
  );
}
