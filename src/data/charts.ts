import type { ChartEntry } from './types'

export const charts: ChartEntry[] = [
  {
    id: 'flowchart',
    name: 'Flowchart',
    tagline: 'Map decisions, branches, and step-by-step processes with directed graphs.',
    category: 'flow',
    description:
      'Flowcharts are the most versatile diagram in software development. They express any logic that involves decisions, loops, or multi-path execution — from a CI/CD pipeline to an authentication flow to a complex business rule. Mermaid supports both top-down (TD) and left-right (LR) layouts, subgraphs for grouping, and styled nodes.',
    example: `flowchart TD
    A([User Request]) --> B{Authenticated?}
    B -- No --> C[Redirect to Login]
    B -- Yes --> D{Has Permission?}
    D -- No --> E[Return 403]
    D -- Yes --> F[Load Resource]
    F --> G{Cache Hit?}
    G -- Yes --> H[Return Cached]
    G -- No --> I[Query Database]
    I --> J[Store in Cache]
    J --> H
    H --> K([Response Sent])`,
    useCases: [
      {
        slug: 'auth-flow',
        title: 'Authentication & Authorization Flows',
        body: 'Model multi-step auth — OAuth handshakes, JWT validation chains, or RBAC permission checks — so every branch is explicit and reviewable in a PR.',
      },
      {
        slug: 'ci-pipeline',
        title: 'CI/CD Pipeline Design',
        body: 'Document build → test → lint → deploy stages with failure branches and rollback paths. Gives new engineers a map of what happens when they push.',
      },
      {
        slug: 'error-handling',
        title: 'Error Handling Logic',
        body: 'Trace every exception path through a service — which errors are retried, which are surfaced to the user, and which trigger an alert. Eliminates silent swallows.',
      },
      {
        slug: 'onboarding-flow',
        title: 'User Onboarding & Feature Flags',
        body: 'Chart conditional UX flows driven by feature flags or subscription tiers. Product and engineering can align on what each user segment sees.',
      },
      {
        slug: 'data-ingestion',
        title: 'Data Ingestion Pipelines',
        body: 'Diagram how raw data flows through validation, transformation, enrichment, and storage — highlighting where failures result in dead-letter queues.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/flowchart.html',
  },
  {
    id: 'sequence',
    name: 'Sequence Diagram',
    tagline: 'Show how services and actors exchange messages over time.',
    category: 'behavior',
    description:
      'Sequence diagrams are the gold standard for documenting inter-service communication. They make the temporal ordering of API calls, database queries, and async messages explicit — which is invaluable during incident post-mortems and API design reviews.',
    example: `sequenceDiagram
    autonumber
    actor U as User
    participant FE as Frontend
    participant API as API Gateway
    participant Auth as Auth Service
    participant DB as Database

    U->>FE: Submit login form
    FE->>API: POST /auth/login
    API->>Auth: Validate credentials
    Auth->>DB: SELECT user WHERE email=?
    DB-->>Auth: User record
    Auth-->>API: JWT token + refresh token
    API-->>FE: 200 OK {token}
    FE-->>U: Redirect to dashboard`,
    useCases: [
      {
        slug: 'api-design',
        title: 'API Contract Design',
        body: 'Before writing a single line of code, sketch out the request/response chain between services. Catches impedance mismatches between teams early.',
      },
      {
        slug: 'incident-postmortem',
        title: 'Incident Post-Mortems',
        body: 'Reconstruct the exact order of calls during an outage using log timestamps. The diagram becomes the authoritative timeline in the post-mortem doc.',
      },
      {
        slug: 'microservice-comms',
        title: 'Microservice Communication Mapping',
        body: 'Document which service calls which, synchronously vs. asynchronously, so architects can identify tight coupling or missing retry logic.',
      },
      {
        slug: 'oauth-flow',
        title: 'OAuth & SSO Flows',
        body: 'The OAuth 2.0 Authorization Code flow involves multiple redirects and token exchanges that are nearly impossible to follow in prose — a sequence diagram makes it scannable.',
      },
      {
        slug: 'websocket-events',
        title: 'WebSocket & Event-Driven Protocols',
        body: 'Map the handshake, subscription, and event emission sequence for real-time features like live collaboration or notifications.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/sequenceDiagram.html',
  },
  {
    id: 'class',
    name: 'Class Diagram',
    tagline: 'Model object-oriented designs, relationships, and domain entities.',
    category: 'architecture',
    description:
      'Class diagrams communicate the static structure of a software system: what objects exist, what data they hold, what operations they expose, and how they relate to each other through inheritance, composition, and association. Essential for domain modeling and code reviews of complex OOP systems.',
    example: `classDiagram
    class User {
      +String id
      +String email
      +String passwordHash
      +DateTime createdAt
      +login(password) bool
      +logout() void
    }

    class Order {
      +String id
      +OrderStatus status
      +DateTime placedAt
      +calculate() float
      +cancel() void
    }

    class OrderItem {
      +String productId
      +int quantity
      +float unitPrice
    }

    class Product {
      +String id
      +String name
      +float price
      +int stock
    }

    User "1" --> "0..*" Order : places
    Order "1" *-- "1..*" OrderItem : contains
    OrderItem "0..*" --> "1" Product : references`,
    useCases: [
      {
        slug: 'domain-modeling',
        title: 'Domain Model Documentation',
        body: 'Capture the core entities of a bounded context — their attributes, behaviors, and invariants — before writing any persistence code.',
      },
      {
        slug: 'interface-design',
        title: 'Interface & Abstract Type Design',
        body: 'Lay out inheritance hierarchies and interface contracts so implementers see exactly what they must satisfy.',
      },
      {
        slug: 'orm-schema',
        title: 'ORM Schema Communication',
        body: 'Share a class diagram with backend and frontend teams to align on field names, types, and cardinalities before API schemas are generated.',
      },
      {
        slug: 'design-patterns',
        title: 'Design Pattern Documentation',
        body: 'Illustrate patterns like Repository, Observer, or Factory in the context of your specific codebase rather than abstract textbook form.',
      },
      {
        slug: 'refactoring-plan',
        title: 'Refactoring Proposals',
        body: 'Show a before/after class diagram in a PR description or ADR to make a proposed structural change concrete and reviewable without reading hundreds of lines of diff.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/classDiagram.html',
  },
  {
    id: 'state',
    name: 'State Diagram',
    tagline: 'Define all states an entity can be in and the transitions between them.',
    category: 'behavior',
    description:
      'State diagrams formalize finite state machines — which states exist, which events trigger transitions, and which transitions are guarded. They eliminate ambiguity in feature specs where behavior depends on an object\'s current state, and help engineers write exhaustive tests by making every possible path visible.',
    example: `stateDiagram-v2
    [*] --> Draft

    Draft --> InReview : submit()
    Draft --> Cancelled : cancel()

    InReview --> Approved : approve()
    InReview --> NeedsRevision : request_changes()
    InReview --> Rejected : reject()

    NeedsRevision --> InReview : resubmit()
    NeedsRevision --> Cancelled : cancel()

    Approved --> Published : publish()
    Approved --> Archived : archive()

    Published --> Archived : archive()

    Cancelled --> [*]
    Rejected --> [*]
    Archived --> [*]`,
    useCases: [
      {
        slug: 'order-lifecycle',
        title: 'Order & Entity Lifecycle',
        body: 'Define every state a domain object moves through — pending, processing, shipped, delivered, refunded — and the exact events that drive each transition.',
      },
      {
        slug: 'ui-states',
        title: 'UI Component State Machines',
        body: 'Model the states of a complex UI component (idle, loading, error, empty, populated) so edge cases like double-submit or concurrent requests are handled explicitly.',
      },
      {
        slug: 'workflow-engine',
        title: 'Approval Workflow Engines',
        body: 'Document multi-stage approval flows in HR, legal, or content systems. Shows which roles can trigger which transitions.',
      },
      {
        slug: 'connection-state',
        title: 'Connection & Session States',
        body: 'Capture WebSocket or database connection lifecycles — connecting, connected, reconnecting, failed — so retry logic covers every state.',
      },
      {
        slug: 'feature-flag-states',
        title: 'Feature Rollout States',
        body: 'Formalize the stages of a feature flag: internal, beta, gradual rollout, GA, deprecated — and what events move it between stages.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/stateDiagram.html',
  },
  {
    id: 'er',
    name: 'Entity Relationship',
    tagline: 'Design relational database schemas and entity relationships.',
    category: 'architecture',
    description:
      'ER diagrams are the canonical way to communicate relational database design. They show tables (entities), their columns (attributes), and how tables relate — including cardinality. In Mermaid they render cleanly and live in the repository next to migration files, keeping schema docs and reality in sync.',
    example: `erDiagram
    USER {
      uuid id PK
      string email UK
      string password_hash
      timestamp created_at
    }

    ORGANIZATION {
      uuid id PK
      string name
      string slug UK
      timestamp created_at
    }

    PROJECT {
      uuid id PK
      uuid org_id FK
      string name
      string status
      timestamp created_at
    }

    MEMBERSHIP {
      uuid user_id FK
      uuid org_id FK
      string role
      timestamp joined_at
    }

    USER ||--o{ MEMBERSHIP : "has"
    ORGANIZATION ||--o{ MEMBERSHIP : "has"
    ORGANIZATION ||--o{ PROJECT : "owns"`,
    useCases: [
      {
        slug: 'schema-design',
        title: 'Database Schema Design Reviews',
        body: 'Include an ER diagram in migration PRs so reviewers can evaluate foreign key constraints, normalization choices, and missing indexes at a glance.',
      },
      {
        slug: 'onboarding-docs',
        title: 'Data Model Onboarding',
        body: 'New engineers can understand how a database\'s 40 tables relate to each other in minutes instead of days of exploration.',
      },
      {
        slug: 'api-design-er',
        title: 'REST Resource Relationship Mapping',
        body: 'Use an ER diagram to clarify which resources are nested under others in a REST API, reducing inconsistencies in endpoint design.',
      },
      {
        slug: 'data-warehouse',
        title: 'Data Warehouse Dimension Modeling',
        body: 'Document star or snowflake schemas for analytics databases, showing fact and dimension table relationships.',
      },
      {
        slug: 'microservice-data',
        title: 'Microservice Data Ownership',
        body: 'Map which service owns which data domain, preventing cross-service direct database access.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/entityRelationshipDiagram.html',
  },
  {
    id: 'user-journey',
    name: 'User Journey',
    tagline: 'Score the user experience across tasks and touchpoints.',
    category: 'flow',
    description:
      'User journey diagrams map the steps a user takes to accomplish a goal, scored by satisfaction. They bridge product and engineering by making UX friction points visible — showing where users struggle or drop off — and serve as a shared reference during feature planning and design reviews.',
    example: `journey
    title Onboarding a New Developer to the Codebase
    section Discovery
      Find repository: 5: Developer
      Read README: 3: Developer
      Locate setup docs: 2: Developer
    section Local Setup
      Install dependencies: 4: Developer
      Configure environment: 2: Developer
      Run dev server: 3: Developer
    section First Contribution
      Find a starter issue: 4: Developer
      Understand codebase: 2: Developer
      Submit pull request: 5: Developer
      Get code reviewed: 4: Developer, Reviewer`,
    useCases: [
      {
        slug: 'dx-audit',
        title: 'Developer Experience Audits',
        body: 'Score each step of local setup, contribution workflow, or deployment process. Low scores highlight where DX investment will have the most impact.',
      },
      {
        slug: 'user-research',
        title: 'User Research Synthesis',
        body: 'Translate interview findings or session recordings into a journey diagram that stakeholders can immediately react to in a product review.',
      },
      {
        slug: 'checkout-flow',
        title: 'E-Commerce Checkout Optimization',
        body: 'Map every step from cart to confirmation with friction scores, giving design and engineering a shared view of where conversion is lost.',
      },
      {
        slug: 'support-journey',
        title: 'Support Ticket Resolution Journeys',
        body: 'Chart what a customer goes through from encountering a bug to getting a resolution. Reveals handoff delays and communication gaps.',
      },
      {
        slug: 'feature-planning',
        title: 'Feature Planning Alignment',
        body: 'Use a journey diagram in feature kick-offs to align product, design, and engineering on the end-to-end user experience before any wireframe is drawn.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/userJourney.html',
  },
  {
    id: 'gantt',
    name: 'Gantt Chart',
    tagline: 'Schedule tasks, milestones, and dependencies across a timeline.',
    category: 'planning',
    description:
      'Gantt charts give a time-based view of project work — who is doing what, for how long, and what depends on what. In software development they are useful for communicating sprint plans, release schedules, and migration timelines to stakeholders who need to see progress against a calendar.',
    example: `gantt
    title Q3 Platform Migration
    dateFormat YYYY-MM-DD
    excludes weekends

    section Planning
      Architecture design      :done,    a1, 2024-07-01, 10d
      Risk assessment          :done,    a2, after a1, 5d
      Stakeholder sign-off     :milestone, 2024-07-19, 0d

    section Infrastructure
      Provision new clusters   :active,  b1, 2024-07-22, 8d
      Configure networking     :         b2, after b1, 5d
      Set up monitoring        :         b3, after b1, 6d

    section Migration
      Migrate auth service     :         c1, after b2, 10d
      Migrate data service     :         c2, after b2, 15d
      Migrate API gateway      :         c3, after c1, 5d

    section Launch
      Load testing             :         d1, after c2, 5d
      Cutover                  :milestone, after d1, 0d`,
    useCases: [
      {
        slug: 'sprint-planning',
        title: 'Sprint & Release Planning',
        body: 'Visualize sprint capacity, story dependencies, and release dates so the team and stakeholders see the same picture.',
      },
      {
        slug: 'migration-timeline',
        title: 'Infrastructure Migration Timelines',
        body: 'Break a complex migration into phases with clear milestones. The chart lives in the runbook and updates with the plan.',
      },
      {
        slug: 'dependency-map',
        title: 'Cross-Team Dependency Scheduling',
        body: 'When multiple teams must deliver in sequence, a Gantt makes hand-offs explicit and flags if a downstream team is blocked.',
      },
      {
        slug: 'incident-timeline',
        title: 'Incident Response Planning',
        body: 'Pre-plan a rolling upgrade or maintenance window with time estimates per step, so the on-call team has a script to follow.',
      },
      {
        slug: 'roadmap-comm',
        title: 'Engineering Roadmap Communication',
        body: 'Share a quarterly roadmap with leadership that shows technical work as concrete deliverables on a timeline, not abstract backlog items.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/gantt.html',
  },
  {
    id: 'pie',
    name: 'Pie Chart',
    tagline: 'Show proportional composition of a whole at a glance.',
    category: 'data',
    description:
      'Pie charts communicate part-to-whole ratios quickly. In software development they appear most often in dashboards, retrospectives, and capacity planning documents — showing the distribution of bug types, test coverage, resource allocation, or incident causes.',
    example: `pie title Test Suite Composition
    "Unit Tests" : 58
    "Integration Tests" : 28
    "End-to-End Tests" : 10
    "Performance Tests" : 4`,
    useCases: [
      {
        slug: 'test-coverage',
        title: 'Test Suite Composition',
        body: 'Show the ratio of unit to integration to e2e tests. Useful in retrospectives when discussing test strategy and coverage gaps.',
      },
      {
        slug: 'bug-distribution',
        title: 'Bug Category Distribution',
        body: 'After triaging a backlog, visualize how many bugs fall into each category (UI, performance, data integrity, security) to inform prioritization.',
      },
      {
        slug: 'time-allocation',
        title: 'Team Time Allocation',
        body: 'Show how engineering time is split across features, tech debt, incidents, and meetings in a sprint review.',
      },
      {
        slug: 'error-breakdown',
        title: 'Production Error Breakdown',
        body: 'Categorize errors from a monitoring tool by type and show the distribution in a post-incident report or weekly ops review.',
      },
      {
        slug: 'infra-cost',
        title: 'Infrastructure Cost Breakdown',
        body: 'Illustrate what percentage of the cloud bill comes from compute, storage, networking, and managed services.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/pie.html',
  },
  {
    id: 'quadrant',
    name: 'Quadrant Chart',
    tagline: 'Prioritize work by plotting items on two axes simultaneously.',
    category: 'planning',
    description:
      'Quadrant charts plot items on two dimensions at once — typically effort vs. impact, or risk vs. value. They turn a long backlog discussion into a spatial exercise where the most valuable low-effort items surface immediately. Perfect for planning sessions, technical debt reviews, and feature prioritization.',
    example: `quadrantChart
    title Feature Prioritization Matrix
    x-axis Low Effort --> High Effort
    y-axis Low Impact --> High Impact
    quadrant-1 Do First
    quadrant-2 Plan & Schedule
    quadrant-3 Reconsider
    quadrant-4 Quick Wins

    Dark Mode: [0.25, 0.85]
    Search: [0.55, 0.90]
    Notifications: [0.40, 0.75]
    Export PDF: [0.70, 0.65]
    Analytics Dashboard: [0.80, 0.80]
    Keyboard Shortcuts: [0.20, 0.55]
    In-app Tutorial: [0.65, 0.45]
    Advanced Filters: [0.75, 0.40]`,
    useCases: [
      {
        slug: 'backlog-prioritization',
        title: 'Backlog Prioritization Sessions',
        body: 'Plot every feature candidate on effort vs. impact axes to move the conversation from opinion to spatial reasoning. The "do first" quadrant writes the sprint plan.',
      },
      {
        slug: 'tech-debt-triage',
        title: 'Technical Debt Triage',
        body: 'Score tech debt items on risk vs. remediation cost. High-risk, low-cost items should be resolved immediately; high-cost, low-risk items can be deferred.',
      },
      {
        slug: 'tool-evaluation',
        title: 'Technology Evaluation',
        body: 'Compare candidate libraries or platforms on capability vs. adoption risk. Helps avoid both over-engineering and picking obscure tools.',
      },
      {
        slug: 'incident-action-items',
        title: 'Post-Incident Action Items',
        body: 'After a major incident, plot remediations on urgency vs. effort so the team tackles the most critical fixes first.',
      },
      {
        slug: 'okr-alignment',
        title: 'OKR & Strategy Alignment',
        body: 'Map initiatives on business value vs. engineering confidence to show leadership which bets are high-conviction and which need more discovery.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/quadrantChart.html',
  },
  {
    id: 'requirement',
    name: 'Requirement Diagram',
    tagline: 'Trace system requirements to their design and implementation elements.',
    category: 'architecture',
    description:
      'Requirement diagrams formalize the relationship between requirements and the design elements that satisfy them. They are particularly valuable in regulated industries — aerospace, medical, fintech — where traceability from a business requirement through to a test case is mandatory. Mermaid makes this traceable documentation live in the repository.',
    example: `requirementDiagram

    requirement payment_speed {
      id: 1
      text: process payments in under 3 seconds.
      risk: high
      verifymethod: test
    }

    requirement pci_compliance {
      id: 2
      text: encrypt payment data at rest and in transit.
      risk: high
      verifymethod: analysis
    }

    functionalRequirement refund_capability {
      id: 3
      text: allow refunds within 30 days of purchase.
      risk: low
      verifymethod: inspection
    }

    element PaymentService {
      type: microservice
    }

    element PaymentGateway {
      type: external
    }

    PaymentService - satisfies -> payment_speed
    PaymentService - satisfies -> pci_compliance
    PaymentGateway - satisfies -> payment_speed
    PaymentService - satisfies -> refund_capability`,
    useCases: [
      {
        slug: 'compliance-tracing',
        title: 'Compliance & Regulatory Tracing',
        body: 'In PCI-DSS, HIPAA, or SOC 2 environments, link every regulatory requirement to the system component or control that satisfies it. Auditors get a diagram instead of a spreadsheet.',
      },
      {
        slug: 'adr-requirements',
        title: 'Architecture Decision Records',
        body: 'Embed a requirement diagram in an ADR to show which requirements motivated the design decision, creating an immutable traceability trail.',
      },
      {
        slug: 'test-coverage-trace',
        title: 'Test Coverage Traceability',
        body: 'Link test cases to the requirements they verify, so QA teams can prove that every requirement has at least one passing test.',
      },
      {
        slug: 'rfp-response',
        title: 'RFP & Contract Deliverables',
        body: 'Map client-specified requirements to the system components proposed in a technical response to an RFP or statement of work.',
      },
      {
        slug: 'product-spec',
        title: 'Product Specification Formalization',
        body: 'Convert a PRD\'s acceptance criteria into formal requirements and link them to the engineering components responsible for delivering them.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/requirementDiagram.html',
  },
  {
    id: 'gitgraph',
    name: 'Git Graph',
    tagline: 'Visualize branching strategies and commit histories.',
    category: 'flow',
    description:
      'Git graphs render branch structure and commit history in documentation. They are the clearest way to explain branching strategies like GitFlow, trunk-based development, or release branching to new team members — or to document the exact merge sequence for a complex hotfix in a post-mortem.',
    example: `gitGraph
    commit id: "Initial commit"
    commit id: "Add user model"

    branch feature/auth
    checkout feature/auth
    commit id: "Add JWT middleware"
    commit id: "Add login endpoint"
    commit id: "Add refresh token"

    checkout main
    branch release/1.0
    checkout release/1.0
    commit id: "Bump version to 1.0"

    checkout main
    merge feature/auth id: "Merge auth feature"

    branch hotfix/session-bug
    checkout hotfix/session-bug
    commit id: "Fix session expiry"

    checkout main
    merge hotfix/session-bug
    checkout release/1.0
    merge hotfix/session-bug`,
    useCases: [
      {
        slug: 'branching-strategy',
        title: 'Branching Strategy Documentation',
        body: 'Show new engineers exactly how the team creates feature branches, when they merge, and what the release cadence looks like — without pointing them to confusing git log output.',
      },
      {
        slug: 'hotfix-runbook',
        title: 'Hotfix Runbooks',
        body: 'Document the exact cherry-pick or merge sequence needed to apply a hotfix to both main and active release branches without regressions.',
      },
      {
        slug: 'monorepo-structure',
        title: 'Monorepo Release Coordination',
        body: 'Visualize how packages in a monorepo branch and tag independently while sharing a common history.',
      },
      {
        slug: 'pr-review-context',
        title: 'PR Review Context',
        body: 'Include a git graph in a large PR description to show reviewers exactly which commits are new vs. merged-in from main.',
      },
      {
        slug: 'trunk-based',
        title: 'Trunk-Based Development Advocacy',
        body: 'Contrast a trunk-based workflow against a GitFlow workflow in an engineering blog post or internal proposal — visuals make the simplification argument clear.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/gitgraph.html',
  },
  {
    id: 'c4',
    name: 'C4 Diagram',
    tagline: 'Communicate system architecture at four levels of abstraction.',
    category: 'architecture',
    description:
      'The C4 model (Context, Containers, Components, Code) provides four zoom levels for describing a software system. Mermaid supports the Context and Container levels. The Context diagram shows who uses the system and what external systems it integrates with; the Container diagram shows the deployable units inside the system boundary.',
    example: `C4Context
    title System Context: E-Commerce Platform

    Person(customer, "Customer", "A buyer who browses and purchases products.")
    Person(admin, "Admin", "Staff who manage inventory and orders.")

    System(platform, "E-Commerce Platform", "Allows customers to browse, order, and pay for products.")

    System_Ext(payment, "Stripe", "Payment processing gateway.")
    System_Ext(email, "SendGrid", "Transactional email delivery.")
    System_Ext(cdn, "Cloudflare", "CDN and DDoS protection.")
    System_Ext(analytics, "Segment", "Customer analytics and event tracking.")

    Rel(customer, platform, "Browses and orders via", "HTTPS")
    Rel(admin, platform, "Manages via", "HTTPS")
    Rel(platform, payment, "Processes payments via", "REST/HTTPS")
    Rel(platform, email, "Sends emails via", "SMTP/API")
    Rel(platform, analytics, "Sends events to", "SDK/HTTPS")
    Rel(cdn, platform, "Proxies traffic to", "HTTPS")`,
    useCases: [
      {
        slug: 'onboarding-arch',
        title: 'Architecture Onboarding',
        body: 'Start with a C4 Context diagram on day one — new engineers immediately understand who the system serves and what it depends on, without reading any code.',
      },
      {
        slug: 'stakeholder-comms',
        title: 'Stakeholder Communication',
        body: 'Non-technical stakeholders can understand a Context diagram. Technical ones drill to the Container level. The same diagram set serves both audiences.',
      },
      {
        slug: 'adr-arch',
        title: 'Architecture Decision Records',
        body: 'Embed a C4 diagram in an ADR to show the system boundary and which components are affected by the architectural decision.',
      },
      {
        slug: 'security-review',
        title: 'Security & Threat Modeling',
        body: 'A C4 Container diagram is a natural starting point for a threat model — each container is a trust boundary, and each relationship is a potential attack surface.',
      },
      {
        slug: 'integration-design',
        title: 'Third-Party Integration Planning',
        body: 'Adding an external integration? A C4 Context diagram shows where it slots into the system and what data flows across the boundary.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/c4.html',
  },
  {
    id: 'mindmap',
    name: 'Mindmap',
    tagline: 'Radiate ideas and concepts from a central topic.',
    category: 'planning',
    description:
      'Mindmaps explore a topic by radiating branches outward from a central concept. In software development they shine during brainstorming, architecture exploration, and knowledge base organization — when the structure is still being discovered rather than documented.',
    example: `mindmap
  root((API Design))
    Authentication
      OAuth 2.0
      API Keys
      JWT
      mTLS
    Versioning
      URL Path
      Query Param
      Header
    Rate Limiting
      Per User
      Per IP
      Per Endpoint
    Error Handling
      HTTP Status Codes
      Error Schemas
      Retry Headers
    Documentation
      OpenAPI Spec
      Postman Collection
      Changelog`,
    useCases: [
      {
        slug: 'brainstorming',
        title: 'Feature Brainstorming',
        body: 'Capture every idea without judgment during a brainstorm. Branches represent sub-topics; the structure emerges as the session progresses.',
      },
      {
        slug: 'tech-exploration',
        title: 'Technology Landscape Mapping',
        body: 'Map the ecosystem of tools in a domain — observability, messaging, storage — to guide technology selection conversations.',
      },
      {
        slug: 'knowledge-base',
        title: 'Knowledge Base Organization',
        body: 'Structure an internal wiki or documentation site by mind-mapping all the topics first, then converting branches into pages.',
      },
      {
        slug: 'bug-root-cause',
        title: 'Root Cause Analysis',
        body: 'Branch out from a bug to explore every potential cause: infrastructure, code, configuration, data. The map ensures no hypothesis is missed.',
      },
      {
        slug: 'sprint-goals',
        title: 'Sprint Goal Decomposition',
        body: 'Break down a sprint goal into epics, stories, and tasks as a mindmap before importing into a project tracker.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/mindmap.html',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    tagline: 'Present chronological events and milestones on a linear axis.',
    category: 'planning',
    description:
      'Timeline diagrams arrange events on a chronological axis, grouped by time period. They communicate project history, release milestones, and technology evolution in a way that a Gantt chart (with its complex dependency notation) would overcomplicate.',
    example: `timeline
    title Payment System Evolution
    2019 : Initial monolith payment module
         : Basic card processing via Stripe
    2020 : Extracted payment microservice
         : Added PayPal integration
         : First PCI-DSS compliance audit
    2021 : Introduced event-driven architecture
         : Added subscription billing
         : Real-time fraud detection MVP
    2022 : Multi-currency support
         : Launched in 12 new markets
         : SOC 2 Type II certification
    2023 : Instant payouts feature
         : Open Banking (PSD2) integration
         : 99.99% SLA achieved
    2024 : AI-powered chargeback prevention
         : Embedded finance API launch`,
    useCases: [
      {
        slug: 'product-history',
        title: 'Product & System History',
        body: 'Document the evolution of a product or system so new team members understand why things are the way they are — architecture decisions happen in context.',
      },
      {
        slug: 'release-milestones',
        title: 'Release Milestone Communication',
        body: 'Show stakeholders a clean timeline of planned releases and their key deliverables without the complexity of a full project plan.',
      },
      {
        slug: 'incident-timeline',
        title: 'Incident Timeline Reconstruction',
        body: 'Reconstruct the sequence of events during an outage for a post-mortem report, from first symptom to full resolution.',
      },
      {
        slug: 'tech-debt-history',
        title: 'Technical Debt Accumulation History',
        body: 'Show when and why debt was introduced alongside business milestones — making the case for a cleanup sprint in terms leadership understands.',
      },
      {
        slug: 'compliance-journey',
        title: 'Compliance Journey Documentation',
        body: 'Chart the milestones of a compliance program — assessment, remediation, audit, certification — as a progress record for auditors.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/timeline.html',
  },
  {
    id: 'sankey',
    name: 'Sankey Diagram',
    tagline: 'Show how quantities flow and transform between stages.',
    category: 'data',
    description:
      'Sankey diagrams visualize flows where the width of each link represents the magnitude of the flow. In software development they are used to show how traffic, users, or resources move through a system — revealing where volume concentrates and where it drops off.',
    example: `sankey-beta

API Gateway,Auth Service,450
API Gateway,Product Service,380
API Gateway,Order Service,270
API Gateway,Search Service,900
Auth Service,Cache Hit,310
Auth Service,Database,140
Product Service,Cache Hit,280
Product Service,Database,100
Order Service,Database,270
Search Service,Search Index,900`,
    useCases: [
      {
        slug: 'traffic-routing',
        title: 'API Traffic Routing Visualization',
        body: 'Show how traffic distributes across microservices from an API gateway. Width immediately reveals which services bear the most load.',
      },
      {
        slug: 'user-funnel',
        title: 'Conversion Funnel Analysis',
        body: 'Visualize how users move through a registration or purchase funnel — from impression to conversion — highlighting where volume is lost.',
      },
      {
        slug: 'resource-allocation',
        title: 'Engineering Resource Allocation',
        body: 'Show how team capacity flows into product features, infrastructure work, support, and tech debt across quarters.',
      },
      {
        slug: 'cost-flow',
        title: 'Cloud Cost Flow',
        body: 'Map infrastructure spend from total budget through services (compute, storage, network, managed services) to specific resources.',
      },
      {
        slug: 'error-propagation',
        title: 'Error Propagation Tracing',
        body: 'Visualize how errors originate at a source (e.g., a dependency timeout) and cascade through downstream services, showing impact magnitude.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/sankey.html',
  },
  {
    id: 'xychart',
    name: 'XY Chart',
    tagline: 'Plot time-series metrics, trends, and comparisons on X/Y axes.',
    category: 'data',
    description:
      'XY charts render bar and line graphs from inline data. They are useful for embedding small data visualizations — performance benchmarks, deployment frequency, error rates — directly in documentation and post-mortems without reaching for an external charting tool.',
    example: `xychart-beta
    title "API Response Time (ms) — Last 7 Days"
    x-axis ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    y-axis "Response Time (ms)" 0 --> 500
    bar [210, 185, 220, 195, 240, 160, 155]
    line [210, 185, 220, 195, 240, 160, 155]`,
    useCases: [
      {
        slug: 'performance-benchmarks',
        title: 'Performance Benchmark Comparisons',
        body: 'Embed a bar chart comparing before/after latency for a performance optimization directly in the PR description.',
      },
      {
        slug: 'deployment-frequency',
        title: 'DORA Metrics Reporting',
        body: 'Plot deployment frequency, lead time, or change failure rate weekly without building a dedicated dashboard.',
      },
      {
        slug: 'error-rate-trend',
        title: 'Error Rate Trends in Post-Mortems',
        body: 'Include an error rate chart in a post-mortem that shows the spike, peak, and recovery — giving the timeline visual anchor.',
      },
      {
        slug: 'load-test-results',
        title: 'Load Test Result Reporting',
        body: 'Show throughput and latency at different concurrency levels as bars and lines so the team can identify the knee point.',
      },
      {
        slug: 'sprint-velocity',
        title: 'Sprint Velocity Tracking',
        body: 'Visualize story points completed per sprint as a bar chart in a retrospective report — easier to discuss trends than a table of numbers.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/xychart.html',
  },
  {
    id: 'block',
    name: 'Block Diagram',
    tagline: 'Compose system components as structured, nestable blocks.',
    category: 'architecture',
    description:
      'Block diagrams let you describe high-level system structure using nestable rectangular blocks and labeled connections. They are more compositional than flowcharts — you can group components into subsystems without the flowchart\'s strict control-flow semantics — making them ideal for architecture overviews.',
    example: `block-beta
  columns 3

  block:frontend["Frontend"]:1
    spa["SPA\n(React)"]
    mobile["Mobile\n(React Native)"]
  end

  block:api["API Layer"]:1
    gw["API Gateway"]
    lb["Load Balancer"]
  end

  block:backend["Backend Services"]:1
    auth["Auth\nService"]
    product["Product\nService"]
    order["Order\nService"]
  end

  frontend --> api
  api --> backend`,
    useCases: [
      {
        slug: 'system-overview',
        title: 'System Architecture Overview',
        body: 'Produce a one-page block diagram for every new project that shows the major subsystems and their connections — serves as the first slide in any architecture review.',
      },
      {
        slug: 'team-ownership',
        title: 'Team Ownership Boundaries',
        body: 'Group components into blocks by team ownership. Connections that cross block boundaries reveal integration touchpoints that need clear contracts.',
      },
      {
        slug: 'deployment-topology',
        title: 'Deployment Topology',
        body: 'Show which components are co-located in the same cluster, subnet, or cloud account — a detail that flowcharts typically obscure.',
      },
      {
        slug: 'layer-architecture',
        title: 'Layered Architecture Documentation',
        body: 'Represent presentation, application, domain, and infrastructure layers as nested blocks to enforce and communicate separation of concerns.',
      },
      {
        slug: 'integration-map',
        title: 'Third-Party Integration Map',
        body: 'Quickly diagram how SaaS tools plug into your internal systems, showing the direction of data flow and protocol at each boundary.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/block.html',
  },
  {
    id: 'packet',
    name: 'Packet Diagram',
    tagline: 'Document binary protocol structures and network packet layouts.',
    category: 'architecture',
    description:
      'Packet diagrams render bit-level and byte-level layouts of network protocols and binary formats. They are the most precise way to document a custom binary protocol, a wire format, or the fields of a network packet — information that prose tables approximate poorly.',
    example: `packet-beta
  title Custom RPC Frame Format
  0-3: "Version (4b)"
  4-7: "Flags (4b)"
  8-15: "Message Type (8b)"
  16-31: "Request ID (16b)"
  32-63: "Payload Length (32b)"
  64-127: "Session Token (64b)"
  128-191: "Timestamp (64b)"
  192-223: "Checksum (32b)"
  224-255: "Reserved (32b)"`,
    useCases: [
      {
        slug: 'protocol-docs',
        title: 'Custom Protocol Documentation',
        body: 'When building a custom binary protocol (game networking, IoT, HFT), a packet diagram is the primary reference for implementers on both ends of the wire.',
      },
      {
        slug: 'wire-format',
        title: 'Wire Format Specification',
        body: 'Specify the exact byte layout of a serialization format so implementers in different languages produce interoperable output.',
      },
      {
        slug: 'debugging-aid',
        title: 'Debugging & Wireshark Integration',
        body: 'Include a packet diagram in debugging runbooks so engineers analyzing a capture know exactly which bytes represent which field.',
      },
      {
        slug: 'security-analysis',
        title: 'Security Protocol Analysis',
        body: 'Document TLS record structure or JWT header layout when writing security reviews — showing exactly which bits are authenticated and which are opaque.',
      },
      {
        slug: 'firmware-comms',
        title: 'Firmware Communication Protocols',
        body: 'Specify the frame format for UART, SPI, or I²C communication between embedded systems and host software.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/packet.html',
  },
  {
    id: 'kanban',
    name: 'Kanban Board',
    tagline: 'Visualize work items flowing through workflow stages.',
    category: 'planning',
    description:
      'Kanban boards represent work items moving through columns that correspond to workflow stages. Mermaid\'s kanban diagram lets you embed a lightweight board in documentation, ADRs, or runbooks — showing the current state of a migration, an incident response, or a feature rollout without linking to an external project tracker.',
    example: `kanban
  column1[Backlog]
    task1[Migrate auth service to new cluster]
    task2[Update API rate limit docs]
  column2[In Progress]
    task3[Deploy canary release v2.4]@{ assigned: 'Alice' }
    task4[Fix session timeout regression]@{ assigned: 'Bob' }
  column3[In Review]
    task5[Add structured logging to order service]@{ ticket: ENG-1234 }
  column4[Done]
    task6[Upgrade Node.js to 22 LTS]
    task7[Remove deprecated payment endpoint]`,
    useCases: [
      {
        slug: 'runbook-status',
        title: 'Runbook Task Status',
        body: 'Embed a kanban in a deployment runbook to track which steps are pending, in progress, and complete during a live migration.',
      },
      {
        slug: 'incident-response',
        title: 'Incident Response Coordination',
        body: 'During a major incident, maintain a kanban in the incident doc to show which parallel investigation threads are active and who owns each.',
      },
      {
        slug: 'release-checklist',
        title: 'Release Checklist Visualization',
        body: 'Replace a bullet-point release checklist with a kanban so the release captain can see at a glance what is blocked and what is done.',
      },
      {
        slug: 'feature-rollout',
        title: 'Feature Rollout Tracking',
        body: 'Track a multi-stage feature rollout (internal, beta, 10%, 50%, GA) with tasks representing each stage moving through the board.',
      },
      {
        slug: 'tech-debt-sprint',
        title: 'Tech Debt Sprint Board',
        body: 'Visualize a dedicated tech debt sprint in a retro or stakeholder update without needing access to the project tracker.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/kanban.html',
  },
  {
    id: 'architecture',
    name: 'Architecture Diagram',
    tagline: 'Draw cloud and infrastructure components with icon-based notation.',
    category: 'architecture',
    description:
      'Mermaid\'s Architecture diagram uses a named-service notation with group nesting and directional edges to represent cloud infrastructure topology. It produces clean, icon-aware layout suited for infrastructure-as-code documentation and cloud architecture reviews.',
    example: `architecture-beta
  group vpc(cloud)[AWS VPC]

  group public(internet)[Public Subnet] in vpc
    service lb(server)[Load Balancer] in public

  group private(server)[Private Subnet] in vpc
    service api1(server)[API Server 1] in private
    service api2(server)[API Server 2] in private
    service cache(database)[Redis Cache] in private
    service db(database)[PostgreSQL] in private

  group storage(cloud)[S3 Storage]
    service s3(disk)[Object Store] in storage

  lb:R --> L:api1
  lb:R --> L:api2
  api1:B --> T:cache
  api2:B --> T:cache
  api1:B --> T:db
  api2:B --> T:db
  api1:R --> L:s3`,
    useCases: [
      {
        slug: 'cloud-architecture',
        title: 'Cloud Infrastructure Documentation',
        body: 'Replace static PowerPoint architecture diagrams with living diagrams that live in the repo alongside Terraform or CDK code.',
      },
      {
        slug: 'iac-docs',
        title: 'Infrastructure-as-Code Documentation',
        body: 'Generate an architecture diagram from the same source-of-truth that defines your infrastructure, keeping docs and reality in sync.',
      },
      {
        slug: 'dr-planning',
        title: 'Disaster Recovery Planning',
        body: 'Diagram primary and failover infrastructure side-by-side to validate that every component has a recovery counterpart.',
      },
      {
        slug: 'network-topology',
        title: 'Network Topology Reviews',
        body: 'Visualize subnet placement, security group boundaries, and traffic flow paths for network security reviews.',
      },
      {
        slug: 'cost-optimization',
        title: 'Cost Optimization Analysis',
        body: 'Annotate an architecture diagram with per-service cost estimates to identify over-provisioned or redundant infrastructure.',
      },
    ],
    docsUrl: 'https://mermaid.js.org/syntax/architecture.html',
  },
]

export function getChartById(id: string): ChartEntry | undefined {
  return charts.find((c) => c.id === id)
}

export function getAdjacentCharts(id: string): { prev: ChartEntry | null; next: ChartEntry | null } {
  const idx = charts.findIndex((c) => c.id === id)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? charts[idx - 1] : null,
    next: idx < charts.length - 1 ? charts[idx + 1] : null,
  }
}
