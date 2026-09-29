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
      desc: 'Launch interactive sandboxes directly from your browser. Inspect module interfaces, schemas, and reports before any commercial decision.'
    },
    {
      num: '02',
      icon: <KeyRound size={20} />,
      title: 'Choose Your License',
      desc: 'Select a Single-Domain Production License or Full Source Tier. Get transparent pricing with zero recurring monthly subscription fees.'
    },
    {
      num: '03',
      icon: <DownloadCloud size={20} />,
      title: 'Deploy to Your Server',
      desc: 'Receive verified deployment packages or Git repository access. Install on your local hardware, Docker, AWS, or any Linux server.'
    },
    {
      num: '04',
      icon: <Wrench size={20} />,
      title: 'Customize & Scale',
      desc: 'Use the software as delivered or request custom feature development directly from our in-house engineering team.'
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
