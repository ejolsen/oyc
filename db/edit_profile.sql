UPDATE user_profile_info
SET 
user_status = $2,
email = $3,
phone = $4,
city = $5,
us_state = $6,
boat_info = $7,
about_me = $8,
club_position = $9,
boat_type = $10,
boat_length = $11,
boat_name = $12
WHERE user_id = $1;