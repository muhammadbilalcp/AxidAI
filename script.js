// View Switching

function switchView(viewId) {

    const views = document.querySelectorAll(".app-view");

    views.forEach(view => {

        view.classList.add("hidden");

        view.classList.remove("active-view");

    });

    const target = document.getElementById(`view-${viewId}`);

    if (target) {

        target.classList.remove("hidden");

        target.classList.add("active-view");

    }

    const nav = document.getElementById("top-nav");

    if (nav) {

        nav.style.display = viewId === "chat" ? "none" : "flex";

    }

    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(btn => {

        btn.classList.remove("text-white");

    });

    const activeBtn = document.getElementById(`btn-${viewId}`);

    if (activeBtn) {

        activeBtn.classList.add("text-white");

    }

}

// Chat System

function executeChatQuery(message) {

    const greeting = document.getElementById("default-chat-greeting");

    const logs = document.getElementById("chat-logs");

    const canvas = document.getElementById("chat-canvas");

    if (greeting) greeting.classList.add("hidden");

    if (logs) logs.classList.remove("hidden");

    const userMessage = `

        <div class="flex justify-end">

            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 max-w-xl">

                ${message}

            </div>

        </div>

    `;

    logs.insertAdjacentHTML("beforeend", userMessage);

    const input = message.toLowerCase();

    let reply = "";

    if (

        input.includes("who created you") ||

        input.includes("creator") ||

        input.includes("made you")

    ) {

        reply = "I was created by Muhammad Bilal.";

    }

    else if (

        input.includes("hi") ||

        input.includes("hello") ||

        input.includes("hey")

    ) {

        reply = "Hello! How can I help you today?";

    }

    else if (

        input.includes("roblox")

    ) {

        reply = "Roblox development is one of my favorite topics. Tell me about your game.";

    }

    else if (

        input.includes("quran")

    ) {

        reply = "The Quran mentions several holy books including the Torah, Psalms and Gospel.";

    }

    else if (

        input.includes("code") ||

        input.includes("bug") ||

        input.includes("error")

    ) {

        reply = "Send me the code and I'll help debug it.";

    }

    else {

        reply = `You said: "${message}". This is currently a demo response.`;

    }

    setTimeout(() => {

        const aiMessage = `

            <div class="flex justify-start">

                <div>

                    <div class="text-xs text-zinc-500 mb-1">

                        Axid AI

                    </div>

                    <div class="text-zinc-300">

                        ${reply}

                    </div>

                </div>

            </div>

        `;

        logs.insertAdjacentHTML("beforeend", aiMessage);

        canvas.scrollTop = canvas.scrollHeight;

    }, 500);

}

// New Chat

function startNewChat() {

    const logs = document.getElementById("chat-logs");

    const greeting = document.getElementById("default-chat-greeting");

    if (logs) {

        logs.innerHTML = "";

        logs.classList.add("hidden");

    }

    if (greeting) {

        greeting.classList.remove("hidden");

    }

}

// Page Setup

document.addEventListener("DOMContentLoaded", () => {

    // Navbar

    ["home", "about", "chat", "contact", "feedback"].forEach(view => {

        const btn = document.getElementById(`btn-${view}`);

        if (btn) {

            btn.addEventListener("click", () => {

                switchView(view);

            });

        }

    });

    // Logo

    const navLogo = document.getElementById("nav-logo");

    if (navLogo) {

        navLogo.addEventListener("click", () => {

            switchView("home");

        });

    }

    const sideLogo = document.getElementById("sidebar-logo");

    if (sideLogo) {

        sideLogo.addEventListener("click", () => {

            switchView("home");

        });

    }

    // Hero Buttons

    const startChatBtn = document.getElementById("hero-start-chat");

    if (startChatBtn) {

        startChatBtn.addEventListener("click", () => {

            switchView("chat");

        });

    }

    const learnMoreBtn = document.getElementById("hero-learn-more");

    if (learnMoreBtn) {

        learnMoreBtn.addEventListener("click", () => {

            switchView("about");

        });

    }

    // Sidebar Buttons

    const homeBtn = document.getElementById("sidebar-home-btn");

    if (homeBtn) {

        homeBtn.addEventListener("click", () => {

            switchView("home");

        });

    }

    const newChatBtn = document.getElementById("new-chat-btn");

    if (newChatBtn) {

        newChatBtn.addEventListener("click", startNewChat);

    }

    // Chat Form

    const form = document.getElementById("chat-form");

    if (form) {

        form.addEventListener("submit", e => {

            e.preventDefault();

            const input = document.getElementById("chat-input");

            if (!input) return;

            const text = input.value.trim();

            if (!text) return;

            executeChatQuery(text);

            input.value = "";

        });

    }

    // History Items

    const historyItems = document.querySelectorAll(".history-item");

    historyItems.forEach(item => {

        item.addEventListener("click", () => {

            const prompt = item.getAttribute("data-prompt");

            if (prompt) {

                executeChatQuery(prompt);

            }

        });

    });

    // Feedback

    const feedbackBtn = document.getElementById("feedback-submit-btn");

    if (feedbackBtn) {

        feedbackBtn.addEventListener("click", () => {

            const textarea = document.getElementById("feedback-text");

            alert("Feedback submitted successfully!");

            if (textarea) {

                textarea.value = "";

            }

            switchView("home");

        });

    }

});
