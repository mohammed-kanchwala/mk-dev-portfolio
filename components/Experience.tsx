import React from 'react';
import { Calendar, MapPin, CheckCircle2, Filter } from 'lucide-react';
import { EXPERIENCE } from '../constants';

interface ExperienceProps {
  selectedSkill: string | null;
}

const Experience: React.FC<ExperienceProps> = ({ selectedSkill }) => {
  return (
    <section id="experience" className="py-20 bg-slate-900/50 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Work Experience</h2>
            <p className="text-slate-400">
              Over a decade of engineering excellence across global organizations.
            </p>
          </div>
          {selectedSkill && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 animate-fade-in">
              <Filter size={16} />
              <span className="text-sm font-medium">Filtering by: {selectedSkill}</span>
            </div>
          )}
        </div>

        <div className="relative space-y-12">
          {/* Vertical line connecting timeline items */}
          <div className="absolute left-4 md:left-0 top-4 bottom-4 w-0.5 bg-slate-800 hidden md:block md:ml-8"></div>

          {EXPERIENCE.map((job) => {
            // Determine if this job is relevant to the selected skill
            const isRelevant = !selectedSkill || job.tags.some(tag => 
              tag.toLowerCase().includes(selectedSkill.toLowerCase()) || 
              selectedSkill.toLowerCase().includes(tag.toLowerCase())
            );

            return (
              <div 
                key={job.id} 
                className={`relative pl-0 md:pl-24 group transition-all duration-500 ${isRelevant ? 'opacity-100 grayscale-0' : 'opacity-30 grayscale'}`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-0 md:left-8 top-0 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-slate-950 transition-colors hidden md:block z-10 ${isRelevant ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-800'}`}></div>

                <div className={`flex flex-col lg:flex-row lg:items-start gap-6 p-6 rounded-2xl border transition-all duration-300 ${isRelevant ? 'bg-slate-950 border-slate-700 hover:border-cyan-500/50' : 'bg-slate-950/50 border-slate-900'}`}>
                  <div className="lg:w-1/3 space-y-2 flex-shrink-0">
                    <h3 className={`text-xl font-bold transition-colors ${isRelevant ? 'text-white group-hover:text-cyan-400' : 'text-slate-500'}`}>
                      {job.company}
                    </h3>
                    <p className="text-lg text-slate-300 font-medium">{job.role}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={14} />
                      <span>{job.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin size={14} />
                      <span>{job.location}</span>
                    </div>
                    {/* Tags display */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/50">
                      {job.tags.slice(0, 4).map(tag => (
                        <span 
                          key={tag} 
                          className={`text-xs px-2 py-1 rounded-md border ${
                            selectedSkill === tag 
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' 
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {job.tags.length > 4 && <span className="text-xs text-slate-600 py-1">+{job.tags.length - 4}</span>}
                    </div>
                  </div>

                  <div className="lg:w-2/3 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6">
                    <ul className="space-y-4">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={18} className={`mt-1 flex-shrink-0 ${isRelevant ? 'text-cyan-500' : 'text-slate-700'}`} />
                          <span className={`leading-relaxed text-sm md:text-base ${isRelevant ? 'text-slate-400' : 'text-slate-600'}`}>
                            {achievement.replace(/(\d+%)/g, (match) => `**${match}**`).split('**').map((part, idx) => 
                              idx % 2 === 1 ? <span key={idx} className={isRelevant ? "text-white font-semibold" : ""}>{part}</span> : part
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;