import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Video from "./pages/Video";
import Services from "./pages/Services";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video" element={<Video />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;