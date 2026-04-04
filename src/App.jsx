import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import { ArrowDown, ChevronRight, X } from 'lucide-react';
import doodleStars from './assets/doodle-stars.png';
import shining from './assets/shining.png';
import star2 from './assets/star (2).png';
import { projectsData } from './data/projects';
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
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const sectionRefs = useRef({});

  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'All') return true;
    return project.tags.some(tag => tag.toLowerCase() === activeFilter.toLowerCase());
  });

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
            <img src="/src/assets/sparkles.png" className="heading-icon" alt="" aria-hidden="true" />
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
                  Moon, clouds, sky
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
          className="page-section projects-section"
        >
          <h1>
            Projects
            <img src="/src/assets/folder (1).png" className="heading-icon" alt="" aria-hidden="true" />
          </h1>
          <p>Gallery view of my work.</p>

          <div className="filter-container">
            {['All', 'React', 'AI', 'Node.js', 'TypeScript'].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map(project => (
              <div key={project.id} className="project-card" onClick={() => setSelectedProject(project)}>
                <div className="project-card-top" style={{ backgroundColor: project.color }}>
                  {(project.imageLight || project.imageDark) && (
                    <img 
                      src={isDarkMode ? (project.imageDark || project.imageLight) : (project.imageLight || project.imageDark)} 
                      alt={project.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  )}
                </div>
                <div className="project-card-bottom">
                  <h3>{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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

      {/* project details modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content project-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="project-modal-hero" style={{ backgroundColor: selectedProject.color }}>
              {(selectedProject.imageLight || selectedProject.imageDark) && (
                <img 
                  src={isDarkMode ? (selectedProject.imageDark || selectedProject.imageLight) : (selectedProject.imageLight || selectedProject.imageDark)} 
                  alt={selectedProject.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              )}
            </div>
            <div className="project-modal-body">
              <div className="project-modal-header">
                <h2>{selectedProject.title}</h2>
                <button className="modal-close" onClick={() => setSelectedProject(null)}>
                  <X size={16} />
                </button>
              </div>
              
              <div className="project-modal-content-scroll">
                <p className="project-modal-desc">
                  {selectedProject.details.description || selectedProject.description}
                </p>

                {selectedProject.details.whatIDid && selectedProject.details.whatIDid.length > 0 && (
                  <div className="project-modal-section">
                    <h4>What I did:</h4>
                    <ul>
                      {selectedProject.details.whatIDid.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.details.keyFeatures && selectedProject.details.keyFeatures.length > 0 && (
                  <div className="project-modal-section">
                    <h4>Key Features:</h4>
                    <ul>
                      {selectedProject.details.keyFeatures.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="project-tags project-modal-tags">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-modal-actions">
                  <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary project-live-btn">
                    View Live
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                  <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary project-github-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* sky images modal overlay */}
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