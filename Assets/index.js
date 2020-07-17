const orm = require("./config/orm.js");
const connection = require("./config/connection.js");
const inquirer = require("inquirer");
const cTable = require('console.table');
var messages = [{name: "View Departments"}, {name: "View Roles"}, {name:"View all Employees"}, {name: "Add a Department"}, {name: "Add a Role"}, {name: "Add an Employee"}, {name: "Change an Employees Role"}, {name: "exit"}];




function prompts(){

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
    else if (data.check===messages[7].name){
        connection.end()
        
    }
    

})}
    function viewDepartments(){
       
        orm.selectAll('department')
        .then(results => console.table(results))
        .then(prompts())
        .catch(err=> err);
    }

    function viewRoles(){
        orm.selectAll('role')
        .then(results => console.table(results))
        .then(prompts())
        .catch(err=> err);
    }

    function viewAll(){
        
        orm.selectAll('employee')
        .then(results => console.table(results))
        .then(prompts())
        .catch(err=> err);
    }

    function addDepartment(){

        inquirer.prompt([
            {
            type: "input",
            message: "What is the Department name?",
            name: "depoName"
            }


        ]).then(function(data){
            orm.create("department", ["name"], [data.depoName])
            .then(console.log("succes"))

            orm.tripleJoin(["employee.first_name", "employee.last_name", "role.title", "department.name", "role.salary"], "department", "role", "department.id", "role.department_id", "employee", "role.id", "employee.role_id")
                
             
            .then(results => console.table(results))
            .then(prompts())
            .catch(err=> err);    
        })
                            
        
    }

    function addRole(){

        inquirer.prompt([
            {
            type: "input",
            message: "What is the Role?",
            name: "roleName"
            },
            {
                type: "input",
                message: "What is the Salary for this position?",
                name: "roleSalary"
            },
            {
                type: "input",
                message: "What is the Department ID number?",
                name: "depoID"
            }



        ]).then(function(data){
            orm.create("role", ["title", "salary", "department_id"], [data.roleName, parseInt(data.roleSalary), parseInt(data.depoID)])
            .then(console.log("succes"))
            orm.tripleJoin(["employee.first_name", "employee.last_name", "role.title", "department.name", "role.salary"], "department", "role", "department.id", "role.department_id", "employee", "role.id", "employee.role_id")
                
             
            .then(results => console.table(results))
            .then(prompts())
            .catch(err=> err);    
        })
        
       
    }
    function addEmployee(){
        
        inquirer.prompt([
            {
            type: "input",
            message: "What is the Employees name?",
            name: "employeeName"
            },
            {
                type: "input",
                message: "What is the id for their position?",
                name: "roleID"
            },
            {
                type: "list",
                message: "Does the employee have a manager?",
                name: "hasMang",
                choices: [
                    "yes",
                    "no"
                ]
            }



        ]).then(function(data){ 
            if(data.hasMang==='yes'){
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your managers Id number?",
                        name: "mangID"
                    }
                ]).then(function(datas){
                    var names = data.employeeName.split(" ");

                    orm.create("employee", ["first_name", "last_name", "role_id", "manager_id"], [names[0], names[1], parseInt(data.roleID), parseInt(datas.mangID)])
                    .then(console.log("succes"))
                    orm.tripleJoin(["employee.first_name", "employee.last_name", "role.title", "department.name", "role.salary"], "department", "role", "department.id", "role.department_id", "employee", "role.id", "employee.role_id")
                
             
                    .then(results => console.table(results))
                    .then(prompts())
                    .catch(err=> err); 

                })

            }
            else{
                    var names = data.employeeName.split(" ");

                    orm.create("employee", ["first_name", "last_name", "role_id"], [names[0], names[1], parseInt(data.roleID)])
                    .then(console.log("succes"))
                    orm.tripleJoin(["employee.first_name", "employee.last_name", "role.title", "department.name", "role.salary"], "department", "role", "department.id", "role.department_id", "employee", "role.id", "employee.role_id")
                
             
                    .then(results => console.table(results))
                    .then(prompts())
                    .catch(err=> err); 
              

            }
              
        })
    }
    function changeRole(){ 

        inquirer.prompt([

            
            {
                type: "input",
                message: "What is the id of the Employee who is changing roles?",
                name: "employID",
                
            },
            
            {
                type: "input",
                message: "What is the id of their new role?",
                name: "newroleID"
            }



        ]).then(function(data){

        orm.update("employee", "role_id", parseInt(data.newroleID), parseInt(data.employID))
        .then(console.log("succesfully Changed"))
        orm.tripleJoin(["employee.first_name", "employee.last_name", "role.title", "department.name", "role.salary"], "department", "role", "department.id", "role.department_id", "employee", "role.id", "employee.role_id")
                
             
        .then(results => console.table(results))
        .then(prompts())
        .catch(err=> err);

        })
        
    }


prompts();






