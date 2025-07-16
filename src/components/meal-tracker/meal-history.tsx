import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { History, Search, Filter, Calendar } from "lucide-react";
import { MealData } from "./meal-card";

interface MealHistoryProps {
  meals: MealData[];
}

export function MealHistory({ meals }: MealHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "breakfast" | "lunch" | "dinner">("all");

  // Group meals by date
  const groupedMeals = meals.reduce((groups, meal) => {
    const date = new Date().toDateString(); // In real app, would use meal.date
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(meal);
    return groups;
  }, {} as Record<string, MealData[]>);

  const filteredMeals = meals.filter(meal => 
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalNutrition = (meals: MealData[]) => {
    return meals.reduce((total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fats: total.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  return (
    <Card className="shadow-meal-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-health rounded-lg">
            <History className="h-4 w-4 text-health-foreground" />
          </div>
          Meal History
        </CardTitle>
        
        {/* Search and Filter */}
        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {Object.entries(groupedMeals).map(([date, dayMeals]) => {
          const totalNutrition = getTotalNutrition(dayMeals);
          
          return (
            <div key={date} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold">{date}</h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  {totalNutrition.calories} cal
                </Badge>
              </div>

              <div className="grid gap-3">
                {dayMeals
                  .filter(meal => meal.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(meal => (
                  <div 
                    key={meal.id} 
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{meal.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{meal.time}</span>
                        <span>•</span>
                        <span>{meal.calories} cal</span>
                      </div>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="text-nutrition-protein">{meal.protein}p</span>
                      <span className="text-nutrition-carbs">{meal.carbs}c</span>
                      <span className="text-nutrition-fats">{meal.fats}f</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Daily Summary */}
              <div className="flex justify-between items-center p-3 bg-gradient-background rounded-lg border">
                <span className="text-sm font-medium">Daily Total</span>
                <div className="flex gap-4 text-sm">
                  <span className="font-bold">{totalNutrition.calories} cal</span>
                  <span className="text-nutrition-protein">{totalNutrition.protein}g P</span>
                  <span className="text-nutrition-carbs">{totalNutrition.carbs}g C</span>
                  <span className="text-nutrition-fats">{totalNutrition.fats}g F</span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredMeals.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No meals found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}