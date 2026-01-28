import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Handshake } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PartnerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PartnerDialog = ({ open, onOpenChange }: PartnerDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    partnershipType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.organization.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission (replace with actual backend call later)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Partnership Request Sent!",
      description: "Thank you for your interest in partnering with us. We'll review your submission and get back to you soon.",
    });
    
    setFormData({ 
      name: "", 
      email: "", 
      phone: "", 
      organization: "", 
      role: "", 
      partnershipType: "", 
      message: "" 
    });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
              <Handshake className="w-5 h-5 text-accent" />
            </div>
            <DialogTitle className="text-xl font-bold">Partner With Us</DialogTitle>
          </div>
          <DialogDescription>
            Join us in building climate resilience. Fill out the form below and tell us how you'd like to collaborate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partner-name">Full Name *</Label>
              <Input
                id="partner-name"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partner-email">Email *</Label>
              <Input
                id="partner-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                maxLength={255}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partner-phone">Phone (Optional)</Label>
              <Input
                id="partner-phone"
                type="tel"
                placeholder="+254 XXX XXX XXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partner-org">Organization *</Label>
              <Input
                id="partner-org"
                placeholder="Your organization name"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                maxLength={150}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="partner-role">Your Role (Optional)</Label>
              <Input
                id="partner-role"
                placeholder="e.g., Program Director"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="partner-type">Partnership Type (Optional)</Label>
              <Input
                id="partner-type"
                placeholder="e.g., Funding, Training, Research"
                value={formData.partnershipType}
                onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })}
                maxLength={100}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="partner-message">Tell Us About Your Partnership Idea *</Label>
            <Textarea
              id="partner-message"
              placeholder="Please describe your organization, your goals, and how you'd like to partner with The SPAC Network. Feel free to share as much detail as you'd like..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              maxLength={3000}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {formData.message.length}/3000 characters
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="hero"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PartnerDialog;
