INSERT INTO users (username, password, name, usertype, currentlocation) VALUES ($1, $2, $3, $4, $5) returning id;