import { Camera, Lightbulb, MonitorSmartphone, Megaphone, Leaf } from "lucide-react";
import type { ComponentType } from "react";

export type SimpleMenuItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
};

export const simpleMenuContent: Record<string, SimpleMenuItem[]> = {
  more: [
    { label: "Photography", href: "#", icon: Camera },
    { label: "Showbiz", href: "#", icon: Lightbulb },
    { label: "Gadgets", href: "#", icon: MonitorSmartphone },
    { label: "Facts", href: "#", icon: Megaphone },
    { label: "Style", href: "#", icon: Leaf },
  ],
};