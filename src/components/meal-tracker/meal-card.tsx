import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Edit2, Check, X, Clock, Utensils } from "lucide-react";

export interface MealData {
  id: string;
  image: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  confidence: number;
}

interface MealCardProps {
  meal: MealData;
  onUpdate: (meal: MealData) => void;
  onDelete: (id: string) => void;
}

export function MealCard({ meal, onUpdate, onDelete }: MealCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMeal, setEditedMeal] = useState(meal);

  const handleSave = () => {
    onUpdate(editedMeal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedMeal(meal);
    setIsEditing(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card className="overflow-hidden shadow-meal-card hover:shadow-floating transition-all duration-300 group">
      <div className="relative">
        <img 
          src={meal.image} 
          alt={meal.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            <Clock className="h-3 w-3 mr-1" />
            {meal.time}
          </Badge>
          <Badge 
            variant="secondary" 
            className={`bg-background/80 backdrop-blur-sm ${getConfidenceColor(meal.confidence)}`}
          >
            {meal.confidence}% sure
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Meal Name */}
        <div className="flex items-center gap-2">
          <Utensils className="h-4 w-4 text-muted-foreground" />
          {isEditing ? (
            <Input
              value={editedMeal.name}
              onChange={(e) => setEditedMeal({ ...editedMeal, name: e.target.value })}
              className="flex-1"
            />
          ) : (
            <h3 className="font-semibold text-lg flex-1">{meal.name}</h3>
          )}
        </div>

        {/* Nutrition Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Calories</span>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedMeal.calories}
                  onChange={(e) => setEditedMeal({ ...editedMeal, calories: parseInt(e.target.value) || 0 })}
                  className="w-16 h-6 text-xs"
                />
              ) : (
                <span className="font-bold text-primary">{meal.calories}</span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Protein</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={editedMeal.protein}
                    onChange={(e) => setEditedMeal({ ...editedMeal, protein: parseInt(e.target.value) || 0 })}
                    className="w-12 h-6 text-xs"
                  />
                  <span className="text-xs">g</span>
                </div>
              ) : (
                <span className="font-medium text-nutrition-protein">{meal.protein}g</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Carbs</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={editedMeal.carbs}
                    onChange={(e) => setEditedMeal({ ...editedMeal, carbs: parseInt(e.target.value) || 0 })}
                    className="w-12 h-6 text-xs"
                  />
                  <span className="text-xs">g</span>
                </div>
              ) : (
                <span className="font-medium text-nutrition-carbs">{meal.carbs}g</span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Fats</span>
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <Input
                    type="number"
                    value={editedMeal.fats}
                    onChange={(e) => setEditedMeal({ ...editedMeal, fats: parseInt(e.target.value) || 0 })}
                    className="w-12 h-6 text-xs"
                  />
                  <span className="text-xs">g</span>
                </div>
              ) : (
                <span className="font-medium text-nutrition-fats">{meal.fats}g</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave} className="flex-1 bg-gradient-primary">
                <Check className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="flex-1">
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onDelete(meal.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}