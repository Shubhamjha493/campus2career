import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building2, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const InternshipApplicationsCard = () => {
  const [open, setOpen] = useState(false);

  const applications = {
    applied: [
      { id: 1, role: "Frontend Developer", company: "Infosys", location: "Bangalore", date: "Sept 25, 2025", status: "Under Review" }
    ],
    shortlisted: [
      { id: 2, role: "Data Analyst", company: "TCS", location: "Hyderabad", date: "Sept 20, 2025", status: "Interview Scheduled" }
    ],
    ongoing: [
      { id: 3, role: "Marketing Intern", company: "Flipkart", location: "Mumbai", date: "Aug 15, 2025", status: "Week 6/12", progress: 50 }
    ],
    completed: [
      { id: 4, role: "Python Intern", company: "Wipro", location: "Pune", date: "June 1 - Aug 15, 2025", status: "Certificate Issued" }
    ]
  };

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-secondary/20 bg-gradient-to-br from-card via-card to-secondary/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-secondary">
            <Briefcase className="w-5 h-5" />
            Internship Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <p className="text-2xl font-bold text-primary">{applications.applied.length}</p>
              <p className="text-xs text-muted-foreground">Applied</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <p className="text-2xl font-bold text-accent">{applications.shortlisted.length}</p>
              <p className="text-xs text-muted-foreground">Shortlisted</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20">
              <p className="text-2xl font-bold text-secondary">{applications.ongoing.length}</p>
              <p className="text-xs text-muted-foreground">Ongoing</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-border">
              <p className="text-2xl font-bold">{applications.completed.length}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl">Internship Applications</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="applied" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="applied">Applied</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applied" className="space-y-3 mt-4">
              {applications.applied.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))}
            </TabsContent>
            
            <TabsContent value="shortlisted" className="space-y-3 mt-4">
              {applications.shortlisted.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))}
            </TabsContent>
            
            <TabsContent value="ongoing" className="space-y-3 mt-4">
              {applications.ongoing.map((app) => (
                <ApplicationCard key={app.id} app={app} showProgress />
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-3 mt-4">
              {applications.completed.map((app) => (
                <ApplicationCard key={app.id} app={app} />
              ))}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ApplicationCard = ({ app, showProgress }: any) => (
  <div className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-smooth">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h4 className="font-semibold text-lg">{app.role}</h4>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
          <Building2 className="w-4 h-4" />
          <span>{app.company}</span>
        </div>
      </div>
      <Badge className="bg-gradient-primary text-white">{app.status}</Badge>
    </div>
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        {app.location}
      </div>
      <div className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        {app.date}
      </div>
    </div>
    {showProgress && app.progress !== undefined && (
      <div className="mt-3">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-smooth" 
            style={{ width: `${app.progress}%` }}
          ></div>
        </div>
      </div>
    )}
  </div>
);
