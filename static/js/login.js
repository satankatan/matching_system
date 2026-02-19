document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('action');
  const button = document.querySelector('.btn');


  button.addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const dataUserLogin = {
      username : username,
      password : password
    }
      fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataUserLogin)  // Преобразуем данные в формат JSON
      })
      
      .then(response => response.json())
      .then(result => {
        if (result.success){
          localStorage.setItem('currentUser', username);
          window.location.href = 'mainpage';
      } else {
          console.log(result)
          alert('Ошибка входа, попробуйте снова.');
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка, попробуйте позже.');
      });
  });
});

