import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImpactMetrics from './components/ImpactMetrics';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillSelect = (skill: string | null) => {
    // Toggle: if clicking the same skill, clear filter
    setSelectedSkill(prev => prev === skill ? null : skill);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      <Hero />
      <ImpactMetrics />
      <Projects selectedSkill={selectedSkill} onSkillSelect={handleSkillSelect} />
      <Experience selectedSkill={selectedSkill} />
      <Skills selectedSkill={selectedSkill} onSkillSelect={handleSkillSelect} />
      <Footer />
    </main>
  );
};

export default App;