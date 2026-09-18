import { ProjectBlueprint } from '../types';

export const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: 'distributed-cache-raft',
    title: 'Distributed In-Memory Key-Value Store with Raft Consensus',
    tagline: 'High-availability cache engine with leader election, WAL, and LRU eviction',
    difficulty: 'Extreme',
    techStack: ['Go / Rust / C++', 'gRPC / Protobuf', 'Docker', 'Prometheus'],
    architecture: [
      'Implemented Raft consensus algorithm for distributed state machine replication',
      'Engineered Write-Ahead Logging (WAL) and snapshotting for crash-recovery durability',
      'Configured consistent hashing ring for balanced partition distribution across worker nodes',
      'Built O(1) concurrent LRU eviction with thread-safe Read-Write locks'
    ],
    recruitersLoveReason: 'Directly proves you understand distributed systems, concurrency, network partition handling, and memory management—the core of Microsoft Azure and AWS infrastructure.',
    differentiators: [
      'Includes Jepsen or Chaos-mesh fault injection tests',
      'Benchmarked against Redis achieving 65,000+ QPS with p99 latency < 2.5ms',
      'Architecture documentation with state machine transition diagrams'
    ],
    githubChecklist: [
      'Interactive ASCII or Mermaid architecture diagram in README',
      'Automated GitHub Actions CI running unit tests + race condition detector (-race in Go)',
      'Benchmark results comparing throughput under network partitions',
      'Live Docker Compose script for 3-node cluster one-click boot'
    ]
  },
  {
    id: 'collaborative-code-editor-crdt',
    title: 'Real-Time Collaborative Code Editor & Execution Sandbox',
    tagline: 'Conflict-free replicated data types (CRDT) with isolated Docker code runner',
    difficulty: 'Hard',
    techStack: ['TypeScript', 'Node.js / Express', 'WebSockets', 'Docker API', 'Yjs / CRDT'],
    architecture: [
      'Synchronized multi-user document state without central merge locks using Yjs CRDTs',
      'Engineered a secure multi-tenant execution sandbox utilizing Docker isolated containers with memory/CPU limits',
      'Implemented WebSockets heartbeat and delta reconnection queue for packet drop recovery',
      'Built a granular permission and workspace snapshot system'
    ],
    recruitersLoveReason: 'Replicates the actual engineering architecture behind Microsoft VS Code Live Share and Google Docs. Demonstrates real-time event streaming and sandboxed security.',
    differentiators: [
      'Handles simultaneous keystroke concurrency without document desync',
      'Container isolation prevents malicious fork-bombs and infinite loops',
      'Live production URL deployed on cloud with SSL and latency metrics'
    ],
    githubChecklist: [
      'Live deployment URL prominently in header',
      'Lighthouse performance score badge (90+)',
      'Cypress or Playwright end-to-end multi-tab collaborative tests',
      'Security sandbox analysis documentation'
    ]
  },
  {
    id: 'high-throughput-event-streaming',
    title: 'High-Throughput Log Aggregator & Alerting Engine',
    tagline: 'Distributed log ingestion pipeline processing 10k+ events/sec with sliding-window anomaly detection',
    difficulty: 'Hard',
    techStack: ['Java / Spring Boot or Go', 'Apache Kafka / RabbitMQ', 'ElasticSearch', 'Grafana'],
    architecture: [
      'Ingested stream data via asynchronous Kafka event producers with backpressure handling',
      'Implemented sliding-window algorithms to detect sudden spikes in HTTP 5xx error rates',
      'Structured storage with partitioned time-series indices for sub-second query latency',
      'Integrated webhook notifications for incident escalation'
    ],
    recruitersLoveReason: 'Shows you can design systems that handle massive enterprise data volumes without crashing, a primary requirement for backend and SRE roles.',
    differentiators: [
      'Demonstrated backpressure handling under simulated traffic bursts',
      'Grafana live monitoring dashboard tracking message throughput and consumer lag',
      'Clear documentation of trade-offs between at-least-once vs exactly-once delivery semantics'
    ],
    githubChecklist: [
      'K6 or Locust load testing script included in repo',
      'Prometheus metric exporter with Grafana dashboard JSON',
      'Unit test coverage report exceeding 75%',
      'System design trade-off section in README'
    ]
  },
  {
    id: 'ai-code-auditor-sandbox',
    title: 'Automated Static Code Analysis & Vulnerability Scanner',
    tagline: 'AST parser with taint-analysis and security flaw detection engine',
    difficulty: 'Medium',
    techStack: ['Python / TypeScript', 'Tree-sitter / Babel AST', 'FastAPI', 'Docker'],
    architecture: [
      'Constructed Abstract Syntax Tree (AST) parser to traverse control flow graphs',
      'Implemented taint analysis algorithms detecting SQL injection and unescaped user inputs',
      'Automated rule engine comparing syntax nodes against known CVE patterns',
      'Generated structured remediation patches and SARIF format reports for GitHub integration'
    ],
    recruitersLoveReason: 'Deeply shows code comprehension beyond superficial CRUD. Microsoft is heavily invested in developer tooling (GitHub, VS Code, TypeScript).',
    differentiators: [
      'Tested against benchmark vulnerable codebases with false-positive analysis',
      'CLI tool published on npm / PyPI with 100+ downloads',
      'Extensible plug-in architecture for custom lint rules'
    ],
    githubChecklist: [
      'Badges for build status, code coverage, and PyPI/npm release',
      'Clear installation instructions with `npx` or `pip install` one-liner',
      'Sample vulnerability reports with diff visualizations'
    ]
  }
];

export const GENERIC_PROJECT_RED_FLAGS = [
  'Basic To-Do List or Notes app without real-time sync, auth, or concurrency',
  'Generic E-commerce clone with copied tutorial UI and mock payment button',
  'Weather app fetching open APIs with no backend or original data processing',
  'Simple Chat app with no persistence, load testing, or reconnection logic',
  'Repositories with just 2 commits ("Initial commit" and "Finished app")',
  'Repositories without a README, architecture diagram, or live URL'
];
