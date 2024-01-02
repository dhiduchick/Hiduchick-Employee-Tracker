INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Interconnected'),
       ('Sales'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineering Manager', 120000, 1),
       ('Engineering Lead', 100000, 1),
       ('Staff Engineer', 80000, 1),
       ('Finance Manager', 85000, 2),
       ('Accountant', 70000, 2),
       ('Brand Advocate Manager', 95000, 3),
       ('Brand Advocate Sr.Analyst', 83000, 3),
       ('Brand Advocate Analyst', 70000, 3),
       ('Sales Manager', 80000, 4),
       ('Salesperson', 70000, 4),
       ('Legal Manager', 200000, 5),
       ('Lawyer', 100000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter",  1, NULL),
        ("Ron", "Weasley",  2, 1),
        ("Ginny", "Weasley",  3, 1), 
        ("Geroge", "Weasley",  4, NULL), 
        ("Fred", "Weasley",  5, 4),
        ("Draco", "Malfoy",  6, NULL), 
        ("Hermionie", "Granger",  7, 6), 
        ("Luna", "Lovegood",  8, 6), 
        ("Albus", "Dumbledore",  9, NULL), 
        ("Tom", "Riddle",  10, 9), 
        ("Neville", "Longbottom",  11, NULL), 
        ("Cedric", "Diggory",  12, 11);