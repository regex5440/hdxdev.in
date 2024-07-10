import Link from "next/link";
import { Download, Menu, X } from "lucide-react";

type HeaderProps = {
  visible?: boolean;
};

export default function Header({ visible = false }: HeaderProps) {
  return (
    <div
      data-visible={visible}
      className={
        "group fixed py-5 px-7 top-0 w-full z-[1] opacity-0 transition-all backdrop-blur-sm shadow-2xl data-[visible=true]:opacity-100 data-[visible=false]:pointer-events-none bg-black bg-opacity-80"
      }
    >
      <div className="flex justify-between relative">
        <h2 className="tracking-[11px] group-data-[visible=true]:animate-slideLeft text-nowrap">
          Harsh Dagar
        </h2>
        <label htmlFor="menuTrigger" className="md:hidden">
          <Menu size={24} />
        </label>
        <input type="checkbox" id="menuTrigger" hidden />
        <nav className="max-md:fixed max-md:isolation-auto max-md:-right-full max-md:transition-[right] max-md:bg-black max-md:bg-opacity-95 max-md:backdrop-blur-sm group-has-[:checked]:max-md:-right-0 max-md:pl-6 max-md:pr-10 max-md:text-2xl max-md:top-0 z-10 max-md:flex-col max-md:h-screen max-sm:w-full max-md:w-fit max-md:duration-300 flex gap-5 md:overflow-y-hidden *:translate-y-full">
          <label className="md:hidden mb-10" htmlFor="menuTrigger">
            <X size={32} className="ml-auto" />
          </label>
          <div
            className={
              "group-data-[visible=true]:animate-[slideFadeIn_0.6s_ease-in-out_forwards]"
            }
          >
            <Link href={"#stack"}>Technology</Link>
          </div>
          <div
            className={
              "group-data-[visible=true]:animate-[slideFadeIn_0.6s_ease-in-out_forwards_0.3s]"
            }
          >
            <Link href={"#projects"}>Projects</Link>
          </div>
          <div
            className={
              "group-data-[visible=true]:animate-[slideFadeIn_0.6s_ease-in-out_forwards_0.6s]"
            }
          >
            <Link href={"#footer"}>Contact</Link>
          </div>
          <div
            className={
              "md:border-l md:pl-2 group-data-[visible=true]:animate-[slideFadeIn_0.6s_ease-in-out_forwards_0.9s]"
            }
          >
            <Link
              href=""
              download="Harsh-Dagar_Resume.pdf"
              title="Download Resume"
            >
              Resume <Download className="inline" size={16} />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
