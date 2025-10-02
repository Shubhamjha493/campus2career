import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, GraduationCap, Code, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import studentPhoto from "@/assets/student-profile.png";

export const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const profile = {
    name: "Sneha Kumari",
    college: "BIT Sindri",
    semester: "5th",
    email: "student1@campus.com",
    enrollment: "BIT/2022/1234"
  };

  // Load skills from localStorage on mount
  useEffect(() => {
    const savedSkills = localStorage.getItem("student_skills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    } else {
      // Default skills
      const defaultSkills = ["C++", "Python", "Web Dev", "React", "Node.js"];
      setSkills(defaultSkills);
      localStorage.setItem("student_skills", JSON.stringify(defaultSkills));
    }
  }, []);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      localStorage.setItem("student_skills", JSON.stringify(updatedSkills));
      setNewSkill("");
      setShowSkillForm(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    localStorage.setItem("student_skills", JSON.stringify(updatedSkills));
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Code className="w-4 h-4 text-primary" />
                <span className="font-medium">Technical Skills:</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSkillForm(!showSkillForm);
                }}
                className="h-7 px-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {showSkillForm && (
              <div className="p-3 rounded-lg bg-muted/50 space-y-2 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <Label htmlFor="new-skill" className="text-xs">Add New Skill</Label>
                <div className="flex gap-2">
                  <Input
                    id="new-skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g., JavaScript"
                    className="h-8 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button size="sm" onClick={handleAddSkill} className="h-8">
                    Add
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill} className="bg-secondary text-secondary-foreground">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline" className="text-muted-foreground">
                  +{skills.length - 3} more
                </Badge>
              )}
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
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Technical Skills
                </h4>
                <Button 
                  size="sm" 
                  onClick={() => setShowSkillForm(!showSkillForm)}
                  className="gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add Skill
                </Button>
              </div>
              
              {showSkillForm && (
                <div className="p-4 rounded-lg bg-muted/50 space-y-3 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="modal-skill">Skill Name</Label>
                    <Input
                      id="modal-skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., JavaScript, React, SQL"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSkill();
                        }
                      }}
                    />
                  </div>
                  <Button onClick={handleAddSkill} className="w-full">
                    Add Skill
                  </Button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    className="px-4 py-2 text-sm bg-gradient-primary text-white hover:opacity-90 transition-smooth group relative"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
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
