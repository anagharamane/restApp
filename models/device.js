const mongoose = require('mongoose');
const fs =  require("fs");
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
        type:Array,
        required:true
    },
    cpuTemp:{
        type:String,        
        required: true
    },
    timestamp:{
        type: String,
        required: true      
    }
});

const Device = module.exports = mongoose.model('Device', deviceSchema);

module.exports.addDevice = (device, callback) => {    
    Device.create(device, callback);
}
module.exports.getDevices = (callback) => {
    Device.find(callback);
}

module.exports.getDevicebyType = (device_type, callback) => {
    query = {
        type:device_type
    }
    Device.find(query,callback);
}