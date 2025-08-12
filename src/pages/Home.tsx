import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SkillBadge from '../components/SkillBadge';
import Header from '../components/Header';

function Home() {
  return (
    <div className="bg-gray-900">
      <Header />
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm <span className="text-blue-400">Ryan</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Full Stack Developer | Problem Solver | Tech Enthusiast
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <a href="https://github.com/rps9" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/ryan-smith-690337244/" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank">
              <Linkedin size={24} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ryans6892@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors" target="_blank">
              <Mail size={24} />
            </a>
          </div>
        </div>
        <a
          className="group inline-flex items-center rounded-full border border-gray-700 bg-gray-800/60 px-3 py-1 text-gray-300 transition hover:bg-gray-700 hover:text-white"
          aria-label="Scroll down" href="#projects"
        >
          <ChevronDown className="h-4 w-4 group-hover:animate-bounce" />
        </a>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-gray-800" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">My Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <ProjectCard
              title="Automated Web Dev App"
              description="Created an internal python application that streamlined the process of creating a website in Infigo, utilizing multiple APIs and a session based system."
              image="https://media.licdn.com/dms/image/v2/D4E0BAQGPBvK7ZLEljA/company-logo_200_200/B4EZbusUmTHYAI-/0/1747761318593/superior_packaging_and_finishing_logo?e=2147483647&v=beta&t=oIdwRZ-ffjBJ94w3m09upWl1hsJ5446QG1q7OnrEHhQ"
              tags={['Python', 'HTML', 'CSS', 'JavaScript']}
            />
            <ProjectCard
              title="Flight Tracker"
              description="Created a flight tracker that scraped the web every day to find the cheapest flight to a given area in a given timeframe, then sends a text notification alerting the user when they should buy it."
              image="https://s.marketwatch.com/public/resources/images/MW-HE536_airpla_ZH_20190225131547.jpg"
              tags={['Python']}
            />
            <ProjectCard
              title="Darts Point Tracker"
              description="Created a web app that allows users to play darts and easily keep track of points."
              image="https://upload.wikimedia.org/wikipedia/commons/f/fb/Darts_in_a_dartboard.jpg"
              tags={['HTML', 'JavaScript', 'CSS']}
              to="/darts"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <SkillBadge name="React" level="Advanced" />
            <SkillBadge name="TypeScript" level="Advanced" />
            <SkillBadge name="Node.js" level="Intermediate" />
            <SkillBadge name="Python" level="Intermediate" />
            <SkillBadge name="SQL" level="Advanced" />
            <SkillBadge name="AWS" level="Intermediate" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">Let's Connect</h2>
          <p className="text-xl text-gray-300 mb-8">
            I'm always open to any discussion and oppurtunities.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ryans6892@gmail.com" target="_blank"
            className="inline-flex items-center gap-2 bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Mail size={20} />
            Get in Touch
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 bg-gray-900">
        <p>© {new Date().getFullYear()} Ryan Smith. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;