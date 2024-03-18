"use client";

import Skills from "@/utils/ENUM_Skills";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function TechStack() {
  const sectionContainer = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionContainer.current?.setAttribute("data-visible", "true");
        } else {
          sectionContainer.current?.setAttribute("data-visible", "false");
        }
      });
    });
    observer.observe(sectionContainer.current as Element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionContainer}
      data-visible={false}
      className="group h-screen"
    >
      <div className="*:translate-y-1/2 *:opacity-0 *:transition-all *:duration-1000 *:group-data-[visible=true]:opacity-[unset] *:group-data-[visible=true]:translate-y-0 text-center motion-reduce:*:transition-none">
        <h2 className="text-4xl">Got it all covered!</h2>
        <p className="text-xl delay-200">
          Continuously learning and focusing on latest technology...
        </p>
      </div>
      <div className="grid grid-cols-2 grid-rows-[repeat(3,auto)] max-w-[50%] items-start justify-center gap-2 mt-7 mx-auto">
        {Object.entries(Skills).map(([technology, skills]) => (
          <fieldset
            key={technology}
            data-type={technology}
            className="group border rounded-lg border-purple-500 p-3 data-[type=FrontEnd]:row-start-3 data-[type=FrontEnd]:col-span-2 data-[type=DevOps]:row-span-2 data-[type=Database]:col-span-2"
          >
            <legend className="font-bold text-xl mb-1">{technology}</legend>
            <ul className="flex flex-wrap gap-5 group-data-[type=FrontEnd]:flex-row group-data-[type=FrontEnd]:flex-wrap">
              {Object.values(skills).map((skill) => {
                return (
                  <li
                    key={skill.name}
                    className="flex gap-2 items-center"
                    title={skill.name}
                  >
                    <Image
                      alt={skill.name}
                      src={skill.icon}
                      width={25}
                      height={25}
                    />{" "}
                    <span className="text-lg">{skill.name}</span>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
    </section>
  );
}
