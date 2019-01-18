import sqlite3   #enable control of an sqlite database

DB_FILE="hotdog.db"

db = sqlite3.connect(DB_FILE, check_same_thread=False) #open if file exists, otherwise create
c = db.cursor()               #facilitate db ops

'''BASE FUNCTIONS'''

def findInfo(tableName,filterValue,colToFilt,fetchOne = False, search= False):
    if search:
        filterValue = '%' + filterValue + '%'
        eq = 'LIKE'
    else:
        eq = '='
    command = "SELECT * FROM  '{0}'  WHERE {1} {3} '{2}'".format(tableName,colToFilt,filterValue, eq)
    c.execute(command)

    listInfo = []
    if fetchOne:
        info = c.fetchone()
    else:
        info = c.fetchall()
    if info:
        for col in info:
            listInfo.append(col)
    return listInfo

def modify(tableName, colToMod, newVal, filterCol, filterValue):
    print(("UPDATE {0} SET {1}='{2}' WHERE {3}='{4}'").format(tableName, colToMod, newVal, filterCol, filterValue))
    c.execute(("UPDATE {0} SET {1}='{2}' WHERE {3}='{4}'").format(tableName, colToMod, newVal, filterCol, filterValue))
    db.commit()

def delete(tableName, filterCol, filterValue):
    print(("DELETE FROM {0} WHERE {1} = '{2}'").format(tableName, filterCol, filterValue))
    c.execute(("DELETE FROM {0} WHERE {1} = '{2}'").format(tableName, filterCol, filterValue))
    db.commit()

'''SPECIFIC FUNCTIONS'''
def registerUser(username, password):
    insert('profiles', [username, password, '', ''])

def getUser(username):
    return findInfo('profiles', username, 'Username', fetchOne = True )

def updateInfo(username,newHotDogs,newGrandmas,newShops):
    # user = findInfo('profiles',username, 'Username', fetchOne = True)
    # events = user[3]
    hotdogs = int(newHotDogs)
    command = "UPDATE profiles SET Hotdogs ='{0}' WHERE Username = '{1}'".format(hotdogs, username)
    c.execute(command)

    grandmas = int(newGrandmas)
    command = "UPDATE profiles SET Grandmas ='{0}' WHERE Username = '{1}'".format(grandmas, username)
    c.execute(command)


    shops = int(newShops)
    command = "UPDATE profiles SET Shops ='{0}' WHERE Username = '{1}'".format(shops, username)
    c.execute(command)

    db.commit();
    # print("suceess!!")

def getData(username):
    command = "SELECT Hotdogs, Grandmas, Shops FROM profiles WHERE username='{0}'".format(username)
    c.execute(command)
    return(c.fetchall())


#
# def getMyEvents(username):
#     eventNames = []
#     events = findInfo('profiles',username,'Username', fetchOne = True)[3]
#     print(events)
#     if events:
#         for event in events.strip(',').split(','):
#             eventName = findInfo('events', event, 'eventID', fetchOne = True)[1]
#             eventNames.append(eventName)
#     return eventNames
