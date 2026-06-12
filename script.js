import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@0.1.3/+esm";

// Your API Key is now integrated
const API_KEY = "AQ.Ab8RN6K5_0xKQ7Tox7Mp-v_dsQDqDd9AwRCMok8vHqT8CHRc2g";

function switchView(viewId) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.add('hidden'));
    document.getElementById('view-' + viewId).classList.remove('hidden');
}

async function askAI(prompt) {
    const logs = document.getElementById('chat-logs');
    logs.innerHTML += `<div class="p-3 bg-zinc-900 rounded-lg text-white">User: ${prompt}</div>`;
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        logs.innerHTML += `<div class="p-3 text-zinc-300">Axid AI: ${result.response.text()}</div>`;
    } catch (e) {
        logs.innerHTML += `<div class="p-3 text-red-500">Error: Check your key or connection.</div>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Wiring
    document.getElementById('logo').addEventListener('click', () => switchView('home'));
    document.getElementById('nav-home').addEventListener('click', () => switchView('home'));
    document.getElementById('nav-about').addEventListener('click', () => switchView('about'));
    document.getElementById('nav-chat').addEventListener('click', () => switchView('chat'));
    document.getElementById('nav-contact').addEventListener('click', () => switchView('contact'));
    document.getElementById('nav-feedback').addEventListener('click', () => switchView('feedback'));
    document.getElementById('btn-start').addEventListener('click', () => switchView('chat'));

    // Chat Form Wiring
    document.getElementById('chat-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        if (input.value.trim()) {
            askAI(input.value.trim());
            input.value = '';
        }
    });
    
    console.log("Axid AI: System initialized.");
});
