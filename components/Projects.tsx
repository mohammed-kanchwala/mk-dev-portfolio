import React, { useState } from 'react';
import { FolderGit2, Github, ExternalLink, Filter } from 'lucide-react';
import { PROJECTS } from '../constants';

interface ProjectsProps {
  selectedSkill: string | null;
  onSkillSelect: (skill: string | null) => void;
}

const Projects: React.FC<ProjectsProps> = ({ selectedSkill, onSkillSelect }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filterTags = ["All", "Java", "Spring Boot", "React", "AWS", "Security"];

  const filteredProjects = selectedSkill && selectedSkill !== "All"
    ? PROJECTS.filter(project => 
        project.technologies.some(tech => tech.toLowerCase() === selectedSkill.toLowerCase())
      )
    : PROJECTS;

  return (
    <section id="projects" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-900 to-transparent opacity-30 pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
              <FolderGit2 className="text-cyan-500" />
              Featured Projects
            </h2>
            <p className="text-slate-400 max-w-xl">
              A selection of technical projects demonstrating expertise in full-stack development and cloud architecture.
            </p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTags.map(tag => (
              <button
                key={tag}
                onClick={() => onSkillSelect(tag === "All" ? null : tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  (tag === "All" && !selectedSkill) || tag === selectedSkill
                    ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:bg-slate-900 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-[1.02] hover:-translate-y-1 flex flex-col"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full transform hover:scale-110 duration-200">
                        <Github size={20} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors p-2 hover:bg-slate-800 rounded-full transform hover:scale-110 duration-200">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-slate-400 mb-8 leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.technologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSkillSelect(selectedSkill === tech ? null : tech);
                      }}
                      className={`text-xs font-mono px-3 py-1 rounded border transition-colors ${
                        selectedSkill === tech
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                          : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-cyan-500/30 hover:text-cyan-400'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
              <Filter className="mx-auto text-slate-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-slate-300">No projects found</h3>
              <p className="text-slate-500 mt-2">
                No projects match the filter "<span className="text-cyan-400">{selectedSkill}</span>". 
                <button onClick={() => onSkillSelect(null)} className="ml-2 underline hover:text-white">Clear filter</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;