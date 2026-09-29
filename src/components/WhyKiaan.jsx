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
      desc: 'Deploy on your private Linux, Docker, or Cloud server. Your database and business records remain 100% under your control.'
    },
    {
      icon: <Code2 size={22} />,
      title: 'Full Source Code Included',
      desc: 'Receive complete, unencrypted source code. Modify modules, add custom workflows, and eliminate recurring user licenses.'
    },
    {
      icon: <Wrench size={22} />,
      title: 'Custom Engineering Support',
      desc: 'Because we engineered each solution, our team can tailor workflows, schemas, and integrations to match your exact business requirements.'
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'One-Time Perpetual License',
      desc: 'Pay once for a lifetime commercial license with 12 months of software updates and zero recurring subscription pressure.'
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
