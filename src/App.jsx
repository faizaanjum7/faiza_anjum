import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
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
        rootMargin: '-40% 0px -60% 0px', // Triggers when element crosses 40% from top
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
          className="page-section"
        >
          <h1>Home Section</h1>
          <p>Welcome to my workspace</p>
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