SELECT appointmentdate, starttime, endtime, starthour FROM scheduledappts
WHERE detailerid = $1
ORDER BY starthour ASC;