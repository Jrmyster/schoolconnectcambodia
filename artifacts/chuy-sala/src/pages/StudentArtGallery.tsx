import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Upload, 
  Plus, 
  Heart, 
  Star, 
  ThumbsUp, 
  Smile, 
  Sparkles, 
  ArrowLeft,
  ShieldCheck,
  Image as ImageIcon,
  Send,
  X
} from "lucide-react";
import { Link } from "wouter";
import { useLanguageStore } from "@/store/use-language";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ArtItem {
  id: string;
  title: string;
  description: string;
  studentName: string;
  imageUrl: string;
  reactions: {
    love: number;
    star: number;
    clap: number;
    art: number;
    wow: number;
  };
  timestamp: number;
}

const INITIAL_ART: ArtItem[] = [
  {
    id: "1",
    title: "Bamboo Weaving Harmony",
    description: "A traditional bamboo weaving pattern representing the connection between nature and craftsmanship in rural Cambodia.",
    studentName: "Sokha Mean",
    imageUrl: "/art/bamboo_weaving_student_art_1778654020696.png",
    reactions: { love: 12, star: 8, clap: 15, art: 5, wow: 3 },
    timestamp: Date.now() - 86400000 * 2,
  },
  {
    id: "2",
    title: "Angkor Clay Vessel",
    description: "Hand-molded clay pot inspired by the ancient pottery found near the Siem Reap river banks.",
    studentName: "Dara Pen",
    imageUrl: "/art/clay_pottery_student_art_1778654039402.png",
    reactions: { love: 24, star: 10, clap: 7, art: 12, wow: 9 },
    timestamp: Date.now() - 86400000,
  }
];

