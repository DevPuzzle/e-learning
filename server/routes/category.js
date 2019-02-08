const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');
const admin = require('../middleware/admin');

router.get("/list", CategoryController.categories_list);
router.get("/:id", CategoryController.category_get);
router.post("/create", checkAuth, admin, CategoryController.category_create);
router.patch("/edit/:id", checkAuth, admin, CategoryController.category_edit);
router.delete("/delete/:id", checkAuth, admin, CategoryController.category_delete);

/// Subcategory /////////
// router.get("/:catname/subcategory/list", CategoryController.subcategories_list);
// router.post("/:catname/subcategory/create", CategoryController.subcategory_create);
module.exports = router;