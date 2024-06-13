const express = require('express');
const App = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

App.use(express.json());

const printRouter = require("./router/print-router");

const cors = require('cors');
//Enable CORE
// App.use(cors());
dotenv.config();

App.use(
  cors({
    origin: "*",
  })
);

App.use("/api/v1/print", printRouter);

const PORT = 9000;

App.listen(PORT, () => {
    console.log(`Backend running on http://:${PORT}`);
});
