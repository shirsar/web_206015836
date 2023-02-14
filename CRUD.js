const { response } = require("express");
const sql = require("./db.js");
const path = require ('path');

const signUpToDB= function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    let email = req.body.email;
    let password = req.body.password;
    let repassword = req.body.repassword;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let gender = req.body.gender;
    let age = req.body.age;

    if(password.localeCompare(repassword)==0){
        if (fname.length > 1 && lname.length > 1){
            const Q2 = "SELECT * FROM customers WHERE email like '"+email+"'";
            sql.query(Q2, (err,mysqlres)=>{
                if(err){
                    console.log("error: ", err);
                    res.status(400).send({message: "error1 in creating customer: " + err});
                    return; 
                }
                console.log(mysqlres.length);
                if(mysqlres.length >= 1){
                    res.render('signup',{var1:"This Email is already exists! please try again :)"});
                   

                    return;
                }else{
                    const newCustomer = {
                        "Email": req.body.email,
                        "Password1": req.body.password,
                        "First_Name": req.body.fname,
                        "Last_Name": req.body.lname,
                        "Age": req.body.age, 
                        "Gender": req.body.gender
                    };
                   

                    const Q1 = "INSERT INTO customers SET ?";  
                    sql.query(Q1, newCustomer, (err,mysqlres) => {
                        if (err) {
                            res.status(400).send({message: "error2 in creating customer: " + err});
                            return;
                        }
                        console.log("created customer!");
                        res.render('login',{var1:"You are signed up, Please log in"});
                        return;
                    });
                }
                });
        }else{
                res.render('signup',{var1:"invalid name! please try again :)"});
                return;
        }
    }else{
        res.render('signup',{var1:"invalid password! please try again :)"});
        return;
    }
    
};
    
const validCustomer= function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }

    let email = req.body.email;
    let password = req.body.password;

    //insert data into cookie
   // res.cookie("user_name", req.body.fname);

    const Q2 = "SELECT * FROM customers WHERE Password1 = ? AND Email = ?";
    sql.query(Q2,[password, email] ,(err,mysqlres)=>{
        if(err){
            console.log("error: ", err);
            res.status(400).send({message: "error in creating customer: " + err});
            return; 
        }
        if(mysqlres.length >= 1){
            let user_name = mysqlres[0].First_Name;
            let user_ID = mysqlres[0].CustomerID;
            let user_email = mysqlres[0].Email;
            let userIsLogged = {user_ID: user_ID, user_name: user_name,user_email: user_email}
            res.cookie("userIsLogged", userIsLogged );
            console.log('Cookies: ', req.cookies);
            res.render('Searchadoctor',{
                var1: userIsLogged.user_name + "Welcome Back! You're logged in",
                userIsLogged
            });
            return;
        }else{
            res.render('login',{var1:"Wrong Email or Password, Please try Again"});
            return; 
            }
    });    
};
              
const showDoctors = (req, res)=>{
    const Health_Organization = req.body.Health_Organization;
    const Expertise = req.body.Expertise;
    const City = req.body.Location;
    const Gender_Of_Doctor = req.body.gender;

   const Q3 ="SELECT * FROM doctors WHERE (Health_Organization LIKE '"+Health_Organization+"' OR '"+Health_Organization+"' = 'ALL') AND (City LIKE '"+City+"' OR '"+City+"' = 'ALL') AND (Expertise LIKE '"+Expertise+"' OR '"+Expertise+"' = 'ALL') AND (Gender_Of_Doctor LIKE '"+Gender_Of_Doctor+"' OR '"+Gender_Of_Doctor+"' = 'ALL')";
    sql.query(Q3, (err,mysqlres)=>{
        if(err){
            console.log("error: ", err);
            res.status(400).send({message: "error in creating customer: " + err});
            return; 
        }
        console.log(mysqlres);
        let doctors = mysqlres;
        res.render('results', {var1:"Results:", doctors });
        return;
    });   
};

const getmesseg= function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }

    console.log(req.cookies.userIsLogged)
    // i need to add the customer id to the table 
    const newMessege = {
        "Content": req.body.message,
        "CustomerID": req.cookies.userIsLogged.user_ID
    };

    const Q4 = "INSERT INTO MESSEGES SET ?";  
    sql.query(Q4, newMessege, (err,mysqlres) => {
        if (err) {
            res.status(400).send({message: "error2 in creating contact us: " + err});
            return;
        }

        console.log("created messege!");
        res.render('contactus',{var1:"THANKS!", userIsLogged: req.cookies.userIsLogged});
        return;
    });

};

const updateMyDetails= function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
    });
    return;
    }

    console.log(req.cookies.userIsLogged)
    // i need to add the customer id to the table 
    const customer = {
        CustomerID: req.cookies.userIsLogged.user_ID,
        Password1: req.body.password
    };
    
    const Q5 = "UPDATE customers SET Password1 = ? WHERE CustomerID = ?";  
    sql.query(Q5,[customer.Password1, customer.CustomerID], (err,mysqlres) => {
        if (err) {
            res.status(400).send({message: "error2 in creating updating details: " + err});
            return;
        }

        console.log("updated details!");
        console.log(mysqlres);
        res.render('profile',{var1:"Your details was updated!", userIsLogged: req.cookies.userIsLogged});
        return;
    });

};

const deleteMyAccount = function(req, res) {
    // Validate request
    if (!req.cookies.userIsLogged) {
      res.status(400).send({
        message: "User is not logged in!"
      });
      return;
    }
  
    const customer = req.cookies.userIsLogged.user_ID;
    console.log(customer);
    const Q6 = "DELETE FROM customers WHERE CustomerID = ?";
    sql.query(Q6, customer, (err, mysqlRes) => {
      if (err) {
        res.status(400).send({ message: "error in deleting account: " + err });
        return;
      }
  
      console.log("deleted account!");
      res.clearCookie("userIsLogged");
      res.redirect("/");
      return;
    });
  };
  

  const showMyMessages = (req, res)=>{
    const customer = {
        CustomerID: req.cookies.userIsLogged.user_ID,
    };
    const Q2 = "SELECT * FROM MESSEGES WHERE CustomerID = ?";
    sql.query(Q2,customer.CustomerID, (err,mysqlres)=>{
        if(err){
            console.log("error: ", err);
            res.status(400).send({message: "error in showing customers messages: " + err});
            return; 
        }
        console.log("got all messages...");
        let messages = mysqlres;
        res.render('messages', {var1:"All your messages:", messages });
        return;
    });
};


 module.exports = {signUpToDB, validCustomer,showDoctors,getmesseg,updateMyDetails,deleteMyAccount,showMyMessages};
