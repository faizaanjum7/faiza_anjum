import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import { ArrowDown, ChevronRight, X, Mail, Linkedin, Github, GraduationCap, Briefcase, Award, Calendar, FileText, ArrowRight, Figma } from 'lucide-react';
import doodleStars from './assets/doodle-stars.png';
import shining from './assets/shining.png';
import star2 from './assets/star (2).png';
import { projectsData } from './data/projects';
import { blogData } from './data/blogs';
import emailjs from '@emailjs/browser';
import './App.css';

import mailWithStar from './assets/mail-with-star.png';
import faiza from './assets/me.jpg';
import sparklesIcon from './assets/sparkles.png';
import cameraIcon from './assets/camera.png';
import folderIcon from './assets/folder (1).png';
import learningBookIcon from './assets/learning-book.png';
import sky2 from './assets/sky2.webp';
import sky3 from './assets/sky3.webp';
import sky4 from './assets/sky4.webp';
import moon from './assets/moon.webp';
import resumePdf from './assets/Faiza_Anjum.pdf';
import codeIcon from './assets/code.png';
import googleDocsIcon from './assets/google-docs.png';


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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isSkyModalOpen, setIsSkyModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [activeBlogFilter, setActiveBlogFilter] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);

  const sectionRefs = useRef({});

  const filteredProjects = projectsData.filter(project => {
    if (activeFilter === 'All') return true;
    return project.tags.some(tag => tag.toLowerCase() === activeFilter.toLowerCase());
  });

  const filteredBlogs = blogData.filter(blog => {
    if (activeBlogFilter === 'All') return true;
    if (activeBlogFilter === 'Articles') return blog.type === 'Article';
    if (activeBlogFilter === 'Case Studies') return blog.type === 'Case Study';
    return true;
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

  const handleSendMessage = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.target,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
        console.log('SUCCESS!', result.text);
        setIsMessageSent(true);
        e.target.reset();
        setTimeout(() => setIsMessageSent(false), 3000);
      }, (error) => {
        console.log('FAILED...', error.text);
        alert('Failed to send message. Please try again.');
      });
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
              <img src={faiza} alt="Faiza Anjum" className="avatar" />
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
                  href={resumePdf}
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
            <img src={sparklesIcon} className="heading-icon" alt="" aria-hidden="true" />
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
                    <img src={cameraIcon} alt="camera" />
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
            <img src={folderIcon} className="heading-icon" alt="" aria-hidden="true" />
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
          className="page-section skills-section"
        >
          <h1>
            Skills
            <img src={codeIcon} className="heading-icon" alt="" aria-hidden="true" />
          </h1>
          <p>Technical skills and expertise.</p>

          <div className="skills-grid">
            <div className="skills-card">
              <h3>Programming</h3>
              <div className="skills-tags">
                <span className="skill-tag">Java</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>

            <div className="skills-card">
              <h3>Frontend</h3>
              <div className="skills-tags">
                <span className="skill-tag">HTML</span>
                <span className="skill-tag">CSS</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">React JS</span>
              </div>
            </div>

            <div className="skills-card">
              <h3>Tools</h3>
              <div className="skills-tags">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">VS Code</span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="blog"
          ref={(el) => (sectionRefs.current['blog'] = el)}
          className="page-section blog-section"
        >
          <h1>
            Blog / Case Studies
            <img src={googleDocsIcon} className="heading-icon" alt="" aria-hidden="true" />
          </h1>
          <p>Thoughts, learnings, and design case studies.</p>

          <div className="filter-container">
            {['All', 'Articles', 'Case Studies'].map(filter => (
              <button
                key={filter}
                className={`filter-btn ${activeBlogFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveBlogFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {filteredBlogs.map(blog => (
              <div key={blog.id} className="blog-card" onClick={() => setSelectedBlog(blog)}>
                <div className="blog-card-type">
                  {blog.type === 'Case Study' ? <Figma size={14} /> : <FileText size={14} />}
                  <span>{blog.type.toUpperCase()}</span>
                </div>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-card-desc">{blog.description}</p>
                
                <div className="blog-card-meta">
                  <div className="blog-card-meta-item">
                    <Calendar size={14} />
                    <span>{blog.date}</span>
                  </div>
                  <div className="blog-card-meta-item">
                    {blog.type === 'Case Study' ? <Figma size={14} /> : <FileText size={14} />} 
                    <span>{blog.type}</span>
                  </div>
                </div>

                <div className="blog-tags">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="blog-tag">{tag}</span>
                  ))}
                </div>

                <div className="blog-read-more">
                  Read case study <ArrowRight size={14} style={{marginLeft: '4px'}} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="resume"
          ref={(el) => (sectionRefs.current['resume'] = el)}
          className="page-section resume-section"
        >
          <h1>
            Resume
            <img src={learningBookIcon} className="heading-icon" alt="" aria-hidden="true" />
          </h1>
          <p>Education, experience & certifications.</p>

          <div className="resume-category">
            <div className="resume-category-header">
              <GraduationCap size={20} className="resume-icon" />
              <h2>Education</h2>
            </div>

            <div className="resume-item">
              <div className="resume-date">2022 - 2026</div>
              <div className="resume-content">
                <h3>B.Tech in Computer Science</h3>
                <p>G. Pulla Reddy Engineering College(Autonomous)</p>
                <p className="resume-score">84%</p>
              </div>
            </div>

            <div className="resume-item">
              <div className="resume-date">2020 - 2022</div>
              <div className="resume-content">
                <h3>Intermediate in MPC</h3>
                <p>Narayana Junior College</p>
                <p className="resume-score">96%</p>
              </div>
            </div>
          </div>

          <div className="resume-category">
            <div className="resume-category-header">
              <Briefcase size={20} className="resume-icon" />
              <h2>Work Experience</h2>
            </div>

            <div className="resume-item">
              <div className="resume-date">Jan 2026 - April 2026</div>
              <div className="resume-content">
                <h3>Full stack Intern</h3>
                <p>Habib IT Solutions</p>
              </div>
            </div>
          </div>

          <div className="resume-category">
            <div className="resume-category-header">
              <Award size={20} className="resume-icon" />
              <h2>Certifications</h2>
            </div>

            <div className="resume-item" style={{ display: 'block', padding: '0', marginLeft: '0', marginRight: '0' }}>
              <ToggleBlock title="Smart Interview - Smart Coder">
                <div className="certificate-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <p>Smart Coder Certification details.</p>
                  <a href="https://smartinterviews.in/certificate/10b80e4d" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ width: 'fit-content' }}>View Certificate</a>
                </div>
              </ToggleBlock>
            </div>
          </div>
        </section>

        <section
          id="contact"
          ref={(el) => (sectionRefs.current['contact'] = el)}
          className="page-section contact-section"
        >
          <h1>
            Contact
            <img src={mailWithStar} className="heading-icon" alt="" aria-hidden="true" />
          </h1>
          <p>Get in touch.</p>
          <div className="contact-container">
            <div className="contact-links">
              <a href="mailto:faizaanjumm07@gmail.com" className="contact-link">
                <Mail size={18} />
                <span>faizaanjumm07@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/m-s-faiza-anjum-b7b251264" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/faizaanjum7" target="_blank" rel="noopener noreferrer" className="contact-link">
                <Github size={18} />
                <span>GitHub</span>
              </a>
            </div>

            <form className="contact-form" onSubmit={handleSendMessage}>
              <input type="text" name="name" placeholder="Name" className="contact-input" required />
              <input type="email" name="email" placeholder="Email" className="contact-input" required />
              <textarea name="message" placeholder="Message" className="contact-textarea" rows="4" required></textarea>
              <button type="submit" className="btn-primary send-btn">Send Message</button>
            </form>
          </div>
        </section>

        <footer className="footer">
          <p>© 2026 Faiza Anjum M S, All rights reserved.</p>
        </footer>
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
                  {selectedProject.liveLink && selectedProject.liveLink !== "#" && (
                    <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary project-live-btn">
                      View Live
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                  {selectedProject.githubLink && selectedProject.githubLink !== "#" && (
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary project-github-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                      GitHub
                    </a>
                  )}
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
                <img src={cameraIcon} alt="camera" className="modal-icon" />
                Sky Captures
              </span>
              <button className="modal-close" onClick={() => setIsSkyModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div className="sky-grid">
                <img src={sky2} alt="Sky 2" />
                <img src={sky3} alt="Sky 3" />
                <img src={sky4} alt="Sky 4" />
                <img src={moon} alt="Moon" />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* blog details modal */}
      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-content blog-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="blog-modal-header-top">
              <span className="blog-modal-header-type">
                {selectedBlog.type === 'Case Study' ? <Figma size={14} /> : <FileText size={14} />}
                {selectedBlog.type.toUpperCase()}
              </span>
              <button className="modal-close" onClick={() => setSelectedBlog(null)}>
                <X size={16} />
              </button>
            </div>
            
            <div className="blog-modal-body">
              <h2 className="blog-modal-title">{selectedBlog.title}</h2>
              <div className="blog-modal-meta">
                <div className="blog-modal-meta-item">
                  <Calendar size={14} />
                  <span>{selectedBlog.modalDetails?.dateRange || selectedBlog.date}</span>
                </div>
                {selectedBlog.modalDetails?.role && (
                  <div className="blog-modal-meta-item">
                    <span>Role: {selectedBlog.modalDetails.role}</span>
                  </div>
                )}
                {selectedBlog.modalDetails?.duration && (
                  <div className="blog-modal-meta-item">
                    <span>Duration: {selectedBlog.modalDetails.duration}</span>
                  </div>
                )}
              </div>

              <div className="blog-modal-content-scroll">
                {selectedBlog.modalDetails?.intro && (
                  <p className="blog-modal-intro" style={{ whiteSpace: 'pre-line' }}>{selectedBlog.modalDetails.intro}</p>
                )}

                {selectedBlog.modalDetails?.tools && selectedBlog.modalDetails.tools.length > 0 && (
                  <div className="blog-modal-tools">
                    <h4 className="blog-section-title">TOOLS USED</h4>
                    <div className="blog-tools-tags">
                      {selectedBlog.modalDetails.tools.map((tool, i) => (
                        <span key={i} className="blog-tool-tag">{tool}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedBlog.modalDetails?.sections?.map((section, idx) => (
                  <div key={idx} className="blog-modal-section">
                    <h4 className="blog-section-title">{section.title}</h4>
                    <div className="blog-section-content" style={{ whiteSpace: 'pre-line' }}>
                      {section.content}
                    </div>
                    {section.images && section.images.length > 0 && (
                      <div className="blog-section-images">
                        {section.images.map((img, i) => (
                          <img 
                            key={i} 
                            src={img} 
                            loading="lazy" 
                            alt={`${section.title} ${i + 1}`} 
                            onClick={() => setFullScreenImage(img)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="blog-modal-footer-tags">
                   <div className="blog-tools-tags">
                      {selectedBlog.tags.map((tag, i) => (
                        <span key={i} className="blog-tool-tag">{tag}</span>
                      ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* message sent popup */}
      {isMessageSent && (
        <div className="message-toast">
          <Mail size={18} />
          <span>Message sent! :)</span>
        </div>
      )}
      {/* fullscreen image popup */}
      {fullScreenImage && (
        <div className="fullscreen-overlay" onClick={() => setFullScreenImage(null)}>
          <button className="fullscreen-close" onClick={() => setFullScreenImage(null)}>
            <X size={24} />
          </button>
          <img 
            src={fullScreenImage} 
            alt="Fullscreen View" 
            className="fullscreen-image" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

    </div>
  );
}

export default App;