import TrendingTicker from "./TrendingTicker";
import Hero from "./Hero";
import MainSection from "./MainSection";
import FashionHighlights from "./FashionHighlights";
import FitnessGaming from "./FitnessGaming";
import LatestMustRead from "./LatestMustRead";
import { getCategories, getPostsByCategory, getLatestPosts } from "@/services/api";

export default async function Main() {
  const categories = await getCategories();
  const categorySeq5 = categories.find(c => c.sequence === 5);
  const postsSeq5 = categorySeq5 ? await getPostsByCategory(categorySeq5.slug, 1, 4) : [];

  const categorySeq6 = categories.find(c => c.sequence === 6);
  const postsSeq6 = categorySeq6 ? await getPostsByCategory(categorySeq6.slug, 1, 6) : [];

  const categorySeq7 = categories.find(c => c.sequence === 7);
  const postsSeq7 = categorySeq7 ? await getPostsByCategory(categorySeq7.slug, 1, 5) : [];

  const latestPosts = await getLatestPosts(6);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
        <TrendingTicker />
        <Hero />
        <MainSection />
        {postsSeq5.length > 0 && (
          <div className="mt-8">
            <FashionHighlights posts={postsSeq5} />
          </div>
        )}
        {postsSeq6.length > 0 && categorySeq6 && (
          <div className="mt-10">
            <FitnessGaming posts={postsSeq6} categoryName={categorySeq6.name} />
          </div>
        )}
        <div className="mt-10">
          <LatestMustRead latestPosts={latestPosts} mustReadPosts={postsSeq7} categories={categories} />
        </div>
      </main>
    </div>
  );
}