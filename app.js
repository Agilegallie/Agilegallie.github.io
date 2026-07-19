// Project Data Repository Catalog
const projectsData = {
    "astro-core": {
        title: "ASTRO-CORE Observation System",
        description: "Android application prototype for tracking Near-Earth Objects (NEOs). Built as a refinement and improvement on previous Kepler transit pipeline UX projects, incorporating World Asteroid Day STEM outreach layouts using Jetpack Compose.",
        framework: "Kotlin / Jetpack Compose",
        platform: "Android Mobile / HUD",
        frame: "phone",
        url: "https://agilegallie.github.io/astro-core/",
        repo: "https://github.com/Agilegallie/astro-core",
        video: "https://www.youtube.com/embed/I_Li1LePwoY",
        badge: "ASTEROID DETECTOR"
    },
    "nasa-smartwatch": {
        title: "NASA Smartwatch UI Dashboard",
        description: "A glanceable Wear OS system interface tailored for astronauts aboard the International Space Station. Developed as part of the NASA Space Apps Challenges, representing substantial usability and layout improvements over previous watch UI/UX projects.",
        framework: "HTML5 / Vanilla CSS & JS",
        platform: "Wear OS (Google Pixel Watch)",
        frame: "watch",
        url: "https://agilegallie.github.io/NASA_Smartwatch/screens/hub.html",
        repo: "https://github.com/Agilegallie/NASA_Smartwatch",
        video: "https://www.youtube.com/embed/cJXVbh0_1Ic",
        badge: "ISS CREW WEARABLE"
    },
    "twister": {
        title: "Twister Mission Controller",
        description: "Drone probe atmospheric telemetry dashboard designed for severe weather monitoring, tornado tracking, and aerial probe data retrieval.",
        framework: "HTML5 / CSS / Vanilla JS",
        platform: "Widescreen / Web Browser",
        frame: "monitor",
        url: "https://agilegallie.github.io/twister/",
        repo: "https://github.com/Agilegallie/twister",
        badge: "DRONE MISSION"
    },
    "insurtech": {
        title: "Insurtech AR Gamification",
        description: "An interactive, gamified insurance claims simulator showcasing augmented reality HUD elements and user-engagement dashboards.",
        framework: "HTML5 / WebView / CSS3",
        platform: "Mobile / AR HUD View",
        frame: "phone",
        url: "https://agilegallie.github.io/insurtechgamification/",
        repo: "https://github.com/Agilegallie/insurtechgamification",
        badge: "AR GAMIFICATION"
    },
    "exoplanet-prioritizer": {
        title: "Exoplanet Candidate Prioritizer",
        description: "TESS exoplanet vetting and habitability classification dashboard designed for the Nancy Grace Roman Space Telescope pipelines to prioritize candidates for SETI observation. Developed as a NASA Space Apps Challenge project to refine exoplanet discovery workflows.",
        framework: "HTML5 / Astro-science modules",
        platform: "Widescreen / Web Console",
        frame: "monitor",
        url: "https://agilegallie.github.io/Exoplanet-Candidate-Prioritizer/",
        repo: "https://github.com/Agilegallie/Exoplanet-Candidate-Prioritizer",
        badge: "SETI RESEARCH"
    },
    "exoplanet-vetting": {
        title: "Exoplanet Vetting Tool",
        description: "Kepler and TESS transit light curve vetting interface created for NASA Space Apps 2025. Offers substantial UI/UX refinements to improve data validation rates over previous vetting designs.",
        framework: "HTML5 / Kepler Science Canvas",
        platform: "Widescreen / Analysis Console",
        frame: "monitor",
        url: "https://agilegallie.github.io/Exoplanet-Vetting-Tool/",
        repo: "https://github.com/Agilegallie/Exoplanet-Vetting-Tool",
        badge: "NASA SPACE APPS"
    },
    "ai-twin": {
        title: "AI Digital Health Twin",
        description: "AI-driven biomarker projection dashboard modeling cardiovascular, vascular, and metabolic health indicators using neural network projections.",
        framework: "HTML5 / JS / Charting API",
        platform: "Mobile / Digital Twin UI",
        frame: "phone",
        url: "https://agilegallie.github.io/aidigitaltwin/",
        repo: "https://github.com/Agilegallie/aidigitaltwin",
        badge: "HEALTH TWIN AI"
    },
    "master-twin": {
        title: "Master Digital Health Twin",
        description: "Unified health dashboard integrating real-time telemetry from multi-sensor medical diagnostics, wearable sensors, and predictive health models.",
        framework: "HTML5 / Sensor integration UI",
        platform: "Mobile / Medical Portal",
        frame: "phone",
        url: "https://agilegallie.github.io/masterdigitaltwin/",
        repo: "https://github.com/Agilegallie/masterdigitaltwin",
        badge: "HEALTH TWIN MASTER"
    },
    "streamlit-twin": {
        title: "Streamlit Health Twin",
        description: "Python Streamlit-driven data analytics console charting health biomarker trends, risk metrics, and predictive healthcare dashboards.",
        framework: "Streamlit / Python Web View",
        platform: "Widescreen / Analytics Dashboard",
        frame: "monitor",
        url: "https://agilegallie.github.io/streamlitdigitaltwin/",
        repo: "https://github.com/Agilegallie/streamlitdigitaltwin",
        badge: "HEALTH TWIN STREAMLIT"
    },
    "template-twin": {
        title: "Template Health Twin Scaffold",
        description: "Deployable health twin template providing standard charting scaffolds, biometric database fields, and standardized data ingestion scripts.",
        framework: "HTML5 Boilerplate / JS Core",
        platform: "Mobile / Scaffold App",
        frame: "phone",
        url: "https://agilegallie.github.io/templatedigitaltwin/",
        repo: "https://github.com/Agilegallie/templatedigitaltwin",
        badge: "HEALTH TWIN SCATTER"
    }
};

