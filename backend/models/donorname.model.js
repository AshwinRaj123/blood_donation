const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donorDetails = new Schema({
    // name:{
    //     first:{
    //         type:String,
    //         required:true,
    //         //minlength:1
    //     },
    //     last:{
    //         type:String,
    //         required:true,
    //        // minlength:1
    //     }
    // },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        //match:/^\d{10}$/,
        required:true,
        unique:true
    },
    bloodGroup:{
        type:String,
        requied:true
    },
    email:{
        type:String,
        unique:true
    },
    lastDonated:{
        type:Date,
        default:Date,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    }
});

const DonorSchema = mongoose.model('DonorSchema',donorDetails);

module.exports = DonorSchema;