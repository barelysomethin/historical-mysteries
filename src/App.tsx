import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollText, Flame, Crown } from "lucide-react";
import { Card, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";

type Mystery = {
  title: string;
  era: string;
  votes: number;
  summary: string;
  body: string;
  source: string;
};

type ChatMessage = {
  name: string;
  message: string;
};

const initialMysteries: Mystery[] = [
  {
    title: "The Voynich Manuscript",
    era: "15th Century",
    votes: 1840,
    summary:
      "An illustrated codex written in an unknown script and language, never deciphered.",
    body: "The Voynich Manuscript dates back to the early 1400s and is filled with strange botanical drawings, astronomical diagrams, and undeciphered text. Despite centuries of study by cryptographers, linguists, and historians, its meaning and purpose remain unknown.",
    source: "https://en.wikipedia.org/wiki/Voynich_manuscript",
  },
  {
    title: "The Disappearance of the Roanoke Colony",
    era: "1587",
    votes: 1620,
    summary:
      "An entire English settlement vanished without a trace in the New World.",
    body: "When John White returned to Roanoke Island after three years, the colony was deserted. The only clue was the word 'CROATOAN' carved into a post. The fate of the settlers remains one of history’s greatest mysteries.",
    source: "https://en.wikipedia.org/wiki/Roanoke_Colony",
  },
  {
    title: "The Lost City of Atlantis",
    era: "Ancient Greece",
    votes: 1410,
    summary:
      "A legendary advanced civilization said to have sunk beneath the sea.",
    body: "First described by Plato, Atlantis was said to be a powerful and technologically advanced society that fell out of favor with the gods and disappeared in a single day and night.",
    source: "https://en.wikipedia.org/wiki/Atlantis",
  },
  {
    title: "The Antikythera Mechanism",
    era: "1st Century BCE",
    votes: 1710,
    summary:
      "An ancient Greek device capable of predicting astronomical events.",
    body: "Discovered in a shipwreck, the Antikythera Mechanism is considered the world’s first analog computer.",
    source: "https://en.wikipedia.org/wiki/Antikythera_mechanism",
  },
];

export default function App() {
  const [mysteries, setMysteries] = useState<Mystery[]>(initialMysteries);
  const [visibleCount, setVisibleCount] = useState(4);
  const [active, setActive] = useState<Mystery | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    era: "",
    summary: "",
    body: "",
    source: "",
  });
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");

  const leaderboard = [...mysteries].sort((a, b) => b.votes - a.votes);
  const hasLoadedMore = visibleCount > 4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b08] via-stone-900 to-black text-stone-100 font-serif relative overflow-hidden">
      <main className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-20">
        <section>
          <h1 className="text-5xl text-center tracking-widest text-amber-300 mb-20">
            HISTORICAL MYSTERIES
          </h1>

          <div className="grid sm:grid-cols-2 gap-12">
            {mysteries.slice(0, visibleCount).map((m) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="h-72"
              >
                <Card className="bg-stone-900/60 border border-stone-800 rounded-2xl shadow-lg cursor-pointer h-72">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4 text-amber-400">
                      <ScrollText className="w-5 h-5" />
                      <span className="text-xs uppercase tracking-widest">
                        {m.era}
                      </span>
                    </div>
                    <h3 className="text-xl mb-3 text-amber-200">{m.title}</h3>
                    <p className="text-stone-300 text-sm flex-grow">
                      {m.summary}
                    </p>
                    <Button
                      variant="ghost"
                      className="mt-auto text-amber-400 cursor-pointer transition-all hover:tracking-widest hover:bg-amber-400/10"
                      onClick={() => {
                        setMysteries((prev) =>
                          prev.map((x) =>
                            x.title === m.title
                              ? { ...x, votes: x.votes + 1 }
                              : x
                          )
                        );
                        setActive({ ...m, votes: m.votes + 1 });
                      }}
                    >
                      Unseal record
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            {!hasLoadedMore && visibleCount < mysteries.length && (
              <Button
                className="cursor-pointer hover:bg-amber-400/10"
                onClick={() => setVisibleCount((v) => v + 4)}
              >
                Load more
              </Button>
            )}

            {hasLoadedMore && (
              <Button
                className="cursor-pointer hover:bg-amber-400/10"
                onClick={() => setVisibleCount(4)}
              >
                See less
              </Button>
            )}
          </div>
        </section>

        <aside className="space-y-12 lg:mt-32">
          <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6">
            <h2 className="text-sm tracking-widest text-amber-300 mb-6 flex items-center gap-2">
              <Crown className="w-4 h-4" /> Most Studied
            </h2>
            <ul className="space-y-3">
              {leaderboard.map((m, i) => (
                <motion.li
                  key={m.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {i + 1}. {m.title}
                  </span>
                  <span className="text-amber-400">{m.votes}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-stone-900 border border-stone-700 rounded-2xl p-6 text-center space-y-4">
            <Flame className="mx-auto mb-3 text-amber-400" />
            <p className="text-sm">Add a new mystery</p>
            <Button
              variant="chat"
              className="cursor-pointer"
              onClick={() => setShowForm(true)}
            >
              Add mystery
            </Button>

            <p className="mt-4 text-sm">Join the chatroom</p>
            <Button
              variant="chat"
              className="cursor-pointer"
              onClick={() => setShowChat(true)}
            >
              Chatroom
            </Button>
          </div>
        </aside>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-pointer"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#f5e6c8] text-stone-900 max-w-xl p-10 rounded-xl origin-top cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl mb-4">{active.title}</h2>
                <p className="mb-6">{active.body}</p>
                <a
                  href={active.source}
                  target="_blank"
                  rel="noreferrer"
                  className="underline cursor-pointer"
                >
                  Read external source
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-stone-900 p-8 rounded-xl w-full max-w-md space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  className="w-full p-2 bg-stone-800"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                  className="w-full p-2 bg-stone-800"
                  placeholder="Era"
                  value={form.era}
                  onChange={(e) => setForm({ ...form, era: e.target.value })}
                />
                <textarea
                  className="w-full p-2 bg-stone-800"
                  placeholder="Full description"
                  value={form.body}
                  onChange={(e) => setForm({ ...form, body: e.target.value })}
                />
                <input
                  className="w-full p-2 bg-stone-800"
                  placeholder="External source link"
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                />
                <div className="flex gap-3 justify-end">
                  <Button
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      if (!form.title || !form.era || !form.body) return;
                      const newMystery: Mystery = {
                        title: form.title,
                        era: form.era,
                        summary: form.body.slice(0, 80),
                        body: form.body,
                        source: form.source || "#",
                        votes: 0,
                      };
                      setMysteries((prev) => [newMystery, ...prev]);
                      setForm({
                        title: "",
                        era: "",
                        summary: "",
                        body: "",
                        source: "",
                      });
                      setShowForm(false);
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setShowChat(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#f5e6c8] text-stone-900 max-w-md w-full rounded-xl p-6 flex flex-col space-y-3"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex-grow overflow-y-auto max-h-96 space-y-2">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="text-amber-400">{msg.name}:</span>{" "}
                      {msg.message}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className="flex-1 p-3 bg-stone-800 text-stone-100 rounded-lg placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && chatInput.trim()) {
                        setChatMessages((prev) => [
                          ...prev,
                          { name: "Anon", message: chatInput.trim() },
                        ]);
                        setChatInput("");
                      }
                    }}
                  />
                  <Button
                    variant="send"
                    onClick={() => {
                      if (chatInput.trim()) {
                        setChatMessages((prev) => [
                          ...prev,
                          { name: "Anon", message: chatInput.trim() },
                        ]);
                        setChatInput("");
                      }
                    }}
                  >
                    Send
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
