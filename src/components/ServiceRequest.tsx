
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Car, Clock, AlertTriangle } from "lucide-react";
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

interface ServiceRequestProps {
  selectedMechanic: Mechanic | null;
}

const ServiceRequest = ({ selectedMechanic }: ServiceRequestProps) => {
  const [formData, setFormData] = useState({
    carMake: '',
    carModel: '',
    carYear: '',
    serviceType: '',
    urgency: '',
    description: '',
    location: ''
  });

  const serviceTypes = [
    "Engine Problems",
    "Brake Issues",
    "Tire Replacement",
    "Battery Problems",
    "Electrical Issues",
    "Transmission Problems",
    "Oil Change",
    "General Inspection",
    "Accident Damage",
    "Overheating"
  ];

  const urgencyLevels = [
    { value: "low", label: "Low - Can wait", color: "bg-green-600" },
    { value: "medium", label: "Medium - Today", color: "bg-yellow-600" },
    { value: "high", label: "High - ASAP", color: "bg-red-600" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serviceType || !formData.urgency || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Service Request Submitted",
      description: selectedMechanic 
        ? `Your request has been sent to ${selectedMechanic.name}`
        : "Looking for available mechanics in your area",
    });

    // Reset form
    setFormData({
      carMake: '',
      carModel: '',
      carYear: '',
      serviceType: '',
      urgency: '',
      description: '',
      location: ''
    });
  };

  return (
    <div className="space-y-6">
      {selectedMechanic && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Selected Mechanic</h3>
                <p className="text-blue-700">{selectedMechanic.name}</p>
                <p className="text-sm text-blue-600">{selectedMechanic.location}</p>
              </div>
              <Badge className="bg-blue-600">
                {selectedMechanic.distance} km away
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5" />
            <span>Request Car Service</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="carMake">Car Make</Label>
                <Input
                  id="carMake"
                  placeholder="e.g., Toyota, Hyundai"
                  value={formData.carMake}
                  onChange={(e) => setFormData(prev => ({...prev, carMake: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="carModel">Model</Label>
                <Input
                  id="carModel"
                  placeholder="e.g., Corolla, Elantra"
                  value={formData.carModel}
                  onChange={(e) => setFormData(prev => ({...prev, carModel: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="carYear">Year</Label>
                <Input
                  id="carYear"
                  placeholder="e.g., 2018"
                  value={formData.carYear}
                  onChange={(e) => setFormData(prev => ({...prev, carYear: e.target.value}))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({...prev, serviceType: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="What do you need help with?" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgency">Urgency Level *</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({...prev, urgency: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="How urgent is this?" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                        <span>{level.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Your Location</Label>
              <Input
                id="location"
                placeholder="e.g., Bole, near Edna Mall"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
              />
            </div>

            <div>
              <Label htmlFor="description">Problem Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the problem in detail. What symptoms are you experiencing?"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Emergency Assistance</p>
                <p>For immediate roadside assistance, use the emergency button above.</p>
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
              <Clock className="h-4 w-4 mr-2" />
              Submit Service Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequest;
