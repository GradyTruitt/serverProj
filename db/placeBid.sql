INSERT INTO pendingbids (id, userid, detailerid, appointmentdate, starttime, endtime, location, car, instructions, package, bidprice, detailername, detailerrating)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);