const router = require('express').Router();

const Order = require('../models/Order');

// @route   POST api/v1/order/request
// @desc    Request new order
// @access  Private
router.post('/request', async (req, res) => {
  const { id: userId } = req.user;
  const {
    deliveryMan, description, orderItems, asap, deliveryDate, startAddress, deliveryAddress, cost,
  } = req.body;
  try {
    const newOrder = new Order({
      customer: userId,
      deliveryMan,
      description,
      orderItems,
      asap,
      deliveryDate,
      startAddress,
      deliveryAddress,
      cost,
    });
    const order = await newOrder.save();
    return res.json({ msg: 'Order Saved successfuly', order });
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/v1/order/:id
// @desc    Get order by id
// @access  Private
router.get('/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId).populate('customer').populate('deliveryMan');
    if (!order) return res.status(404).json({ msg: 'Order id not valid' });
    return res.json({ order });
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
