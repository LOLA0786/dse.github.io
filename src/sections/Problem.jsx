export default function Problem(){

return(

<section className="bg-slate-950 py-32">

<div className="mx-auto max-w-7xl px-8">

<p className="mb-4 uppercase tracking-[0.3em] text-sm font-semibold text-sky-400">

The Problem

</p>

<h2 className="text-5xl font-bold mb-8">

AI Security Stops Too Late.

</h2>

<p className="max-w-4xl text-xl text-slate-400 leading-9 mb-20">

Today's AI security primarily protects infrastructure,
models and APIs. Once an autonomous agent decides to
execute an action, very few systems verify whether the
decision itself is still trustworthy.

Decision Security Engineering introduces a runtime layer
that validates intent, policy, trust and behavioral
integrity before execution.

</p>

<div className="grid md:grid-cols-2 gap-10">

<div className="rounded-2xl border border-red-800 bg-red-950/20 p-10">

<h3 className="text-3xl font-bold mb-6">

Traditional AI Security

</h3>

<ul className="space-y-4 text-slate-300">

<li>✓ Protects APIs</li>

<li>✓ Protects infrastructure</li>

<li>✓ Protects prompts</li>

<li>✓ Detects attacks</li>

<li>✗ Doesn't validate autonomous decisions</li>

</ul>

</div>

<div className="rounded-2xl border border-sky-700 bg-sky-950/20 p-10">

<h3 className="text-3xl font-bold mb-6">

Decision Security Engineering

</h3>

<ul className="space-y-4 text-slate-300">

<li>✓ Intent validation</li>

<li>✓ Behavioral integrity</li>

<li>✓ Runtime trust scoring</li>

<li>✓ Policy enforcement</li>

<li>✓ Decision validation before execution</li>

</ul>

</div>

</div>

</div>

</section>

);

}
