import { Home, Globe, Bike, Shirt, Gamepad2, Dumbbell, Play, Ellipsis } from "lucide-react";
import type { ComponentType } from "react";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  hasDropdown?: boolean;
};

export const navItems: NavItem[] = [
  { key: "home", label: "Home", href: "/", icon: Home },
  { key: "global", label: "Global", href: "#", icon: Globe, hasDropdown: true },
  { key: "lifestyle", label: "Lifestyle", href: "#", icon: Bike, hasDropdown: true },
  { key: "fashion", label: "Fashion", href: "/category/fashion", icon: Shirt },
  { key: "gaming", label: "Gaming", href: "/category/gaming", icon: Gamepad2 },
  { key: "fitness", label: "Fitness", href: "/category/fitness", icon: Dumbbell },
  { key: "video", label: "Video", href: "#", icon: Play },
  { key: "more", label: "More", href: "#", icon: Ellipsis, hasDropdown: true },
];