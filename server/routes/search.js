const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/search');
checkAuth = require('../middleware/check-auth');

router.post("/state/filter", checkAuth, SearchController.state_filter);
router.post("/state_cities/filter", checkAuth, SearchController.state_cities_filter);

module.exports = router;