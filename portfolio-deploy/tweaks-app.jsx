/* Tweaks app for Esther Wang Portfolio.
   Mounts a React island that drives the page's CSS variables + layout classes.
   Loaded after React, ReactDOM, and tweaks-panel.jsx. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#B8860B", "#8F6907", "#D8A93F"],
  "bg": ["#FAF7F1", "#F2ECE1"],
  "serifFont": "Newsreader",
  "sansFont": "Hanken Grotesk",
  "photoSide": "Right",
  "motion": true
}/*EDITMODE-END*/;

const SERIF_STACKS = {
  "Newsreader": '"Newsreader", Georgia, "Times New Roman", serif',
  "Spectral": '"Spectral", Georgia, "Times New Roman", serif',
  "Lora": '"Lora", Georgia, "Times New Roman", serif'
};
const SANS_STACKS = {
  "Hanken Grotesk": '"Hanken Grotesk", system-ui, -apple-system, sans-serif',
  "IBM Plex Sans": '"IBM Plex Sans", system-ui, -apple-system, sans-serif'
};

const ACCENT_OPTIONS = [
  ["#B8860B", "#8F6907", "#D8A93F"], // goldenrod (default)
  ["#C68A1E", "#9A6A12", "#E0B24F"], // amber
  ["#A9722F", "#83531F", "#C99A5B"], // bronze
  ["#9F8748", "#79642F", "#C7B473"]  // antique brass
];
const BG_OPTIONS = [
  ["#FAF7F1", "#F2ECE1"], // warm (default)
  ["#FAF9F6", "#EFEDE7"], // neutral
  ["#F6F8FB", "#EAEEF3"]  // cool
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(function () {
    const r = document.documentElement;
    const a = Array.isArray(t.accent) ? t.accent : TWEAK_DEFAULTS.accent;
    r.style.setProperty("--gold", a[0]);
    r.style.setProperty("--gold-deep", a[1]);
    r.style.setProperty("--gold-bright", a[2]);

    const b = Array.isArray(t.bg) ? t.bg : TWEAK_DEFAULTS.bg;
    r.style.setProperty("--bg", b[0]);
    r.style.setProperty("--bg-alt", b[1]);

    r.style.setProperty("--serif", SERIF_STACKS[t.serifFont] || SERIF_STACKS.Newsreader);
    r.style.setProperty("--sans", SANS_STACKS[t.sansFont] || SANS_STACKS["Hanken Grotesk"]);

    r.classList.toggle("photo-left", t.photoSide === "Left");
    r.classList.toggle("no-motion", !t.motion);
  }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Color" />
      <TweakColor label="Accent" value={t.accent} options={ACCENT_OPTIONS}
                  onChange={(v) => setTweak("accent", v)} />
      <TweakColor label="Background" value={t.bg} options={BG_OPTIONS}
                  onChange={(v) => setTweak("bg", v)} />

      <TweakSection label="Type" />
      <TweakRadio label="Headline" value={t.serifFont}
                  options={["Newsreader", "Spectral", "Lora"]}
                  onChange={(v) => setTweak("serifFont", v)} />
      <TweakRadio label="Body text" value={t.sansFont}
                  options={["Hanken Grotesk", "IBM Plex Sans"]}
                  onChange={(v) => setTweak("sansFont", v)} />

      <TweakSection label="Layout & motion" />
      <TweakRadio label="Photo side" value={t.photoSide}
                  options={["Right", "Left"]}
                  onChange={(v) => setTweak("photoSide", v)} />
      <TweakToggle label="Entrance motion" value={t.motion}
                   onChange={(v) => setTweak("motion", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
