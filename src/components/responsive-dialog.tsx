"use client";
import { useIsMobile } from '@/hooks/use-mobile';
import React from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';

interface Props {
    title: string,
    description: string,
    children: React.ReactNode;
    open: boolean,
    onOnpenChange: (open:boolean)=>void;
}

export const ResponsiveDialog = ({title,description,children,open,onOnpenChange}:Props) => {
    const isMobile = useIsMobile();
    
    if (isMobile) {
        return(
            <Drawer open={open} onOpenChange={onOnpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            {title}
                        </DrawerTitle>
                        <DrawerDescription>
                            {description}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">
                        {children}
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }
  return (
    <Dialog open={open} onOpenChange={onOnpenChange}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            { children }
        </DialogContent>
    </Dialog>
  )
}
