import { useState, useCallback } from "react";
import { Camera, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
}

export function UploadZone({ onImageUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 border-2 border-dashed",
      isDragging ? "border-primary bg-primary/5 scale-105" : "border-muted-foreground/30 hover:border-primary/50"
    )}>
      <CardContent className="p-8">
        <div
          className="text-center space-y-4"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
            <div className="relative flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full">
              <Camera className="h-8 w-8 text-primary-foreground" />
            </div>
            <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-accent animate-bounce" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Upload Your Meal Photo</h3>
            <p className="text-muted-foreground text-sm">
              Drag & drop or click to upload • AI will analyze calories & macros
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </Button>
            
            <Button variant="outline" className="hover:border-primary hover:text-primary">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}