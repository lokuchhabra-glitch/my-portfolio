// === MOBILE MENU TOGGLE ===
const menu = document.getElementById('menu');
const navbar = document.getElementById('navbar');
menu.addEventListener('click', () => navbar.classList.toggle('active'));

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navbar.classList.remove('active'));
});

// === ACTIVE NAV LINK ON SCROLL ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 200;
        if (scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });

    // Back to top button
    const btn = document.getElementById('backToTop');
    if (btn) btn.classList.toggle('visible', scrollY > 400);
});

// === TYPEWRITER EFFECT ===
const phrases = ['Frontend Developers', 'UI/UX Designers', 'Problem Solvers', 'Creative Thinkers', 'Team HEKSAAA'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter-text');

function typewrite() {
    if (!typeEl) return;
    const current = phrases[phraseIdx];
    typeEl.textContent = current.substring(0, charIdx);

    if (!deleting) {
        charIdx++;
        if (charIdx > current.length) { deleting = true; setTimeout(typewrite, 1500); return; }
    } else {
        charIdx--;
        if (charIdx < 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; charIdx = 0; setTimeout(typewrite, 400); return; }
    }
    setTimeout(typewrite, deleting ? 40 : 80);
}
typewrite();

// === COUNTER ANIMATION ===
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.count;
            let count = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
                count += step;
                if (count >= target) { count = target; clearInterval(timer); }
                el.textContent = count;
            }, 40);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// === SKILL BAR ANIMATION ===
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObserver.observe(bar));

// === MEMBER CARD TILT EFFECT ===
document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-8px) scale(1.02) perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
