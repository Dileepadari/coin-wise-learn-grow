
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Book, ArrowRight, Gamepad, Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { modules } from '@/data/mockData';

// Define the types for our search results
type SearchResultType = 'module' | 'game' | 'community';

interface SearchResult {
  id: string;
  title: string;
  translation?: string;
  description?: string;
  category?: string;
  type: SearchResultType;
  icon: React.ReactNode;
  color: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  
  // Generate mock search results based on the query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    
    // Filter modules from mockData based on the query
    const filteredModules = modules
      .filter(module => 
        module.name.toLowerCase().includes(query.toLowerCase()) || 
        module.description.toLowerCase().includes(query.toLowerCase()) ||
        module.category.toLowerCase().includes(query.toLowerCase())
      )
      .map(module => ({
        id: module.id,
        title: module.name,
        description: module.description,
        category: module.category,
        type: 'module' as SearchResultType,
        icon: <Book className="h-5 w-5" />,
        color: getCategoryColor(module.category)
      }));
    
    // Mock games results
    const gameResults: SearchResult[] = [
      {
        id: 'financial-simulation',
        title: 'वित्तीय जीवन सिमुलेशन',
        translation: 'Financial Life Simulation',
        type: 'game',
        icon: <Gamepad className="h-5 w-5" />,
        color: 'from-primary to-accent'
      },
      {
        id: 'fraud-detector',
        title: 'धोखा डिटेक्टर',
        translation: 'Fraud Detector',
        type: 'game',
        icon: <Gamepad className="h-5 w-5" />,
        color: 'from-red-500 to-orange-500'
      }
    ].filter(game => 
      game.title.toLowerCase().includes(query.toLowerCase()) || 
      (game.translation && game.translation.toLowerCase().includes(query.toLowerCase()))
    );
    
    // Mock community results
    const communityResults: SearchResult[] = [
      {
        id: 'savings-group',
        title: 'बचत समूह',
        translation: 'Savings Group',
        type: 'community',
        icon: <Users className="h-5 w-5" />,
        color: 'from-green-500 to-emerald-400'
      },
      {
        id: 'investment-club',
        title: 'निवेश क्लब',
        translation: 'Investment Club',
        type: 'community',
        icon: <Users className="h-5 w-5" />,
        color: 'from-blue-500 to-cyan-400'
      }
    ].filter(community => 
      community.title.toLowerCase().includes(query.toLowerCase()) || 
      (community.translation && community.translation.toLowerCase().includes(query.toLowerCase()))
    );
    
    // Combine all results
    setResults([...filteredModules, ...gameResults, ...communityResults]);
  }, [query]);
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'savings': return 'from-green-500 to-emerald-400';
      case 'investment': return 'from-blue-500 to-cyan-400';
      case 'fraud': return 'from-red-500 to-orange-500';
      case 'borrowing': return 'from-amber-500 to-yellow-400';
      case 'basics': 
      default: return 'from-purple-500 to-indigo-400';
    }
  };
  
  const handleResultClick = (result: SearchResult) => {
    switch(result.type) {
      case 'module':
        navigate(`/learn/module/${result.id}`);
        break;
      case 'game':
        navigate(`/games/${result.id}`);
        break;
      case 'community':
        navigate(`/community`);
        break;
    }
  };

  const handleback = () => {
    navigate(-1);
  };
  
  const getCategoryEmoji = (category?: string) => {
    if (!category) return '📚';
    
    switch(category) {
      case 'savings': return '💰';
      case 'investment': return '📈';
      case 'fraud': return '🛡️';
      case 'borrowing': return '🏦';
      case 'basics': return '📚';
      default: return '💡';
    }
  };
  
  const renderResultIcon = (result: SearchResult) => {
    switch(result.type) {
      case 'module':
        return <Badge className="bg-primary text-white">{getCategoryEmoji(result.category)} Module</Badge>;
      case 'game':
        return <Badge className="bg-secondary text-white">🎮 Game</Badge>;
      case 'community':
        return <Badge className="bg-accent text-white">👥 Community</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container px-4 pt-2 pb-20 max-w-lg mx-auto">
      <div className="relative flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={handleback}>
              <ArrowLeft className="h-5 w-5" />
          </Button>
        <h1 className="text-2xl font-bold text-primary">खोजें (Search)</h1>
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            className="pl-10 bg-white shadow-sm"
            placeholder="खोजें... Search anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        {!query && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">सुझाव (Suggestions)</h2>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => setQuery('बचत')}
              >
                💰 बचत (Savings)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => setQuery('निवेश')}
              >
                📈 निवेश (Investment)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => setQuery('धोखाधड़ी')}
              >
                🛡️ धोखाधड़ी से बचाव (Fraud Protection)
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left"
                onClick={() => setQuery('लोन')}
              >
                🏦 लोन (Loan)
              </Button>
            </div>
          </div>
        )}
        
        {query && results.length === 0 ? (
          <div className="mt-8 text-center py-8">
            <p className="text-muted-foreground">कोई परिणाम नहीं मिला</p>
            <p className="text-sm text-muted-foreground">No results found</p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {results.map((result) => (
              <Card 
                key={`${result.type}-${result.id}`}
                className="hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{result.title}</h3>
                      {result.translation && (
                        <p className="text-xs text-muted-foreground">{result.translation}</p>
                      )}
                      {result.description && (
                        <p className="text-sm mt-1 line-clamp-2">
                          {result.description}
                        </p>
                      )}
                    </div>
                    <div>
                      {renderResultIcon(result)}
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button size="sm" className="gap-1">
                      <span>देखें (View)</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
