# 3. Existing Landscape

The rapid adoption of autonomous AI systems has accelerated research across multiple disciplines including AI security, AI safety, AI governance, agent observability, runtime monitoring, policy enforcement, and identity management. Each of these fields addresses an important aspect of trustworthy AI deployment. However, they focus on different engineering problems and operate at different stages of an autonomous system's lifecycle.

This chapter surveys the current landscape and identifies the engineering gap that motivates Decision Security Engineering.

---

## 3.1 AI Security

AI security focuses on protecting artificial intelligence systems from malicious attacks against models, data, infrastructure, and inference pipelines.

Typical concerns include:

- Prompt injection
- Data poisoning
- Model theft
- Model inversion
- Adversarial examples
- Jailbreak attacks
- Tool abuse
- API security

The objective of AI security is to ensure that AI systems remain secure, reliable, and resilient against external threats.

While AI security protects models and infrastructure, it generally does not determine whether an autonomous decision remains appropriate immediately before execution.

---

## 3.2 AI Safety

AI safety studies methods for ensuring that AI systems behave in ways consistent with human values and intended objectives.

Research areas include:

- Alignment
- Reward modeling
- Constitutional AI
- Reinforcement learning from human feedback (RLHF)
- Interpretability
- Robustness
- Safe deployment

AI safety primarily addresses long-term behavior, alignment, and reliability.

Decision Security Engineering complements AI safety by introducing runtime engineering controls for operational decision validation.

---

## 3.3 AI Governance

AI governance establishes organizational processes, accountability, compliance, and regulatory oversight for AI deployment.

Typical governance activities include:

- Risk assessment
- Model approval
- Audit requirements
- Human oversight
- Regulatory compliance
- Policy definition
- Documentation

Governance defines what organizations expect autonomous systems to do.

Decision Security Engineering focuses on enforcing those expectations during runtime execution.

---

## 3.4 Agent Observability

Agent observability platforms collect telemetry from autonomous systems.

Typical capabilities include:

- Execution traces
- Logs
- Metrics
- Tool histories
- Conversation replay
- Performance monitoring

These systems improve visibility into autonomous behavior.

However, observability primarily answers questions after execution has occurred.

Examples include:

- What happened?
- Which tools executed?
- How long did execution take?
- Which agent made the decision?

Decision Security Engineering introduces controls before execution rather than analysis afterward.

---

## 3.5 Runtime Monitoring

Runtime monitoring continuously observes system health and operational status.

Examples include:

- Infrastructure monitoring
- API monitoring
- Latency monitoring
- Error detection
- Resource utilization
- Service availability

Runtime monitoring detects failures and abnormal behavior.

Decision Security Engineering evaluates whether an autonomous decision should execute before runtime side effects occur.

---

## 3.6 Identity and Access Management

Identity and Access Management (IAM) verifies identities and controls access to protected resources.

IAM determines:

- Who is requesting access?
- Which permissions are available?
- Which resources may be accessed?

Authentication and authorization remain essential security controls.

However, an authenticated autonomous agent may still make an unsafe decision.

Decision Security Engineering evaluates the correctness of the proposed decision in addition to the identity of the requesting agent.

---

## 3.7 Policy Engines

Policy engines evaluate organizational rules before allowing specific actions.

Examples include:

- Role-based access control
- Attribute-based access control
- Policy-as-code
- Compliance enforcement

Policy engines answer questions such as:

- Is this action permitted?
- Does it violate organizational policy?

Decision Security Engineering incorporates policy evaluation as one component of a broader runtime decision validation pipeline.

---

## 3.8 The Engineering Gap

Existing disciplines collectively provide strong protection for infrastructure, models, identities, governance processes, and operational visibility.

However, autonomous AI systems introduce a new engineering question:

**Should this autonomous decision execute?**

Answering this question requires more than authentication, observability, governance, or monitoring alone.

It requires evaluating:

- User intent
- Behavioral consistency
- Policy compliance
- Runtime trust
- Execution context
- Decision lineage

immediately before execution.

This paper argues that these capabilities define a distinct engineering problem.

The following chapter introduces **Decision Security Engineering** as a proposed framework for addressing this runtime decision validation challenge.
