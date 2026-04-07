export interface Category {
    _id: string;
    name: string;
    slug: string;
    description: string;
    sequence: number;
}

export async function getCategories(): Promise<Category[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
        console.warn("NEXT_PUBLIC_API_BASE_URL is not set");
        return [];
    }

    try {
        const res = await fetch(`${baseUrl}/api/categories`, {
            cache: "no-store", // Ensure fresh data for SSR/dynamic fetching
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch categories: ${res.statusText}`);
        }

        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
            return json.data.sort((a: Category, b: Category) => a.sequence - b.sequence);
        }

        return [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

export interface BlogPost {
    _id: string;
    postId: string;
    slug: string;
    categorySlug: string;
    createdAt: string;
    blogContent: {
        title: string;
        content: string;
        metaDescription?: string;
        images?: { url?: string; title?: string; description?: string; caption?: string; altText?: string }[];
        keyPoints?: string[];
        faqs?: { question: string; answer: string }[];
        author?: string;
        metaTags?: {
            author?: string;
            title?: string;
            description?: string;
            keywords?: string;
            viewport?: string;
        };
        ogTags?: {
            title?: string;
            description?: string;
            image?: string;
            type?: string;
            url?: string;
        };
    };
    firebaseImages?: { url: string; title: string }[];
    videos?: {
        videoId: string;
        url: string;
        embedUrl?: string; // specific to response.md
        title: string;
        thumbnail: string;
        channelTitle: string;
    }[];
    socialMediaUrls?: {
        instagram: string[];
        linkedin: string[];
        facebook: string[];
        twitter: string[];
        threads: string[];
    };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return null;

    const url = `${baseUrl}/api/posts?slug=${slug}`;
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch post: ${res.statusText}`);

        const json = await res.json();
        if (json.success && json.post) {
            return json.post;
        }
        return null;
    } catch (error) {
        console.error(`[API] Error fetching post by slug:`, error);
        return null;
    }
}

export interface PostsResponse {
    success: boolean;
    posts: BlogPost[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalPosts: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export async function getTrendingPosts(): Promise<BlogPost[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
        console.warn("NEXT_PUBLIC_API_BASE_URL is not set");
        return [];
    }

    try {
        const res = await fetch(`${baseUrl}/api/posts?page=1&limit=5`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch trending posts: ${res.statusText}`);
        }

        const json: PostsResponse = await res.json();
        if (json.success && Array.isArray(json.posts)) {
            return json.posts;
        }

        return [];
    } catch (error) {
        console.error("Error fetching trending posts:", error);
        return [];
    }
}

export async function getPostsByCategory(categorySlug: string = "lifestyle", page: number = 1, limit: number = 5): Promise<BlogPost[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
        console.warn("NEXT_PUBLIC_API_BASE_URL is not set");
        return [];
    }

    const url = `${baseUrl}/api/posts?categorySlug=${categorySlug}&page=${page}&limit=${limit}`;
    console.log(`[API] Fetching posts from: ${url}`);

    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`[API] Failed to fetch posts: ${res.status} ${res.statusText}`);
            throw new Error(`Failed to fetch posts for category ${categorySlug}: ${res.statusText}`);
        }

        const json: PostsResponse = await res.json();
        if (json.success && Array.isArray(json.posts)) {
            console.log(`[API] Found ${json.posts.length} posts for category: ${categorySlug}`);
            return json.posts;
        }

        console.warn(`[API] No posts found or invalid response for category: ${categorySlug}`, json);
        return [];
    } catch (error) {
        console.error(`[API] Error fetching posts for category ${categorySlug}:`, error);
        return [];
    }
}

export async function getCategoryPosts(categorySlug: string, page: number = 1, limit: number = 10): Promise<PostsResponse | null> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return null;

    const url = `${baseUrl}/api/posts?categorySlug=${categorySlug}&page=${page}&limit=${limit}`;
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.error(`[API] Error fetching category posts:`, error);
        return null;
    }
}

export async function getLatestPosts(limit: number = 5): Promise<BlogPost[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) {
        console.warn("NEXT_PUBLIC_API_BASE_URL is not set");
        return [];
    }

    const url = `${baseUrl}/api/posts?page=1&limit=${limit}`;
    console.log(`[API] Fetching latest posts from: ${url}`);

    try {
        const res = await fetch(url, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`[API] Failed to fetch latest posts: ${res.status} ${res.statusText}`);
            throw new Error(`Failed to fetch latest posts: ${res.statusText}`);
        }

        const json: PostsResponse = await res.json();
        if (json.success && Array.isArray(json.posts)) {
            console.log(`[API] Found ${json.posts.length} latest posts`);
            return json.posts;
        }

        console.warn(`[API] No latest posts found or invalid response`, json);
        return [];
    } catch (error) {
        console.error(`[API] Error fetching latest posts:`, error);
        return [];
    }
}
export interface SeoData {
    _id: string;
    metaTitle: string;
    metaDescription: string;
    footerContent: string;
    metaKeywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImageUrl: string;
    twitterCardType: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImageUrl: string;
    canonicalURL: string;
    robotsDirective: string;
    categories: {
        categoryId: string;
        categorySlug: string;
        title: string;
        keywords: string;
        description: string;
        authors: string;
    }[];
}

export async function getSeoData(): Promise<SeoData | null> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl) return null;

    try {
        const res = await fetch(`${baseUrl}/api/seo`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch SEO data: ${res.statusText}`);
        }

        const json = await res.json();
        if (json.success && json.data) {
            return json.data;
        }
        return null;
    } catch (error) {
        console.error("Error fetching SEO data:", error);
        return null;
    }
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!baseUrl || !query.trim()) return [];

    try {
        const res = await fetch(`${baseUrl}/api/posts/search?q=${encodeURIComponent(query)}`, {
            cache: "no-store",
        });

        if (!res.ok) return [];

        const json = await res.json();
        if (json.success && Array.isArray(json.posts)) {
            return json.posts;
        }
        return [];
    } catch (error) {
        console.error("[API] Error searching posts:", error);
        return [];
    }
}
