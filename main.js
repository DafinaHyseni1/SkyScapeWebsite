document.addEventListener("DOMContentLoaded", () => {


    const precautionBtn = document.getElementById('precaution-button');

    if (precautionBtn) {
        precautionBtn.addEventListener('click', function () {
            const bookSection = document.getElementById('book-flight-section');

            if (!bookSection) return;

            bookSection.style.display = 'block';
            bookSection.scrollIntoView({ behavior: 'smooth' });
        });
    }


    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {

        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }


    window.addEventListener("scroll", function () {
        const scrollPosition = window.scrollY;
        const section = document.querySelector(".section-2");

        if (!section) return;

        const blurAmount = Math.min(5, scrollPosition / 100);
        section.style.filter = `blur(${5 - blurAmount}px)`;
    });


    const openBtn = document.getElementById("openModal");
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementById("closeModal");

    if (openBtn && modal && closeBtn) {

        openBtn.addEventListener("click", () => {
            modal.classList.add("active");
        });

        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
            }
        });
    }


    const hamburger2 = document.getElementById("hamburger");
    const nav = document.querySelector("nav");

    if (hamburger2 && nav) {

        hamburger2.addEventListener("click", () => {
            nav.classList.toggle("nav-active");
        });

    }

});


const cards = document.querySelectorAll(".destination-card");
const pageBtns = document.querySelectorAll(".page-btn");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentPage = 1;
let currentFilter = "all";
const itemsPerPage = 6;

function getFilteredCards() {
    return Array.from(cards).filter(card => {
        const category = card.dataset.category;
        return currentFilter === "all" || category === currentFilter;
    });
}

function updatePagination(filteredCards) {
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

    pageBtns.forEach((btn, index) => {
        if (index < totalPages) {
            btn.style.display = "inline-block";
        } else {
            btn.style.display = "none";
        }
    });
}

function showCards() {

    const filteredCards = getFilteredCards();

    updatePagination(filteredCards);

    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    filteredCards.forEach((card, index) => {
        if (index >= start && index < end) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    cards.forEach(card => {
        const category = card.dataset.category;

        if (currentFilter !== "all" && category !== currentFilter) {
            card.style.display = "none";
        }
    });

    pageBtns.forEach(btn => btn.classList.remove("active"));

    const activeBtn = document.querySelector(`[data-page="${currentPage}"]`);
    if (activeBtn) activeBtn.classList.add("active");
}

pageBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentPage = parseInt(btn.dataset.page);
        showCards();
    });
});

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentFilter = btn.dataset.filter;
        currentPage = 1;

        showCards();
    });
});

showCards();


const videos = document.querySelectorAll(".bg-video");
let current = 0;

setInterval(() => {

    let next = (current + 1) % videos.length;

    videos[current].classList.remove("active");
    videos[next].classList.add("active");

    current = next;

}, 7000);

document.querySelectorAll("a[href='#book']").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("modal").classList.add("active");
    });
});
