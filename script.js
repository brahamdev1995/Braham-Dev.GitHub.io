document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle');

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        toggleBtn.textContent = body.classList.contains('dark') ? 'Light Theme' : 'Dark Theme';
    });
});
