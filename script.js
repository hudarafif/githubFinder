const toggle = document.getQuerySelector('.drop-toggle');
const label = document.querySelector('.label');
const arrow = document.querySelector('.arrow');
const items = document.querySelectorAll('li');
const dropdown = document.getElementById('dropdown');
const langList = document.getElementById('langList');
const statusDiv = document.getElementById('status');
const repoCard = document.getElementById('repoCard');
const repoName = document.getElementById('repoName');
const repoDesc = document.getElementById('repoDesc');
const repoStars = document.getElementById('repoStars');
const repoForks = document.getElementById('repoForks');
const repoIssues = document.getElementById('repoIssues');


toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
        if (dropdown.classList.toggle('open')) {
            arrow.textContent = '▲';
        } else {
            arrow.textContent = '▼';
        }
});

items.forEach(item => {
    item.addEventListener('click',()=> {
        label.textContent = item.textContent;
        dropdown.classList.remove('open');
        arrow.textContent = '▼';
    })
})
