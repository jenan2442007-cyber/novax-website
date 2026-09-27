/**
 * NOVAX Database Engine (IndexedDB with LocalStorage Fallback)
 * Handles persistent storage for Projects, Blog Articles, User Accounts, and Inquiries.
 */

const NOVAX_DB = (function () {
    const DB_NAME = 'NOVAX_TECH_DB';
    const DB_VERSION = 1;

    // Initial Seed Data
    const INITIAL_PROJECTS = [
        {
            id: 'proj-1',
            title_ar: 'منصة التعلم والتصحيح البرمجي الذكي',
            title_en: 'Smart CodeLab & AI Debugger',
            category: 'ai',
            category_label_ar: 'ذكاء اصطناعي وتعليم',
            category_label_en: 'AI & EdTech',
            badge: 'Flagship AI Project',
            summary_ar: 'منصة تعليمية تفاعلية متكاملة تهدف إلى تعليم البرمجة واختبار مهارات الطلاب بتنفيذ مباشر للأكواد ومساعد ذكي يوجه خطوة بخطوة.',
            summary_en: 'An interactive intelligent educational platform for teaching programming with in-browser execution and an AI mentor providing guided hints.',
            details_ar: `
                <h3>نظرة عامة على المشروع</h3>
                <p>تم تصميم منصة التعلم والتصحيح البرمجي الذكي كبيئة متكاملة تتيح للمتعلمين كتابة وتنفيذ الأكواد البرمجية (مثل Python و C++) مباشرة داخل المتصفح دون الحاجة لتثبيت أي بيئات عمل محلية.</p>
                <h4>أهم المزايا والخصائص:</h4>
                <ul>
                    <li><strong>محرر أكواد مدمج وسريع:</strong> يدعم لغات متعددة مع التلوين البرمجي والإكمال التلقائي.</li>
                    <li><strong>نظام تصحيح وتقييم آلي:</strong> فحص مخرجات الكود مقابل حالات اختبار متنوعة (Test Cases) فورياً.</li>
                    <li><strong>مساعد ذكي توجيهي (Smart AI Guide):</strong> يقوم بتحليل الأخطاء المنطقية والبرمجية وإرشاد الطالب تدريجياً للحل دون إعطائه الإجابة المباشرة لترسيخ التفكير النقدي وحل المشكلات.</li>
                    <li><strong>مسارات تعلم متدرجة:</strong> تحديات برمجية مقسمة حسب المستوى من المبتدئ إلى الاحترافي.</li>
                </ul>
                <h4>المتطلبات والتقنيات:</h4>
                <p>Python Engine, WebAssembly (Wasm) for in-browser execution, Large Language Models (LLM API / Fine-tuned Code Assistants), Node.js, WebSockets.</p>
            `,
            details_en: `
                <h3>Project Overview</h3>
                <p>Designed as an end-to-end cloud learning environment enabling students to write, compile, and execute code (such as Python and C++) directly within the browser without local environment setup.</p>
                <h4>Key Capabilities & Highlights:</h4>
                <ul>
                    <li><strong>In-Browser Code Execution:</strong> Multi-language runtime powered by WebAssembly sandboxing.</li>
                    <li><strong>Automated Assessment:</strong> Real-time test-case validation and performance metrics.</li>
                    <li><strong>Socratic AI Mentor:</strong> Analyzes syntax and logic mistakes, offering step-by-step guidance rather than outright solutions to reinforce problem-solving skills.</li>
                    <li><strong>Progressive Learning Paths:</strong> Structured algorithmic challenges from beginner to advanced tiers.</li>
                </ul>
                <h4>Tech Stack:</h4>
                <p>Python Microservices, WebAssembly, Fine-tuned LLM Reasoning Models, Modern Web UI, WebSockets.</p>
            `,
            techStack: ['Python', 'C++', 'WebAssembly', 'AI / LLMs', 'Docker', 'WebSockets'],
            status: 'In Development',
            status_ar: 'قيد التطوير النموذجي',
            status_en: 'In Active Development',
            featured: true,
            icon: 'fa-code'
        },
        {
            id: 'proj-2',
            title_ar: 'منصة دعم المتاجر والمشاريع الصغيرة',
            title_en: 'SouqNA - Micro-Business Hub',
            category: 'web',
            category_label_ar: 'منصات سحابية وتجارة',
            category_label_en: 'Cloud & E-Commerce',
            badge: 'SaaS Platform',
            summary_ar: 'منصة موحدة تجمع أصحاب المشاريع والمتاجر الناشئة لعرض المنتجات والخدمات بسهولة مع نظام اشتراكات مرن وباقات تسويقية ذكية.',
            summary_en: 'A unified platform empowering small local business owners and startups to showcase their goods and services with automated subscriptions and marketing tiers.',
            details_ar: `
                <h3>فكرة وأهداف المنصة</h3>
                <p>منصة إلكترونية متكاملة تهدف إلى دعم رواد الأعمال وأصحاب المشاريع المنزلية والمتاجر الصغيرة من خلال توفير صفحات متجر احترافية لهم دون الحاجة إلى تكاليف بناء مواقع مستقلة.</p>
                <h4>المميزات الرئيسية:</h4>
                <ul>
                    <li><strong>إنشاء متجر فوري:</strong> لوحة تحكم سهلة لرفع المنتجات وتحديد الأسعار وتنسيق واجهة المتجر خلال دقائق.</li>
                    <li><strong>تصفح مركزي ذكي للمستخدمين:</strong> إمكانية البحث عن المنتجات والخدمات المحلية جغرافياً وحسب التصنيف بسهولة.</li>
                    <li><strong>نموذج اشتراكات وباقات ذكي:</strong> باقات متعددة تمنح أصحاب المشاريع أدوات إضافية مثل إبراز المتجر، زيادة عدد المنتجات، والإحصائيات التحليلية لحركة المبيعات.</li>
                    <li><strong>منظومة تواصل مباشرة:</strong> ربط الزبائن بالمتجر مباشرة عبر قنوات التواصل والدفع السريعة.</li>
                </ul>
                <h4>الأثر الاقتصادي:</h4>
                <p>تخفيض التكاليف التشغيلية على المشاريع الناشئة ومساعدتها على الانتشار الرقمي وتحقيق عوائد مستدامة.</p>
            `,
            details_en: `
                <h3>Platform Mission & Architecture</h3>
                <p>A comprehensive digital ecosystem built to support startups, artisans, and small business owners by giving them instant, high-converting digital storefronts without high web development costs.</p>
                <h4>Core Capabilities:</h4>
                <ul>
                    <li><strong>Instant Storefront Creation:</strong> Intuitive dashboard to list inventory, customize branding, and manage catalog in minutes.</li>
                    <li><strong>Unified Discovery Engine:</strong> Consumers can filter and search local products by category, ratings, and proximity.</li>
                    <li><strong>Tiered Subscription Engine:</strong> Flexible SaaS plans offering premium visibility, expanded catalog sizes, and sales analytics.</li>
                    <li><strong>Direct Customer Engagement:</strong> Seamless instant messaging and checkout integration.</li>
                </ul>
                <h4>Value Proposition:</h4>
                <p>Dramatically lowers digital entry barriers for micro-enterprises while maximizing brand exposure.</p>
            `,
            techStack: ['Full-Stack Web', 'Cloud Database', 'Payment Gateway Integration', 'Analytics Engine', 'RESTful APIs'],
            status: 'Architecture Phase',
            status_ar: 'مرحلة التصميم المعماري',
            status_en: 'Architecture Phase',
            featured: true,
            icon: 'fa-store'
        },
        {
            id: 'proj-3',
            title_ar: 'منصة "شَـفـاء" لإدارة الرعاية والفرز الصحي الذكي',
            title_en: 'Shafaa - Smart Healthcare & AI Triage System',
            category: 'health',
            category_label_ar: 'صحة رقمية وذكاء اصطناعي',
            category_label_en: 'Digital Health & AI',
            badge: 'Humanitarian & Crisis Health',
            summary_ar: 'منظومة صحية وطنية ذكية تربط المستشفيات بنظام فرز طبي مدعوم بالذكاء الاصطناعي، وسجل طبي موحد، وتأهيل منزلي رقمي.',
            summary_en: 'A high-resilience digital health ecosystem featuring AI triage, unified patient health records, crisis load balancing, and digital home rehabilitation.',
            details_ar: `
                <h3>رؤية مشروع شَـفـاء</h3>
                <p>نظام صحي ذكي متكامل مصمم خصيصاً لإعادة تنظيم المنظومة الطبية في أوقات الأزمات والضغط الشديد وتخفيف العبء عن الكوادر المنهكة في المستشفيات.</p>
                <h4>أهم محاور المنصة:</h4>
                <ul>
                    <li><strong>نظام الفرز الطبي الذكي (AI Clinical Triage):</strong> يقوم المريض بشرح الأعراض صوتياً أو نصياً؛ حيث يحلل المساعد الذكي الحالة بالاستناد إلى مراجع سريرية معتمدة ويوجه المريض فوراً لدرجة الأولوية المناسبة أو أقرب طوارئ.</li>
                    <li><strong>تبويبات المستشفيات والأطباء الموحدة:</strong> استعراض دقيق لمواعيد الأطباء المتاحة، الأقسام الشاغرة، وتوزيع الضغط الإداري.</li>
                    <li><strong>السجل الطبي الموحد (Unified EHR):</strong> ملف صحي مشفر مرتبط بالرقم الوطني يتيح للطبيب في أي مشفى قراءة التاريخ المرضي فورياً.</li>
                    <li><strong>قسم التأهيل والعلاج الطبيعي الرقمي:</strong> برامج تمارين منزلية وفيديوهات توجيهية مخصصة لحالات البتر والمصابين لتلقي الرعاية دون الحاجة للتنقل.</li>
                    <li><strong>لوحة تحكم إدارة الأزمات:</strong> مراقبة الطاقة الاستيعابية وتوجيه الحالات للمشافي الأقل ازدحاماً وتفعيل تنبيهات SMS عند انقطاع الإنترنت.</li>
                    <li><strong>مساعد صوتي محلي:</strong> دعم فهم اللهجة المحلية لتسهيل استخدام المنظومة من قبل كبار السن والمصابين.</li>
                </ul>
                <h4>الأثر الحيوي:</h4>
                <p>تقليل التدافع، التوزيع العادل للموارد الطبية، وتوثيق البيانات الصحية لإنقاذ الأرواح في أصعب الظروف.</p>
            `,
            details_en: `
                <h3>Shafaa Project Vision</h3>
                <p>An intelligent, fault-tolerant healthcare platform engineered to relieve overburdened hospital ecosystems during severe capacity shortages and humanitarian stress.</p>
                <h4>System Architecture & Key Modules:</h4>
                <ul>
                    <li><strong>AI Clinical Triage:</strong> Patients describe symptoms via voice or text. The system references approved clinical protocols to prioritize cases and dispatch immediate emergency guidance.</li>
                    <li><strong>Unified Hospital Capacity Directory:</strong> Real-time mapping of available departments, specialist schedules, and load distribution.</li>
                    <li><strong>Unified Electronic Health Record (EHR):</strong> National ID-indexed secure medical histories accessible instantly by treating physicians across all facilities.</li>
                    <li><strong>Digital Physical Rehabilitation:</strong> Guided home therapeutic regimens for trauma, amputees, and chronic patients to reduce in-clinic traffic.</li>
                    <li><strong>Crisis Operations Dashboard & SMS Fallback:</strong> Real-time bed occupancy monitoring and automated SMS alerts that function even under degraded network connectivity.</li>
                    <li><strong>Localized Speech Assistant:</strong> Tailored voice recognition supporting regional dialects for the elderly and mobility-impaired.</li>
                </ul>
                <h4>Strategic Impact:</h4>
                <p>Minimizes clinic overcrowding, optimizes scarce healthcare assets, and preserves critical health intelligence.</p>
            `,
            techStack: ['AI NLP & Dialect Models', 'Distributed Databases', 'HIPAA/Security Standard', 'Telehealth & Media WebRTC', 'SMS Gateway API'],
            status: 'Concept & AI Prototyping',
            status_ar: 'النمذجة الأولية والذكاء الاصطناعي',
            status_en: 'Concept & AI Prototyping',
            featured: true,
            icon: 'fa-heart-pulse'
        }
    ];

    const INITIAL_ARTICLES = [
        {
            id: 'art-1',
            title_ar: 'الذكاء الاصطناعي والتعليم البرمجي: نحو بيئة تعلم تكيفية',
            title_en: 'AI & Code Education: Toward Adaptive Learning Environments',
            category_ar: 'تعليم وذكاء اصطناعي',
            category_en: 'AI & EdTech',
            readTime_ar: '4 دقائق قراءة',
            readTime_en: '4 min read',
            date: '2026-03-15',
            author: 'NOVAX AI Lab',
            summary_ar: 'كيف تسهم خوارزميات التقييم الآلي ونماذج التوجيه الذكية في مساعدة طلاب البرمجة على تجاوز الأخطاء المنطقية وبناء فكر هندسي متزن.',
            summary_en: 'How automated feedback loops and adaptive AI tutors assist computer science students in overcoming debugging hurdles without spoon-feeding answers.',
            content_ar: `
                <p>يشهد قطاع تعليم علوم الحاسوب ثورة نوعية مع إدخال المساعدات الذكية في مراحل التحليل والتصحيح. تكمن المشكلة الدائمة في التعليم التقليدي في بطء حصول الطالب على تغذية راجعة فورية عند مواجهة أخطاء منطقية (Logic Bugs).</p>
                <p>في فريق <strong>NOVAX</strong>، نركز على ابتكار أساليب تجعل الذكاء الاصطناعي مرشداً استدلالياً (Socratic Tutor) يطرح تساؤلات توجيهية ترشد الطالب لتفكيك المشكلة بنفسه، بدلاً من تقديم الكود الجاهز الذي يضعف مهارة التفكير النقدي.</p>
            `,
            content_en: `
                <p>Computer science education is undergoing an unprecedented shift with the advent of contextual AI co-pilots and adaptive evaluators. A recurring bottleneck in conventional classrooms is the delay in receiving targeted debugging feedback.</p>
                <p>At <strong>NOVAX</strong>, our research focuses on Socratic AI reasoning: empowering students through step-by-step diagnostic queries that steer them toward the solution organically rather than supplying pre-packaged answers.</p>
            `
        },
        {
            id: 'art-2',
            title_ar: 'هندسة الأنظمة الطبية في بيئات الاتصال المنخفض والأزمات',
            title_en: 'Engineering Resilient Health Systems for Low-Connectivity Environments',
            category_ar: 'أنظمة سحابية',
            category_en: 'Cloud & Resilience',
            readTime_ar: '6 دقائق قراءة',
            readTime_en: '6 min read',
            date: '2026-03-02',
            author: 'NOVAX Systems Team',
            summary_ar: 'مبادئ تصميم بنى برمجية مرنة قادرة على المزامنة غير المتزامنة والعمل دون اتصال لخدمة المراكز الطبية في الظروف الحرجة.',
            summary_en: 'Architectural principles for offline-first data synchronization and resilient health systems in disaster and high-stress scenarios.',
            content_ar: `
                <p>عندما تتعطل البنية التحتية لشبكات الاتصال، تصبح الأنظمة السحابية التقليدية عاجزة عن تقديم الخدمات الحيوية. هنا تبرز أهمية الأنظمة الموزعة (Offline-First Architectures).</p>
                <p>يتناول هذا المقال آليات تخزين البيانات محلياً عبر تقنيات مثل CRDTs والمزامنة الذكية فور عودة الاتصال، مع توفير آليات الإشعار النصية الخفيفة عبر بروتوكولات SMS وMesh Networks.</p>
            `,
            content_en: `
                <p>When conventional telecommunications degrade, standard cloud-reliant architectures become single points of failure. In crisis zones, offline-first design patterns are a lifeline.</p>
                <p>This study outlines distributed conflict-free replicated data types (CRDTs), local cache queuing, and lightweight fallback messaging protocols designed to maintain data integrity during critical health operations.</p>
            `
        },
        {
            id: 'art-3',
            title_ar: 'المنصات السحابية كداعم للنمو الاقتصادي للمشاريع الناشئة',
            title_en: 'Cloud Multi-Tenant Hubs as Catalysts for Micro-Enterprise Growth',
            category_ar: 'هندسة برمجيات',
            category_en: 'Software Engineering',
            readTime_ar: '5 دقائق قراءة',
            readTime_en: '5 min read',
            date: '2026-02-18',
            author: 'NOVAX Dev Group',
            summary_ar: 'كيف توفر المنصات متعددة المستأجرين (Multi-tenant SaaS) بنية تجارية عالية التوسع بتكاليف تشغيلية شبه منعدمة للمتاجر الصغيرة.',
            summary_en: 'Exploring how multi-tenant SaaS architectures provide scalable, cost-efficient commerce capabilities for micro-entrepreneurs.',
            content_ar: `
                <p>تحتاج المشاريع الصغيرة إلى أدوات تكنولوجية احترافية تنافس الشركات الكبرى دون تحمل تكاليف الخوادم والصيانة. تبرز معمارية البرمجيات كخدمة (SaaS) كحل جوهري لتمكين آلاف المتاجر داخل بيئة موحدة وآمنة.</p>
            `,
            content_en: `
                <p>Micro-enterprises require enterprise-grade digital storefronts without the overhead of server provisioning and lifecycle maintenance. Multi-tenant cloud ecosystems provide this bridge securely and cost-effectively.</p>
            `
        }
    ];

    // Local Storage Fallback Keys
    const LS_KEYS = {
        PROJECTS: 'novax_projects',
        ARTICLES: 'novax_articles',
        USERS: 'novax_users',
        MESSAGES: 'novax_messages',
        CURRENT_USER: 'novax_current_user'
    };

    let dbInstance = null;

    // Initialize IndexedDB
    function initDB() {
        return new Promise((resolve) => {
            if (!window.indexedDB) {
                console.warn('IndexedDB not supported, falling back to LocalStorage.');
                initLocalStorage();
                return resolve(false);
            }

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = function (event) {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('projects')) {
                    db.createObjectStore('projects', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('articles')) {
                    db.createObjectStore('articles', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('users')) {
                    db.createObjectStore('users', { keyPath: 'email' });
                }
                if (!db.objectStoreNames.contains('messages')) {
                    db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = function (event) {
                dbInstance = event.target.result;
                seedInitialData().then(() => resolve(true));
            };

            request.onerror = function (event) {
                console.error('IndexedDB error:', event.target.error);
                initLocalStorage();
                resolve(false);
            };
        });
    }

    function initLocalStorage() {
        if (!localStorage.getItem(LS_KEYS.PROJECTS)) {
            localStorage.setItem(LS_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
        }
        if (!localStorage.getItem(LS_KEYS.ARTICLES)) {
            localStorage.setItem(LS_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
        }
        if (!localStorage.getItem(LS_KEYS.USERS)) {
            // Seed a demo developer/admin account
            const demoUsers = [
                {
                    name: 'NOVAX Admin',
                    email: 'admin@novax.tech',
                    password: 'novax2025admin',
                    role: 'Lead Architect',
                    joined: '2025-01-01'
                }
            ];
            localStorage.setItem(LS_KEYS.USERS, JSON.stringify(demoUsers));
        }
        if (!localStorage.getItem(LS_KEYS.MESSAGES)) {
            localStorage.setItem(LS_KEYS.MESSAGES, JSON.stringify([]));
        }
    }

    async function seedInitialData() {
        if (!dbInstance) return;
        const projects = await getAll('projects');
        if (projects.length === 0) {
            for (const p of INITIAL_PROJECTS) {
                await putItem('projects', p);
            }
        }
        const articles = await getAll('articles');
        if (articles.length === 0) {
            for (const a of INITIAL_ARTICLES) {
                await putItem('articles', a);
            }
        }
        const users = await getAll('users');
        if (users.length === 0) {
            await putItem('users', {
                name: 'NOVAX Admin',
                email: 'admin@novax.tech',
                password: 'novax2025admin',
                role: 'Lead Architect',
                joined: '2025-01-01'
            });
        }
    }

    // Helper: IndexedDB operations with LocalStorage fallback
    function putItem(storeName, item) {
        return new Promise((resolve, reject) => {
            if (dbInstance) {
                try {
                    const tx = dbInstance.transaction(storeName, 'readwrite');
                    const store = tx.objectStore(storeName);
                    const req = store.put(item);
                    req.onsuccess = () => resolve(item);
                    req.onerror = () => reject(req.error);
                } catch (e) {
                    fallbackPut(storeName, item);
                    resolve(item);
                }
            } else {
                fallbackPut(storeName, item);
                resolve(item);
            }
        });
    }

    function getAll(storeName) {
        return new Promise((resolve) => {
            if (dbInstance) {
                try {
                    const tx = dbInstance.transaction(storeName, 'readonly');
                    const store = tx.objectStore(storeName);
                    const req = store.getAll();
                    req.onsuccess = () => resolve(req.result || []);
                    req.onerror = () => resolve(fallbackGetAll(storeName));
                } catch (e) {
                    resolve(fallbackGetAll(storeName));
                }
            } else {
                resolve(fallbackGetAll(storeName));
            }
        });
    }

    function deleteItem(storeName, key) {
        return new Promise((resolve) => {
            if (dbInstance) {
                try {
                    const tx = dbInstance.transaction(storeName, 'readwrite');
                    const store = tx.objectStore(storeName);
                    const req = store.delete(key);
                    req.onsuccess = () => resolve(true);
                    req.onerror = () => resolve(fallbackDelete(storeName, key));
                } catch (e) {
                    resolve(fallbackDelete(storeName, key));
                }
            } else {
                resolve(fallbackDelete(storeName, key));
            }
        });
    }

    function fallbackGetAll(storeName) {
        const key = LS_KEYS[storeName.toUpperCase()];
        if (!key) return [];
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (e) {
            return [];
        }
    }

    function fallbackPut(storeName, item) {
        const list = fallbackGetAll(storeName);
        const keyProp = storeName === 'users' ? 'email' : 'id';
        const idx = list.findIndex(x => x[keyProp] === item[keyProp]);
        if (idx >= 0) {
            list[idx] = item;
        } else {
            list.push(item);
        }
        localStorage.setItem(LS_KEYS[storeName.toUpperCase()], JSON.stringify(list));
    }

    function fallbackDelete(storeName, key) {
        const list = fallbackGetAll(storeName);
        const keyProp = storeName === 'users' ? 'email' : 'id';
        const filtered = list.filter(x => x[keyProp] !== key);
        localStorage.setItem(LS_KEYS[storeName.toUpperCase()], JSON.stringify(filtered));
        return true;
    }

    // Public API
    return {
        init: initDB,

        // Projects
        getProjects: () => getAll('projects'),
        saveProject: (proj) => putItem('projects', proj),
        deleteProject: (id) => deleteItem('projects', id),

        // Articles
        getArticles: () => getAll('articles'),
        saveArticle: (art) => putItem('articles', art),
        deleteArticle: (id) => deleteItem('articles', id),

        // Users & Auth
        register: async function (userData) {
            const users = await getAll('users');
            if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
                throw new Error('User already exists');
            }
            userData.joined = new Date().toISOString().split('T')[0];
            await putItem('users', userData);
            this.setCurrentUser(userData);
            return userData;
        },

        login: async function (email, password) {
            const users = await getAll('users');
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
            if (!user) {
                throw new Error('Invalid email or password');
            }
            this.setCurrentUser(user);
            return user;
        },

        setCurrentUser: function (user) {
            const safeUser = { ...user };
            delete safeUser.password;
            localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify(safeUser));
        },

        getCurrentUser: function () {
            try {
                return JSON.parse(localStorage.getItem(LS_KEYS.CURRENT_USER));
            } catch (e) {
                return null;
            }
        },

        logout: function () {
            localStorage.removeItem(LS_KEYS.CURRENT_USER);
        },

        // Inquiries & Messages
        saveMessage: async function (msgData) {
            msgData.id = 'msg-' + Date.now();
            msgData.date = new Date().toLocaleString();
            await putItem('messages', msgData);
            return msgData;
        },

        getMessages: () => getAll('messages'),

        // Export & Backup
        exportDatabase: async function () {
            const data = {
                projects: await getAll('projects'),
                articles: await getAll('articles'),
                messages: await getAll('messages'),
                exportedAt: new Date().toISOString()
            };
            return JSON.stringify(data, null, 2);
        }
    };
})();
