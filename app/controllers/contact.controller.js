const ContactService=require('../services/contact.service');
const MongoDB=require('../utils/mongodb.util');
const ApiError=require('../api-error');

exports.create = async function (req, res, next) {
    if(!req.body?.name){
       return next(new ApiError(400,'Name cannot be empty'))
    }
    try {
        const contactService= new ContactService(MongoDB.client);
        const document= await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500,"An error occurred while create a contact"))
    }
    
        
    
};

exports.findAll = async function (req, res, next){
    let document=[];
    try {
        const contactService= new ContactService(MongoDB.client);
        const {name} = req.query;
        if(name){
            document=await contactService.findByName(name);
        }else{
            document=await contactService.find({})
        }
    } catch (error) {
        return next(new ApiError(500,"An error occurred while retrieving a contacts"))
    }
    return res.send(document);
};

exports.findOne =async function (req, res, next){
    try {
        const contactService= new ContactService(MongoDB.client);
        const document= await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(400,'Contact not found'));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500,`Error retrieving contact with id=${req.params.id}`))
    }
};

exports.update =async function (req, res, next){
    if(Object.keys(req.body).length===0){
        return next(new ApiError(400,'Data to uppdate cannot be empty'));
    }

    try {
        const contactService= new ContactService(MongoDB.client);
        const document= await contactService.update(req.params.id,req.body);
        if(!document){
            return next(new ApiError(400,'Contact not found'));
        }
        return res.send({Message:'Contact was updated successfully!!!'});
    } catch (error) {
        return next(new ApiError(500,`Error updating contac twith id=${req.params.id}`))
        
    }
};

exports.delete =async function (req, res, next){
    try {
        const contactService= new ContactService(MongoDB.client);
        const document= await contactService.delete(req.params.id,req.body);
        if(!document){
            return next(new ApiError(400,'Contact not found'));
        }
        return res.send({Message:'Contact was deleted successfully!!!'});
    } catch (error) {
        return next(new ApiError(500,`Could not delete contact with id=${req.params.id}`))
    }
};

exports.deleteAll =async function (req, res, next){
    try {
        const contactService= new ContactService(MongoDB.client);
        const deleteCount= await contactService.deleteAll();
        return res.send({message:`${deleteCount} Contact were deleted successfully!!!`});
    } catch (error) {
        return next(new ApiError(500,"An error occurred while removing all contacts"))
    }
};

exports.findAllFavorite =async function (req, res, next){
    try {
        const contactService= new ContactService(MongoDB.client);
        const document= await contactService.findFavorite();
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500,"An error occurred while retrieving favorite contacts"))
    }
}