document.getElementById("find-all-tims").addEventListener("click", function() {
    // Получите user_id и game_name, которые вы хотите отправить
    const params = getUrlParams();

    // Создание URL для запроса
    const url = `/gamer-search/${params.user_id}/${params.game}`;
    // Отправка GET-запроса с помощью fetch
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не отвечает');
            }
            return response.json();
        })
        .then(data => {
            const paramData = `?data=${encodeURIComponent(data.data)}`
            window.location.href = '/list-of-applications' + paramData;
            document.getElementById('geminiResponse').value = data.data;
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
});

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        game: params.get('game'),
        range: params.get('range'),
        style: params.get('style'),
        user_id : params.get('id')
    };
}

// Заполнение полей значениями из URL
window.onload = function() {
    const params = getUrlParams();
    if (params.game) document.getElementById('gameInput').value = params.game;
    if (params.range) document.getElementById('rangeInput').value = params.range;
    if (params.style) document.getElementById('styleInput').value = params.style;
};
