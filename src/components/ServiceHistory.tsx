
import { Calendar, CheckCircle, Clock, Star, Receipt } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ServiceHistory = () => {
  const serviceHistory = [
    {
      id: 1,
      date: "2024-06-15",
      mechanic: "Alemayehu Auto Service",
      service: "Engine Oil Change",
      status: "completed",
      cost: "800 ETB",
      rating: 5,
      location: "Bole, Addis Ababa"
    },
    {
      id: 2,
      date: "2024-06-10",
      mechanic: "Tekle Motors",
      service: "Brake Pad Replacement",
      status: "completed",
      cost: "1,200 ETB",
      rating: 4,
      location: "Piazza, Addis Ababa"
    },
    {
      id: 3,
      date: "2024-06-08",
      mechanic: "Haile Car Care",
      service: "Battery Replacement",
      status: "in_progress",
      cost: "1,500 ETB",
      rating: null,
      location: "Kazanchis, Addis Ababa"
    },
    {
      id: 4,
      date: "2024-05-28",
      mechanic: "Alemayehu Auto Service",
      service: "Tire Rotation & Balancing",
      status: "completed",
      cost: "600 ETB",
      rating: 5,
      location: "Bole, Addis Ababa"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case "cancelled":
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Service History</h2>
        <Button variant="outline" size="sm">
          <Receipt className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      <div className="grid gap-4">
        {serviceHistory.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.service}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{service.mechanic}</p>
                </div>
                {getStatusBadge(service.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(service.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{service.location}</span>
                  </div>
                </div>
                <div className="font-semibold text-green-600">{service.cost}</div>
              </div>

              {service.rating && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Your rating:</span>
                  <div className="flex space-x-1">
                    {renderStars(service.rating)}
                  </div>
                </div>
              )}

              {service.status === "completed" && (
                <div className="flex items-center space-x-2 pt-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">Service completed successfully</span>
                </div>
              )}

              {service.status === "in_progress" && (
                <div className="flex items-center space-x-2 pt-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">Work in progress - estimated completion today</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-50">
        <CardContent className="pt-6 text-center">
          <div className="text-gray-600">
            <h3 className="font-semibold mb-2">Total Services: {serviceHistory.length}</h3>
            <p className="text-sm">
              You've saved money and kept your car in great condition with CarFix Ethiopia!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceHistory;
