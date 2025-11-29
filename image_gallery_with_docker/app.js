const galleryState = {
  images: [],
  filteredImages: [],
  currentFilter: '',
  activeTag: null,
  modalIndex: 0
};

const sampleImages = [
  {
    id: 1,
    title: "Mountain Sunrise",
    description: "Golden hour view of snow-capped mountains",
    tags: ["landscape", "nature", "mountains"],
    date: "2025-11-10",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Urban Architecture",
    description: "Modern city skyline at night",
    tags: ["urban", "architecture", "night"],
    date: "2025-11-09",
    url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Forest Path",
    description: "Peaceful walk through dense green forest",
    tags: ["nature", "landscape", "forest"],
    date: "2025-11-08",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "Ocean Waves",
    description: "Dramatic waves crashing on rocky shore",
    tags: ["landscape", "nature", "ocean"],
    date: "2025-11-07",
    url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Desert Dunes",
    description: "Vast sandy landscape at sunset",
    tags: ["landscape", "nature", "desert"],
    date: "2025-11-06",
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "City Lights",
    description: "Vibrant street photography in downtown",
    tags: ["urban", "street", "night"],
    date: "2025-11-05",
    url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop"
  },
  {
    id: 7,
    title: "Waterfall",
    description: "Cascading water in tropical rainforest",
    tags: ["nature", "water", "forest"],
    date: "2025-11-04",
    url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&h=600&fit=crop"
  },
  {
    id: 8,
    title: "Starry Night",
    description: "Milky way galaxy over mountains",
    tags: ["landscape", "night", "nature"],
    date: "2025-11-03",
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop"
  },
  {
    id: 9,
    title: "Flower Garden",
    description: "Colorful blooms in spring garden",
    tags: ["nature", "flowers", "garden"],
    date: "2025-11-02",
    url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=600&fit=crop"
  },
  {
    id: 10,
    title: "Sunset Beach",
    description: "Orange sky reflecting on sandy beach",
    tags: ["landscape", "beach", "sunset"],
    date: "2025-11-01",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop"
  },
  {
    id: 11,
    title: "Mountain Lake",
    description: "Crystal clear alpine lake reflection",
    tags: ["landscape", "nature", "water"],
    date: "2025-10-31",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    id: 12,
    title: "Autumn Forest",
    description: "Golden leaves in fall season",
    tags: ["nature", "forest", "autumn"],
    date: "2025-10-30",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop"
  }
];

const elements = {
  galleryGrid: document.getElementById('gallery-grid'),
  uploadArea: document.getElementById('upload-area'),
  fileInput: document.getElementById('file-input'),
  uploadStatus: document.getElementById('upload-status'),
  searchInput: document.getElementById('search-input'),
  tagFilters: document.getElementById('tag-filters'),
  totalImages: document.getElementById('total-images'),
  totalTags: document.getElementById('total-tags'),
  showingCount: document.getElementById('showing-count'),
  emptyState: document.getElementById('empty-state'),
  modal: document.getElementById('modal'),
  modalImage: document.getElementById('modal-image'),
  modalTitle: document.getElementById('modal-title'),
  modalDescription: document.getElementById('modal-description'),
  modalDate: document.getElementById('modal-date'),
  modalTags: document.getElementById('modal-tags'),
  modalCounter: document.getElementById('modal-counter'),
  modalClose: document.getElementById('modal-close'),
  modalPrev: document.getElementById('modal-prev'),
  modalNext: document.getElementById('modal-next')
};

function initGallery() {
  galleryState.images = [...sampleImages];
  galleryState.filteredImages = [...galleryState.images];
  
  renderGallery();
  renderTagFilters();
  updateStats();
  setupEventListeners();
}

function renderGallery() {
  elements.galleryGrid.innerHTML = '';
  
  if (galleryState.filteredImages.length === 0) {
    elements.emptyState.classList.add('visible');
    elements.galleryGrid.style.display = 'none';
    return;
  }
  
  elements.emptyState.classList.remove('visible');
  elements.galleryGrid.style.display = 'grid';
  
  galleryState.filteredImages.forEach((image, index) => {
    const item = createGalleryItem(image, index);
    elements.galleryGrid.appendChild(item);
  });
  
  updateStats();
}

function createGalleryItem(image, index) {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.setAttribute('data-index', index);
  
  const tagsHTML = image.tags.map(tag => 
    `<span class="tag-badge">${tag}</span>`
  ).join('');
  
  item.innerHTML = `
    <div class="gallery-item__image-wrapper">
      <img src="${image.url}" alt="${image.title}" class="gallery-item__image" loading="lazy">
      <div class="gallery-item__tags">
        ${tagsHTML}
      </div>
      <div class="gallery-item__overlay">
        <div class="gallery-item__info">
          <h3 class="gallery-item__title">${image.title}</h3>
          <p class="gallery-item__description">${image.description}</p>
          <span class="gallery-item__date">${formatDate(image.date)}</span>
        </div>
        <div class="gallery-item__actions">
          <button class="btn btn--primary" onclick="openModal(${index})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            View
          </button>
          <button class="btn btn--danger" onclick="deleteImage(${image.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  `;
  
  return item;
}


