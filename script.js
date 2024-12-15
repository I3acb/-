//Беру
document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.btnOrder');

    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === 'Беру!') {
                button.textContent = 'Взято'; 
                button.style.backgroundColor = 'green'; 
            } else {
                button.textContent = 'Беру!'; 
                button.style.backgroundColor = '';
            }
        });
    });
});
//Фильтр
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-filter');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
