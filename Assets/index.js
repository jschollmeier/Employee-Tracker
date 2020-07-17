const orm = require("./config/orm");
const inquirer = require("inquirer");
var messages = [{name: "View Departments"}, {name: "View Roles"}, {name:"View all Employees"}, {name: "Add a Department"}, {name: "Add a Role"}, {name: "Add an Employee"}, {name: "Change an Employees Role"}];



inquirer.prompt([
    {
        type: "list",
        message: "What would you like to do?",
        name: "check",
        choices: messages
           
        
    }

]).then(function(data){
    // console.log(data.check);
    // console.log(messages[2].name) 


    if(data.check===messages[0].name){
        viewDepartments();
    }
    else if (data.check===messages[1].name){
        viewRoles();
    }
    else if (data.check===messages[2].name){
        viewAll()
    }
    else if(data.check===messages[3].name){
        addDepartment();
    }
    else if(data.check===messages[4].name){
        addRole();
    }
    else if (data.check===messages[5].name){
        addEmployee();
    }
    else if (data.check===messages[6].name){
        changeRole();
    }
    else{
        throw(err);
    }

    function viewDepartments(){
        return orm.selectAll('department');
        console.log("View Departments")
        //return process.exit(0);
    }

    function viewRoles(){
        console.log("View Roles")
    }

    function viewAll(){
        console.log("View All")
    }

    function addDepartment(){
        console.log("adding Department")
    }

    function addRole(){
        console.log("adding Role")
    }
    function addEmployee(){
        console.log("adding Employees")
    }
    function changeRole(){
        console.log("changing Role")
    }









})