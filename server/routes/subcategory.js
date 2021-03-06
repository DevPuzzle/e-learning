const express = require('express');
const router = express.Router();

const SubcategoryController = require('../controllers/subcategory');
const checkAuth = require('../middleware/check-auth');
const roleAdmin = require('../middleware/admin');

router.get("/list", SubcategoryController.subcategory_list);
router.get("/:id", SubcategoryController.subcategory_get);
router.post("/create", checkAuth, roleAdmin, SubcategoryController.subcategory_create);
router.patch("/edit/:id", checkAuth, roleAdmin, SubcategoryController.subcategory_edit);
router.delete("/delete/:id", checkAuth, roleAdmin, SubcategoryController.subcategory_delete);
// Theme /////////
router.get("/:id/themes", SubcategoryController.themes_of_subcategory);

module.exports = router;