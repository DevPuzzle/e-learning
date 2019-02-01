const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category');
const checkAuth = require('../middleware/check-auth');

router.get("/list", CategoryController.categories_list);
router.get("/:catname", CategoryController.category_get);
router.post("/create", CategoryController.category_create);
// router.patch("/update/:catname", CategoryController.user_avatar_upload);
router.delete("/delete/:catname", CategoryController.category_delete);

/// Subcategory /////////
// router.get("/:catname/subcategory/list", CategoryController.subcategories_list);
// router.post("/:catname/subcategory/create", CategoryController.subcategory_create);
module.exports = router;