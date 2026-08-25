import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import flatlay from "@/assets/flatlay.jpg";
import { Reveal } from "@/components/site/motion-primitives";
import { storeApi } from "@/lib/api";
import { BLOG_POSTS } from "@/lib/products";
import { normalizeBlog, type BlogPost } from "@/lib/blogs";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const featured = posts[0];
  const rest = posts.slice(1);

  useEffect(() => {
    let active = true;

    storeApi
      .blogs()
      .then((response) => {
        const nextPosts: BlogPost[] = Array.isArray(response.data) ? response.data.map(normalizeBlog) : [];
        if (active && nextPosts.length) setPosts(nextPosts);
      })
      .catch(() => {
        if (active) setPosts(BLOG_POSTS);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Field Notes &amp; Kitchen Guides</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">The Utkarsh Organic Journal</h1>
          <p className="mt-3 text-muted-foreground">
            Thoughtful articles on organic farming practices, culinary shortcuts, and pantry care.
          </p>
        </div>

        {/* Featured Post */}
        {featured && (
          <div className="mt-14 grid overflow-hidden rounded-[1.75rem] bg-forest text-forest-foreground sm:rounded-[2.5rem] lg:grid-cols-2">
            <img src={flatlay} alt={featured.title} className="h-80 w-full bg-cream object-contain p-3 lg:h-full" />
            <div className="flex flex-col justify-center p-6 sm:p-12">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Featured Story &middot; {featured.read}</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-snug sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 text-sm text-forest-foreground/80 leading-relaxed">{featured.excerpt}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-forest-foreground/60">{featured.date}</span>
                <Link
                  to={`/blog/${featured.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold text-accent-foreground transition hover:scale-105"
                >
                  Read Article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="font-bold text-accent">{post.read}</span>
                  <span>{post.date}</span>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-foreground group-hover:text-accent transition">
                  {post.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt}
                </p>

                <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent">
                  <span>Read full story</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
