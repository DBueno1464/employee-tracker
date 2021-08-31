INSERT INTO department ( name )
VALUES
( 'sales' ),
( 'finance' );

select * from department;

INSERT INTO role ( title, salary, department_id )
VALUES
( 'sales person', 54321, 1 ),
( 'acountant', 100000 , 2 );

select * from role;

INSERT INTO employee ( first_name, last_name, role_id, manager_id )
VALUES
( 'Venus', 'Willendorf', 1, 1 ),
( 'Maxxy', 'Tibby', 2, 2 );

select * from employee;