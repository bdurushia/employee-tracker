INSERT INTO department (id, name)
VALUES (1, 'Upper Management');    -- id 1
INSERT INTO department (name)
VALUES (2, 'Project Management');  -- id 2
INSERT INTO department (name)
VALUES (3, 'Sales');               -- id 3
INSERT INTO department (name)
VALUES (4, 'Finance');             -- id 4
INSERT INTO department (name)
VALUES (5, 'Service');             -- id 5


INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'CEO', 200000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, 'CFO', 200000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, 'Head of Operations', 160000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, 'Accountant', 750000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, 'Sales Lead', 150000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, 'Project Manager', 120000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, 'Service Manager', 110000, 5);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, 'Lead Service Technician', 80000, 5);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, 'Service Technician', 52000, 5);

INSERT INTO role (id, title, salary, department_id)
VALUES (10, 'Head of Sales', 200000, 3);


INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Matt', 'Majia', 1, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, 'Doug', 'McKibbon', 3, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, 'Janet', 'Svinovski', 2, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, 'Claire', 'Powell', 4, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, 'Gregg', 'Nelson', 10, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, 'Michael', 'Moore', 5, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, 'Cory', 'Tiesel', 5, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, 'John', 'Sapp', 6, 2);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, 'Sally', 'Wright', 7, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, 'Bryan', 'Durushia', 8, 9);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (11, 'Caleb', 'Lefley', 9, 9);

