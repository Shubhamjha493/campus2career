import { useState } from "react";
import { Briefcase, MapPin, Calendar, DollarSign, Users, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InternshipListingsCard = () => {
  const activeInternships = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Infosys",
      applications: 45,
      mode: "Remote",
      duration: "3 months",
      stipend: "₹15,000/month",
      postedDate: "2 days ago",
      status: "active",
      type: "universal",
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "TCS",
      applications: 30,
      mode: "Onsite",
      duration: "6 months",
      stipend: "₹20,000/month",
      postedDate: "5 days ago",
      status: "active",
      type: "college-specific",
      college: "Your College",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Infosys",
      applications: 28,
      mode: "Hybrid",
      duration: "4 months",
      stipend: "₹18,000/month",
      postedDate: "1 week ago",
      status: "active",
      type: "universal",
    },
  ];

  const closedInternships = [
    {
      id: 4,
      title: "Backend Developer",
      company: "Infosys",
      applications: 67,
      mode: "Remote",
      duration: "3 months",
      stipend: "₹22,000/month",
      closedDate: "2 weeks ago",
      status: "closed",
      hired: 3,
    },
  ];

  return (
    <Card className="hover:scale-[1.02] hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          My Internship Listings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active ({activeInternships.length})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({closedInternships.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-4">
            {activeInternships.map((internship) => (
              <div
                key={internship.id}
                className="p-4 rounded-lg border-2 hover:border-primary hover:shadow-md transition-all duration-300 bg-card"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{internship.title}</h3>
                    <p className="text-sm text-muted-foreground">{internship.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-primary font-semibold">
                      <Users className="h-4 w-4" />
                      <span>{internship.applications} applications</span>
                    </div>
                    {internship.type === "college-specific" && (
                      <Badge variant="secondary" className="mt-1">
                        🎓 {internship.college}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{internship.mode}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span>{internship.stipend}</span>
                  </div>
                  <div className="text-muted-foreground">Posted {internship.postedDate}</div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4 mt-4">
            {closedInternships.map((internship) => (
              <div
                key={internship.id}
                className="p-4 rounded-lg border-2 bg-muted/50 opacity-75"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{internship.title}</h3>
                    <p className="text-sm text-muted-foreground">{internship.company}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">Closed</Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {internship.applications} applications • {internship.hired} hired
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{internship.mode}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span>{internship.stipend}</span>
                  </div>
                  <div className="text-muted-foreground">Closed {internship.closedDate}</div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InternshipListingsCard;
