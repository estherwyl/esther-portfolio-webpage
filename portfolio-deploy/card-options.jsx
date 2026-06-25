const { DesignCanvas, DCSection, DCArtboard } = window;

/* ---- icons ---- */
const GitIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"/></svg>
);
const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

/* ---- enriched project data ---- */
const projects = [
  {
    n: "01", cat: "AI Prototype", role: "Google DeepMind Hackathon", collab: "with Weng Siong Chan",
    title: "SingFlix",
    does: "Turns any Singapore landmark photo into a Netflix-style cinematic story across time.",
    built: "Built a multimodal pipeline that takes one photo and generates a narrated, era-spanning video, wrapped in a Netflix-style browse UI.",
    tags: ["Gemini", "Multimodal AI", "Prompt Design", "0→1 Product"],
  },
  {
    n: "02", cat: "Location AI", role: "GrabMaps Hackathon", collab: "with Weng Siong Chan",
    title: "QuestPass",
    does: "Turns a traveler's layover into curated leisure and dining around the city.",
    built: "Wired GrabMaps APIs into an LLM recommender that builds location-aware itineraries tuned to time-in-city and traveler intent.",
    tags: ["GrabMaps API", "LLM", "Geolocation", "Product"],
  },
  {
    n: "03", cat: "Decision Tool", role: "Solo project", collab: "",
    title: "JobSense",
    does: "A structured job-search dashboard that helps candidates evaluate opportunities by stage, score fit objectively, and decide the next best move.",
    built: "Designed a scoring model and decision gates, then built a dashboard that ranks roles and surfaces clear, unemotional next actions.",
    tags: ["Evaluation Logic", "Criteria Modeling", "Workflow Design"],
  },
  {
    n: "04", cat: "Data Dashboard", role: "Solo project", collab: "",
    title: "Network Compass",
    does: "Analyzes ~2,000 professional connections to surface who to talk to next.",
    built: "Built a pipeline that classifies ~2k connections by role, seniority and industry, with an interactive dashboard to spot networking gaps.",
    tags: ["Graph Analysis", "Recommendation", "Data Storytelling"],
  },
];

const Chips = ({ tags }) => (
  <div className="chips">{tags.map(t => <span className="chip" key={t}>{t}</span>)}</div>
);
const Links = () => (
  <div className="links">
    <a className="plink plink--primary" href="#"><LinkIcon/> Live demo</a>
    <a className="plink" href="#"><GitIcon/> Code</a>
  </div>
);

/* ============ OPTION A — SPEC SHEET ============ */
const CardA = ({ p }) => (
  <div className="a-card">
    <div className="a-top">
      <span className="cat">{p.cat}</span>
      <span className="a-num">{p.n}</span>
    </div>
    <h3 className="a-title">{p.title}</h3>
    <div className="a-role role">{p.role}{p.collab ? " · " + p.collab : ""}</div>
    <p className="a-does">{p.does}</p>
    <div className="a-built-wrap">
      <div className="a-built-label">What I built</div>
      <p className="a-built">{p.built}</p>
    </div>
    <div className="a-foot">
      <Chips tags={p.tags} />
      <Links />
    </div>
  </div>
);

/* ============ OPTION B — VISUAL FIRST ============ */
const CardB = ({ p }) => (
  <div className="b-card">
    <div className="b-media">
      <span className="cat">{p.cat}</span>
      <span className="b-shot">SCREENSHOT</span>
    </div>
    <div className="b-body">
      <h3 className="b-title">{p.title}</h3>
      <div className="b-role role">{p.role}{p.collab ? " · " + p.collab : ""}</div>
      <p className="b-does">{p.does}</p>
      <div className="b-foot">
        <Chips tags={p.tags} />
        <Links />
      </div>
    </div>
  </div>
);

/* ============ OPTION C — CASE-STUDY ROWS ============ */
const CardC = ({ p }) => (
  <div className="c-card">
    <div className="c-rail">
      <div className="c-num">{p.n}</div>
      <span className="cat">{p.cat}</span>
      <div className="role">{p.role}{p.collab ? " · " + p.collab : ""}</div>
      <Chips tags={p.tags} />
    </div>
    <div className="c-main">
      <h3 className="c-title">{p.title}</h3>
      <p className="c-does">{p.does}</p>
      <div className="c-built-label">What I built</div>
      <p className="c-built">{p.built}</p>
      <div className="c-foot"><Links /></div>
    </div>
  </div>
);

function App() {
  return (
    <DesignCanvas>
      <DCSection id="opts" title="Project Cards — Redesign Options" subtitle="Same 4 projects, three ways to make the build legible to employers">
        <DCArtboard id="a" label="A · Spec sheet" width={1180} height={940}>
          <div className="stage stage--alt">
            <p className="stage-eyebrow">Option A</p>
            <p className="stage-note">Scannable structure: category pill, role, one-line summary, a labeled <b>What I built</b> block, and skill chips. Reads like a tidy spec — fast for a recruiter to parse.</p>
            <div className="grid2">{projects.map(p => <CardA p={p} key={p.n} />)}</div>
          </div>
        </DCArtboard>

        <DCArtboard id="b" label="B · Visual first" width={1180} height={1040}>
          <div className="stage stage--alt">
            <p className="stage-eyebrow">Option B</p>
            <p className="stage-note">Leads with a product screenshot (drop a real one in later). The visual proves it shipped; the body stays lean — title, summary, skill chips, links.</p>
            <div className="grid2">{projects.map(p => <CardB p={p} key={p.n} />)}</div>
          </div>
        </DCArtboard>

        <DCArtboard id="c" label="C · Case-study rows" width={1180} height={1290}>
          <div className="stage stage--alt">
            <p className="stage-eyebrow">Option C</p>
            <p className="stage-note">Full-width rows with a context rail (number, category, role, skills) and a content column with summary + <b>What I built</b>. Most detail — reads like mini case studies.</p>
            <div className="c-stack">{projects.map(p => <CardC p={p} key={p.n} />)}</div>
          </div>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
