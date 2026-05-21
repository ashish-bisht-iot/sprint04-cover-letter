import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`;

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e0c;
    --paper: #f5f2ec;
    --cream: #ede9e0;
    --accent: #c8502a;
    --accent-light: #e8705040;
    --gold: #b8962e;
    --border: #d4cfc5;
    --muted: #7a7468;
    --success: #2a7a4a;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
  }

  .app {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }

  .header {
    padding: 48px 0 40px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 48px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
  }

  .wordmark {
    font-family: 'Playfair Display', serif;
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    line-height: 1.1;
    color: var(--ink);
  }

  .headline em {
    font-style: italic;
    color: var(--accent);
  }

  .header-badge {
    background: var(--ink);
    color: var(--paper);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    padding: 6px 12px;
    border-radius: 2px;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
  }

  @media (max-width: 768px) {
    .layout { grid-template-columns: 1fr; }
  }

  .panel {
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  .panel-header {
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .panel-num {
    width: 22px;
    height: 22px;
    border: 1.5px solid var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--accent);
    flex-shrink: 0;
  }

  .panel-title {
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink);
  }

  .panel-body {
    padding: 28px 24px;
  }

  .field {
    margin-bottom: 20px;
  }

  .field:last-child { margin-bottom: 0; }

  label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 7px;
  }

  input, textarea {
    width: 100%;
    background: var(--paper);
    border: 1px solid var(--border);
    border-radius: 3px;
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--ink);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    resize: vertical;
  }

  input:focus, textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-light);
  }

  input::placeholder, textarea::placeholder {
    color: #bbb;
    font-style: italic;
  }

  textarea { min-height: 110px; }

  .btn {
    width: 100%;
    padding: 14px 24px;
    border: none;
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.18s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }

  .btn-primary {
    background: var(--ink);
    color: var(--paper);
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--accent);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(200,80,42,0.3);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .btn-ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--ink);
    font-size: 12px;
    width: auto;
    padding: 8px 16px;
    margin-top: 0;
  }

  .btn-ghost:hover {
    border-color: var(--ink);
    background: var(--cream);
  }

  .mode-toggle {
    display: flex;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 3px;
    margin-bottom: 24px;
    gap: 2px;
  }

  .mode-btn {
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    background: transparent;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }

  .mode-btn.active {
    background: white;
    color: var(--ink);
    box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    font-weight: 600;
  }

  .output-panel {
    background: white;
    border: 1px solid var(--border);
    border-radius: 4px;
    min-height: 500px;
    display: flex;
    flex-direction: column;
  }

  .output-header {
    background: var(--cream);
    border-bottom: 1px solid var(--border);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .output-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .output-body {
    flex: 1;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
  }

  .generating {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 60px 24px;
  }

  .spinner {
    width: 36px;
    height: 36px;
    border: 2.5px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .gen-label {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.1em;
  }

  .gen-dots::after {
    content: '';
    animation: dots 1.5s steps(4, end) infinite;
  }

  @keyframes dots {
    0%   { content: ''; }
    25%  { content: '.'; }
    50%  { content: '..'; }
    75%  { content: '...'; }
  }

  .empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 60px 24px;
    text-align: center;
  }

  .empty-icon {
    font-size: 40px;
    opacity: 0.25;
    filter: grayscale(1);
  }

  .empty-text {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    color: var(--muted);
    font-style: italic;
  }

  .empty-sub {
    font-size: 12px;
    color: #bbb;
    max-width: 220px;
  }

  .letter-content {
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    line-height: 1.8;
    color: var(--ink);
    white-space: pre-wrap;
    flex: 1;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .copy-toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: var(--success);
    color: white;
    font-size: 13px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 3px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
    z-index: 100;
  }

  .copy-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(-8px);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border);
    flex-shrink: 0;
  }

  .status-dot.ai { background: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }
  .status-dot.ready { background: var(--success); }

  .error-box {
    background: #fff5f3;
    border: 1px solid #ffd5cc;
    border-radius: 3px;
    padding: 14px 18px;
    font-size: 13px;
    color: var(--accent);
    margin-top: 16px;
    display: flex;
    gap: 8px;
    align-items: flex-start;
  }

  .meta-tag {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 0.08em;
    background: var(--cream);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 3px 8px;
  }
`;

