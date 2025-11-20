const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello from My Web App!</h1>");
});

app.listen(3030, () => console.log("Server running on port 3000"));