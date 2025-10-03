import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface College {
  id: string;
  name: string;
  location: string;
  studentsCount: number;
  addedDate: string;
}

const initialColleges: College[] = [
  { id: "1", name: "IIT Delhi", location: "New Delhi", studentsCount: 1250, addedDate: "2024-01-15" },
  { id: "2", name: "NIT Patna", location: "Patna, Bihar", studentsCount: 890, addedDate: "2024-02-20" },
  { id: "3", name: "IIT Bombay", location: "Mumbai, Maharashtra", studentsCount: 1500, addedDate: "2024-01-10" },
  { id: "4", name: "BITS Pilani", location: "Pilani, Rajasthan", studentsCount: 720, addedDate: "2024-03-05" },
];

const CollegeManagementCard = () => {
  const [colleges, setColleges] = useState<College[]>(() => {
    const stored = localStorage.getItem("colleges");
    return stored ? JSON.parse(stored) : initialColleges;
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCollege, setNewCollege] = useState({ name: "", location: "" });

  const playSound = () => {
    const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGH0fPTgjMGHm7A7+OZURE=");
    audio.play().catch(() => {});
  };

  const handleAddCollege = () => {
    if (!newCollege.name.trim() || !newCollege.location.trim()) {
      toast.error("Invalid Input", {
        description: "Please fill in all fields.",
      });
      return;
    }

    const college: College = {
      id: Date.now().toString(),
      name: newCollege.name,
      location: newCollege.location,
      studentsCount: 0,
      addedDate: new Date().toISOString().split("T")[0],
    };

    const updatedColleges = [...colleges, college];
    setColleges(updatedColleges);
    localStorage.setItem("colleges", JSON.stringify(updatedColleges));

    playSound();
    toast.success("College Added!", {
      description: `${college.name} has been added successfully.`,
    });

    setNewCollege({ name: "", location: "" });
    setIsDialogOpen(false);
  };

  const handleRemoveCollege = (id: string, name: string) => {
    const updatedColleges = colleges.filter((c) => c.id !== id);
    setColleges(updatedColleges);
    localStorage.setItem("colleges", JSON.stringify(updatedColleges));

    playSound();
    toast.success("College Removed", {
      description: `${name} has been removed from the system.`,
    });
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-slate-200">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b">
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Building2 className="w-5 h-5 text-cyan-600" />
          College Management
          <Badge className="ml-auto bg-cyan-600">{colleges.length} Colleges</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 transition-all duration-300 hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Add New College
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-600" />
                Add New College
              </DialogTitle>
              <DialogDescription>Enter the details of the college you want to add.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  placeholder="e.g., IIT Kanpur"
                  value={newCollege.name}
                  onChange={(e) => setNewCollege({ ...newCollege, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collegeLocation">Location</Label>
                <Input
                  id="collegeLocation"
                  placeholder="e.g., Kanpur, Uttar Pradesh"
                  value={newCollege.location}
                  onChange={(e) => setNewCollege({ ...newCollege, location: e.target.value })}
                />
              </div>
              <Button onClick={handleAddCollege} className="w-full">
                Add College
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {colleges.map((college, index) => (
            <div
              key={college.id}
              className="p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg border border-cyan-200 hover:shadow-md transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-1">{college.name}</h4>
                  <p className="text-sm text-slate-600 mb-2">{college.location}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Students: {college.studentsCount}</span>
                    <span>Added: {new Date(college.addedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemoveCollege(college.id, college.name)}
                  className="transition-all duration-300 hover:scale-110"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollegeManagementCard;
