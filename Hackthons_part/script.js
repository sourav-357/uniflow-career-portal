// ======= Generate Realistic Hackathon Data =======
const hackathonNames = [
  'CodeSprint', 'AI Revolution', 'Web Innovators', 'Data Dive', 'Quantum Quest', 'Cloud Clash', 'Cyber Shield', 'Green Hack', 'HealthTech Jam', 'EduThon',
  'Smart City Challenge', 'Women Who Code', 'FinTech Fusion', 'AgriTech Arena', 'Space Apps', 'Hack4Good', 'Open Source Odyssey', 'Game Jam', 'IoT Impact', 'Sustainability Hack',
  'NextGen Hack', 'BlockChain Blitz', 'Design Sprint', 'Startup Weekend', 'Social Impact Hack', 'BioHack', 'Robotics Rumble', 'Security Showdown', 'Smart Mobility', 'Voice AI Hack',
  'Edge Compute Jam', 'Cloud Native Hack', 'Accessibility Jam', 'CivicTech Sprint', 'SportsTech Hack', 'TravelTech Jam', 'Retail Revolution', 'LegalTech Hack', 'Energy Innovate', 'XR Hack',
  'Hack the Future', 'AI for Good', 'Climate Code', 'Hack the Crisis', 'Remote Hack', 'Campus Coder', 'Diversity Hack', 'Women in STEM', 'Student Innovators', 'Tech for All'
];

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomPrize() { return Math.floor(Math.random() * 9000) + 2000; }
function randomDomain() {
  return randomFrom(['AI', 'Web', 'Blockchain', 'Health', 'Education', 'Environment', 'Security', 'Finance', 'Robotics', 'General']);
}
function randomDesc(name, domain) {
  return `Join ${name}, a ${domain} hackathon. Collaborate, innovate, and win prizes! Network with mentors and showcase your skills.`;
}
function randomLogo(domain) {
  const logos = {
    'AI': '🤖', 'Web': '🌐', 'Blockchain': '⛓️', 'Health': '🩺', 'Education': '📚', 'Environment': '🌱', 'Security': '🔒', 'Finance': '💸', 'Robotics': '🤖', 'General': '🚀'
  };
  return logos[domain] || '💡';
}
function randomLink() { return 'https://example.com/hackathon'; }

function generateHackathons(count, status, startDate) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const name = hackathonNames[(i + Math.floor(Math.random()*hackathonNames.length)) % hackathonNames.length] + ' ' + (2024 + (status === 'upcoming' ? 1 : 0));
    const domain = randomDomain();
    let date;
    if (status === 'ongoing') {
      // Ongoing: today +/- 10 days
      const d = new Date();
      d.setDate(d.getDate() - 5 + (i % 10));
      date = d.toISOString().slice(0,10);
    } else if (status === 'upcoming') {
      // Upcoming: today + 10 to 90 days
      const d = new Date();
      d.setDate(d.getDate() + 10 + (i * 2));
      date = d.toISOString().slice(0,10);
    } else {
      // Past: today - 20 to -200 days
      const d = new Date();
      d.setDate(d.getDate() - 20 - (i * 7));
      date = d.toISOString().slice(0,10);
    }
    arr.push({
      id: status + '_' + i,
      name,
      logo: randomLogo(domain),
      domain,
      desc: randomDesc(name, domain),
      prize: randomPrize(),
      date,
      status,
      link: randomLink()
    });
  }
  return arr;
}

const hackathons = [
  ...generateHackathons(30, 'ongoing'),
  ...generateHackathons(27, 'upcoming'),
  ...generateHackathons(20, 'past')
];

// ======= DOM Refs =======
const grid = document.getElementById('hackathonGrid');
const pills = document.querySelectorAll('.pill');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const modal = document.getElementById('detailsModal');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalDesc = document.getElementById('modalDescription');
const modalList = document.getElementById('modalInfoList');
const modalApplyBtn = document.getElementById('modalApplyBtn');
const modalCloseBtn = document.querySelector('.close-btn');

// ======= State =======
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'dateDesc';

// ======= Render =======
function renderCards() {
  let data = hackathons.filter(h => {
    // Filter
    if (currentFilter === 'all') return true;
    if (currentFilter === 'upcoming') return h.status === 'upcoming';
    if (currentFilter === 'ongoing') return h.status === 'ongoing';
    if (currentFilter === 'past') return h.status === 'past';
    return true;
  }).filter(h => {
    // Search only by name
    return h.name.toLowerCase().includes(currentSearch.toLowerCase());
  });

  // Restore sort dropdown functionality
  if (currentSort === 'dateAsc') {
    data.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (currentSort === 'dateDesc') {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (currentSort === 'prize') {
    data.sort((a, b) => b.prize - a.prize);
  } else if (currentSort === 'name') {
    data.sort((a, b) => a.name.localeCompare(b.name));
  }

  grid.innerHTML = '';
  if (data.length === 0) {
    grid.innerHTML = `<div style='grid-column: 1/-1; text-align:center; color:var(--muted-text); font-size:1.1rem;'>No hackathons found.</div>`;
    return;
  }

  data.forEach(h => {
    const card = document.createElement('div');
    card.className = 'hackathon-card';
    card.innerHTML = `
      <div class="card-header">
        <div class="card-logo">${h.logo}</div>
        <div>
          <div class="card-title">${h.name}</div>
          <div class="card-meta">${h.domain} &middot; ${formatDate(h.date)}</div>
        </div>
      </div>
      <div class="card-desc">${h.desc}</div>
      <div class="card-footer">
        <button class="card-btn" data-id="${h.id}">View</button>
      </div>
    `;
    card.querySelector('.card-btn').addEventListener('click', (e) => {
      e.preventDefault();
      showDetails(h.id);
    });
    grid.appendChild(card);
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

// ======= Modal Logic =======
function showDetails(id) {
  const h = hackathons.find(h => h.id === id);
  if (!h) return;
  modalTitle.textContent = h.name;
  modalMeta.textContent = `${h.domain} | ₹${h.prize.toLocaleString()} | ${formatDate(h.date)}`;
  modalDesc.textContent = h.desc;
  modalList.innerHTML = `
    <li><strong>Domain:</strong> ${h.domain}</li>
    <li><strong>Prize:</strong> ₹${h.prize.toLocaleString()}</li>
    <li><strong>Date:</strong> ${formatDate(h.date)}</li>
    <li><strong>Status:</strong> ${capitalize(h.status)}</li>
  `;
  modalApplyBtn.href = h.link;
  modalApplyBtn.style.display = h.status === 'past' ? 'none' : 'inline-block';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => { modalCloseBtn.focus(); }, 100);
}
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}
modalCloseBtn.addEventListener('click', closeModal);
window.addEventListener('keydown', e => {
  if (modal.style.display !== 'none' && (e.key === 'Escape' || e.key === 'Esc')) closeModal();
});
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// ======= Event Listeners =======
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    pills.forEach(p => p.setAttribute('aria-selected', 'false'));
    pill.setAttribute('aria-selected', 'true');
    currentFilter = pill.dataset.filter;
    renderCards();
  });
});
searchInput.addEventListener('input', e => {
  currentSearch = e.target.value;
  renderCards();
});
sortSelect.addEventListener('change', e => {
  currentSort = e.target.value;
  renderCards();
});

// ======= Init =======
renderCards();
