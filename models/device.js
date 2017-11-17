const mongoose = require('mongoose');
const fs =  require("fs");
const moment = require("moment");
const deviceSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },    
    owners:{
        type:Array
        // required:true
    },
    cpuTemp:{
        type:String,
        default:0.0
        // required: true
    },
    timestamp:{
        type: String        
    }
});

const Device = module.exports = mongoose.model('Device', deviceSchema);

module.exports.addDevice = (device, callback) => {
    var temp = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp");
    var temp_c = temp/1000;
    device["cpuTemp"]=temp_c.toString()+"°C";
    device["timestamp"]= moment().format('llll');;
    console.log("comming in model....");
    console.log("device is ", device);
    Device.create(device, callback);
}
module.exports.getDevices = (callback) => {
    Device.find(callback);
}
// module.exports.getDeviceById = (id, callback) => {
//     Device.findById(id, callback);
// }

module.exports.getDevicebyType = (device_type, callback) => {
    query = {
        type:device_type
    }
    Device.find(query,callback);
}

// module.exports.updateDevice = (device,options,callback)=>{
//     query = {
//         device_ID: device.device_ID
//     }

//     var update = {
//         device_Type : device.device_Type,
//         owners : device.owners
//     }

//     Device.findOneAndUpdate(query,update,options,callback);
// }
// module.exports.removeDevice=(deviceId,callback)=> {
//     query={
//         device_ID: deviceId
//     };
//     Device.remove(query,callback);
// }