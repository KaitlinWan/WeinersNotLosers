import json
import sqlite3
import urllib
import ssl
import time

from flask import Flask, render_template, request, session, redirect, url_for, flash
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

def wordList(x):
    #returns list of words from the quote , e.g. wordList(getBacon())
    return x.split()

@app.route('/')
def go():
    #print(wordList(getBacon()))
    #print(wordList(getQuote()))
    #print(wordList(getAdvice()))
    return redirect(url_for("home"))

@app.route('/index', methods=["GET", "POST"])
def home():
    if request.form.get('a') == "Advice":
        text = wordList(getAdvice())
        print(yes)
        return render_template("index.html",text=text)
    else:
        return render_template("index.html")

@app.route('/register', methods=["GET", "POST"])
def register():
    return render_template("register.html")

@app.route('/login' , methods=["GET", "POST"])
def login():
    return render_template("login.html")

@app.route('/logout', methods=["GET", "POST"])
def logout():
    return 0

if __name__ == '__main__':
    app.debug = True
    app.run()