function renderTagFilters() {
  const allTags = new Set();
  galleryState.images.forEach(image => {
    image.tags.forEach(tag => allTags.add(tag));
  });
  
  elements.tagFilters.innerHTML = `
    <button class="tag-filter ${!galleryState.activeTag ? 'active' : ''}" onclick="filterByTag(null)">
      All
    </button>
  `;
  
  Array.from(allTags).sort().forEach(tag => {
    const button = document.createElement('button');
    button.className = `tag-filter ${galleryState.activeTag === tag ? 'active' : ''}`;
    button.textContent = tag;
    button.onclick = () => filterByTag(tag);
    elements.tagFilters.appendChild(button);
  });
}


function filterByTag(tag) {
  galleryState.activeTag = tag;
  applyFilters();
  renderTagFilters();
}


function handleSearch(query) {
  galleryState.currentFilter = query.toLowerCase();
  applyFilters();
}


function applyFilters() {
  galleryState.filteredImages = galleryState.images.filter(image => {
    const matchesSearch = !galleryState.currentFilter || 
      image.title.toLowerCase().includes(galleryState.currentFilter) ||
      image.description.toLowerCase().includes(galleryState.currentFilter);
    
    const matchesTag = !galleryState.activeTag || 
      image.tags.includes(galleryState.activeTag);
    
    return matchesSearch && matchesTag;
  });
  
  renderGallery();
}


function updateStats() {
  elements.totalImages.textContent = galleryState.images.length;
  
  const allTags = new Set();
  galleryState.images.forEach(image => {
    image.tags.forEach(tag => allTags.add(tag));
  });
  elements.totalTags.textContent = allTags.size;
  
  elements.showingCount.textContent = galleryState.filteredImages.length;
}


function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}


function handleFileUpload(files) {
  if (!files || files.length === 0) return;
  
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) {
      showStatus('Only image files are allowed', 'error');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage = {
        id: Date.now() + Math.random(),
        title: file.name.replace(/\.[^/.]+$/, ""),
        description: "Uploaded image",
        tags: ["uploaded"],
        date: new Date().toISOString().split('T')[0],
        url: e.target.result
      };
      
      galleryState.images.unshift(newImage);
      applyFilters();
      renderTagFilters();
      showStatus(`Successfully uploaded ${file.name}`, 'success');
    };
    reader.readAsDataURL(file);
  });
}

function showStatus(message, type) {
  const statusDiv = document.createElement('div');
  statusDiv.className = `status-message ${type}`;
  statusDiv.textContent = message;
  
  elements.uploadStatus.innerHTML = '';
  elements.uploadStatus.appendChild(statusDiv);
  
  setTimeout(() => {
    statusDiv.style.opacity = '0';
    setTimeout(() => statusDiv.remove(), 300);
  }, 3000);
}


function deleteImage(id) {
  if (!confirm('Are you sure you want to delete this image?')) return;
  galleryState.images = galleryState.images.filter(img => img.id !== id);
  applyFilters();
  renderTagFilters();
  showStatus('Image deleted successfully', 'success');
}


function openModal(index) {
  galleryState.modalIndex = index;
  updateModalContent();
  elements.modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  elements.modal.classList.remove('active');
  document.body.style.overflow = '';
}

function updateModalContent() {
  const image = galleryState.filteredImages[galleryState.modalIndex];
  if (!image) return;
  
  elements.modalImage.src = image.url;
  elements.modalImage.alt = image.title;
  elements.modalTitle.textContent = image.title;
  elements.modalDescription.textContent = image.description;
  elements.modalDate.textContent = formatDate(image.date);
  elements.modalCounter.textContent = `${galleryState.modalIndex + 1} / ${galleryState.filteredImages.length}`;
  
  elements.modalTags.innerHTML = image.tags.map(tag => 
    `<span class="tag-badge">${tag}</span>`
  ).join('');
}

function nextImage() {
  galleryState.modalIndex = (galleryState.modalIndex + 1) % galleryState.filteredImages.length;
  updateModalContent();
}

function prevImage() {
  galleryState.modalIndex = (galleryState.modalIndex - 1 + galleryState.filteredImages.length) % galleryState.filteredImages.length;
  updateModalContent();
}

function setupEventListeners() {
  elements.fileInput.addEventListener('change', (e) => {
    handleFileUpload(e.target.files);
    e.target.value = '';
  });

  elements.uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.uploadArea.classList.add('drag-over');
  });

  elements.uploadArea.addEventListener('dragleave', () => {
    elements.uploadArea.classList.remove('drag-over');
  });

  elements.uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.uploadArea.classList.remove('drag-over');
    handleFileUpload(e.dataTransfer.files);
  });

  elements.searchInput.addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });

  elements.modalClose.addEventListener('click', closeModal);
  elements.modalPrev.addEventListener('click', prevImage);
  elements.modalNext.addEventListener('click', nextImage);

  elements.modal.addEventListener('click', (e) => {
    if (e.target === elements.modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!elements.modal.classList.contains('active')) return;

    switch(e.key) {
      case 'Escape':
        closeModal();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
    }
  });
}


document.addEventListener('DOMContentLoaded', initGallery);