"use strict";

/* =========================================================
   XURSHID & MADINA — WEDDING INVITATION
   Language, countdown, music, animation and sakura effects
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* -----------------------------------------------------
       Main elements
    ----------------------------------------------------- */

    const countdownElement = document.getElementById("countdown");
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-button");
    const musicIcon = musicButton?.querySelector(".music-icon");

    const languageButtons = document.querySelectorAll(".language-button");
    const locationLink = document.getElementById("location-link");

    /* -----------------------------------------------------
       Settings
    ----------------------------------------------------- */

    const WEDDING_DATE = new Date(
        "2026-08-16T19:00:00+05:00"
    ).getTime();

    const DEFAULT_LANGUAGE = "uz";
    const LANGUAGE_STORAGE_KEY = "wedding-language";
    const MUSIC_VOLUME = 0.45;

    let currentLanguage = getSavedLanguage();
    let countdownInterval = null;

    const interfaceText = {
        uz: {
            pageTitle: "Xurshid & Madina | Nikoh to‘yiga taklifnoma",
            description:
                "Xurshid va Madinaning nikoh to‘yiga taklifnoma. 16-avgust 2026, soat 19:00.",
            playMusic: "Musiqani yoqish",
            pauseMusic: "Musiqani to‘xtatish",
            weddingStarted: "Baxtli oilaviy hayot tilaymiz!"
        },

        en: {
            pageTitle: "Xurshid & Madina | Wedding Invitation",
            description:
                "Wedding invitation of Xurshid and Madina. 16 August 2026 at 19:00.",
            playMusic: "Play music",
            pauseMusic: "Pause music",
            weddingStarted: "Wishing you a happy married life!"
        }
    };

    /* =====================================================
       LANGUAGE SWITCHER
       ===================================================== */

    function getSavedLanguage() {
        try {
            const savedLanguage = localStorage.getItem(
                LANGUAGE_STORAGE_KEY
            );

            if (savedLanguage === "uz" || savedLanguage === "en") {
                return savedLanguage;
            }
        } catch (error) {
            console.warn("Language preference could not be read:", error);
        }

        return DEFAULT_LANGUAGE;
    }

    function saveLanguage(language) {
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
        } catch (error) {
            console.warn("Language preference could not be saved:", error);
        }
    }

    function setLanguage(language) {
        if (language !== "uz" && language !== "en") {
            language = DEFAULT_LANGUAGE;
        }

        currentLanguage = language;

        document.documentElement.lang = language;

        document
            .querySelectorAll("[data-uz][data-en]")
            .forEach((element) => {
                const translatedText = element.dataset[language];

                if (translatedText !== undefined) {
                    element.textContent = translatedText;
                }
            });

        languageButtons.forEach((button) => {
            const isActive = button.dataset.lang === language;

            button.classList.toggle("active", isActive);
            button.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );
        });

        updatePageMetadata();
        updateMusicButton();
        updateFinishedCountdownMessage();
        saveLanguage(language);
    }

    function updatePageMetadata() {
        const text = interfaceText[currentLanguage];

        document.title = text.pageTitle;

        const descriptionMeta = document.querySelector(
            'meta[name="description"]'
        );

        if (descriptionMeta) {
            descriptionMeta.setAttribute(
                "content",
                text.description
            );
        }

        const openGraphTitle = document.querySelector(
            'meta[property="og:title"]'
        );

        const openGraphDescription = document.querySelector(
            'meta[property="og:description"]'
        );

        const openGraphLocale = document.querySelector(
            'meta[property="og:locale"]'
        );

        if (openGraphTitle) {
            openGraphTitle.setAttribute(
                "content",
                text.pageTitle
            );
        }

        if (openGraphDescription) {
            openGraphDescription.setAttribute(
                "content",
                text.description
            );
        }

        if (openGraphLocale) {
            openGraphLocale.setAttribute(
                "content",
                currentLanguage === "uz"
                    ? "uz_UZ"
                    : "en_US"
            );
        }
    }

    languageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedLanguage = button.dataset.lang;

            if (selectedLanguage) {
                setLanguage(selectedLanguage);
            }
        });
    });

    /* =====================================================
       COUNTDOWN
       ===================================================== */

    function formatNumber(number) {
        return String(Math.max(0, number)).padStart(2, "0");
    }

    function updateCountdown() {
        const currentTime = Date.now();
        const distance = WEDDING_DATE - currentTime;

        if (distance <= 0) {
            stopCountdown();
            showFinishedCountdown();
            return;
        }

        const dayInMilliseconds = 1000 * 60 * 60 * 24;
        const hourInMilliseconds = 1000 * 60 * 60;
        const minuteInMilliseconds = 1000 * 60;

        const days = Math.floor(
            distance / dayInMilliseconds
        );

        const hours = Math.floor(
            (distance % dayInMilliseconds) /
            hourInMilliseconds
        );

        const minutes = Math.floor(
            (distance % hourInMilliseconds) /
            minuteInMilliseconds
        );

        const seconds = Math.floor(
            (distance % minuteInMilliseconds) /
            1000
        );

        if (daysElement) {
            daysElement.textContent = formatNumber(days);
        }

        if (hoursElement) {
            hoursElement.textContent = formatNumber(hours);
        }

        if (minutesElement) {
            minutesElement.textContent = formatNumber(minutes);
        }

        if (secondsElement) {
            secondsElement.textContent = formatNumber(seconds);
        }
    }

    function startCountdown() {
        updateCountdown();

        countdownInterval = window.setInterval(
            updateCountdown,
            1000
        );
    }

    function stopCountdown() {
        if (countdownInterval !== null) {
            window.clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }

    function showFinishedCountdown() {
        if (!countdownElement) {
            return;
        }

        countdownElement.innerHTML = "";

        const finishedMessage = document.createElement("p");

        finishedMessage.id = "countdown-finished";
        finishedMessage.className = "countdown-title";
        finishedMessage.textContent =
            interfaceText[currentLanguage].weddingStarted;

        countdownElement.appendChild(finishedMessage);
    }

    function updateFinishedCountdownMessage() {
        const finishedMessage = document.getElementById(
            "countdown-finished"
        );

        if (finishedMessage) {
            finishedMessage.textContent =
                interfaceText[currentLanguage].weddingStarted;
        }
    }

    /* =====================================================
       BACKGROUND MUSIC
       ===================================================== */

    function isAudioPlaying() {
        return Boolean(
            audio &&
            !audio.paused &&
            !audio.ended &&
            audio.currentTime > 0
        );
    }

    function updateMusicButton() {
        if (!musicButton) {
            return;
        }

        const playing = isAudioPlaying();
        const text = interfaceText[currentLanguage];

        musicButton.classList.toggle("playing", playing);

        musicButton.setAttribute(
            "aria-label",
            playing
                ? text.pauseMusic
                : text.playMusic
        );

        musicButton.setAttribute(
            "title",
            playing
                ? text.pauseMusic
                : text.playMusic
        );

        if (musicIcon) {
            musicIcon.textContent = playing ? "❚❚" : "♫";
        }
    }

    async function playMusic() {
        if (!audio) {
            return;
        }

        try {
            audio.muted = false;
            audio.volume = MUSIC_VOLUME;

            await audio.play();
            updateMusicButton();
        } catch (error) {
            console.info(
                "The browser requires user interaction before music can play."
            );
        }
    }

    function pauseMusic() {
        if (!audio) {
            return;
        }

        audio.pause();
        updateMusicButton();
    }

    async function toggleMusic() {
        if (!audio) {
            return;
        }

        if (isAudioPlaying()) {
            pauseMusic();
        } else {
            await playMusic();
        }
    }

    if (audio) {
        audio.volume = MUSIC_VOLUME;

        audio.addEventListener("play", updateMusicButton);
        audio.addEventListener("pause", updateMusicButton);
        audio.addEventListener("ended", updateMusicButton);
    }

    if (musicButton) {
        musicButton.addEventListener("click", toggleMusic);
    }

    /*
       Most mobile browsers block automatic music.
       Music starts after the visitor's first interaction
       anywhere on the page.
    */

    function startMusicAfterFirstInteraction(event) {
        if (event.target.closest("#music-button")) {
            return;
        }

        playMusic();

        document.removeEventListener(
            "pointerdown",
            startMusicAfterFirstInteraction
        );

        document.removeEventListener(
            "keydown",
            startMusicAfterFirstInteraction
        );
    }

    document.addEventListener(
        "pointerdown",
        startMusicAfterFirstInteraction,
        { passive: true }
    );

    document.addEventListener(
        "keydown",
        startMusicAfterFirstInteraction
    );

    /* =====================================================
       FADE-IN ANIMATIONS
       ===================================================== */

    const fadeElements = document.querySelectorAll(".fade-in");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        fadeElements.forEach((element) => {
            element.classList.add("show");
        });
    } else {
        const fadeObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        fadeElements.forEach((element, index) => {
            element.style.transitionDelay =
                `${Math.min(index * 35, 180)}ms`;

            fadeObserver.observe(element);
        });
    }

    /* =====================================================
       SAKURA LEAVES
       ===================================================== */

    let sakuraInterval = null;

    function createSakuraLeaf() {
        if (
            prefersReducedMotion ||
            document.hidden ||
            document.querySelectorAll(".sakura-leaf").length >= 12
        ) {
            return;
        }

        const leaf = document.createElement("span");

        leaf.className = "sakura-leaf";
        leaf.setAttribute("aria-hidden", "true");

        const leafSize = randomNumber(18, 34);
        const animationDuration = randomNumber(8, 15);
        const horizontalPosition = randomNumber(0, 100);
        const opacity = randomNumber(35, 70) / 100;

        leaf.style.left = `${horizontalPosition}vw`;
        leaf.style.width = `${leafSize}px`;
        leaf.style.height = `${leafSize}px`;
        leaf.style.opacity = String(opacity);
        leaf.style.animationDuration = `${animationDuration}s`;

        leaf.style.transform =
            `rotate(${randomNumber(-180, 180)}deg)`;

        document.body.appendChild(leaf);

        leaf.addEventListener(
            "animationend",
            () => leaf.remove(),
            { once: true }
        );

        window.setTimeout(() => {
            leaf.remove();
        }, (animationDuration + 1) * 1000);
    }

    function randomNumber(minimum, maximum) {
        return Math.random() * (maximum - minimum) + minimum;
    }

    function startSakuraAnimation() {
        if (prefersReducedMotion || sakuraInterval !== null) {
            return;
        }

        const isMobile = window.matchMedia(
            "(max-width: 600px)"
        ).matches;

        const creationInterval = isMobile ? 1400 : 950;

        createSakuraLeaf();

        sakuraInterval = window.setInterval(
            createSakuraLeaf,
            creationInterval
        );
    }

    function stopSakuraAnimation() {
        if (sakuraInterval !== null) {
            window.clearInterval(sakuraInterval);
            sakuraInterval = null;
        }
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopSakuraAnimation();
        } else {
            startSakuraAnimation();
        }
    });

    /* =====================================================
       LOCATION PLACEHOLDER
       ===================================================== */

    if (locationLink) {
        locationLink.addEventListener("click", (event) => {
            const href = locationLink.getAttribute("href");
            const linkIsPending =
                locationLink.dataset.linkPending === "true";

            if (
                linkIsPending ||
                !href ||
                href === "#"
            ) {
                event.preventDefault();
            }
        });
    }

    /* =====================================================
       PAGE OPENING
       ===================================================== */

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }

    window.requestAnimationFrame(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });
    });

    /* =====================================================
       INITIALIZATION
       ===================================================== */

    setLanguage(currentLanguage);
    startCountdown();
    startSakuraAnimation();
    updateMusicButton();
});
