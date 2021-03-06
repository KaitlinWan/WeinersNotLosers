# creates tables for database stored in DB_FILE: hotdog.db
# field names created; no records
import sqlite3   #enable control of an sqlite database

DB_FILE="hotdog.db"
db = sqlite3.connect(DB_FILE, check_same_thread=False) #open if file exists, otherwise create
c = db.cursor()

def createTable(tableName, fieldNames):
	'''creates new table with list of parameters to be taken in'''
	commandArgs = "("
	colTypes = []
	for name in fieldNames:
		commandArgs += name + " " + fieldNames[name] + ","
		colTypes.append(fieldNames[name])
	commandArgs = commandArgs[:-1]
	# print(colTypes)
	commandArgs += ")"
	# print ("CREATE TABLE " + tableName + " "+ commandArgs)
	c.execute("CREATE TABLE " + tableName + " "+ commandArgs)

def closeDB():
	db.commit() #save changes
	db.close()  #close database

profilesHeader = {"UserID":"INTEGER PRIMARY KEY", "Username":"TEXT UNIQUE", "Password":"TEXT", "Hotdogs" : "INTEGER", "GamesComplete" : "INTEGER", "KeystrokesCorrect" : "INTEGER", "KeystokesIncorrect" : "INTEGER", "Accuracy" : "DOUBLE", "Multiplier" : "DOUBLE", "Guild" : "TEXT", "BoughtItems" :"TEXT", "Grandmas": "INTEGER", "Shops" : "INTEGER" }
createTable("profiles", profilesHeader)

guildsHeader = {"GuildID":"INTEGER PRIMARY KEY", "Name":"TEXT", "Leader":"TEXT", "Hotgods":"INTEGER", "Members": "TEXT", "OverallAccuracy":"DOUBLE", "BoughtItems":"TEXT"}
createTable("guilds", guildsHeader)

closeDB()
