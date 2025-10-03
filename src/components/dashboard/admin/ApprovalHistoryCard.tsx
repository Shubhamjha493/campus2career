import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, CircleCheck as CheckCircle, Circle as XCircle, User, Briefcase } from "lucide-react";

interface HistoryItem {
  id: string;
  type: "user" | "internship";
  action: "approved" | "rejected";
  name: string;
  date: string;
  details: string;
}

const historyData: HistoryItem[] = [
  {
    id: "1",
    type: "user",
    action: "approved",
    name: "Sneha Kumari",
    date: "2025-10-02",
    details: "Student from IIT Delhi",
  },
  {
    id: "2",
    type: "internship",
    action: "rejected",
    name: "Backend Developer at Infosys",
    date: "2025-09-28",
    details: "Missing required skills",
  },
  {
    id: "3",
    type: "user",
    action: "approved",
    name: "Prof. Sharma",
    date: "2025-09-25",
    details: "Faculty from NIT Patna",
  },
  {
    id: "4",
    type: "internship",
    action: "approved",
    name: "Data Science Intern at TCS",
    date: "2025-09-22",
    details: "College-specific internship for IIT Delhi",
  },
  {
    id: "5",
    type: "user",
    action: "rejected",
    name: "Tech Corp Ltd",
    date: "2025-09-20",
    details: "Industry registration - Incomplete documentation",
  },
  {
    id: "6",
    type: "internship",
    action: "approved",
    name: "UI/UX Designer at Wipro",
    date: "2025-09-18",
    details: "College-specific internship for NIT Patna",
  },
  {
    id: "7",
    type: "user",
    action: "approved",
    name: "Ravi Kumar",
    date: "2025-09-15",
    details: "Student from IIT Bombay",
  },
];

const ApprovalHistoryCard = () => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-slate-200">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <History className="w-5 h-5 text-indigo-600" />
          Approval History
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {historyData.map((item, index) => (
            <div
              key={item.id}
              className="relative pl-8 pb-4 border-l-2 border-slate-200 last:border-l-0 last:pb-0 animate-in fade-in slide-in-from-left duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={`absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  item.action === "approved"
                    ? "bg-green-100 border-2 border-green-500"
                    : "bg-red-100 border-2 border-red-500"
                }`}
              >
                {item.action === "approved" ? (
                  <CheckCircle className="w-3 h-3 text-green-600" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-600" />
                )}
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {item.type === "user" ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    )}
                    <h4 className="font-semibold text-slate-900 text-sm">{item.name}</h4>
                  </div>
                  <Badge
                    variant={item.action === "approved" ? "default" : "destructive"}
                    className={
                      item.action === "approved"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }
                  >
                    {item.action === "approved" ? "Approved" : "Rejected"}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 mb-2">{item.details}</p>
                <p className="text-xs text-slate-500">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalHistoryCard;
