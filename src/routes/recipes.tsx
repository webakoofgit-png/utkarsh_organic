import { Link } from "react-router-dom";
import { ChefHat, Clock, Flame, Utensils } from "lucide-react";
import { useState } from "react";
import carrot from "@/assets/p-carrot.jpg";
import flatlay from "@/assets/flatlay.jpg";
import turmeric from "@/assets/p-turmeric.jpg";
import { Reveal, SectionHeading } from "@/components/site/motion-primitives";
import { RECIPES } from "@/lib/products";

export default function RecipesPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof RECIPES[0] | null>(null);

  const images = [flatlay, carrot, turmeric, flatlay, carrot, turmeric];

  return (
    <main className="pt-24 pb-20 lg:pt-28">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Pantry Inspirations</p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-5xl">Kitchen Recipes &amp; Shortcuts</h1>
          <p className="mt-3 text-muted-foreground">
            Discover how a single spoonful of our organic powders adds instant depth, vibrant colour, and rich flavour to daily dishes.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {RECIPES.map((recipe, index) => (
            <Reveal key={recipe.slug} delay={index * 0.06}>
              <div className="surface-card overflow-hidden flex flex-col h-full group">
                <div className="relative grid h-48 place-items-center overflow-hidden bg-cream p-3 sm:h-56">
                  <img
                    src={images[index % images.length]}
                    alt={recipe.title}
                    className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-foreground">
                    {recipe.level}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-accent sm:gap-4">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {recipe.time}</span>
                    <span className="flex items-center gap-1"><ChefHat className="h-3.5 w-3.5" /> Easy Prep</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold text-foreground">{recipe.title}</h3>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {recipe.uses.map((ing) => (
                      <span key={ing} className="rounded-md bg-secondary/80 px-2.5 py-1 text-[11px] font-bold text-secondary-foreground">
                        {ing}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 border-t border-border pt-4 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
                    <button
                      onClick={() => setSelectedRecipe(recipe)}
                      className="text-xs font-bold text-primary hover:text-accent underline underline-offset-4"
                    >
                      View Step-by-Step
                    </button>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground"
                    >
                      Get Powders &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Modal for recipe detail */}
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-background p-5 shadow-lift sm:p-7">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">{selectedRecipe.time} &middot; {selectedRecipe.level}</span>
                  <h2 className="font-display text-2xl font-extrabold mt-1">{selectedRecipe.title}</h2>
                </div>
                <button onClick={() => setSelectedRecipe(null)} className="rounded-full bg-secondary p-2 text-muted-foreground hover:text-foreground">
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <h4 className="font-display font-bold text-base border-b border-border pb-2">Key Ingredients</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {selectedRecipe.uses.map((use) => (
                    <li key={use}><strong className="text-foreground">1-2 tsp Utkarsh Organic {use}</strong></li>
                  ))}
                  <li>2 tbsp Cooking Oil or Ghee</li>
                  <li>Salt and fresh herbs to taste</li>
                  <li>Main base (Potatoes, Pasta, Milk, Tea depending on dish)</li>
                </ul>

                <h4 className="font-display font-bold text-base border-b border-border pb-2 pt-2">Instructions</h4>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed">
                  <li>Heat oil or liquid base in a non-stick pan over medium heat.</li>
                  <li>Add Utkarsh Organic powder directly to the warm oil/liquid and bloom for 15 seconds to unlock natural aromatics.</li>
                  <li>Toss in main ingredients and coat thoroughly. Cook for 3-5 minutes until rich aroma fills the kitchen.</li>
                  <li>Garnish with fresh cilantro or microgreens and serve hot!</li>
                </ol>
              </div>

              <div className="mt-7 flex justify-end">
                <button onClick={() => setSelectedRecipe(null)} className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground">
                  Close Recipe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
