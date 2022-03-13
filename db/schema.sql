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
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUES ('Upper Management');
INSERT INTO department (name)
VALUES ('Project Management');
INSERT INTO department (name)
VALUES ('Sales');
INSERT INTO department (name)
VALUES ('Finance');
INSERT INTO department (name)
VALUES ('Service');

INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 200000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('CFO', 200000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Operations', 160000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Sales', 200000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Matt', 'Majia', 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Doug', 'McKibbon', 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Janet', 'Svinovski', 2, null);