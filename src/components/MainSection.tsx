
import FeaturedPost from "./FeaturedPosts";
import CompactPostList from "./CompactPostList";
import SectionTabs from "./SectionTabs";
import TravelGuides from "./TravelGuides";
import GadgetsRecipes from "./GadgetsRecipes";
import MostPopular from "./MostPopular";
import { getCategories, getPostsByCategory, getLatestPosts } from "@/services/api";

export default async function MainSection() {
  const categories = await getCategories();

  // Sequence 2: Featured + Compact List
  const categorySeq2 = categories.find(c => c.sequence === 2);
  const postsSeq2 = categorySeq2 ? await getPostsByCategory(categorySeq2.slug) : [];

  // Sequence 3: Travel Guides
  const categorySeq3 = categories.find(c => c.sequence === 3);
  const postsSeq3 = categorySeq3 ? await getPostsByCategory(categorySeq3.slug, 1, 6) : [];

  // Sequence 4: Gadgets & Recipes
  const categorySeq4 = categories.find(c => c.sequence === 4);
  const postsSeq4 = categorySeq4 ? await getPostsByCategory(categorySeq4.slug, 1, 6) : [];

  // Latest Posts (Sidebar)
  const latestPosts = await getLatestPosts(5);

  return (
    <section className="w-full py-6">
      <div className="grid grid-cols-10 gap-4 md:gap-6">
        {/* Left 70% area */}
        <div className="col-span-10 md:col-span-7">
          <SectionTabs />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Featured left - First post of Seq 2 */}
            <FeaturedPost post={postsSeq2[0]} />
            {/* Compact list right - Remaining posts of Seq 2 */}
            <CompactPostList posts={postsSeq2.slice(1)} />
          </div>

          {/* Travel Guides below - Seq 3 */}
          {postsSeq3.length > 0 && (
            <div className="mt-10 md:mt-12">
              <TravelGuides posts={postsSeq3} />
            </div>
          )}

          {/* Gadgets & Recipes below - Seq 4 */}
          {postsSeq4.length > 0 && categorySeq4 && (
            <div className="mt-12 md:mt-14">
              <GadgetsRecipes posts={postsSeq4} categoryName={categorySeq4.name} />
            </div>
          )}
        </div>

        {/* Right 30% sidebar */}
        <div className="col-span-10 md:col-span-3 lg:sticky lg:top-24 h-fit space-y-8">

          <MostPopular posts={latestPosts} />
          {/* <MakeItModern /> */}
        </div>
      </div>
    </section>
  );
}