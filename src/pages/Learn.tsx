
import Layout from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import ModuleCard from "@/components/modules/ModuleCard";

export default function Learn() {
  const { allModules } = useApp();
  
  // Group modules by category
  const categorizedModules = allModules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, typeof allModules>);
  
  // Get categories in a specific order
  const categories = ["basics", "savings", "investment", "fraud", "borrowing"];
  
  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'basics': return 'Financial Basics';
      case 'savings': return 'Saving Strategies';
      case 'investment': return 'Investment 101';
      case 'fraud': return 'Fraud Detection';
      case 'borrowing': return 'Responsible Borrowing';
      default: return category;
    }
  };
  
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'basics': return '📚';
      case 'savings': return '💰';
      case 'investment': return '📈';
      case 'fraud': return '🛡️';
      case 'borrowing': return '🏦';
      default: return '💡';
    }
  };
  
  return (
    <Layout>
      <div className="container px-4 pb-10">
        <div className="py-6">
          <h1 className="text-2xl font-bold">Learning Modules</h1>
          <p className="text-muted-foreground">Learn financial skills step by step</p>
        </div>
        
        <div className="space-y-8">
          {categories.map(category => {
            const modules = categorizedModules[category] || [];
            if (modules.length === 0) return null;
            
            return (
              <div key={category}>
                <div className="flex items-center mb-3">
                  <span className="mr-2 text-xl">{getCategoryEmoji(category)}</span>
                  <h2 className="text-lg font-semibold">{getCategoryTitle(category)}</h2>
                </div>
                
                <div className="space-y-3">
                  {modules.map(module => (
                    <ModuleCard key={module.id} module={module} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
