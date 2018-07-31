UPDATE member_applications
SET 
application_status = $2
WHERE id = $1;