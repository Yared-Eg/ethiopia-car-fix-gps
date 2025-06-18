
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const addMechanicMarkers = (map: L.Map) => {
    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    // Mock coordinates for mechanics in Addis Ababa
    const mechanicLocations = [
      { lat: 9.0320, lng: 38.7469, mechanic: mechanics[0] }, // Bole area
      { lat: 9.0301, lng: 38.7535, mechanic: mechanics[1] }, // Piazza area
      { lat: 9.0157, lng: 38.7634, mechanic: mechanics[2] }, // Kazanchis area
    ];

    mechanicLocations.forEach(({ lat, lng, mechanic }) => {
      if (mechanic) {
        const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`
            <div class="p-2 text-sm">
              <h3 class="font-semibold">${mechanic.name}</h3>
              <p class="text-xs text-gray-600">${mechanic.specialization}</p>
              <p class="text-xs">⭐ ${mechanic.rating} • ${mechanic.distance}km away</p>
              <p class="text-xs ${mechanic.isAvailable ? 'text-green-600' : 'text-red-600'}">
                ${mechanic.isAvailable ? '✅ Available' : '❌ Unavailable'}
              </p>
              <p class="text-xs mt-1">${mechanic.phone}</p>
            </div>
          `);
        
        markersRef.current.push(marker);
      }
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 15);
            
            // Add user location marker
            L.marker([latitude, longitude])
              .addTo(mapRef.current)
              .bindPopup('📍 Your Location')
              .openPopup();
          }
          
          toast({
            title: "Location found",
            description: "Map centered on your location",
          });
        },
        () => {
          toast({
            title: "Location error",
            description: "Unable to get your location. Showing Addis Ababa.",
            variant: "destructive"
          });
        }
      );
    }
  };

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map centered on Addis Ababa
    const map = L.map(mapContainer.current).setView([9.0320, 38.7469], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    // Add mechanic markers
    addMechanicMarkers(map);

    // Get user location on load
    getCurrentLocation();

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update markers when mechanics data changes
  useEffect(() => {
    if (mapRef.current) {
      addMechanicMarkers(mapRef.current);
    }
  }, [mechanics]);

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Location Button */}
      <Button
        onClick={getCurrentLocation}
        size="icon"
        className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white text-gray-800 hover:bg-gray-50 shadow-lg z-[1000] h-9 w-9 sm:h-10 sm:w-10"
      >
        <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  );
};

export default Map;
