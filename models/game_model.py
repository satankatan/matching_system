from __main__ import db


class Games(db.Model):
    name = db.Column(db.Text, primary_key=True)
    type = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
