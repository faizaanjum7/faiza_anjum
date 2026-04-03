import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import { ArrowDown, ChevronRight, X } from 'lucide-react';
import doodleStars from './assets/doodle-stars.png';
import shining from './assets/shining.png';
import star2 from './assets/star (2).png';
import './App.css';

const ToggleBlock = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="toggle-block">
      <div className="toggle-header" onClick={() => setIsOpen(!isOpen)}>
        <ChevronRight size={16} className={`toggle-icon ${isOpen ? 'open' : ''}`} />
        <span className="toggle-title">{title}</span>
      </div>
      {isOpen && (
        <div className="toggle-content">
          {children}
        </div>
      )}
    </div>
  );
};
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSkyModalOpen, setIsSkyModalOpen] = useState(false);

  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -60% 0px', // triggers when element crosses 40% from top
      }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="app-container">
      <Sidebar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
      />

      <main className="main-content">
        <section
          id="home"
          ref={(el) => (sectionRefs.current['home'] = el)}
          className="page-section home-section"
        >
          {/* bg doodles */}
          <img src={shining} className="doodle doodle-shining" alt="" aria-hidden="true" />
          <img src={doodleStars} className="doodle doodle-stars" alt="" aria-hidden="true" />
          <img src={star2} className="doodle doodle-star-2" alt="" aria-hidden="true" />

          <div className="home-content">
            <div className="avatar-container">
              <img src="/src/assets/me.jpg" alt="Faiza Anjum" className="avatar" />
            </div>
            <div className="home-info">
              <h1 className="home-name">Faiza Anjum</h1>
              <p className="home-subtitle">
                Frontend Developer <span className="dot">•</span> CS Student <span className="dot">•</span> Full Stack intern
              </p>

              <div className="home-intro">
                <p>Hi there! I'm Faiza Anjum, a Frontend Developer focused on building intuitive and responsive web applications.</p>
                <p>I’m currently working towards becoming a full stack developer, with an interest in clean UI and practical solutions.</p>
              </div>

              <div className="home-actions">
                <button
                  className="btn-primary"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Projects <ArrowDown size={14} />
                </button>
                <a
                  href="/src/assets/Faiza_Anjum.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  Download Resume <ArrowDown size={14} />
                </a>
              </div>

              <div className="home-skills">
                {['Java', 'React JS', 'SQL', 'Web developement', 'Figma'].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          ref={(el) => (sectionRefs.current['about'] = el)}
          className="page-section"
        >
          <h1>
            About
            <img src="/src/assets/moon.png" className="heading-icon" alt="" aria-hidden="true" />
          </h1>
          <p>A little more about me.</p>

          <div style={{ marginBottom: '24px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
            I’m a Computer Science student focused on frontend development and building clean, user-friendly web applications. I enjoy turning ideas into functional products and experimenting with creative interfaces.
          </div>

          <ToggleBlock title="Current Focus">
            <ul>
              <li>Building full stack projects</li>
              <li>Strengthening React and frontend fundamentals</li>
              <li>Learning backend (Node.js, APIs, databases)</li>
            </ul>
          </ToggleBlock>

          <ToggleBlock title="Experience">
            <ul>
              <li>Built and deployed web projects with a focus on responsive and interactive UI</li>
              <li>Worked in team environments, contributing to both development and coordination</li>
              <li>Gained hands-on experience through internships, applying frontend and basic full stack concepts</li>
              <li>Comfortable turning ideas into working interfaces and iterating on them</li>
            </ul>
          </ToggleBlock>

          <ToggleBlock title="Beyond Code">
            <p style={{ marginBottom: '12px' }}>When I’m not coding, I enjoy slowing down and noticing the little things that inspire me.</p>
            <p style={{ marginBottom: '8px', fontWeight: 500 }}>Things I enjoy:</p>
            <ul>
              <li>Music</li>
              <li>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  Moon, cloud, sky
                  <button className="camera-btn" onClick={() => setIsSkyModalOpen(true)}>
                    <img src="/src/assets/camera.png" alt="camera" />
                  </button>
                  <span className="click-hint">← click!</span>
                </span>
              </li>
              <li>Stars and a bit of astronomy</li>
              <li>Cooking</li>
              <li>Poetry and aesthetics</li>
            </ul>
          </ToggleBlock>
        </section>

        <section
          id="projects"
          ref={(el) => (sectionRefs.current['projects'] = el)}
          className="page-section"
        >
          <h1>Projects Section</h1>
          <p>Gallery view of my work.</p>
        </section>

        <section
          id="skills"
          ref={(el) => (sectionRefs.current['skills'] = el)}
          className="page-section"
        >
          <h1>Skills Section</h1>
          <p>Technical skills and expertise.</p>
        </section>

        <section
          id="blog"
          ref={(el) => (sectionRefs.current['blog'] = el)}
          className="page-section"
        >
          <h1>Blog / Notes Section</h1>
          <p>Thoughts, articles, and documentation.</p>
        </section>

        <section
          id="resume"
          ref={(el) => (sectionRefs.current['resume'] = el)}
          className="page-section"
        >
          <h1>Resume Section</h1>
          <p>Professional experience and education.</p>
        </section>

        <section
          id="contact"
          ref={(el) => (sectionRefs.current['contact'] = el)}
          className="page-section"
        >
          <h1>Contact Section</h1>
          <p>Get in touch with me.</p>
        </section>
      </main>

      {/* Sky Modal Overlay */}
      {isSkyModalOpen && (
        <div className="modal-overlay" onClick={() => setIsSkyModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">
                <img src="/src/assets/camera.png" alt="camera" className="modal-icon" />
                Sky Captures
              </span>
              <button className="modal-close" onClick={() => setIsSkyModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div className="sky-grid">
                <img src="/src/assets/sky2.webp" alt="Sky 2" />
                <img src="/src/assets/sky3.webp" alt="Sky 3" />
                <img src="/src/assets/sky4.webp" alt="Sky 4" />
                <img src="/src/assets/moon.webp" alt="Moon" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;