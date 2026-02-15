"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Mail,
  MailOpen,
  Trash2,
  Eye,
  EyeOff,
  Inbox,
  Loader2,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
} from "lucide-react";
import { AdminNav } from "@/components/admin-nav";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminDashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyStatus, setReplyStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const fetchContacts = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/contacts?filter=${filter}`);
      if (!res.ok) {
        console.error("API error:", res.status);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setContacts(data.contacts || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  async function toggleRead(id: string, currentRead: boolean) {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !currentRead }),
    });
    fetchContacts();
  }

  async function sendReply(id: string) {
    if (!replyText.trim()) return;
    setReplyStatus("sending");
    try {
      const res = await fetch(`/api/admin/contacts/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: replyText }),
      });
      if (!res.ok) throw new Error();
      setReplyStatus("sent");
      setReplyText("");
      setTimeout(() => {
        setReplyingTo(null);
        setReplyStatus("idle");
        fetchContacts();
      }, 2000);
    } catch {
      setReplyStatus("error");
    }
  }

  async function deleteContact(id: string) {
    if (!confirm("Opravdu chcete smazat tuto poptávku?")) return;
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    fetchContacts();
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="min-h-screen bg-bg-soft pt-16">
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-primary">Poptávky</h1>
          <p className="text-sm text-text-muted mt-1">
            {unreadCount > 0
              ? `${unreadCount} nepřečtených`
              : "Žádné nové poptávky"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setFilter("all"); setLoading(true); }}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-white text-text-muted border border-border hover:bg-bg-muted"
            }`}
          >
            Všechny
          </button>
          <button
            onClick={() => { setFilter("unread"); setLoading(true); }}
            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
              filter === "unread"
                ? "bg-primary text-white"
                : "bg-white text-text-muted border border-border hover:bg-bg-muted"
            }`}
          >
            Nepřečtené
            {unreadCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-accent text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-text-muted" />
        </div>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Inbox className="h-12 w-12 text-border mb-4" />
          <p className="text-text-muted">
            {filter === "unread"
              ? "Žádné nepřečtené poptávky"
              : "Zatím žádné poptávky"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-xl border transition-all ${
                contact.read ? "border-border" : "border-accent/30 shadow-sm"
              }`}
            >
              {/* Header row */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === contact.id ? null : contact.id)
                }
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                <div className="flex-shrink-0">
                  {contact.read ? (
                    <MailOpen className="h-5 w-5 text-text-muted" />
                  ) : (
                    <Mail className="h-5 w-5 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm truncate ${
                        contact.read
                          ? "text-text-muted"
                          : "font-semibold text-primary"
                      }`}
                    >
                      {contact.name}
                    </span>
                    {!contact.read && (
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent" />
                    )}
                  </div>
                  <p className="text-xs text-text-muted truncate">
                    {contact.email}
                    {contact.phone && ` \u00b7 ${contact.phone}`}
                  </p>
                </div>
                <span className="text-xs text-text-muted flex-shrink-0 hidden sm:block">
                  {formatDate(contact.createdAt)}
                </span>
                {expandedId === contact.id ? (
                  <ChevronUp className="h-4 w-4 text-text-muted flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-text-muted flex-shrink-0" />
                )}
              </button>

              {/* Expanded content */}
              {expandedId === contact.id && (
                <div className="px-4 pb-4 border-t border-border">
                  <div className="pt-4 space-y-3">
                    <div className="text-xs text-text-muted sm:hidden">
                      {formatDate(contact.createdAt)}
                    </div>
                    <div className="bg-bg-soft rounded-lg p-4">
                      <p className="text-sm text-text whitespace-pre-wrap leading-relaxed">
                        {contact.message}
                      </p>
                    </div>
                    {/* Reply form */}
                    {replyingTo === contact.id && (
                      <div className="bg-white rounded-lg border border-border p-3 space-y-2">
                        {replyStatus === "sent" ? (
                          <div className="flex items-center gap-2 py-3 justify-center text-accent text-sm">
                            <CheckCircle2 className="h-4 w-4" />
                            Odpověď odeslána!
                          </div>
                        ) : (
                          <>
                            <p className="text-xs text-text-muted">
                              Odpověď pro {contact.name} ({contact.email})
                            </p>
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              rows={4}
                              placeholder="Napište odpověď..."
                              className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
                            />
                            {replyStatus === "error" && (
                              <p className="text-xs text-red-500">Nepodařilo se odeslat. Zkuste znovu.</p>
                            )}
                            <div className="flex gap-2 justify-end">
                              <button
                                onClick={() => { setReplyingTo(null); setReplyText(""); setReplyStatus("idle"); }}
                                className="px-3 py-1.5 text-xs rounded-lg border border-border text-text-muted hover:bg-bg-muted transition-colors"
                              >
                                Zrušit
                              </button>
                              <button
                                onClick={() => sendReply(contact.id)}
                                disabled={replyStatus === "sending" || !replyText.trim()}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-accent text-white hover:bg-accent-light transition-colors disabled:opacity-50"
                              >
                                {replyStatus === "sending" ? (
                                  <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Odesílám...</>
                                ) : (
                                  <><Send className="h-3.5 w-3.5" /> Odeslat odpověď</>
                                )}
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => toggleRead(contact.id, contact.read)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-border text-text-muted hover:bg-bg-muted transition-colors"
                      >
                        {contact.read ? (
                          <>
                            <EyeOff className="h-3.5 w-3.5" />
                            Označit jako nepřečtené
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5" />
                            Označit jako přečtené
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(replyingTo === contact.id ? null : contact.id);
                          setReplyText("");
                          setReplyStatus("idle");
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-accent text-white hover:bg-accent-light transition-colors"
                      >
                        <Send className="h-3.5 w-3.5" />
                        Odpovědět
                      </button>
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg text-red-500 hover:bg-red-50 transition-colors ml-auto"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Smazat
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
