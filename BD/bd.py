import sqlite3

with sqlite3.connect('rofls.db') as db_lp:
    cursor_db = db_lp.cursor()
    sql_create_passwords = '''CREATE TABLE IF NOT EXISTS passwords (
                        login TEXT PRIMARY KEY, 
                        password TEXT NOT NULL
                    );'''
    sql_create_users = '''CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL, 
    password TEXT NOT NULL,
    age INTEGER NOT NULL,
    description TEXT NOT NULL,
    friends TEXT NOT NULL
     );'''
    
    sql_create_games = '''CREATE TABLE IF NOT EXISTS games (
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL
    );'''

    sql_create_usergame = '''CREATE TABLE IF NOT EXISTS usergame (
    user_id INTEGER NOT NULL,
    game_name TEXT PRIMARY KEY
    );'''

    sql_create_gameuser = '''CREATE TABLE IF NOT EXISTS gameuser (
    user_id INTEGER PRIMARY KEY,
    raiting INTEGER NOT NULL,
    game_role TEXT NOT NULL,
    nickname TEXT NOT NULL
    );'''

    cursor_db.execute(sql_create_passwords)
    cursor_db.execute(sql_create_users)
    cursor_db.execute(sql_create_games)
    cursor_db.execute(sql_create_usergame)
    cursor_db.execute(sql_create_gameuser)

    db_lp.commit()