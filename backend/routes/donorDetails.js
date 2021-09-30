const router = require('express').Router();
const schedule = require('node-schedule');
let Donor = require('../models/donorname.model');
let BloodType = require('../models/bloodType.model');


//Get All Donor

router.get('/', async(req,res)=>{
    try{    
        const details = await Donor.find();
        res.json(details)
    }catch(e){
        res.json({message:e})
    }
});

//Get single donor
router.get('/:id',async(req,res)=>{
    try{
        const donorID = req.params.id;
        const donorData = await Donor.findById(donorID);
        res.json(donorData);
    }catch(e){
        res.json({message:e})
    }
})

//get Donosr based on the Blood Group
router.get('/bg/:type', async(req,res)=>{
    try{
        const donorData = await Donor.find({bloodGroup:req.params.type});
        res.json(donorData);
    }catch(e){
        res.json({message:e})
    }
})

//Get All active Donor
 router.get('/active', async(req,res)=>{
     try{
         const activeDonors =await  Donor.find({active:true})
         res.json(activeDonors)
     }catch(err){
         res.json({message:err})
     }
 });

 
 //Post donor
router.post('/', async(req,res)=>{
    const donor = new Donor({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phoneNo:req.body.phoneNo,
        bloodGroup:req.body.bloodGroup,
        email:req.body.email,
        lastDonated:req.body.lastDonated,
        active:req.body.active
    })

    try{
        const bloodType = await BloodType.find({bloodType:req.body.bloodGroup});
        if(bloodType.length > 0){
            const saveDonor = await donor.save()
            res.json(saveDonor);
        }else{
           res.json({message:"No Blood group found"})
        }
    }catch(e){
        res.json({message:e})
    }
   
})

//Update Donor
router.patch('/:id', async(req,res)=>{
    const id = req.params.id;
    const updateDonor = req.body;
    const options = {new:true};
    try{
        const donor = await Donor.findByIdAndUpdate(id,{$set:updateDonor},options);
        res.json(donor)
        //updateActiveDonor(donor);
    }catch(e){
        res.json({message:e})
    }
});

router.delete('/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const removedDonor = await Donor.remove({_id:id});
        res.json(removedDonor)
    }catch(e){
        res.json({message:e})
    }

});

const updateActiveDonor  = async (updatedDate)=>{
    //const currentDates = await Donor.find();
    const options = {new:true};
    //let currentDate = new Date(updatedDate.lastDonated)
    let currentDate = new Date()
    currentDate.setTime(currentDate.getTime() +  10000 * 6);
     schedule.scheduleJob(currentDate, ()=>{
         try{
            const activateDonor =  Donor.findByIdAndUpdate(updatedDate._id,{$set:{active:true},options});
            console.log(activateDonor);
         }catch(err){
             console.log('nessage',err);
         }
        //console.log('Tiner');
        
     })
   console.log('Testing',currentDate);
}

module.exports = router;
//module.exports = updateActiveDonor;



 