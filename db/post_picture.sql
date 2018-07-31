UPDATE user_profile_info
SET 
profile_img = $1
WHERE user_id = $2;