import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { ArrowLeft, Award, Zap, Gift, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const stats = {
    xp: 1850,
    itemsDonated: 12,
    talentWins: 3,
    helpfulAnswers: 27,
  };

  const skills = ["React", "Python", "Math", "Public Speaking", "Piano"];
  const achievements = [
    { icon: Trophy, title: "Top Contributor", color: "text-yellow-400" },
    { icon: Gift, title: "Generous Donor", color: "text-pink-400" },
    { icon: Award, title: "Talent Winner", color: "text-purple-400" },
    { icon: Sparkles, title: "AI Helper", color: "text-cyan-400" },
  ];

  const handleMintNFT = () => {
    setShowConfetti(true);
    setIsMinted(true);
    toast({
      title: "NFT Resume Minted! 🎉",
      description: "Your dynamic resume is now on the blockchain!",
    });
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {showConfetti && <Confetti />}

      <div className="container mx-auto max-w-5xl">
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
            <Award className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">
            NFT Portfolio
          </h1>
          <p className="text-xl text-muted-foreground">
            Your dynamic blockchain resume
          </p>
        </motion.div>

        {/* NFT Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 mb-8 relative overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 gradient-bg opacity-10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-full h-full gradient-bg blur-3xl opacity-20"
          />

          <div className="relative z-10 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-2">
                  Student #0x7a9f42e
                </h2>
                <p className="text-muted-foreground">EduVerse Member Since 2025</p>
              </div>
              <div className="glass-card px-6 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-neon-green" />
                  <span className="text-2xl font-bold">{stats.xp} XP</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Items Donated", value: stats.itemsDonated, icon: Gift },
                { label: "Talent Wins", value: stats.talentWins, icon: Trophy },
                { label: "Helpful Answers", value: stats.helpfulAnswers, icon: Sparkles },
                { label: "Total XP", value: stats.xp, icon: Zap },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-neon-green" />
                  <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-bold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <motion.div
                    key={skill}
                    whileHover={{ scale: 1.1 }}
                    className="glass-card px-6 py-3 rounded-2xl font-medium gradient-text"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xl font-bold mb-4">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.title}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="glass-card p-6 text-center"
                  >
                    <achievement.icon className={`w-12 h-12 mx-auto mb-2 ${achievement.color}`} />
                    <p className="text-sm font-medium">{achievement.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mint Button */}
            {!isMinted ? (
              <Button
                onClick={handleMintNFT}
                size="lg"
                className="w-full gradient-bg text-white text-xl py-8 font-bold hover:scale-105 transition-transform glow-effect"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Mint Dynamic NFT Resume
              </Button>
            ) : (
              <div className="glass-card p-6 text-center space-y-4 border-2 border-neon-green">
                <div className="flex items-center justify-center gap-2 text-neon-green">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-xl font-bold">NFT Minted Successfully!</span>
                  <Sparkles className="w-6 h-6" />
                </div>
                <p className="text-muted-foreground">
                  Your dynamic resume NFT is now on the blockchain and will update automatically with your achievements.
                </p>
                <div className="inline-block glass-card px-6 py-3 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Token ID</p>
                  <p className="font-mono font-bold gradient-text">
                    #EDU-RESUME-2025-001
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
