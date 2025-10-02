import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Building2, Calendar, MapPin, GraduationCap, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const InternshipApplicationsCard = () => {
  const [open, setOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [stipendFilter, setStipendFilter] = useState("all");
  const [appliedApplications, setAppliedApplications] = useState([
    { id: 1, role: "Frontend Developer", company: "Infosys", location: "Bangalore", date: "Sept 25, 2025", status: "Under Review" }
  ]);
  const [availableInternships, setAvailableInternships] = useState([
    { id: 5, role: "Backend Developer", company: "Amazon", location: "Bangalore", duration: "6 months", stipend: "₹50,000/mo", isCollegeSpecific: false },
    { id: 6, role: "Data Analyst", company: "TCS", location: "Your College", duration: "3 months", stipend: "₹25,000/mo", isCollegeSpecific: true },
    { id: 7, role: "Frontend Developer", company: "Infosys", location: "Hyderabad", duration: "4 months", stipend: "₹30,000/mo", isCollegeSpecific: false },
    { id: 8, role: "AI Intern", company: "Microsoft", location: "Pune", duration: "6 months", stipend: "₹60,000/mo", isCollegeSpecific: false }
  ]);

  // Load applications from localStorage when dialog opens
  useEffect(() => {
    if (open) {
      const savedApps = JSON.parse(localStorage.getItem("applied_internships") || "[]");
      if (savedApps.length > 0) {
        // Merge with existing applications, avoiding duplicates
        const existingIds = appliedApplications.map(app => app.id);
        const newApps = savedApps.filter((app: any) => !existingIds.includes(app.id));
        if (newApps.length > 0) {
          setAppliedApplications([...appliedApplications, ...newApps]);
        }
      }
    }
  }, [open]);

  const applications = {
    applied: appliedApplications,
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

  const handleApply = (internship: any) => {
    // Get student profile data from localStorage
    const profileData = {
      name: "Sneha Kumari",
      college: "BIT Sindri",
      semester: "5th",
      email: "student1@campus.com",
      phone: "+91 98765 43210",
      cgpa: "8.5",
      skills: JSON.parse(localStorage.getItem("student_skills") || '["C++", "Python", "Web Dev"]')
    };

    // Create new application with current date
    const newApplication = {
      id: internship.id,
      role: internship.role,
      company: internship.company,
      location: internship.location,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Application Submitted"
    };

    // Add to applied applications
    setAppliedApplications(prev => [...prev, newApplication]);
    
    // Remove from available internships
    setAvailableInternships(prev => prev.filter(item => item.id !== internship.id));
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
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl">Internship Applications</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="applied" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="applied">Applied</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
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

            <TabsContent value="available" className="space-y-4 mt-4">
              <div className="p-4 rounded-xl bg-muted/30 border border-border animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold">Filters</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={companyFilter} onValueChange={setCompanyFilter}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Companies</SelectItem>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="tcs">TCS</SelectItem>
                      <SelectItem value="infosys">Infosys</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={durationFilter} onValueChange={setDurationFilter}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="4">4 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={stipendFilter} onValueChange={setStipendFilter}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Stipend" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Stipends</SelectItem>
                      <SelectItem value="low">Under ₹30k</SelectItem>
                      <SelectItem value="medium">₹30k - ₹50k</SelectItem>
                      <SelectItem value="high">Above ₹50k</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 animate-fade-in">
                {availableInternships.map((internship) => (
                  <InternshipCard key={internship.id} internship={internship} onApply={handleApply} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ApplicationCard = ({ app, showProgress }: any) => (
  <div className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-smooth hover:scale-[1.02] duration-300">
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

const InternshipCard = ({ internship, onApply }: any) => {
  const { toast } = useToast();
  
  const handleApplyClick = () => {
    onApply(internship);
    toast({
      title: "Application Submitted!",
      description: `Your application for ${internship.role} at ${internship.company} has been submitted successfully.`,
    });
  };

  return (
    <div className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-smooth hover:scale-[1.01] duration-300 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-lg">{internship.role}</h4>
            {internship.isCollegeSpecific && (
              <Badge className="bg-accent text-accent-foreground text-xs flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                Your College
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Building2 className="w-4 h-4" />
            <span>{internship.company}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className="bg-primary text-primary-foreground">{internship.stipend}</Badge>
          <Button 
            size="sm" 
            onClick={handleApplyClick}
            className="animate-fade-in hover:scale-105 transition-transform duration-200"
          >
            Apply Now
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {internship.location}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {internship.duration}
        </div>
      </div>
    </div>
  );
};
