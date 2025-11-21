import React from 'react';
import { Zap, Shield, TrendingUp, Users, CreditCard, Server } from 'lucide-react';
import { METRICS } from '../constants';
import { MetricItem } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Shield,
  TrendingUp,
  Users,
  CreditCard,
  Server,
};

const ImpactCard: React.FC<{ metric: MetricItem }> = ({ metric }) => {
  const Icon = iconMap[metric.iconName];
  return (
    <div className="group p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all hover:bg-slate-850 relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-2xl group-hover:from-cyan-500/30 transition-all"></div>
      
      <div className="relative z-10">
        <div className="mb-4 inline-flex p-3 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/30 transition-colors">
          <Icon size={24} />
        </div>
        
        <h3 className="text-4xl font-bold text-white mb-1 tracking-tight group-hover:text-cyan-400 transition-colors">
          {metric.value}
        </h3>
        <p className="text-lg font-medium text-slate-200 mb-3">
          {metric.description}
        </p>
        <p className="text-sm text-slate-500 font-mono leading-relaxed">
          // {metric.context}
        </p>
      </div>
    </div>
  );
};

const ImpactMetrics: React.FC = () => {
  return (
    <section id="impact" className="py-20 bg-slate-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Key Impact</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Quantifiable achievements demonstrating successful delivery in fintech, performance optimization, and security enhancement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METRICS.map((metric) => (
            <ImpactCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;