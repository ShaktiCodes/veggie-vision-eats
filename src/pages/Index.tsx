import { useState } from "react";
import { Header } from "@/components/meal-tracker/header";
import { UploadZone } from "@/components/meal-tracker/upload-zone";
import { NutritionCard } from "@/components/meal-tracker/nutrition-card";
import { MealCard, MealData } from "@/components/meal-tracker/meal-card";
import { MealHistory } from "@/components/meal-tracker/meal-history";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Brain, Sparkles, TrendingUp, Zap } from "lucide-react";
import heroImage from "@/assets/hero-meal.jpg";

const Index = () => {
  const { toast } = useToast();
  const [meals, setMeals] = useState<MealData[]>([
    {
      id: "1",
      image: heroImage,
      name: "Grilled Chicken Quinoa Bowl",
      time: "12:30 PM",
      calories: 485,
      protein: 32,
      carbs: 48,
      fats: 14,
      confidence: 87
    }
  ]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Calculate total nutrition for today
  const todayNutrition = meals.reduce((total, meal) => ({
    calories: total.calories + meal.calories,
    protein: total.protein + meal.protein,
    carbs: total.carbs + meal.carbs,
    fats: total.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    // Create image URL for display
    const imageUrl = URL.createObjectURL(file);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI analysis results
    const mockResults = [
      { name: "Caesar Salad with Grilled Chicken", calories: 420, protein: 28, carbs: 15, fats: 26, confidence: 92 },
      { name: "Avocado Toast with Eggs", calories: 350, protein: 18, carbs: 28, fats: 20, confidence: 88 },
      { name: "Protein Smoothie Bowl", calories: 380, protein: 25, carbs: 45, fats: 12, confidence: 85 },
      { name: "Grilled Salmon with Vegetables", calories: 450, protein: 35, carbs: 12, fats: 28, confidence: 90 }
    ];
    
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMeal: MealData = {
      id: Date.now().toString(),
      image: imageUrl,
      time: currentTime,
      ...randomResult
    };
    
    setMeals(prev => [newMeal, ...prev]);
    setIsAnalyzing(false);
    
    toast({
      title: "Meal analyzed! 🎉",
      description: `Found ${newMeal.name} with ${newMeal.calories} calories`,
    });
  };

  const handleMealUpdate = (updatedMeal: MealData) => {
    setMeals(prev => prev.map(meal => 
      meal.id === updatedMeal.id ? updatedMeal : meal
    ));
    toast({
      title: "Meal updated",
      description: "Your meal information has been saved",
    });
  };

  const handleMealDelete = (mealId: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== mealId));
    toast({
      title: "Meal deleted",
      description: "Meal removed from your log",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI-Powered Nutrition Tracking
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload photos of your meals and get instant calorie and macro analysis powered by advanced AI
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              <Zap className="h-3 w-3 mr-1" />
              Instant Analysis
            </Badge>
            <Badge variant="secondary" className="bg-health/10 text-health border-health/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              Track Progress
            </Badge>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              <Brain className="h-3 w-3 mr-1" />
              Smart Insights
            </Badge>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto">
          {isAnalyzing ? (
            <Card className="shadow-meal-card">
              <CardContent className="p-8 text-center space-y-4">
                <div className="relative mx-auto w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-primary rounded-full animate-ping opacity-20"></div>
                  <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full">
                    <Brain className="h-8 w-8 text-primary-foreground animate-pulse" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Analyzing your meal...</h3>
                  <p className="text-muted-foreground">Our AI is identifying ingredients and calculating nutrition</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <UploadZone onImageUpload={handleImageUpload} />
          )}
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Nutrition Overview */}
          <div className="lg:col-span-1">
            <NutritionCard nutrition={todayNutrition} />
          </div>

          {/* Meal History */}
          <div className="lg:col-span-2">
            <MealHistory meals={meals} />
          </div>
        </div>

        {/* Today's Meals */}
        {meals.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Today's Meals</h2>
              <Badge variant="outline">{meals.length} meal{meals.length !== 1 ? 's' : ''}</Badge>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {meals.map(meal => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onUpdate={handleMealUpdate}
                  onDelete={handleMealDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {meals.length === 0 && !isAnalyzing && (
          <Card className="shadow-meal-card">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center opacity-20">
                <Brain className="h-10 w-10 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to track your first meal?</h3>
                <p className="text-muted-foreground mb-6">
                  Upload a photo and let our AI analyze the nutrition content for you
                </p>
                <Button className="bg-gradient-primary hover:shadow-glow">
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
