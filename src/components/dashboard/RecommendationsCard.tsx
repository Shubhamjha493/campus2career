import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles, Building2, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const RecommendationsCard = () => {
  const [open, setOpen] = useState(false);

  const recommendations = [
    { 
      id: 1, 
      role: "Backend Developer", 
      company: "Amazon", 
      location: "Bangalore",
      duration: "6 months",
      match: 95,
      skills: ["Python", "Node.js", "AWS"]
    },
    { 
      id: 2, 
      role: "AI Research Intern", 
      company: "Microsoft", 
      location: "Hyderabad",
      duration: "3 months",
      match: 88,
      skills: ["Python", "ML", "TensorFlow"]
    },
    { 
      id: 3, 
      role: "Business Analyst", 
      company: "Deloitte", 
      location: "Mumbai",
      duration: "4 months",
      match: 82,
      skills: ["Excel", "SQL", "Analytics"]
    }
  ];

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20 bg-gradient-to-br from-card via-card to-primary/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Sparkles className="w-5 h-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendations.slice(0, 3).map((rec) => (
            <div key={rec.id} className="p-3 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border border-border hover:border-primary/50 transition-smooth">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{rec.role}</p>
                  <p className="text-xs text-muted-foreground truncate">{rec.company}</p>
                </div>
                <Badge className="bg-gradient-primary text-white text-xs">
                  {rec.match}%
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Personalized Recommendations
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Based on your skills and interests, here are the best internship opportunities for you.
            </p>
            {recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className="p-5 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-smooth"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{rec.role}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{rec.company}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-gradient-primary text-white mb-2">
                      {rec.match}% Match
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {rec.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {rec.duration}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary text-white hover:opacity-90 transition-smooth">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
