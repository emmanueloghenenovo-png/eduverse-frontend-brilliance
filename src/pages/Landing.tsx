import { motion } from "framer-motion";
import { Rocket, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg opacity-90" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-green rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-5xl"
        >
          {/* Logo Animation */}
          <motion.div
            animate={floatingAnimation}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 gradient-bg blur-3xl opacity-50 rounded-full glow-effect" />
              <Rocket className="w-24 h-24 text-neon-green relative z-10" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold gradient-text leading-tight"
          >
            EduVerse
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-xl md:text-2xl text-muted-foreground"
          >
            <Sparkles className="w-6 h-6 text-neon-green" />
            <span>Education on Blockchain</span>
            <Sparkles className="w-6 h-6 text-neon-green" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed"
          >
            Donate items • Get AI homework help • Showcase talent • Mint NFT resume
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-8"
          >
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="gradient-bg text-white text-xl px-12 py-8 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-transform duration-300 glow-effect group"
            >
              <span className="flex items-center gap-3">
                Login with Gmail
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            {["Blockchain-Powered", "AI-Enhanced", "NFT Resumes", "Community-Driven"].map((feature) => (
              <div
                key={feature}
                className="glass-card px-6 py-3 text-sm font-medium text-neon-green"
              >
                {feature}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 w-full py-8 text-center text-sm text-muted-foreground"
      >
        <p>© 2025 EduVerse • Built for Grizzly Hacks 2025</p>
      </motion.footer>
    </div>
  );
};

export default Landing;
