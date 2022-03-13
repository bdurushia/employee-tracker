DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NULL,
    salary DECIMAL,
    department_id INT,
    CONSTRAINT FK_department_id FOREIGN KEY (department_id) 
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTRAINT FK_role_id FOREIGN KEY (role_id) 
    REFERENCES role(id),
    CONSTRAINT FK_manager_id FOREIGN KEY (manager_id) 
    REFERENCES employee(id)
);