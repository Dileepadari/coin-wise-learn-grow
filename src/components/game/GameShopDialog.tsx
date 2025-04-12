
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Store, Coins } from "lucide-react";
import GameShopItem from "./GameShopItem";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  benefit: string;
  effect: string;
}

interface GameShopDialogProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShopItem[];
  onBuyItem: (item: ShopItem) => void;
  playerMoney: number;
}

export default function GameShopDialog({ 
  isOpen, 
  onClose, 
  items, 
  onBuyItem,
  playerMoney
}: GameShopDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Store className="h-5 w-5 mr-2 text-primary" />
            Financial Shop
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <div className="flex justify-end mb-4">
            <div className="flex items-center bg-muted px-3 py-1 rounded-full">
              <Coins className="h-4 w-4 mr-1 text-amber-500" />
              <span className="font-medium">₹{playerMoney} available</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map(item => (
              <GameShopItem
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                benefit={item.benefit}
                canAfford={playerMoney >= item.price}
                onBuy={() => onBuyItem(item)}
              />
            ))}
            
            {items.length === 0 && (
              <div className="col-span-full text-center p-8 text-muted-foreground">
                No items available at this location
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
