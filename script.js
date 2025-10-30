const arrow = document.querySelector('.arrow');
const langList = document.getElementById('langList');
const searchInput = document.getElementById('searchInput');
const statusDiv = document.getElementById('status');
const repoCard = document.getElementById('repoCard');
const repoName = document.getElementById('repoName');
const repoDesc = document.getElementById('repoDesc');
const repoStars = document.getElementById('repoStars');
const repoForks = document.getElementById('repoForks');
const repoIssues = document.getElementById('repoIssues');

let languages = []; // Simpan list dari JSON

document.addEventListener('DOMContentLoaded', loadLanguages);

async function loadLanguages() {
  try {
    const response = await fetch('languages.json');
    if (!response.ok) throw new Error('Failed to load languages');
    const data = await response.json();
    languages = data; // simpan semua bahasa
    renderLanguageList(languages);
  } catch (error) {
    console.error('Error loading languages:', error);
    langList.innerHTML = '<li>Error loading languages</li>';
  }
}

function renderLanguageList(list) {
  langList.innerHTML = '';
  list.forEach(lang => {
    const li = document.createElement('li');
    li.classList.add('nameLang');
    li.textContent = lang.title;
    li.addEventListener('click', () => {
      searchInput.value = lang.title;
      langList.classList.add('hidden');
      arrow.textContent = '▼';
      fetchRepos(lang.title);
    });
    langList.appendChild(li);
  });
}

// Toggle dropdown saat klik arrow
arrow.addEventListener('click', () => {
  langList.classList.toggle('hidden');
  arrow.textContent = langList.classList.contains('hidden') ? '▼' : '▲';
});

// Filter bahasa saat user mengetik
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = languages.filter(lang =>
    lang.title.toLowerCase().includes(query)
  );
  renderLanguageList(filtered);

  // kalau ketik langsung dan tekan Enter
  if (e.key === 'Enter' && query.trim() !== '') {
    fetchRepos(query.trim());
    langList.classList.add('hidden');
    arrow.textContent = '▼';
  }
});

// Fetch repo dari GitHub
async function fetchRepos(language) {
  statusDiv.textContent = `Fetching ${language} repositories...`;
  repoCard.classList.add('hidden');

  try {
    const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=1`);
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const repo = data.items[0];
      repoName.textContent = repo.name;
      repoDesc.textContent = repo.description || 'No description available.';
      repoStars.textContent = repo.stargazers_count;
      repoForks.textContent = repo.forks_count;
      repoIssues.textContent = repo.open_issues_count;

      repoCard.classList.remove('hidden');
      statusDiv.textContent = `Top ${language} repository:`;
    } else {
      statusDiv.textContent = `No repositories found for ${language}.`;
    }
  } catch (error) {
    statusDiv.textContent = `Error fetching repositories for ${language}.`;
    console.error(error);
  }
}
