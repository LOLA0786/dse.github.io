export default function Architecture(){

const pipeline=[
"User",
"AI Agent",
"Decision Integrity Engine",
"Agent DNA",
"Policy Engine",
"Consensus",
"Execution",
"Immutable Audit Ledger"
];

return(

<section className="py-36 bg-[#05070D]">

<div className="mx-auto max-w-7xl px-8">

<p className="uppercase tracking-[0.3em] text-sky-400 text-sm font-semibold mb-4">

Reference Architecture

</p>

<h2 className="text-5xl font-bold mb-8">

The Runtime Decision Pipeline

</h2>

<p className="max-w-4xl text-xl text-slate-400 leading-9 mb-20">

Every autonomous decision flows through a validation pipeline
before execution. The objective is not only to detect attacks,
but to determine whether the action should execute at all.

</p>

<div className="grid lg:grid-cols-2 gap-20 items-center">

<div className="space-y-4">

{pipeline.map((item,index)=>(

<div key={item}>

<div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center text-xl font-semibold hover:border-sky-400 transition">

{item}

</div>

{index!==pipeline.length-1 &&

<div className="text-center text-sky-400 text-3xl py-2">

↓

</div>

}

</div>

))}

</div>

<div>

<div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-10">

<h3 className="text-3xl font-bold mb-8">

Decision Security Layer

</h3>

<div className="space-y-6 text-lg text-slate-300">

<div>

<strong className="text-sky-400">

Intent Integrity

</strong>

<p>

Validate that execution remains aligned with the originating user request.

</p>

</div>

<div>

<strong className="text-sky-400">

Agent DNA

</strong>

<p>

Detect behavioral mutations against learned runtime invariants.

</p>

</div>

<div>

<strong className="text-sky-400">

Runtime Policy

</strong>

<p>

Evaluate organizational policy before execution.

</p>

</div>

<div>

<strong className="text-sky-400">

Decision Lineage

</strong>

<p>

Record immutable evidence for deterministic replay.

</p>

</div>

</div>

</div>

</div>

</div>

</div>

</section>

);

}
