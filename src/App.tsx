import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Academy from "./pages/Academy";
import CourseDetail from "./pages/CourseDetail";
import LessonViewer from "./pages/LessonViewer";
import TeamPage from "./pages/TeamPage";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import TextToSpeech from "./components/TextToSpeech";
import ClimateAssistant from "./components/ClimateAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/academy/course/:slug" element={<CourseDetail />} />
          <Route path="/academy/lesson/:lessonId" element={<LessonViewer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <TextToSpeech />
        <ClimateAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
