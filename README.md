# Socks project

## About the project:
This project was a part of the Cyber4s program by Scale-Up Velocity.

## The Task:
Your job in the army is a software developer. The army has decided it is time to rewrite its socks management system. 
This system is very important as it keeps track of all the socks in all of the storage locations in the army, some of them top-secret.
Your job is to write a CRUD webapp + server that organizes all of this inventory.

Each socks has the following fields:
* Model
* Quantity
* Size
* Location - lat, lon, name of base, nearest city.
* Manufacturing year
* Location history - a list of prior arrival + departure dates and locations
* Officer in charge, including name, personal identity number, email and phone number

Your system should include an SQL database, and the database should be normalized. That means, that there shouldn't be data duplications. For example, if an officer is in charge of 2 socks, their name shouldn't be stored twice in the DB.

The webapp should allow for all CRUD operations. So overall, you should have an SQL DB + server + webapp.

Bonus - support search and pagination.


## Live Application

Deployed on Heroku:
<a href="http://cyber4s-socks-react.herokuapp.com/">cyber4s-socks-react</a>  

---

## Run locally

1. **Clone the repo**
   ```
   git clone https://github.com/itay-meitav/military-socks-panel.git
   ```
2. **Install all the dependencies**
   ```
   cd server +  npm ci
   ```
   ```
   cd client +  npm ci
   ```
3. **Run server**
   ```
   cd server + npm start
   ```
   
Note: the server also exists in a NestJS version that can be used with
   ```
   cd server-nest + npm start
   ```
4. **Run Client**

   ```
   cd client + npm start
   ```

5. **Go to http://localhost:3000 and have fun**!


