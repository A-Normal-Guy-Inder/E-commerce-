const Contact = require('./../db/contact-us');


async function addContactUs(contactModel) {
    let contact = new Contact(contactModel);
    await contact.save();
}

async function getAllContacts() {
    return await Contact.find();
}

module.exports = {
    addContactUs,
    getAllContacts
};
