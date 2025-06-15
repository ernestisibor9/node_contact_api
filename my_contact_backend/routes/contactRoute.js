const express = require("express");
const { getContacts, createContact, singleContact, updateContact, deleteContact } = require("../controllers/contactController");
const validate = require("../middleware/validate");
const contactSchema = require("../validators/contactValidators");
const validateToken = require("../middleware/validateToken");
const authorizeRoles = require("../middleware/roleMiddleware");
const router = express.Router();


router.use(validateToken)
router.get("/", authorizeRoles("admin"), getContacts);
router.post("/", validate(contactSchema), createContact); // ✅ Joi middleware used here
router.get("/:id", authorizeRoles("admin", "user"),  singleContact);
router.put("/:id", authorizeRoles("admin"),  updateContact);
router.delete("/:id", deleteContact);

module.exports = router