/**
 * NOVAX Internationalization (i18n) Engine
 * Arabic (Default, RTL) and English (LTR)
 */

const NOVAX_I18N = (function () {
    const translations = {
        ar: {
            lang_name: 'English',
            brand_name: 'NOVAX',
            brand_sub: 'TECHNOLOGY SOLUTIONS',
            brand_since: 'SINCE 2025',
            nav_home: 'الرئيسية',
            nav_projects: 'المشاريع',
            nav_blog: 'المدونة التقنية',
            nav_about: 'الرؤية والتقنية',
            nav_contact: 'تواصل معنا',
            nav_login: 'تسجيل الدخول',
            nav_dashboard: 'لوحة التحكم',
            nav_logout: 'تسجيل الخروج',

            // Hero
            hero_tag: 'طلاب هندسة الذكاء الاصطناعي والحلول الرقمية',
            hero_title_prefix: 'نصمم المستقبل بـ',
            hero_title_highlight: 'هندسة الذكاء الاصطناعي',
            hero_title_suffix: 'والحلول الذكية',
            hero_desc: 'نطور برمجيات ذكية، وأنظمة سحابية متقدمة، ونماذج ذكاء اصطناعي تفاعلية تهدف إلى حل المشكلات التقنية وتطوير المنظومات التعليمية والخدمية والصحية.',
            hero_btn_projects: 'استكشف مشاريعنا',
            hero_btn_contact: 'تواصل معنا',
            hero_btn_login: 'دخول الأعضاء',

            // Stats
            stat_projects: 'مشاريع ريادية قيد التطوير',
            stat_models: 'نماذج وتطبيقات ذكية',
            stat_domains: 'محاور تقنية أساسية',
            stat_uptime: 'معايير جودة وأمان معماري',

            // Features / Pillars
            pillars_title: 'مجالات التركيز الهندسي والتقني',
            pillars_sub: 'منظومة عمل متكاملة تستند إلى أسس علوم الحاسوب وهندسة الذكاء الاصطناعي',
            pillar_1_title: 'هندسة الذكاء الاصطناعي (AI & ML)',
            pillar_1_desc: 'بناء وتخصيص نماذج اللغة والتصنيف وخوارزميات التوجيه التكيفي ومعالجة اللغات الطبيعية.',
            pillar_2_title: 'الأنظمة السحابية والويب المتكامل (Full-Stack)',
            pillar_2_desc: 'تطوير منصات ويب تفاعلية عالية الأداء وسريعة الاستجابة مبنية بأحدث أطر العمل الحديثة.',
            pillar_3_title: 'الأنظمة الموزعة والمرنة (Resilient Systems)',
            pillar_3_desc: 'تصميم حلول تعمل بكفاءة حتى في ظروف الاتصال الضعيف وانقطاع الشبكات بنمط Offline-First.',
            pillar_4_title: 'أمن البيانات والخصوصية (Security & Privacy)',
            pillar_4_desc: 'تطبيق معايير التشفير والتحقق الصارم لحماية سرية البيانات الطبية والتجارية.',

            // Projects Section
            proj_title: 'المشاريع والمبادرات التقنية',
            proj_sub: 'مشاريع ريادية طموحة قيد النمذجة والتطوير تركز على التعليم الذكي، التجارة الرقمية، والرعاية الصحية',
            filter_all: 'كافة المشاريع',
            filter_ai: 'الذكاء الاصطناعي والتعليم',
            filter_web: 'المنصات السحابية',
            filter_health: 'الصحة الرقمية والفرز',
            proj_view_details: 'تفاصيل ودراسة المشروع',
            proj_view_all_page: 'استعراض صفحة المشاريع المستقلة بالكامل',
            proj_modal_close: 'إغلاق',
            proj_status_label: 'حالة المشروع:',
            proj_stack_label: 'التقنيات المستخدمة:',

            // Blog Section
            blog_title: 'المدونة والأبحاث التقنية',
            blog_sub: 'مقالات ورؤى هندسية حول هندسة الذكاء الاصطناعي، والأنظمة الموزعة، ومستقبل التكنولوجيا',
            blog_read_more: 'قراءة المقال كاملاً',
            blog_view_all_page: 'استعراض صفحة المدونة المستقلة بالكامل',
            blog_modal_close: 'إغلاق القارئ',
            blog_author_label: 'الكاتب:',
            blog_date_label: 'تاريخ النشر:',

            // About Section (Strictly Tech Vision)
            about_title: 'عن NOVAX: الرؤية والهوية الهندسية',
            about_sub: 'شغف ابتكار الحلول الذكية وهندسة المستقبل التقني',
            about_story_title: 'قصة الانطلاق والشغف الهندسي',
            about_story_p1: 'تأسست نواة <strong>NOVAX</strong> في عام 2025 كفريق شغوف من طلاب هندسة الذكاء الاصطناعي وعلوم البيانات. دافعنا الأساسي هو تحويل المعرفة الأكاديمية والنظريات الهندسية المتقدمة إلى منتجات برمجية عملية وذكية تخدم قطاعات حيوية مثل التعليم، والتجارة، والصحة.',
            about_story_p2: 'نؤمن بأن البرمجة وهندسة الخوارزميات ليست مجرد أسطر كود، بل هي أداة لإعادة ابتكار الأدوات وتجاوز التحديات اللوجستية والتقنية المعقدة، والارتقاء بكفاءة المنظومات الرقمية.',
            about_vision_title: 'رؤيتنا التقنية',
            about_vision_desc: 'بناء وتطوير حلول برمجية رصينة ونماذج ذكاء اصطناعي تفاعلية تضع معايير جديدة في تجربة المستخدم والأداء وسرعة الاستجابة.',
            about_mission_title: 'رسالتنا الهندسية',
            about_mission_desc: 'الاستثمار في أحدث أدوات الذكاء الاصطناعي وهندسة النظم لبناء منصات متكاملة تدعم رواد الأعمال، والمتعلمين، والمؤسسات.',
            about_values_title: 'قيمنا البرمجية الأساسية',
            val_1_title: 'الدقة الهندسية والابتكار',
            val_1_desc: 'كتابة شيفرات برمجية نظيفة، مدروسة معمارياً، وقابلة للتطوير والتوسع المستقبلي.',
            val_2_title: 'الذكاء الهادف والأثر الواقعي',
            val_2_desc: 'توجيه قدرات الذكاء الاصطناعي لحل مشكلات حقيقية وملموسة تلامس حياة الناس.',
            val_3_title: 'التعلم المستمر والمواكبة',
            val_3_desc: 'متابعة أحدث الأبحاث العلمية في معالجة اللغات الطبيعية وهندسة النظم وتطبيقها فوراً.',

            // Contact Section
            contact_title: 'تواصل معنا',
            contact_sub: 'نسعد باستقبال اقتراحاتكم، واستفساراتكم الهندسية، وفرص التعاون التقني',
            contact_form_title: 'أرسل رسالة مباشرة',
            contact_name_label: 'الاسم الكامل',
            contact_name_ph: 'أدخل اسمك الكريم',
            contact_email_label: 'البريد الإلكتروني',
            contact_email_ph: 'name@example.com',
            contact_subject_label: 'نوع الاستفسار / الموضوع',
            contact_sub_opt_general: 'استفسار عام أو تقني',
            contact_sub_opt_collab: 'اقتراح تعاون أو شراكة برمجية',
            contact_sub_opt_project: 'استفسار بخصوص أحد المشاريع المعروضة',
            contact_msg_label: 'تفاصيل الرسالة',
            contact_msg_ph: 'اكتب تفاصيل استفسارك أو مقترحك هنا...',
            contact_btn_send: 'إرسال الرسالة',
            contact_info_title: 'قنوات التواصل والشبكات',
            contact_info_desc: 'يمكنك الوصول إلينا ومتابعة تحديثاتنا عبر القنوات الرسمية التالية:',
            contact_loc_label: 'المقر والنشاط:',
            contact_loc_val: 'فريق تقني سحابي / متصل عالمياً',
            contact_email_val: 'contact@novax.tech',
            contact_social_note: 'ملاحظة: الروابط أدناه قوالب رسمية جاهزة لإضافة حساباتكم المعتمدة فور إنشائها.',

            // Auth & Dashboard
            auth_modal_title_login: 'تسجيل دخول الأعضاء',
            auth_modal_title_reg: 'إنشاء حساب جديد في NOVAX',
            auth_email: 'البريد الإلكتروني',
            auth_pass: 'كلمة المرور',
            auth_name: 'الاسم الكامل',
            auth_role: 'التخصص / الدور',
            auth_btn_login: 'دخول',
            auth_btn_reg: 'تسجيل الحساب',
            auth_no_account: 'ليس لديك حساب؟ سجل الآن',
            auth_has_account: 'لديك حساب بالفعل؟ سجل دخولك',
            auth_login_success: 'تم تسجيل الدخول بنجاح!',
            auth_reg_success: 'تم إنشاء الحساب وتسجيل الدخول بنجاح!',
            auth_logout_success: 'تم تسجيل الخروج بنجاح.',
            
            // Dashboard
            dash_title: 'لوحة تحكم المنصة وقاعدة البيانات',
            dash_welcome: 'مرحباً بك،',
            dash_tab_projects: 'إدارة المشاريع',
            dash_tab_messages: 'رسائل التواصل الواردة',
            dash_tab_export: 'نسخ احتياطي للبيانات',
            dash_add_proj_btn: 'إضافة مشروع جديد لقاعدة البيانات',
            dash_export_btn: 'تصدير نسخة احتياطية من قاعدة البيانات (JSON)',
            dash_no_messages: 'لا توجد رسائل واردة حتى الآن.',

            // Footer
            footer_desc: 'فريق طلابي متخصص في هندسة الذكاء الاصطناعي وبناء الحلول الرقمية الذكية.',
            footer_quick_links: 'روابط سريعة',
            footer_tech_stack: 'التقنيات المستخدمة',
            footer_rights: 'جميع الحقوق محفوظة لفريق NOVAX للحلول التقنية © 2025 - 2026',
            footer_badge: 'Designed with Precision & AI Passion'
        },

        en: {
            lang_name: 'العربية',
            brand_name: 'NOVAX',
            brand_sub: 'TECHNOLOGY SOLUTIONS',
            brand_since: 'SINCE 2025',
            nav_home: 'Home',
            nav_projects: 'Projects',
            nav_blog: 'Tech Blog',
            nav_about: 'Vision & Tech',
            nav_contact: 'Contact Us',
            nav_login: 'Sign In',
            nav_dashboard: 'Dashboard',
            nav_logout: 'Logout',

            // Hero
            hero_tag: 'AI Engineering & Digital Solutions Collective',
            hero_title_prefix: 'Engineering The Future With',
            hero_title_highlight: 'Artificial Intelligence',
            hero_title_suffix: '& Smart Architecture',
            hero_desc: 'We engineer intelligent platforms, resilient cloud architectures, and adaptive AI systems designed to solve intricate problems across education, commerce, and healthcare.',
            hero_btn_projects: 'Explore Projects',
            hero_btn_contact: 'Get In Touch',
            hero_btn_login: 'Member Access',

            // Stats
            stat_projects: 'Flagship Systems in R&D',
            stat_models: 'AI Reasoning Engines',
            stat_domains: 'Core Technical Domains',
            stat_uptime: 'High-Resilience Target',

            // Features / Pillars
            pillars_title: 'Core Technical & Engineering Pillars',
            pillars_sub: 'A disciplined framework anchored in computer science fundamentals and modern AI engineering',
            pillar_1_title: 'AI Engineering & Machine Learning',
            pillar_1_desc: 'Fine-tuning LLMs, adaptive reasoning pipelines, and NLP systems built for domain-specific automation.',
            pillar_2_title: 'Cloud & Full-Stack Architectures',
            pillar_2_desc: 'Crafting responsive, high-throughput web applications with modern microservices and reactive interfaces.',
            pillar_3_title: 'Resilient & Offline-First Systems',
            pillar_3_desc: 'Architecting fault-tolerant distributed networks capable of operating under degraded connectivity.',
            pillar_4_title: 'Data Security & Confidentiality',
            pillar_4_desc: 'Enforcing cryptographic standards, strict role-based access, and robust data integrity protocols.',

            // Projects Section
            proj_title: 'Engineering Projects & Initiatives',
            proj_sub: 'Ambitious research-driven platforms targeting intelligent education, micro-commerce, and healthcare crisis relief',
            filter_all: 'All Systems',
            filter_ai: 'AI & EdTech',
            filter_web: 'Cloud Platforms',
            filter_health: 'Digital Health & Triage',
            proj_view_details: 'View Project Case Study',
            proj_view_all_page: 'Explore Dedicated Projects Page',
            proj_modal_close: 'Close',
            proj_status_label: 'Status:',
            proj_stack_label: 'Tech Stack:',

            // Blog Section
            blog_title: 'Tech Blog & Research',
            blog_sub: 'Engineering insights, architectural reviews, and discoveries across AI and systems design',
            blog_read_more: 'Read Full Case Study',
            blog_view_all_page: 'Explore Dedicated Blog Hub',
            blog_modal_close: 'Close Reader',
            blog_author_label: 'Author:',
            blog_date_label: 'Published:',

            // About Section
            about_title: 'About NOVAX: Vision & Engineering Identity',
            about_sub: 'Driven by scientific inquiry, algorithmic rigor, and software craftsmanship',
            about_story_title: 'Our Genesis & Engineering Passion',
            about_story_p1: 'Formed in 2025 by a dedicated team of Artificial Intelligence Engineering students, <strong>NOVAX</strong> was founded on a singular premise: bridging theoretical computational advances with practical, resilient software systems addressing vital real-world frontiers.',
            about_story_p2: 'We approach software not merely as code syntax, but as systematic engineering solutions designed to remove bottlenecks, empower communities, and deliver measurable technological excellence.',
            about_vision_title: 'Our Technical Vision',
            about_vision_desc: 'To build benchmark-setting software platforms and intelligent algorithms characterized by speed, resilience, and user-centric design.',
            about_mission_title: 'Our Engineering Mission',
            about_mission_desc: 'To continuously leverage state-of-the-art AI, distributed infrastructure, and high-quality software craftsmanship to deliver lasting impact.',
            about_values_title: 'Our Core Engineering Values',
            val_1_title: 'Architectural Rigor & Precision',
            val_1_desc: 'Clean, maintainable, modular, and extensively documented codebase standards.',
            val_2_title: 'Purpose-Driven Innovation',
            val_2_desc: 'Focusing computational power on solving pressing, tangible challenges in essential sectors.',
            val_3_title: 'Continuous Mastery',
            val_3_desc: 'Active monitoring, implementation, and adaptation of the latest developments in AI and distributed systems.',

            // Contact Section
            contact_title: 'Contact Us',
            contact_sub: 'We welcome technical inquiries, research collaboration proposals, and architectural feedback',
            contact_form_title: 'Send a Direct Message',
            contact_name_label: 'Full Name',
            contact_name_ph: 'Your Full Name',
            contact_email_label: 'Email Address',
            contact_email_ph: 'name@example.com',
            contact_subject_label: 'Subject / Category',
            contact_sub_opt_general: 'General or Technical Inquiry',
            contact_sub_opt_collab: 'Partnership or Collaborative Proposal',
            contact_sub_opt_project: 'Specific Project Inquiry',
            contact_msg_label: 'Message Content',
            contact_msg_ph: 'Describe your inquiry or proposal in detail...',
            contact_btn_send: 'Transmit Message',
            contact_info_title: 'Direct Channels & Social Hub',
            contact_info_desc: 'Connect with our team through any of the following verified touchpoints:',
            contact_loc_label: 'Base & Scope:',
            contact_loc_val: 'Cloud-Distributed / Global Technical Outreach',
            contact_email_val: 'contact@novax.tech',
            contact_social_note: 'Note: The social buttons below are configured with verified link placeholders ready for your official handles.',

            // Auth & Dashboard
            auth_modal_title_login: 'Member Authentication',
            auth_modal_title_reg: 'Create a NOVAX Account',
            auth_email: 'Email Address',
            auth_pass: 'Password',
            auth_name: 'Full Name',
            auth_role: 'Discipline / Role',
            auth_btn_login: 'Authenticate',
            auth_btn_reg: 'Create Account',
            auth_no_account: 'No account yet? Register here',
            auth_has_account: 'Already registered? Sign in',
            auth_login_success: 'Authentication successful! Welcome.',
            auth_reg_success: 'Account created and authenticated successfully.',
            auth_logout_success: 'Signed out successfully.',

            // Dashboard
            dash_title: 'System Dashboard & Local Database',
            dash_welcome: 'Welcome,',
            dash_tab_projects: 'Manage Projects',
            dash_tab_messages: 'Incoming Inquiries',
            dash_tab_export: 'Database Backup',
            dash_add_proj_btn: 'Add New Project to Database',
            dash_export_btn: 'Export Database Dump (JSON)',
            dash_no_messages: 'No inquiry records logged yet.',

            // Footer
            footer_desc: 'Student collective specializing in Artificial Intelligence Engineering and next-generation digital architectures.',
            footer_quick_links: 'Quick Navigation',
            footer_tech_stack: 'Core Tech Stack',
            footer_rights: 'All Rights Reserved. NOVAX Technology Solutions © 2025 - 2026',
            footer_badge: 'Designed with Precision & AI Passion'
        }
    };

    let currentLang = localStorage.getItem('novax_lang') || 'ar';

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLang = lang;
        localStorage.setItem('novax_lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        updateDOM();
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    function getLanguage() {
        return currentLang;
    }

    function t(key) {
        return (translations[currentLang] && translations[currentLang][key]) || key;
    }

    function updateDOM() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            if (translation) {
                el.innerHTML = translation;
            }
        });

        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            const key = el.getAttribute('data-i18n-ph');
            const translation = t(key);
            if (translation) {
                el.setAttribute('placeholder', translation);
            }
        });

        const langToggleBtn = document.getElementById('langToggleText');
        if (langToggleBtn) {
            langToggleBtn.textContent = translations[currentLang].lang_name;
        }
    }

    return {
        init: function () {
            setLanguage(currentLang);
        },
        setLanguage,
        getLanguage,
        t,
        updateDOM
    };
})();
