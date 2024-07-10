"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProjectHeadlineSVG from "@/public/SVG/ProjectHeadline";
import BrowserTemplate, { ProjectMetadata } from "@/components/BrowserTemplate";

const ProjectData: ProjectMetadata[] = [
  {
    type: "fe",
    url: "https://gb.hdxdev.in",
    title: "GridBox - E-commerce Platform",
    code: "https://github.com/regex5440/gridbox",
    stack: ["NextJS", "TailwindCSS", "PostgreSQL", "TypeScript"],
  },
  {
    type: "be",
    // url: "https://marketplace.visualstudio.com/items?itemName=HDxDev.envdot",
    title: "envdot - VSCode Extension",
    description: "VSCode extension for auto-suggesting environment variables",
    code: "https://github.com/regex5440/env.",
    tags: ["vscode", "extension", "typescript"],
  },
  {
    title: "HD-Mailer",
    code: "https://github.com/regex5440/hd-mailer",
    type: "be",
    description: "Mailing microservice for emails, used in other projects",
    tags: ["microservice", "email", "kafka"],
    stack: [
      "NodeJS",
      "TypeScript",
      "Nodemailer",
      "ExpressJS",
      "Kafka",
      "NGINX",
    ],
  },
  {
    type: "fe",
    url: "https://cc.hdxdev.in",
    title: "Chit-Chat - Communication App",
    code: "https://github.com/regex5440/chit-chat",
    stack: ["ReactJS", "SASS", "MongoDB", "TypeScript", "ExpressJS"],
  },
];

const SLIDES_SYNC_WITH_SCROLL = 4;
const DIVISIONS = Math.floor(
  100 / Math.min(SLIDES_SYNC_WITH_SCROLL, ProjectData.length)
);

export default function Projects() {
  const projectSection = useRef<HTMLElement>(null);
  const projectHeadline = useRef<HTMLHeadingElement>(null);
  const stickySectionTop = useRef<number>(0);
  const stickySectionAvailableHeight = useRef<number>(0);
  const slideContainer = useRef<HTMLDivElement>(null);
  const [allSlidesVisible, setAllSlidesVisible] = useState(false);

  const scrollHandler: ScrollHandler = useCallback((e) => {
    const scrolled = window.scrollY;
    const scrolledSection = scrolled - stickySectionTop.current;
    const scrolledPercentage =
      (scrolledSection / stickySectionAvailableHeight.current) * 100;

    requestAnimationFrame((t) => {
      if (projectHeadline.current) {
        if (scrolledPercentage > -50) {
          projectHeadline.current.dataset.scrolled = "true";
        }
      }
      if (slideContainer.current) {
        const slides = slideContainer.current
          .children as HTMLCollectionOf<HTMLDivElement>;
        if (scrolledPercentage > -35) {
          slides[0].classList.remove("opacity-40", "-translate-y-1/3");
        }
        if (scrolledPercentage > 0 && scrolledPercentage < 95) {
          const minLeft = Math.floor(
            50 -
              (slides[0].offsetWidth /
                2 /
                (slides[0].parentElement as HTMLDivElement).offsetWidth) *
                100
          );
          Array.from(slides).forEach((slide, i) => {
            if (i === 0) return;
            const index = i - 1;
            const init = DIVISIONS * index;
            const final = DIVISIONS * (index + 1);
            if (scrolledPercentage > init) {
              const left = (scrolledPercentage / final) * 100;
              slide.style.left = `${Math.max(minLeft, 100 - left)}%`;
            } else {
              slide.style.left = `100%`;
            }
          });
        }
        if (scrolledPercentage > 95) {
          setAllSlidesVisible(true);
        }
      }
    });
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (!allSlidesVisible) {
      if (!projectSection.current) return;
      const sectionParent = projectSection.current
        .parentElement as HTMLDivElement;
      const sectionParentTop = sectionParent.offsetTop;
      const sectionParentFirstChild =
        sectionParent.firstElementChild as HTMLElement;
      const sectionParentFirstChildHeight =
        sectionParentFirstChild.offsetHeight;

      stickySectionTop.current =
        sectionParentTop + sectionParentFirstChildHeight + 64; //64 -> offset of the sticky section
      stickySectionAvailableHeight.current =
        sectionParent.offsetHeight -
        sectionParentFirstChildHeight -
        projectSection.current.offsetHeight;
      observer = new IntersectionObserver((entries) => {
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
    }
    return () => {
      document.removeEventListener("scroll", scrollHandler);
      observer?.disconnect();
      slideContainer.current?.scrollTo({ left: 0, behavior: "smooth" });
    };
  }, [allSlidesVisible, scrollHandler]);

  return (
    <section
      data-visible={false}
      className="group h-screen sticky top-16 max-lg:mt-10"
      ref={projectSection}
    >
      <div className="mx-auto w-fit overflow-hidden -translate-x-1/2 transition-transform ease-out duration-[700ms] delay-100 has-[[data-scrolled=true]]:-translate-x-0">
        <h2
          className="text-5xl font-mono text-center translate-x-full transition-all ease-in-out duration-[1400ms] data-[scrolled=true]:translate-x-0 opacity-0 data-[scrolled=true]:drop-shadow-xl data-[scrolled=true]:opacity-100"
          ref={projectHeadline}
          data-scrolled="false"
        >
          Recent Work
        </h2>
      </div>
      <div
        className="flex h-[85vh] relative group/projects overflow-hidden mt-10 data-[all-visible=true]:overflow-x-scroll *:hover:data-[all-visible=true]:blur-sm custom-scrollbar-x"
        id={"projects"}
        ref={slideContainer}
        data-all-visible={allSlidesVisible}
      >
        {ProjectData.map((data, index) => (
          <BrowserTemplate
            metadata={data}
            className={
              `absolute max-md:w-11/12 md:w-3/4 h-[90%] shadow-2xl top-1/2 rounded-t-md -translate-y-1/2 transition-all duration-500 ease-out hover:scale-105 group-data-[all-visible=true]/projects:brightness-75 group-data-[all-visible=true]/projects:hover:brightness-100 group-data-[all-visible=true]/projects:hover:blur-0 bg-black ` +
              (index === 0
                ? "group-data-[all-visible=false]/projects:left-1/2 group-data-[all-visible=false]/projects:-translate-x-1/2 opacity-40 -translate-y-1/3"
                : "group-data-[all-visible=false]/projects:left-full")
            }
            key={index + "-project"}
            style={
              allSlidesVisible
                ? {
                    left: `${
                      (0.5 + index) *
                      (window.matchMedia("(min-width: 1024px)").matches
                        ? 10
                        : 30)
                    }%`,
                  }
                : {}
            }
          />
        ))}
      </div>
    </section>
  );
}
