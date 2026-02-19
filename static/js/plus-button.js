document.getElementById('addGameButton').addEventListener('click', function() {
    const dropdown = document.getElementById('gameDropdown');
    
    // Переключаем видимость выпадающего списка
    dropdown.style.display = (dropdown.style.display === 'none' || dropdown.style.display === '') ? 'block' : 'none';
});

// Закрываем выпадающий список, если кликнули вне его
window.onclick = function(event) {
    if (!event.target.matches('.plus-button')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
};

// Обработчик клика по игре
const gameOptions = document.querySelectorAll('.game-option');
gameOptions.forEach(option => {
    option.addEventListener('click', function() {
        const selectedGame = document.getElementById('selectedGame');
        selectedGame.textContent = this.textContent; // Отображаем выбранную игру
        document.getElementById('gameDropdown').style.display = 'none'; // Скрываем выпадающий список
        // Здесь можно добавить логику для сдвига кнопки вправо, если необходимо
    });
});