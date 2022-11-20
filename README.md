## Docker-compose - NodeJS & Mysql - Restful API  
# Description  
Docker-compose project that sets up a containerized NodeJS & Mysql REST api.    
# Requirements  
- NodeJs - Docker - Docker-compose
# Setup
### Clone the repository
```bash
 git clone https://github.com/Gurguii/Docker-Compose-NODE-MYSQL-RESTAPI
```  
### Get into the project's directory
```bash
cd Docker-Compose-NODE-MYSQL-RESTAPI
```  
Mysql volume and docker containers will be called ***"Docker-Compose-NODE-MYSQL-RESTAPI.db|app_1|mysqldb_1"*** so change dir name if you want a custom/shorter/w.e one.  

To change the app/mysqldb name, do it in the **docker-compose.yml** file
### Build, create and start containers
```bash
docker-compose up
```  
Add **-d** if you don't want to attach to containers once started  
### Delete everything created from a docker-compose.yml  
```bash
docker-compose down --rmi all
```
#### At this point, you should have both containers running, with local port 3000 being forwarded to App docker local 3000.  
To test that everything is working as expected you can try retrieving all the data from one of the default tables(users, clients, tasks):  
```bash
curl localhost:3000/<table-name>
```  
## Custom build files  
**data.sql** - contains sql queries that will be executed on database initialization.  
**.env** - stores environment variables that 'dotenv' module will load into the project(safer since it stores configuration separate from code). 
## Syntax examples  
- ### SELECT
#### Method: GET  
Select everything from table:
```bash
curl localhost:3000/<table-name>
```  
Custom select:
```bash
curl localhost:3000/<table-name>/<fields-to-select>:<condition>
```  
**localhost:3000/users/:id=4** would print every field from table **users** where **id=4**  
**localhost:3000/users/name:** would print every **name field value** from table **users**  
- ### INSERT  
#### Method: POST  
Insert syntax:  
```bash
curl -XPOST localhost:3000/<table-name>/<fields-to-insert>:<values-to-insert>  
```  
**localhost:3000/users/name:'gurgui'** would add a new row in **users** table whose name field value = 'gurgui'  
Empty **<fields-to-insert>** means you're going to add every field in **<values-to-insert>**  
- ### DELETE  
#### Method: DELETE  
Delete syntax:  
```bash
curl -XDELETE localhost:3000/users/<condition>
```  
**localhost:3000/users/id=4** would delete the user with **id=4** in table **users**
- ### UPDATE
#### Method: PUT  
Update syntax: 
```bash
curl -XPUT localhost:3000/<table-name>/<new-value>:<condition>
```  
**localhost:3000/users/name='newname':id=3**  would change to **newname** the name field of user with **id=3** in table **users**  
