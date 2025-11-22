import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Gift, 
  HelpCircle, 
  Mic, 
  Briefcase, 
  Trophy, 
  GraduationCap,
  Wallet,
  Coins,
  Zap,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3Auth } from "@/contexts/Web3AuthContext";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useWeb3Auth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  const features = [
    {
      icon: Gift,
      title: "AidFlow",
      description: "Donate items or claim what you need",
      color: "from-purple-500 to-pink-500",
      route: "/aidflow",
    },
    {
      icon: HelpCircle,
      title: "HelpDesk",
      description: "Get AI & peer homework answers",
      color: "from-indigo-500 to-purple-500",
      route: "/helpdesk",
    },
    {
      icon: Mic,
      title: "TalentStage",
      description: "Upload & vote on talent videos",
      color: "from-pink-500 to-rose-500",
      route: "/talentstage",
    },
    {
      icon: Briefcase,
      title: "Portfolio",
      description: "Mint your dynamic NFT resume",
      color: "from-violet-500 to-purple-500",
      route: "/portfolio",
    },
    {
      icon: Trophy,
      title: "Opportunities",
      description: "Discover hackathons & scholarships",
      color: "from-cyan-500 to-blue-500",
      route: "/opportunities",
    },
    {
      icon: GraduationCap,
      title: "Leaderboard",
      description: "See top contributors & achievers",
      color: "from-green-500 to-emerald-500",
      route: "/leaderboard",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="glass-card m-4 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="gradient-bg p-2 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">EduVerse</span>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card px-4 py-2 flex items-center gap-2"
            >
              <Wallet className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-mono">
                {user?.walletAddress ? `${user.walletAddress.slice(0, 6)}...${user.walletAddress.slice(-4)}` : "0x7a9...f42e"}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card px-4 py-2 flex items-center gap-2"
            >
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-bold">250 $EDU</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card px-4 py-2 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-bold">1,850 XP</span>
            </motion.div>

            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3"
              >
                <Avatar className="w-10 h-10 border-2 border-neon-green">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4">
            Welcome Back, {user?.name || "Student"}!
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your next adventure in the EduVerse
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group cursor-pointer"
              onClick={() => navigate(feature.route)}
            >
              <div className="glass-card p-8 h-full relative overflow-hidden">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:gradient-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  <div className="w-10 h-10 rounded-full bg-neon-green flex items-center justify-center">
                    <span className="text-background text-xl">→</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
