import { CoreCsQuestion } from '../types';

export const CORE_CS_QUESTIONS: CoreCsQuestion[] = [
  // OPERATING SYSTEMS
  {
    id: 'os-process-vs-thread',
    subject: 'OS',
    question: 'What is the fundamental difference between a Process and a Thread?',
    quickAnswer: 'A process is an executing instance of a program with its own isolated memory address space. A thread is a lightweight unit of execution within a process that shares the code, data, and heap segments with sibling threads, having only its own private stack, registers, and program counter.',
    depthNotes: [
      'Context switching between processes requires invalidating CPU caches (TLB flush) and swapping page directories, making it significantly more expensive than thread context switching.',
      'A crash in one thread typically terminates the entire process, whereas processes have memory protection boundaries preventing memory corruption across process boundaries.'
    ],
    microsoftTag: true
  },
  {
    id: 'os-deadlock-conditions',
    subject: 'OS',
    question: 'What are Coffman’s 4 conditions for Deadlock, and how do you prevent them?',
    quickAnswer: '1. Mutual Exclusion (non-shareable resources), 2. Hold and Wait (process holding resources while requesting more), 3. No Preemption (resources cannot be forcibly taken), 4. Circular Wait (a circular chain of processes waiting for each other).',
    depthNotes: [
      'Deadlock Prevention: Eliminate circular wait by enforcing a strict global resource ordering (always acquire Lock A before Lock B).',
      'Banker’s Algorithm can be used for deadlock avoidance by verifying safe state transitions prior to resource allocation.'
    ],
    microsoftTag: true
  },
  {
    id: 'os-virtual-memory-paging',
    subject: 'OS',
    question: 'How does Virtual Memory and Paging work? What causes Thrashing?',
    quickAnswer: 'Virtual memory decouples the program’s logical address space from physical RAM by dividing memory into fixed-size pages mapped via Page Tables to physical page frames. The MMU and TLB accelerate translations. Thrashing occurs when the system spends more time swapping pages in and out of disk than executing instructions, caused by insufficient physical memory relative to the working set size.',
    depthNotes: [
      'Page Faults trigger kernel interrupt 14, reading the required page from swap space into RAM and updating page table valid bits.',
      'Replacement algorithms: LRU, Clock algorithm, FIFO.'
    ],
    microsoftTag: true
  },
  {
    id: 'os-mutex-vs-semaphore',
    subject: 'OS',
    question: 'Mutex vs Binary Semaphore vs Counting Semaphore: What are the differences?',
    quickAnswer: 'A Mutex is a locking mechanism with ownership (only the thread that locked the mutex is allowed to unlock it). A Semaphore is a signaling mechanism with an integer counter (any thread can signal/post). A binary semaphore has values 0 and 1 without ownership semantics.',
    depthNotes: [
      'Mutexes are used for mutual exclusion over critical sections.',
      'Semaphores are used for synchronization between producer/consumer threads and rate limiting resource pools.'
    ],
    microsoftTag: true
  },

  // DBMS
  {
    id: 'dbms-acid-properties',
    subject: 'DBMS',
    question: 'Explain ACID properties in relational databases and how engines enforce them.',
    quickAnswer: 'Atomicity (All-or-nothing, enforced via Write-Ahead Logging/WAL and rollback segments), Consistency (valid state transitions, enforced by schema constraints), Isolation (concurrent transactions do not interfere, enforced by locks and MVCC), Durability (committed data survives crashes, enforced by fsync to non-volatile disk/WAL).',
    depthNotes: [
      'Transaction isolation levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable.',
      'Dirty Reads, Non-repeatable Reads, and Phantom Reads are prevented progressively across isolation levels.'
    ],
    microsoftTag: true
  },
  {
    id: 'dbms-b-trees-indexing',
    subject: 'DBMS',
    question: 'Why do relational databases use B+ Trees instead of Hash Indexes or Binary Search Trees for indexes?',
    quickAnswer: 'B+ Trees have high fan-out, reducing tree height to 3–4 levels even for millions of records, minimizing expensive disk I/O operations. Crucially, all leaf nodes in a B+ Tree are linked in a contiguous doubly linked list, enabling lightning-fast range queries ($WHERE\\ age\\ BETWEEN\\ 20\\ AND\\ 30$), which Hash Indexes cannot perform.',
    depthNotes: [
      'Clustered index determines the physical order of data rows on disk (only 1 per table).',
      'Non-clustered indexes hold pointers to the clustered key or tuple identifier.'
    ],
    microsoftTag: true
  },
  {
    id: 'dbms-indexing-cardinality',
    subject: 'DBMS',
    question: 'What is Index Cardinality and Composite Index Column Ordering?',
    quickAnswer: 'Cardinality is the uniqueness of data values in a column (e.g. Primary Key has high cardinality; Gender has low cardinality). In composite indexes (A, B, C), the leftmost prefix rule dictates that queries can only utilize the index if column A is present in the WHERE clause.',
    depthNotes: [
      'Rule of thumb: Order composite index columns by equality conditions first, then highest selectivity, then range conditions.'
    ],
    microsoftTag: true
  },

  // OBJECT ORIENTED PROGRAMMING & DESIGN
  {
    id: 'oop-solid-principles',
    subject: 'OOP',
    question: 'Explain the 5 SOLID Principles with practical software engineering examples.',
    quickAnswer: 'S: Single Responsibility (a class should have one reason to change). O: Open/Closed (open for extension, closed for modification via interfaces). L: Liskov Substitution (subtypes must be substitutable for base types without breaking invariants). I: Interface Segregation (clients should not depend on interfaces they do not use). D: Dependency Inversion (high-level modules should depend on abstractions, not concretions).',
    depthNotes: [
      'Common Microsoft interview scenario: Refactoring a monolithic notification service into decoupled SMS, Email, and Push providers using Strategy and Factory patterns.'
    ],
    microsoftTag: true
  },
  {
    id: 'oop-design-patterns',
    subject: 'OOP',
    question: 'Name 4 critical design patterns and where you would use them.',
    quickAnswer: '1. Singleton: Thread-safe single instance (Database connection pool). 2. Factory / Abstract Factory: Decouples object instantiation from business logic. 3. Observer: Pub/Sub event messaging (Event listeners, stock price updates). 4. Strategy: Swapping algorithms at runtime (e.g., Payment processor: Stripe vs PayPal vs Apple Pay).',
    depthNotes: [
      'Double-checked locking pattern with volatile keyword in Java/C++ is frequently tested for Singleton thread-safety.'
    ],
    microsoftTag: true
  },

  // COMPUTER NETWORKS
  {
    id: 'cn-tcp-three-way-handshake',
    subject: 'CN',
    question: 'Describe the TCP 3-Way Handshake and 4-Way Teardown.',
    quickAnswer: 'Handshake: 1. Client sends SYN (with Initial Sequence Number ISN_c). 2. Server responds with SYN-ACK (ISN_s, ACK = ISN_c + 1). 3. Client sends ACK (ISN_s + 1). Connection ESTABLISHED. Teardown: FIN -> ACK -> FIN -> ACK with TIME_WAIT state (2*MSL) to ensure final ACK delivery.',
    depthNotes: [
      'TIME_WAIT prevents delayed duplicate packets from a previous connection interfering with a new identical socket pair.'
    ],
    microsoftTag: true
  },
  {
    id: 'cn-http-dns-journey',
    subject: 'CN',
    question: 'What happens when you type https://microsoft.com into the browser and press Enter?',
    quickAnswer: '1. Browser checks local DNS cache, hosts file, OS cache, and recursive DNS resolver. 2. ARP resolution for default gateway MAC address. 3. TCP 3-way handshake on port 443. 4. TLS 1.3 handshake (negotiating cipher suites, certificate validation, symmetric key generation). 5. Browser sends HTTP GET request. 6. Server/Reverse Proxy (e.g., NGINX) routes request to backend service. 7. HTTP 200 response returned with HTML/assets, browser parses DOM, fetches CSS/JS, and executes render tree.',
    depthNotes: [
      'Classic Microsoft and FAANG standard question. Tests full-stack understanding from physical to application layer.'
    ],
    microsoftTag: true
  }
];
