import Header from "@/components/Header";
import HeroSection from "@/views/HeroSection";
import Projects from "@/views/ProjectSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection header={"HEADER"} />
      <Projects />
    </div>
  );
}
