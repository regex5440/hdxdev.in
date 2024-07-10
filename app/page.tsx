"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/views/ProjectSection";
import TechStack from "@/views/TechStack";
import { useCallback, useEffect, useRef, useState } from "react";

//TODO: Do not preserve the scroll position of the page on refresh, go to top of the page on refresh
export default function HeroSection() {
  const heading = useRef<HTMLHeadingElement>(null);
  const sectionContainer = useRef<HTMLDivElement>(null);
  const descriptionPara = useRef<HTMLParagraphElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const scrollHandler: ScrollHandler = useCallback((e) => {
    const scrolled = window.scrollY;
    const sectionContainerHeight = sectionContainer.current?.scrollHeight || 0;
    requestAnimationFrame((t) => {
      const sectionScrollLimit1 = sectionContainerHeight * 0.3;
      // const sectionScrollLimit2 = sectionContainerHeight * 0.85;

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
          heading.current.style.transform = `scale(${1 + scrolled * 0.009})`;
        }
      }
      if (descriptionPara.current) {
        descriptionPara.current.setAttribute(
          "style",
          "letter-spacing: " + scrolled * 0.01 + "px"
        );
        //* Header visibility
        const clientBoundedRect =
          descriptionPara.current.getBoundingClientRect();
        if (clientBoundedRect.top <= 23) {
          sectionContainer.current?.style.setProperty("opacity", "0");
          setHeaderVisible(true);
        } else {
          // setHeaderVisible(false);
          sectionContainer.current?.style.setProperty("opacity", "1");
        }
      }
    });
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.addEventListener("scroll", scrollHandler);
        } else {
          document.removeEventListener("scroll", scrollHandler);
        }
      });
    });
    observer.observe(sectionContainer.current as Element);
    if (sectionContainer.current && descriptionPara.current) {
      if (descriptionPara.current.getBoundingClientRect().top <= 23) {
        setHeaderVisible(true);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [scrollHandler]);
  return (
    <>
      <Header visible={headerVisible} />
      <div className={`group${headerVisible ? " header" : ""}`}>
        <div ref={sectionContainer} className="h-2screen transition-opacity">
          <div className="sticky top-0 m-auto w-full h-screen flex flex-col items-center justify-center overflow-hidden">
            <h1 ref={heading} className="origin-center text-6xl">
              H<span className="text-5xl">D</span>
              <span className="text-4xl">x</span>D
              <span className="text-5xl">EV</span>
              <span className="text-2xl">.in</span>
            </h1>
            <small>by</small>
            <h2 ref={descriptionPara}>Harsh Dagar</h2>
          </div>
        </div>
      </div>
      <div className="min-h-4screen has-[[data-all-visible=true]]:min-h-unset">
        <TechStack />
        <Projects />
      </div>
      <Footer />
    </>
  );
}
