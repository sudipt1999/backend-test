const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');
const fs = require('fs')


const db = "./data/data.json"
const app = express();
const port = 8080;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/coaches', (req, res) => {
    const id = req.query.id
    const password = req.query.password
    console.log("ID ", id)
    console.log("PASS ", password)
    if(id == null || password == null) {
        //  Handle for register page
        const body = req.body;
        const newCoach = {id: uuid.v4(), ...body}
        console.log("NEW COACH ", newCoach)

        fs.readFile(db, (err, file) => {
            if(err) res.status(400).send(err);
            const fileData = JSON.parse(file);
            fileData.coaches.push(newCoach);
            
            fs.writeFile(db, JSON.stringify(fileData), err => {
                if(err) res.status(400).send(err);
                res.send(newCoach)
            })
        });
    } else {
        fs.readFile(db, (err, file) => {
            if(err) res.status(400).send(err)
            const fileData = JSON.parse(file)
            let found = false;
            fileData.coaches.map(coach => {
                if(coach.id == id && coach.password == password) {
                    found = true
                    return res.status(200).send(coach);
                }
            })

            if(!found)
            res.status(404).send({err: "No user found"})
        })
    }
});


app.post('/users', (req, res) => {
    const id = req.query.id
    const password = req.query.password
    console.log("ID ", id)
    console.log("PASS ", password)
    if(id == null || password == null) {
        //  Handle for register page
        const body = req.body;
        const newUser = {id: uuid.v4(), ...body}
        console.log("NEW COACH ", newUser)

        fs.readFile(db, (err, file) => {
            if(err) res.status(400).send(err);
            const fileData = JSON.parse(file);
            fileData.users.push(newUser);
            
            fs.writeFile(db, JSON.stringify(fileData), err => {
                if(err) res.status(400).send(err);
                res.send(newUser)
            })
        });
    } else {
        fs.readFile(db, (err, file) => {
            if(err) res.status(400).send(err)
            const fileData = JSON.parse(file)
            let found = false;
            fileData.users.map(user => {
                if(user.id == id && user.password == password) {
                    found = true
                    return res.status(200).send(user);
                }
            })

            if(!found)
            res.status(404).send({err: "No user found"})
        })
    }
});

app.listen(port, () => console.log(`Server started at port : ${port}!`));