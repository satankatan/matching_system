from flask import request, jsonify, session
from __main__ import app, db
from models.user_model import User
from models.game_model import Games
from models.user_game_model import UserGame
from models.user_friend_model import UserFriend
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_login import login_user, logout_user, login_required, current_user
from processing import processing
from flask import render_template, redirect, url_for
from email_validator import validate_email, EmailNotValidError


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get('username')
        password = data.get('password')
    
        user = User.query.filter_by(name=name).first()
        if user and user.password == password:
            login_user(user)
            return jsonify({"success": True,
                            "message": "Вход успешен!"}), 200
        else:
            return jsonify({"message": "Неверный логин или пароль"}), 400
    return render_template('login.html')



@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = request.get_json()

        # Получение данных пользователя
        name = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({"message": "Все поля обязательны для заполнения!"}), 404

        try:
            valid = validate_email(email)
            email = valid.email
        except EmailNotValidError:
            return jsonify({"message": "Неверный формат email!"}), 404

        if len(password) < 6:
            return jsonify({"message": "Пароль должен быть длиной минимум 6 символов!"}), 404

        if User.query.filter_by(name=name).first() or User.query.filter_by(email=email).first():
            return jsonify({"message": "Пользователь с таким логином или email уже существует"}), 404

        # Сохранение пользователя
        new_user = User(name=name, email=email, password=password, age=10, description="description")
        db.session.add(new_user)
        db.session.commit()
        
        return jsonify({"success": True,
                        "user_id" : new_user.user_id})
    
    return render_template('register.html')

@app.route('/add_game', methods=['GET', 'POST'])
def add_game():
     if request.method == 'POST':
        newGame = request.get_json()

        user_id = newGame.get('user_id')
        game_name = newGame.get('name')
        raiting = newGame.get('type')
        info = newGame.get('description')

        # if not all([name, type]):
        #     return jsonify({'error': 'Missing required fields'}), 400

        new_game = UserGame(user_id=user_id, game_name=game_name, raiting=raiting, info=info, nick='Hi')

        db.session.add(new_game)
        db.session.commit()

        return jsonify({"success": True})
     
     return render_template('register.html')


@app.route('/api/get_user_game/<int:user_id>', methods=['GET'])
def get_user_game(user_id):
    user_game = UserGame.query.filter_by(user_id=user_id).first()
    
    if user_game:
        return jsonify({
            'game_name': user_game.game_name,
            'range_in_game': user_game.raiting,
            'game_style': user_game.info
        })
    else:
        return jsonify({'error': 'Game data not found'}), 404 


@app.route("/mainpage")
def mainpage():
    user_name = current_user.name  
    
    return render_template('mainpage.html', user_name=user_name)


@app.route('/find_teammates')
@login_required
def find_teammates():
    # Передаём данные пользователя в шаблон
    return render_template('gamer-search-1.html')


@app.route('/gamer-search/<int:user_id>/<string:game_name>', methods=['GET'])
@login_required
def gamer_search(user_id, game_name):
    # Вызов функции processing
    result = processing(user_id, game_name)

    # Если ты хочешь вернуть JSON на фронтенд
    return jsonify({"data" : str(result)})

@app.route('/list-of-applications')
@login_required
def list_applic():
    return render_template('list-of-applications.html')










@app.route("/logout")
@login_required
def logout():
    logout_user()
    return "Выход выполнен"


@app.route('/get_users')
@login_required
def get_users():
    id_list = request.json['id_list']

    users_from_db = db.session.query(User).filter(User.user_id.in_(id_list)).all()

    users_dict = {}
    for user in users_from_db:
        users_dict[user.user_id] = {"name": user.name,
                                    "email": user.email,
                                    "age": user.age,
                                    "description": user.description}

    return jsonify(users_dict), 200

@app.route('/update_user')
@login_required
def update_user():
    data = request.get_json()

    kwargs = {key: value for key, value in data.items() if value is not None}

    if 'user_id' in kwargs:
        kwargs.pop('user_id')

    if 'password' in kwargs:
        kwargs['password'] = generate_password_hash(kwargs['password'], method='sha256')

    if not kwargs:
        return jsonify({"error": "No fields to update"}), 400
    
    db.session.query(User).update(kwargs, synchronize_session=False)
    db.session.commit()

    return jsonify({"message": "User updated successfully"}), 200


@app.route('/delete_user')
@login_required
def delete_user():
    db.session.delete(current_user)
    db.session.commit()

    return jsonify({"message": "User deleted successfully"}), 200

@app.route('/get_games')
@login_required
def get_games():
    game_names = request.json['game_names']

    games_from_db = db.session.query(Games).filter(Games.name.in_(game_names)).all()

    games_dict = {}
    for game in games_from_db:
        games_dict[game.name] = {"type": game.type,
                                 "description": game.description}

    return jsonify(games_dict), 200


