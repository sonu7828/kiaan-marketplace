import React from 'react';
import { 
  Compass, 
  KeyRound, 
  DownloadCloud, 
  Wrench, 
  ArrowRight 
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      icon: <Compass size={20} />,
      title: 'Explore & Test Live Demos',
      desc: 'Launch interactive sandboxes from your browser with pre-configured Admin and Staff logins. Inspect live UI modules, reports, and technical docs before buying.'
    },
    {
      num: '02',
      icon: <KeyRound size={20} />,
      title: 'Select One-Time License',
      desc: 'Choose transparent one-time perpetual licensing with complete source code options. Deploy with zero monthly subscriptions or per-seat user fees.'
    },
    {
      num: '03',
      icon: <DownloadCloud size={20} />,
      title: 'Self-Host on Your Server',
      desc: 'Download verified release bundles with Docker Compose clusters and SQL schemas. Install on your private Linux VM or cloud server with complete data sovereignty.'
    },
    {
      num: '04',
      icon: <Wrench size={20} />,
      title: 'Customize & Expand',
      desc: 'Deploy out of the box or commission Kiaan Technology in-house engineers for bespoke module extensions, third-party API adapters, and white-labeling.'
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        
        <div className="section-head-compact text-center">
          <h2 className="section-title-compact">How It Works</h2>
          <p className="section-desc-compact">From initial evaluation to production deployment on your private infrastructure.</p>
        </div>

        <div className="how-steps-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="how-step-card">
              <div className="step-card-top">
                <span className="step-num-pill">{step.num}</span>
                <div className="step-icon-circle">
                  {step.icon}
                </div>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
