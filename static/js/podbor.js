// document.getElementById("btn-gamer-search-next-step").addEventListener("click", function() {
//     const params = new URLSearchParams(window.location.search);
//     const userId = params.get('id');  
//     const gameName = params.get('game');  

//     fetch('/gamer-search/<int:user_id>/<string:game_name>', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user_id: userId, game_name: gameName }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.error) {
//             document.getElementById('playersList').innerHTML = `<p>${data.error}</p>`;
//         } else {
//             document.getElementById('playersList').innerHTML = `<p>${data.result}</p>`;
//             window.location.href = '/list-of-applications';
//         }
//     })
//     .catch(error => console.error('Ошибка:', error));
// })

// function startNewSearch() {
//     // Логика для нового поиска, возможно, перенаправление или обновление страницы
//     window.location.href = '/new_search_page';  // Пример перенаправления на новую страницу поиска
// }

// function displayPlayers(data) {
//     const playersListDiv = document.getElementById('playersList');
    
//     // Проверка на ошибку
//     if (data.error) {
//         console.log('Ошибка:', data.error); // Отладочный вывод в консоль
//         playersListDiv.innerHTML = `<p>${data.error}</p>`;
//     } else {
//         // Отображение игроков, если данные есть
//         console.log('Данные игроков:', data.players); // Отладочный вывод в консоль
//         playersListDiv.innerHTML = ''; // Очищаем список перед добавлением
        
//         data.players.forEach(player => {
//             playersListDiv.innerHTML += `
//                 <p>Имя: ${player.name}</p>
//                 <p>Рейтинг: ${player.rating}</p>
//                 <p>Описание: ${player.description}</p>
//                 <div class="gamer-search-line"></div>`;
//         });
//     }
// }
