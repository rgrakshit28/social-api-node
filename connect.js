import mysql from 'mysql';

export const database = mysql.createConnection({
  host: 'db-instance-mern.caiq802nkxho.us-east-1.rds.amazonaws.com',
  database: 'social',
  user: 'admin',
  password: '12345678',
});
