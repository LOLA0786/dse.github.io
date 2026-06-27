# 7. The Decision Integrity Engine and the Precedence Model

The preceding chapters established *why* autonomous decisions require a dedicated
runtime validation layer, and *what* evidence that layer should consider. This
chapter makes the paper's central engineering claim concrete. It is not enough to
assert that a runtime layer should "aggregate multiple sources of evidence" —
that statement is true of almost any monitoring system and commits to nothing.
The contribution of Decision Security Engineering is a *specific, opinionated
rule* for how heterogeneous evidence is combined into a single enforcement
verdict, together with the architectural separation that makes that rule
auditable and extensible.

We state that rule as the **Deterministic Precedence Model**, defend each of its
ordering decisions, and demonstrate it on a worked example produced by the
reference implementation.

---

## 7.1 The Core Problem: Combining Incommensurable Evidence

A runtime decision layer receives evidence of fundamentally different *kinds*:

- **Deterministic contracts** — rules that are true or false with no uncertainty
  (e.g. "a money-movement action may not directly follow an outbound email").
  These derive from written policy and segregation-of-duties requirements.
- **Authorization state** — whether a capability is part of an agent's
  established baseline or is covered by an explicit, current change-management
  grant. This is also deterministic, but distinct from contracts: it concerns
  *legitimacy of capability*, not *legitimacy of sequence*.
- **Learned behavioral evidence** — a probabilistic drift score indicating how
  far a proposed action departs from the agent's learned profile (Agent DNA,
  Chapter 6). This signal is inherently uncertain; it can be wrong in both
  directions.

The central design question is: **when these signals disagree, which wins?**

A naïve approach combines them into a weighted risk score. We argue this is the
wrong design for a security control. A weighted sum allows a confident learned
signal to numerically outvote a deterministic contract, or allows an
authorization grant to suppress a genuine anomaly. It also produces verdicts that
cannot be explained in one sentence, because the output is an opaque aggregate
rather than an attributable decision. For a control operating in regulated
environments, both properties are disqualifying.

We therefore reject score-blending in favor of **strict lexical precedence**.

---

## 7.2 Separation of Concerns: Detectors Versus Orchestrator

Before stating the precedence rule, we fix an architectural boundary that the
rest of the chapter depends upon.

Each evidence source is produced by a **single-responsibility detector** that
answers exactly one question and emits no verdict:

| Detector | The single question it answers |
| --- | --- |
| Drift Scorer (Agent DNA) | *How behaviorally unusual is this action?* |
| Invariant Engine | *Does this action violate a deterministic contract?* |
| Authorization Policy | *Is this capability authorized — baseline or active grant?* |

No detector decides whether the action executes. That responsibility belongs to a
distinct component, the **Decision Integrity Engine (DIE)**, whose sole function
is to apply precedence. The DIE contains no detection logic of its own.

This separation is a deliberate engineering commitment, not an incidental
implementation detail. It yields three properties:

1. **Detectors remain independently testable and replaceable.** An organization
   may substitute its own invariant engine or authorization model without
   touching the orchestrator, provided the detector satisfies a minimal
   structural interface.
2. **Precedence logic is verified in isolation.** Because the engine's verdict is
   a pure function of pre-computed detector outputs, its correctness can be
   established by exhaustively testing the ordering rule against synthetic
   inputs, independent of any detector's internals.
3. **New evidence sources extend the system at one point.** Future signals —
   identity confidence, environmental risk, prior-incident history, human
   approval state — are folded into the precedence rule without modifying the
   detectors that already exist.

---

## 7.3 The Deterministic Precedence Model

Let a proposed action *a* be evaluated against:

- *I(a)* — invariant violation, a Boolean from the deterministic contract set;
- *Auth(a)* — authorization status, `authorized` iff *a*'s capability is in the
  trusted baseline or covered by an active grant;
- *D(a)* — the drift score in [0, 1] from Agent DNA, with enforcement threshold
  *τ*.

The Decision Integrity Engine produces a verdict in {ALLOW, REQUIRE_APPROVAL,
BLOCK} by the following strictly ordered rule:

```
1.  if I(a) is true:                 return BLOCK            (triggered_by = invariant)
2.  else if Auth(a) is unauthorized: return REQUIRE_APPROVAL (triggered_by = authorization)
3.  else if D(a) >= τ:               return REQUIRE_APPROVAL (triggered_by = drift)
4.  else:                            return ALLOW            (triggered_by = baseline)
```

