import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@0.1.3/+esm";

function switchView(viewId) {
    document.querySelectorAll('.app-view').forEach(v => v.classList.add('hidden'));
    document.getElementById('view-' + viewId).classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    // Nav links
    document.getElementById('nav-logo').addEventListener('click', () => switchView('home'));
    document.getElementById('btn-nav-home').addEventListener('click', () => switchView('home'));
    document.getElementById('btn-nav-about').addEventListener('click', () => switchView('about'));
    document.getElementById('btn-nav-chat').addEventListener('click', () => switchView('chat'));
    document.getElementById('btn-nav-contact').addEventListener('click', () => switchView('contact'));
    document.getElementById('btn-nav-feedback').addEventListener('click', () => switchView('feedback'));
    
    // Buttons
    document.getElementById('btn-hero-start').addEventListener('click', () => switchView('chat'));
    
    console.log("Buttons successfully wired.");
});
