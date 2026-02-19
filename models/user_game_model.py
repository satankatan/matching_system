from __main__ import db


class UserGame(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    game_name = db.Column(db.Text, nullable=False)
    nick = db.Column(db.Text, nullable=False)
    raiting = db.Column(db.Integer, nullable=False)
    info = db.Column(db.Text, nullable=True)
