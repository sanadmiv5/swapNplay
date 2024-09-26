const express = require('express');
const shopController = require('../controllers/shopController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add-product', protect, shopController.addProduct);

router.get('/all-products', shopController.getAllProducts);

router.get('/product/:id', shopController.getProduct);

router.post('/rate', protect, shopController.rateSeller);

router.get('/users/:id', protect, shopController.getSellerData);

router.get('/user-products', protect, shopController.getUserProducts);

router.put('/edit-product/:id', protect, shopController.editProduct);

router.put('/add-giveaway/:id', protect, shopController.addToGiveawayProduct);

router.put('/add-selled/:id', protect, shopController.addToSelledProduct);

router.post('/delete-product/:id', protect, shopController.deleteProduct);

router.post('/request-swap', protect, shopController.requestToSwapProduct);

router.put('/respond-swap/:id', protect, shopController.respondToSwapProduct);

router.get('/swap-list', protect, shopController.swapList);

router.post('/products/:productId/giveawayRequest', protect, shopController.requestToGiveawayProduct);

router.post('/giveaway/:productId/select-winner', protect, shopController.selectGiveawayWinner);


module.exports = router;