INSERT INTO member_applications 
(first_name, last_name, email, city, us_state, zipcode, boat_name, boat_type, date_submitted)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9);