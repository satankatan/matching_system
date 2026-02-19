from __main__ import db


class UserFriend(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), primary_key=True)
    friend_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), primary_key=True)
