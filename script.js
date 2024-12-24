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



// Корзина
document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.btnOrder');
    const allZakaz = document.querySelector('.allZakaz');
    const orderPriceDisplay = document.querySelector('.orderPrise'); // Элемент для итоговой суммы

    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const foodItem = button.closest('.food'); // Находим родительский элемент food
            const foodName = foodItem.querySelector('.nameAndPriseOrder').textContent; // Получаем название
            const foodPrice = foodItem.querySelector('.nameAndPriseOrder:last-of-type').textContent; // Получаем цену
            const foodImageSrc = foodItem.querySelector('img').src; // Получаем источник изображения

            if (button.textContent === 'Беру!') {
                // Создаем новый элемент для корзины
                const newItem = document.createElement('div');
                newItem.classList.add('one');
                newItem.innerHTML = `
                    <div class="one_name">
                        <img class="one_name_img" src="${foodImageSrc}" alt="${foodName}">
                        <p class="nameOne">${foodName}</p>
                    </div>
                    <div class="prise">
                        <p class="priseOne">${foodPrice}</p>
                    </div>
                    <div class="counter-container">
                        <button class="btnMinus">-</button>
                        <span class="counter">1</span>
                        <p>шт.</p>
                        <button class="btnPlus">+</button>
                    </div>
                    <div class="priseAll"></div>
                `;

                // Добавляем новый элемент в корзину
                allZakaz.appendChild(newItem);

                // Изменяем текст кнопки и цвет
                button.textContent = 'Взято';
                button.style.backgroundColor = 'green';
                
                // Добавляем обработчики для новых кнопок + и -
                attachCounterEvents(newItem);
                
                // Обновляем итоговую сумму
                updateOrderPrice();
            } else {
                // Удаляем элемент из корзины
                const itemsInBasket = allZakaz.querySelectorAll('.one');
                itemsInBasket.forEach(item => {
                    if (item.querySelector('.nameOne').textContent === foodName) {
                        item.remove(); // Удаляем элемент из корзины
                    }
                });

                // Возвращаем кнопку в исходное состояние
                button.textContent = 'Беру!';
                button.style.backgroundColor = '';
                
                // Обновляем итоговую сумму после удаления
                updateOrderPrice();
            }
        });
    });

    function attachCounterEvents(container) {
        const btnPlus = container.querySelector('.btnPlus');
        const btnMinus = container.querySelector('.btnMinus');
        const counterDisplay = container.querySelector('.counter');
        const priceDisplay = container.querySelector('.prise .priseOne'); // Получаем цену из элемента
        const totalPriceDisplay = container.querySelector('.priseAll'); // Элемент для отображения итоговой цены

        let count = parseInt(counterDisplay.textContent); // Начальное значение счетчика
        let price = parseInt(priceDisplay.textContent); // Получаем цену из элемента

        function updateCounter() {
            counterDisplay.textContent = count;
            updateTotalPrice(); // Обновляем итоговую цену
            
            if (count === 0) {
                container.remove(); // Удаляем элемент из DOM, если счетчик равен 0
                updateOrderPrice(); // Обновляем общую сумму заказа после удаления

                // Возвращаем кнопку в исходное состояние (если она была взята)
                const originalButton = Array.from(orderButtons).find(btn => btn.closest('.food').querySelector('.nameAndPriseOrder').textContent === container.querySelector('.nameOne').textContent);
                if (originalButton) {
                    originalButton.textContent = 'Беру!';
                    originalButton.style.backgroundColor = '';
                }
            }
        }

        function updateTotalPrice() {
            const totalPrice = price * count; // Итоговая цена для текущего элемента
            totalPriceDisplay.textContent = `${totalPrice} руб.`; // Обновляем текст с итоговой ценой
        }

        btnPlus.addEventListener('click', () => {
            count++;
            updateCounter();
            updateOrderPrice(); // Обновляем итоговую сумму при изменении количества
        });

        btnMinus.addEventListener('click', () => {
            if (count > 0) {
                count--;
                updateCounter();
                updateOrderPrice(); // Обновляем итоговую сумму при изменении количества
            }
        });

        updateTotalPrice(); // Инициализируем отображение итоговой цены при загрузке
    }

    function updateOrderPrice() {
        let totalOrderPrice = 0; // Переменная для хранения общей суммы заказа

        const itemsInBasket = allZakaz.querySelectorAll('.one');
        itemsInBasket.forEach(item => {
            const itemCounter = item.querySelector('.counter');
            const itemPrice = item.querySelector('.prise .priseOne');
            const itemCount = parseInt(itemCounter.textContent);
            const itemUnitPrice = parseInt(itemPrice.textContent);

            totalOrderPrice += itemCount * itemUnitPrice; // Суммируем стоимости всех элементов
        });

        orderPriceDisplay.textContent = `Итоговая сумма: ${totalOrderPrice} руб.`; // Обновляем итоговую сумму
    }
});



// открытие корзины
document.addEventListener('DOMContentLoaded', function() {
    const basketButton = document.querySelector('.header-logo-basket'); // Кнопка для открытия корзины
    const korzinaObertka = document.querySelector('.korzina-obertka'); // Корзина
    const exitButton = document.getElementById('exit'); // Кнопка закрытия корзины

    // Функция для открытия корзины
    basketButton.addEventListener('click', function() {
        korzinaObertka.style.display = 'flex'; // Показываем корзину с использованием flex
    });

    // Функция для закрытия корзины
    exitButton.addEventListener('click', function() {
        korzinaObertka.style.display = 'none'; // Скрываем корзину
    });
});

