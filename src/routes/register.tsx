import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Leaf, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";

export default function RegisterPage() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    login(name, email);
    toast.success("Account created! Welcome to Utkarsh Organic.");
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
            <h1 className="mt-4 font-display text-2xl font-extrabold">Create your account</h1>
            <p className="mt-1 text-xs text-muted-foreground">Join thousands of home cooks &amp; chefs buying pure organic powders</p>
          </div>

          <form onSubmit={handleRegister} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
              <div className="mt-1.5 flex items-center rounded-xl border border-border bg-secondary/30 px-3.5 py-3 focus-within:border-accent">
                <User className="h-4 w-4 text-muted-foreground mr-2.5" />
                <input
                  type="text"
                  required
                  placeholder="Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <div className="mt-1.5 flex items-center rounded-xl border border-border bg-secondary/30 px-3.5 py-3 focus-within:border-accent">
                <Mail className="h-4 w-4 text-muted-foreground mr-2.5" />
                <input
                  type="email"
                  required
                  placeholder="ananya@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="mt-1.5 flex items-center rounded-xl border border-border bg-secondary/30 px-3.5 py-3 focus-within:border-accent">
                <Lock className="h-4 w-4 text-muted-foreground mr-2.5" />
                <input
                  type="password"
                  required
                  placeholder="Minimum 6 characters"
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
              Create Account <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-accent hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
