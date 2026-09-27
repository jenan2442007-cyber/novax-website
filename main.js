/**
 * NOVAX Main Application Controller
 * Handles Navigation, Data Rendering, Modals, Forms, Authentication, and Dashboard
 */

document.addEventListener('DOMContentLoaded', async function () {
    // 1. Initialize Database & Internationalization
    await NOVAX_DB.init();
    NOVAX_I18N.init();

    // 2. DOM Elements
    const siteHeader = document.querySelector('.site-header');
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mainNav = document.getElementById('mainNav');
    const langToggleBtn = document.getElementById('langToggleBtn');

    const projectsGrid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogGrid = document.getElementById('blogGrid');

    // Modals
    const projectModal = document.getElementById('projectModal');
    const blogModal = document.getElementById('blogModal');
    const authModal = document.getElementById('authModal');
    const dashboardModal = document.getElementById('dashboardModal');

    // Auth Buttons & State
    const authActionBtn = document.getElementById('authActionBtn');
    const dashboardNavBtn = document.getElementById('dashboardNavBtn');
    const authForm = document.getElementById('authForm');
    const authSwitchBtn = document.getElementById('authSwitchBtn');
    const authModalTitle = document.getElementById('authModalTitle');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const regFields = document.querySelectorAll('.reg-only');

    // Contact Form
    const contactForm = document.getElementById('contactForm');

    let currentFilter = 'all';
    let isRegisterMode = false;

    // 3. Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    });

    // 4. Mobile Menu Toggle
    if (menuToggleBtn && mainNav) {
        menuToggleBtn.addEventListener('click', () => {
            const isDisplayed = mainNav.style.display === 'flex';
            mainNav.style.display = isDisplayed ? 'none' : 'flex';
            if (!isDisplayed) {
                mainNav.style.flexDirection = 'column';
                mainNav.style.position = 'absolute';
                mainNav.style.top = '100%';
                mainNav.style.left = '0';
                mainNav.style.width = '100%';
                mainNav.style.background = 'rgba(7, 9, 14, 0.96)';
                mainNav.style.padding = '1.5rem';
                mainNav.style.borderBottom = '1px solid var(--border-color)';
                mainNav.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
            }
        });

        // Close mobile nav on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    mainNav.style.display = 'none';
                }
            });
        });
    }

    // 5. Language Switcher
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const current = NOVAX_I18N.getLanguage();
            const next = current === 'ar' ? 'en' : 'ar';
            NOVAX_I18N.setLanguage(next);
            renderProjects();
            renderBlog();
            updateAuthUI();
        });
    }

    // 6. Project Rendering & Filtering
    async function renderProjects() {
        if (!projectsGrid) return;
        const lang = NOVAX_I18N.getLanguage();
        const projects = await NOVAX_DB.getProjects();
        const filtered = currentFilter === 'all' 
            ? projects 
            : projects.filter(p => p.category === currentFilter);

        projectsGrid.innerHTML = '';

        filtered.forEach(proj => {
            const title = (lang === 'ar') ? proj.title_ar : proj.title_en;
            const categoryName = (lang === 'ar') ? proj.category_label_ar : proj.category_label_en;
            const summary = (lang === 'ar') ? proj.summary_ar : proj.summary_en;
            const status = (lang === 'ar') ? (proj.status_ar || proj.status) : (proj.status_en || proj.status);
            const viewText = NOVAX_I18N.t('proj_view_details');

            const techTagsHTML = (proj.techStack || [])
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');

            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-card-header">
                    <div class="project-icon-badge">
                        <i class="fa-solid ${proj.icon || 'fa-microchip'}"></i>
                    </div>
                    <span class="project-status-tag">${status}</span>
                </div>
                <div class="project-card-body">
                    <div class="project-category-name">${categoryName}</div>
                    <h3 class="project-title">${title}</h3>
                    <p class="project-summary">${summary}</p>
                    <div class="project-tech-tags">
                        ${techTagsHTML}
                    </div>
                </div>
                <div class="project-card-footer">
                    <button class="btn btn-secondary btn-sm open-proj-btn" data-id="${proj.id}">
                        <span>${viewText}</span>
                        <i class="fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'}"></i>
                    </button>
                    <span class="highlight-gold" style="font-size: 0.82rem; font-weight: 700;">
                        <i class="fa-solid fa-star"></i> NOVAX R&D
                    </span>
                </div>
            `;

            card.querySelector('.open-proj-btn').addEventListener('click', () => {
                openProjectModal(proj);
            });

            projectsGrid.appendChild(card);
        });
    }

    // Filter Buttons Click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderProjects();
        });
    });

    // Project Details Modal
    function openProjectModal(proj) {
        if (!projectModal) return;
        const lang = NOVAX_I18N.getLanguage();
        const title = (lang === 'ar') ? proj.title_ar : proj.title_en;
        const details = (lang === 'ar') ? proj.details_ar : proj.details_en;
        const status = (lang === 'ar') ? (proj.status_ar || proj.status) : (proj.status_en || proj.status);

        document.getElementById('modalProjTitle').textContent = title;
        document.getElementById('modalProjStatus').textContent = status;
        document.getElementById('modalProjBody').innerHTML = details;

        const stackContainer = document.getElementById('modalProjStack');
        if (stackContainer) {
            stackContainer.innerHTML = (proj.techStack || [])
                .map(t => `<span class="tech-tag" style="background: rgba(16, 185, 129, 0.15); color: var(--color-green); border-color: rgba(16, 185, 129, 0.3);">${t}</span>`)
                .join('');
        }

        projectModal.classList.add('active');
    }

    // 7. Blog Rendering & Reader
    async function renderBlog() {
        if (!blogGrid) return;
        const lang = NOVAX_I18N.getLanguage();
        const articles = await NOVAX_DB.getArticles();

        blogGrid.innerHTML = '';

        articles.forEach(art => {
            const title = (lang === 'ar') ? art.title_ar : art.title_en;
            const category = (lang === 'ar') ? art.category_ar : art.category_en;
            const readTime = (lang === 'ar') ? art.readTime_ar : art.readTime_en;
            const summary = (lang === 'ar') ? art.summary_ar : art.summary_en;
            const readMoreText = NOVAX_I18N.t('blog_read_more');

            const card = document.createElement('div');
            card.className = 'blog-card';
            card.innerHTML = `
                <div class="blog-meta-top">
                    <span class="blog-category-badge">${category}</span>
                    <span><i class="fa-regular fa-clock"></i> ${readTime}</span>
                </div>
                <h3 class="blog-title">${title}</h3>
                <p class="blog-summary">${summary}</p>
                <div class="blog-footer">
                    <div class="blog-author-info">
                        <div class="blog-author-avatar">NX</div>
                        <span>${art.author || 'NOVAX'}</span>
                    </div>
                    <button class="btn btn-secondary btn-sm open-blog-btn" data-id="${art.id}">
                        ${readMoreText}
                    </button>
                </div>
            `;

            card.querySelector('.open-blog-btn').addEventListener('click', () => {
                openBlogModal(art);
            });

            blogGrid.appendChild(card);
        });
    }

    function openBlogModal(art) {
        if (!blogModal) return;
        const lang = NOVAX_I18N.getLanguage();
        const title = (lang === 'ar') ? art.title_ar : art.title_en;
        const content = (lang === 'ar') ? art.content_ar : art.content_en;

        document.getElementById('modalBlogTitle').textContent = title;
        document.getElementById('modalBlogMeta').textContent = `${art.author} • ${art.date}`;
        document.getElementById('modalBlogBody').innerHTML = content;

        blogModal.classList.add('active');
    }

    // 8. Modal Close Listeners
    document.querySelectorAll('.modal-close-btn, .modal-dismiss-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // 9. Auth Status & Modal Management
    function updateAuthUI() {
        const user = NOVAX_DB.getCurrentUser();
        if (user) {
            if (authActionBtn) {
                authActionBtn.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> <span>${NOVAX_I18N.t('nav_logout')}</span>`;
                authActionBtn.onclick = handleLogout;
            }
            if (dashboardNavBtn) {
                dashboardNavBtn.style.display = 'inline-flex';
                dashboardNavBtn.onclick = openDashboardModal;
            }
        } else {
            if (authActionBtn) {
                authActionBtn.innerHTML = `<i class="fa-solid fa-user-lock"></i> <span>${NOVAX_I18N.t('nav_login')}</span>`;
                authActionBtn.onclick = () => { window.location.href = 'login.html'; };
            }
            if (dashboardNavBtn) {
                dashboardNavBtn.style.display = 'none';
            }
        }
    }

    function openAuthModal() {
        if (!authModal) return;
        isRegisterMode = false;
        applyAuthMode();
        authModal.classList.add('active');
    }

    function applyAuthMode() {
        regFields.forEach(el => {
            el.style.display = isRegisterMode ? 'block' : 'none';
        });

        if (isRegisterMode) {
            authModalTitle.textContent = NOVAX_I18N.t('auth_modal_title_reg');
            authSubmitBtn.textContent = NOVAX_I18N.t('auth_btn_reg');
            authSwitchBtn.textContent = NOVAX_I18N.t('auth_has_account');
        } else {
            authModalTitle.textContent = NOVAX_I18N.t('auth_modal_title_login');
            authSubmitBtn.textContent = NOVAX_I18N.t('auth_btn_login');
            authSwitchBtn.textContent = NOVAX_I18N.t('auth_no_account');
        }
    }

    if (authSwitchBtn) {
        authSwitchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isRegisterMode = !isRegisterMode;
            applyAuthMode();
        });
    }

    if (authForm) {
        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail').value.trim();
            const password = document.getElementById('authPassword').value;

            try {
                if (isRegisterMode) {
                    const name = document.getElementById('authName').value.trim();
                    const role = document.getElementById('authRole').value.trim() || 'AI Engineering Student';
                    await NOVAX_DB.register({ name, email, password, role });
                    showToast(NOVAX_I18N.t('auth_reg_success'), 'success');
                } else {
                    await NOVAX_DB.login(email, password);
                    showToast(NOVAX_I18N.t('auth_login_success'), 'success');
                }
                authModal.classList.remove('active');
                authForm.reset();
                updateAuthUI();
            } catch (err) {
                showToast(err.message || 'Error occurred during authentication', 'error');
            }
        });
    }

    function handleLogout() {
        NOVAX_DB.logout();
        updateAuthUI();
        showToast(NOVAX_I18N.t('auth_logout_success'), 'info');
    }

    // 10. Dashboard Modal
    async function openDashboardModal() {
        if (!dashboardModal) return;
        const user = NOVAX_DB.getCurrentUser();
        if (!user) return;

        document.getElementById('dashUserName').textContent = user.name;
        document.getElementById('dashUserRole').textContent = user.role;

        // Render Inquiries in Dashboard
        const messages = await NOVAX_DB.getMessages();
        const msgList = document.getElementById('dashMessagesList');
        if (msgList) {
            if (messages.length === 0) {
                msgList.innerHTML = `<p style="color: var(--color-text-muted);">${NOVAX_I18N.t('dash_no_messages')}</p>`;
            } else {
                msgList.innerHTML = messages.map(m => `
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 1rem; margin-bottom: 0.8rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-weight: 700; font-size: 0.9rem;">
                            <span class="highlight-green">${m.name} (${m.email})</span>
                            <span style="color: var(--color-text-muted); font-size: 0.8rem;">${m.date}</span>
                        </div>
                        <div style="color: var(--color-gold); font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem;">${m.subject}</div>
                        <div style="font-size: 0.92rem; color: var(--color-text-sub);">${m.message}</div>
                    </div>
                `).join('');
            }
        }

        dashboardModal.classList.add('active');
    }

    // Export DB
    const exportDbBtn = document.getElementById('exportDbBtn');
    if (exportDbBtn) {
        exportDbBtn.addEventListener('click', async () => {
            const dataStr = await NOVAX_DB.exportDatabase();
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `novax_database_backup_${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            showToast('تم تصدير قاعدة البيانات بنجاح!', 'success');
        });
    }

    // 11. Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }

            await NOVAX_DB.saveMessage({ name, email, subject, message });

            const successMsg = NOVAX_I18N.getLanguage() === 'ar'
                ? 'شكراً لك! تم استلام رسالتك وحفظها بنجاح، سيتواصل معك الفريق قريباً.'
                : 'Thank you! Your message has been safely logged. Our team will follow up soon.';

            showToast(successMsg, 'success');
            contactForm.reset();
        });
    }

    // 12. Floating Toast System
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast-msg';

        let icon = 'fa-info-circle';
        let borderColor = 'var(--color-gold)';
        if (type === 'success') {
            icon = 'fa-circle-check';
            borderColor = 'var(--color-green)';
        } else if (type === 'error') {
            icon = 'fa-triangle-exclamation';
            borderColor = 'var(--color-red)';
        }

        toast.style.borderColor = borderColor;
        toast.innerHTML = `<i class="fa-solid ${icon}" style="color: ${borderColor}"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(15px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 350);
        }, 4000);
    }

    // 13. Initial Render
    renderProjects();
    renderBlog();
    updateAuthUI();
});
