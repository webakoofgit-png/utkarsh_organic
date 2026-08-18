import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    login(email.split("@")[0] || "Valued Customer", email);
    toast.success("Welcome back!");
    navigate("/account");
  };

  return (
    <main className="pt-24 pb-20 lg:pt-32">
      <div className="container-x max-w-md">
        <div className="rounded-3xl border border-border bg-background p-8 shadow-soft">
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-accent">
              <Leaf className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-extrabold">Welcome back</h1>
            <p className="mt-1 text-xs text-muted-foreground">Sign in to track orders and save your favourite items</p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <div className="mt-1.5 flex items-center rounded-xl border border-border bg-secondary/30 px-3.5 py-3 focus-within:border-accent">
                <Mail className="h-4 w-4 text-muted-foreground mr-2.5" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
                <a href="#" onClick={(e) => { e.preventDefault(); toast.info("Password reset link sent if account exists."); }} className="text-xs text-accent font-semibold hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="mt-1.5 flex items-center rounded-xl border border-border bg-secondary/30 px-3.5 py-3 focus-within:border-accent">
                <Lock className="h-4 w-4 text-muted-foreground mr-2.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-forest"
            >
              Sign In <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-accent hover:underline">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
