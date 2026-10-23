"use client";

import {useState} from "react";
import {AlertCircle, CheckCircle2, Loader2, Mail, Send} from "lucide-react";
import {sendContactMessage} from "@/lib/api";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const res = await sendContactMessage(formData);
    setLoading(false);

    if (res.success) {
      setStatus({ type: "success", message: res.message });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus({ type: "error", message: res.message });
    }
  };

  return (
    <section id="contact" className="px-4 sm:px-6 max-w-6xl mx-auto pb-16">
      <div className="relative max-w-2xl mx-auto">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3.5 bg-linear-to-tr from-indigo-600/30 to-purple-600/30 text-indigo-400 border border-indigo-500/30 rounded-2xl mb-4 shadow-lg shadow-indigo-500/10">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Iniciemos una Conversación
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base">
              ¿Tienes un proyecto en mente, una vacante o deseas colaborar? Envíame un mensaje directo.
            </p>
          </div>

          {status && (
            <div
              className={`p-4 rounded-xl mb-6 flex items-center gap-3 text-sm font-medium animate-fade-in ${
                status.type === "success"
                  ? "bg-emerald-950/70 text-emerald-300 border border-emerald-800/80"
                  : "bg-rose-950/70 text-rose-300 border border-rose-800/80"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-400" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-slate-900/90 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-700/80 bg-slate-900/90 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  placeholder="tu@correo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Asunto
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border bg-slate-900/90 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                placeholder="Oportunidad laboral, proyecto o consultoría..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Mensaje
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border bg-slate-900/90 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm resize-none"
                placeholder="Describe tu propuesta o mensaje aquí..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Enviando Mensaje...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Enviar Mensaje</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
