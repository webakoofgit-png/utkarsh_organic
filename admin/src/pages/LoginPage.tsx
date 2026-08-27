import { FormEvent, useState } from "react";
import { Leaf, Lock, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate((location.state as any)?.from?.pathname || "/");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="login-shell">
      <form className="login-card" onSubmit={submit} autoComplete="off">
        <span className="brand-mark">
          <Leaf size={24} />
        </span>
        <p className="eyebrow" style={{ marginTop: 18 }}>Utkarsh Organic</p>
        <h1>Admin Panel</h1>
        <p className="muted" style={{ marginTop: 8 }}>Sign in to manage catalogue, orders, and website content.</p>

        <div className="field" style={{ marginTop: 24 }}>
          <label>Email</label>
          <div style={{ position: "relative" }}>
            <Mail size={17} style={{ position: "absolute", left: 12, top: 12, color: "var(--muted)" }} />
            <input
              className="input"
              style={{ paddingLeft: 38 }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
        </div>

        <div className="field" style={{ marginTop: 14 }}>
          <label>Password</label>
          <div style={{ position: "relative" }}>
            <Lock size={17} style={{ position: "absolute", left: 12, top: 12, color: "var(--muted)" }} />
            <input
              className="input"
              style={{ paddingLeft: 38 }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <button className="btn" style={{ width: "100%", marginTop: 22 }} disabled={busy}>
          {busy ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
