import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { toast } from "sonner";
import flatlay from "@/assets/flatlay.jpg";
import { storeApi } from "@/lib/api";
import { normalizeBlog, type BlogPost } from "@/lib/blogs";
import { BLOG_POSTS } from "@/lib/products";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [post, setPost] = useState<BlogPost | undefined>(() => BLOG_POSTS.find((p) => p.slug === slug));

  useEffect(() => {
    let active = true;
    const fallback = BLOG_POSTS.find((p) => p.slug === slug);

    setPosts(BLOG_POSTS);
    setPost(fallback);

    if (!slug) {
      return () => {
        active = false;
      };
    }

    Promise.all([storeApi.blog(slug), storeApi.blogs()])
      .then(([detailResponse, listResponse]) => {
        if (!active) return;

        const nextPosts: BlogPost[] = Array.isArray(listResponse.data) ? listResponse.data.map(normalizeBlog) : [];
        if (nextPosts.length) setPosts(nextPosts);

        const nextPost = detailResponse.data ? normalizeBlog(detailResponse.data) : nextPosts.find((item) => item.slug === slug);
        setPost(nextPost || fallback);
      })
      .catch(() => {
        if (!active) return;
        setPosts(BLOG_POSTS);
        setPost(fallback);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (!post) {
    return (
      <main className="pt-32 pb-20 text-center container-x">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Article Not Found</h1>
        <p className="mt-2 text-muted-foreground">The blog post you are looking for does not exist.</p>
        <Link to="/blog" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
          Back to Journal
        </Link>
      </main>
    );
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Journal
        </Link>

        <div className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-accent">
            <span>Journal</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.read}</span>
            <span>&middot;</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed font-medium">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-forest text-forest-foreground font-bold font-display text-sm">
                UO
              </div>
              <div>
                <p className="font-display font-bold text-xs">Utkarsh Editorial Team</p>
                <p className="text-[11px] text-muted-foreground">Organic Food &amp; Culinary Research</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold text-foreground hover:bg-secondary"
            >
              <Share2 className="h-3.5 w-3.5" /> Share
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mt-8 overflow-hidden rounded-3xl">
          <img src={flatlay} alt={post.title} className="h-80 w-full bg-cream object-contain p-3 sm:h-96" />
        </div>

        {/* Article Body */}
        <article className="mt-10 space-y-6 text-base leading-relaxed text-foreground/90 font-sans">
          {post.body.map((paragraph, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Product callout inside article */}
        <div className="mt-12 gap-6 rounded-3xl border border-border bg-cream p-6 text-center sm:flex sm:items-center sm:justify-between sm:p-8 sm:text-left">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Pantry Shortcut</span>
            <h3 className="mt-1 font-display text-xl font-bold">Try Dehydrated White Onion Powder</h3>
            <p className="mt-1 text-xs text-muted-foreground">Fine mesh onion powder for gravies, seasoning blends and food processing.</p>
          </div>
          <Link
            to="/product/dehydrated-white-onion-powder"
            className="mt-4 sm:mt-0 inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-3 text-xs font-bold text-primary-foreground hover:bg-forest"
          >
            Shop Now
          </Link>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <h3 className="font-display text-2xl font-extrabold">More to Read</h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/blog/${item.slug}`}
                  className="group rounded-2xl border border-border p-5 hover:bg-cream transition"
                >
                  <p className="text-xs font-bold text-accent">{item.read}</p>
                  <h4 className="mt-2 font-display text-base font-bold group-hover:text-primary">{item.title}</h4>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
