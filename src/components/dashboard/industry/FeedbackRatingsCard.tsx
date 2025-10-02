import { Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const FeedbackRatingsCard = () => {
  const feedbacks = [
    {
      id: 1,
      studentName: "Sneha Kumari",
      internship: "UI/UX Designer",
      rating: 4,
      feedback: "Great problem-solving skills and creativity. Very quick learner!",
      date: "2 weeks ago",
    },
    {
      id: 2,
      studentName: "Arjun Mehta",
      internship: "Backend Developer",
      rating: 5,
      feedback: "Excellent technical skills and team collaboration. Highly recommended!",
      date: "1 month ago",
    },
    {
      id: 3,
      studentName: "Kavya Reddy",
      internship: "Data Analyst",
      rating: 4,
      feedback: "Strong analytical thinking and attention to detail.",
      date: "3 weeks ago",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Feedback & Ratings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="p-4 rounded-lg border-2 hover:border-primary hover:shadow-md transition-all duration-300 bg-card"
          >
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {feedback.studentName.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{feedback.studentName}</h3>
                  {renderStars(feedback.rating)}
                </div>
                <p className="text-xs text-muted-foreground">{feedback.internship}</p>
              </div>
            </div>

            <p className="text-sm mb-2 italic">"{feedback.feedback}"</p>
            <p className="text-xs text-muted-foreground">{feedback.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FeedbackRatingsCard;