The rule evaluates top to bottom and returns at the first match. Every verdict
therefore carries exactly one `triggered_by` attribution: the highest-precedence
condition that fired. This single field is what makes each decision explainable
and auditable — the verdict is never an aggregate, always an attribution.

From this ordering follow four properties that constitute the model's defended
guarantees.

**P1 — Deterministic dominance.** A deterministic contract violation yields BLOCK
regardless of every other signal. No learned score, however confident, and no
authorization grant, however legitimate, can override a contract. Deterministic
policy is the floor.

**P2 — Monotonic escalation (the learned layer may only raise scrutiny).** The
drift signal appears only at step 3, after the deterministic checks. It can
escalate an otherwise-permitted action to human approval, but it can never (a)
produce a BLOCK on its own, nor (b) relax a higher-precedence finding to ALLOW.
The probabilistic component can add caution; it can never remove it.

**P3 — Single-reason attribution.** Because evaluation halts at the first match,
each verdict is explained by precisely one reason. This is what permits a
one-sentence justification for every decision and a deterministic audit trail.

**P4 — Orchestrator neutrality.** The engine introduces no detection logic.
Its output depends only on the three detector results, so its behavior is fully
determined by — and only by — the precedence rule.

---

## 7.4 Defense of the Ordering

The properties above depend on the *specific* order of the four rules. We defend
each boundary.

**Why invariants outrank everything (rule 1 first).** Invariants encode
prohibitions that are never legitimate in any context — true segregation-of-duties
violations sourced from written policy. Their defining characteristic is the
absence of a benign case. A signal with no benign case must not be subordinated
to a probabilistic signal that can be wrong, nor excused by an authorization
grant that speaks only to capability legitimacy and not to sequence legitimacy.
Placing invariants first is what lets the learned layer remain advisory without
weakening enforcement: the system can afford an uncertain Agent DNA signal
precisely because the deterministic floor sits above it.

This also yields a clean allocation test for system designers: *if a candidate
rule has any legitimate exception, it is not an invariant.* Anything
sometimes-legitimate belongs in the drift layer, which escalates rather than
blocks. Mis-placing a fuzzy rule into the invariant layer is the principal cause
of over-enforcement, and the precedence model makes that error structurally
visible.

**Why authorization outranks drift (rule 2 before rule 3).** Authorization and
drift answer different questions, and conflating them produces the contradiction
this model is designed to resolve. A newly granted capability is, by definition,
*novel* to the learned profile — Agent DNA has never observed it, so it will
score as high drift. If drift were checked first, every legitimately authorized
new capability would be treated as an anomaly, producing exactly the
false-positive flood that causes operators to disable a control. Checking
authorization first lets a grant *explain the novelty* — the capability is not
treated as unauthorized — while still permitting the drift check to act on
*anomalous use* of that capability. The two checks are complementary, not
redundant, and their order is what makes them so.

**Why drift escalates rather than blocks (rule 3 returns REQUIRE_APPROVAL, not
BLOCK).** The drift score is a learned, probabilistic quantity calibrated against
a finite trace history. It is the signal most subject to error from
undersampling, legitimate behavioral evolution, and adversarial manipulation of
the profile. A signal with this error profile should never unilaterally block
production work; it should route to human judgment. Reserving BLOCK for the
deterministic layer keeps the cost of a learned false positive bounded at "a
human reviews an action" rather than "legitimate work is denied."

---

## 7.5 Worked Example

We illustrate the model on a single agent session produced by the reference
implementation. A sales-support agent is profiled on its trusted routine
(reading, enriching, and updating CRM records; sending routine email; scheduling
calendar events). The capability `storage.bulk_export` has been authorized
through change ticket OPS-842; the capability `payments.initiate_wire` has *not*
been granted. Two deterministic contracts are in force, including: *a
money-movement action may not directly follow an outbound email.*

The agent is then driven by a prompt-injection that, after a benign opening,
attempts data exfiltration and an unauthorized transfer. Each action is evaluated
independently by the three detectors, and the Decision Integrity Engine applies
the precedence rule. The verdicts below are the engine's actual output.

