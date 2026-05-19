import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/Header";
import { loadGoogleMapsScript } from "@/lib/googleMaps";
import Home from "@/pages/Home";
import Restaurants from "@/pages/Restaurants";
import RestaurantDetail from "@/pages/RestaurantDetail";
import Facilities from "@/pages/Facilities";
import FacilityDetail from "@/pages/FacilityDetail";
import Favorites from "@/pages/Favorites";
import InquiryBoard from "@/pages/InquiryBoard";
import LearningCenter from "@/pages/LearningCenter";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/restaurants" component={Restaurants} />
      <Route path="/restaurant/:id" component={RestaurantDetail} />
      <Route path="/facilities" component={Facilities} />
      <Route path="/facility/:id" component={FacilityDetail} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/inquiries" component={InquiryBoard} />
      <Route path="/learning" component={LearningCenter} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppLayout() {
  useEffect(() => {
    loadGoogleMapsScript().catch(error => {
      console.error('Error loading Google Maps:', error);
    });
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Router />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AppLayout />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
