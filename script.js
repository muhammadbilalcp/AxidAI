import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@0.1.3/+esm";
// Production View Toggling System
function switchView(viewId) {
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => {
        v.classList.remove('active-view');
        v.classList.add('hidden');
    });

    const target = document.getElementById(`view-${viewId}`);
    const topNav = document.getElementById('top-nav');

    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active-view');
    }

    if (topNav) {
        topNav.style.display = (viewId === 'chat') ? 'none' : 'flex';
    }

    const subBtns = document.querySelectorAll('.nav-btn');
    subBtns.forEach(b => b.classList.remove('text-white'));
    const targetBtn = document.getElementById(`btn-${viewId}`);
    if (targetBtn) targetBtn.classList.add('text-white');
}

// Adaptive AI Interaction Module
function executeChatQuery(userMessage) {
    const greeting = document.getElementById('default-chat-greeting');
    const logs = document.getElementById('chat-logs');
    const canvas = document.getElementById('chat-canvas');

    if (greeting) greeting.classList.add('hidden');
    if (logs) logs.classList.remove('hidden');

    const userBox = `
        <div class="flex flex-col items-end w-full">
            <div class="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-2.5 max-w-xl text-zinc-100 font-normal">
                ${userMessage}
            </div>
        </div>
    `;
    if (logs) logs.insertAdjacentHTML('beforeend', userBox);

    const check = userMessage.toLowerCase().trim();
    let reply = "";

    if (check.includes('created') || check.includes('made you') || check.includes('creator') || check.includes('build you')) {
        reply = "I was created by Muhammad Bilal.";
    } else if (check.includes('hi') || check.includes('hello') || check.includes('yoo') || check.includes('hey') || check.includes('sup')) {
        reply = "Hey! Ready to drop some ideas or debug some code? Hit me with whatever you're working on.";
    } else if (check.includes('roblox') || check.includes('game') || check.includes('rivals')) {
        reply = "Roblox layout mechanics or local replication scripts? Let's make sure the script optimization is clean. Drop the setup or errors and let's build it.";
    } else if (check.includes('quran') || check.includes('book')) {
        reply = "Fascinating topic. Whether we are breaking down references to classical history or structural data, let's look at the direct facts. What precise question can I answer for you?";
    } else if (check.includes('code') || check.includes('bug') || check.includes('error')) {
        reply = "Let's debug this together like peers. Drop the script block or terminal error right here and we'll refine the logic together.";
    } else {
        reply = `Interesting point. Let's cut right past the standard surface talk and tackle "${userMessage}" directly. How would you like us to break this down or scale it up?`;
    }

    setTimeout(() => {
        const aiBox = `
            <div class="flex flex-col items-start w-full space-y-1">
                <div class="text-xs text-zinc-500 font-medium pl-1">Axid AI</div>
                <div class="text-zinc-300 max-w-2xl pl-1 font-light leading-relaxed">${reply}</div>
            </div>
        `;
        if (logs) logs.insertAdjacentHTML('beforeend', aiBox);
        if (canvas) canvas.scrollTop = canvas.scrollHeight;
    }, 300);
}

function startNewChat() {
    const logs = document.getElementById('chat-logs');
    const greeting = document.getElementById('default-chat-greeting');
    if (logs) {
        logs.innerHTML = '';
        logs.classList.add('hidden');
    }
    if (greeting) greeting.classList.remove('hidden');
}

// Global UI Lifecycle Wire-up
document.addEventListener('DOMContentLoaded', () => {
    // Nav Bar triggers
    ['home', 'about', 'chat', 'contact', 'feedback'].forEach(view => {
        const btn = document.getElementById(`btn-${view}`);
        if (btn) btn.addEventListener('click', () => switchView(view));
    });

    // Branding links
    const logo = document.getElementById('nav-logo');
    if (logo) logo.addEventListener('click', () => switchView('home'));
    const sideLogo = document.getElementById('sidebar-logo');
    if (sideLogo) sideLogo.addEventListener('click', () => switchView('home'));

    // Hero element CTA hooks
    const startChatBtn = document.getElementById('hero-start-chat');
    if (startChatBtn) startChatBtn.addEventListener('click', () => switchView('chat'));
    const learnMoreBtn = document.getElementById('hero-learn-more');
    if (learnMoreBtn) learnMoreBtn.addEventListener('click', () => switchView('about'));

    // Chat Utilities
    const newChat = document.getElementById('new-chat-btn');
    if (newChat) newChat.addEventListener('click', startNewChat);
    const sideHome = document.getElementById('sidebar-home-btn');
    if (sideHome) sideHome.addEventListener('click', () => switchView('home'));

    // Chat Submission Router
    const form = document.getElementById('chat-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chat-input');
            if (!input) return;
            const msg = input.value.trim();
            if (!msg) return;
            
            executeChatQuery(msg);
            input.value = '';
        });
    }

    // Sidebar history clicks
    const historyItems = document.querySelectorAll('.history-item');
    historyItems.forEach(item => {
        item.addEventListener('click', () => {
            const promptText = item.getAttribute('data-prompt');
            if (promptText) executeChatQuery(promptText);
        });
    });

    // Feedback Submission handler
    const feedbackBtn = document.getElementById('feedback-submit-btn');
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
            alert('Feedback submitted. Thanks for optimizing Axid AI!');
            const textarea = document.getElementById('feedback-text');
            if (textarea) textarea.value = '';
            switchView('home');
        });
    }
});
