import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { Upload, Gift, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AidFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableItems = [
    {
      id: 1,
      type: "Textbook",
      title: "AP Chemistry Textbook",
      donor: "0x7a9...f42e",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
      status: "available",
    },
    {
      id: 2,
      type: "Calculator",
      title: "TI-84 Plus CE",
      donor: "0x3b2...891d",
      image: "https://images.unsplash.com/photo-1611174493420-4f36d06c92f5?w=400",
      status: "available",
    },
    {
      id: 3,
      type: "Laptop",
      title: "Dell Chromebook",
      donor: "0x9ef...234a",
      image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400",
      status: "available",
    },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDonate = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast({
      title: "Item Donated! 🎉",
      description: "Your item has been added to the pool. +50 XP earned!",
    });
    setSelectedImage(null);
  };

  const handleClaim = () => {
    setShowConfetti(true);
    toast({
      title: "Item Claimed! 🎊",
      description: "Check your email for pickup details. +25 XP earned!",
    });
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {showConfetti && <Confetti />}

      {/* Header */}
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
            <Gift className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">AidFlow</h1>
          <p className="text-xl text-muted-foreground">
            Share what you have, get what you need
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="available" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 glass-card p-2">
            <TabsTrigger value="available" className="text-base">
              Available Items
            </TabsTrigger>
            <TabsTrigger value="donate" className="text-base">
              Donate Item
            </TabsTrigger>
          </TabsList>

          {/* Available Items Tab */}
          <TabsContent value="available">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {availableItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 glass-card px-3 py-1 text-sm font-medium text-neon-green">
                      {item.type}
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Donated by</span>
                      <span className="font-mono text-neon-green">{item.donor}</span>
                    </div>
                    
                    <Button
                      onClick={handleClaim}
                      className="w-full gradient-bg text-white font-bold hover:scale-105 transition-transform"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Claim Item
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Donate Tab */}
          <TabsContent value="donate">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto glass-card p-8 space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="item-type" className="text-base">
                    Item Type
                  </Label>
                  <Select>
                    <SelectTrigger id="item-type" className="glass-card">
                      <SelectValue placeholder="Select item type" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="textbook">Textbook</SelectItem>
                      <SelectItem value="calculator">Calculator</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="supplies">School Supplies</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-title" className="text-base">
                    Item Title
                  </Label>
                  <Input
                    id="item-title"
                    placeholder="Enter item name"
                    className="glass-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-photo" className="text-base">
                    Upload Photo
                  </Label>
                  <div className="glass-card p-8 border-2 border-dashed border-glass-border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <input
                      id="item-photo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="item-photo"
                      className="flex flex-col items-center gap-4 cursor-pointer"
                    >
                      {selectedImage ? (
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="max-h-48 rounded-xl"
                        />
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-muted-foreground" />
                          <p className="text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <Button
                  onClick={handleDonate}
                  disabled={isSubmitting}
                  className="w-full gradient-bg text-white text-lg py-6 font-bold hover:scale-105 transition-transform"
                >
                  {isSubmitting ? (
                    "Uploading to IPFS..."
                  ) : (
                    <>
                      <Gift className="w-5 h-5 mr-2" />
                      Donate Item
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AidFlow;
