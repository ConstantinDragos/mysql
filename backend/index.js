import { createConnection } from 'mysql';
import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './helpers.js';

const dbConn = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'public',
});

dbConn.connect((err) => {
  if (err) throw err;
  console.log('Mysql is connected');
});

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.post(routes.createTableEmployee, (req, res) => {
  let sql =
    'Create table employee (id int AUTO_INCREMENT, name varchar(255),city varchar(255), PRIMARY KEY (id))';
  dbConn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Employee table created');
  });
});

app.get(routes.getEmployees, (req, res) => {
  let sql = 'select * from employee';
  dbConn.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post(routes.addEmployee, (req, res) => {
  const { name, city } = req.body;
  const employee = { name, city };
  let sql = 'insert into employee set ?';
  dbConn.query(sql, employee, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post(routes.updateEmployee, (req, res) => {
  const { id, name, city } = req.body;
  const employee = { name, city };
  let sql = 'update employee set ? where id=?';
  dbConn.query(sql, [employee, id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post(routes.addCard, (req, res) => {
  const { id, name, count } = req.body;
  const card = { id, name, count };
  let sql = 'update card set ? where id=?';
  dbConn.query(sql, [card, id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.post(routes.deleteEmployee, (req, res) => {
  const { id } = req.body;
  let sql = 'delete from employee where id=?';
  dbConn.query(sql, [id], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
