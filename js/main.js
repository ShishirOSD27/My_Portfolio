

document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('opacity-0');
        setTimeout(() => {
            loader.style.display = 'none';
            AOS.refresh();
        }, 300);
    }, 500);

    // Initialize Animations
    AOS.init({
        duration: 400,
        once: true,
        mirror: false
    });

    // Populate Data
    populatePersonalInfo();
    populateSkills();
    populateProjects('all');
    populateServices();
    populateExperience();

    // Setup Event Listeners
    setupNavbar();
    setupMobileMenu();
    setupContactForm();

    document.getElementById('current-year').textContent = new Date().getFullYear();
});

function populatePersonalInfo() {
    const { personalInfo, socialLinks } = portfolioData;

    // Hero
    document.getElementById('hero-name').textContent = personalInfo.name;
    document.getElementById('hero-intro').textContent = personalInfo.intro;
    document.getElementById('profile-img').src = personalInfo.profileImage;
    document.getElementById('download-resume').href = personalInfo.resumeUrl;

    // Typewriter Effect
    new Typewriter('#typewriter', {
        strings: ['Software Developer', 'Android Expert', 'UI/UX Designer', 'Creative Thinker'],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
    });

    // About
    document.getElementById('about-text').textContent = personalInfo.about;
    document.getElementById('about-journey').textContent = personalInfo.journey;
    document.getElementById('about-goals').textContent = personalInfo.goals;
    document.getElementById('exp-count').textContent = personalInfo.experienceYears;
    document.getElementById('project-count').textContent = personalInfo.completedProjects;
    document.getElementById('client-count').textContent = personalInfo.happyClients;

    // Contact
    document.querySelector('.email-text').textContent = socialLinks.email;
    document.getElementById('contact-email').href = `mailto:${socialLinks.email}`;
    document.getElementById('contact-whatsapp').href = socialLinks.whatsapp;
    document.getElementById('github-link').href = socialLinks.github;
    document.getElementById('linkedin-link').href = socialLinks.linkedin;
    document.getElementById('facebook-link').href = socialLinks.facebook;
}

function populateSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';

    portfolioData.skills.forEach((skillGroup, index) => {
        const div = document.createElement('div');
        div.className = 'glass-card p-8 rounded-3xl';
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', index * 100);

        div.innerHTML = `
            <h3 class="text-xl font-bold mb-6 text-primary border-b border-white/10 pb-2">${skillGroup.category}</h3>
            <div class="flex flex-wrap gap-3">
                ${skillGroup.items.map(skill => `
                    <span class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-primary transition duration-300">
                        ${skill}
                    </span>
                `).join('')}
            </div>
        `;
        container.appendChild(div);
    });
}

