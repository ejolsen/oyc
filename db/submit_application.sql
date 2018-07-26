INSERT INTO member_applications 
(first_name, last_name, email, city, us_state, zipcode, boat_name, boat_type, date_submitted, phone, application_status, membership_type)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);