type HeaderProps = {
  visible?: boolean;
};

export default function Header({ visible = false }: HeaderProps) {
  //TODO: reverse animation on scroll up
  return (
    <div
      data-visible={visible}
      className={
        "group fixed py-5 px-7 top-0 w-full z-[1] opacity-0 transition-all backdrop-blur-sm pointer-events-none data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto"
      }
    >
      <div className="flex justify-between">
        <h2 className="tracking-[11px] group-data-[visible=true]:animate-slideLeft">
          Harsh Dagar
        </h2>
        <nav className="flex gap-5 overflow-y-hidden *:translate-y-full">
          <div
            className={
              "group-data-[visible=true]:animate-[slideFadeIn_0.6s_ease-in-out_forwards]"
            }
          >
            Home
          </div>
          <div
            className={
              "group-data-[visible=true]:animate-[slideFadeIn_0.6s_ease-in-out_forwards_0.3s]"
            }
          >
            Projects
          </div>
          <div
            className={
              "group-data-[visible=true]:animate-[slideFadeIn_0.6s_ease-in-out_forwards_0.6s]"
            }
          >
            About
          </div>
        </nav>
      </div>
    </div>
  );
}