| # | Action | Authorized? | Drift *D(a)* | Invariant? | Verdict | Triggered by |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `crm.read_contact` | baseline | 0.00 | no | ALLOW | baseline |
| 2 | `crm.enrich_contact` | baseline | 0.00 | no | ALLOW | baseline |
| 3 | `crm.update_contact` | baseline | 0.00 | no | ALLOW | baseline |
| 4 | `storage.bulk_export` | grant OPS-842 | 0.90 | no | REQUIRE_APPROVAL | drift |
| 5 | `email.send` (novel recipient) | baseline | 0.90 | no | REQUIRE_APPROVAL | drift |
| 6 | `payments.initiate_wire` | **unauthorized** | 0.90 | **yes** | BLOCK | invariant |

Three rows carry the argument of the chapter.

**Row 4 resolves the authorization/drift contradiction.** `storage.bulk_export`
is authorized — ticket OPS-842 explains why a capability absent from the learned
baseline is nonetheless legitimate — so rule 2 does not fire. But the action's
runtime behavior is still anomalous (a never-before-seen capability moving 50,000
records to an external destination), so rule 3 escalates it to human review. The
grant explains the *novelty*; the drift signal still escalates the *anomaly*.
A system that treated authorization and drift as a single signal would be forced
to call this action either "fine" (suppressing a real anomaly) or "critical"
(crying wolf on an approved capability). The precedence model returns the correct
and explainable verdict: authorized, but escalated for review.

**Row 5 shows the learned layer doing its intended job.** `email.send` is a
baseline capability used with an anomalous argument (an unfamiliar external
recipient). No contract is violated and the capability is authorized, so the
deterministic checks pass; the drift signal alone escalates to approval. This is
P2 in action — the learned layer raising scrutiny without blocking.

**Row 6 demonstrates deterministic dominance (P1).** `payments.initiate_wire` is
*simultaneously* unauthorized (rule 2 would fire) and high-drift (rule 3 would
fire) — yet the verdict is BLOCK, attributed to the invariant, because the
money-movement-after-email contract is violated and invariants outrank
everything. The two weaker findings are subsumed by the deterministic one. The
attribution names the strongest reason, which is also the one an auditor needs.

Each verdict additionally carries the underlying detector evidence — for the
drift escalations, the decomposed reasons ("capability never observed in trusted
profile"; "recipient domain never seen for this capability"; "argument outside
trusted numeric range") — preserved in the decision record (Chapter 8) so the
verdict can be reconstructed and reviewed.

---

## 7.6 Scope and Honest Limitations of the Example

This worked example is generated on **synthetic execution traces**. It
demonstrates that the precedence mechanism produces correct, attributable
verdicts given detector outputs; it does *not* establish detection accuracy on
production workloads. Two boundaries must be stated explicitly:

- The drift values shown (0.00, 0.90) and the enforcement threshold *τ* are
  illustrative. On real traces, *τ* should be derived from the trusted-score
  distribution (e.g. a high percentile of held-out normal behavior) and set
  per-capability rather than globally, and enforcement should be gated by profile
  confidence so that thinly-sampled profiles do not over-flag. These calibration
  mechanisms are buildable independently of the precedence model, but their
  *values* require empirical trace data and are future work (Chapter 10.8).
- The precedence *rule* is the contribution this section defends, and its
  correctness does not depend on the realism of the traces: it is a deterministic
  function of detector outputs, exhaustively testable, and independent of how
  those outputs were produced. What synthetic data cannot yet establish is the
  false-positive/false-negative profile of the *detectors* feeding it.

We make this separation deliberately. The architecture — single-responsibility
detectors beneath a neutral orchestrator applying strict precedence — is
demonstrated. The empirical operating point is not, and is not claimed.

---

## 7.7 Summary

The Decision Integrity Engine's contribution is not that it considers multiple
signals — every comparable system does — but *how* it reconciles them: by strict
lexical precedence in which deterministic contracts dominate, authorization
explains legitimate novelty, the learned layer may only escalate, and every
verdict is attributable to a single reason. The architectural separation of
single-purpose detectors from a neutral orchestrator makes this rule verifiable
in isolation and extensible at one point. The worked example shows the rule
resolving cases — most importantly the authorized-but-anomalous case — that a
score-blending design cannot resolve coherently. This precedence model, rather
than the framework taxonomy that surrounds it, is the defensible core of Decision
Security Engineering.
