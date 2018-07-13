SELECT *
FROM users 
JOIN user_profile_info on users.id = user_profile_info.USER_ID
WHERE USER_ID=$1;