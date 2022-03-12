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
VALUES ('CFO', 200000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Operations', 160000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 750000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ('Project Manager', 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ('Service Manager', 110000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Service Technician', 80000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ('Service Technician', 52000, 5);

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Sales', 200000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Matt', 'Majia', 1, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Doug', 'McKibbon', 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Janet', 'Svinovski', 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Claire', 'Powell', 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gregg', 'Nelson', 10, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Moore', 5, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cory', 'Tiesel', 5, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Sapp', 6, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sally', 'Wright', 7, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bryan', 'Durushia', 8, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Caleb', 'Lefley', 9, 9);

