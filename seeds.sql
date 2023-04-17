INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("NICK", "FURY", 1, NULL),
 ("THOR", "ODINSON", 2, NULL),
 ("CAPTAIN", "AMERICA", 3, 1),
 ("TONY", "STARK", 4, NULL),
 ("CAPTAIN", "MARVEL", 5, NULL),
 ("BRUCE", "BANNERHULK", 6, 1),
 ("ANT", "MAN", 7, 1),
 ("SPIDER", "MAN", 8, 4),
 ("BLACK", "PANTHER", 9, NULL),
 ("WANDA", "VISION", 10, 1),
 ("NATASHA", "ROMANROFF", 11, 1),
 ("LOKI", "ODINSON", 12, NULL);

INSERT INTO roles (title, salary, department_id) VALUES ("DIRECTOR", 1000000.00, 1),
("MANAGER", 180000.00, 2),
("LEAD ENGINEER", 90000.00, 2),
("SOFTWARE ENGINEER", 80000.05, 3),
("ACCOUNTANT", 125000.00, 5),
("LAWYER", 190000.01, 5),
("LEAD IT ENGINEER", 150000.00, 4),
("SALESMAN", 999.05, 6),
("JR. ENGINEER", 9999.05, 3),
("BUSINESS LEAD", 250000, 1),
("SYSTEM MANAGER", 100200.01, 2),
("CASHIER", 999.05, 6);

INSERT INTO departments (department_name) VALUES ("DIRECTOR"),
("MANAGER"),
("ENGINEERING"),
("IT"),
("LEGAL"),
("SALES");

-- SELECT * FROM employees;
-- SELECT * FROM roles;
-- SELECT * FROM departments;