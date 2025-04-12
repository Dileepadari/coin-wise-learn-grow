
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

interface GameShopItemProps {
  name: string;
  description: string;
  price: number;
  image?: string;
  onBuy: () => void;
  canAfford: boolean;
  benefit: string;
}

export default function GameShopItem({ 
  name, 
  description, 
  price, 
  image, 
  onBuy, 
  canAfford,
  benefit
}: GameShopItemProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="h-24 bg-muted flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="text-3xl">{name[0]}</div>
        )}
      </div>
      
      <CardContent className="p-3">
        <h4 className="font-medium text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        
        <div className="text-xs bg-muted/30 p-1 rounded mb-2">
          Benefit: <span className="text-primary">{benefit}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center text-amber-500">
            <Coins className="h-3 w-3 mr-1" />
            <span className="font-medium">{price}</span>
          </div>
          
          <Button 
            size="sm" 
            disabled={!canAfford}
            onClick={onBuy}
          >
            Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
