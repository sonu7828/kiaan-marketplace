import React from 'react';
import { 
  Server, 
  Code2, 
  Wrench, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2 
} from 'lucide-react';

export default function WhyKiaan() {
  const pillars = [
    {
      icon: <Server size={22} />,
      title: 'Host on Your Own Server',
      desc: 'Deploy on your private Linux VM, Docker cluster, AWS, or local bare-metal server. Maintain 100% data sovereignty with zero vendor telemetry or third-party tracking.'
    },
    {
      icon: <Code2 size={22} />,
      title: 'Full Source Code Included',
      desc: 'Receive complete, unencrypted, production-grade source code. Modify modules, extend database schemas, and eliminate recurring per-seat user license fees.'
    },
    {
      icon: <Wrench size={22} />,
      title: 'Custom Engineering Support',
      desc: 'Direct consultation from the engineers who authored the software. We provide bespoke feature adaptations, ERP/CRM workflow tuning, and SLA retainers.'
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'One-Time Perpetual License',
      desc: 'Pay once for lifetime commercial usage rights. Includes 12 months of version releases and security patches with zero monthly subscription overhead.'
    }
  ];

  return (
    <section className="why-charcoal-section" id="why-kiaan">
      <div className="container">
        
        {/* Section Header */}
        <div className="why-header">
          <span className="why-eyebrow">WHY KIAAN TECHNOLOGY</span>
          <h2 className="why-title">Software Built for Long-Term Control</h2>
          <p className="why-desc">
            We build and maintain enterprise software for companies that prefer owning their technology instead of renting SaaS subscriptions.
          </p>
        </div>

        {/* 4 Charcoal Pillars Grid */}
        <div className="why-pillars-grid">
          {pillars.map((p, idx) => (
            <div key={idx} className="why-pillar-card">
              <div className="pillar-icon-box">
                {p.icon}
              </div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
