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

@app.route('/')
@app.route('/index')
def home():
    return 0

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
