import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { ArrowLeft, Upload, ThumbsUp, Trophy, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Submission {
  id: number;
  title: string;
  creator: string;
  votes: number;
  thumbnail: string;
  isWinner?: boolean;
}

const TalentStage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      title: "Piano Recital Performance",
      creator: "Sarah M.",
      votes: 45,
      thumbnail: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400",
      isWinner: true,
    },
    {
      id: 2,
      title: "Beatbox Freestyle",
      creator: "Mike R.",
      votes: 38,
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    },
    {
      id: 3,
      title: "Dance Choreography",
      creator: "Emma L.",
      votes: 52,
      thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400",
    },
    {
      id: 4,
      title: "Spoken Word Poetry",
      creator: "Jordan K.",
      votes: 29,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  ]);

  const handleVote = (id: number) => {
    setSubmissions(
      submissions.map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s))
    );
    toast({
      title: "Vote Submitted! 🗳️",
      description: "+10 XP earned for community engagement",
    });
  };

  const handleMintNFT = () => {
    setShowConfetti(true);
    toast({
      title: "NFT Trophy Minted! 🏆",
      description: "Your achievement is now on the blockchain!",
    });
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {showConfetti && <Confetti />}

      <div className="container mx-auto max-w-7xl">
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
          <h1 className="text-5xl font-bold gradient-text mb-4">TalentStage</h1>
          <p className="text-xl text-muted-foreground">
            Showcase your talent & vote for the best
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 glass-card p-8 h-fit space-y-6"
          >
            <h2 className="text-2xl font-bold gradient-text">
              Upload Your Talent
            </h2>

            <div className="glass-card p-8 border-2 border-dashed border-glass-border rounded-xl hover:border-primary transition-colors cursor-pointer">
              <input type="file" accept="video/*" className="hidden" id="video-upload" />
              <label
                htmlFor="video-upload"
                className="flex flex-col items-center gap-4 cursor-pointer"
              >
                <Upload className="w-12 h-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">
                    Upload 30-second video
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Max size: 50MB
                  </p>
                </div>
              </label>
            </div>

            <Button className="w-full gradient-bg text-white font-bold py-6 text-lg hover:scale-105 transition-transform">
              <Upload className="w-5 h-5 mr-2" />
              Submit Entry
            </Button>

            {/* Leaderboard */}
            <div className="space-y-4 pt-6 border-t border-glass-border">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Top 3 This Week
              </h3>
              {submissions
                .sort((a, b) => b.votes - a.votes)
                .slice(0, 3)
                .map((sub, index) => (
                  <div
                    key={sub.id}
                    className="glass-card p-4 flex items-center gap-4"
                  >
                    <div className="text-2xl font-bold gradient-text">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{sub.creator}</p>
                      <p className="text-xs text-muted-foreground">{sub.votes} votes</p>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Submissions Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card overflow-hidden group relative"
                >
                  {/* Winner Badge */}
                  {submission.isWinner && (
                    <div className="absolute top-4 right-4 z-10 gradient-bg px-3 py-1 rounded-full flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white">Winner</span>
                    </div>
                  )}

                  {/* Thumbnail */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={submission.thumbnail}
                      alt={submission.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{submission.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {submission.creator}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="glass-card px-4 py-2 rounded-xl">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-neon-green" />
                          <span className="font-bold">{submission.votes}</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleVote(submission.id)}
                        className="gradient-bg text-white font-medium hover:scale-105 transition-transform"
                      >
                        Vote
                      </Button>
                    </div>

                    {submission.isWinner && (
                      <Button
                        onClick={handleMintNFT}
                        className="w-full bg-yellow-500 text-black font-bold hover:bg-yellow-400 hover:scale-105 transition-all"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        Mint NFT Trophy
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentStage;
