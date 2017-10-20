SELECT * FROM scheduledappts
WHERE detailerid = $1
ORDER BY starthour ASC;