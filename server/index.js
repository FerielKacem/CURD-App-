const express = require("express")
const app = express()
const mysql = require ("mysql")
 const cors = require("cors");
 app.use(cors());
 

app.use(express.json());



const db = mysql.createConnection({
  
    user: "root",
    host: "localhost",
    password: "",
    database: "data1",
  });

 
  app.post("/api/post" , (req, res)=>{
  const {name , email,contact} = req.body;
   db.query(
  "INSERT INTO person (name, email , contact ) VALUES  (?,?,?)",[name, email,contact],(err, result) => {
  if(err){console.log(error)};
  
  })})




  app.delete("/api/remove/:id" , (req, res)=>{
        const {id} = req.params;
         db.query("DELETE FROM person  WHERE  id =? ",id, (err, result) => {
         if(err){console.log(error)};
        res.send(result)
        
        })})

  app.get("/api/get/:id" , (req, res)=>{
          const {id} = req.params;
          db.query("SELECT * FROM person   WHERE  id =? ",id, (err, result) => {
          if(err){console.log(error)}
          res.send(result);
        
        }
          )})
      
          

 app.put("/api/update/:id" , (req, res)=>{
              const {id} = req.params;
              const {name} = req.body;
              const {email} = req.body;
              const {contact} = req.body;
                
      db.query(
       "UPDATE person SET name= ?, email=? , contact=?  WHERE id = ? ",[name , email, contact , id], (err, result) => {
         if(err){console.log(error)};
         res.send(result);})})

  










 app.get("/api/get" , (req, res)=>{
  db.query("SELECT * FROM person", (err, result) => {
       res.send(result);
        
      })})



app.get("/" , (req, res)=>{
  
    
       db.query(
          "INSERT INTO person (name, email , contact ) VALUES  ('feriel' , 'feriel@gmail.com', '21046155')",
         
         (err, result) => {
           if (err) {
            console.log(errorrr );
           } else {
              res.send("Values Inserted");
           }
          })})



app.listen(3001,()=>{
    console.log ("your server is running on port 3001")  ;
  });