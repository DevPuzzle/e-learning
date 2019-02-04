const express = require('express');
const router = express.Router();

const SubcategoryController = require('../controllers/subcategory');
const checkAuth = require('../middleware/check-auth');
const admin = require('../middleware/admin');

router.get("/list", SubcategoryController.subcategory_list);
router.get("/:subcatname", SubcategoryController.subcategory_get);
router.post("/create", checkAuth, admin, SubcategoryController.subcategory_create);
// router.patch("/update/:subcatname", CategoryController.user_avatar_upload);
router.delete("/delete/:subcatname", checkAuth, admin, SubcategoryController.subcategory_delete);

module.exports = router;