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

// Helper: fetch content from API
async function fetchContent(endpoint) {
    try {
        const response = await fetch(`/api/${endpoint}`);
        return await response.json();
    } catch (error) {
        return null;
    }
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
        appendOutput('Available commands: about, skills, projects, experience, contact, clear, help');
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
