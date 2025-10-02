import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, GraduationCap, Code } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import studentPhoto from "@/assets/student-profile.png";

export const ProfileCard = () => {
  const [open, setOpen] = useState(false);

  const profile = {
    name: "Sneha Kumari",
    college: "BIT Sindri",
    semester: "5th",
    skills: ["C++", "Python", "Web Dev", "React", "Node.js"],
    email: "student1@campus.com",
    enrollment: "BIT/2022/1234"
  };

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20 bg-gradient-to-br from-card via-card to-primary/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <User className="w-5 h-5" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={studentPhoto} 
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover shadow-glow border-2 border-primary/20"
            />
            <div>
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.college}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-accent" />
            <span>Semester: <strong>{profile.semester}</strong></span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Code className="w-4 h-4 text-secondary" />
              <span className="font-medium">Technical Skills:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-secondary/20 text-foreground">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl">Student Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src={studentPhoto} 
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover shadow-glow border-4 border-primary/20"
              />
              <div>
                <h3 className="text-2xl font-bold">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.college}</p>
                <p className="text-sm text-muted-foreground">Enrollment: {profile.enrollment}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">{profile.email}</p>
              </div>
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                <p className="text-sm text-muted-foreground">Semester</p>
                <p className="font-semibold">{profile.semester}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Technical Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} className="px-4 py-2 text-sm bg-gradient-primary text-white hover:opacity-90 transition-smooth">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Profile Completion</p>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-primary h-3 rounded-full transition-smooth" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">85% Complete</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
