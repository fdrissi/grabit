const router = require('express').Router();

const Order = require('../models/orderModel');

router.post('/order', async (req, res) => {
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