export default function StudentArtGallery() {
  const language = useLanguageStore((s) => s.language);
  const kh = language === "kh";
  const { toast } = useToast();

  const [items, setItems] = useState<ArtItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newName, setNewName] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("student_art_gallery");
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      setItems(INITIAL_ART);
    }
  }, []);

  const saveToStorage = (newItems: ArtItem[]) => {
    localStorage.setItem("student_art_gallery", JSON.stringify(newItems));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReaction = (itemId: string, type: keyof ArtItem["reactions"]) => {
    const updated = items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          reactions: {
            ...item.reactions,
            [type]: item.reactions[type] + 1
          }
        };
      }
      return item;
    });
    setItems(updated);
    saveToStorage(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple "Security" check
    if (!studentId.startsWith("SC-")) {
      toast({
        title: kh ? "លេខសម្គាល់សិស្សមិនត្រឹមត្រូវ" : "Invalid Student ID",
        description: kh ? "សូមប្រើលេខសម្គាល់ដែលចាប់ផ្តើមដោយ 'SC-'" : "Please use an ID starting with 'SC-'",
        variant: "destructive"
      });
      return;
    }

    if (!selectedFile || !newTitle || !newDesc || !newName) {
      toast({
        title: kh ? "ព័ត៌មានមិនគ្រប់គ្រាន់" : "Missing Information",
        description: kh ? "សូមបំពេញគ្រប់ប្រអប់ និងជ្រើសរើសរូបភាព" : "Please fill all fields and select an image",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newItem: ArtItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: newTitle,
        description: newDesc,
        studentName: newName,
        imageUrl: selectedFile,
        reactions: { love: 0, star: 0, clap: 0, art: 0, wow: 0 },
        timestamp: Date.now(),
      };

      const updated = [newItem, ...items];
      setItems(updated);
      saveToStorage(updated);
      setIsUploading(false);
      setIsModalOpen(false);
      
      // Reset form
      setNewTitle("");
      setNewDesc("");
      setNewName("");
      setSelectedFile(null);
      setStudentId("");

      toast({
        title: kh ? "ការបង្ហោះបានជោគជ័យ!" : "Upload Successful!",
        description: kh ? "ស្នាដៃរបស់អ្នកត្រូវបានបន្ថែមទៅក្នុងវិចិត្រសាល" : "Your masterpiece has been added to the gallery",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pb-20 overflow-x-hidden">
      {/* --- Decorative Background Elements --- */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-amber-200 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-emerald-100 blur-[100px]" />
      </div>

      {/* --- Navigation --- */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">{kh ? "ត្រឡប់ក្រោយ" : "Back"}</span>
          </Link>
          
          <div className="flex items-center gap-2 text-amber-600 font-display font-bold text-lg">
            <Palette className="w-6 h-6" />
            <span>{kh ? "វិចិត្រសាលសិល្បៈ" : "Student Art Gallery"}</span>
          </div>

          <div className="w-20" /> {/* Spacer */}
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="max-w-7xl mx-auto px-4 pt-12 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{kh ? "ពិព័រណ៍និម្មិត" : "VIRTUAL EXHIBITION"}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black text-slate-900 leading-tight mb-4">
            {kh ? (
              <span className="font-khmer">សារមន្ទីរឌីជីថលសម្រាប់ <span className="text-amber-600">សិស្ស</span></span>
            ) : (
              <>Digital Museum for <span className="text-amber-600 italic">Students</span></>
            )}
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 mb-10">
            {kh 
              ? "ចូលរួមអបអរសាទរការច្នៃប្រឌិត និងសិល្បៈរបស់មិត្តរួមថ្នាក់។ ចែករំលែកស្នាដៃរបស់អ្នក និងផ្ដល់ការលើកទឹកចិត្តដល់អ្នកដទៃ។"
              : "Celebrate the creativity and craftsmanship of your fellow students. Share your own masterpieces and leave encouraging reactions."}
          </p>

          {/* --- Secure Upload Button --- */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 py-6 h-auto text-lg shadow-xl shadow-slate-200 group">
                <Plus className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform" />
                {kh ? "ដាក់បង្ហាញស្នាដៃ" : "Submit Your Masterpiece"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-0 shadow-2xl overflow-hidden p-0">
              <div className="bg-slate-900 text-white p-6 pb-12 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">{kh ? "ការដាក់ស្នើមានសុវត្ថិភាព" : "SECURE SUBMISSION"}</span>
                </div>
                <h2 className="text-2xl font-display font-black relative z-10">
                  {kh ? "ដាក់ស្នើសិល្បៈរបស់អ្នក" : "Submit Your Art"}
                </h2>
                <p className="text-slate-400 text-sm mt-1 relative z-10">
                  {kh ? "បំពេញព័ត៌មានខាងក្រោមដើម្បីបង្ហាញស្នាដៃរបស់អ្នក" : "Fill in the details to showcase your work"}
                </p>
              </div>

              <div className="p-6 -mt-8 bg-white rounded-t-[2rem] relative z-20">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">{kh ? "លេខសម្គាល់សិស្ស" : "Student ID (e.g., SC-123)"}</label>
                    <Input 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="SC-XXXX" 
                      className="rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all h-12"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">{kh ? "ឈ្មោះពេញ" : "Full Name"}</label>
                      <Input 
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={kh ? "ឈ្មោះរបស់អ្នក" : "Your Name"} 
                        className="rounded-xl border-slate-100 bg-slate-50 h-12"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 uppercase ml-1">{kh ? "ចំណងជើង" : "Title"}</label>
                      <Input 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder={kh ? "ឈ្មោះស្នាដៃ" : "Art Title"} 
                        className="rounded-xl border-slate-100 bg-slate-50 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">{kh ? "ការពិពណ៌នា" : "Description (English)"}</label>
                    <Textarea 
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      placeholder={kh ? "រៀបរាប់អំពីស្នាដៃរបស់អ្នក..." : "Describe your process and materials..."} 
                      className="rounded-xl border-slate-100 bg-slate-50 resize-none min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">{kh ? "រូបថតស្នាដៃ" : "Photo of Craft"}</label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden" 
                        id="art-upload" 
                      />
                      <label 
                        htmlFor="art-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-amber-400 hover:bg-amber-50 transition-all overflow-hidden"
                      >
                        {selectedFile ? (
                          <img src={selectedFile} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-slate-300 group-hover:text-amber-500 mb-2" />
                            <span className="text-xs font-medium text-slate-500">{kh ? "ចុចដើម្បីជ្រើសរើសរូបភាព" : "Tap to select photo"}</span>
                          </>
                        )}
                      </label>
                      {selectedFile && (
                        <button 
                          onClick={() => setSelectedFile(null)}
                          className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isUploading}
                    className="w-full h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-amber-100 mt-2"
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <motion.div 
                          animate={{ rotate: 360 }} 
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.div>
                        {kh ? "កំពុងបង្ហោះ..." : "Publishing..."}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        {kh ? "បោះពុម្ពផ្សាយ" : "Publish to Museum"}
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </header>

      {/* --- Art Museum Grid --- */}
      <main className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="border-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] hover:-translate-y-2">
                  <CardContent className="p-0">
                    {/* Art Frame Area */}
                    <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden group-hover:scale-[1.02] transition-transform duration-700">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Premium Label Overlay */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-white/20 rounded-full shadow-lg flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-black tracking-widest text-slate-800 uppercase">{kh ? "ពិព័រណ៍" : "EXHIBITED"}</span>
                        </div>
                      </div>

                      {/* Info Overlay on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                        <p className="text-sm font-medium text-slate-300 italic mb-1">{kh ? "សិល្បករ៖" : "Artist:"}</p>
                        <p className="text-xl font-display font-black leading-tight uppercase tracking-wide">{item.studentName}</p>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-display font-black text-slate-900 leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs font-bold text-amber-600 mt-1 uppercase tracking-tighter">
                            {kh ? "ដោយ " : "By "}{item.studentName}
                          </p>
                        </div>
                        <Palette className="w-5 h-5 text-slate-200" />
                      </div>
                      
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>

                      {/* --- Emoji Reaction Bar --- */}
                      <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-50">
                        <ReactionButton 
                          icon={<Heart className="w-4 h-4" />} 
                          count={item.reactions.love} 
                          onClick={() => handleReaction(item.id, "love")}
                          color="hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100"
                        />
                        <ReactionButton 
                          icon={<Star className="w-4 h-4" />} 
                          count={item.reactions.star} 
                          onClick={() => handleReaction(item.id, "star")}
                          color="hover:bg-amber-50 hover:text-amber-600 hover:border-amber-100"
                        />
                        <ReactionButton 
                          icon={<ThumbsUp className="w-4 h-4" />} 
                          count={item.reactions.clap} 
                          onClick={() => handleReaction(item.id, "clap")}
                          color="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100"
                        />
                        <ReactionButton 
                          icon={<Palette className="w-4 h-4" />} 
                          count={item.reactions.art} 
                          onClick={() => handleReaction(item.id, "art")}
                          color="hover:bg-violet-50 hover:text-violet-600 hover:border-violet-100"
                        />
                        <ReactionButton 
                          icon={<Smile className="w-4 h-4" />} 
                          count={item.reactions.wow} 
                          onClick={() => handleReaction(item.id, "wow")}
                          color="hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-100"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{kh ? "មិនទាន់មានសិល្បៈនៅឡើយ" : "No art pieces yet"}</h3>
            <p className="text-slate-500 mt-2">{kh ? "ក្លាយជាអ្នកដំបូងដែលដាក់បង្ហាញស្នាដៃរបស់អ្នក!" : "Be the first to showcase your masterpiece!"}</p>
          </div>
        )}
      </main>

      {/* --- Footer Note --- */}
      <footer className="max-w-7xl mx-auto px-4 mt-32 text-center border-t border-slate-100 pt-12">
        <p className="text-slate-400 text-sm italic">
          {kh 
            ? "ស្នាដៃទាំងអស់ត្រូវបានពិនិត្យដើម្បីសុវត្ថិភាពសហគមន៍។"
            : "All submissions are reviewed for community safety."}
        </p>
      </footer>
    </div>
  );
}

function ReactionButton({ 
  icon, 
  count, 
  onClick, 
  color 
}: { 
  icon: React.ReactNode; 
  count: number; 
  onClick: () => void;
  color: string;
}) {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={() => {
        onClick();
        setClicked(true);
        setTimeout(() => setClicked(false), 300);
      }}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-transparent text-slate-600 text-xs font-bold transition-all ${color} active:scale-90`}
    >
      <motion.span
        animate={clicked ? { scale: [1, 1.5, 1], rotate: [0, 15, -15, 0] } : {}}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.span>
      <span>{count}</span>
    </button>
  );
}
