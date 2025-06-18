
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Clock, Phone, Star, CheckCircle, AlertCircle, Package } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Order {
  id: string;
  service_type: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  mechanic_name: string;
  mechanic_phone: string;
  mechanic_location: string;
  estimated_arrival?: string;
  estimated_completion?: string;
  total_cost?: number;
  created_at: string;
  updated_at: string;
  car_make?: string;
  car_model?: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
}

const OrderTracking = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - In real implementation, this would come from Supabase
  const mockOrders: Order[] = [
    {
      id: "ORD-2024-001",
      service_type: "Engine Problems",
      status: "in_progress",
      mechanic_name: "Alemayehu Auto Service",
      mechanic_phone: "+251911123456",
      mechanic_location: "Bole, Addis Ababa",
      estimated_arrival: "2024-06-18T10:30:00Z",
      estimated_completion: "2024-06-18T12:00:00Z",
      total_cost: 1500,
      created_at: "2024-06-18T09:00:00Z",
      updated_at: "2024-06-18T09:45:00Z",
      car_make: "Toyota",
      car_model: "Corolla",
      description: "Engine making strange noises, loss of power",
      urgency: "high"
    },
    {
      id: "ORD-2024-002",
      service_type: "Brake Issues",
      status: "completed",
      mechanic_name: "Tekle Motors",
      mechanic_phone: "+251922234567",
      mechanic_location: "Piazza, Addis Ababa",
      estimated_completion: "2024-06-17T15:00:00Z",
      total_cost: 800,
      created_at: "2024-06-17T11:00:00Z",
      updated_at: "2024-06-17T15:30:00Z",
      car_make: "Hyundai",
      car_model: "Elantra",
      description: "Brake pedal feels soft, grinding noise",
      urgency: "medium"
    }
  ];

  useEffect(() => {
    // Simulate loading from Supabase
    setTimeout(() => {
      setOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-600", icon: Clock, text: "Pending" },
      accepted: { color: "bg-blue-600", icon: CheckCircle, text: "Accepted" },
      in_progress: { color: "bg-orange-600", icon: Package, text: "In Progress" },
      completed: { color: "bg-green-600", icon: CheckCircle, text: "Completed" },
      cancelled: { color: "bg-red-600", icon: AlertCircle, text: "Cancelled" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800"
    };

    return (
      <Badge variant="outline" className={urgencyConfig[urgency as keyof typeof urgencyConfig]}>
        {urgency.toUpperCase()}
      </Badge>
    );
  };

  const searchOrder = () => {
    if (!searchOrderId) {
      toast({
        title: "Enter Order ID",
        description: "Please enter an order ID to search",
        variant: "destructive"
      });
      return;
    }

    const found = orders.find(order => order.id.toLowerCase().includes(searchOrderId.toLowerCase()));
    if (found) {
      toast({
        title: "Order Found",
        description: `Order ${found.id} - ${found.status}`
      });
    } else {
      toast({
        title: "Order Not Found",
        description: "No order found with that ID",
        variant: "destructive"
      });
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getEstimatedTime = (dateString?: string) => {
    if (!dateString) return "TBD";
    const now = new Date();
    const estimated = new Date(dateString);
    const diffMinutes = Math.round((estimated.getTime() - now.getTime()) / (1000 * 60));
    
    if (diffMinutes <= 0) return "Now";
    if (diffMinutes < 60) return `${diffMinutes} min`;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Track Your Orders</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Enter Order ID..."
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            className="w-48"
          />
          <Button onClick={searchOrder} variant="outline">
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Order #{order.id}
                    {getStatusBadge(order.status)}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{order.service_type}</p>
                </div>
                {getUrgencyBadge(order.urgency)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Vehicle Details</h4>
                  <p className="text-sm">{order.car_make} {order.car_model}</p>
                  <p className="text-xs text-gray-600 mt-1">{order.description}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Mechanic</h4>
                  <p className="text-sm font-medium">{order.mechanic_name}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{order.mechanic_location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Phone className="h-3 w-3" />
                    <span>{order.mechanic_phone}</span>
                  </div>
                </div>
              </div>

              {order.status === "in_progress" && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-sm text-blue-900 mb-2">Live Tracking</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Estimated Arrival:</span>
                      <span className="font-medium text-blue-900">
                        {getEstimatedTime(order.estimated_arrival)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-700">Estimated Completion:</span>
                      <span className="font-medium text-blue-900">
                        {getEstimatedTime(order.estimated_completion)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t">
                <div className="text-xs text-gray-600">
                  <span>Created: {formatTime(order.created_at)}</span>
                  <span className="mx-2">•</span>
                  <span>Updated: {formatTime(order.updated_at)}</span>
                </div>
                {order.total_cost && (
                  <div className="font-semibold text-green-600">
                    {order.total_cost} ETB
                  </div>
                )}
              </div>

              {order.status === "in_progress" && (
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Mechanic
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    View Location
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-600">You haven't placed any service requests yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderTracking;
