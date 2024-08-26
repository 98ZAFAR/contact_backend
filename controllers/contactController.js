//@get all contacts
//GET/api/contacts
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find();
    res.status(200).json(contact);
});

//@get single contact
//GET/api/contacts/:id
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    res.status(200).json(contact);
});

//@create contact
//POST/api/contacts/
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    const contact = await Contact.create({
        name,
        email,
        phone
    });
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are required!");
    }
    res.status(201).json(contact);
});

//@update contact
//PUT/api/contacts/:id
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updateContact);
});

//@delete contact
//DELETE/api/contacts/:id
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found!");
    }
    const deleteContact = await Contact.findByIdAndDelete(
        req.params.id,
        req.body,
        {delete:true}
    )
    res.status(200).json(deleteContact);
});

module.exports = {getContacts, getContact,createContact, updateContact, deleteContact};