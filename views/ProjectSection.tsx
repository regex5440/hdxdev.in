"use client";

import { useCallback, useEffect, useRef } from "react";
import ProjectHeadlineSVG from "@/public/SVG/ProjectHeadline";

export default function Projects() {
  const projectSection = useRef<HTMLDivElement>(null);
  const projectHeadline = useRef<SVGPathElement>(null);
  const scrollHandler: ScrollHandler = useCallback((e) => {
    if (projectSection.current) {
      const scrolled = window.scrollY - projectSection.current?.offsetTop || 0;

      if (scrolled > 0) {
        // projectSection.current?.style.setProperty(
        //   "opacity",
        //   `${Math.min(1, scrolled * 0.01)}`
        // );
      } else {
      }
    }
  }, []);

  useEffect(() => {
    console.log("Length", projectHeadline.current?.getTotalLength());
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          projectSection.current?.setAttribute("data-visible", "true");
          document.addEventListener("scroll", scrollHandler);
        } else {
          projectSection.current?.setAttribute("data-visible", "false");

          document.removeEventListener("scroll", scrollHandler);
        }
      });
    });
    observer.observe(projectSection.current as Element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-visible={false}
      className="group h-2screen bg-slate-800 sticky"
      ref={projectSection}
    >
      <ProjectHeadlineSVG
        ref={projectHeadline}
        width={400}
        height={200}
        fill="black"
        stroke="white"
        className="ml-5 opacity-0 transition-all duration-1000 group-data-[visible=true]:opacity-100 group-data-[visible=true]:-translate-y-3/4"
      />
    </section>
  );
}
