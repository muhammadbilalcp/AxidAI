import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@0.1.3/+esm";

// API Key (Keep it here, but remember: NEVER share this file publically)
const API_KEY = "YOUR_API_KEY_HERE"; AQ.Ab8RN6K5_0xKQ7Tox7Mp-v_dsQDqDd9AwRCMok8vHqT8CHRc2g

function switchView(viewId) {
    document.querySelectorAll('.app-view').forEach(v => { v.classList.add('hidden'); v.classList.remove('active-view'); });
    const target = document.getElementById(`view-${viewId}`);
    if (target) { target.classList.remove('hidden'); target.classList.add('active-view'); }
    
    document.getElementById('top-nav').style.display = (viewId === 'chat') ? 'none' : 'flex';
}

async function executeChatQuery(msg) {
    const logs = document.getElementById('chat-logs');
    logs.insertAdjacentHTML('beforeend', `<div class="p-4 bg-zinc-800 text-white">${msg}</div>`);
    
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(msg);
        logs.insertAdjacentHTML('beforeend', `<div class="p-4 text-zinc-300">Axid AI: ${result.response.text()}</div>`);
    } catch (e) {
        logs.insertAdjacentHTML('beforeend', `<div class="text-red-500">Error: Check API Key</div>`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Buttons
    document.getElementById('btn-home')?.addEventListener('click', () => switchView('home'));
    document.getElementById('btn-chat')?.addEventListener('click', () => switchView('chat'));
    document.getElementById('hero-start-chat')?.addEventListener('click', () => switchView('chat'));

    // Chat
    document.getElementById('chat-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        if (input.value.trim()) {
            executeChatQuery(input.value.trim());
            input.value = '';
        }
    });
});
