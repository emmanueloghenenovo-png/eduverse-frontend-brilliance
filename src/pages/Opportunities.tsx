import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, ExternalLink, Calendar, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Opportunity {
  id: number;
  title: string;
  type: "hackathon" | "scholarship" | "competition";
  prize: string;
  deadline: string;
  participants: string;
  description: string;
  link: string;
  saved: boolean;
}

const Opportunities = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      title: "Grizzly Hacks 2025",
      type: "hackathon",
      prize: "$10,000",
      deadline: "2025-03-15",
      participants: "500+ teams",
      description: "Build innovative blockchain solutions for real-world problems",
      link: "https://grizzlyhacks.com",
      saved: false,
    },
    {
      id: 2,
      title: "STEM Excellence Scholarship",
      type: "scholarship",
      prize: "$5,000",
      deadline: "2025-04-01",
      participants: "Open to all",
      description: "For outstanding high school students pursuing STEM careers",
      link: "https://example.com/scholarship",
      saved: false,
    },
    {
      id: 3,
      title: "National Science Bowl",
      type: "competition",
      prize: "$2,500",
      deadline: "2025-02-28",
      participants: "200+ schools",
      description: "Academic competition testing science knowledge and teamwork",
      link: "https://example.com/sciencebowl",
      saved: false,
    },
    {
      id: 4,
      title: "CodeQuest Innovation Challenge",
      type: "hackathon",
      prize: "$8,000",
      deadline: "2025-05-20",
      participants: "300+ participants",
      description: "Create AI-powered educational tools for students",
      link: "https://example.com/codequest",
      saved: false,
    },
  ]);

  const typeColors = {
    hackathon: "from-purple-500 to-pink-500",
    scholarship: "from-green-500 to-emerald-500",
    competition: "from-blue-500 to-cyan-500",
  };

  const handleSave = (id: number) => {
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === id ? { ...opp, saved: !opp.saved } : opp
      )
    );
    const opportunity = opportunities.find((opp) => opp.id === id);
    toast({
      title: opportunity?.saved ? "Removed from saved" : "Saved! 📌",
      description: opportunity?.saved
        ? "Opportunity removed from your list"
        : "+15 XP for staying proactive!",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block gradient-bg p-4 rounded-2xl mb-4">
            <Users className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Opportunities
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover hackathons, scholarships & competitions
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-6 mb-8 flex flex-wrap gap-4"
        >
          <Select>
            <SelectTrigger className="w-[200px] glass-card">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hackathon">Hackathons</SelectItem>
              <SelectItem value="scholarship">Scholarships</SelectItem>
              <SelectItem value="competition">Competitions</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[200px] glass-card">
              <SelectValue placeholder="Sort by Deadline" />
            </SelectTrigger>
            <SelectContent className="glass-card">
              <SelectItem value="closest">Closest First</SelectItem>
              <SelectItem value="furthest">Furthest First</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="glass-card">
            View Saved ({opportunities.filter((o) => o.saved).length})
          </Button>
        </motion.div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {opportunities.map((opportunity, index) => (
            <motion.div
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card overflow-hidden"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${typeColors[opportunity.type]} p-6`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                      {opportunity.type}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {opportunity.title}
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSave(opportunity.id)}
                    className={`p-2 rounded-xl ${
                      opportunity.saved
                        ? "bg-white text-black"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${opportunity.saved ? "fill-current" : ""}`}
                    />
                  </motion.button>
                </div>

                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-bold">{opportunity.prize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{opportunity.participants}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {opportunity.description}
                </p>

                <div className="flex items-center gap-2 glass-card p-3 rounded-xl">
                  <Calendar className="w-4 h-4 text-neon-green" />
                  <span className="text-sm">
                    Deadline: <span className="font-bold">{opportunity.deadline}</span>
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 gradient-bg text-white font-medium hover:scale-105 transition-transform"
                    onClick={() => window.open(opportunity.link, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