let activeProjectId = "astro-core";
let activeMediaMode = "live"; // "live" or "video"

document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initProjectCards();
    initMediaSelectors();
    initTelemetryConsole();
    
    // Initial display sync
    syncActiveProject();
});

/**
 * Handles project list filtering by category classification
 */
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Set active class on clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            let firstVisibleCard = null;

            // Show or hide cards
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    if (!firstVisibleCard) {
                        firstVisibleCard = card;
                    }
                } else {
                    card.style.display = 'none';
                }
            });

            // If the currently active project was hidden, switch to the first visible one
            const currentCard = document.getElementById(`card-${activeProjectId}`);
            if (currentCard && currentCard.style.display === 'none' && firstVisibleCard) {
                const newProjectId = firstVisibleCard.getAttribute('data-project');
                selectProject(newProjectId);
            }
        });
    });
}

/**
 * Attaches click triggers to all project cards
 */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            selectProject(projectId);
        });
    });
}

/**
 * Switches the active project inside variables and updates the control deck
 */
function selectProject(projectId) {
    if (activeProjectId === projectId) return;

    // Deactivate previous card
    const prevCard = document.getElementById(`card-${activeProjectId}`);
    if (prevCard) prevCard.classList.remove('active');

    // Activate new card
    activeProjectId = projectId;
    const newCard = document.getElementById(`card-${activeProjectId}`);
    if (newCard) newCard.classList.add('active');

    // Reset media view mode to live simulator when selecting a new project
    activeMediaMode = "live";
    const liveBtn = document.getElementById('btn-toggle-live');
    const videoBtn = document.getElementById('btn-toggle-video');
    if (liveBtn) liveBtn.classList.add('active');
    if (videoBtn) videoBtn.classList.remove('active');

    // Update layout
    syncActiveProject();
}

/**
 * Synchronizes the right-side control deck HTML content, frames, and iframe URLs
 */
function syncActiveProject() {
    const project = projectsData[activeProjectId];
    if (!project) return;

    // Update text content
    document.getElementById('deck-title').innerText = project.title;
    document.getElementById('deck-description').innerText = project.description;
    document.getElementById('deck-meta-framework').innerText = project.framework;
    document.getElementById('deck-meta-platform').innerText = project.platform;
    
    // Update Action links
    document.getElementById('deck-launch-btn').setAttribute('href', project.url);
    document.getElementById('deck-repo-btn').setAttribute('href', project.repo);

    // Update Status Indicator Glow Colors
    const statusLabel = document.getElementById('deck-status-label');
    const pulseRing = document.querySelector('.pulse-ring');
    const category = project.category || document.getElementById(`card-${activeProjectId}`).getAttribute('data-category');
    
    if (category === 'space') {
        statusLabel.style.color = 'var(--color-cyan)';
        pulseRing.style.backgroundColor = 'var(--color-cyan)';
        pulseRing.style.boxShadow = '0 0 8px var(--color-cyan)';
    } else if (category === 'missions') {
        statusLabel.style.color = 'var(--color-orange)';
        pulseRing.style.backgroundColor = 'var(--color-orange)';
        pulseRing.style.boxShadow = '0 0 8px var(--color-orange)';
    } else if (category === 'health') {
        statusLabel.style.color = 'var(--color-green)';
        pulseRing.style.backgroundColor = 'var(--color-green)';
        pulseRing.style.boxShadow = '0 0 8px var(--color-green)';
    }

    // Toggle video button availability
    const videoToggleBtn = document.getElementById('btn-toggle-video');
    if (videoToggleBtn) {
        if (project.video) {
            videoToggleBtn.style.display = 'inline-block';
        } else {
            videoToggleBtn.style.display = 'none';
        }
    }

    // Load active view
    loadActiveView();
}

/**
 * Sets up listeners for the Live Simulator / Walkthrough Video buttons
 */
