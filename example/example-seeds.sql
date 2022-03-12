
--///// DEPARTMENT SEEDS /////--
INSERT INTO department (name)
VALUES ('Upper Management');    -------> id: 1
INSERT INTO department (name)
VALUES ('Project Management');  -------> id: 2
INSERT INTO department (name)
VALUES ('Sales');               -------> id: 3
INSERT INTO department (name)
VALUES ('Finance');             -------> id: 4
INSERT INTO department (name)
VALUES ('Service');             -------> id: 5

--//////////// ROLE SEEDS ////////////--
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 200000, 1);                      -------> id: 1

INSERT INTO role (title, salary, department_id)
VALUES ('CFO', 200000, 1);                      -------> id: 2

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Operations', 160000, 1);       -------> id: 3

INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 750000, 4);               -------> id: 4

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 150000, 3);               -------> id: 5

INSERT INTO role (title, salary, department_id)
VALUES ('Project Manager', 120000, 2);          -------> id: 6

INSERT INTO role (title, salary, department_id)
VALUES ('Service Manager', 110000, 5);          -------> id: 7

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Service Technician', 80000, 5);   -------> id: 8

INSERT INTO role (title, salary, department_id)
VALUES ('Service Technician', 52000, 5);        -------> id: 9

INSERT INTO role (title, salary, department_id)
VALUES ('Head of Sales', 200000, 3);            -------> id: 10

--//////////// EMPLOYEE SEEDS ////////////--
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Matt', 'Majia', 1, null);                              -------> id: 1

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Doug', 'McKibbon', 3, 1);                              -------> id: 2

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Janet', 'Svinovski', 2, null);                         -------> id: 3

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Claire', 'Powell', 4, 3);                              -------> id: 4

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gregg', 'Nelson', 10, null);                           -------> id: 5

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Moore', 5, 5);                              -------> id: 6

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cory', 'Tiesel', 5, 5);                                -------> id: 7

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Sapp', 6, 2);                                  -------> id: 8

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sally', 'Wright', 7, null);                            -------> id: 9

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bryan', 'Durushia', 8, 9);                             -------> id: 10

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Caleb', 'Lefley', 9, 9);                               -------> id: 11

