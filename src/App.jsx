import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import { ArrowDown } from 'lucide-react';
import doodleStars from './assets/doodle-stars.png';
import shining from './assets/shining.png';
import star2 from './assets/star (2).png';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
          {/* Background Doodles */}
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
          <h1>About Section</h1>
          <p>A little more about me.</p>
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
    </div>
  );
}

export default App;