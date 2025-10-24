import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 space-y-6">
      <motion.h1
        className="text-2xl font-bold text-red-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Cart
      </motion.h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Total & Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            <h2 className="text-lg font-bold">Total: ₹{total}</h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button
                onClick={() => navigate("/pharmacy/checkout")}
                className="flex items-center"
              >
                Checkout <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
