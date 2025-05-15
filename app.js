// Terminal-like typing effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    return new Promise(resolve => {
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

// Add terminal cursor to element
function addCursor(element) {
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    element.appendChild(cursor);
}

// Create terminal line
function createTerminalLine(command, output = '') {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    const prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.textContent = '$';
    
    const outputSpan = document.createElement('span');
    outputSpan.className = 'terminal-output';
    outputSpan.textContent = command;
    
    line.appendChild(prompt);
    line.appendChild(outputSpan);
    
    if (output) {
        const outputElement = document.createElement('div');
        outputElement.className = 'terminal-output';
        outputElement.style.marginLeft = '20px';
        outputElement.textContent = output;
        line.appendChild(outputElement);
    }
    
    return line;
}

// Helper: fetch static content
async function fetchContent(endpoint) {
    const data = {
        about: {
            title: "Hi, I'm Eric!",
            content: "I'm a Computer Science and Mathematics student at Colby College. I love building things, solving problems, and exploring new ideas. Welcome to my portfolio!"
        },
        skills: {
            "Programming Languages": ["JavaScript", "Python", "C", "Go", "Java", "C++"],
            "Frameworks": ["React", "Flask", "Node.js"],
            "Tools": ["Git", "Docker", "Linux"],
            "Familiar": ["Numpy", "XML", "HTML/CSS", "Matlab", "Visual Studio", "Visio", "Azure DevOps", "MS Office"]
        },
        projects: [
            {
                name: "Portfolio Manager - Bloomberg Tech Lab",
                description: "Built a portfolio manager with React and Docker, incorporating best practices and mentorship insights.",
                tech: ["JavaScript", "React", "Docker"]
            },
            {
                name: "Food Pricing System - JP Morgan Chase",
                description: "Addressed food insecurity using PDF processing and SMS alerts with PyMuPDF and Twilio.",
                tech: ["Python", "Twilio", "Pytesseract"]
            },
            {
                name: "Art-For-Climate-Change",
                description: "Implemented top-down OOP methods and modularity with the Python Turtle module to create an interactive simulation tool that reads, interprets, and visually represents L-system files on the screen. Created a GUI using Tkinter which allows users to interact with and navigate between different art scenes created with the Zelle Graphics and Matplotlib libraries that inform about climate change.",
                tech: ["Python", "Twilio", "Pytesseract"]
            },
            {
                name: "Project Right Diet - Food Calorie Calculator",
                description: "Built a calorie calculator that receives data from users on one end, draws internal analysis on calories taken in, and advises users on the best way to go with respect to weight loss and weight gain. Used the Requests and Beautiful Soup python libraries to take live data from websites to ensure accurate data presented by the calculator. Improved efficiency in web scraping.",
                tech: ["Python", "Beautiful Soup", "Pytesseract"]
            },

        ],
        experience: [
            {
                role: "Software Engineering Intern",
                company: "Microsoft",
                duration: "Summer 2025",
                description: [
                    "- Developed and implemented global properties to maintain persistence of Dark Mode setting across sessions, enhancing interface consistency in sheets and workbooks.",
                    "- Enhanced Excel's UX by implementing Dark Mode live preview, modifying sheet tabs, adjusting color schemes for optimal cell-edit mode appearance, and optimizing table rendering for Dark Mode, maintaining optimal contrast ratio as per Design specifications.",
                    "- Refactored existing Dark Mode codebase by applying engineering best practices and leveraging Git for version control, accelerating the shipment of the Dark Mode feature to over 1.3 billion customers."
                ].join('\n')
            },
            {
                role: "Tech Lab Fellow",
                company: "Bloomberg",
                duration: "Summer 2024",
                description: [
                    "Program Participant Princeton, NJ, July 2024 – September 2024",
                    "- One out of 38 software engineers selected from a pool of 600+ applicants to attend three day intensive at Bloomberg Engineer's Princeton Campus.",
                    "- Completed a six-week intensive 1:1 mentoring with Bloomberg senior engineers in data structures, algorithms, and systems design.",
                    "- Collaborated with Bloomberg engineers & peers to build a portfolio manager by utilizing Javascript, React and Docker."
                ].join('\n')
            },
            {
                role: "Backend Engineer, Code For Good Hackathon",
                company: "JP Morgan Chase",
                duration: "September 2023",
                description: [
                    "Program Participant Princeton, NJ, Backend Engineer September 2023",
                    "- Collaborated with a team of six to develop a web application aimed at addressing food insecurity by implementing a personalized food pricing system based on user data.",
                    "- Leveraged PyMuPDF, Pytesseract, and regex libraries to create a PDF-to-text feature for the web app, enhancing its functionality.",
                    "- Utilized Twilio and Ngrok to design and test an SMS sign-up feature, providing users with a convenient, accessible registration method."
                ].join('\n')
            }
        ],
        contact: {
            email: "appiahericadjei@gmail.com",
            linkedin: "https://www.linkedin.com/in/eric-adjei-75470620a/",
            github: "https://github.com/heyerichere",
            website: "https://heyerichere.github.io"
        },
        resume: {
            education: "Colby College, B.A. in Computer Science & Mathematics (Expected May 2026)",
            skills: {
                proficient: ["Python", "Java", "JavaScript", "C", "C++", "Git"],
                familiar: ["Numpy", "XML", "HTML/CSS", "Matlab", "Visual Studio", "Visio", "Azure DevOps", "MS Office"]
            },
            coursework: ["Software Engineering", "Database Design & Dev", "Data Visualization", "Algorithms", "Scientific Computing", "Calculus", "Linear Algebra", "Differential Equations"],
            experience: [
                "Microsoft (Intern): Enhanced Excel's Dark Mode, refactored codebase, shipped to 1.3B users.",
                "Bloomberg Tech Lab: Mentored in systems design; built portfolio manager with React & Docker.",
                "J.P. Morgan Hackathon: Built food pricing system with PyMuPDF, Twilio, and Pytesseract.",
                "Colby CS Dept TA: Mentored 500+ students, debugged code, and assisted in software setup."
            ],
            projects: [
                "Art-For-Climate-Change: Python Turtle & Tkinter GUI to visualize L-system-based climate art.",
                "Project Right Diet: Calorie calculator using BeautifulSoup, live web scraping, data analysis."
            ],
            activities: ["Young Achievers’ Foundation – Coding Outreach Coordinator", "Colorstack", "Codepath", "Colby Hackers"],
            honors: ["Dean’s List 2023", "Ghana Science Olympiad Gold Medalist", "AFSHTS Valedictorian 2020"]
        }
    };
    return data[endpoint] || null;
}

