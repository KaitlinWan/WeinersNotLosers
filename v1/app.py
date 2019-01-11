import json
import sqlite3
import urllib
import ssl
import time

from flask import Flask, render_template, request, session, redirect, url_for, flash
from urllib.request import urlopen

from utils import authenticate
import funcDB

app = Flask(__name__)
app.secret_key = "wereallweinerssometimes"

def getQuote():
    '''gets quote from favQs api'''
    response = urlopen('https://favqs.com/api/qotd')
    r = response.read()
    d = json.loads(r.decode('utf-8'))
    return d['quote']['body']

def getBacon():
    '''gets meat lorem ipsum'''
    response = urlopen('https://baconipsum.com/api/?type=meat-and-filler&paras=1')
    r = response.read()
    d = json.loads(r.decode('utf-8'))
    return d

def getAdvice():
    '''gets advice from Advice Slip API'''
    response = urlopen('https://api.adviceslip.com/advice')
    r = response.read()
    d = json.loads(r.decode('utf-8'))
    return d['slip']['advice']

def wordList(x):
    return x.split()

@app.route('/')
@app.route('/index')
def home():
    return render_template()

@app.route('/register', methods=["GET", "POST"])
def register():
    return 0

@app.route('/login' , methods=["GET", "POST"])
def login():
    return 0

@app.route('/logout', methods=["GET", "POST"])
def logout():
    return 0

if __name__ == '__main__':
    app.debug = True
    app.run()
