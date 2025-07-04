"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardCommand from "./dashboard-command";
import { ModeToggle } from "./mode-toggle";

const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);
  useEffect(()=>{
    const down = (e: KeyboardEvent)=>{
        if (e.key==="k"&&(e.metaKey||e.ctrlKey)) {
            e.preventDefault();
            setCommandOpen((open)=>!open);
        }
    };
    document.addEventListener("keydown",down);
    return () => document.removeEventListener("keydown",down);
  },[]);
  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen}/>
      <nav className="border-b flex px-4 gap-x-2 py-3 items-center bg-background">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          onClick={()=>setCommandOpen((open)=>!open)}
        >
          <SearchIcon /> Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;K</span>
          </kbd>
        </Button>
        <ModeToggle/>
      </nav>
    </>
  );
};

export default DashboardNavbar;
