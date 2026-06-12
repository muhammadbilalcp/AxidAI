// Simple Navigation Logic
function switchView(viewId) {
    // Hide all views
    document.querySelectorAll('.app-view').forEach(view => {
        view.classList.add('hidden');
    });
    // Show selected view
    const target = document.getElementById('view-' + viewId);
    if (target) {
        target.classList.remove('hidden');
        // Fix for chat view layout
        if (viewId === 'chat') {
            target.classList.add('flex');
        }
    }
}

// Ensure the logo clicks home
document.getElementById('logo').addEventListener('click', () => switchView('home'));
