import React, { useState, useEffect } from 'react';
import './InsurancePlansPage.css';

const InsurancePlansPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState([]);

  // Sample insurance plans data
  const insurancePlans = [
    {
      id: 1,
      title: "BasicCare Health",
      insurer: "Leadway Assurance",
      product_type: "health",
      premium: "₦15,000/year",
      coverage: "₦2,000,000",
      pros: [
        "Affordable monthly payments",
        "Covers basic medical needs",
        "Quick claim processing",
        "Wide hospital network"
      ],
      cons: [
        "Limited specialist coverage",
        "Basic dental coverage only"
      ],
      features: ["Inpatient Care", "Outpatient Care", "Emergency Services", "Pharmacy Benefits"],
      popular: false
    },
    {
      id: 2,
      title: "ComprehensiveCare Plus",
      insurer: "ARM Pension Managers",
      product_type: "health",
      premium: "₦35,000/year",
      coverage: "₦5,000,000",
      pros: [
        "Comprehensive coverage",
        "Includes dental and optical",
        "Maternity benefits included",
        "International emergency coverage"
      ],
      cons: [
        "Higher premium",
        "Waiting period for pre-existing conditions"
      ],
      features: ["Full Medical Coverage", "Dental & Optical", "Maternity Care", "Mental Health", "International Emergency"],
      popular: true
    },
    {
      id: 3,
      title: "AutoProtect Standard",
      insurer: "AIICO Insurance",
      product_type: "auto",
      premium: "₦25,000/year",
      coverage: "₦3,000,000",
      pros: [
        "Third-party liability covered",
        "Fire and theft protection",
        "Nationwide coverage",
        "Easy renewal process"
      ],
      cons: [
        "Own damage not fully covered",
        "Limited to specific repair shops"
      ],
      features: ["Third Party Liability", "Fire & Theft", "Towing Services", "Legal Support"],
      popular: false
    },
    {
      id: 4,
      title: "HomeShield Family",
      insurer: "Mutual Benefits Assurance",
      product_type: "home",
      premium: "₦20,000/year",
      coverage: "₦10,000,000",
      pros: [
        "Covers building and contents",
        "Natural disaster protection",
        "Temporary accommodation",
        "Personal liability coverage"
      ],
      cons: [
        "Excludes high-risk areas",
        "Requires home inspection"
      ],
      features: ["Building Cover", "Contents Insurance", "Natural Disasters", "Liability Protection"],
      popular: false
    },
    {
      id: 5,
      title: "LifeGuard Essential",
      insurer: "Cornerstone Insurance",
      product_type: "life",
      premium: "₦12,000/year",
      coverage: "₦1,000,000",
      pros: [
        "Affordable life coverage",
        "No medical exam required",
        "Flexible payment options",
        "Family protection"
      ],
      cons: [
        "Lower coverage amount",
        "Age restrictions apply"
      ],
      features: ["Death Benefit", "Disability Cover", "Family Protection", "Flexible Payments"],
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Plans', icon: '🏠' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'auto', name: 'Auto', icon: '🚗' },
    { id: 'home', name: 'Home', icon: '🏡' },
    { id: 'life', name: 'Life', icon: '👨‍👩‍👧‍👦' }
  ];

  const filteredPlans = selectedCategory === 'all' 
    ? insurancePlans 
    : insurancePlans.filter(plan => plan.product_type === selectedCategory);

  const handleGetAIRecommendations = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const recommendations = insurancePlans.slice(0, 3).map(plan => ({
        title: plan.title,
        insurer: plan.insurer,
        product_type: plan.product_type,
        pros: plan.pros,
        cons: plan.cons
      }));
      setAiRecommendations(recommendations);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="insurance-plans-page">
      {/* Header Section */}
      <div className="plans-header">
        <div className="container">
          <div className="header-content">
            <h1>Find Your Perfect Insurance Plan</h1>
            <p>Discover insurance plans tailored to your needs. Compare, learn, and choose with confidence.</p>
            
            <div className="ai-recommendation-section">
              <button 
                className="ai-recommend-btn"
                onClick={handleGetAIRecommendations}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Getting AI Recommendations...
                  </>
                ) : (
                  <>
                    🤖 Get AI Recommendations
                  </>
                )}
              </button>
              <span className="ai-help-text">Let our AI suggest the best plans for you</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      {aiRecommendations.length > 0 && (
        <div className="ai-recommendations">
          <div className="container">
            <h2>🤖 AI Recommended for You</h2>
            <div className="recommendations-grid">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="recommendation-card">
                  <div className="rec-header">
                    <h3>{rec.title}</h3>
                    <span className="rec-insurer">{rec.insurer}</span>
                    <span className="rec-type">{rec.product_type}</span>
                  </div>
                  <div className="rec-content">
                    <div className="rec-pros">
                      <h4>Why this works for you:</h4>
                      <ul>
                        {rec.pros.slice(0, 2).map((pro, i) => (
                          <li key={i}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="category-filter">
        <div className="container">
          <div className="filter-tabs">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="tab-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="plans-content">
        <div className="container">
          <div className="plans-grid">
            {filteredPlans.map(plan => (
              <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Most Popular</div>}
                
                <div className="plan-header">
                  <h3>{plan.title}</h3>
                  <p className="insurer">{plan.insurer}</p>
                  <div className="plan-type">
                    {categories.find(cat => cat.id === plan.product_type)?.icon} 
                    {plan.product_type.charAt(0).toUpperCase() + plan.product_type.slice(1)} Insurance
                  </div>
                </div>

                <div className="plan-pricing">
                  <div className="premium">
                    <span className="amount">{plan.premium}</span>
                    <span className="coverage">Coverage up to {plan.coverage}</span>
                  </div>
                </div>

                <div className="plan-features">
                  <h4>Key Features</h4>
                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="plan-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    View Details
                  </button>
                  <button className="btn-primary">
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Details Modal */}
      {selectedPlan && (
        <div className="modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPlan.title}</h2>
              <button className="close-btn" onClick={() => setSelectedPlan(null)}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="plan-details">
                <div className="detail-section">
                  <h3>Coverage Details</h3>
                  <p><strong>Insurer:</strong> {selectedPlan.insurer}</p>
                  <p><strong>Premium:</strong> {selectedPlan.premium}</p>
                  <p><strong>Coverage:</strong> Up to {selectedPlan.coverage}</p>
                </div>

                <div className="pros-cons">
                  <div className="pros">
                    <h4>✅ Advantages</h4>
                    <ul>
                      {selectedPlan.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="cons">
                    <h4>⚠️ Considerations</h4>
                    <ul>
                      {selectedPlan.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="features-detail">
                  <h4>Complete Feature List</h4>
                  <div className="features-grid">
                    {selectedPlan.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        ✓ {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedPlan(null)}>
                Close
              </button>
              <button className="btn-primary">
                Choose This Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bottom-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Still Need Help Choosing?</h2>
            <p>Our AI assistant is here to guide you through your insurance journey</p>
            <button className="btn-primary">
              🤖 Chat with AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePlansPage;
