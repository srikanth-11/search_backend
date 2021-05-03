const express = require("express");

const Information = require("../models/information");
const authenticate = require("../services/authentication")
const router = express.Router();

router.post("/createInformation",authenticate, async (req, res) => {
 try {
  const newInformation = new Information({
   businessName: req.body.businessName,
   address: req.body.address,
   ownerName: req.body.ownerName,
   employeeSize: req.body.employeeSize,
   username:req.body.username,
   createdAt: new Date().toISOString(),
  
  });
   await newInformation.save();
  res.status(200).json({
   message: "Information  created successfully",
  });
 } catch (error) {
  console.log(error);
  res.status(400).json({
   message: "Error occured",
  });
 }
});

router.put("/updateInformation",authenticate,async(req,res) =>{
 try {
  let information = await Information.findOne({ _id: req.body.infoid });
  if(information){
   information.businessName= req.body.businessName
   information.address=req.body.address
   information.ownerName= req.body.ownerName
   information.employeeSize=req.body.employeeSize
    information.save()
   res.status(200).json({
  message:"Updated information successfully"
   })
  } else {
   res.status(400).json({
      message: "Failed to update information",
   })
}
 } catch (error) {
  console.log(error)
  res.status(400).json({
     message: "error occured",
    
  })
 }
})

router.delete("/deleteInformation",authenticate,async(req,res) => {
 try {
  const information= await Information.findOne({_id: req.body.infoid})
   await information.delete()
  res.status(200).json({
   message:"Deleted information successfully"
    })
 } catch (error) {
  console.log(error)
  res.status(400).json({
     message: "error occured",
    
  })
 }
})

router.get("/getinformations",authenticate, async (req, res) => {
 try {
  const informations = await Information.find().sort({ createdAt: -1 })
  if (informations) {
   res.status(200).json({
    informations
   })
  }
  else {
   res.status(400).json({
    message: "there is no information"
   })
  }
 } catch (error) {
  console.log(error)
  res.status(400).json({
   message: "Error occured"
  })
 }
})

router.get("/getinformation/:id",authenticate, async (req, res) => {
   try {
    const information = await Information.findOne({_id:req.params.id})
    if (information) {
     res.status(200).json({
      information
     })
    }
    else {
     res.status(400).json({
      message: "there is no information"
     })
    }
   } catch (error) {
    console.log(error)
    res.status(400).json({
     message: "Error occured"
    })
   }
  })

  router.get("/getinformationname/:myname",authenticate, async (req, res) => {
   try {
      
    const information = await Information.find({$or:[{businessName: {$regex: req.params.myname, $options: 'i'}},{ownerName: {$regex: req.params.myname, $options: 'i'}}]})
    if (information) {
     res.status(200).json({
      information
     })
    }
    else {
     res.status(400).json({
      message: "there is no information"
     })
    }
   } catch (error) {
    console.log(error)
    res.status(400).json({
     message: "Error occured"
    })
   }
  })
  
module.exports = router
