const contactModel = require("../../model/contactModel");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactModel
      .find()
      .sort({ createdAt: -1 }); // Latest first
    res.status(200).json({
      message: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    // ✅ At this point, Joi has already validated req.body
    const { name, email, phone } = req.body;

    const contact = await contactModel.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Contact successfully created",
      contact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    next(error);
  }
};

const singleContact = async (req, res, next) => {
  try {
    const contact = await contactModel.findById(req.params.id);

    if (!contact) {
      const error = new Error("Contact not found");
      error.statusCode = 404;
      throw error; // This will be caught by the errorHandler
    }

    return res.status(200).json({
      contact,
    });
  } catch (error) {
    next(error); // Pass the error to the middleware
  }
};

const updateContact = async (req, res) => {
  const contact = await contactModel.findById(req.params.id);
  if (!contact) {
    const error = new Error("Contact not found");
    error.statusCode = 404;
    throw error; // This will be caught by the errorHandler
  }
  if (contact.user_id.toString() !== req.user.id) {
    const error = new Error("User not authorized");
    error.statusCode = 403;
    throw error; // This will be caught by the errorHandler
  }
  const updatedContact = await contactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res.status(200).json({
    contact: updatedContact,
  });
};
const deleteContact = async (req, res) => {
  try {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await contact.deleteOne(); // Actually delete it

    res.status(200).json({
      success: true,
      message: `Contact with ID ${req.params.id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  getContacts,
  createContact,
  singleContact,
  updateContact,
  deleteContact,
};
