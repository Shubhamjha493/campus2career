import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, CircleCheck as CheckCircle, Circle as XCircle, CircleAlert as AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface User {
  id: string;
  name: string;
  email: string;
  type: "student" | "faculty" | "industry";
  status: "pending" | "active" | "rejected" | "suspended";
  college?: string;
  company?: string;
  rejectionReason?: string;
}

const initialPendingUsers: User[] = [
  { id: "s1", name: "Sneha Kumari", email: "sneha@student.com", type: "student", status: "pending", college: "IIT Delhi" },
  { id: "s2", name: "Ravi Kumar", email: "ravi@student.com", type: "student", status: "pending", college: "NIT Patna" },
  { id: "f1", name: "Prof. Sharma", email: "sharma@faculty.com", type: "faculty", status: "pending", college: "IIT Delhi" },
  { id: "i1", name: "Infosys HR", email: "hr@infosys.com", type: "industry", status: "pending", company: "Infosys" },
];

const UserManagementCard = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>(initialPendingUsers);
  const [activeUsers, setActiveUsers] = useState<User[]>([
    { id: "s10", name: "Amit Singh", email: "amit@student.com", type: "student", status: "active", college: "IIT Bombay" },
    { id: "f10", name: "Dr. Verma", email: "verma@faculty.com", type: "faculty", status: "active", college: "NIT Patna" },
  ]);
  const [rejectedUsers, setRejectedUsers] = useState<User[]>([]);
  const [rejectDialog, setRejectDialog] = useState<{ open: boolean; user: User | null }>({
    open: false,
    user: null,
  });
  const [rejectionReason, setRejectionReason] = useState("");

  const playSound = () => {
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE=");
    audio.play().catch(() => {});
  };

  const handleApprove = (user: User) => {
    setPendingUsers(pendingUsers.filter(u => u.id !== user.id));
    setActiveUsers([...activeUsers, { ...user, status: "active" }]);
    playSound();
    toast.success("User Approved!", {
      description: `${user.name} has been approved successfully.`,
    });
  };

  const handleReject = (user: User) => {
    setRejectDialog({ open: true, user });
  };

  const confirmReject = () => {
    if (rejectDialog.user) {
      setPendingUsers(pendingUsers.filter(u => u.id !== rejectDialog.user!.id));
      setRejectedUsers([
        ...rejectedUsers,
        { ...rejectDialog.user, status: "rejected", rejectionReason },
      ]);
      playSound();
      toast.error("User Rejected", {
        description: `${rejectDialog.user.name} has been rejected.`,
      });
      setRejectDialog({ open: false, user: null });
      setRejectionReason("");
    }
  };

  const handleSuspend = (user: User) => {
    setActiveUsers(activeUsers.map(u => u.id === user.id ? { ...u, status: "suspended" } : u));
    playSound();
    toast.warning("User Suspended", {
      description: `${user.name} has been suspended.`,
    });
  };

  const handleRemove = (user: User) => {
    setActiveUsers(activeUsers.filter(u => u.id !== user.id));
    playSound();
    toast.success("User Removed", {
      description: `${user.name} has been removed from active users.`,
    });
  };

  const renderUserList = (users: User[], showActions: "approve" | "manage" | "view") => (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {users.length === 0 ? (
        <p className="text-center text-slate-500 py-8">No users found</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-900">{user.name}</h4>
                  <Badge variant={user.type === "student" ? "default" : user.type === "faculty" ? "secondary" : "outline"}>
                    {user.type}
                  </Badge>
                  {user.status === "suspended" && (
                    <Badge variant="destructive">Suspended</Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600">{user.email}</p>
                {user.college && (
                  <p className="text-xs text-slate-500 mt-1">College: {user.college}</p>
                )}
                {user.company && (
                  <p className="text-xs text-slate-500 mt-1">Company: {user.company}</p>
                )}
                {user.rejectionReason && (
                  <p className="text-xs text-red-600 mt-2">Reason: {user.rejectionReason}</p>
                )}
              </div>
              {showActions === "approve" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(user)}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-300"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleReject(user)}
                    className="transition-all duration-300"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              )}
              {showActions === "manage" && user.status !== "suspended" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSuspend(user)}
                    className="transition-all duration-300"
                  >
                    Suspend
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemove(user)}
                    className="transition-all duration-300"
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-slate-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Users className="w-5 h-5 text-blue-600" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending" className="relative">
                Pending
                {pendingUsers.length > 0 && (
                  <Badge className="ml-2 bg-orange-500">{pendingUsers.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="active">
                Active
                <Badge className="ml-2 bg-green-500">{activeUsers.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected
                {rejectedUsers.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{rejectedUsers.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <Tabs defaultValue="students" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="faculty">Faculty</TabsTrigger>
                  <TabsTrigger value="industry">Industry</TabsTrigger>
                </TabsList>
                <TabsContent value="students">
                  {renderUserList(
                    pendingUsers.filter(u => u.type === "student"),
                    "approve"
                  )}
                </TabsContent>
                <TabsContent value="faculty">
                  {renderUserList(
                    pendingUsers.filter(u => u.type === "faculty"),
                    "approve"
                  )}
                </TabsContent>
                <TabsContent value="industry">
                  {renderUserList(
                    pendingUsers.filter(u => u.type === "industry"),
                    "approve"
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="active">
              {renderUserList(activeUsers, "manage")}
            </TabsContent>

            <TabsContent value="rejected">
              {renderUserList(rejectedUsers, "view")}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={rejectDialog.open} onOpenChange={(open) => setRejectDialog({ open, user: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Reject User
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {rejectDialog.user?.name}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-24"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setRejectDialog({ open: false, user: null })}>
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

export default UserManagementCard;
