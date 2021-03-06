const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');
const roleAdmin = require('../middleware/admin');

router.get("/list", CategoryController.categories_list);
router.get("/:id", CategoryController.category_get);
router.post("/create", checkAuth, roleAdmin, CategoryController.category_create);
router.patch("/edit/:id", checkAuth, roleAdmin, CategoryController.category_edit);
router.delete("/delete/:id", checkAuth, roleAdmin, CategoryController.category_delete);

/// Subcategory /////////
router.get("/:id/subcategories", CategoryController.subcategories_of_category);
// router.post("/:catname/subcategory/create", CategoryController.subcategory_create);
module.exports = router;