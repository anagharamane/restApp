var express = require('express');
var router = express.Router();
const Device = require('../models/device');


router.get('/', function(req, res, next) {
    Device.getDevices((err,devices)=>{
        if (err){
            console.error(err);
            res.json({
                success:false,
                msg:"Some Error"
            })
        }else{
            res.json({
                success:true,
                devices:devices
            })
        }
    });
});

router.get('/', function(req,res){
    
});

router.post('/', (req, res, next) => {    
    var newDevice = req.body;   
    var type = req.body.type;
    Device.getDevicebyType(type,(err,device)=>{
        console.log(device);
        if (device.length != 0){
            res.json({
                status:false,
                msg:"Device already Exists"
            });
        }else{ 
            Device.addDevice(newDevice,(err,device)=>{
                console.log(newDevice);
                if (err){
                    console.error(err);
                    res.json({
                        success: false,
                        msg: "Some Error"
                    });
                } else {
                    res.json({
                        success:true,
                        msg:"Device registered successfully....",
                        device:device
                    })
                }
            });
        } 
    });   
});


router.post('/find',(req,res,next)=>{
    type = req.body.type;
    Device.getDevicebyType(type,(err,device)=>{
        console.log(device);
        if (device.length == 0){
            res.json({
                status:false,
                msg:"Device does not exist"
            });
        }else{
            res.json({
                status:false,
                msg:device
            }); 
        }
    });
});




module.exports = router;
