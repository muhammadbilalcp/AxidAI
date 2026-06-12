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
async function executeChatQuery(userMessage) {
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

    const API_KEY = AQ.Ab8RN6K5_0xKQ7Tox7Mp-v_dsQDqDd9AwRCMok8vHqT8CHRc2g
    
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        const aiBox = `
            <div class="flex flex-col items-start w-full space-y-1">
                <div class="text-xs text-zinc-500 font-medium pl-1">Axid AI</div>
                <div class="text-zinc-300 max-w-2xl pl-1 font-light leading-relaxed">${text}</div>
            </div>
        `;
        if (logs) logs.insertAdjacentHTML('beforeend', aiBox);
        if (canvas) canvas.scrollTop = canvas.scrollHeight;
    } catch (error) {
        console.error("Error:", error);
        if (logs) logs.insertAdjacentHTML('beforeend', `<div class="text-red-500 text-sm">Error connecting to AI. Check your API key.</div>`);
    }
}

function startNewChat() {
    const logs = document.getElementById('chat-logs');
    const greeting = document.getElementById('default-chat-greeting');
    if (logs) { logs.innerHTML = ''; logs.classList.add('hidden'); }
    if (greeting) greeting.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    ['home', 'about', 'chat', 'contact', 'feedback'].forEach(view => {
        const btn = document.getElementById(`btn-${view}`);
        if (btn) btn.addEventListener('click', () => switchView(view));
    });

    const logo = document.getElementById('nav-logo');
    if (logo) logo.addEventListener('click', () => switchView('home'));

    const form = document.getElementById('chat-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('chat-input');
            if (input && input.value.trim()) {
                executeChatQuery(input.value.trim());
                input.value = '';
            }
        });
    }
});
