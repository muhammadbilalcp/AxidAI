import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@0.1.3/+esm";

console.log("Axid AI: script.js has loaded successfully.");

const API_KEY = "AQ.Ab8RN6K5_0xKQ7Tox7Mp-v_dsQDqDd9AwRCMok8vHqT8CHRc2g"; // Replace with your actual key

// 1. Navigation Logic
function switchView(viewName) {
    console.log("Switching to:", viewName);
    document.getElementById('view-home').classList.add('hidden');
    document.getElementById('view-chat').classList.add('hidden');
    document.getElementById(`view-${viewName}`).classList.remove('hidden');
}

// 2. AI Logic
async function sendMessage(text) {
    const logs = document.getElementById('chat-logs');
    logs.innerHTML += `<div class="text-right">User: ${text}</div>`;

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);AQ.Ab8RN6K5_0xKQ7Tox7Mp-v_dsQDqDd9AwRCMok8vHqT8CHRc2g
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(text);
        logs.innerHTML += `<div class="text-zinc-400">Axid AI: ${result.response.text()}</div>`;
    } catch (e) {
        logs.innerHTML += `<div class="text-red-500">Error: Check your API Key!</div>`;
        console.error("AI Error:", e);
    }
}

// 3. Button Wiring (The glue that makes it work)
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, wiring buttons...");

    document.getElementById('btn-home').addEventListener('click', () => switchView('home'));
    document.getElementById('btn-chat').addEventListener('click', () => switchView('chat'));
    document.getElementById('start-btn').addEventListener('click', () => switchView('chat'));

    document.getElementById('chat-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        if (input.value) {
            sendMessage(input.value);
            input.value = '';
        }
    });
});
