import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, CheckCircle, XCircle, GraduationCap, Clock, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Internship {
  id: string;
  title: string;
  company: string;
  duration: string;
  stipend: string;
  skills: string[];
  college: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
  postedDate: string;
}

const initialPendingInternships: Internship[] = [
  {
    id: "i1",
    title: "Full Stack Developer Intern",
    company: "Infosys",
    duration: "6 months",
    stipend: "₹20,000/month",
    skills: ["React", "Node.js", "MongoDB"],
    college: "IIT Delhi",
    status: "pending",
    postedDate: "2025-10-01",
  },
  {
    id: "i2",
    title: "Data Science Intern",
    company: "TCS",
    duration: "3 months",
    stipend: "₹15,000/month",
    skills: ["Python", "Machine Learning", "SQL"],
    college: "NIT Patna",
    status: "pending",
    postedDate: "2025-10-02",
  },
  {
    id: "i3",
    title: "UI/UX Design Intern",
    company: "Wipro",
    duration: "4 months",
    stipend: "₹18,000/month",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    college: "IIT Delhi",
    status: "pending",
    postedDate: "2025-09-30",
  },
  {
    id: "i4",
    title: "Cloud Engineering Intern",
    company: "Tech Mahindra",
    duration: "6 months",
    stipend: "₹25,000/month",
    skills: ["AWS", "Docker", "Kubernetes"],
    college: "IIT Bombay",
    status: "pending",
    postedDate: "2025-10-01",
  },
];

const InternshipApprovalsCard = () => {
  const [pendingInternships, setPendingInternships] = useState<Internship[]>(initialPendingInternships);
  const [approvedInternships, setApprovedInternships] = useState<Internship[]>([]);
  const [rejectedInternships, setRejectedInternships] = useState<Internship[]>([]);
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; internship: Internship | null }>({
    open: false,
    internship: null,
  });
  const [rejectionReason, setRejectionReason] = useState("");

  const playSound = () => {
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE=");
    audio.play().catch(() => {});
  };

  const handleApprove = (internship: Internship) => {
    setPendingInternships(pendingInternships.filter(i => i.id !== internship.id));
    const approved = { ...internship, status: "approved" as const };
    setApprovedInternships([...approvedInternships, approved]);

    const existingInternships = JSON.parse(localStorage.getItem("approvedCollegeInternships") || "[]");
    localStorage.setItem("approvedCollegeInternships", JSON.stringify([...existingInternships, approved]));

    playSound();
    toast.success("Internship Approved!", {
      description: `${internship.title} at ${internship.company} is now visible to ${internship.college} students.`,
    });
  };

  const handleReject = (internship: Internship) => {
    setRejectDialog({ open: true, internship });
  };

  const confirmReject = () => {
    if (rejectDialog.internship) {
      setPendingInternships(pendingInternships.filter(i => i.id !== rejectDialog.internship!.id));
      setRejectedInternships([
        ...rejectedInternships,
        { ...rejectDialog.internship, status: "rejected", rejectionReason },
      ]);
      playSound();
      toast.error("Internship Rejected", {
        description: `${rejectDialog.internship.title} has been rejected.`,
      });
      setRejectDialog({ open: false, internship: null });
      setRejectionReason("");
    }
  };

  const renderInternshipCard = (internship: Internship, showActions: boolean) => (
    <div
      key={internship.id}
      className="p-5 bg-gradient-to-br from-white to-blue-50 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-lg text-slate-900 mb-1">{internship.title}</h4>
          <p className="text-sm text-slate-600 font-medium">{internship.company}</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
          <GraduationCap className="w-3 h-3 mr-1" />
          {internship.college}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4 text-blue-600" />
          {internship.duration}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <IndianRupee className="w-4 h-4 text-green-600" />
          {internship.stipend}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {internship.skills.map((skill) => (
          <Badge key={skill} variant="outline" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="text-xs text-slate-500 mb-3">
        Posted: {new Date(internship.postedDate).toLocaleDateString()}
      </div>

      {internship.rejectionReason && (
        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
          <strong>Rejection Reason:</strong> {internship.rejectionReason}
        </div>
      )}

      {showActions && (
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => handleApprove(internship)}
            className="flex-1 bg-green-600 hover:bg-green-700 transition-all duration-300"
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleReject(internship)}
            className="flex-1 transition-all duration-300"
          >
            <XCircle className="w-4 h-4 mr-1" />
            Reject
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-slate-200">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Briefcase className="w-5 h-5 text-purple-600" />
            Internship Approvals
            <Badge className="ml-auto bg-orange-500">{pendingInternships.length} Pending</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending" className="relative">
                Pending
                {pendingInternships.length > 0 && (
                  <Badge className="ml-2 bg-orange-500">{pendingInternships.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved
                <Badge className="ml-2 bg-green-500">{approvedInternships.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected
                {rejectedInternships.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{rejectedInternships.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {pendingInternships.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No pending internships</p>
                ) : (
                  pendingInternships.map((internship) => renderInternshipCard(internship, true))
                )}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {approvedInternships.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No approved internships</p>
                ) : (
                  approvedInternships.map((internship) => renderInternshipCard(internship, false))
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {rejectedInternships.length === 0 ? (
                  <p className="text-center text-slate-500 py-8">No rejected internships</p>
                ) : (
                  rejectedInternships.map((internship) => renderInternshipCard(internship, false))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={rejectDialog.open} onOpenChange={(open) => setRejectDialog({ open, internship: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Reject Internship
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting "{rejectDialog.internship?.title}"
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-24"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRejectDialog({ open: false, internship: null })}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InternshipApprovalsCard;
