import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleUser as UserCircle, Lock, Mail, Phone, Save } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminProfileCard = () => {
  const [adminProfile] = useState({
    name: "Dr. Rajesh Kumar",
    email: "admin@campus.com",
    phone: "+91 98765 43210",
    role: "System Administrator",
    joinedDate: "2024-01-01",
  });

  const [passwordDialog, setPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const playSound = () => {
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE=");
    audio.play().catch(() => {});
  };

  const handleUpdatePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error("Invalid Input", {
        description: "Please fill in all password fields.",
      });
      return;
    }

    if (passwordData.new !== passwordData.confirm) {
      toast.error("Password Mismatch", {
        description: "New password and confirm password do not match.",
      });
      return;
    }

    if (passwordData.new.length < 8) {
      toast.error("Weak Password", {
        description: "Password must be at least 8 characters long.",
      });
      return;
    }

    playSound();
    toast.success("Password Updated!", {
      description: "Your password has been updated successfully.",
    });

    setPasswordData({ current: "", new: "", confirm: "" });
    setPasswordDialog(false);
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <UserCircle className="w-5 h-5 text-slate-600" />
          Admin Profile & Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {adminProfile.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{adminProfile.name}</h3>
            <p className="text-sm text-slate-600">{adminProfile.role}</p>
            <p className="text-xs text-slate-500">Member since {new Date(adminProfile.joinedDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <Label className="text-sm font-semibold text-slate-700">Email Address</Label>
            </div>
            <p className="text-slate-900 ml-7">{adminProfile.email}</p>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <Phone className="w-4 h-4 text-green-600" />
              <Label className="text-sm font-semibold text-slate-700">Phone Number</Label>
            </div>
            <p className="text-slate-900 ml-7">{adminProfile.phone}</p>
          </div>
        </div>

        <Dialog open={passwordDialog} onOpenChange={setPasswordDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 transition-all duration-300 hover:scale-105">
              <Lock className="w-4 h-4 mr-2" />
              Update Password
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-600" />
                Update Password
              </DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new password.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.current}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, current: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  value={passwordData.new}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, new: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirm: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleUpdatePassword} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>Note:</strong> All profile updates are for demonstration purposes only. This is a dummy admin dashboard with no backend integration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProfileCard;
