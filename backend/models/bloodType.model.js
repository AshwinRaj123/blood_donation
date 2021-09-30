const mongoose = require('mongoose');

const schema = mongoose.Schema;

const bloodTypeSchema = new schema({
    bloodType:{
        type:String,
        required:true,
        unique:true,
        minlength:1,
        trim:true
    },
    
},{
    timestamps:true,
})

const BloodType = mongoose.model('BloodType',bloodTypeSchema);
module.exports = BloodType;