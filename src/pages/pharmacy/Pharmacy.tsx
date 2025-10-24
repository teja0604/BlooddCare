import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiPlus } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { useCart } from "@/context/CartContext";

interface Medicine {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export default function Pharmacy() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [search, setSearch] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const res = await api.get("/pharmacy/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.error("Error fetching medicines", err);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      fetchMedicines();
      return;
    }
    try {
      const res = await api.get(`/pharmacy/search?name=${search}`);
      setMedicines(res.data);
    } catch (err) {
      console.error("Error searching medicines", err);
    }
  };


  return (
    <div className="p-6 space-y-6">
      <motion.h1
        className="text-2xl font-bold text-red-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Pharmacy
      </motion.h1>

      {/* Search Bar */}
      <div className="flex gap-2">
        <Input
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>
          <FiSearch className="mr-2" /> Search
        </Button>
      </div>

      {/* Medicine Grid or Empty State */}
      {medicines.length === 0 ? (
        <motion.p
          className="text-gray-500 text-center mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No medicines found.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicines.map((med) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 space-y-2">
                {med.imageUrl && (
                  <img
                    src={med.imageUrl}
                    alt={med.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                <h2 className="text-lg font-semibold">{med.name}</h2>
                <p className="text-sm text-gray-600">{med.description}</p>
                <p className="font-bold">₹{med.price}</p>
                <Button
                  className="w-full mt-2"
                  onClick={() => addToCart(med)}
                  disabled={med.stock <= 0}
                >
                  <FiPlus className="mr-2" /> Add to Cart
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
