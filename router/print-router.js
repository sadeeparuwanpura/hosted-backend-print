const {printFunction} = require("../controller/print-controller");

const router = require("express").Router();



router.get('/resiptPrint', printFunction);



module.exports = router;