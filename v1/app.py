import json
import sqlite3
import urllib
import ssl
import time
import sys

from flask import Flask, render_template, request, session, redirect, url_for, flash, Response
from urllib.request import urlopen

from util import authenticate
'''import funcDB'''

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
    else:
        username = ""
        is_loggedin = False
    if request.args.get('q') == 'Quotes':
        text = duplicate(getQuote())
        return render_template('index.html', text=text, loggedin=is_loggedin, username=username)
    if request.args.get('m') == 'Meat Lorem Ipsum':
        text = duplicate(getBacon())
        return render_template('index.html', text=text, loggedin=is_loggedin, username=username)
    if request.args.get('a') == 'Advice':
        text = duplicate(getAdvice())
        return render_template('index.html', text=text, loggedin=is_loggedin, username=username)
    return render_template("index.html", loggedin=is_loggedin, username=username)

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
        updateShops = request.json['shops']
        if authenticate.is_loggedin(session):
            username = session['loggedin']
            
        return "Grandmas: " + updateGrandmas


if __name__ == '__main__':
    app.debug = True
    app.run()
