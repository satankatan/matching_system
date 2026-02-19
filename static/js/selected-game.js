document.getElementById('addGameButton').addEventListener('click', function () {
  const dropdown = document.getElementById('gameDropdown');

  // Переключаем видимость выпадающего списка
  dropdown.style.display =
    dropdown.style.display === 'none' || dropdown.style.display === ''
      ? 'block'
      : 'none';
});

// Закрываем выпадающий список, если кликнули вне его
window.onclick = function (event) {
  if (
    !event.target.matches('.plus-button') &&
    !event.target.matches('.game-option')
  ) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.style.display === 'block') {
        openDropdown.style.display = 'none';
      }
    }
  }
};
document.querySelector('.game-name-text').textContent = selectedGameName;


// Обработчик клика по игре
const gameOptions = document.querySelectorAll('.game-option');
let selectedGameName = ''; // Переменная для хранения выбранной игры

gameOptions.forEach((option) => {
  option.addEventListener('click', function (event) {
    selectedGameName = event.target.textContent; // Получаем название игры
    // Обновляем элемент с классом game-name-txt
    document.querySelector('.game-name-txt').textContent = selectedGameName; // Отображаем выбранную игру в game-name-txt

    // Закрываем dropdown после выбора
    document.getElementById('gameDropdown').style.display = 'none';
  });
});

