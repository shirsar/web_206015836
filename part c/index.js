const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const path = require ('path');
const sql = require('./db');
const CRUD = require('./CRUD');
const createDB = require('./creatDB');
const cookieParser = require('cookie-parser')
const { render } = require('pug');
const { clear } = require('console');



// parse requests of contenttype: application/x-www-form-urlencoded
app.use(express.json());
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// load view engine
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'pug');
var port = 8080

//routing to the path of tables
app.get('/CreateCustomersTable', createDB.CreateCustomersTable);
app.get("/CreateDoctorsTable", createDB.CreateDoctorsTable);
app.get('/CreateMessagesTable', createDB.CreateMessagesTable);
app.get('/InsertCustomerData', createDB.InsertCustomerData);
app.get('/InsertMessagesData', createDB.InsertMessagesData);
app.get('/InsertDoctorData',createDB.InsertDoctorData);
app.get("/DropCustomersTable", createDB.DropCustomersTable);
app.get('/DropDoctorsTable', createDB.DropDoctorsTable);
app.get('/DropMessegesTable', createDB.DropMessegesTable);
app.get('/ShowCustomersTable', createDB.ShowCustomersTable);
app.get('/ShowDoctorsTable', createDB.ShowDoctorsTable);
app.get('/ShowMessegesTable', createDB.ShowMessegesTable);

//home page route
app.get('/',(req,res)=>{
    res.redirect("/Main");
})

app.get('/Main',(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    res.render("Main",userIsLogged );
});

//sign up route
app.get('/signup',(req,res)=>{
   res.render("signup");

});

//sign up route2
app.post('/signup', CRUD.signUpToDB);

//log in route2
app.post('/login', CRUD.validCustomer);

//search a doctor in route2
//Search A doctor route
app.get('/SearchAdoctor',(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    res.render("Searchadoctor",userIsLogged);
});
app.post('/SearchAdoctor',CRUD.showDoctors);

//search a doctor in route2
app.post('/contactus',CRUD.getmesseg);

app.get('/updatePassword',(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    res.render("updatePassword",userIsLogged);
}
);

app.post('/updatePassword',CRUD.updateMyDetails);

app.get('/messages',CRUD.showMyMessages);

//contact us route
app.get('/contactus',(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    res.render("contactus",userIsLogged);
});

//log in route
app.get('/login',(req,res)=>{
    res.render("login");
});

//log out route
app.get('/logout',(req,res)=>{
    res.cookie().clearCookie("userIsLogged");
    res.redirect("/");
});

//update route
app.get('/profile',(req,res)=>{
    userIsLogged = req.cookies.userIsLogged;
    user_name = req.cookies.userIsLogged.user_name;
    //user_email = req.cookies.userIsLogged.user_email;
    res.render("profile",userIsLogged);

});
app.post('/profile',CRUD.deleteMyAccount);
//set listen
app.listen(port,()=>{
    console.log("express server is running on port"+ port);
});