const terminalContent = document.getElementById('terminal-content');
const terminalInputArea = document.getElementById('terminal-input-area');

function createInput() {
    // Only create input if terminal is visible
    if (!document.body.classList.contains('plain-active')) {
        terminalInputArea.innerHTML = '';
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        inputLine.innerHTML = `<span class="terminal-prompt">$</span><input type="text" id="terminal-input" class="terminal-input" autofocus placeholder="Type a command..." />`;
        terminalInputArea.appendChild(inputLine);
        const input = document.getElementById('terminal-input');
        if (input) {
            input.focus();
            input.addEventListener('keydown', async (e) => {
                if (e.key === 'Enter') {
                    const value = input.value.trim();
                    if (!value) return;
                    appendCommand(value);
                    terminalInputArea.innerHTML = '';
                    // Run command
                    const cmd = value.toLowerCase();
                    if (commands[cmd]) {
                        await commands[cmd]();
                    } else {
                        appendError(`Command not found: ${cmd}`);
                        await commands.help();
                    }
                    createInput();
                }
            });
        }
    } else {
        terminalInputArea.innerHTML = '';
    }
}

const commands = {
    help: async () => {
        appendOutput('Available commands: about, skills, projects, experience, contact, resume, education, coursework, honors, activities, clear, help');
    },
    about: async () => {
        const about = await fetchContent('about');
        if (about) {
            appendOutput(about.title);
            appendOutput(about.content);
        } else {
            appendError('Could not fetch about info.');
        }
    },
    skills: async () => {
        const skills = await fetchContent('skills');
        if (skills) {
            Object.entries(skills).forEach(([cat, items]) => {
                appendOutput(cat + ':');
                appendOutput('  ' + items.join(', '));
            });
        } else {
            appendError('Could not fetch skills.');
        }
    },
    projects: async () => {
        const projects = await fetchContent('projects');
        if (projects) {
            projects.forEach(project => {
                appendOutput(project.name);
                appendOutput('  ' + project.description);
                appendOutput('  Technologies: ' + project.tech.join(', '));
            });
        } else {
            appendError('Could not fetch projects.');
        }
    },
    experience: async () => {
        const experience = await fetchContent('experience');
        if (experience) {
            experience.forEach(exp => {
                appendOutput(exp.role + ' at ' + exp.company);
                appendOutput('  ' + exp.duration);
                appendOutput('  ' + exp.description);
            });
        } else {
            appendError('Could not fetch experience.');
        }
    },
    contact: async () => {
        const contact = await fetchContent('contact');
        if (contact) {
            appendOutput('Email: ' + contact.email);
            appendOutput('LinkedIn: ' + contact.linkedin);
            appendOutput('GitHub: ' + contact.github);
            appendOutput('Website: ' + contact.website);
        } else {
            appendError('Could not fetch contact info.');
        }
    },
    resume: async () => {
        const resume = await fetchContent('resume');
        if (resume) {
            appendOutput("Education: " + resume.education);
            appendOutput("Skills (Proficient): " + resume.skills.proficient.join(', '));
            appendOutput("Skills (Familiar): " + resume.skills.familiar.join(', '));
            appendOutput("Coursework: " + resume.coursework.join(', '));
            resume.experience.forEach(exp => appendOutput("Experience: " + exp));
            resume.projects.forEach(proj => appendOutput("Project: " + proj));
            appendOutput("Activities: " + resume.activities.join(', '));
            appendOutput("Honors: " + resume.honors.join(', '));
        } else {
            appendError('Could not fetch resume info.');
        }
    },
    education: async () => {
        const resume = await fetchContent('resume');
        if (resume) {
            appendOutput("Education: " + resume.education);
        } else {
            appendError('Could not fetch education info.');
        }
    },
    coursework: async () => {
        const resume = await fetchContent('resume');
        if (resume) {
            appendOutput("Coursework: " + resume.coursework.join(', '));
        } else {
            appendError('Could not fetch coursework info.');
        }
    },
    honors: async () => {
        const resume = await fetchContent('resume');
        if (resume) {
            appendOutput("Honors: " + resume.honors.join(', '));
        } else {
            appendError('Could not fetch honors info.');
        }
    },
    activities: async () => {
        const resume = await fetchContent('resume');
        if (resume) {
            appendOutput("Activities: " + resume.activities.join(', '));
        } else {
            appendError('Could not fetch activities info.');
        }
    },
    clear: async () => {
        // Only clear output lines, not the welcome message or input
        Array.from(terminalContent.children).forEach(child => {
            if (!child.classList.contains('terminal-welcome') && child.id !== 'terminal-input-area') {
                terminalContent.removeChild(child);
            }
        });
    }
};

