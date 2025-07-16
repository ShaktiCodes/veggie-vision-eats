import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Target } from "lucide-react";

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

interface NutritionCardProps {
  nutrition: NutritionData;
  dailyGoals?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

export function NutritionCard({ nutrition, dailyGoals }: NutritionCardProps) {
  const goals = dailyGoals || {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65
  };

  const getProgress = (current: number, goal: number) => (current / goal) * 100;

  return (
    <Card className="shadow-meal-card hover:shadow-floating transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 bg-gradient-primary rounded-lg">
            <Flame className="h-4 w-4 text-primary-foreground" />
          </div>
          Today's Nutrition
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calories */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium">Calories</span>
            <span className="text-sm text-muted-foreground">
              {nutrition.calories} / {goals.calories}
            </span>
          </div>
          <Progress 
            value={getProgress(nutrition.calories, goals.calories)} 
            className="h-2"
          />
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-4">
          {/* Protein */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-nutrition-protein"></div>
              <span className="text-sm font-medium">Protein</span>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-nutrition-protein">
                {nutrition.protein}g
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.round(getProgress(nutrition.protein, goals.protein))}%
              </div>
            </div>
          </div>

          {/* Carbs */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-nutrition-carbs"></div>
              <span className="text-sm font-medium">Carbs</span>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-nutrition-carbs">
                {nutrition.carbs}g
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.round(getProgress(nutrition.carbs, goals.carbs))}%
              </div>
            </div>
          </div>

          {/* Fats */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-nutrition-fats"></div>
              <span className="text-sm font-medium">Fats</span>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-nutrition-fats">
                {nutrition.fats}g
              </div>
              <div className="text-xs text-muted-foreground">
                {Math.round(getProgress(nutrition.fats, goals.fats))}%
              </div>
            </div>
          </div>
        </div>

        {/* Goals indicator */}
        <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
          <Target className="h-3 w-3" />
          <span>Daily goals based on 2000 cal diet</span>
        </div>
      </CardContent>
    </Card>
  );
}