export default function CoverLetterGenerator() {
  const [mode, setMode] = useState("ai");
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    skills: "",
    jd: "",
    tone: "professional",
  });
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Phase 1: Template generator
  const generateTemplate = () => {
    const { name, role, company, skills, jd, tone } = form;
    const skillList = skills.split(",").map((s) => s.trim()).filter(Boolean);
    const skillStr =
      skillList.length > 1
        ? skillList.slice(0, -1).join(", ") + ", and " + skillList.slice(-1)
        : skillList[0] || "my expertise";

    const toneOpener = {
      professional: "I am writing to express my strong interest",
      enthusiastic: "I am thrilled to apply",
      concise: "I am applying",
    }[tone] || "I am writing to express my interest";

    const letter = `Dear Hiring Manager at ${company || "[Company]"},

${toneOpener} in the ${role || "[Role]"} position at ${company || "[Company]"}. With my background in ${skillStr}, I am confident in my ability to make a meaningful contribution to your team.

Having reviewed the role requirements, I am particularly excited by the opportunity to bring ${skillList[0] || "my skills"} to a forward-thinking organization like ${company || "[Company]"}. ${jd ? `Your focus on "${jd.slice(0, 80)}${jd.length > 80 ? "..." : ""}" aligns closely with my professional experience.` : ""}

Throughout my career, I have consistently applied ${skillStr} to deliver impactful results. I am a fast learner, a collaborative team member, and someone who takes ownership of outcomes.

I would welcome the opportunity to discuss how my background aligns with ${company || "[Company]"}'s goals. Thank you for considering my application.

Sincerely,
${name || "[Your Name]"}`;

    setOutput(letter);
    setStatus("done");
  };

  // Phase 2: Groq AI generator
  const generateAI = async () => {
    setStatus("generating");
    setError("");
    setOutput("");

    const { name, role, company, skills, jd, tone } = form;
    const toneMap = {
      professional: "formal and professional",
      enthusiastic: "enthusiastic and warm",
      concise: "concise and direct",
    };

    const prompt = `Write a compelling cover letter with these details:
- Candidate Name: ${name}
- Job Role: ${role}
- Company: ${company}
- Skills: ${skills}
- Job Description: ${jd}
- Tone: ${toneMap[tone] || "professional"}

Write 3-4 paragraphs. Start with "Dear Hiring Manager at ${company},". No extra commentary.`;
    try {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  if (!apiKey) throw new Error("API key not found. Check your .env file.");

  const res = await fetch(
    `https://api.groq.com/openai/v1/chat/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
      }),
    }
  );

  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  const text = data.choices[0].message.content;
  setOutput(text);
  setStatus("done");
} catch (err) {
  setError(err.message || "Something went wrong. Please try again.");
  setStatus("error");
}
  };

  const handleGenerate = () => {
    if (!form.name || !form.role || !form.company) {
      setError("Please fill in Name, Role, and Company to continue.");
      setStatus("error");
      return;
    }
    setError("");
    if (mode === "ai") generateAI();
    else generateTemplate();
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setOutput("");
    setStatus("idle");
    setError("");
  };

  const isEmpty = status === "idle";
  const isGenerating = status === "generating";
  const isDone = status === "done";

  return (
    <>
      <style>{FONTS}{styles}</style>

      <div className="app">
        <header className="header">
          <div className="header-left">
            <div className="wordmark">Prodesk IT · Sprint 04</div>
            <h1 className="headline">
              Cover Letter<br /><em>Generator</em>
            </h1>
          </div>
          <div className="header-badge">AI-POWERED · SaaS UTILITY</div>
        </header>

        <div className="layout">
          <div>
            <div className="panel">
              <div className="panel-header">
                <div className="panel-num">1</div>
                <span className="panel-title">Your Details</span>
              </div>
              <div className="panel-body">
                <div className="mode-toggle">
                  <button
                    className={`mode-btn ${mode === "ai" ? "active" : ""}`}
                    onClick={() => setMode("ai")}
                  >
                    ✦ AI Generated
                  </button>
                  <button
                    className={`mode-btn ${mode === "template" ? "active" : ""}`}
                    onClick={() => setMode("template")}
                  >
                    ◻ Template
                  </button>
                </div>

                <div className="field">
                  <label>Your Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Priya Sharma" />
                </div>

                <div className="field">
                  <label>Job Role *</label>
                  <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Product Manager" />
                </div>

                <div className="field">
                  <label>Target Company *</label>
                  <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Infocera Technologies" />
                </div>

                <div className="field">
                  <label>Key Skills</label>
                  <input name="skills" value={form.skills} onChange={handleChange} placeholder="e.g. React, Node.js, System Design" />
                </div>

                <div className="field">
                  <label>Job Description / Notes</label>
                  <textarea name="jd" value={form.jd} onChange={handleChange} placeholder="Paste the job description or key requirements here…" />
                </div>

                <div className="field">
                  <label>Tone</label>
                  <select
                    name="tone"
                    value={form.tone}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      background: "var(--paper)",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      padding: "11px 14px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "var(--ink)",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="professional">Professional & Formal</option>
                    <option value="enthusiastic">Enthusiastic & Warm</option>
                    <option value="concise">Concise & Direct</option>
                  </select>
                </div>

                {error && (
                  <div className="error-box">
                    <span>⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                <button className="btn btn-primary" onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                      Crafting your letter…
                    </>
                  ) : (
                    <>{mode === "ai" ? "✦ Generate with AI" : "◻ Use Template"}</>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="output-panel">
              <div className="output-header">
                <div className="output-title-row">
                  <div className={`status-dot ${isGenerating ? "ai" : isDone ? "ready" : ""}`} />
                  <span className="panel-title">
                    {isGenerating ? "Generating" : isDone ? "Your Cover Letter" : "Output"}
                  </span>
                  {isDone && <span className="meta-tag">{mode === "ai" ? "AI" : "TEMPLATE"}</span>}
                </div>
                {isDone && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost" onClick={handleReset}>↺ Reset</button>
                    <button className="btn btn-ghost" onClick={handleCopy}>
                      {copied ? "✓ Copied!" : "⧉ Copy"}
                    </button>
                  </div>
                )}
              </div>

              <div className="output-body">
                {isEmpty && (
                  <div className="empty-state">
                    <div className="empty-icon">✉</div>
                    <div className="empty-text">Your letter will appear here</div>
                    <div className="empty-sub">Fill in your details and click generate</div>
                  </div>
                )}
                {isGenerating && (
                  <div className="generating">
                    <div className="spinner" />
                    <div className="gen-label">Crafting your letter<span className="gen-dots" /></div>
                  </div>
                )}
                {isDone && output && (
                  <div className="letter-content">{output}</div>
                )}
              </div>
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <span className="meta-tag">Phase 1 ✓ Template</span>
              <span className="meta-tag">Phase 2 ✓ AI Integration</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`copy-toast ${copied ? "show" : ""}`}>
        ✓ Copied to clipboard
      </div>
    </>
  );
}