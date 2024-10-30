import express from "express";
import {
  Order,
  OrderDetailsView,
  OrderStatusHistory,
  OrderStatusHistoryView,
  Package,
} from "../models";
import { isAdmin } from "../middleware";

export const orderRoutes = express.Router();

//get order by tracking number
orderRoutes.get("/trackingNumber/:trackingNumber", async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;
    const order = await OrderDetailsView.findOne({
      where: { trackingNumber },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    const statusHistory = await OrderStatusHistoryView.findAll({
      where: { orderId: order.id },
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({ order, statusHistory });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//get order by id
orderRoutes.get("/id/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const order = await OrderDetailsView.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const statusHistory = await OrderStatusHistoryView.findAll({
      where: { orderId: order.id },
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({ order, statusHistory });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

//get orders by senderId
orderRoutes.get("/sender/:senderId", async (req, res) => {
  try {
    const senderId = parseInt(req.params.senderId, 10);
    const orders = await OrderDetailsView.findAll({ where: { senderId } });

    if (!orders) {
      return res.status(404).json({ error: "Order not found" });
    }

    const ordersWithHistory = await Promise.all(
      orders.map(async (order) => {
        const statusHistory = await OrderStatusHistoryView.findAll({
          where: { orderId: order.id },
          order: [["createdAt", "ASC"]],
        });
        return {
          ...order.toJSON(),
          statusHistory,
        };
      })
    );

    res.status(200).json(ordersWithHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

// Get all orders
orderRoutes.get("/", isAdmin, async (req, res) => {
  try {
    const orders = await OrderDetailsView.findAll();

    const ordersWithHistory = await Promise.all(
      orders.map(async (order) => {
        const statusHistory = await OrderStatusHistoryView.findAll({
          where: { orderId: order.id },
          order: [["createdAt", "ASC"]],
        });
        return {
          ...order.toJSON(),
          statusHistory,
        };
      })
    );
    res.status(200).json(ordersWithHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Update order
//soon

// create order
//not used not needed
// orderRoutes.post("/", async (req, res) => {
//   try {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ error: "Access denied" });

//     const decoded = jwt.verify(token, accessTokenSecret) as JwtPayload;

//     const { userId } = decoded;

//     const {
//       weight,
//       dimension,
//       declaredValue,
//       recipientFirstName,
//       recipientLastName,
//       recipientAddress,
//     } = req.body;

//     if (
//       !weight ||
//       !dimension ||
//       !declaredValue ||
//       !recipientFirstName ||
//       !recipientLastName ||
//       !recipientAddress
//     ) {
//       return res.status(400).json({ error: "Required fields" });
//     }

//     const p = await Package.create({
//       weight,
//       dimension,
//       declaredValue,
//     });

//     const trackingNumber = generateTrackingNumber();

//     await Order.create({
//       packageId: p.id,
//       paymentId: null,
//       senderId: userId,
//       driverId: null,
//       statusId: 1,
//       recipientFirstName,
//       recipientLastName,
//       recipientAddress,
//       trackingNumber,
//     });

//     res.status(200).json({ message: "Order created" });
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// });