function appendCommand(cmd) {
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.innerHTML = `<span class="terminal-prompt">$</span> <span class="terminal-command">${cmd}</span>`;
    terminalContent.insertBefore(div, terminalInputArea);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

function appendOutput(text) {
    const div = document.createElement('div');
    div.className = 'terminal-line terminal-output';
    div.innerHTML = `${text}`;
    terminalContent.insertBefore(div, terminalInputArea);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

function appendError(msg) {
    const div = document.createElement('div');
    div.className = 'terminal-line terminal-error';
    div.innerHTML = `${msg}`;
    terminalContent.insertBefore(div, terminalInputArea);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

// Initial input
createInput();

// Focus input on click anywhere (only in terminal mode)
window.addEventListener('click', () => {
    if (!document.body.classList.contains('plain-active')) {
        const input = document.getElementById('terminal-input');
        if (input) input.focus();
    }
});
window.onload = () => {
    if (!document.body.classList.contains('plain-active')) {
        const input = document.getElementById('terminal-input');
        if (input) input.focus();
    }
};

const terminalBtn = document.getElementById('terminal-btn');
const plainBtn = document.getElementById('plain-btn');
// Mode toggle logic
if (terminalBtn && plainBtn) {
    terminalBtn.onclick = () => {
        document.body.classList.remove('plain-active');
        terminalBtn.classList.add('active');
        plainBtn.classList.remove('active');
        setTimeout(createInput, 50);
    };
    plainBtn.onclick = () => {
        document.body.classList.add('plain-active');
        plainBtn.classList.add('active');
        terminalBtn.classList.remove('active');
        window.renderPlainPortfolio && window.renderPlainPortfolio();
    };
}
// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Terminal window controls
document.querySelector('.terminal-button.close').addEventListener('click', () => {
    window.close();
});

document.querySelector('.terminal-button.minimize').addEventListener('click', () => {
    document.querySelector('.terminal-content').style.display = 'none';
});

document.querySelector('.terminal-button.maximize').addEventListener('click', () => {
    document.querySelector('.terminal-window').classList.toggle('maximized');
});

// Load all content when the page loads
window.addEventListener('load', () => {
    loadAbout();
    loadSkills();
    loadProjects();
    loadExperience();
    loadContact();
});
