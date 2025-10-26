import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../../auth/useAuth";
import { api } from "../../api/client";

type Mode = "login" | "signup" | "forgot" | "reset";

interface Props {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onSwitchMode: (m: Mode) => void;
}

const AuthModal: React.FC<Props> = ({ open, mode, onClose, onSwitchMode }) => {
  const { user, signup, login, resendVerification, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, loading, onClose]);

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setPassword2("");
      setResetToken("");
      setShowPwd(false);
      setLoading(false);
      setError(null);
      setInfo(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (mode === "reset") {
      const t = new URL(window.location.href).searchParams.get("token") || "";
      setResetToken(t);
    }
  }, [open, mode]);

  if (!open) return null;

  const title =
    mode === "login" ? "Log in" :
    mode === "signup" ? "Sign up" :
    mode === "forgot" ? "Forgot password" :
    "Reset password";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
        onClose();
      } else if (mode === "signup") {
        await signup(email, password);
        setInfo("Account created. Check your inbox to verify your email.");
      } else if (mode === "forgot") {
        await api.post("/auth/forgot-password", { email });
        setInfo("If this email exists, a reset link has been sent.");
      } else if (mode === "reset") {
        if (!resetToken) throw new Error("Missing token");
        if (password !== password2) throw new Error("Passwords do not match");
        await api.post("/auth/reset-password", { token: resetToken, password });
        setInfo("Password updated. You can now log in.");
        onSwitchMode("login");
      }
    } catch (err: any) {
      setError(String(err?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      await resendVerification(email);
      setInfo("Verification email sent again. Check your inbox.");
    } catch (err: any) {
      setError(String(err?.message || "Failed to resend verification email"));
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <div
      className="fixed inset-0 z-[2000] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
      onClick={() => { if (!loading) onClose(); }}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="auth-title" className="text-lg font-semibold">{title}</h3>
          <button
            className="text-gray-500 hover:text-gray-800 cursor-pointer"
            onClick={() => { if (!loading) onClose(); }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {user ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-3 text-sm">
              <p className="text-gray-700">
                Signed in as <span className="font-medium">{user.email}</span>
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <button className="text-sm px-3 py-1.5 border rounded-lg hover:bg-gray-50" onClick={onClose}>
                Close
              </button>
              <button
                className="text-sm px-3 py-1.5 bg-red-600 text-white rounded-lg hover:opacity-90"
                onClick={() => { if (!loading) { logout(); onClose(); } }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={submit} className="space-y-4">
              {(mode === "login" || mode === "signup" || mode === "forgot") && (
                <label className="block">
                  <span className="text-sm text-gray-700">Email</span>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring focus:ring-[var(--primary)]/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </label>
              )}
              {(mode === "login" || mode === "signup") && (
                <label className="block relative">
                  <span className="text-sm text-gray-700">Password</span>
                  <input
                    type={showPwd ? "text" : "password"}
                    className="mt-1 w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:ring focus:ring-[var(--primary)]/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-9 text-xs underline cursor-pointer"
                  >
                    {showPwd ? "Hide" : "Show"}
                  </button>
                </label>
              )}
              {mode === "reset" && (
                <>
                  <input type="hidden" value={resetToken} readOnly />
                  <label className="block">
                    <span className="text-sm text-gray-700">New password</span>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring focus:ring-[var(--primary)]/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      autoFocus
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-700">Confirm password</span>
                    <input
                      type="password"
                      className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring focus:ring-[var(--primary)]/20"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      required
                      minLength={8}
                    />
                  </label>
                </>
              )}
              {error && (
                <div className="text-sm -mt-2">
                  <p className="text-red-600">{error}</p>
                  {error.toLowerCase().includes("not verified") && (
                    <button type="button" onClick={handleResend} className="mt-2 underline cursor-pointer">
                      Resend verification email
                    </button>
                  )}
                </div>
              )}
              {info && <p className="text-sm text-green-600 -mt-2">{info}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full rounded-lg text-white py-2.5 transition-all ${
                    loading
                      ? "opacity-70 cursor-not-allowed bg-[#A67665]"
                      : "bg-[#A67665] hover:bg-[#8a5e55] cursor-pointer shadow-md"
                  }`}
                >
                  {loading ? "Please wait..." : title}
                </button>
              {mode === "login" && (
                <div className="text-xs text-right mt-2">
                  <button
                    type="button"
                    className="underline cursor-pointer"
                    onClick={() => onSwitchMode("forgot")}
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </form>
            <div className="text-sm text-center text-gray-600 mt-4">
              {mode === "login" ? (
                <>No account? <button className="underline cursor-pointer" onClick={() => onSwitchMode("signup")}>Sign up</button></>
              ) : mode === "signup" ? (
                <>Already have an account? <button className="underline cursor-pointer" onClick={() => onSwitchMode("login")}>Log in</button></>
              ) : mode === "forgot" ? (
                <>Remembered? <button className="underline cursor-pointer" onClick={() => onSwitchMode("login")}>Log in</button></>
              ) : (
                <>All set? <button className="underline cursor-pointer" onClick={() => onSwitchMode("login")}>Log in</button></>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default AuthModal;
