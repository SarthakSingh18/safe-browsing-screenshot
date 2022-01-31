const express = require("express");
const router = express.Router();
const clickScreenshot = require("../js/index");
const fs = require("fs");
router.get("/",(req,res)=>{
    clickScreenshot.clickScreenshot(req.query.url).then((result)=>{
        try{
        fs.readFile('./screenshot.png',(err,content)=>{
            if(err){
                console.log(err);
                throw new Error(err);
            }
            else{
                res.writeHead(200,{'Content-type':'image/png'});
                res.end(content)
            }
        });
    }
    catch(e){
        console.log(e);
        res.send(error).status(500);
    }
    })
    .catch((error)=>{
        res.send(error);
    })
})

module.exports = router;
