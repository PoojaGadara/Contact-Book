const contactModel = require('../models/contactBookModel');
const Errorhandler = require('../utills/errorHandler')
const catchAsyceError = require('../middleware/catchAsyncError')


//create new contact 
exports.createContact = catchAsyceError(async(req,res,next) => {
    const contact = await contactModel.create(req.body)

    res.status(201).json({
        success:true,
        contact
    })
})


//update the contact
exports.updateContact = catchAsyceError(async (req,res,next) => {
try{
    const id = req.params._id

    let contact = await contactModel.findById({id})

    contact = await contactModel.findByIdAndUpdate(contact, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    })
   
    res.status(201).json({
        success:true,
        contact
    })

}catch(err){
    console.log(err)
}
})

//delete the specific id provided contact
exports.deleteContact= catchAsyceError(async (req,res,next) => {

    const contact = await contactModel.findById(req.params._id)
    
    if(!contact){
        return next(new Errorhandler("Contact Not Found" , 404))
    }
    await contact.remove()

    res.status(200).json({
        success:true,
        message : 'Product deleted Succesfully'
    })
});

//get All the contacts 
exports.getAllContact = catchAsyceError(async(req,res,next) => {

    //find Contact
    const contact = await contactModel.find();
      
    if(!contact){
        return next(new Errorhandler("No Contacts Found" , 404))
    }

    res.status(200).json({
        success:true,
        contact
    })

})

//Get Contact By Name

exports.getCaseSensitiveContact = catchAsyceError(async(req,res,next) => {

    const name = req.params.name;

    //check for regular expression
    const contact = await contactModel.find({"name":  { $regex: new RegExp("^" + name.toLowerCase(), "i") }});

    if(!contact){
        return next(new Errorhandler("No Contacts Found" , 404))
    }

    res.status(200).json({
        success:true,
        contact
    })

});

// pagination implementation

exports.getPage= catchAsyceError(async(req,res) => {

    //get data from Query String
    let page = req.query.page
    let size = req.query.size

    if(!page){
        page = 1
    }
    if(!size){
        size = 5
    }
 //parse size to int
    const limit = parseInt(size)
    const skip = (page -1) * size;

     const contact =await contactModel.find({}).limit(limit).skip(skip)

//no contact Found
     if(!contact){
        return next(new Errorhandler("No Contacts Found" , 404))
    }
    res.status(200).json({
        success:true,
        contact
    })
});