// Book structure - update this when adding new chapters
const bookStructure = [
  '#/00-Introduction/README',
  '#/01-Docker/README',
  '#/02-PostgreSQL/README',
  '#/03-BookstoreProject/README',
  '#/04-PagesApp/README',
  '#/05-UserRegistration/README',
  '#/06-StaticAssets/README',
  '#/07-AdvancedUserRegistration/README',
  '#/08-Environment-Variables/README',
  '#/09-Email/README',
  '#/10-Books-App/README',
  '#/11-Reviews-App/README',
  '#/12-File-Image-Uploads/README',
  '#/13-Permissions/README',
  '#/14-Search/README',
  '#/15-Performance/README',
  '#/16-Deployment/README',
  '#/Conclusion/README'
];

// Theme initialization on load
document.addEventListener('DOMContentLoaded', setInitialTheme);

// Global variable to track if buttons exist
let buttonsExist = false;

// Updated navigation function
function updateNavigationButtons() {
  const currentHash = window.location.hash.split('?')[0];
  const currentIndex = bookStructure.findIndex(path => currentHash === path);
  
  // Remove existing buttons if they exist
  const oldButtons = document.querySelector('.nav-buttons');
  if (oldButtons) {
    oldButtons.remove();
    buttonsExist = false;
  }

  if (currentIndex >= 0) {
    const navHtml = `
      <div class="nav-buttons">
        ${currentIndex > 0 ? 
          `<a href="${bookStructure[currentIndex-1]}" class="nav-button prev-button">← Previous</a>` 
          : '<span></span>'}
        ${currentIndex < bookStructure.length-1 ? 
          `<a href="${bookStructure[currentIndex+1]}" class="nav-button next-button">Next →</a>` 
          : ''}
      </div>
    `;
    
    const content = document.querySelector('.content');
    if (content) {
      content.insertAdjacentHTML('beforeend', navHtml);
      buttonsExist = true;
      
      // Add click handlers after buttons are inserted
      document.querySelector('.prev-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = bookStructure[currentIndex-1];
        setTimeout(updateNavigationButtons, 100);
      });
      
      document.querySelector('.next-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = bookStructure[currentIndex+1];
        setTimeout(updateNavigationButtons, 100);
      });
    }
  }
}

// Docsify configuration
window.$docsify = {
  name: 'Django for Professionals',
  loadSidebar: true,
  themeColor: '#3f51b5',
  alias: {
    '/.*/_sidebar.md': '/_sidebar.md'
  },
  search: {
    paths: 'auto',
    placeholder: 'Search...'
  },
  markdown: {
      tables: true  // Explicitly enable tables
  },
  plugins: [
    function(hook) {
      hook.doneEach(function() {
        if (!buttonsExist) {
          updateNavigationButtons();
        }
        if (!document.getElementById('theme-toggle')) {
          addThemeToggle();
        }
      });
    }
  ]
};

// Handle hash changes
window.addEventListener('hashchange', function() {
  buttonsExist = false;
  updateNavigationButtons();
});


// Theme functions (keep these the same)
function addThemeToggle() {
  const toggle = document.createElement('div');
  toggle.id = 'theme-toggle';
  toggle.innerHTML = '🌓';
  document.body.appendChild(toggle);
  toggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const lightTheme = document.getElementById('light-theme');
  const darkTheme = document.getElementById('dark-theme');
  const isDark = lightTheme.disabled;
  
  lightTheme.disabled = !isDark;
  darkTheme.disabled = isDark;
  localStorage.setItem('docsify-theme', isDark ? 'light' : 'dark');
}

function setInitialTheme() {
  if (localStorage.getItem('docsify-theme') === 'dark') {
    document.getElementById('light-theme').disabled = true;
    document.getElementById('dark-theme').disabled = false;
  }
}
