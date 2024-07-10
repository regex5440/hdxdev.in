import GithubSVG from "@/public/SVG/Github";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";

export type ProjectMetadata = {
  title: string;
  code: string;
  stack?: string[];
  type: "fe" | "be";
  url?: string;
  tags?: string[];
  description?: string;
} & (
  | {
      url: string;
      type: "fe";
    }
  | {
      type: "be";
      tags: string[];
      description: string;
    }
);

export default forwardRef(function BrowserTemplate(
  {
    children,
    metadata: { type, title, code, stack, description, tags, url },
    className,
    style,
  }: {
    children?: React.ReactNode;
    className?: string;
    metadata: ProjectMetadata;
    style?: React.CSSProperties;
  },
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div className={"group/browser " + className} ref={ref} style={style}>
      <div className="border pt-2 h-full w-full flex flex-col rounded-[inherit] relative overflow-hidden">
        <div className="w-1/5 rounded-t-xl bg-slate-600 pl-4 py-1">{title}</div>
        <div className="border-t flex-grow pointer-events-none">
          {url && (
            <iframe
              className="w-full h-full bg-white pointer-events-none select-none overflow-hidden"
              src={url}
              loading="lazy"
              sandbox=""
            />
          )}
          {!url && (
            <div className="absolute top-0 bottom-0 h-fit w-fit my-auto transition-all left-1/2 duration-300 group-data-[all-visible=false]/projects:-translate-x-1/2 group-data-[all-visible=true]/projects:left-4 group-[all-visible=true]/projects:-translate-x-0">
              <div className="text-6xl">{title}</div>
              <div className="text-2xl">{description}</div>
            </div>
          )}
        </div>
        <nav className="absolute -left-full opacity-0 transition-all duration-300 group-hover/browser:-left-1 group-hover/browser:opacity-100 bottom-7 z-10">
          {url && (
            <Link
              href={url}
              target="_blank"
              className="bg-slate-500 flex py-1 px-2 items-center gap-2 mb-2"
            >
              <ExternalLink size={16} /> Live
            </Link>
          )}
          <Link
            href={code}
            target="_blank"
            className="bg-slate-500 flex py-1 px-2 items-center gap-2"
          >
            <GithubSVG className="w-4 h-4" /> Repo
          </Link>
        </nav>
      </div>
    </div>
  );
});
