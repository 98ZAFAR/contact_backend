//@get all contacts
//GET/api/contacts
const asyncHandler = require('express-async-handler'); 

const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({message:'Get All Contacts'});
});

//@get single contact
//GET/api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message:`Get Contact with id ${req.params.id}`});
});

//@create contact
//POST/api/contacts/
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are required!");
    }
    res.status(201).json({message:"Create Contact"});
});

//@update contact
//PUT/api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message:`Update Contact with id ${req.params.id}`});
});

//@delete contact
//DELETE/api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({message:`Delete Contact with id ${req.params.id}`});
});

module.exports = {getContacts, getContact,createContact, updateContact, deleteContact};