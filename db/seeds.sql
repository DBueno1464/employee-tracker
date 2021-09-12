INSERT INTO department ( name )
VALUES
( 'sales' ),
( 'finance' ),
( 'entertainment');

select * from department;

INSERT INTO role ( title, salary, department_id )
VALUES
( 'sales person', 54321, 1 ),
( 'acountant', 100000 , 2 ),
( 'funny person', 999999, 3);

select * from role;

INSERT INTO employee ( first_name, last_name, role_id, manager_id )
VALUES
( 'Venus', 'Willendorf', 3, 2 ),
( 'Maxxy', 'Tibby', 1, 3 ),
( 'Amanda', 'Tutor', 2, 1);

select * from employee;