import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();

  const leaders = [
    { rank: 1, name: "Emma L.", xp: 3450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
    { rank: 2, name: "Jordan K.", xp: 3200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
    { rank: 3, name: "Sarah M.", xp: 2980, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { rank: 4, name: "Mike R.", xp: 2750, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
    { rank: 5, name: "Alex P.", xp: 2650, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold gradient-text">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
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
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">Leaderboard</h1>
          <p className="text-xl text-muted-foreground">
            Top contributors & achievers in EduVerse
          </p>
        </motion.div>

        <div className="space-y-4">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 ${
                leader.rank <= 3 ? "border-2 border-neon-green" : ""
              }`}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-16">
                  {getRankIcon(leader.rank)}
                </div>

                <img
                  src={leader.avatar}
                  alt={leader.name}
                  className="w-16 h-16 rounded-full border-4 border-glass-border"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-bold">{leader.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Zap className="w-4 h-4 text-neon-green" />
                    <span className="text-muted-foreground">{leader.xp} XP</span>
                  </div>
                </div>

                {leader.rank <= 3 && (
                  <div className="glass-card px-4 py-2 rounded-xl">
                    <span className="text-sm font-bold gradient-text">TOP {leader.rank}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
