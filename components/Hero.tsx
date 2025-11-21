import React from 'react';
import { Github, Linkedin, Mail, Download, Code2 } from 'lucide-react';
import { PROFILE } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="about" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-mono font-medium">
                <span>Open to Work</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Hello, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {PROFILE.name}
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-slate-400 font-light">
                {PROFILE.title}
              </h2>
            </div>

            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed border-l-4 border-slate-800 pl-6">
              {PROFILE.summary}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href={PROFILE.github} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all hover:scale-110 border border-slate-700"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a 
                href={PROFILE.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-300 hover:bg-[#0077b5] hover:text-white transition-all hover:scale-110 border border-slate-700"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={PROFILE.leetcode} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-slate-300 hover:bg-[#FFA116] hover:text-white transition-all hover:scale-110 border border-slate-700"
                aria-label="LeetCode Profile"
              >
                <Code2 size={20} />
              </a>
              <a 
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 text-white font-medium hover:bg-cyan-500 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              >
                <Mail size={20} />
                <span>Contact Me</span>
              </a>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-600 text-slate-300 font-medium hover:border-slate-400 hover:text-white transition-all">
                <Download size={20} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Visual Code/Stats Block */}
          <div className="hidden lg:block flex-1 w-full max-w-md">
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex">
                  <span className="text-purple-400 mr-2">const</span>
                  <span className="text-blue-400 mr-2">engineer</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-slate-400 ml-2">{'{'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-slate-500">exp_years:</span>
                  <span className="text-orange-400 ml-2">11,</span>
                </div>
                <div className="pl-4">
                  <span className="text-slate-500">focus:</span>
                  <span className="text-green-400 ml-2">['Fintech', 'Cloud'],</span>
                </div>
                 <div className="pl-4">
                  <span className="text-slate-500">problem_solving:</span>
                  <span className="text-green-400 ml-2">['LeetCode', 'DSA'],</span>
                </div>
                 <div className="pl-4">
                  <span className="text-slate-500">stack:</span>
                  <span className="text-green-400 ml-2">['Java', 'React', 'AWS']</span>
                </div>
                <div>
                  <span className="text-slate-400">{'}'}</span><span className="text-slate-400">;</span>
                </div>
                
                <div className="pt-4 border-t border-slate-800 mt-4 text-xs text-slate-500">
                  // Compiling solutions...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;