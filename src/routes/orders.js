const router = require('express').Router();
const mongoose = require('mongoose');

const Order = require('../models/Order');
const isAuthenticated = require('../middleware/authentified');

// @route   POST api/v1/order/request
// @desc    Request new order
// @access  Private
router.post('/request', async (req, res) => {
  const { id: userId } = req.user;

  const {
    description, orderItems, asap, deliveryDate,
    startAddress, deliveryAddress, cost, estimatedTime,
    share, startAddressCoords, deliveryAddressCoords,
  } = req.body;

  try {
    const newOrder = new Order({
      customer: userId,
      description,
      orderItems,
      asap,
      deliveryDate,
      startAddress,
      startAddressCoords: {
        type: 'Point',
        coordinates: [startAddressCoords.lng, startAddressCoords.lat],
      },
      deliveryAddress,
      deliveryAddressCoords: {
        type: 'Point',
        coordinates: [deliveryAddressCoords.lng, deliveryAddressCoords.lat],
      },
      cost,
      estimatedTime,
      acceptShare: share,
    });

    const order = await newOrder.save();
    return res.json({ msg: 'Order Saved successfuly', order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/v1/order/update
// @desc    Request new order
// @access  Private
router.post('/update', isAuthenticated, async (req, res) => {
  const { id: userId } = req.user;

  const { orderId } = req.body;

  try {
    const filter = { _id: orderId };
    const update = { deliveryMan: userId };

    await Order.findOneAndUpdate(filter, update);
    return res.json({ msg: 'Order updated successfuly' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   GET api/v1/order/:id
// @desc    Get order by id
// @access  Private
router.get('/:id', async (req, res) => {
  const orderId = req.params.id;
  // const userId = req.user.id;
  const userId = "5e5cd89935c3bb08b02b4918";
  try {
    const order = await Order.findOne({ _id: orderId, deliveryMan: userId }).populate('customer').populate('deliveryMan');
    if (!order || order.length === 0) return res.status(404).json({ msg: 'Order id not valid' });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
