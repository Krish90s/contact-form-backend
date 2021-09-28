const forms = require("./forms");
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/forms", forms);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));
