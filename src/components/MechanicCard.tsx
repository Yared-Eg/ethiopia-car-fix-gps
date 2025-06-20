
import { Star, Phone, MapPin, Clock, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Mechanic {
  id: number;
  name: string;
  rating: number;
  distance: number;
  specialization: string;
  location: string;
  phone: string;
  isAvailable: boolean;
  image?: string;
}

interface MechanicCardProps {
  mechanic: Mechanic;
  onSelect: (mechanic: Mechanic) => void;
}

const MechanicCard = ({ mechanic, onSelect }: MechanicCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 w-full">
      <CardHeader className="pb-2 sm:pb-3">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
            <AvatarImage src={mechanic.image} alt={mechanic.name} />
            <AvatarFallback className="bg-blue-600 text-white text-xs sm:text-sm">
              {getInitials(mechanic.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">{mechanic.name}</h3>
            <div className="flex items-center space-x-1 mt-1">
              <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
              <span className="text-xs sm:text-sm font-medium">{mechanic.rating}</span>
              <span className="text-xs sm:text-sm text-gray-500">• {mechanic.distance} km</span>
            </div>
          </div>
          <Badge 
            variant={mechanic.isAvailable ? "default" : "secondary"}
            className={`${mechanic.isAvailable ? "bg-green-600" : ""} text-xs flex-shrink-0`}
          >
            {mechanic.isAvailable ? "Available" : "Busy"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2 sm:space-y-3 pt-0">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
          <Wrench className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="truncate">{mechanic.specialization}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="truncate">{mechanic.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span>Response time: 15-30 min</span>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:flex-1"
            onClick={() => window.open(`tel:${mechanic.phone}`)}
          >
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            Call
          </Button>
          <Button
            size="sm"
            className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700"
            onClick={() => onSelect(mechanic)}
            disabled={!mechanic.isAvailable}
          >
            Book Service
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MechanicCard;
