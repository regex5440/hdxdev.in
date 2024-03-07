"use client";
import { useEffect, useRef } from "react";

export default function HeroSection(props: any) {
  const heading = useRef<HTMLHeadingElement>(null);
  const sectionContainer = useRef<HTMLDivElement>(null);
  const descriptionPara = useRef<HTMLParagraphElement>(null);
  console.log("HeroSectionProps", props);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionContainerHeight =
            sectionContainer.current?.scrollHeight || 0;
          document.onscroll = (e) => {
            const scrolled = window.scrollY;
            requestAnimationFrame((t) => {
              const sectionScrollLimit1 = sectionContainerHeight * 0.3;
              const sectionScrollLimit2 = sectionContainerHeight * 0.7;
              console.log(scrolled, sectionScrollLimit1);

              //* Below code is for hero styling
              if (heading.current) {
                if (scrolled > 10) {
                  if (scrolled < sectionScrollLimit1) {
                    heading.current.style.textShadow = `${scrolled * 0.01}px ${
                      scrolled * 0.01
                    }px ${scrolled * 0.1}px rgba(0, 0, 0, 0.5)`;
                  }
                } else {
                  heading.current.style.textShadow = "none";
                }

                if (scrolled > sectionScrollLimit1) {
                  heading.current.style.transform = `scale(${
                    1 + scrolled * 0.009
                  }) translateY(-${(scrolled - sectionScrollLimit1) * 0.1}px)`;
                  heading.current.style.opacity = `${1 - scrolled * 0.0001}`;
                } else {
                  heading.current.style.opacity = "1";
                  heading.current.style.transform = `scale(${
                    1 + scrolled * 0.009
                  })`;
                }
              }
              descriptionPara.current?.setAttribute(
                "style",
                "letter-spacing: " + scrolled * 0.01 + "px"
              );

              //* Header visibility
              if (scrolled > sectionScrollLimit2) {
              }
            });
          };
        }
      });
    });
    observer.observe(sectionContainer.current as Element);
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="bg-blue-900 h-2screen" ref={sectionContainer}>
      <div className="sticky top-0 m-auto w-full h-screen bg-slate-700 flex justify-center items-center flex-col overflow-hidden">
        <h1 ref={heading} className="origin-center text-6xl">
          HD x Dev.in
        </h1>
        <small>by</small>
        <p ref={descriptionPara} className="sticky top-0 drop-shadow-md">
          Harsh Dagar
        </p>
      </div>
    </div>
  );
}
