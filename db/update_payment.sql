UPDATE user_profile_info
SET 
fees_current = $2
WHERE user_id = $1;