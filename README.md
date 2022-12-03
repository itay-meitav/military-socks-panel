# Socks project

## About the project:

This project was a part of the Cyber4s program by Scale-Up Velocity.

## The Task:

Your job in the army is a software developer. The army has decided it is time to rewrite its socks management system.
This system is very important as it keeps track of all the socks in all of the storage locations in the army, some of them top-secret.
Your job is to write a CRUD webapp + server that organizes all of this inventory.

Each socks has the following fields:

- Model
- Quantity
- Size
- Location - lat, lon, name of base, nearest city.
- Manufacturing year
- Location history - a list of prior arrival + departure dates and locations
- Officer in charge, including name, personal identity number, email and phone number

Your system should include an SQL database, and the database should be normalized. That means, that there shouldn't be data duplications. For example, if an officer is in charge of 2 socks, their name shouldn't be stored twice in the DB.

The webapp should allow for all CRUD operations. So overall, you should have an SQL DB + server + webapp.

Bonus - support search and pagination.

   <br/>

## Live Version:

### [military-socks](https://www.military-socks.tk/)

<br/>

## Local Installation:

---

1. **Clone the repo**
   ```
   git clone https://github.com/itay-meitav/military-socks-panel.git
   ```
2. **Install all the dependencies**
   ```
   npm run init-p
   ```
3. **Run server**
   ```
   npm run server
   ```
4. **Run Client**

   ```
   npm run client
   ```

5. **Go to http://localhost:3000 and have fun**!

   <br/>

# Important Note

In order for you to experience all the features of the application, the local variable DATABASE_URL need to be entered for saving the data in a database.
