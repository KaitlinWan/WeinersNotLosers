# HotDog Typer
Team WeinersNotLosers

Kaitlin Wan, Daniel Gelfand, Kyle Tau, Joshua Weiner

## Watch our demo [here:](https://www.youtube.com/watch?v=sl2CwCL7nlE&feature=youtu.be) 

## Overview
Based on the popular game Cookie Clicker, in this project, we aim to combine the incentives of games with the practical benefits of learning to type (quickly and accurately). HotDog Typer is a fun and interactive visual experience for types of all ages, sizes, and backgrounds to embrace their keyboard literacy. This type of game is coined an "incrementer" game, as proclaimed by Orteil. The point of the game is to create hotdogs by typing words correctly, then buy more upgrades to increase your hotdog-tivity.

## Instructions

1. Clone the repo
    * ssh - `git@github.com:KaitlinWan/WeinersNotLosers.git`
    * https - `https://github.com/KaitlinWan/WeinersNotLosers.git`
2. `$ cd WeinersNotLosers`
   * Move to root of repo
3. `pip install -r requirements.txt`
    * Install the requirements for Hot Dog Typer   
4.  `$ . location_of_venv/venv_name/bin/activate`
    * Activate your virtual environment
5. `$ python db_builder.py`
    * Initialize your database, if you have not already. This is necessary to store user accounts and inventory.
6. `$ python app.py`
    * Start Hot Dog typer
7. Open up your browser and type [127.0.0.1:5000](http://127.0.0.1:5000/)
    * Load Hot Dog Typer in browser and enjoy
8. Select one of the three butons for choice of words and start typing!

## APIs

1. Bacon Lorem Ipsum: Text filler (meatified)
2. FavQs: Generates a Quote of the Day
3. Advice Slip: Generates a meaningful piece of advice
