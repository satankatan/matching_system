document.addEventListener('DOMContentLoaded', (event) => {
  // Восстанавливаем данные из LocalStorage
  const savedResume = localStorage.getItem('resumeText'); // 

  // Если данные существуют, заполняем текстовое поле
  if (savedResume) document.getElementById('resumeText').value = savedResume;

  // Сохраняем данные при отправке формы
  document.getElementById('resumeForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы

    // Получаем значение из текстового поля
    const resumeText = document.getElementById('resumeText').value;

    // Сохраняем данные в LocalStorage
    localStorage.setItem('resumeText', resumeText); // Используем ключ resumeText

    // Очищаем текстовое поле после сохранения (по желанию)
    document.getElementById('resumeText').value = '';

    alert('Данные сохранены!');
  });

  // Очистка данных из LocalStorage
  document.getElementById('clearDataButton').addEventListener('click', () => {
    // Удаляем данные из LocalStorage
    localStorage.removeItem('resumeText'); // Очищаем с тем же ключом

    // Очищаем текстовое поле
    document.getElementById('resumeText').value = '';

    alert('Данные удалены!');
  });

  console.log(savedResume);
});