function populateProjects(filter) {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? portfolioData.projects
        : portfolioData.projects.filter(p => p.category === filter);

    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-3xl overflow-hidden group';
        card.setAttribute('data-aos', 'zoom-in-up');
        card.setAttribute('data-aos-delay', index * 100);

        card.innerHTML = `
            <div class="relative overflow-hidden h-64">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60"></div>
                <div class="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold uppercase">
                    ${project.category}
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-bold mb-3">${project.title}</h3>
                <p class="text-text-muted text-sm mb-4 line-clamp-2">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${project.tech.map(t => `<span class="text-[10px] uppercase font-bold text-primary/80">${t}</span>`).join(' • ')}
                </div>
                <div class="flex gap-4">
                    ${project.apk ? `
                        <a href="${project.apk}" class="flex-1 text-center py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold hover:bg-primary hover:text-dark transition">
                            <i class="fa-solid fa-download mr-1"></i> APK
                        </a>
                    ` : ''}
                    <a href="${project.github}" class="w-10 h-10 rounded-xl glass flex items-center justify-center hover:text-primary transition">
                        <i class="fa-brands fa-github"></i>
                    </a>
                    <a href="${project.live}" class="w-10 h-10 rounded-xl glass flex items-center justify-center hover:text-primary transition">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function populateServices() {
    const container = document.getElementById('services-container');
    container.innerHTML = '';

    portfolioData.services.forEach((service, index) => {
        const div = document.createElement('div');
        div.className = 'glass-card p-10 rounded-[2.5rem] flex flex-col items-center text-center group';
        div.setAttribute('data-aos', 'fade-up');
        div.setAttribute('data-aos-delay', index * 150);

        div.innerHTML = `
            <div class="w-20 h-20 rounded-3xl glass flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500 transform group-hover:rotate-12">
                <i class="fa-solid ${service.icon} text-3xl text-primary group-hover:text-dark"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4">${service.title}</h3>
            <p class="text-text-muted leading-relaxed">${service.description}</p>
        `;
        container.appendChild(div);
    });
}

function populateExperience() {
    const container = document.getElementById('experience-container');
    container.innerHTML = '';

    portfolioData.experience.forEach((exp, index) => {
        const isLeft = index % 2 === 0;
        const div = document.createElement('div');
        div.className = `relative flex flex-col md:flex-row items-center justify-center ${isLeft ? 'md:flex-row-reverse' : ''}`;

        div.innerHTML = `
            <div class="hidden md:block w-1/2"></div>
            <div class="z-10 w-10 h-10 rounded-full bg-dark border-4 border-primary flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-primary animate-ping"></div>
            </div>
            <div class="w-full md:w-1/2 p-4 md:p-8" data-aos="${isLeft ? 'fade-right' : 'fade-left'}">
                <div class="glass-card p-8 rounded-3xl relative">
                    <span class="text-xs font-bold text-primary uppercase tracking-widest block mb-2">${exp.period}</span>
                    <h3 class="text-xl font-bold mb-1">${exp.role}</h3>
                    <h4 class="text-sm font-medium text-white/50 mb-4">${exp.company}</h4>
                    <p class="text-text-muted text-sm leading-relaxed">${exp.description}</p>
                    <div class="absolute top-1/2 ${isLeft ? '-right-2' : '-left-2'} transform -translate-y-1/2 w-4 h-4 glass rotate-45 border-none hidden md:block"></div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}



function setupNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navContainer = navbar.querySelector('.container');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navContainer.classList.remove('py-2');
            navContainer.classList.add('py-1');
            navbar.classList.add('max-w-5xl', 'bg-dark/80');
            navbar.classList.remove('max-w-7xl');
        } else {
            navContainer.classList.add('py-2');
            navContainer.classList.remove('py-1');
            navbar.classList.remove('max-w-5xl', 'bg-dark/80');
            navbar.classList.add('max-w-7xl');
        }

        // Active Highlight
        let current = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active', 'text-primary');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active', 'text-primary');
            }
        });
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-nav-link');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        btn.innerHTML = menu.classList.contains('hidden')
            ? '<i class="fa-solid fa-bars"></i>'
            : '<i class="fa-solid fa-xmark"></i>';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.innerHTML = '<i class="fa-solid fa-bars-staggered text-primary"></i>';
        });
    });
}



function setupContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch animate-spin"></i> Sending...';
        
        const formData = new FormData(form);
        const action = form.getAttribute('action');

        fetch(action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                status.classList.remove('hidden');
                status.className = 'mt-4 text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500';
                status.innerHTML = '<i class="fa-solid fa-check-circle mr-2"></i> Message sent successfully!';
                form.reset();
            } else {
                throw new Error();
            }
        })
        .catch(error => {
            status.classList.remove('hidden');
            status.className = 'mt-4 text-center p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500';
            status.innerHTML = '<i class="fa-solid fa-circle-exclamation mr-2"></i> Oops! Something went wrong.';
        })
        .finally(() => {
            btn.disabled = false;
            btn.innerHTML = originalText;
            setTimeout(() => status.classList.add('hidden'), 5000);
        });
    });
}
