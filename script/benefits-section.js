// Benefits Section Functionality
(() => {
    const track = document.getElementById("track");
    const wrap = track.parentElement;
    const cards = Array.from(track.children);
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    const isMobile = () => matchMedia("(max-width:767px)").matches;

    let current = 0;

    function center(i) {
        const card = cards[i];
        const axis = isMobile() ? "top" : "left";
        const size = isMobile() ? "clientHeight" : "clientWidth";
        const start = isMobile() ? card.offsetTop : card.offsetLeft;
        wrap.scrollTo({
            [axis]: start - (wrap[size] / 2 - card[size] / 2),
            behavior: "smooth"
        });
    }

    function toggleUI(i) {
        cards.forEach((c, k) => {
            if (k === i) {
                c.setAttribute("active", "");
                c.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            } else {
                c.removeAttribute("active");
                c.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            }
        });
        prev.disabled = i === 0;
        next.disabled = i === cards.length - 1;
    }

    function activate(i, scroll) {
        if (i === current) return;
        current = i;
        toggleUI(i);
        if (scroll) center(i);
    }

    function go(step) {
        activate(Math.min(Math.max(current + step, 0), cards.length - 1), true);
    }

    prev.onclick = () => go(-1);
    next.onclick = () => go(1);

    addEventListener(
        "keydown",
        (e) => {
            if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
            if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
        },
        { passive: true }
    );

    cards.forEach((card, i) => {
        card.addEventListener(
            "mouseenter",
            () => matchMedia("(hover:hover)").matches && activate(i, true)
        );
        card.addEventListener("click", () => activate(i, true));
    });

    let sx = 0,
        sy = 0;
    track.addEventListener(
        "touchstart",
        (e) => {
            sx = e.touches[0].clientX;
            sy = e.touches[0].clientY;
        },
        { passive: true }
    );

    track.addEventListener(
        "touchend",
        (e) => {
            const dx = e.changedTouches[0].clientX - sx;
            const dy = e.changedTouches[0].clientY - sy;
            if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60)
                go((isMobile() ? dy : dx) > 0 ? -1 : 1);
        },
        { passive: true }
    );

    addEventListener("resize", () => center(current));

    toggleUI(0);
    center(0);
})();
