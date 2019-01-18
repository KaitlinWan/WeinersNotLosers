import json
import sqlite3
import urllib
import ssl
import time
import sys

from flask import Flask, render_template, request, session, redirect, url_for, flash, Response
from urllib.request import urlopen

from util import authenticate
import db_func

app = Flask(__name__)
app.secret_key = "wereallweinerssometimes"

def getQuote():
    '''gets quote from favQs api'''
    response = urlopen('https://favqs.com/api/qotd')
    r = response.read()
    d = json.loads(r.decode('utf-8'))
    #print(d['quote']['body'])
    return d['quote']['body']

def getBacon():
    '''gets meat lorem ipsum'''
    response = urlopen('https://baconipsum.com/api/?type=meat-and-filler&paras=1')
    r = response.read()
    d = json.loads(r.decode('utf-8'))
    #print(d[0])
    return d[0]

def getAdvice():
    '''gets advice from Advice Slip API'''
    response = urlopen('https://api.adviceslip.com/advice')
    r = response.read()
    d = json.loads(r.decode('utf-8'))
    #print(d['slip']['advice'])
    return d['slip']['advice']

def duplicate(x):
    text = ""
    while (len(text) < 500):
        text += x + " "
    return text

@app.route('/')
def go():
    #print(wordList(getBacon()))
    #print(wordList(getQuote()))
    #print(wordList(getAdvice()))
    return redirect(url_for("home"))

@app.route('/index', methods=["GET"])
def home():
    if authenticate.is_loggedin(session):
        is_loggedin = True
        username = session['loggedin']
        data = db_func.getData(username)[0]
        hd = data[0]
        gm = data[1]
        sp = data[2]
    else:
        username = ""
        is_loggedin = False
        data = []
        hd = 0
        gm = 0
        sp = 0
    # print(data)
    if request.args.get('q') == 'Quotes':
        text = duplicate(getQuote())
        if authenticate.is_loggedin(session):
            is_loggedin = True
            username = session['loggedin']
            data = db_func.getData(username)[0]
            hd = data[0]
            gm = data[1]
            sp = data[2]
        else:
            username = ""
            is_loggedin = False
            data = []
            hd = 0
            gm = 0
            sp = 0
        # print(data)
        return render_template('index.html', text=text, loggedin=is_loggedin, username=username, data=data, hd=hd, gm=gm, sp=sp)
    if request.args.get('m') == 'Meat Lorem Ipsum':
        text = duplicate(getBacon())
        if authenticate.is_loggedin(session):
            is_loggedin = True
            username = session['loggedin']
            data = db_func.getData(username)[0]
            hd = data[0]
            gm = data[1]
            sp = data[2]
        else:
            username = ""
            is_loggedin = False
            data = []
            hd = 0
            gm = 0
            sp = 0
        # print(data)
        return render_template('index.html', text=text, loggedin=is_loggedin, username=username, data=data, hd=hd, gm=gm, sp=sp)
    if request.args.get('a') == 'Advice':
        text = duplicate(getAdvice())
        if authenticate.is_loggedin(session):
            is_loggedin = True
            username = session['loggedin']
            data = db_func.getData(username)[0]
            hd = data[0]
            gm = data[1]
            sp = data[2]
        else:
            username = ""
            is_loggedin = False
            data = []
            hd = 0
            gm = 0
            sp = 0
        return render_template('index.html', text=text, loggedin=is_loggedin, username=username, data=data, hd=hd, gm=gm, sp=sp)
    # print(data)
    return render_template("index.html", loggedin=is_loggedin, username=username, data=data, hd=hd, gm=gm, sp=sp)

@app.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template("register.html")
    else:
        success, message = authenticate.register_user(
                request.form['username'],
                request.form['password'],
                request.form['passwordConfirmation'])
        if success:
            flash(message, "success")
            return redirect(url_for('login'))
        else:
            flash(message, "danger")
            return redirect(url_for('register'))
    return render_template("register.html")

@app.route('/login' , methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    else:
        success, message = authenticate.login_user(
            request.form['username'],
            request.form['password']
        )
        if success:
            flash(message, "success")
            session['loggedin']=request.form['username']
            return redirect(url_for('home'))
        else:
            flash(message, "danger")
            return redirect(url_for('login'))

@app.route('/logout', methods=["GET", "POST"])
def logout():
    if authenticate.is_loggedin(session):
        session.pop('loggedin')
        flash("Successfully logged out.", "success")
    else:
        flash("You are not logged in!", "danger")
    return redirect(url_for('home'))

@app.route('/update', methods=["GET", "POST"])
def update():
    if request.method == "POST":
        updateHotdogs = request.json['hotdogs']
        updateGrandmas = request.json['grandmas']
        # print(updateGrandmas)
        updateShops = request.json['shops']
        if authenticate.is_loggedin(session):
            username = session['loggedin']
            db_func.updateInfo(username, updateHotdogs, updateGrandmas, updateShops)
            # print("Hotdogs: " + str(db_func.getData(username, "Hotdogs")[0][0]))
            # YESSS IMA GOD
    return "woop dis works"


if __name__ == '__main__':
    app.debug = True
    app.run()
