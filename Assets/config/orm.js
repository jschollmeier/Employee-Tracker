// Import MySQL connection.
const connection = require("../config/connection.js");
const orm = require("../config/orm.js");

// ORM class for all our SQL statement functions.
class ORM {
  constructor(connection){
    this.connection = connection;
  }

  // Helper function for SQL syntax.
  // Let's say we want to pass 3 values into the mySQL query.
  // In order to write the query, we need 3 question marks.
  // This helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
  // ["?", "?", "?"].join(', ') => "?, ?, ?";
  printQuestionMarks(numberOfValues){
    const questionMarks = [];

    for (var i = 0; i < numberOfValues; i++) {
      questionMarks.push("?");
    }

    return questionMarks.join(', ');
  }

  selectAll(table) {
    const queryString = 'SELECT * FROM  ??';
    return this.connection.query(queryString, [table])
  }

  create(table, columns, values) {
    
    const queryString = `INSERT INTO ?? (${columns.join(', ')}) VALUES (${this.printQuestionMarks(values.length)})`;

    console.log(queryString);

    return this.connection.query(queryString, [table, ...values])
  }

  update(table, column, objColVals, id) {
    var queryString = `UPDATE ?? SET ?? = ? WHERE id = ?`;

    console.log(queryString);

    return this.connection.query(queryString, [table, column, objColVals, id])
  }
  
  innerJoin(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol) {
    //'SELECT employee.first_name, employee.last_Name, role.title FROM role INNER JOIN employee role.id = employee.role_id'

    var queryString = `SELECT ${colsToSelect.join(', ')} FROM ?? INNER JOIN ?? ON ?? = ??`;
      //"SELECT ?? FROM ?? INNER JOIN ?? ON ??.?? = ??.??";

    return this.connection.query(
      queryString, [tableOne, tableTwo, tableOneCol, tableTwoCol]
      );
  }
  tripleJoin(colsToSelect, tableOne, tableTwo, tableOneCol, tableTwoCol, tableThree, tableTwoCol2, tableThreeCol) {
    //'SELECT employee.first_name, employee.last_Name, role.title FROM role INNER JOIN employee role.id = employee.role_id'

    var queryString = `SELECT ${colsToSelect.join(', ')} FROM ((?? INNER JOIN ?? ON ?? = ??) INNER JOIN ?? ON ?? = ??)`;
      //"SELECT ?? FROM ?? INNER JOIN ?? ON ??.?? = ??.??";

    return this.connection.query(
      queryString, [tableOne, tableTwo, tableOneCol, tableTwoCol, tableThree, tableTwoCol2, tableThreeCol]
      );
  }
  // TODO: Create method that will allow us to remove a row from the table [colsToSelect.join(', ')]

  remove(table, id) {
    var queryString = `DELETE FROM ?? WHERE id = ?` 

    return this.connection.query(queryString, [table, id]);
  }

};

// Export the orm object for the model (cat.js).
module.exports = new ORM(connection);

const test = new ORM(connection);

// test.update("employee", "first_name", "Seth", 4)
// .then(results => console.table(results))
// .then(connection.end())
// .catch(err=> err);

// test.create("role", ["title", "salary", "department_id"], ["Accounting Manager", 100000, 1])
// .then(results => console.table(results))
// .then(connection.end())
// .catch(err=> err);

// test.create("employee", ["first_name", "last_name", "role_id", "manager_id"], ["Steph", "Curry", 1, 2])
// 

// test.innerJoin(["employee.first_name", "employee.last_name", "role.title"], "role", "employee", "role.id", "employee.role_id")
// .then(results => console.table(results))
// .then(connection.end())
// .catch(err=> err);

// test.selectAll("employee")
// .then(results => console.table(results))
// .then(connection.end())
// .catch(err=> err);

// test.tripleJoin(["employee.first_name", "employee.last_name", "role.title", "department.name", "role.salary"], "department", "role", "department.id", "role.department_id", "employee", "role.id", "employee.role_id")
// .then(results => console.table(results))
// .then(connection.end())
// .catch(err=> err);