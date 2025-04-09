
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MentorshipPage from "./pages/mentorship";
import MockInterviewsPage from "./pages/mock-interviews";
import HubsPage from "./pages/hubs";
import EventsPage from "./pages/events";
import ResourcesPage from "./pages/resources";
import AboutPage from "./pages/about";
import BlogPage from "./pages/blog";
import ContactPage from "./pages/contact";
import ForumPage from "./pages/forum";
import ForumPostPage from "./pages/forum/post/[id]";
import ForumCategoryPage from "./pages/forum/category/[id]";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/mock-interviews" element={<MockInterviewsPage />} />
          <Route path="/hubs" element={<HubsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Forum Routes */}
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/post/:id" element={<ForumPostPage />} />
          <Route path="/forum/category/:id" element={<ForumCategoryPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
