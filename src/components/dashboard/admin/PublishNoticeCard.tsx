import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Notice {
  id: string;
  content: string;
  timestamp: string;
}

const PublishNoticeCard = () => {
  const [noticeContent, setNoticeContent] = useState("");
  const [recentNotices, setRecentNotices] = useState<Notice[]>(() => {
    const stored = localStorage.getItem("notices");
    return stored ? JSON.parse(stored) : [];
  });

  const playSound = () => {
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE=");
    audio.play().catch(() => {});
  };

  const handlePublish = () => {
    if (!noticeContent.trim()) {
      toast.error("Notice is empty", {
        description: "Please enter some content before publishing.",
      });
      return;
    }

    const newNotice: Notice = {
      id: Date.now().toString(),
      content: noticeContent,
      timestamp: new Date().toISOString(),
    };

    const existingNotices = JSON.parse(localStorage.getItem("notices") || "[]");
    const updatedNotices = [newNotice, ...existingNotices];
    localStorage.setItem("notices", JSON.stringify(updatedNotices));
    setRecentNotices(updatedNotices);
    setNoticeContent("");

    playSound();
    toast.success("Notice Published Successfully!", {
      description: "The notice is now visible to all students and faculty.",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    });
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-slate-200">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Megaphone className="w-5 h-5 text-orange-600" />
          Publish Notice
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-3">
          <Textarea
            placeholder="Write your notice here... (e.g., Important: All students are requested to submit their internship reports by Oct 15, 2025)"
            value={noticeContent}
            onChange={(e) => setNoticeContent(e.target.value)}
            className="min-h-32 resize-none border-slate-300 focus:border-orange-500 transition-all duration-300"
          />
          <Button
            onClick={handlePublish}
            className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-semibold py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Send className="w-4 h-4 mr-2" />
            Publish Notice
          </Button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-700">Recent Notices</h4>
            <Badge className="bg-orange-500">{recentNotices.length}</Badge>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {recentNotices.length === 0 ? (
              <p className="text-center text-slate-500 py-8 text-sm">No notices published yet</p>
            ) : (
              recentNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:shadow-md transition-all duration-300 animate-in fade-in slide-in-from-top"
                >
                  <p className="text-sm text-slate-700 mb-2">{notice.content}</p>
                  <p className="text-xs text-slate-500">
                    Published: {new Date(notice.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Notices will appear in Student & Faculty dashboards under "Recent Notifications"
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublishNoticeCard;
