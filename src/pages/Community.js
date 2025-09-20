import React, { useState } from 'react';
import './Community.css';

export default function Community() {
  const [activeTab, setActiveTab] = useState('discussions');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showNutrientModal, setShowNutrientModal] = useState(false);

  const discussions = [
    {
      id: 1,
      author: 'Sarah Wellness',
      avatar: '🌸',
      title: 'Best morning routines for energy?',
      content: 'I\'ve been struggling with low energy in the mornings. What routines have worked best for you?',
      tags: ['morning-routine', 'energy', 'wellness'],
      replies: 12,
      likes: 24,
      timeAgo: '2 hours ago',
      category: 'wellness-tips'
    },
    {
      id: 2,
      author: 'Mike Health',
      avatar: '🌿',
      title: 'Herbal tea recommendations for sleep',
      content: 'Looking for natural ways to improve sleep quality. Any herbal tea blends you\'d recommend?',
      tags: ['sleep', 'herbs', 'natural-remedies'],
      replies: 8,
      likes: 15,
      timeAgo: '5 hours ago',
      category: 'natural-remedies'
    },
    {
      id: 3,
      author: 'Emma Balance',
      avatar: '🧘',
      title: 'Meditation techniques for beginners',
      content: 'New to meditation and feeling overwhelmed. What simple techniques should I start with?',
      tags: ['meditation', 'beginners', 'mindfulness'],
      replies: 20,
      likes: 31,
      timeAgo: '1 day ago',
      category: 'mindfulness'
    }
  ];

  const challenges = [
    {
      id: 1,
      title: '30-Day Hydration Challenge',
      description: 'Drink 8 glasses of water daily for 30 days',
      participants: 156,
      daysLeft: 12,
      icon: '💧',
      color: 'var(--serenity-blue)',
      progress: 60
    },
    {
      id: 2,
      title: 'Mindful Eating Week',
      description: 'Practice mindful eating for 7 days',
      participants: 89,
      daysLeft: 3,
      icon: '🍽️',
      color: 'var(--soft-green)',
      progress: 85
    },
    {
      id: 3,
      title: 'Morning Movement Challenge',
      description: '10 minutes of movement every morning',
      participants: 203,
      daysLeft: 18,
      icon: '🌅',
      color: 'var(--peach-tint)',
      progress: 45
    }
  ];

  const experts = [
    {
      id: 1,
      name: 'Dr. Maya Patel',
      specialty: 'Integrative Medicine',
      avatar: '👩‍⚕️',
      rating: 4.9,
      available: true,
      nextSlot: 'Tomorrow 2:00 PM'
    },
    {
      id: 2,
      name: 'James Chen',
      specialty: 'Nutrition & Wellness',
      avatar: '👨‍🍳',
      rating: 4.8,
      available: true,
      nextSlot: 'Today 4:00 PM'
    },
    {
      id: 3,
      name: 'Dr. Elena Rodriguez',
      specialty: 'Mindfulness & Stress',
      avatar: '👩‍🏫',
      rating: 4.7,
      available: false,
      nextSlot: 'Next Week'
    }
  ];

  const categories = [
    { name: 'All', count: discussions.length },
    { name: 'Wellness Tips', count: 8 },
    { name: 'Natural Remedies', count: 12 },
    { name: 'Mindfulness', count: 15 },
    { name: 'Nutrition', count: 10 },
    { name: 'Fitness', count: 6 }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'wellness-tips',
    tags: ''
  });

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || discussion.category === selectedCategory.toLowerCase().replace(' ', '-');
    return matchesSearch && matchesCategory;
  });

  const handleCreatePost = () => {
    // Here you would typically save to your backend
    console.log('Creating post:', newPost);
    setNewPost({ title: '', content: '', category: 'wellness-tips', tags: '' });
    setShowCreatePost(false);
  };

  const handleJoinChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setShowChallengeModal(true);
  };

  const handleBookExpert = (expert) => {
    // Here you would typically open a booking system
    console.log('Booking expert:', expert.name);
  };

  return (
    <div className="community-container">
      {/* Header Section */}
      <div className="community-header">
        <div className="header-content">
          <h1>👥 Wellness Community</h1>
          <p>Connect, learn, and grow with fellow wellness enthusiasts</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setShowCreatePost(true)}
            className="btn btn-primary"
            aria-label="Create new post"
          >
            ✍️ Create Post
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'discussions' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussions')}
          aria-label="View discussions tab"
        >
          💬 Discussions
        </button>
        <button
          className={`tab-button ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
          aria-label="View challenges tab"
        >
          🏆 Challenges
        </button>
        <button
          className={`tab-button ${activeTab === 'experts' ? 'active' : ''}`}
          onClick={() => setActiveTab('experts')}
          aria-label="View experts tab"
        >
          👨‍⚕️ Expert Q&A
        </button>
        <button
          className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
          aria-label="View resources tab"
        >
          📚 Resources
        </button>
      </div>

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div className="tab-content">
          {/* Search and Filters */}
          <div className="discussions-header">
            <div className="search-filters">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search discussions..."
                className="search-input"
                aria-label="Search discussions"
              />
              <div className="category-filters">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`category-filter ${selectedCategory === category.name ? 'active' : ''}`}
                    aria-label={`Filter by ${category.name}`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Discussions List */}
          <div className="discussions-list">
            {filteredDiscussions.map((discussion) => (
              <div key={discussion.id} className="discussion-card">
                <div className="discussion-header">
                  <div className="author-info">
                    <span className="author-avatar">{discussion.avatar}</span>
                    <div className="author-details">
                      <span className="author-name">{discussion.author}</span>
                      <span className="discussion-time">{discussion.timeAgo}</span>
                    </div>
                  </div>
                  <div className="discussion-category">
                    <span className="category-badge">{discussion.category.replace('-', ' ')}</span>
                  </div>
                </div>
                
                <div className="discussion-content">
                  <h3 className="discussion-title">{discussion.title}</h3>
                  <p className="discussion-text">{discussion.content}</p>
                  <div className="discussion-tags">
                    {discussion.tags.map((tag, index) => (
                      <span key={index} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
                
                <div className="discussion-footer">
                  <div className="discussion-actions">
                    <button className="action-btn" aria-label="Like discussion">
                      👍 {discussion.likes}
                    </button>
                    <button className="action-btn" aria-label="Reply to discussion">
                      💬 {discussion.replies}
                    </button>
                    <button className="action-btn" aria-label="Share discussion">
                      📤 Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="tab-content">
          <div className="challenges-header">
            <h2>Active Wellness Challenges</h2>
            <p>Join challenges to stay motivated and achieve your wellness goals</p>
          </div>
          
          <div className="challenges-grid">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="challenge-card">
                <div className="challenge-header">
                  <div className="challenge-icon" style={{ backgroundColor: challenge.color }}>
                    {challenge.icon}
                  </div>
                  <div className="challenge-info">
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                  </div>
                </div>
                
                <div className="challenge-progress">
                  <div className="progress-info">
                    <span>{challenge.participants} participants</span>
                    <span>{challenge.daysLeft} days left</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${challenge.progress}%`, backgroundColor: challenge.color }}
                    ></div>
                  </div>
                  <span className="progress-text">{challenge.progress}% complete</span>
                </div>
                
                <button 
                  onClick={() => handleJoinChallenge(challenge)}
                  className="join-challenge-btn"
                  aria-label={`Join ${challenge.title}`}
                >
                  Join Challenge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experts Tab */}
      {activeTab === 'experts' && (
        <div className="tab-content">
          <div className="experts-header">
            <h2>Wellness Experts</h2>
            <p>Get personalized advice from certified wellness professionals</p>
          </div>
          
          <div className="experts-grid">
            {experts.map((expert) => (
              <div key={expert.id} className="expert-card">
                <div className="expert-header">
                  <span className="expert-avatar">{expert.avatar}</span>
                  <div className="expert-info">
                    <h3>{expert.name}</h3>
                    <p className="expert-specialty">{expert.specialty}</p>
                    <div className="expert-rating">
                      <span className="stars">{'⭐'.repeat(Math.floor(expert.rating))}</span>
                      <span className="rating-text">{expert.rating}/5</span>
                    </div>
                  </div>
                </div>
                
                <div className="expert-availability">
                  <span className={`status ${expert.available ? 'available' : 'unavailable'}`}>
                    {expert.available ? '🟢 Available' : '🔴 Unavailable'}
                  </span>
                  <p className="next-slot">Next: {expert.nextSlot}</p>
                </div>
                
                <button 
                  onClick={() => handleBookExpert(expert)}
                  disabled={!expert.available}
                  className="book-expert-btn"
                  aria-label={`Book consultation with ${expert.name}`}
                >
                  {expert.available ? 'Book Consultation' : 'Unavailable'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="tab-content">
          <div className="resources-header">
            <h2>Wellness Resources</h2>
            <p>Curated content to support your wellness journey</p>
          </div>
          
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📖</div>
              <h3>Wellness Guides</h3>
              <p>Comprehensive guides on nutrition, meditation, and natural remedies</p>
              <button className="resource-btn">Browse Guides</button>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">🎥</div>
              <h3>Video Library</h3>
              <p>Expert-led videos on wellness practices and techniques</p>
              <button className="resource-btn">Watch Videos</button>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">📱</div>
              <h3>Mobile Apps</h3>
              <p>Recommended apps for tracking wellness and mindfulness</p>
              <button className="resource-btn">View Apps</button>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Book Recommendations</h3>
              <p>Curated reading list for wellness and personal growth</p>
              <button className="resource-btn">See Books</button>
            </div>
            
            <div className="resource-card">
              <div className="resource-icon">🥗</div>
              <h3>Nutrient Suggestions</h3>
              <p>Get personalized nutrient recommendations based on your health goals</p>
              <button 
                className="resource-btn"
                onClick={() => setShowNutrientModal(true)}
              >
                Get Suggestions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="modal-backdrop" onClick={() => setShowCreatePost(false)}>
          <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Discussion</h3>
              <button 
                onClick={() => setShowCreatePost(false)}
                className="modal-close"
                aria-label="Close create post modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="post-title">Title *</label>
                <input
                  id="post-title"
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="What would you like to discuss?"
                  className="form-input"
                  aria-required="true"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="post-content">Content *</label>
                <textarea
                  id="post-content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows="4"
                  className="form-textarea"
                  aria-required="true"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="post-category">Category</label>
                <select
                  id="post-category"
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  className="form-select"
                >
                  <option value="wellness-tips">Wellness Tips</option>
                  <option value="natural-remedies">Natural Remedies</option>
                  <option value="mindfulness">Mindfulness</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="fitness">Fitness</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="post-tags">Tags</label>
                <input
                  id="post-tags"
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  placeholder="e.g., meditation, herbs, sleep (separate with commas)"
                  className="form-input"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowCreatePost(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="btn btn-primary"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Modal */}
      {showChallengeModal && selectedChallenge && (
        <div className="modal-backdrop" onClick={() => setShowChallengeModal(false)}>
          <div className="challenge-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Join Challenge</h3>
              <button 
                onClick={() => setShowChallengeModal(false)}
                className="modal-close"
                aria-label="Close challenge modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="challenge-details">
                <div className="challenge-icon-large" style={{ backgroundColor: selectedChallenge.color }}>
                  {selectedChallenge.icon}
                </div>
                <h3>{selectedChallenge.title}</h3>
                <p>{selectedChallenge.description}</p>
                
                <div className="challenge-stats">
                  <div className="stat">
                    <span className="stat-label">Participants</span>
                    <span className="stat-value">{selectedChallenge.participants}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Days Left</span>
                    <span className="stat-value">{selectedChallenge.daysLeft}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Progress</span>
                    <span className="stat-value">{selectedChallenge.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowChallengeModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  console.log('Joining challenge:', selectedChallenge.title);
                  setShowChallengeModal(false);
                }}
                className="btn btn-primary"
              >
                Join Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nutrient Suggestions Modal */}
      {showNutrientModal && (
        <div className="modal-backdrop" onClick={() => setShowNutrientModal(false)}>
          <div className="nutrient-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🥗 Nutrient Suggestions</h3>
              <button 
                onClick={() => setShowNutrientModal(false)}
                className="modal-close"
                aria-label="Close nutrient modal"
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="nutrient-content">
                <p className="nutrient-intro">
                  Based on your wellness goals, here are some personalized nutrient recommendations:
                </p>
                
                <div className="nutrient-suggestions">
                  <div className="nutrient-category">
                    <h4>🌱 Essential Vitamins</h4>
                    <ul>
                      <li>Vitamin D3 - For bone health and immune support</li>
                      <li>B-Complex - For energy and brain function</li>
                      <li>Vitamin C - For immune system and collagen production</li>
                    </ul>
                  </div>
                  
                  <div className="nutrient-category">
                    <h4>💪 Important Minerals</h4>
                    <ul>
                      <li>Magnesium - For muscle relaxation and sleep</li>
                      <li>Iron - For oxygen transport and energy</li>
                      <li>Zinc - For immune function and wound healing</li>
                    </ul>
                  </div>
                  
                  <div className="nutrient-category">
                    <h4>🧠 Omega Fatty Acids</h4>
                    <ul>
                      <li>Omega-3 - For brain health and inflammation reduction</li>
                      <li>Omega-6 - For skin health and hormone production</li>
                    </ul>
                  </div>
                  
                  <div className="nutrient-category">
                    <h4>🌿 Antioxidants</h4>
                    <ul>
                      <li>Resveratrol - For heart health and longevity</li>
                      <li>Quercetin - For allergy relief and inflammation</li>
                      <li>Curcumin - For joint health and cognitive function</li>
                    </ul>
                  </div>
                </div>
                
                <div className="nutrient-note">
                  <p><strong>Note:</strong> Always consult with a healthcare provider before starting any new supplements.</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setShowNutrientModal(false)}
                className="btn btn-primary"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
