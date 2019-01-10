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
app.secret_key = "hottttttdogggggg"

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

@app.route('/')
def home():
    return hi

if __name__ == '__main__':
    app.debug = True
    app.run()
