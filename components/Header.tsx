export default function Header() {
  return (
    <div className={"fixed left-0 top-0 w-full z-[1] bg-slate-500"}>
      <div className="flex p-5 justify-between">
        <h1>Harsh Dagar</h1>
        <nav className="flex gap-5 overflow-y-hidden *:translate-y-full *:animate-slideFadeIn">
          <div className={"animate-[slideFadeIn_0.6s_ease-in-out_forwards]"}>
            Home
          </div>
          <div
            className={"animate-[slideFadeIn_0.6s_ease-in-out_forwards_0.3s]"}
          >
            Projects
          </div>
          <div
            className={"animate-[slideFadeIn_0.6s_ease-in-out_forwards_0.6s]"}
          >
            About
          </div>
        </nav>
      </div>
    </div>
  );
}
