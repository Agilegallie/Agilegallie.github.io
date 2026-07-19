document.addEventListener('DOMContentLoaded', () => {
    initProjectTabs();
    initVisualToggles();
    initTelemetryConsole();
});

/**
 * Handles switching between the main project panels (ASTRO-CORE and NASA Smartwatch)
 */
function initProjectTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectPanels = document.querySelectorAll('.project-panel');
    const heroBadge = document.getElementById('hero-badge');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetProject = button.getAttribute('data-project');

            // 1. Remove active state from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            projectPanels.forEach(panel => panel.classList.remove('active'));

            // 2. Add active state to selected tab and panel
            button.classList.add('active');
            const targetPanel = document.getElementById(`panel-${targetProject}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // 3. Update Hero Badge to reflect active mission context
            if (targetProject === 'astro') {
                heroBadge.innerText = 'MISSION CONTEXT: ASTRO-CORE';
                heroBadge.className = 'mission-badge';
                heroBadge.style.borderColor = 'var(--color-cyan)';
                heroBadge.style.color = 'var(--color-cyan)';
                heroBadge.style.backgroundColor = 'var(--color-cyan-dim)';
            } else if (targetProject === 'watch') {
                heroBadge.innerText = 'MISSION CONTEXT: NASA SMARTWATCH';
                heroBadge.className = 'mission-badge';
                heroBadge.style.borderColor = 'var(--color-orange)';
                heroBadge.style.color = 'var(--color-orange)';
                heroBadge.style.backgroundColor = 'var(--color-orange-dim)';
            }
        });
    });
}

/**
 * Handles switching between walkthrough video and simulator/preview inside each panel
 */
function initVisualToggles() {
    const toggleButtons = document.querySelectorAll('.visual-toggle-btn');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const parentPanel = btn.closest('.project-panel');
            
            if (!parentPanel) return;

            // Find siblings in the same visual area
            const panelButtons = parentPanel.querySelectorAll('.visual-toggle-btn');
            const panelItems = parentPanel.querySelectorAll('.visual-item');

            // Deactivate all toggles and items inside this panel
            panelButtons.forEach(button => button.classList.remove('active'));
            panelItems.forEach(item => item.classList.remove('active'));

            // Activate clicked toggle
            btn.classList.add('active');

            // Activate target item container
            const targetItem = document.getElementById(targetId);
            if (targetItem) {
                targetItem.classList.add('active');
            }
        });
    });
}

/**
 * Runs a simulated retro terminal telemetry stream
 */
function initTelemetryConsole() {
    const consoleContainer = document.getElementById('console-terminal-log');
    if (!consoleContainer) return;

    // Predefined array of telemetry log lines
    const logPool = [
        { text: '// Initializing connection to orbital database...', type: 'dim' },
        { text: '[OK] Connected to github.com/Agilegallie/astro-core', type: 'cyan' },
        { text: '[OK] Connected to github.com/Agilegallie/crew-watch-wireframes', type: 'cyan' },
        { text: '// Fetching telemetry payload metadata...', type: 'normal' },
        { text: '[INFO] Syncing telescope sensor node: 100% complete', type: 'normal' },
        { text: '[INFO] System check: 14 active observation channels verified', type: 'normal' },
        { text: '[WARN] Atmospheric drift detected: 1.4% (negligible)', type: 'normal' },
        { text: '[DATA] Sighting: NEO-2026-JM, Dec: +22.45, RA: 12h 43m', type: 'cyan' },
        { text: '[DATA] Sighting: NEO-2026-XF, Dec: -08.12, RA: 05h 21m', type: 'cyan' },
        { text: '[DATA] Telemetry payload synced: 84.1 kb/s', type: 'normal' },
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
            // Loop or reset back to a subset to keep the console alive
            lineIndex = 3; 
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
