import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/marketplaceData';

export default function FaqSection({ onOpenContact }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="faq-section" id="faqs">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-head-compact text-center">
          <h2 className="section-title-compact">Frequently Asked Questions</h2>
          <p className="section-desc-compact">
            Direct answers addressing software deployment, source code access, and licensing terms.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="faq-accordion-wrapper">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx}
                className={`faq-item-card ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{faq.q}</span>
                  <div className={`faq-chevron-wrap ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-pane">
                    <p className="faq-answer-text">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="faq-contact-card">
          <div className="faq-contact-info">
            <MessageSquare size={22} className="text-orange" />
            <div>
              <h4 className="contact-title">Have unique architecture or compliance requirements?</h4>
              <p className="contact-desc">Our lead engineers are available to review your infrastructure and integration scope.</p>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onOpenContact}>
            <span>Contact Engineering Team</span>
          </button>
        </div>

      </div>
    </section>
  );
}
