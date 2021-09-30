const router = require('express').Router();
let BloodType = require('../models/bloodType.model');

router.get('/', async(req,res)=>{
    try{
        const types = await BloodType.find();
        res.json(types)
    }catch(err){
        res.json({message:err})
    }
})

router.post('/', async(req,res)=>{
    const typeName =  new BloodType({
        bloodType:req.body.bloodType
    });

    try{
        const newType = await typeName.save();
        res.json(newType)
    }catch(err){
        res.json({message:err})
    }
})

module.exports = router;

