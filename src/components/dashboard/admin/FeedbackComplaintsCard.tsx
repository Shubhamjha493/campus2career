import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, CircleCheck as CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Complaint {
  id: string;
  name: string;
  role: "student" | "faculty";
  issue: string;
  description: string;
  status: "pending" | "resolved";
  date: string;
}

const initialComplaints: Complaint[] = [
  {
    id: "c1",
    name: "Ravi Kumar",
    role: "student",
    issue: "Login Issue",
    description: "Unable to login to the student portal. Getting 'Invalid credentials' error.",
    status: "pending",
    date: "2025-10-02",
  },
  {
    id: "c2",
    name: "Prof. Sharma",
    role: "faculty",
    issue: "Internship Not Visible",
    description: "Some approved internships are not visible in the faculty dashboard.",
    status: "pending",
    date: "2025-10-01",
  },
  {
    id: "c3",
    name: "Sneha Kumari",
    role: "student",
    issue: "Profile Update Error",
    description: "Cannot update profile picture. Upload button not working.",
    status: "pending",
    date: "2025-09-30",
  },
  {
    id: "c4",
    name: "Dr. Verma",
    role: "faculty",
    issue: "Report Generation Slow",
    description: "Student report generation is taking too long to process.",
    status: "pending",
    date: "2025-09-28",
  },
];

const FeedbackComplaintsCard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const playSound = () => {
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE=");
    audio.play().catch(() => {});
  };

  const handleResolve = (id: string) => {
    setComplaints(
      complaints.map((c) => (c.id === id ? { ...c, status: "resolved" } : c))
    );
    playSound();
    toast.success("Complaint Resolved", {
      description: "The complaint has been marked as resolved.",
    });
  };

  const handlePending = (id: string) => {
    setComplaints(
      complaints.map((c) => (c.id === id ? { ...c, status: "pending" } : c))
    );
    toast.info("Marked as Pending", {
      description: "The complaint status has been updated to pending.",
    });
  };

  const pendingCount = complaints.filter((c) => c.status === "pending").length;
  const resolvedCount = complaints.filter((c) => c.status === "resolved").length;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-slate-200">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-red-50 border-b">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <MessageSquare className="w-5 h-5 text-rose-600" />
          Feedback & Complaints
          <div className="ml-auto flex gap-2">
            <Badge className="bg-orange-500">{pendingCount} Pending</Badge>
            <Badge className="bg-green-500">{resolvedCount} Resolved</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {complaints.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No complaints found</p>
          ) : (
            complaints.map((complaint, index) => (
              <div
                key={complaint.id}
                className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-right ${
                  complaint.status === "pending"
                    ? "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
                    : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-slate-900">{complaint.issue}</h4>
                      <Badge
                        variant={complaint.status === "pending" ? "default" : "secondary"}
                        className={
                          complaint.status === "pending"
                            ? "bg-orange-600 hover:bg-orange-700"
                            : "bg-green-600 hover:bg-green-700"
                        }
                      >
                        {complaint.status === "pending" ? (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolved
                          </>
                        )}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">
                      <strong>{complaint.name}</strong> ({complaint.role})
                    </p>
                    <p className="text-sm text-slate-700 mb-2">{complaint.description}</p>
                    <p className="text-xs text-slate-500">
                      Submitted: {new Date(complaint.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {complaint.status === "pending" ? (
                    <Button
                      size="sm"
                      onClick={() => handleResolve(complaint.id)}
                      className="bg-green-600 hover:bg-green-700 transition-all duration-300"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Mark as Resolved
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePending(complaint.id)}
                      className="transition-all duration-300"
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Mark as Pending
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackComplaintsCard;
