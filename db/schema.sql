DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT, 
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  PRIMARY KEY (id),

  department_id INT,

  FOREIGN KEY (department_id) 
  REFERENCES department(id) 
  ON DELETE CASCADE

);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,

  role_id INT,
  manager_id INT,
  
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE,
  
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE CASCADE
 
);