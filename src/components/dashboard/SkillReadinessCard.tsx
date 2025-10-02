import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookOpen, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const SkillReadinessCard = () => {
  const [open, setOpen] = useState(false);

  const modules = [
    { id: 1, name: "C++ Basics", progress: 80, color: "primary" },
    { id: 2, name: "Python Programming", progress: 60, color: "accent" },
    { id: 3, name: "Data Structures", progress: 40, color: "secondary" },
    { id: 4, name: "Web Development", progress: 75, color: "primary" },
    { id: 5, name: "Database Management", progress: 55, color: "accent" }
  ];

  return (
    <>
      <Card 
        className="rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20 bg-gradient-to-br from-card via-card to-primary/5"
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <BookOpen className="w-5 h-5" />
            Skill Readiness Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {modules.slice(0, 3).map((module) => (
            <div key={module.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{module.name}</span>
                <span className="text-muted-foreground">{module.progress}%</span>
              </div>
              <Progress value={module.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="heading-primary text-2xl flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Skill Readiness Hub
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Overall Progress</h4>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div className="text-3xl font-bold heading-primary">
                {Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / modules.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Average completion across all modules</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Training Modules</h4>
              {modules.map((module) => (
                <div 
                  key={module.id} 
                  className="p-4 rounded-xl border border-border bg-gradient-to-br from-card to-muted/20 hover:border-primary/50 transition-smooth"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">{module.name}</h5>
                    <span className="text-sm font-semibold text-primary">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-3 mb-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{module.progress < 100 ? 'In Progress' : 'Completed'}</span>
                    <span>{module.progress < 100 ? `${100 - module.progress}% remaining` : '✓ Done'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
