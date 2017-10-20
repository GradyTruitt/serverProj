UPDATE users
SET acctbalance = acctbalance + ${bidprice}
WHERE id = ${detailerid};