@app.route('/update_game')
@login_required
def update_game():
    data = request.get_json()

    kwargs = {key: value for key, value in data.items() if value is not None}

    if not kwargs:
        return jsonify({"error": "No fields to update"}), 400
    
    db.session.query(Games).update(kwargs, synchronize_session=False)
    db.session.commit()

    return jsonify({"message": "Game updated successfully"}), 200

@app.route('/delete_game')
@login_required
def delete_game():
    db.session.query(Games).filter(Games.name == request.json['name']).delete()
    db.session.commit()

    return jsonify({"message": "Game deleted successfully"}), 200

@app.route('/get_user_games')
@login_required
def get_user_games():
    user_games_from_db = db.session.query(UserGame).filter(UserGame.user_id == current_user.user_id).all()

    user_games_dict = {}
    for user_game in user_games_from_db:
        user_games_dict[user_game.game_name] = {"nick": user_game.nick,
                                                "raiting": user_game.raiting,
                                                "info": user_game.info}

    return jsonify(user_games_dict), 200

@app.route('/add_user_game')
@login_required
def add_user_game():
    user_id = request.json['user_id']
    game_name = request.json['game_name']
    nick = request.json['nick']
    raiting = request.json['raiting']
    info = request.json['info']

    if not all([user_id, game_name, nick, raiting]):
        return jsonify({'error': 'Missing required fields'}), 400

    new_user_game = UserGame(user_id=user_id, game_name=game_name, nick=nick, raiting=raiting, info=info)

    db.session.add(new_user_game)
    db.session.commit()

    return jsonify({'message': 'User game added successfully'}), 201

@app.route('/update_user_game')
@login_required
def update_user_game():
    data = request.get_json()

    kwargs = {key: value for key, value in data.items() if value is not None}

    if not kwargs:
        return jsonify({"error": "No fields to update"}), 400
    
    db.session.query(UserGame).update(kwargs, synchronize_session=False)
    db.session.commit()

    return jsonify({"message": "User game updated successfully"}), 200

@app.route('/delete_user_game')
@login_required
def delete_user_game():
    db.session.query(UserGame).filter(UserGame.user_id == request.json['user_id'], UserGame.game_name == request.json['game_name']).delete()
    db.session.commit()

    return jsonify({"message": "User game deleted successfully"}), 200

@app.route('/get_user_friends')
@login_required
def get_user_friends():
    user_friends_from_db = db.session.query(UserFriend).filter(UserFriend.user1_id == current_user.user_id).all()

    user_friends_dict = {}
    for user_friend in user_friends_from_db:
        user_friends_dict[user_friend.user2_id] = {"user1_id": user_friend.user1_id,
                                                    "user2_id": user_friend.user2_id}

    return jsonify(user_friends_dict), 200

@app.route('/add_user_friend')
@login_required
def add_user_friend():
    user1_id = request.json['user1_id']
    user2_id = request.json['user2_id']

    if not all([user1_id, user2_id]):
        return jsonify({'error': 'Missing required fields'}), 400

    new_user_friend = UserFriend(user1_id=user1_id, user2_id=user2_id)

    db.session.add(new_user_friend)
    db.session.commit()

    return jsonify({'message': 'User friend added successfully'}), 201

@app.route('/update_user_friend')
@login_required
def update_user_friend():
    data = request.get_json()

    kwargs = {key: value for key, value in data.items() if value is not None}

    if not kwargs:
        return jsonify({"error": "No fields to update"}), 400
    
    db.session.query(UserFriend).update(kwargs, synchronize_session=False)
    db.session.commit()

    return jsonify({"message": "User friend updated successfully"}), 200

@app.route('/delete_user_friend')
@login_required
def delete_user_friend():
    db.session.query(UserFriend).filter(UserFriend.user1_id == request.json['user1_id'], UserFriend.user2_id == request.json['user2_id']).delete()
    db.session.commit()

    return jsonify({"message": "User friend deleted successfully"}), 200


# Эндпоинт для поиска игроков (в данный момент заглушка на ответе)


# @app.route('/matchmaking', methods=['POST'])
# def find_match():
#     data = request.get_json()
#     name = data.get('name')
#     email = data.get('email')
    
#     if not all([name, email]):
#         return jsonify({'error': 'Missing required fields'}), 400

#     # Здесь должна быть ваша логика для поиска подходящего игрока
#     # Это просто пример
#     match_user = User.query.filter_by(name=name).first()

#     if match_user:
#         return jsonify({'match': {'name': match_user.name, 'email': match_user.email, 'age': match_user.age, 'description': match_user.description, 'friends': match_user.friends}}), 200
#     else:
#         return jsonify({'error': 'No matching player found'}), 404

