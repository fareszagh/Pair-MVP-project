import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiPackage, FiTruck, FiCheckCircle, FiZap, FiShield, FiUsers } from 'react-icons/fi';
import '../assets/LandingPage.css';
import logo from '../assets/cargolink_logo.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  {
    icon: FiZap,
    title: 'Post in Seconds',
    desc: 'Users describe their shipment — weight, size, route — and instantly reach a network of verified transporters ready to apply.',
  },
  {
    icon: FiTruck,
    title: 'Transporters Apply',
    desc: 'Transporters browse available offers and send applications with their message and availability. No cold calls, no guesswork.',
  },
  {
    icon: FiCheckCircle,
    title: 'You Choose Who Ships',
    desc: 'Review every applicant, read their message, and accept the one that fits. Direct contact via phone or email once accepted.',
  },
  {
    icon: FiShield,
    title: 'Roles That Make Sense',
    desc: 'Create an account as a User to post offers, or as a Transporter to browse and apply. One platform, two clear roles.',
  },
  {
    icon: FiPackage,
    title: 'Any Cargo, Any Route',
    desc: 'From Tunis to Sfax, Sousse to Bizerte — define your start point, end point, weight and height and go.',
  },
  {
    icon: FiUsers,
    title: 'Built on Trust',
    desc: 'Every accepted match comes with direct contact info. You speak to the person doing the job — no middlemen.',
  },
];

const steps = [
  { number: '01', role: 'User', action: 'Post your offer with cargo details and route' },
  { number: '02', role: 'Transporter', action: 'Browse offers and apply with a message' },
  { number: '03', role: 'User', action: 'Review applicants and accept the best fit' },
  { number: '04', role: 'Both', action: 'Connect directly and ship with confidence' },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">

     
      <nav className="landing-nav">
        <motion.div
          className="nav-logo"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
        >
          <img src={logo} alt="CargoLink" className="logo-img" />
        </motion.div>

        <motion.div
          className="nav-links"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
        >
          <button onClick={() => navigate('/login')} className="btn-secondary">Sign in</button>
          <button onClick={() => navigate('/register')} className="btn-primary">
            Get Started <FiArrowRight />
          </button>
        </motion.div>
      </nav>

     
      <main className="landing-hero">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-eyebrow">
            <span className="eyebrow-line" />
            Shipping marketplace for Tunisia
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-title">
            Post a shipment.<br />
            Find a <span className="highlight">transporter.</span><br />
            Ship it.
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-description">
            CargoLink connects people who need to ship cargo with verified transporters
            who can move it — no brokers, no delays, just a direct match.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <button onClick={() => navigate('/register')} className="btn-hero-primary">
              Post Your First Offer <FiArrowRight />
            </button>
            <button onClick={() => navigate('/register')} className="btn-hero-secondary">
              I'm a Transporter
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-proof">
            <span className="proof-item"><FiCheckCircle /> Free to join</span>
            <span className="proof-item"><FiCheckCircle /> No brokerage fees</span>
            <span className="proof-item"><FiCheckCircle /> Direct contact</span>
          </motion.div>
        </motion.div>

       
        <motion.div
          className="hero-visual"
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: 0.15 }}
        >
          <div className="visual-card vc-main">
            <div className="vc-header">
              <span className="vc-dot" /><span className="vc-dot" /><span className="vc-dot" />
              <span className="vc-title">New Offer</span>
            </div>
            <div className="vc-route">
              <div className="vc-city">
                <div className="vc-city-dot from" />
                <span>Tunis</span>
              </div>
              <div className="vc-route-line">
                <div className="vc-route-arrow">→</div>
              </div>
              <div className="vc-city">
                <div className="vc-city-dot to" />
                <span>Sfax</span>
              </div>
            </div>
            <div className="vc-meta-row">
              <div className="vc-meta-tag"><FiPackage /> 120 kg</div>
              <div className="vc-meta-tag">150 cm</div>
              <div className="vc-meta-tag accent">3 applicants</div>
            </div>
          </div>

          <motion.div
            className="visual-card vc-applicant"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6, ease: [0.22,1,0.36,1] }}
          >
            <div className="vc-app-avatar">A</div>
            <div className="vc-app-info">
              <div className="vc-app-name">Ahmed K.</div>
              <div className="vc-app-msg">"Available tomorrow morning"</div>
            </div>
            <div className="vc-accept-btn">✓</div>
          </motion.div>

          <motion.div
            className="visual-card vc-stat"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5, ease: [0.22,1,0.36,1] }}
          >
            <div className="vc-stat-num">24</div>
            <div className="vc-stat-label">Offers today</div>
          </motion.div>

          <div className="visual-glow" />
        </motion.div>
      </main>

      <section className="how-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-eyebrow"><span className="eyebrow-line" /> How it works</div>
          <h2>Four steps, zero friction</h2>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="step-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="step-number">{step.number}</div>
              <div className={`step-role role-${step.role.toLowerCase()}`}>{step.role}</div>
              <p className="step-action">{step.action}</p>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="features-section">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-eyebrow"><span className="eyebrow-line" /> Platform features</div>
          <h2>Everything you need to ship smarter</h2>
        </motion.div>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="feature-icon-wrap">
                <f.icon className="feature-icon" />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

     
      <section className="cta-section">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-eyebrow"><span className="eyebrow-line" /> Ready to start?</div>
          <h2 className="cta-title">Your cargo has a transporter waiting for it.</h2>
          <p className="cta-sub">Join CargoLink today — it's free, fast, and direct.</p>
          <div className="cta-actions">
            <button onClick={() => navigate('/register')} className="btn-hero-primary">
              Create Free Account <FiArrowRight />
            </button>
            <button onClick={() => navigate('/login')} className="btn-hero-secondary">
              Sign in
            </button>
          </div>
        </motion.div>
      </section>

     
      <footer className="landing-footer">
        <div className="footer-brand">
          <img src={logo} alt="CargoLink" className="logo-img footer-logo" />
        </div>
        <p>&copy; 2026 CargoLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;