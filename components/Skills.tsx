import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { SKILLS } from '../constants';

interface SkillsProps {
  selectedSkill: string | null;
  onSkillSelect: (skill: string | null) => void;
}

// Colors matching the theme
const COLORS = {
  frontend: '#22d3ee', // cyan-400
  backend: '#818cf8', // indigo-400
  devops: '#f472b6', // pink-400
  tools: '#34d399', // emerald-400
  text: '#cbd5e1', // slate-300
  line: '#334155', // slate-700
};

const Skills: React.FC<SkillsProps> = ({ selectedSkill, onSkillSelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  
  // Ref to track selected skill without triggering re-renders of the graph
  const selectedSkillRef = useRef(selectedSkill);
  useEffect(() => {
    selectedSkillRef.current = selectedSkill;
  }, [selectedSkill]);

  // Memoize data structure so it's stable across renders
  const { nodes, links } = useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];

    SKILLS.forEach((cat, idx) => {
      const colorKey = idx === 0 ? 'frontend' : idx === 1 ? 'backend' : idx === 2 ? 'devops' : 'tools';
      
      // Category Node
      nodes.push({ 
        id: cat.category, 
        group: 'category', 
        radius: 24, 
        color: COLORS[colorKey as keyof typeof COLORS],
        category: cat.category
      });

      // Skill Nodes
      cat.skills.forEach(skill => {
        nodes.push({ 
          id: skill, 
          group: 'skill', 
          radius: 8, 
          color: COLORS[colorKey as keyof typeof COLORS],
          category: cat.category
        });
        
        links.push({ source: cat.category, target: skill, distance: 50 });
      });
    });

    // Cross links
    const addCrossLink = (source: string, target: string) => {
      if (nodes.find(n => n.id === source) && nodes.find(n => n.id === target)) {
        links.push({ source, target, distance: 100, type: 'cross' });
      }
    };

    addCrossLink("Java", "Spring Boot");
    addCrossLink("React", "JavaScript");
    addCrossLink("AWS", "Docker");
    addCrossLink("Microservices", "Docker");
    addCrossLink("Spring Boot", "Microservices");
    addCrossLink("TDD", "JUnit");
    addCrossLink("Angular", "JavaScript");
    addCrossLink("HTML/CSS", "JavaScript");

    return { nodes, links };
  }, []);

  // Helper to update highlighting
  const updateHighlight = (targetId: string | null) => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const node = svg.selectAll<SVGCircleElement, any>(".node-group");
    const link = svg.selectAll<SVGLineElement, any>(".link");
    const text = svg.selectAll<SVGTextElement, any>(".label");

    if (targetId) {
        // Dim all
        node.transition().duration(200).style("opacity", 0.1);
        link.transition().duration(200).style("opacity", 0.05);
        text.transition().duration(200).style("opacity", 0.1);
        
        // Identify connected nodes
        const linkedIds = new Set([targetId]);
        const connectedLinks = new Set();

        links.forEach((d: any) => {
            const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
            const targetIdVal = typeof d.target === 'object' ? d.target.id : d.target;
            
            if (sourceId === targetId || targetIdVal === targetId) {
                linkedIds.add(sourceId);
                linkedIds.add(targetIdVal);
                connectedLinks.add(d);
            }
        });

        // Highlight selected
        node.filter((d: any) => linkedIds.has(d.id))
            .transition().duration(200)
            .style("opacity", 1);
            
        link.filter((d: any) => connectedLinks.has(d))
            .transition().duration(200)
            .style("opacity", 0.8)
            .attr("stroke", "#fff")
            .attr("stroke-width", 2);

        text.filter((d: any) => linkedIds.has(d.id))
            .transition().duration(200)
            .style("opacity", 1)
            .style("font-weight", "bold");
            
    } else {
        // Reset
        node.transition().duration(200).style("opacity", (d:any) => d.group === 'category' ? 0.8 : 1);
        link.transition().duration(200).style("opacity", 0.2).attr("stroke", COLORS.line).attr("stroke-width", (d: any) => d.type === 'cross' ? 1 : 1.5);
        text.transition().duration(200).style("opacity", 1).style("font-weight", (d: any) => d.group === 'category' ? "700" : "400");
    }
  };

  // Update highlight when selectedSkill prop changes
  useEffect(() => {
    updateHighlight(selectedSkill);
  }, [selectedSkill, links]); // links dependency to ensure data is ready

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Main D3 Graph Initialization
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 600;
    
    const centers: Record<string, { x: number, y: number }> = {
      "Core & Frontend": { x: width * 0.25, y: height * 0.25 },
      "Backend & Database": { x: width * 0.75, y: height * 0.25 },
      "DevOps & Cloud": { x: width * 0.25, y: height * 0.75 },
      "Practices & Tools": { x: width * 0.75, y: height * 0.75 }
    };

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; overflow: visible;");

    // Filters
    const defs = svg.append("defs");
    const glowFilter = defs.append("filter").attr("id", "glow");
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("class", "link")
      .attr("stroke", COLORS.line)
      .attr("stroke-opacity", 0.2)
      .attr("stroke-width", (d: any) => d.type === 'cross' ? 1 : 1.5);

    // Nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "node-group")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    // Node Circles
    node.append("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", (d: any) => d.group === 'category' ? 'none' : d.color)
      .attr("stroke", (d: any) => d.color)
      .attr("stroke-width", (d: any) => d.group === 'category' ? 1.5 : 2)
      .style("filter", (d: any) => d.group === 'category' ? "none" : "url(#glow)")
      .style("cursor", "pointer");

    // Labels
    node.append("text")
      .text((d: any) => d.id)
      .attr("class", "label")
      .attr("x", (d: any) => d.radius + 8)
      .attr("y", 5)
      .attr("font-family", "Inter, sans-serif")
      .attr("font-size", (d: any) => d.group === 'category' ? "14px" : "12px")
      .attr("font-weight", (d: any) => d.group === 'category' ? "700" : "400")
      .attr("fill", (d: any) => d.group === 'category' ? "#fff" : COLORS.text)
      .style("pointer-events", "none")
      .style("text-shadow", "0 2px 4px rgba(0,0,0,0.8)");

    // Simulation
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance((d: any) => d.type === 'cross' ? 100 : 40))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 15))
      .force("x", d3.forceX((d: any) => centers[d.category]?.x || width / 2).strength(0.06))
      .force("y", d3.forceY((d: any) => centers[d.category]?.y || height / 2).strength(0.06));

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Interaction Events
    node
      .on("mouseover", (event, d) => {
        updateHighlight(d.id);
        d3.select(event.currentTarget).select("circle")
            .transition().duration(200)
            .attr("r", d.radius * 1.2)
            .attr("fill", "#fff");
      })
      .on("mouseout", (event, d) => {
        updateHighlight(selectedSkillRef.current); // Revert to selected skill state
        d3.select(event.currentTarget).select("circle")
            .transition().duration(200)
            .attr("r", d.radius)
            .attr("fill", d.group === 'category' ? 'none' : d.color);
      })
      .on("click", (event, d) => {
        event.stopPropagation();
        onSkillSelect(d.id);
      });

    // Click background to clear
    d3.select(svgRef.current).on("click", () => {
        onSkillSelect(null);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Initial highlight check (if selectedSkill provided on mount)
    updateHighlight(selectedSkillRef.current);

    return () => {
      simulation.stop();
    };
  }, [nodes, links]); // Only run once when nodes/links are ready

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className={`mb-10 text-center transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Technical Arsenal</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A comprehensive network of technologies defining my engineering stack. 
            <br/>
            <span className="text-cyan-400 text-sm font-mono mt-2 inline-block">
                Interact with the graph to filter experience
            </span>
          </p>
          {selectedSkill && (
             <button 
               onClick={() => onSkillSelect(null)}
               className="mt-6 px-6 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 rounded-full hover:bg-cyan-500/20 transition-all animate-pulse"
             >
               Reset Filter: <span className="font-bold ml-1">{selectedSkill}</span>
             </button>
          )}
        </div>

        <div 
            ref={containerRef} 
            className={`w-full h-[600px] bg-gradient-to-b from-slate-900/20 to-slate-950 rounded-3xl border border-slate-800/50 overflow-hidden cursor-move mb-16 relative shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <svg ref={svgRef} className="w-full h-full relative z-10"></svg>
        </div>

        {/* Category List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((category, catIndex) => (
            <div 
              key={catIndex} 
              className={`space-y-4 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${catIndex * 100}ms` }}
            >
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]`} 
                    style={{ color: catIndex === 0 ? COLORS.frontend : catIndex === 1 ? COLORS.backend : catIndex === 2 ? COLORS.devops : COLORS.tools, backgroundColor: 'currentColor' }}></div>
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <button 
                        key={skill} 
                        onClick={() => onSkillSelect(skill)}
                        className={`px-3 py-1.5 text-xs font-medium rounded border transition-all duration-200
                          ${isSelected 
                             ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105' 
                             : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-slate-800'}`}
                      >
                        {skill}
                      </button>
                    );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;