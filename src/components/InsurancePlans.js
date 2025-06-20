import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InsurancePlans.css';

const InsurancePlans = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data based on your API format
  const mockPlans = [
    {
      id: 1,
      title: "Essential Health Cover",
      insurer: "Leadway Assurance",
      product_type: "Health",
      price: "₦45,000/year",
      coverage: "₦2,000,000",
      pros: ["Affordable premiums", "Covers maternity care", "Includes telemedicine", "24/7 customer support"],
      cons: ["Limited dental coverage", "No international coverage"],
      rating: 4.2,
      popular: true
    },
    {
      id: 2,
      title: "Comprehensive Auto Protection",
      insurer: "AIICO Insurance",
      product_type: "Auto",
      price: "₦120,000/year",
      coverage: "₦5,000,000",
      pros: ["Full comprehensive coverage", "Third-party liability", "Fire and theft protection", "Emergency roadside assistance"],
      cons: ["Higher premium cost", "Age restrictions apply"],
      rating: 4.5,
      popular: false
    },
    {
      id: 3,
      title: "Premium Health Plus",
      insurer: "AXA Mansard",
      product_type: "Health",
      price: "₦85,000/year",
      coverage: "₦5,000,000",
      pros: ["International coverage", "Dental and optical included", "No waiting period", "Premium hospitals network"],
      cons: ["Higher cost", "Strict eligibility criteria"],
      rating: 4.7,
      popular: true
    },
    {
      id: 4,
      title: "Basic Motor Insurance",
      insurer: "Cornerstone Insurance",
      product_type: "Auto",
      price: "₦65,000/year",
      coverage: "₦3,000,000",
      pros: ["Affordable rates", "Quick claim processing", "Third-party coverage", "Flexible payment options"],
      cons: ["Limited coverage scope", "No comprehensive benefits"],
      rating: 3.8,
      popular: false
    },
    {
      id: 5,
      title: "Family Life Assurance",
      insurer: "Mutual Benefits Assurance",
      product_type: "Life",
      price: "₦95,000/year",
      coverage: "₦10,000,000",
      pros: ["Family coverage", "Investment component", "Flexible premiums", "Tax benefits"],
      cons: ["Long commitment period", "Complex terms"],
      rating: 4.1,
      popular: false
    },
    {
      id: 6,
      title: "Home Protection Plan",
      insurer: "Niger Insurance",
      product_type: "Home",
      price: "₦55,000/year",
      coverage: "₦15,000,000",
      pros: ["Property damage coverage", "Contents insurance", "Natural disaster protection", "Liability coverage"],
      cons: ["Geographical restrictions", "High deductibles"],
      rating: 4.0,
      popular: false
    }
  ];

  const filterTypes = ['all', 'Health', 'Auto', 'Life', 'Home'];

  const filteredPlans = mockPlans.filter(plan => {
    const matchesFilter = selectedFilter === 'all' || plan.product_type === selectedFilter;
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.insurer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleGetQuote = (planId) => {
    // In real implementation, this would navigate to quote page or open modal
    alert(`Getting quote for plan ID: ${planId}. This will connect to backend later.`);
  };

  const handleCompare = (planId) => {
    // In real implementation, this would add to comparison list
    alert(`Added plan ${planId} to comparison. Feature coming soon!`);
  };

  return (
    <div className="insurance-plans">
      {/* Header Section */}
      <header className="plans-header">
        <div className="header-content">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1>🛡️ Insurance Plans</h1>
          <p>Compare and choose the perfect insurance plan for your needs</p>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search plans or insurers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-tabs">
          {filterTypes.map(type => (
            <button
              key={type}
              className={`filter-tab ${selectedFilter === type ? 'active' : ''}`}
              onClick={() => setSelectedFilter(type)}
            >
              {type === 'all' ? 'All Plans' : type}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="plans-container">
        <div className="plans-grid">
          {filteredPlans.map(plan => (
            <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && <div className="popular-badge">⭐ Popular</div>}
              
              <div className="plan-header">
                <h3>{plan.title}</h3>
                <p className="insurer">{plan.insurer}</p>
                <span className="plan-type">{plan.product_type}</span>
              </div>

              <div className="plan-pricing">
                <div className="price">{plan.price}</div>
                <div className="coverage">Coverage up to {plan.coverage}</div>
              </div>

              <div className="plan-rating">
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <span className="rating-number">{plan.rating}/5</span>
              </div>

              <div className="plan-features">
                <h4>✅ Pros:</h4>
                <ul className="pros-list">
                  {plan.pros.map((pro, index) => (
                    <li key={index}>{pro}</li>
                  ))}
                </ul>

                <h4>⚠️ Cons:</h4>
                <ul className="cons-list">
                  {plan.cons.map((con, index) => (
                    <li key={index}>{con}</li>
                  ))}
                </ul>
              </div>

              <div className="plan-actions">
                <button 
                  className="get-quote-btn"
                  onClick={() => handleGetQuote(plan.id)}
                >
                  Get Quote
                </button>
                <button 
                  className="compare-btn"
                  onClick={() => handleCompare(plan.id)}
                >
                  Compare
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPlans.length === 0 && (
          <div className="no-results">
            <h3>😔 No plans found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <h2>Need Help Choosing? 🤔</h2>
        <p>Our AI assistant can help you find the perfect insurance plan based on your specific needs</p>
        <button 
          className="ai-help-btn"
          onClick={() => navigate('/chat')}
        >
          💬 Ask Our AI Assistant
        </button>
      </div>

      {/* Footer Info */}
      <div className="plans-footer">
        <p>📞 Need assistance? Call our support team at +234-800-INSURE-1</p>
        <p>💡 All prices are indicative. Final premiums may vary based on individual assessment.</p>
      </div>
    </div>
  );
};

export default InsurancePlans;
