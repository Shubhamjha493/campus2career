import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import UserManagementCard from "@/components/dashboard/admin/UserManagementCard";
import InternshipApprovalsCard from "@/components/dashboard/admin/InternshipApprovalsCard";
import ReportsAnalyticsCard from "@/components/dashboard/admin/ReportsAnalyticsCard";
import PublishNoticeCard from "@/components/dashboard/admin/PublishNoticeCard";
import ApprovalHistoryCard from "@/components/dashboard/admin/ApprovalHistoryCard";
import FeedbackComplaintsCard from "@/components/dashboard/admin/FeedbackComplaintsCard";
import CollegeManagementCard from "@/components/dashboard/admin/CollegeManagementCard";
import AdminProfileCard from "@/components/dashboard/admin/AdminProfileCard";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Administrator");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin-login");
        return;
      }

      const { data: adminData, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error || !adminData) {
        await supabase.auth.signOut();
        toast.error("Access Denied", {
          description: "You do not have admin privileges",
        });
        navigate("/admin-login");
        return;
      }

      setAdminName(adminData.full_name);
      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/admin-login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE=");
    audio.play().catch(() => {});
    toast.success("Logged out successfully");
    navigate("/admin-login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <header className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-500">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-blue-100">Campus2Career Administration</p>
              </div>
            </div>
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right duration-500">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{adminName}</p>
                <p className="text-xs text-blue-100">System Administrator</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserManagementCard />
          <InternshipApprovalsCard />
          <ReportsAnalyticsCard />
          <PublishNoticeCard />
          <ApprovalHistoryCard />
          <FeedbackComplaintsCard />
          <CollegeManagementCard />
          <AdminProfileCard />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
