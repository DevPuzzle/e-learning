const express = require('express');
const router = express.Router();

const ThemeController = require('../controllers/theme');
const checkAuth = require('../middleware/check-auth');
const admin = require('../middleware/admin');

router.get("/list", ThemeController.theme_list);
router.get("/:id", ThemeController.theme_get);
router.post("/create", checkAuth, admin, ThemeController.theme_create);
router.patch("/edit/:id", ThemeController.theme_edit);
router.delete("/delete/:id", checkAuth, admin, ThemeController.theme_delete);

module.exports = router;