
import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Mechanic {
  id: number;
  name: string;
  rating: number;
  distance: number;
  specialization: string;
  location: string;
  phone: string;
  isAvailable: boolean;
}

interface MapProps {
  mechanics: Mechanic[];
}

const Map: React.FC<MapProps> = ({ mechanics }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location found",
            description: "Your current location has been detected",
          });
        },
        () => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Please enable GPS.",
            variant: "destructive"
          });
        }
      );
    }
  };

  const initializeMap = () => {
    if (!mapboxToken.trim()) {
      toast({
        title: "Mapbox Token Required",
        description: "Please enter your Mapbox public token to view the map",
        variant: "destructive"
      });
      return;
    }

    // Here we would initialize the actual Mapbox map
    // For now, we'll show a placeholder with mechanic locations
    toast({
      title: "Map Loading",
      description: "Map is being initialized with nearby mechanics",
    });
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      {/* Mapbox Token Input */}
      {!mapboxToken && (
        <div className="absolute inset-0 bg-white/95 z-10 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-lg font-semibold mb-2">Map Setup Required</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Enter your Mapbox public token to view mechanics on the map. 
              Get your token from https://mapbox.com/
            </p>
            <div className="space-y-3">
              <Input
                placeholder="Enter Mapbox public token (pk.eyJ1...)"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="w-full"
              />
              <Button onClick={initializeMap} className="w-full">
                Load Map
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Map Placeholder */}
      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="h-16 w-16 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Finding Mechanics Near You
            </h3>
            <p className="text-gray-600">
              {userLocation ? 
                `Located at ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` :
                "Detecting your location..."
              }
            </p>
          </div>
        </div>

        {/* Mock mechanic markers */}
        <div className="absolute top-4 left-4 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold">
          1
        </div>
        <div className="absolute top-12 right-8 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold">
          2
        </div>
        <div className="absolute bottom-8 left-1/3 bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold">
          3
        </div>
      </div>

      {/* Location Button */}
      <Button
        onClick={getCurrentLocation}
        size="icon"
        className="absolute bottom-4 right-4 bg-white text-gray-800 hover:bg-gray-50 shadow-lg"
      >
        <Navigation className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Map;
