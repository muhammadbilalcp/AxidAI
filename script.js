import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@0.1.3/+esm";

console.log("Axid AI: Script has started loading...");

// Simple function to test if buttons work
function testButton() {
    alert("The button is working!");
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("Axid AI: DOM fully loaded and buttons are being wired.");

    // Select the button by its ID (make sure it matches your HTML)
    const startBtn = document.getElementById('hero-start-chat'); 
    
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            console.log("Start Chatting button clicked!");
            alert("Button click detected!");
            // switchView('chat'); // Uncomment this later once the alert works
        });
    } else {
        console.error("Error: Could not find button with ID 'hero-start-chat'.");
    }
});
