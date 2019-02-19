const express = require('express');
const router = express.Router();

const ThemeController = require('../controllers/theme');
const checkAuth = require('../middleware/check-auth');
const roleAdmin = require('../middleware/admin');

router.get("/list", ThemeController.theme_list);
router.get("/:id", ThemeController.theme_get);
router.post("/create", checkAuth, roleAdmin, ThemeController.theme_create);
router.patch("/edit/:id", checkAuth, roleAdmin, ThemeController.theme_edit);
router.delete("/delete/:id", checkAuth, roleAdmin, ThemeController.theme_delete);

module.exports = router;