function initMediaSelectors() {
    const liveBtn = document.getElementById('btn-toggle-live');
    const videoBtn = document.getElementById('btn-toggle-video');

    if (liveBtn) {
        liveBtn.addEventListener('click', () => {
            if (activeMediaMode === "live") return;
            activeMediaMode = "live";
            liveBtn.classList.add('active');
            if (videoBtn) videoBtn.classList.remove('active');
            loadActiveView();
        });
    }

    if (videoBtn) {
        videoBtn.addEventListener('click', () => {
            if (activeMediaMode === "video") return;
            activeMediaMode = "video";
            videoBtn.classList.add('active');
            if (liveBtn) liveBtn.classList.remove('active');
            loadActiveView();
        });
    }
}

/**
 * Renders the active device frame (phone, watch, monitor, or video container) and loads iframe sources
 */
function loadActiveView() {
    const project = projectsData[activeProjectId];
    if (!project) return;

    const frames = {
        phone: document.getElementById('device-frame-phone'),
        watch: document.getElementById('device-frame-watch'),
        monitor: document.getElementById('device-frame-monitor'),
        video: document.getElementById('device-frame-video')
    };

    const iframes = {
        phone: document.getElementById('iframe-phone'),
        watch: document.getElementById('iframe-watch'),
        monitor: document.getElementById('iframe-monitor'),
        video: document.getElementById('iframe-video')
    };

    // Hide all frames
    Object.values(frames).forEach(frame => {
        if (frame) frame.style.display = 'none';
    });

    // Clear all iframe sources to stop background overhead, except the active one
    Object.keys(iframes).forEach(key => {
        if (iframes[key]) iframes[key].setAttribute('src', '');
    });

    if (activeMediaMode === "video" && project.video) {
        // Show Video Frame
        if (frames.video) frames.video.style.display = 'block';
        if (iframes.video) iframes.video.setAttribute('src', project.video);
    } else {
        // Show corresponding device frame (phone/watch/monitor)
        const activeFrameKey = project.frame;
        const activeFrame = frames[activeFrameKey];
        const activeIframe = iframes[activeFrameKey];

        if (activeFrame) activeFrame.style.display = 'flex';
        if (activeIframe) activeIframe.setAttribute('src', project.url);
    }
}

/**
 * Runs a simulated retro terminal telemetry stream
 */
function initTelemetryConsole() {
    const consoleContainer = document.getElementById('console-terminal-log');
    if (!consoleContainer) return;

    // Sequential array of telemetry log lines
    const logPool = [
        { text: '// Initializing connection to Agilegallie orbital database...', type: 'dim' },
        { text: '[OK] Connected to github.com/Agilegallie/astro-core', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/NASA_Smartwatch', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/twister', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/insurtechgamification', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/Exoplanet-Candidate-Prioritizer', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/Exoplanet-Vetting-Tool', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/aidigitaltwin', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/masterdigitaltwin', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/streamlitdigitaltwin', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/templatedigitaltwin', type: 'cyan' },
        { text: '// Fetching telemetry payload metadata...', type: 'normal' },
        { text: '[INFO] Syncing telescope sensor node: 100% complete', type: 'normal' },
        { text: '[INFO] System check: 10 active observation channels verified', type: 'normal' },
        { text: '[WARN] Atmospheric drift detected: 1.4% (negligible)', type: 'normal' },
        { text: '[DATA] Sighting: NEO-2026-JM, Dec: +22.45, RA: 12h 43m', type: 'cyan' },
        { text: '[DATA] Sighting: NEO-2026-XF, Dec: -08.12, RA: 05h 21m', type: 'cyan' },
        { text: '[DATA] Telemetry payload synced: 142.1 kb/s', type: 'normal' },
        { text: '[OK] Secure communications tunnel open', type: 'cyan' },
        { text: '// Calibrating ground-to-watch synchronization...', type: 'dim' },
        { text: '[INFO] Android Wear OS simulator listener loaded', type: 'normal' },
        { text: '[OK] Watch interface assets linked successfully', type: 'cyan' },
        { text: '[DATA] Core telemetry: battery=98%, heart_rate=72 bpm', type: 'cyan' },
        { text: '[INFO] System status stable. Monitoring active streams.', type: 'normal' }
    ];

    // Clear initial markup and render sequentially
    consoleContainer.innerHTML = '';
    let lineIndex = 0;

    function addNextLine() {
        if (lineIndex >= logPool.length) {
            // Loop back to a subset to keep the console alive
            lineIndex = 12; 
        }

        const logEntry = logPool[lineIndex];
        const lineElement = document.createElement('div');
        lineElement.className = 'console-line';

        if (logEntry.type === 'cyan') {
            lineElement.classList.add('text-cyan');
        } else if (logEntry.type === 'dim') {
            lineElement.classList.add('text-dim');
        }

        lineElement.innerText = logEntry.text;
        consoleContainer.appendChild(lineElement);
        
        // Auto-scroll to the bottom of the console card
        consoleContainer.scrollTop = consoleContainer.scrollHeight;

        lineIndex++;

        // Random delay between lines to mimic actual network feeds (1s to 2.5s)
        const delay = Math.random() * 1500 + 1000;
        setTimeout(addNextLine, delay);
    }

    // Begin typing sequence
    addNextLine();
}
