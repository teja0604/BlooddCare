// src/components/NotificationBell.tsx
import { FiBell, FiRefreshCw, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import {
  fetchAllNotifications,
  markRead,
  markAllRead,
  Notification,
} from "../services/notifications";

const NotificationBell = () => {
  const { token } = useAuth(); // ✅ token exists now
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const unreadCount = items.filter((n) => !n.read).length;

  const load = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchAllNotifications(token);
      setItems(Array.isArray(data) ? data : data.notifications ?? []);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [token]);

  const onMarkRead = async (id: number) => {
    if (!token) return;
    await markRead(id, token);
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const onMarkAllRead = async () => {
    if (!token) return;
    try {
      await markAllRead(token);
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all read", err);
    }
  };

  const getNotificationIcon = (type: string = "info") => {
    const iconClass = "w-3 h-3";
    switch (type) {
      case "urgent":
        return <div className={`${iconClass} bg-destructive rounded-full`} />;
      case "success":
        return <div className={`${iconClass} bg-success rounded-full`} />;
      case "warning":
        return <div className={`${iconClass} bg-warning rounded-full`} />;
      default:
        return <div className={`${iconClass} bg-medical-blue rounded-full`} />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative p-2 hover:bg-secondary"
        onClick={() => setOpen((v) => !v)}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <FiBell className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="notification-badge"
            >
              {unreadCount}
            </motion.span>
          )}
        </motion.div>
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-96 bg-card border border-border shadow-medical rounded-2xl p-4 z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-foreground">
                Notifications
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={load}
                  disabled={loading}
                  className="h-8 w-8 p-0"
                >
                  <FiRefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onMarkAllRead}
                    className="h-8 px-2 text-xs"
                  >
                    <FiCheck className="w-3 h-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FiBell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                items.map((n) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-3 border border-border rounded-xl hover:bg-secondary/50 transition-all duration-200 cursor-pointer ${
                      !n.read ? "bg-primary/5 border-primary/20" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(n.type)}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm ${
                            n.read
                              ? "text-muted-foreground"
                              : "font-semibold text-foreground"
                          }`}
                        >
                          {n.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-muted-foreground">
                            {new Date(n.createdAt).toLocaleString()}
                          </p>
                          {!n.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onMarkRead(n.id)}
                              className="h-6 px-2 text-xs text-primary hover:text-primary-dark"
                            >
                              Mark read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
