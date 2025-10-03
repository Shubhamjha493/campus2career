import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { TrendingUp, Users, Briefcase, FileText, Building2 } from "lucide-react";

const stats = [
  { label: "Students Registered", value: 4500, icon: Users, color: "text-blue-600", bgColor: "bg-blue-50" },
  { label: "Industries Registered", value: 250, icon: Building2, color: "text-purple-600", bgColor: "bg-purple-50" },
  { label: "Internships Approved", value: 120, icon: Briefcase, color: "text-green-600", bgColor: "bg-green-50" },
  { label: "Applications Submitted", value: 5000, icon: FileText, color: "text-orange-600", bgColor: "bg-orange-50" },
];

const monthlyData = [
  { month: "Jan", students: 320, internships: 12 },
  { month: "Feb", students: 450, internships: 18 },
  { month: "Mar", students: 580, internships: 25 },
  { month: "Apr", students: 720, internships: 15 },
  { month: "May", students: 650, internships: 20 },
  { month: "Jun", students: 890, internships: 30 },
];

const categoryData = [
  { name: "Tech", value: 45 },
  { name: "Finance", value: 20 },
  { name: "Marketing", value: 15 },
  { name: "Design", value: 12 },
  { name: "Others", value: 8 },
];

const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444"];

const ReportsAnalyticsCard = () => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-slate-200">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Reports & Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`${stat.bgColor} p-4 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="animate-in fade-in duration-700 delay-300">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Monthly Trends</h4>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-slate-200">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="students" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Students" />
                  <Bar dataKey="internships" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Internships" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="animate-in fade-in duration-700 delay-500">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Internship Categories</h4>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-slate-200">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsAnalyticsCard;
