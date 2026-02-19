from __main__ import db
from models.user_game_model import UserGame
from models.user_model import User
import os
from google import genai

def processing(user_id, game_name):
    user_game = db.session.query(UserGame).filter(UserGame.user_id == user_id, UserGame.game_name == game_name).first()
    if not user_game:
        return {"error": "Игра для пользователя не найдена"}
    
    info = user_game.info
    rating = user_game.raiting
    age = db.session.query(User).filter(User.user_id == user_id).first().age

    other_users_games = db.session.query(UserGame).filter(UserGame.game_name == game_name, UserGame.user_id != user_id).all()

    if not other_users_games:
        return {"error": "Не найдено других пользователей, играющих в эту игру"}

    other_players = []
    for game in other_users_games:
        user = db.session.query(User).filter(User.user_id == game.user_id).first()
        if user:
            other_players.append({
                "name": user.name,
                "rating": game.raiting,
                "description": game.info
            })

    prompt = f"""
    Подбери игрового напарника для пользователя.
    
    Пользователь играет в игру: {game_name}.
    Его рейтинг: {rating}.
    Описание навыков: {info}.
    
    Вот список других пользователей, которые играют в эту игру:
    {other_players}.
    
    Подбери напарника, который максимально соответствует уровню навыков и рейтингу этого игрока.
    Ответ должен быть в формате: список пользователей с именами и описанием, почему он подходит.
    """

    # ИСПРАВЛЕНО: Создаем клиент вместо использования старого синтаксиса
    try:
        # Создаем клиент с API ключом
        client = genai.Client(api_key=os.getenv('JEMENI_API_KEY'))
        
        # Используем клиент для генерации контента
        response = client.models.generate_content(
            model='gemini-2.0-flash',  # или 'gemini-1.5-flash'
            contents=prompt
        )
        
        print(response.text) 
        
        result = response.text
        return result 
    except Exception as e:
        return {"error": f"Ошибка при обращении к Gemini: {str(e)}"}