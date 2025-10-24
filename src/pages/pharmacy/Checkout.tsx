import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import api from "@/services/api";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState<"NORMAL" | "EXPRESS">("NORMAL");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setLoading(true);
    try {
      const payload = {
        userId: 1, // TODO: replace with actual logged-in userId
        deliveryType,
        items: cart.map((item) => ({
          medicineId: item.id,
          quantity: item.quantity,
        })),
      };

      await api.post("/orders", payload);
      clearCart();
      navigate("/pharmacy/orders");
    } catch (err) {
      console.error("Order failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        className="text-2xl font-bold text-red-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Checkout
      </motion.h1>

      {/* Cart Summary */}
      <Card className="p-4 space-y-2">
        <h2 className="font-semibold">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </Card>

      {/* Delivery Options */}
      <Card className="p-4 space-y-2">
        <h2 className="font-semibold">Delivery Type</h2>
        <div className="flex gap-4">
          <Button
            variant={deliveryType === "NORMAL" ? "default" : "outline"}
            onClick={() => setDeliveryType("NORMAL")}
          >
            Normal Delivery
          </Button>
          <Button
            variant={deliveryType === "EXPRESS" ? "default" : "outline"}
            onClick={() => setDeliveryType("EXPRESS")}
          >
            Express Delivery
          </Button>
        </div>
      </Card>

      {/* Checkout Button */}
      <Button
        className="w-full flex items-center justify-center"
        onClick={handleCheckout}
        disabled={loading || cart.length === 0}
      >
        <FiCheckCircle className="mr-2" />
        {loading ? "Placing Order..." : "Confirm Order"}
      </Button>
    </div>
  );
}
