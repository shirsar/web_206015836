var SQL = require('./db')
const path = require('path');
const csv=require('csvtojson');


const CreateCustomersTable = (req,res)=> {
    const Q1 = `CREATE TABLE IF NOT EXISTS CUSTOMERS (
        CustomerID			int(11)			NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Email 				varchar(255) 	NOT NULL,
        Password1			varchar(255) 	NOT NULL,
        First_Name			varchar(255) 	NOT NULL,
        Last_Name			varchar(255) 	NOT NULL,
        Age					tinyint			NOT NULL,
        Gender				varchar(255)	NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;
        
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('customers created table');
        res.send("table created");
        return;
    })      
}
const CreateDoctorsTable = (req,res)=> {
    const Q1 = `CREATE TABLE IF NOT EXISTS DOCTORS (
        DoctorID	 			int(11) 		NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Doctor_Name 			varchar(255) 	NOT NULL,
        Expertise 				varchar(255) 	NOT NULL,
        Health_Organization		varchar(255) 	NOT NULL,
        Gender_Of_Doctor 		varchar(255) 	NOT NULL,
        Phone					varchar(15) 	NOT NULL,
        City					varchar(255) 	NOT NULL,
        Address					varchar(255) 	NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `;
        
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created doctors table');
        res.send("doctors table created");
        return;
    })      
}
const CreateMessagesTable = (req,res)=> {
    const Q1 = `CREATE TABLE IF NOT EXISTS MESSEGES (
        MessageID 			int(11) 		NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Content				text(255) 	NOT NULL,
        CustomerID			int(11)		NOT NULL,
        FOREIGN KEY (CustomerID) REFERENCES CUSTOMERS(CustomerID)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        `;
        
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created messages table');
        res.send("messages table created");
        return;
    })      
}
const InsertCustomerData = (req,res)=>{
    var Q2 = "INSERT INTO CUSTOMERS SET ?";
    const csvFilePath= path.join(__dirname, "customers.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        SQL.query(Q2, element, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
const InsertDoctorData = (req,res)=>{
    var Q2 = "INSERT INTO DOCTORS SET ?";
    const csvFilePath= path.join(__dirname, "doctors.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        SQL.query(Q2, element, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
                res.send("error");
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
const InsertMessagesData = (req,res)=>{
    var Q2 = "INSERT INTO MESSEGES SET ?";
    const csvFilePath= path.join(__dirname, "messeges.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        SQL.query(Q2, element, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
const ShowCustomersTable = (req,res)=>{
    var Q3 = "SELECT * FROM CUSTOMERS";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};
   
const ShowDoctorsTable = (req,res)=>{
    var Q3 = "SELECT * FROM CUSTOMERS";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};
const ShowMessegesTable = (req,res)=>{
    var Q3 = "SELECT * FROM MESSEGES";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};
const DropCustomersTable = (req, res)=>{
    var Q4 = "DROP TABLE CUSTOMERS";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}
const DropDoctorsTable = (req, res)=>{
    var Q4 = "DROP TABLE DOCTORS";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}
const DropMessegesTable = (req, res)=>{
    var Q4 = "DROP TABLE MESSEGES";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}

module.exports = {CreateCustomersTable, CreateDoctorsTable, CreateMessagesTable, InsertCustomerData, InsertMessagesData, InsertDoctorData,DropCustomersTable, DropDoctorsTable,DropMessegesTable,ShowCustomersTable,ShowDoctorsTable,ShowMessegesTable};
