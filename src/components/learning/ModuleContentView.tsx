import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LearningContent, Quiz } from '@/types';
import { motion } from 'framer-motion';
import { CheckCircle, ThumbsUp, Video, FileText, BookOpen } from 'lucide-react';
import { fadeInUp, scaleIn } from '@/utils/animations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useSpringMotionValue } from '@/utils/framerMotionUtils';

interface ModuleContentViewProps {
  content: LearningContent | Quiz;
  onComplete: () => void;
  moduleCategory: string;
  completed?: boolean;
}

export default function ModuleContentView({
  content,
  onComplete,
  moduleCategory,
  completed = false
}: ModuleContentViewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("video");
  
  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    
    setIsAnswered(true);
    if ('correctAnswer' in content && selectedAnswer === content.correctAnswer) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };
  
  const handleContentComplete = () => {
    onComplete();
  };
  
  const handleAnswerSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };
  
  // Handle different content types
  if ('type' in content && content.type === 'quiz') {
    return (
      <div className="py-2">
        <motion.h3 
          className="text-xl font-semibold mb-6"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {content.question}
        </motion.h3>
        
        <motion.div 
          className="space-y-4"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {content.options.map((option, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              custom={index}
              transition={{ delay: index * 0.1 }}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              className={`p-4 border rounded-md cursor-pointer transition-colors ${
                selectedAnswer === index
                  ? isAnswered
                    ? index === content.correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-primary/10 border-primary'
                  : 'bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && index === content.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {isAnswered && (
          <motion.div 
            className="mt-6 p-4 bg-gray-50 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-medium">
              {selectedAnswer === content.correctAnswer ? (
                <span className="text-green-600">सही जवाब! बधाई हो! 🎉</span>
              ) : (
                <span className="text-red-600">गलत जवाब। फिर से कोशिश करें!</span>
              )}
            </p>
            <p className="mt-2 text-muted-foreground">{content.explanation}</p>
          </motion.div>
        )}
        
        <motion.div 
          className="mt-6 flex justify-end"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          {!isAnswered ? (
            <Button onClick={handleQuizSubmit} disabled={selectedAnswer === null}>
              जवाब जमा करें
            </Button>
          ) : selectedAnswer === content.correctAnswer ? (
            <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              अगले पाठ पर जाएं
            </Button>
          ) : (
            <Button onClick={() => {setIsAnswered(false); setSelectedAnswer(null)}} variant="outline">
              फिर से कोशिश करें
            </Button>
          )}
        </motion.div>
      </div>
    );
  }
  
  // For non-quiz content (video, text, infographic)
  const contentItem = content as LearningContent;
  
  const getTabsForContentType = () => {
    const tabs = [];
    
    if (contentItem.videoUrl) {
      tabs.push({
        id: "video",
        label: "वीडियो",
        icon: <Video className="h-4 w-4" />
      });
    }
    
    if (contentItem.theoryContent) {
      tabs.push({
        id: "theory",
        label: "सिद्धांत",
        icon: <FileText className="h-4 w-4" />
      });
    }
    
    if (contentItem.storyContent) {
      tabs.push({
        id: "story",
        label: "कहानी",
        icon: <BookOpen className="h-4 w-4" />
      });
    }
    
    return tabs;
  };
  
  const availableTabs = getTabsForContentType();
  
  // Set default active tab if current one is not available
  if (availableTabs.length > 0 && !availableTabs.find(tab => tab.id === activeTab)) {
    setActiveTab(availableTabs[0].id);
  }
  
  return (
    <div className="py-2">
      <motion.h2 
        className="text-xl font-semibold mb-4"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {contentItem.title}
      </motion.h2>
      
      <motion.p 
        className="text-muted-foreground mb-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        custom={1}
      >
        {contentItem.content}
      </motion.p>
      
      {availableTabs.length > 0 && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {availableTabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {contentItem.videoUrl && (
            <TabsContent value="video">
              <motion.div
                variants={scaleIn}
                initial="initial"
                animate="animate"
              >
                <Card className="overflow-hidden mb-4">
                  <AspectRatio ratio={16/9}>
                    <iframe 
                      src={contentItem.videoUrl} 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </AspectRatio>
                </Card>
              </motion.div>
            </TabsContent>
          )}
          
          {contentItem.theoryContent && (
            <TabsContent value="theory">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <Card className="p-4">
                  <div className="prose max-w-none">
                    <p className="text-base leading-relaxed">{contentItem.theoryContent}</p>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          )}
          
          {contentItem.storyContent && (
            <TabsContent value="story">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <Card className="p-4 border-2 border-amber-200 bg-amber-50">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-medium mb-2">एक वास्तविक कहानी</h3>
                    <p className="text-base leading-relaxed italic">{contentItem.storyContent}</p>
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
          )}
        </Tabs>
      )}
      
      {contentItem.mediaUrl && contentItem.type === 'infographic' && (
        <motion.div
          variants={scaleIn}
          initial="initial"
          animate="animate"
          className="my-6"
        >
          <Card className="overflow-hidden">
            <AspectRatio ratio={16/9}>
              <img 
                src={contentItem.mediaUrl} 
                alt={contentItem.title}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </Card>
        </motion.div>
      )}
      
      <motion.div 
        className="mt-8 flex justify-end"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        custom={3}
      >
        {completed ? (
          <div className="flex items-center text-green-600 font-medium">
            <CheckCircle className="mr-2 h-5 w-5" />
            आपने यह पाठ पूरा कर लिया है!
          </div>
        ) : (
          <Button onClick={handleContentComplete} className="gap-2">
            <ThumbsUp className="h-4 w-4" />
            समझ गया, आगे बढ़ें
          </Button>
        )}
      </motion.div>
    </div>
  );
}
