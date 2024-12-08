const newsContainer = document.getElementById('news-container');
const apiKey = 'cea4acaf874e4d4fa6c9142b7a9b5741';

// Get the API URL for India news by category
function getApiUrl(category) {
    return category === 'top-headlines'
        ? `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
}

// Fetch and display news articles
async function fetchNews(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        newsContainer.innerHTML = ''; // Clear existing news
        if (data.articles && data.articles.length > 0) {
            data.articles.forEach(article => {
                const newsCard = document.createElement('a');
                newsCard.classList.add('news-card');
                newsCard.href = article.url;
                newsCard.target = '_blank';
                newsCard.innerHTML = `
                    <img src="${article.urlToImage || 'https://via.placeholder.com/300x200'}" alt="News Image">
                    <div class="content">
                        <h2>${article.title}</h2>
                        <p>${article.description || 'No description available.'}</p>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
        } else {
            newsContainer.innerHTML = '<p>No news available.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

// Fetch news based on category
function fetchCategory(category) {
    const categoryUrl = getApiUrl(category);
    fetchNews(categoryUrl);
}

// Search news
function searchNews() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        const searchUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&apiKey=${apiKey}`;
        fetchNews(searchUrl);
    } else {
        fetchCategory('top-headlines'); // Reload top headlines if search input is empty
    }
}

// Load India top headlines on page load
window.addEventListener('DOMContentLoaded', () => fetchCategory('top-headlines'));

// Modal Controls
function openLoginModal() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
}

function openRegisterModal() {
    closeLoginModal();
    document.getElementById("registerModal").style.display = "flex";
}

function closeRegisterModal() {
    document.getElementById("registerModal").style.display = "none";
}

// Handle Login (Placeholder)
function loginUser() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    console.log("Logging in user:", username);
    closeLoginModal();
    alert(`Welcome, ${username}!`);
}

// Handle Registration (Placeholder)
function registerUser() {
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    console.log("Registering user:", username, email);
    closeRegisterModal();
    alert(`Thank you for registering, ${username}!`);
}

// Close modal if clicked outside content
window.onclick = function(event) {
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    if (event.target === loginModal) {
        closeLoginModal();
    } else if (event.target === registerModal) {
        closeRegisterModal();
    }
}
