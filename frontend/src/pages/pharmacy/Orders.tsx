import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiCheckCircle, FiTruck } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import api from "@/services/api";

interface OrderItem {
  medicineName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  deliveryType: "NORMAL" | "EXPRESS";
  status: "PENDING" | "OUT_FOR_DELIVERY" | "DELIVERED";
  totalPrice: number;
  items: OrderItem[];
  createdAt: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // TODO: replace with actual logged-in userId
      const res = await api.get("/orders/user/1");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "PENDING":
        return <FiClock className="text-yellow-500" />;
      case "OUT_FOR_DELIVERY":
        return <FiTruck className="text-blue-500" />;
      case "DELIVERED":
        return <FiCheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        className="text-2xl font-bold text-red-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Orders
      </motion.h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 space-y-2">
                {/* Order Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-semibold">Order #{order.id}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-1 text-sm text-gray-700">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {item.medicineName} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-sm">
                    Delivery:{" "}
                    <span className="font-semibold">{order.deliveryType}</span>
                  </span>
                  <span className="font-bold">₹{order.totalPrice}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
