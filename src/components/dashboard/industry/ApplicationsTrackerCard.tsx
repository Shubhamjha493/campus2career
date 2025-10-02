import { useState } from "react";
import { FileText, CheckCircle, XCircle, Award, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Application {
  id: number;
  studentName: string;
  college: string;
  internship: string;
  status: "applied" | "shortlisted" | "hired" | "rejected";
  appliedDate: string;
  cgpa: number;
  isYourCollege?: boolean;
}

const ApplicationsTrackerCard = () => {
  const [selectedInternship, setSelectedInternship] = useState("all");
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      studentName: "Rahul Sharma",
      college: "IIT Delhi",
      internship: "Frontend Developer",
      status: "applied",
      appliedDate: "2 days ago",
      cgpa: 8.5,
      isYourCollege: true,
    },
    {
      id: 2,
      studentName: "Priya Singh",
      college: "NIT Trichy",
      internship: "Frontend Developer",
      status: "shortlisted",
      appliedDate: "3 days ago",
      cgpa: 8.9,
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      college: "BITS Pilani",
      internship: "Data Analyst",
      status: "applied",
      appliedDate: "1 day ago",
      cgpa: 8.2,
      isYourCollege: true,
    },
    {
      id: 4,
      studentName: "Sneha Patel",
      college: "IIT Bombay",
      internship: "UI/UX Designer",
      status: "hired",
      appliedDate: "1 week ago",
      cgpa: 9.1,
    },
  ]);

  const updateStatus = (id: number, newStatus: Application["status"]) => {
    setApplications(apps =>
      apps.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );
    toast.success(`Application ${newStatus}!`);
  };

  const filteredApplications = selectedInternship === "all"
    ? applications
    : applications.filter(app => app.internship === selectedInternship);

  const getStatusBadge = (status: Application["status"]) => {
    const variants = {
      applied: "secondary",
      shortlisted: "default",
      hired: "default",
      rejected: "destructive",
    };
    return (
      <Badge variant={variants[status] as any} className={
        status === "hired" ? "bg-green-500 hover:bg-green-600" :
        status === "shortlisted" ? "bg-blue-500 hover:bg-blue-600" : ""
      }>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="hover:scale-[1.01] hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Applications Tracker
          </CardTitle>
          <Select value={selectedInternship} onValueChange={setSelectedInternship}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by internship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Internships</SelectItem>
              <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
              <SelectItem value="Data Analyst">Data Analyst</SelectItem>
              <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-lg border-2 hover:border-primary transition-all duration-300 bg-card"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{app.studentName}</h3>
                    {app.isYourCollege && (
                      <Badge variant="outline" className="text-xs">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        Your College
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{app.college}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="text-muted-foreground">
                      Applied for: <span className="font-medium text-foreground">{app.internship}</span>
                    </span>
                    <span className="text-muted-foreground">CGPA: {app.cgpa}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{app.appliedDate}</p>
                </div>

                <div className="flex flex-col gap-2 min-w-[180px]">
                  <div className="flex justify-end">{getStatusBadge(app.status)}</div>
                  {app.status === "applied" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateStatus(app.id, "shortlisted")}
                        className="flex-1 hover:scale-105 transition-transform"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Shortlist
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateStatus(app.id, "rejected")}
                        className="flex-1 hover:scale-105 transition-transform"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                  {app.status === "shortlisted" && (
                    <Button
                      size="sm"
                      onClick={() => updateStatus(app.id, "hired")}
                      className="bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform"
                    >
                      <Award className="h-3 w-3 mr-1" />
                      Hire
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsTrackerCard;
