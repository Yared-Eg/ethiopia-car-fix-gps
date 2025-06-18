
import { useState } from "react";
import { AlertTriangle, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const EmergencyButton = () => {
  const [isEmergency, setIsEmergency] = useState(false);

  const handleEmergencyCall = () => {
    setIsEmergency(true);
    toast({
      title: "Emergency Service Activated",
      description: "Connecting you to nearest available mechanic...",
    });

    // Simulate emergency response
    setTimeout(() => {
      toast({
        title: "Help is on the way!",
        description: "Alemayehu Auto Service will arrive in 15-20 minutes",
      });
      setIsEmergency(false);
    }, 2000);
  };

  return (
    <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Emergency Assistance</h3>
              <p className="text-red-100 text-xs sm:text-sm">
                Car broken down? Get immediate help from nearby mechanics
              </p>
            </div>
          </div>
          <Button
            onClick={handleEmergencyCall}
            disabled={isEmergency}
            className="bg-white text-red-600 hover:bg-red-50 font-semibold px-4 sm:px-6 w-full sm:w-auto"
            size="lg"
          >
            {isEmergency ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                <span>Calling...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </div>
            )}
          </Button>
        </div>
        
        {isEmergency && (
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-white/10 rounded-lg">
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Sharing your location with emergency responders...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmergencyButton;
