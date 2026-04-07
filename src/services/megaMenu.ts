export type MegaCard = {
  title: string;
  subtitle?: string;
  image?: string; // public path or remote; fallback to gradient box
};

export type MegaMenuData = {
  heading: string;
  cards: MegaCard[];
  tabs: string[];
};

export const megaMenuContent: Record<string, MegaMenuData> = {
  global: {
    heading: "WHAT'S HOT",
    cards: [
      { title: "Most Affordable Swimsuits to Try This Summer Season" },
      { title: "Wedding Outfit Ideas to Inspire and Boost Creativity" },
      { title: "Amazing Accessories to Buy Your Girlfriend This Fall" },
      { title: "Best Ways to Naturally Show Off Your Gorgeous Body" },
      { title: "The Hottest Modern Accessories for a Stunning Look" },
    ],
    tabs: ["All", "Arts", "Health", "Music", "Recipes", "Travel", "What's Hot"],
  },
  lifestyle: {
    heading: "WHAT'S HOT",
    cards: [
      { title: "Morning Routines That Actually Work" },
      { title: "Simple Meals for Busy Days" },
      { title: "Habits to Boost Energy and Focus" },
      { title: "Weekend Getaways Under Budget" },
      { title: "Home Decor Trends You’ll Love" },
    ],
    tabs: ["All", "Style", "Home", "Health", "Food", "Travel", "What's Hot"],
  },
};