import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { SkillDiscovery } from "@/components/SkillDiscovery"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SkillDiscovery />
    </div>
  );
};

export default Index;
