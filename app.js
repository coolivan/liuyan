var express = require("express");
var app = express();
var router = require("./controller/router");

app.set("view engine","ejs");
app.use(express.static("./public"));

app.get("/", router.showIndex);
app.get("/msglist", router.getAllmsg);
app.get("/delete", router.deleteId);


app.post("/tijiao", router.dopost);





app.listen(3000);
