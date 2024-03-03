const express = require("express");
const router = express.Router();
const Orders = require("../models/orders");
const verifyToken = require("../middleware/verifyToken");

router.get("/all", verifyToken, async (req, res) => {
  try {
    const pastOrders = await Orders.find({ userId: req.user }).populate(
      "userId",
      "-password"
    );
    res.status(200).json({
      pastOrders,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

router.get("/orders/:id", verifyToken, async (req, res) => {
 
  try {
    const filterdOrder = await Orders.findById({ _id: req.params.id });
    res.status(200).json(filterdOrder);
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { status } = req.body;

  try {
    const cancelOrder = await Orders.findByIdAndUpdate(
      { _id: req.params.id },
      { status }
    );
    res.status(200).json({ message: "order canceled succcesfully" });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

router.post("/create/order", async (req, res) => {
 
  const {
    order,
    storeLocation,
    storeAddress,
    storeCity,
    storePhoneNumber,
    userAddress,
    finalQuantity,
  } = req.body;
  try {
    const orders = await Orders.create({
      order,
      storeLocation,
      storeAddress,
      storeCity,
      storePhoneNumber,
      userAddress,
      finalQuantity,
      userId: req.user,
    });
    res.status(200).json({message: "order created successfully " });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
