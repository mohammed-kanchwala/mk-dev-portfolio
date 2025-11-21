import React from 'react';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { PROFILE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">{PROFILE.name}</p>
            <p className="text-slate-500 text-sm">Building robust, user-centric applications.</p>
        </div>
        
        <div className="flex items-center gap-6">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors" aria-label="GitHub">
                <Github size={20} />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#0077b5] transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
            </a>
             <a href={PROFILE.leetcode} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-[#FFA116] transition-colors" aria-label="LeetCode">
                <Code2 size={20} />
            </a>
             <a href={`mailto:${PROFILE.email}`} className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Email">
                <Mail size={20} />
            </a>
        </div>

        <div className="text-slate-600 text-sm">
            © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;