const countdownDate = new Date('2024-08-30T00:00:00+05:45').getTime();
const timerContainer = document.getElementById('timer-container');
const mainContent = document.getElementById('main-content');

function initializePage() {
    const now = new Date().getTime();
    const countdownCompleted = localStorage.getItem('countdownCompleted') === 'true';

    if (countdownCompleted && now >= countdownDate) {
        timerContainer.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.classList.add('fade-in');
    } else {
        timerContainer.style.display = 'flex';
        mainContent.style.display = 'none';
        localStorage.setItem('countdownCompleted', 'false');
        startCountdown();  
    }
}

function startCountdown() {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            clearInterval(timer);
            timerContainer.classList.add('fade-out');
            setTimeout(() => {
                timerContainer.style.display = 'none';
                localStorage.setItem('countdownCompleted', 'true');
                mainContent.style.display = 'block';
                mainContent.classList.add('fade-in');
            }, 2000);
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            const formatNumber = num => num.toString().padStart(2, '0');
            document.getElementById('timer').innerHTML = 
                `${formatNumber(days)}:${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
        }
    }, 1000);
}

initializePage();

document.querySelectorAll('.note').forEach(note => {
    note.addEventListener('click', function() {
        this.querySelector('.note-content').classList.toggle('clicked');
    });
});
