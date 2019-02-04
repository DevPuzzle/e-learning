const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comment');
const checkAuth = require('../middleware/check-auth');

// router.get("/list", ThemeController.theme_list);
// router.get("/:themename", ThemeController.theme_get);
// router.post("/create", ThemeController.theme_create);
// // router.patch("/update/:subcatname", ThemeController.theme_upload);
// router.delete("/delete/:themename", ThemeController.theme_delete);

module.exports = router;