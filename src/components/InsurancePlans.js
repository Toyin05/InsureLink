import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/InsurancePlans.css';

const InsurancePlans = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data based on your API format for Plan Recommendation Response
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
    },
    {
      id: 7,
      title: "Travel Shield Insurance",
      insurer: "Leadway Assurance",
      product_type: "Travel",
      price: "₦25,000/year",
      coverage: "₦1,000,000",
      pros: ["Global coverage", "Medical emergencies", "Trip cancellation", "Lost luggage protection"],
      cons: ["Short-term coverage only", "Limited to specific destinations"],
      rating: 4.3,
      popular: false
    },
    {
      id: 8,
      title: "Student Health Care",
      insurer: "AXA Mansard",
      product_type: "Health",
      price: "₦30,000/year",
      coverage: "₦1,500,000",
      pros: ["Student-friendly rates", "Campus clinic access", "Mental health support", "Emergency services"],
      cons: ["Age restrictions", "Limited specialist coverage"],
      rating: 4.0,
      popular: false
    }
  ];

  const filterTypes = ['all', 'Health', 'Auto', 'Life', 'Home', 'Travel'];

  const filteredPlans = mockPlans.filter(plan => {
    const matchesFilter = selectedFilter === 'all' || plan.product_type === selectedFilter;
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.insurer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleGetQuote = (planId) => {
    // In real implementation, this would navigate to quote page or open modal
    alert(`Getting quote for plan ID: ${planId}. This will connect to backend API later.`);
  };

  const handleCompare = (planId) => {
    // In real implementation, this would add to comparison list
    alert(`Added plan ${planId} to comparison. Feature coming soon!`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <>
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && '⭐'}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="insurance-plans">
      {/* Navigation Header */}
      <header className="plans-header">
        <div className="header-content">
          <div className="nav-section">
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
              ← Dashboard
            </button>
            <nav className="header-nav">
              <button onClick={() => navigate('/education')} className="nav-link">
                📚 Education
              </button>
              <button onClick={() => navigate('/chat')} className="nav-link">
                💬 AI Chat
              </button>
              <button onClick={() => navigate('/profile')} className="nav-link">
                👤 Profile
              </button>
            </nav>
          </div>
          <div className="header-title">
            <h1>🛡️ Insurance Plans</h1>
            <p>Compare and choose the perfect insurance plan for your needs in Nigeria</p>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search plans, insurers, or coverage types..."
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
                {type === 'all' ? 'All Plans' : `${type} Insurance`}
              </button>
            ))}
          </div>

          <div className="results-count">
            <p>Showing {filteredPlans.length} insurance plan{filteredPlans.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="plans-container">
        <div className="container">
          <div className="plans-grid">
            {filteredPlans.map(plan => (
              <div key={plan.id} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">⭐ Most Popular</div>}
                
                <div className="plan-header">
                  <h3>{plan.title}</h3>
                  <p className="insurer">by {plan.insurer}</p>
                  <span className="plan-type">{plan.product_type} Insurance</span>
                </div>

                <div className="plan-pricing">
                  <div className="price">{plan.price}</div>
                  <div className="coverage">Coverage up to <strong>{plan.coverage}</strong></div>
                </div>

                <div className="plan-rating">
                  <span className="stars">{renderStars(plan.rating)}</span>
                  <span className="rating-number">{plan.rating}/5.0</span>
                </div>

                <div className="plan-features">
                  <div className="pros-section">
                    <h4>✅ Key Benefits:</h4>
                    <ul className="pros-list">
                      {plan.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="cons-section">
                    <h4>⚠️ Limitations:</h4>
                    <ul className="cons-list">
                      {plan.cons.map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="plan-actions">
                  <button 
                    className="get-quote-btn primary-btn"
                    onClick={() => handleGetQuote(plan.id)}
                  >
                    📄 Get Quote
                  </button>
                  <button 
                    className="compare-btn secondary-btn"
                    onClick={() => handleCompare(plan.id)}
                  >
                    ⚖️ Compare
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPlans.length === 0 && (
            <div className="no-results">
              <div className="no-results-content">
                <h3>😔 No insurance plans found</h3>
                <p>Try adjusting your search terms or filter criteria</p>
                <button 
                  className="reset-btn"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilter('all');
                  }}
                >
                  🔄 Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>🤔 Need Help Choosing the Right Plan?</h2>
            <p>Our AI-powered insurance assistant can analyze your needs and recommend the perfect insurance plan tailored specifically for you.</p>
            <div className="cta-buttons">
              <button 
                className="ai-help-btn primary-btn"
                onClick={() => navigate('/chat')}
              >
                💬 Ask Our AI Assistant
              </button>
              <button 
                className="learn-btn secondary-btn"
                onClick={() => navigate('/education')}
              >
                📚 Learn About Insurance
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>50+</h3>
              <p>Insurance Plans Available</p>
            </div>
            <div className="stat-item">
              <h3>15+</h3>
              <p>Trusted Insurance Partners</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Customer Support</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="plans-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>📞 Need Assistance?</h4>
              <p>Call our support team: <strong>+234-800-INSURE-1</strong></p>
              <p>Email us: <strong>support@insurelink.ng</strong></p>
            </div>
            <div className="footer-section">
              <h4>💡 Important Note</h4>
              <p>All prices are indicative and may vary based on individual assessment.</p>
              <p>Terms and conditions apply to all insurance products.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsurancePlans;
