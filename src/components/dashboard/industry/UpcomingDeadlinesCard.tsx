import { Clock, AlertCircle, Calendar, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const UpcomingDeadlinesCard = () => {
  const deadlines = [
    {
      id: 1,
      type: "posting",
      title: "Frontend Developer Internship",
      description: "Application deadline",
      daysLeft: 3,
      date: "Oct 15, 2024",
      urgent: true,
    },
    {
      id: 2,
      type: "interview",
      title: "Interview with Sneha Kumari",
      description: "UI/UX Designer position",
      daysLeft: 2,
      date: "Oct 5, 2024",
      time: "2:00 PM",
      urgent: true,
    },
    {
      id: 3,
      type: "review",
      title: "Review Applications",
      description: "Data Analyst position - 15 pending",
      daysLeft: 5,
      date: "Oct 18, 2024",
      urgent: false,
    },
  ];

  const handleNotify = (deadline: any) => {
    // Play success sound
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSyBzvLZiTYIGGm98OScTgwOUKnk7bhlHAU2j9nyxnkpBSp+zPDajz4JFF+28OqnVRQJRZ/h88BtIQUsgc7y2Ik2CBhqvvDknE4MDlCp5O24ZRwENI/Z8sZ5KQUpfszw2o8+CRVftPDqp1UUCUSe4fPAbSEFLIHO8tmJNggZa77w5JxODA5QqeTtuGUcBDSP2fLGeSgFK37M8NqPPgkVX7Tw6qdVFAlEn+HzwG0hBSyBzvLZiTYIGWy+8OScTgwOUKnk7bhlHAU0j9nyxnkoBSx+zPDajz4JFF+08OqnVRQKQ5/h88BtIQUsgc7y2Yk2CBlsvvDknE4MDlCp5O24ZRwFNI/Z8sZ5KAUsfszw2o8+CRVftPDqp1UUCkSf4fPAbSEFLIHO8tmJNggZa77w5JxODA5QqeTtuGUcBTSP2fLGeSgFLH7M8NqPPgkUX7Tw6qdVFApDn+HzwG0hBSyBzvLZiTYIGWu+8OScTgwOUKnk7bhlHAU0j9nyxnkoBSx+zPDajz4JFF+08OqnVRQKQ5/h88BtIQUsgc7y2Yk2CBlrvvDknE4MDlCp5O24ZRwFNI/Z8sZ5KAUsfs==");
    audio.play().catch(() => {});

    // Save notification to student dashboard
    const notifications = JSON.parse(localStorage.getItem("student_notifications") || "[]");
    const newNotification = {
      id: Date.now(),
      title: "Deadline Reminder",
      message: `${deadline.title} - ${deadline.description}. Due on ${deadline.date}${deadline.time ? ' at ' + deadline.time : ''}`,
      time: "Just now",
      type: "warning",
      read: false
    };
    notifications.unshift(newNotification);
    localStorage.setItem("student_notifications", JSON.stringify(notifications));

    toast.success("Notification sent successfully to students!");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "interview":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "posting":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
      case "review":
        return "bg-green-500/10 text-green-600 dark:text-green-400";
      default:
        return "bg-muted";
    }
  };

  return (
    <Card className="h-full hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Upcoming Deadlines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className={`p-4 rounded-lg border-2 hover:shadow-md transition-all duration-300 ${
              deadline.urgent ? "border-orange-500/50 bg-orange-500/5" : "bg-card"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{deadline.title}</h3>
                  {deadline.urgent && (
                    <AlertCircle className="h-4 w-4 text-orange-500 animate-pulse" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{deadline.description}</p>
              </div>
              <Badge variant="secondary" className={getTypeColor(deadline.type)}>
                {deadline.type.charAt(0).toUpperCase() + deadline.type.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{deadline.date}</span>
                {deadline.time && <span>• {deadline.time}</span>}
              </div>
              <Badge
                variant={deadline.daysLeft <= 3 ? "destructive" : "secondary"}
                className="font-semibold"
              >
                {deadline.daysLeft} {deadline.daysLeft === 1 ? "day" : "days"} left
              </Badge>
            </div>

            <Button
              size="sm"
              variant="outline"
              className="w-full mt-3 hover:scale-105 transition-transform"
              onClick={() => handleNotify(deadline)}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notify Students
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingDeadlinesCard;
