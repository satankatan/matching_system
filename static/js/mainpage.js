document.addEventListener('DOMContentLoaded', function () {

  const button = document.getElementById("find_tims");


  const savedResume = localStorage.getItem('resumeText'); // 
  const userDescription = document.querySelector('.user-description');
  if (savedResume) {
    userDescription.textContent = savedResume;
  } else {
    userDescription.textContent =
      'Описание не добавлено. Пожалуйста, заполните данные в настройках.';
  }




  button.addEventListener('click', async function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    // id_user должен быть доступен на странице (например, из HTML или из сессии)
    const userId = document.getElementById("user_id").value;
    try {
        // Отправляем запрос на сервер, чтобы получить данные о пользователе
        const response = await fetch(`/api/get_user_game/${userId}`);
        const data = await response.json();

        // Проверяем, вернулись ли данные корректно
        if (response.ok) {
            const selectedGame = data.game_name;
            const rangeInGame = data.range_in_game;
            const gameStyle = data.game_style;

            // Формируем строку параметров для URL
            const params = `?game=${encodeURIComponent(selectedGame)}&range=${encodeURIComponent(rangeInGame)}&style=${encodeURIComponent(gameStyle)}&id=${encodeURIComponent(userId)}`;

            // Переход на новую страницу с параметрами
            window.location.href = '/find_teammates' + params;
        } else {
            console.error('Ошибка при получении данных:', data.error);
        }
    } catch (error) {
        console.error('Ошибка сети или сервера:', error);
    }
});
});
