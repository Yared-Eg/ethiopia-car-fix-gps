
import { useState } from "react";
import Header from "@/components/Header";
import Map from "@/components/Map";
import MechanicCard from "@/components/MechanicCard";
import ServiceRequest from "@/components/ServiceRequest";
import EmergencyButton from "@/components/EmergencyButton";
import ServiceHistory from "@/components/ServiceHistory";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for mechanics
const nearbyMechanics = [
  {
    id: 1,
    name: "Alemayehu Auto Service",
    rating: 4.8,
    distance: 0.5,
    specialization: "Engine Repair",
    location: "Bole, Addis Ababa",
    phone: "+251911123456",
    isAvailable: true,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Tekle Motors",
    rating: 4.6,
    distance: 1.2,
    specialization: "Brake & Suspension",
    location: "Piazza, Addis Ababa",
    phone: "+251922234567",
    isAvailable: true,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Haile Car Care",
    rating: 4.9,
    distance: 2.1,
    specialization: "Electrical Systems",
    location: "Kazanchis, Addis Ababa",
    phone: "+251933345678",
    isAvailable: false,
    image: "/placeholder.svg"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("map");
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Header />
      
      <main className="px-3 py-4 sm:px-4 sm:py-6 max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            🚗 CarFix Ethiopia
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Find trusted mechanics near you • Get instant car repair assistance
          </p>
        </div>

        <EmergencyButton />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6 h-9 sm:h-10">
            <TabsTrigger value="map" className="text-xs sm:text-sm">Map</TabsTrigger>
            <TabsTrigger value="mechanics" className="text-xs sm:text-sm">Mechanics</TabsTrigger>
            <TabsTrigger value="request" className="text-xs sm:text-sm">Request</TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">History</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-4 mt-0">
            <Card className="p-0 overflow-hidden">
              <Map mechanics={nearbyMechanics} />
            </Card>
          </TabsContent>

          <TabsContent value="mechanics" className="space-y-4 mt-0">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyMechanics.map((mechanic) => (
                <MechanicCard
                  key={mechanic.id}
                  mechanic={mechanic}
                  onSelect={setSelectedMechanic}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="request" className="space-y-4 mt-0">
            <ServiceRequest selectedMechanic={selectedMechanic} />
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-0">
            <ServiceHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
