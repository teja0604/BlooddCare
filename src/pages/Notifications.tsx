// src/pages/Notifications.tsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiCheck, FiTrash2, FiFilter } from 'react-icons/fi';
import { fetchAllNotifications, markRead, markAllRead } from '../services/notifications';
import type { Notification } from '../services/notifications';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Notifications = () => {
  const [items, setItems] = useState<Notification[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await fetchAllNotifications();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = async (id: number) => {
    await markRead(id);
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = async () => {
    await markAllRead();
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationTypeColor = (type: string = 'info') => {
    switch (type) {
      case 'urgent': return 'border-destructive bg-destructive/10';
      case 'success': return 'border-success bg-success/10';
      case 'warning': return 'border-warning bg-warning/10';
      default: return 'border-medical-blue bg-medical-blue/10';
    }
  };

  const getNotificationIcon = (type: string = 'info') => {
    switch (type) {
      case 'urgent': return 'bg-destructive';
      case 'success': return 'bg-success';
      case 'warning': return 'bg-warning';
      default: return 'bg-medical-blue';
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'unread') return !item.read;
    if (filter === 'read') return item.read;
    if (filter !== 'all') return item.type === filter;
    return true;
  });

  const unreadCount = items.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <FiBell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
                <p className="text-muted-foreground">Stay updated with important alerts and messages</p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <Badge className="bg-primary text-primary-foreground">
                {unreadCount} unread
              </Badge>
            )}
          </div>

          {/* Filter and Actions */}
          <Card className="card-medical">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48">
                    <FiFilter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter notifications" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="unread">Unread Only</SelectItem>
                    <SelectItem value="read">Read Only</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Information</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="text-sm text-muted-foreground">
                  {filteredItems.length} of {items.length} notifications
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={loadNotifications}
                  disabled={loading}
                >
                  {loading ? 'Refreshing...' : 'Refresh'}
                </Button>
                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleMarkAllRead}
                  >
                    <FiCheck className="w-4 h-4 mr-2" />
                    Mark All Read
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <Card className="card-medical text-center py-12">
                <FiBell className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No notifications found</h3>
                <p className="text-muted-foreground">
                  {filter === 'all' 
                    ? "You're all caught up! No notifications to display."
                    : `No ${filter} notifications found. Try adjusting your filter.`
                  }
                </p>
              </Card>
            ) : (
              filteredItems.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`card-medical border-l-4 ${getNotificationTypeColor(notification.type)} ${
                    !notification.read ? 'shadow-medical' : 'opacity-75'
                  }`}>
                    <div className="flex items-start space-x-4">
                      {/* Notification Icon */}
                      <div className={`w-3 h-3 rounded-full ${getNotificationIcon(notification.type)} flex-shrink-0 mt-2`} />
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <p className={`text-sm ${
                            notification.read 
                              ? "text-muted-foreground" 
                              : "font-semibold text-foreground"
                          }`}>
                            {notification.message}
                          </p>
                          
                          {notification.type && (
                            <Badge 
                              variant="outline" 
                              className={`ml-4 text-xs ${
                                notification.type === 'urgent' ? 'border-destructive text-destructive' :
                                notification.type === 'success' ? 'border-success text-success' :
                                notification.type === 'warning' ? 'border-warning text-warning' :
                                'border-medical-blue text-medical-blue'
                              }`}
                            >
                              {notification.type}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                          
                          <div className="flex space-x-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkRead(notification.id)}
                                className="h-8 px-3 text-xs text-primary hover:text-primary-dark"
                              >
                                <FiCheck className="w-3 h-3 mr-1" />
                                Mark read
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-3 text-xs text-muted-foreground hover:text-destructive"
                            >
                              <FiTrash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;