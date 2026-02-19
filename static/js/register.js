document.addEventListener('DOMContentLoaded', function () {
  const regButton = document.querySelector('.reg-btn');
  const confirmButton = document.getElementById('confirmButton');
  const clearButton = document.getElementById('clearButton'); // Кнопка для очистки данных
  const gameNameDisplay = document.getElementById('gameNameDisplay'); // Элемент для выбранной игры
  const levelInput = document.querySelector('input[placeholder="Введите уровень, ММР..."]'); // Поле для уровня
  const styleInput = document.querySelector('textarea[placeholder="Введите ваш стиль игры"]'); // Поле для стиля игры
  let selectedGame = ''; // Переменная для хранения выбранной игры

  // Проверяем, есть ли сохраненные данные
  const savedUserData = localStorage.getItem('userData');
  const userData = savedUserData ? JSON.parse(savedUserData) : { games: [] };

 
  const gameOptions = document.querySelectorAll('.game-option');
  gameOptions.forEach((option) => {
      option.addEventListener('click', function (event) {
          selectedGame = event.target.textContent; // Получаем название выбранной игры
          gameNameDisplay.textContent = selectedGame; // Отображаем выбранную игру
      });
  });

  regButton.addEventListener('click', function (event) {
      event.preventDefault(); // Предотвращаем перезагрузку страницы

      userData.games = []; // Очищаем массив

      // Сохраняем данные в LocalStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      
    
      const name = document.querySelector('input[name="username"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const password = document.querySelector('input[name="password"]').value;
      
      // Формируем данные для отправки
      const data = { username: name, email: email, password: password };

      
      
      // Отправляем данные на сервер через fetch
      fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)  // Преобразуем данные в формат JSON
      })
      
      .then(response => response.json())
      .then(result => {
        if (result.success){
          addGamesIntoRegistration(result.user_id)
      } else {
          console.log(result)
          alert('Ошибка регистрации, попробуйте снова.');
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка, попробуйте позже.');
      });
  });

  function addGamesIntoRegistration(user_id) {
    const name = document.getElementById('selectedGame').textContent; // Получаем выбранную игру (из <p>)
    const type = document.querySelector('input[name="range-in-game"]').value; // Получаем уровень игры
    const description = document.querySelector('textarea').value; // Получаем стиль игры

      
    if (!name || !type|| !description) {
        alert('Заполните все поля для игры!');
        return;
    }

    // // Проверяем, была ли игра уже добавлена
    // const gameExists = userData.UserGame.some((gameObj) => gameObj.game_name === game_name);

    // if (gameExists) {
    //     alert('Эта игра уже добавлена!');
    //     return;
    // }

    // Формируем объект для отправки
    const newGame = {
        user_id : user_id,
        name: name,
        type: type,
        description: description,
    };

    fetch('http://127.0.0.1:5000/add_game', {
      method: 'POST',            
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGame)  // Преобразуем данные в формат JSON
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('Игра успешно сохранена!');
        window.location.href = '/mainpage';  // Переход на главную страницу
      } else {
      alert('Ошибка при сохранении игры.');
      }
    })
    .catch(error => {
    console.error('Ошибка:', error);
    alert('Произошла ошибка, попробуйте позже.');
    }
  );
  } 
});




