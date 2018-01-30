var db = require("../models/db.js");
var formidable =  require("formidable");
var dateFormat = require('dateformat');
var ObjectId = require('mongodb').ObjectID;


exports.showIndex = function(req,res,next){
    db.getAllCount("liuyan",function(count){
        res.render("index",{
            "pageAmount":Math.ceil(count / 10)
        })
    })
}

exports.dopost = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields){
        db.insertOne("liuyan",{
            "xingming":fields.xingming,
            "liuyan":fields.liuyan,
            "shijian":new Date()
        },function(err,result){
            if(err){
                res.Json({"result":-1});
                return;
            }
            res.json({"result":1});
        })
    })
}

exports.getAllmsg = function(req,res,next){
    var page = parseInt(req.query.page);
    var args = {"sort":{"shijian":-1},"pageAmount":10,"page":page};
    db.find("liuyan",{},args,function(err,result){
        res.json({"result":result});
    });
}

exports.deleteId = function (req,res,next) {
    var id = req.query.id;
    db.deleteMany("liuyan",{"_id":ObjectId(id)},function (err,result) {
        // console.log(result);
        res.redirect("/");
    })
}