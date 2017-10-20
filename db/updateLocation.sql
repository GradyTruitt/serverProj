UPDATE users
SET currentlocation = $2
WHERE id = $1;