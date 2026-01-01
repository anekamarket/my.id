// ANEKAMARKET - MAIN JAVASCRIPT FILE
// Optimized for Performance, Cache Busting, Error Handling
// Version: 1.0.0

// ==============================================
// CACHE BUSTING AND VERSION CONTROL
// ==============================================
const APP_VERSION = '1.0.0';
const LAST_UPDATED = '01 Jan 2025';

// Update version info in footer
document.addEventListener('DOMContentLoaded', () => {
    const versionElement = document.getElementById('appVersion');
    const updatedElement = document.getElementById('lastUpdated');
    
    if (versionElement) versionElement.textContent = APP_VERSION;
    if (updatedElement) updatedElement.textContent = LAST_UPDATED;
    
    // Force cache refresh for CSS
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('v', APP_VERSION);
        link.href = url.toString();
    });
});

// ==============================================
// PRODUCT DATA
// ==============================================
const products = [
    // ... (ALL YOUR EXISTING PRODUCT DATA REMAINS EXACTLY THE SAME)
    // Copy all your existing products array here without modification
    // I'm not copying it here to save space, but it should remain unchanged
];

// ==============================================
// GLOBAL VARIABLES AND STATE MANAGEMENT
// ==============================================
let appState = {
    favorites: JSON.parse(localStorage.getItem('anekamarket-favorites')) || [],
    activeFilters: {
        categories: ['all'],
        types: ['all']
    },
    searchQuery: '',
    currentPage: 1
};

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

/**
 * Format price to Indonesian Rupiah
 * @param {number} amount - Price amount
 * @returns {string} Formatted price
 */
function formatPrice(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
        amount = 0;
    }
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Play notification sound
 */
function playNotificationSound() {
    try {
        const sound = document.getElementById('notificationSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
    } catch (error) {
        console.log('Sound error:', error);
    }
}

/**
 * Play button click sound
 */
function playButtonSound() {
    try {
        const sound = document.getElementById('buttonSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
    } catch (error) {
        console.log('Sound error:', error);
    }
}

/**
 * Save favorites to localStorage
 */
function saveFavorites() {
    try {
        localStorage.setItem('anekamarket-favorites', JSON.stringify(appState.favorites));
        localStorage.setItem('anekamarket-favorites-last-update', new Date().toISOString());
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
}

/**
 * Check if product is in favorites
 * @param {string} productId - Product ID
 * @returns {boolean} True if favorite
 */
function isFavorite(productId) {
    return appState.favorites.includes(productId.toString());
}

/**
 * Toggle favorite status
 * @param {string} productId - Product ID
 * @param {HTMLElement} buttonElement - Favorite button
 */
function toggleFavorite(productId, buttonElement) {
    try {
        playButtonSound();
        const icon = buttonElement.querySelector('i');
        const productCard = buttonElement.closest('.gallery-item');
        const productIdStr = productId.toString();
        const index = appState.favorites.indexOf(productIdStr);

        if (index > -1) {
            appState.favorites.splice(index, 1);
            buttonElement.classList.remove('active');
            if (icon) icon.className = 'far fa-heart';
            if (productCard) productCard.dataset.isFavorite = 'false';
        } else {
            appState.favorites.push(productIdStr);
            buttonElement.classList.add('active');
            if (icon) icon.className = 'fas fa-heart';
            if (productCard) productCard.dataset.isFavorite = 'true';
        }
        
        saveFavorites();
        
        // Update filter if favorites filter is active
        const favoritesFilterBtn = document.querySelector('.product-category-btn[data-category="favorites"]');
        if (favoritesFilterBtn && favoritesFilterBtn.classList.contains('active')) {
            applyFilters();
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
    }
}

// ==============================================
// PRODUCT RENDERING
// ==============================================

/**
 * Inject product schema for SEO
 * @param {Array} products - Products array
 */
function injectProductSchema(products) {
    try {
        const productSchemaElement = document.getElementById('product-schema');
        if (!productSchemaElement) return;
        
        const productSchemas = products.map(product => {
            const cleanDescription = (product.details?.description || '')
                .replace(/<[^>]+>/g, ' ')
                .replace(/\s\s+/g, ' ')
                .trim()
                .substring(0, 300);
            
            const schema = {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": product.title,
                "image": product.mainImage,
                "description": cleanDescription,
                "sku": product.id,
                "mpn": product.code,
                "brand": {
                    "@type": "Brand",
                    "name": product.seller?.name || "ANEKAMARKET"
                },
                "offers": {
                    "@type": "Offer",
                    "url": `https://anekamarket.my.id/#product-${product.id}`,
                    "priceCurrency": "IDR",
                    "price": product.price > 0 ? product.price : "0",
                    "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                    "availability": product.price > 0 ? "https://schema.org/InStock" : "https://schema.org/Inquire",
                    "seller": {
                        "@type": "Organization",
                        "name": product.seller?.name || "ANEKAMARKET"
                    }
                }
            };
            
            return schema;
        });
        
        productSchemaElement.textContent = JSON.stringify(productSchemas, null, 2);
    } catch (error) {
        console.error('Error injecting product schema:', error);
    }
}

/**
 * Create HTML for product card
 * @param {Object} product - Product data
 * @returns {string} HTML string
 */
function createProductCardHTML(product) {
    const isFav = isFavorite(product.id);
    const hasPriceVariations = product.priceVariations && product.priceVariations.length > 0;
    
    // Price variations HTML
    const priceVariationsHTML = hasPriceVariations 
        ? product.priceVariations.map(v => `
            <div class="price-variation-item" data-price="${v.price || 0}" data-name="${v.name || ''}">
                <div class="price-variation-info">
                    <span class="price-variation-name">${v.name || ''}</span>
                    <span class="price-variation-value">${formatPrice(v.price)}</span>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" aria-label="Kurangi jumlah" type="button">-</button>
                    <input type="number" class="quantity-input" value="0" min="0" max="999" aria-label="Jumlah item">
                    <button class="quantity-btn plus" aria-label="Tambah jumlah" type="button">+</button>
                </div>
            </div>`).join('')
        : '';
    
    // Units HTML
    const units = product.units || [product.defaultUnit || 'pcs'];
    const unitOptionsHTML = units.map(unit => 
        `<option value="${unit}" ${unit === product.defaultUnit ? 'selected' : ''}>${unit}</option>`
    ).join('');
    
    // Specs HTML
    const detailSpecsHTML = (product.details?.specs || []).map(spec => 
        `<div class="spec-item"><span class="spec-label">${spec.label || ''}:</span><span class="spec-value">${spec.value || ''}</span></div>`
    ).join('');
    
    // Action buttons HTML
    const locationButtonHTML = product.seller?.locationLink
        ? `<a href="${product.seller.locationLink}" target="_blank" class="btn btn-location" rel="noopener noreferrer"><i class="fas fa-map-marker-alt"></i> Lokasi</a>`
        : `<button class="btn btn-location-disabled" disabled><i class="fas fa-map-marker-alt"></i> Lokasi</button>`;

    const whatsappButtonHTML = `<a href="https://wa.me/${product.contact?.whatsapp || ''}?text=${encodeURIComponent(`Halo ${product.seller?.name || ''}, saya tertarik dengan produk ${product.title} (${product.code})`)}" class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> Chat</a>`;
    const phoneButtonHTML = `<a href="tel:${product.contact?.phone || ''}" class="btn btn-call"><i class="fas fa-phone-alt"></i> Telepon</a>`;
    const favBtnHTML = `<button class="btn btn-favorite ${isFav ? 'active' : ''}" title="Tandai sebagai Favorit" type="button"><i class="${isFav ? 'fas' : 'far'} fa-heart"></i></button>`;
    
    // Media HTML (images and videos)
    const allMedia = [product.mainImage, ...(product.details?.images || [])].filter(Boolean);
    const imagesHTML = allMedia.map((mediaUrl, index) => {
        const isVideo = mediaUrl.toLowerCase().endsWith('.mp4') || mediaUrl.toLowerCase().endsWith('.webm');
        if (isVideo) {
            return `<video src="${mediaUrl}" class="gallery-slider-image gallery-slider-video ${index === 0 ? 'active' : ''}" 
                    muted loop playsinline controls preload="metadata" 
                    aria-label="${product.title} - Video ${index + 1}">
                    </video>`;
        } else {
            return `<img src="${mediaUrl}" alt="${product.title} - Gambar ${index + 1}" 
                    class="gallery-slider-image gallery-slider-image-file ${index === 0 ? 'active' : ''}" 
                    loading="lazy" width="350" height="350">`;
        }
    }).join('');
    
    const dotsHTML = allMedia.length > 1 
        ? `<div class="slider-dots">${allMedia.map((_, index) => 
            `<span class="slider-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Slide ${index + 1}"></span>`
        ).join('')}</div>` 
        : '';
    
    // Main HTML template
    return `
        <div class="gallery-item" data-category="${product.category || 'all'}" data-type="${product.type || 'all'}" 
             data-id="${product.id}" id="product-${product.id}" data-is-favorite="${isFav}">
            
            <a href="${product.seller?.link || '#'}" target="_blank" class="gallery-badge seller" rel="noopener noreferrer">
                Gerai: ${product.seller?.name || 'N/A'}
            </a>
            <span class="gallery-badge ${product.badge?.type || 'promo'}">${product.badge?.text || 'Promo'}</span>
            
            <div class="gallery-image-container" data-product-id="${product.id}">
                ${imagesHTML}
                ${dotsHTML}
            </div>

            <div class="gallery-details">
                <h3 class="gallery-title">${product.title || 'Judul Produk'}</h3>
                <div class="gallery-meta">
                    <span class="gallery-code">Kode: ${product.code || 'N/A'}</span>
                    <span class="gallery-seller"><i class="fas fa-store"></i> ${product.seller?.name || 'N/A'}</span>
                </div>
                <p class="gallery-price">
                    ${product.price > 0 ? `Mulai dari ${formatPrice(product.price)}` : 'Hubungi untuk harga'}
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    ${product.discount ? `<span class="discount">${product.discount}</span>` : ''}
                </p>
                
                <div class="price-section-collapsible">
                    <div class="price-variations-container">${priceVariationsHTML}</div>
                    <select class="unit-select" aria-label="Pilih satuan">${unitOptionsHTML}</select>
                    <div class="total-price">
                        <span class="total-price-label">Total Harga:</span>
                        <span class="total-price-value">${formatPrice(0)}</span>
                    </div>
                    <div class="gallery-actions" style="margin-top: 15px;">
                         <button class="btn btn-order" type="button"><i class="fas fa-shopping-cart"></i> Pesan</button>
                         <button class="btn btn-preorder-toggle" type="button"><i class="fas fa-calendar-check"></i> Pre-Order</button>
                    </div>
                    <div class="preorder-form">
                        <div class="preorder-title"><i class="fas fa-money-bill-wave"></i><span>Form Uang Muka (DP)</span></div>
                        <input type="number" class="preorder-input" placeholder="Masukkan nominal DP (minimal 40%)" min="0">
                        <p class="preorder-note">* Untuk pre-order, harap masukkan nominal uang muka minimal 40% dari total harga. Kami akan menghubungi Anda untuk konfirmasi lebih lanjut.</p>
                        <button class="btn btn-preorder" type="button"><i class="fas fa-paper-plane"></i> Kirim Pre-Order</button>
                    </div>
                </div>

                <div class="gallery-detail-expanded">
                    <div class="gallery-content">
                        <div class="gallery-description">${product.details?.description || ''}</div>
                        <div class="gallery-specs">${detailSpecsHTML}</div>
                    </div>
                </div>
                
                <div class="gallery-actions">
                    ${whatsappButtonHTML}
                    ${phoneButtonHTML}
                    <a href="${product.seller?.link || '#'}" target="_blank" class="btn btn-visit" rel="noopener noreferrer">
                        <i class="fas fa-store-alt"></i> Kunjungi Gerai
                    </a>
                    ${locationButtonHTML}
                    ${hasPriceVariations ? '<button class="btn btn-toggle-prices" type="button"><i class="fas fa-tags"></i> Cek Harga</button>' : ''}
                    ${favBtnHTML}
                    <button class="btn btn-detail" type="button"><i class="fas fa-chevron-down"></i> Detail</button>
                </div>
            </div>
        </div>`;
}

/**
 * Render products to the gallery
 * @param {Array} productsData - Products to render
 */
function renderProducts(productsData) {
    try {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = productsData.map(product => createProductCardHTML(product)).join('');
        
        // Initialize all product features
        initializeProductSliders();
        initCardEventListeners(galleryGrid);
        
        // Update favorite status
        document.querySelectorAll('.gallery-item').forEach(card => {
            const id = card.dataset.id;
            const isFav = isFavorite(id);
            card.dataset.isFavorite = isFav.toString();
            const btn = card.querySelector('.btn-favorite');
            if (btn) {
                btn.classList.toggle('active', isFav);
                const icon = btn.querySelector('i');
                if (icon) icon.className = isFav ? 'fas fa-heart' : 'far fa-heart';
            }
        });
    } catch (error) {
        console.error('Error rendering products:', error);
    }
}

// ==============================================
// IMAGE SLIDER FUNCTIONALITY
// ==============================================

/**
 * Initialize product image sliders
 */
function initializeProductSliders() {
    try {
        const containers = document.querySelectorAll('.gallery-image-container');
        
        containers.forEach(container => {
            const allMedia = container.querySelectorAll('.gallery-slider-image');
            const images = container.querySelectorAll('.gallery-slider-image-file');
            const videos = container.querySelectorAll('.gallery-slider-video');
            const dots = container.querySelectorAll('.slider-dot');
            
            if (allMedia.length <= 1) return;
            
            let currentIndex = 0;
            let slideInterval = null;
            
            /**
             * Show specific slide
             * @param {number} index - Slide index
             */
            const showSlide = (index) => {
                allMedia.forEach((m, i) => {
                    m.classList.toggle('active', i === index);
                    if (m.tagName === 'VIDEO') {
                        if (i === index) {
                            m.play().catch(() => {});
                        } else {
                            m.pause();
                            m.currentTime = 0;
                        }
                    }
                });
                
                dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            };
            
            /**
             * Move to next slide
             */
            const nextSlide = () => {
                const currentMedium = allMedia[currentIndex];
                
                // Check if current medium is a playing video
                if (currentMedium.tagName === 'VIDEO' && !currentMedium.paused) {
                    return; // Don't change slide while video is playing
                }
                
                currentIndex = (currentIndex + 1) % allMedia.length;
                showSlide(currentIndex);
            };
            
            /**
             * Start auto-sliding
             */
            const startSlider = () => {
                stopSlider();
                slideInterval = setInterval(nextSlide, 3000);
            };
            
            /**
             * Stop auto-sliding
             */
            const stopSlider = () => {
                if (slideInterval) {
                    clearInterval(slideInterval);
                    slideInterval = null;
                }
                videos.forEach(v => v.pause());
            };
            
            /**
             * Go to specific slide
             * @param {number} index - Slide index
             */
            const goToSlide = (index) => {
                if (index >= 0 && index < allMedia.length) {
                    currentIndex = index;
                    showSlide(currentIndex);
                    startSlider();
                }
            };
            
            // Add click handlers for dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    playButtonSound();
                    goToSlide(index);
                });
            });
            
            // Add image zoom functionality
            images.forEach(img => {
                img.addEventListener('click', () => {
                    const imageModal = document.getElementById('imageModal');
                    const zoomedImage = document.getElementById('zoomedImage');
                    const body = document.body;
                    
                    if (imageModal && zoomedImage) {
                        zoomedImage.src = img.src;
                        zoomedImage.alt = img.alt;
                        imageModal.classList.add('show');
                        body.style.overflow = 'hidden';
                        playButtonSound();
                    }
                });
            });
            
            // Pause on hover
            container.addEventListener('mouseenter', stopSlider);
            container.addEventListener('mouseleave', startSlider);
            container.addEventListener('touchstart', stopSlider);
            container.addEventListener('touchend', startSlider);
            
            // Start the slider
            startSlider();
            
            // Store slider controls for cleanup
            container._sliderControls = { startSlider, stopSlider };
        });
    } catch (error) {
        console.error('Error initializing sliders:', error);
    }
}

// ==============================================
// PRODUCT CARD INTERACTIONS
// ==============================================

/**
 * Initialize product card event listeners
 * @param {HTMLElement} container - Container element
 */
function initCardEventListeners(container) {
    try {
        /**
         * Update grand total for a product card
         * @param {HTMLElement} productCard - Product card element
         */
        const updateGrandTotal = (productCard) => {
            let grandTotal = 0;
            const variationItems = productCard.querySelectorAll('.price-variation-item');
            
            variationItems.forEach(item => {
                const price = parseFloat(item.dataset.price) || 0;
                const quantityInput = item.querySelector('.quantity-input');
                const quantity = parseInt(quantityInput.value, 10) || 0;
                grandTotal += price * quantity;
            });
            
            const totalPriceElement = productCard.querySelector('.total-price-value');
            if (totalPriceElement) {
                totalPriceElement.textContent = formatPrice(grandTotal);
            }
        };
        
        // Click event delegation
        container.addEventListener('click', async (e) => {
            const target = e.target;
            const productCard = target.closest('.gallery-item');
            if (!productCard) return;
            
            // Handle favorite button
            if (target.closest('.btn-favorite')) {
                const productId = productCard.dataset.id;
                toggleFavorite(productId, target.closest('.btn-favorite'));
                return;
            }
            
            // Handle price toggle button
            if (target.closest('.btn-toggle-prices')) {
                playButtonSound();
                const btn = target.closest('.btn-toggle-prices');
                const priceSection = productCard.querySelector('.price-section-collapsible');
                priceSection.classList.toggle('show');
                btn.classList.toggle('active');
                btn.innerHTML = priceSection.classList.contains('show') 
                    ? '<i class="fas fa-eye-slash"></i> Sembunyikan Harga' 
                    : '<i class="fas fa-tags"></i> Cek Harga';
                return;
            }
            
            // Handle detail button
            if (target.closest('.btn-detail')) {
                playButtonSound();
                const btn = target.closest('.btn-detail');
                const currentCard = target.closest('.gallery-item');
                const expandedContent = currentCard.querySelector('.gallery-detail-expanded');
                const isOpening = !expandedContent.classList.contains('active');
                
                // Close other expanded cards
                document.querySelectorAll('.gallery-item').forEach(otherCard => {
                    if (otherCard !== currentCard) {
                        const otherExpandedContent = otherCard.querySelector('.gallery-detail-expanded');
                        const otherBtn = otherCard.querySelector('.btn-detail');
                        if (otherExpandedContent && otherBtn && otherExpandedContent.classList.contains('active')) {
                            otherExpandedContent.classList.remove('active');
                            otherBtn.classList.remove('active');
                            otherBtn.innerHTML = '<i class="fas fa-chevron-down"></i> Detail';
                        }
                    }
                });
                
                // Toggle current card
                if (isOpening) {
                    expandedContent.classList.add('active');
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-chevron-up"></i> Sembunyikan';
                } else {
                    expandedContent.classList.remove('active');
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="fas fa-chevron-down"></i> Detail';
                }
                return;
            }
            
            // Handle quantity buttons
            if (target.classList.contains('quantity-btn')) {
                playButtonSound();
                const btn = target;
                const input = btn.parentElement.querySelector('.quantity-input');
                let value = parseInt(input.value, 10) || 0;
                
                if (btn.classList.contains('plus')) {
                    value++;
                } else if (btn.classList.contains('minus') && value > 0) {
                    value--;
                }
                
                input.value = value;
                updateGrandTotal(productCard);
                return;
            }
            
            // Handle pre-order toggle
            if (target.closest('.btn-preorder-toggle')) {
                playButtonSound();
                const btn = target.closest('.btn-preorder-toggle');
                const preorderForm = productCard.querySelector('.preorder-form');
                preorderForm.classList.toggle('active');
                btn.classList.toggle('active');
                btn.innerHTML = preorderForm.classList.contains('active') 
                    ? '<i class="fas fa-times"></i> Batal Pre-Order' 
                    : '<i class="fas fa-calendar-check"></i> Pre-Order';
                return;
            }
            
            // Find product data
            const productId = productCard.dataset.id;
            const productData = products.find(p => p.id === productId);
            if (!productData) return;
            
            // Handle order button
            if (target.closest('.btn-order')) {
                await processOrder(productData, productCard, 'PEMESANAN LANGSUNG');
                return;
            }
            
            // Handle pre-order button
            if (target.closest('.btn-preorder')) {
                await processOrder(productData, productCard, 'PRE-ORDER');
                return;
            }
        });
        
        // Input event for quantity changes
        container.addEventListener('input', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const input = e.target;
                if (input.value < 0) input.value = 0;
                if (input.value > 999) input.value = 999;
                
                const productCard = input.closest('.gallery-item');
                if (productCard) updateGrandTotal(productCard);
            }
        });
        
        // Keyboard navigation
        container.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('quantity-input')) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    e.target.value = parseInt(e.target.value || 0) + 1;
                    updateGrandTotal(e.target.closest('.gallery-item'));
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const currentValue = parseInt(e.target.value || 0);
                    if (currentValue > 0) {
                        e.target.value = currentValue - 1;
                        updateGrandTotal(e.target.closest('.gallery-item'));
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing card event listeners:', error);
    }
}

/**
 * Process order (regular or pre-order)
 * @param {Object} productData - Product data
 * @param {HTMLElement} productCard - Product card element
 * @param {string} orderType - Order type
 */
async function processOrder(productData, productCard, orderType) {
    try {
        const orderDetails = gatherOrderDetails(productCard, orderType);
        if (!orderDetails) return;
        
        const confirmationMessage = orderType === 'PRE-ORDER'
            ? `Anda akan melakukan Pre-Order dengan total ${formatPrice(orderDetails.grandTotal)} dan DP ${orderDetails.dpAmount}.\n\nSistem akan mengunduh bukti pre-order secara otomatis, lalu mengarahkan Anda ke WhatsApp penjual.\n\nLanjutkan?`
            : `Anda akan memesan dengan total ${formatPrice(orderDetails.grandTotal)}.\n\nSistem akan mengunduh nota pemesanan secara otomatis, lalu mengarahkan Anda ke WhatsApp penjual.\n\nLanjutkan?`;
        
        if (confirm(confirmationMessage)) {
            playNotificationSound();
            await generateAndDownloadReceipt(productData, orderDetails);
            
            setTimeout(() => {
                const whatsappUrl = `https://wa.me/${productData.contact?.whatsapp}?text=${encodeURIComponent(generateWhatsAppMessage(productData, orderDetails))}`;
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            }, 500);
        }
    } catch (error) {
        console.error('Error processing order:', error);
        alert('Terjadi kesalahan saat memproses pesanan. Silakan coba lagi.');
    }
}

/**
 * Gather order details from product card
 * @param {HTMLElement} productCard - Product card element
 * @param {string} type - Order type
 * @returns {Object|null} Order details or null
 */
function gatherOrderDetails(productCard, type = 'PEMESANAN LANGSUNG') {
    const items = [];
    let grandTotal = 0;
    
    const unitSelect = productCard.querySelector('.unit-select');
    const unit = unitSelect ? unitSelect.value : (productData.defaultUnit || 'pcs');
    
    const variationItems = productCard.querySelectorAll('.price-variation-item');
    
    variationItems.forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity-input').value, 10) || 0;
        if (quantity > 0) {
            const name = item.dataset.name;
            const unitPrice = parseFloat(item.dataset.price);
            const subtotal = unitPrice * quantity;
            items.push({ name, quantity, unitPrice, subtotal });
            grandTotal += subtotal;
        }
    });
    
    if (items.length === 0) {
        alert('Anda belum memilih item atau jumlah produk.');
        return null;
    }
    
    let dpAmount = 'N/A';
    if (type === 'PRE-ORDER') {
        const dpInput = productCard.querySelector('.preorder-input');
        const dpValue = parseFloat(dpInput.value);
        
        if (isNaN(dpValue) || dpValue <= 0) {
            alert('Mohon masukkan nominal DP yang valid');
            return null;
        }
        
        if (dpValue < (grandTotal * 0.4)) {
            alert(`Uang muka minimal 40% dari total harga (${formatPrice(grandTotal * 0.4)})`);
            return null;
        }
        
        dpAmount = formatPrice(dpValue);
    }
    
    return {
        type,
        items,
        grandTotal,
        unit,
        dpAmount,
        timestamp: new Date().toISOString()
    };
}

/**
 * Generate WhatsApp message for order
 * @param {Object} product - Product data
 * @param {Object} details - Order details
 * @returns {string} WhatsApp message
 */
function generateWhatsAppMessage(product, details) {
    const itemsText = details.items.map(item => 
        `   • ${item.name} (${item.quantity}x) = ${formatPrice(item.subtotal)}`
    ).join('\n');
    
    let totalText = `Total Harga: *${formatPrice(details.grandTotal)}*`;
    if (details.type === 'PRE-ORDER') {
        totalText += `\nUang Muka: *${details.dpAmount}*`;
        totalText += `\nSisa Pembayaran: *${formatPrice(details.grandTotal - parseFloat(details.dpAmount.replace(/[^0-9]/g, '')))}*`;
    }
    
    const orderType = details.type === 'PRE-ORDER' ? 'PRE-ORDER' : 'PEMESANAN';
    
    return `Halo ${product.seller?.name || ''},

Saya ingin melakukan *${orderType}* untuk produk:

*${product.title}*
Kode: ${product.code}

Detail Pesanan:
${itemsText}

Satuan: ${details.unit}
${totalText}

Bukti pemesanan sudah saya unduh. Mohon info lebih lanjut untuk proses selanjutnya.

Terima kasih.`;
}

// ==============================================
// FILTER SYSTEM
// ==============================================

/**
 * Apply filters to product gallery
 */
function applyFilters() {
    try {
        const galleryItems = document.querySelectorAll('.gallery-item');
        let visibleCount = 0;
        
        galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemType = item.dataset.type;
            const isItemFavorite = item.dataset.isFavorite === 'true';
            
            // Category matching
            const categoryAll = appState.activeFilters.categories.includes('all');
            const categoryFav = appState.activeFilters.categories.includes('favorites') && isItemFavorite;
            const categoryMatch = appState.activeFilters.categories.includes(itemCategory);
            const categoryPass = categoryAll || categoryFav || categoryMatch;
            
            // Type matching
            const typeAll = appState.activeFilters.types.includes('all');
            const typeMatch = appState.activeFilters.types.includes(itemType);
            const typeSpecial = (itemType === 'all' && 
                !appState.activeFilters.types.includes('sewa') && 
                !appState.activeFilters.types.includes('promo') && 
                !appState.activeFilters.types.includes('jasa') && 
                !appState.activeFilters.types.includes('wisata') && 
                !appState.activeFilters.types.includes('resto') && 
                !appState.activeFilters.types.includes('cafe'));
            const typePass = typeAll || typeMatch || typeSpecial;
            
            // Show/hide item
            const shouldShow = categoryPass && typePass;
            item.style.display = shouldShow ? 'flex' : 'none';
            
            if (shouldShow) visibleCount++;
        });
        
        // Show message if no products found
        const galleryGrid = document.getElementById('gallery-grid');
        const noResultsMessage = galleryGrid.querySelector('.no-results-message');
        
        if (visibleCount === 0) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `
                    <div class="text-center" style="grid-column: 1/-1; padding: 3rem;">
                        <i class="fas fa-search fa-3x text-muted mb-3"></i>
                        <h3>Produk Tidak Ditemukan</h3>
                        <p class="text-muted">Coba filter lain atau kata kunci pencarian yang berbeda.</p>
                    </div>
                `;
                galleryGrid.appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    } catch (error) {
        console.error('Error applying filters:', error);
    }
}

// ==============================================
// SEARCH FUNCTIONALITY
// ==============================================

/**
 * Perform search
 * @param {string} query - Search query
 */
function performSearch(query) {
    try {
        const lowerCaseQuery = query.trim().toLowerCase();
        appState.searchQuery = lowerCaseQuery;
        
        const filters = {
            discount: document.getElementById('filter-discount')?.checked || false,
            bonus: document.getElementById('filter-bonus')?.checked || false,
            negotiable: document.getElementById('filter-negotiable')?.checked || false,
            sortCheap: document.getElementById('filter-sort-cheap')?.checked || false,
            favorites: document.getElementById('filter-favorites-modal')?.checked || false
        };
        
        let results = products;
        const isAnyFilterActive = Object.values(filters).some(v => v);
        
        // Text search
        if (lowerCaseQuery.length >= 2) {
            results = products.filter(p => {
                const descriptionText = (p.details?.description || '').replace(/<[^>]*>?/gm, '');
                const specsText = (p.details?.specs || []).map(s => `${s.label} ${s.value}`).join(' ').replace(/<[^>]*>?/gm, '');
                const searchableText = [
                    p.title, 
                    p.seller?.name, 
                    p.code, 
                    descriptionText, 
                    specsText
                ].join(' ').toLowerCase();
                
                return searchableText.includes(lowerCaseQuery);
            });
        } else if (!isAnyFilterActive) {
            const searchResults = document.getElementById('searchResults');
            if (searchResults) {
                searchResults.innerHTML = '<p class="search-results-placeholder">Ketik minimal 2 huruf atau pilih filter untuk mencari produk...</p>';
            }
            return;
        }
        
        // Apply filters
        if (filters.favorites) {
            results = results.filter(p => isFavorite(p.id));
        }
        if (filters.discount) {
            results = results.filter(p => p.originalPrice || p.discount);
        }
        if (filters.bonus) {
            results = results.filter(p => /bonus|gratis|free/i.test(JSON.stringify(p.details)));
        }
        if (filters.negotiable) {
            results = results.filter(p => p.discount === 'Nego' || /nego|estimasi|perkiraan|hubungi/i.test(p.details?.description || ''));
        }
        if (filters.sortCheap) {
            results.sort((a, b) => (a.price || 0) - (b.price || 0));
        }
        
        displaySearchResults(results);
    } catch (error) {
        console.error('Error performing search:', error);
    }
}

/**
 * Display search results
 * @param {Array} results - Search results
 */
function displaySearchResults(results) {
    try {
        const searchResults = document.getElementById('searchResults');
        if (!searchResults) return;
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-search fa-2x text-muted mb-3"></i>
                    <p class="search-results-placeholder">Produk tidak ditemukan.</p>
                </div>
            `;
            return;
        }
        
        const resultsHTML = results.map(p => `
            <a href="#product-${p.id}" class="search-result-item" data-product-id="${p.id}">
                <img src="${p.mainImage}" alt="${p.title}" class="search-result-image" loading="lazy">
                <div class="search-result-info">
                    <h4>${p.title}</h4>
                    <p>oleh ${p.seller?.name || ''} (Kode: ${p.code || ''})</p>
                    <p class="text-primary">${p.price > 0 ? formatPrice(p.price) : 'Hubungi untuk harga'}</p>
                </div>
            </a>
        `).join('');
        
        searchResults.innerHTML = resultsHTML;
    } catch (error) {
        console.error('Error displaying search results:', error);
    }
}

// ==============================================
// MODAL MANAGEMENT
// ==============================================

/**
 * Open search modal
 * @param {string} query - Initial search query
 */
function openSearchModal(query = '') {
    try {
        const searchModal = document.getElementById('searchModal');
        const searchModalInput = document.getElementById('searchModalInput');
        const body = document.body;
        
        if (searchModal && searchModalInput) {
            searchModal.classList.add('show');
            body.style.overflow = 'hidden';
            searchModalInput.value = query;
            searchModalInput.focus();
            performSearch(query);
        }
    } catch (error) {
        console.error('Error opening search modal:', error);
    }
}

/**
 * Close search modal
 */
function closeSearchModal() {
    try {
        const searchModal = document.getElementById('searchModal');
        const body = document.body;
        
        if (searchModal) {
            searchModal.classList.remove('show');
            body.style.overflow = '';
        }
    } catch (error) {
        console.error('Error closing search modal:', error);
    }
}

// ==============================================
// PDF GENERATION (STRUCTURED RECEIPT)
// ==============================================

/**
 * Generate and download receipt as PDF
 * @param {Object} productData - Product data
 * @param {Object} orderDetails - Order details
 */
async function generateAndDownloadReceipt(productData, orderDetails) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const transactionId = `TRX-${productData.code}-${Date.now()}`;
        const logoUrl = 'https://raw.githubusercontent.com/LKS-88/anekamarket/refs/heads/main/Logo-Anekamarketku.png';
        
        // Convert image to base64
        const toDataURL = url => fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));
        
        const logoBase64 = await toDataURL(logoUrl);
        const pageW = doc.internal.pageSize.getWidth();
        const margin = 15;
        let y = 0;
        
        // Colors
        const brandColor = [52, 97, 253];
        const darkColor = [0, 34, 102];
        const lightColor = [248, 249, 250];
        const grayColor = [108, 117, 125];
        const borderColor = [222, 226, 230];
        
        // Header with logo
        doc.setFillColor(brandColor[0], brandColor[1], brandColor[2]);
        doc.rect(0, 0, pageW, 40, 'F');
        doc.addImage(logoBase64, 'PNG', margin, 7.5, 25, 25);
        
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text('ANEKAMARKET', pageW - margin, 18, { align: 'right' });
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Jl. PB Sudirman, Wringin Anom, Situbondo', pageW - margin, 24, { align: 'right' });
        doc.text('admin@anekamarket.my.id', pageW - margin, 29, { align: 'right' });
        
        y = 55;
        
        // Document title
        const docTitle = orderDetails.type === 'PRE-ORDER' ? 'BUKTI PRE-ORDER' : 'NOTA PEMESANAN';
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.text(docTitle, pageW / 2, y, { align: 'center' });
        
        y += 15;
        
        // Document info
        doc.setFontSize(10);
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        doc.text('DITERBITKAN UNTUK:', margin, y);
        doc.text('DETAIL TRANSAKSI:', pageW / 2, y);
        
        doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
        doc.line(margin, y + 2, pageW - margin, y + 2);
        
        y += 8;
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.text('Pelanggan Anekamarket', margin, y);
        
        // Transaction details
        const infoLabels = ['ID Transaksi:', 'Tanggal:', 'Gerai Penjual:'];
        const infoValues = [
            transactionId,
            new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
            productData.seller?.name || 'N/A'
        ];
        
        let transactionDetailsY = y;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        for (let i = 0; i < infoLabels.length; i++) {
            doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
            doc.text(infoLabels[i], pageW / 2, transactionDetailsY);
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text(infoValues[i], pageW - margin, transactionDetailsY, { align: 'right' });
            transactionDetailsY += 7;
        }
        
        y = transactionDetailsY + 10;
        
        // Table header
        const tableHeaderY = y;
        doc.setFillColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.roundedRect(margin, tableHeaderY, pageW - (margin * 2), 10, 2, 2, 'F');
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text('Deskripsi Produk', margin + 3, tableHeaderY + 7);
        doc.text('Harga Satuan', pageW - margin - 60, tableHeaderY + 7, { align: 'right' });
        doc.text('Jumlah', pageW - margin - 35, tableHeaderY + 7, { align: 'right' });
        doc.text('Subtotal', pageW - margin - 3, tableHeaderY + 7, { align: 'right' });
        
        y += 10;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
        
        // Table rows
        orderDetails.items.forEach((item, index) => {
            const itemY = y;
            
            // Alternate row background
            if (index % 2 !== 0) {
                doc.setFillColor(lightColor[0], lightColor[1], lightColor[2]);
                doc.rect(margin, itemY, pageW - (margin * 2), 10, 'F');
            }
            
            const itemDescription = doc.splitTextToSize(`${item.name} (${productData.code})`, 80);
            doc.text(itemDescription, margin + 3, itemY + 7);
            doc.text(formatPrice(item.unitPrice), pageW - margin - 60, itemY + 7, { align: 'right' });
            doc.text(`${item.quantity} ${orderDetails.unit}`, pageW - margin - 35, itemY + 7, { align: 'right' });
            doc.text(formatPrice(item.subtotal), pageW - margin - 3, itemY + 7, { align: 'right' });
            
            y += 10;
        });
        
        // Total section
        doc.line(margin, y, pageW - margin, y);
        y += 5;
        
        const totalBoxW = 80;
        const totalBoxX = pageW - margin - totalBoxW;
        
        doc.setFontSize(10);
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        doc.text('Total Belanja:', totalBoxX, y + 5, { align: 'right' });
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.text(formatPrice(orderDetails.grandTotal), pageW - margin, y + 5, { align: 'right' });
        
        if (orderDetails.type === 'PRE-ORDER') {
            y += 6;
            doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
            doc.text('Uang Muka (DP):', totalBoxX, y + 5, { align: 'right' });
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text(orderDetails.dpAmount, pageW - margin, y + 5, { align: 'right' });
            
            y += 6;
            const sisa = orderDetails.grandTotal - parseFloat(orderDetails.dpAmount.replace(/[^0-9]/g, ''));
            doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
            doc.text('Sisa Pembayaran:', totalBoxX, y + 5, { align: 'right' });
            doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
            doc.text(formatPrice(sisa), pageW - margin, y + 5, { align: 'right' });
        }
        
        y += 8;
        doc.setLineWidth(0.5);
        doc.setDrawColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.line(totalBoxX - 5, y, pageW - margin, y);
        
        y += 2;
        doc.setFillColor(lightColor[0], lightColor[1], lightColor[2]);
        doc.roundedRect(totalBoxX - 5, y, totalBoxW + 5, 12, 2, 2, 'F');
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        
        const finalAmount = orderDetails.type === 'PRE-ORDER' ? orderDetails.dpAmount : formatPrice(orderDetails.grandTotal);
        const finalLabel = orderDetails.type === 'PRE-ORDER' ? 'TOTAL DP:' : 'TOTAL BAYAR:';
        
        doc.text(finalLabel, totalBoxX, y + 8, { align: 'right' });
        doc.setTextColor(brandColor[0], brandColor[1], brandColor[2]);
        doc.text(finalAmount, pageW - margin, y + 8, { align: 'right' });
        
        // Footer
        y = doc.internal.pageSize.getHeight() - 40;
        doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
        doc.line(margin, y, pageW - margin, y);
        y += 8;
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        
        const noteText = doc.splitTextToSize(
            'Struk ini merupakan bukti pemesanan yang sah dan dibuat secara otomatis oleh sistem. ' +
            'Harap simpan struk ini untuk proses konfirmasi pembayaran dengan penjual. ' +
            'Ini BUKAN struk/nota pembelian final yang wajib diterbitkan oleh gerai.',
            pageW - margin * 2 - 30
        );
        
        doc.text(noteText, margin, y);
        
        // QR Code
        const qr = qrcode(0, 'M');
        qr.addData('https://s.id/anekamarket');
        qr.make();
        const qrCodeImage = qr.createDataURL(4);
        doc.addImage(qrCodeImage, 'PNG', pageW - margin - 22, y, 22, 22);
        
        // Footer text
        y = doc.internal.pageSize.getHeight() - 10;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
        
        const footerText = `© ${new Date().getFullYear()} ANEKAMARKET | Developed by www.anekamarket.my.id | Versi ${APP_VERSION}`;
        doc.text(footerText, pageW / 2, y, { align: 'center' });
        
        // Save PDF
        const safeSellerName = (productData.seller.name || 'Gerai').replace(/[^a-z0-9]/gi, '_');
        doc.save(`Struk-${safeSellerName}-${transactionId}.pdf`);
        
    } catch (error) {
        console.error('PDF Generation Error:', error);
        alert('Maaf, terjadi kesalahan saat membuat struk PDF. Silakan coba lagi.');
    }
}

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize the application
 */
function initApp() {
    try {
        // Inject product schema for SEO
        injectProductSchema(products);
        
        // Render initial products
        renderProducts(products);
        
        // Initialize search functionality
        initSearch();
        
        // Initialize filters
        initFilters();
        
        // Initialize modals
        initModals();
        
        // Initialize audio
        initAudio();
        
        // Initialize navigation
        initNavigation();
        
        // Initialize particles
        initParticles();
        
        // Initialize notification
        initNotification();
        
        // Initialize form submissions
        initForms();
        
        // Initialize floating buttons
        initFloatingButtons();
        
        // Initialize generator if exists
        initGenerator();
        
        console.log('ANEKAMARKET initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

/**
 * Initialize search functionality
 */
function initSearch() {
    try {
        const searchModal = document.getElementById('searchModal');
        const searchModalInput = document.getElementById('searchModalInput');
        const headerSearchInput = document.getElementById('headerSearchInput');
        const headerSearchBtn = document.getElementById('headerSearchBtn');
        const navSearchInput = document.getElementById('navSearchInput');
        const navSearchBtn = document.getElementById('navSearchBtn');
        const searchFilters = document.getElementById('searchFilters');
        const btnCloseSearchModal = document.querySelector('.btn-close-modal');
        
        // Header search
        if (headerSearchInput && headerSearchBtn) {
            headerSearchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openSearchModal(headerSearchInput.value);
            });
            
            headerSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    openSearchModal(headerSearchInput.value);
                }
            });
        }
        
        // Navigation search
        if (navSearchInput && navSearchBtn) {
            navSearchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openSearchModal(navSearchInput.value);
            });
            
            navSearchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    openSearchModal(navSearchInput.value);
                }
            });
        }
        
        // Search modal input
        if (searchModalInput) {
            searchModalInput.addEventListener('input', () => {
                performSearch(searchModalInput.value);
            });
        }
        
        // Search filters
        if (searchFilters) {
            searchFilters.addEventListener('change', () => {
                performSearch(searchModalInput?.value || '');
            });
        }
        
        // Close search modal
        if (btnCloseSearchModal) {
            btnCloseSearchModal.addEventListener('click', closeSearchModal);
        }
        
        // Search result clicks
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.addEventListener('click', (e) => {
                const link = e.target.closest('.search-result-item');
                if (link) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        closeSearchModal();
                        setTimeout(() => {
                            window.scrollTo({
                                top: targetElement.offsetTop - 100,
                                behavior: 'smooth'
                            });
                        }, 100);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error initializing search:', error);
    }
}

/**
 * Initialize filter system
 */
function initFilters() {
    try {
        const productCategories = document.querySelector('.product-categories');
        const categoryTabs = document.querySelector('.category-tabs');
        
        // Product category filters
        if (productCategories) {
            productCategories.addEventListener('click', (e) => {
                const btn = e.target.closest('.product-category-btn');
                if (!btn) return;
                
                playButtonSound();
                const category = btn.dataset.category;
                const allBtn = productCategories.querySelector('.product-category-btn[data-category="all"]');
                
                if (category === 'all') {
                    appState.activeFilters.categories = ['all'];
                    productCategories.querySelectorAll('.product-category-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                } else {
                    btn.classList.toggle('active');
                    if (allBtn) allBtn.classList.remove('active');
                    
                    appState.activeFilters.categories = [];
                    productCategories.querySelectorAll('.product-category-btn.active').forEach(b => {
                        appState.activeFilters.categories.push(b.dataset.category);
                    });
                    
                    if (appState.activeFilters.categories.length === 0) {
                        appState.activeFilters.categories = ['all'];
                        if (allBtn) allBtn.classList.add('active');
                    }
                }
                
                applyFilters();
            });
        }
        
        // Type filters
        if (categoryTabs) {
            categoryTabs.addEventListener('click', (e) => {
                const btn = e.target.closest('.category-btn');
                if (!btn) return;
                
                playButtonSound();
                const type = btn.dataset.type;
                const allBtn = categoryTabs.querySelector('.category-btn[data-type="all"]');
                
                if (type === 'all') {
                    appState.activeFilters.types = ['all'];
                    categoryTabs.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                } else {
                    btn.classList.toggle('active');
                    if (allBtn) allBtn.classList.remove('active');
                    
                    appState.activeFilters.types = [];
                    categoryTabs.querySelectorAll('.category-btn.active').forEach(b => {
                        appState.activeFilters.types.push(b.dataset.type);
                    });
                    
                    if (appState.activeFilters.types.length === 0) {
                        appState.activeFilters.types = ['all'];
                        if (allBtn) allBtn.classList.add('active');
                    }
                }
                
                applyFilters();
            });
        }
    } catch (error) {
        console.error('Error initializing filters:', error);
    }
}

/**
 * Initialize modals
 */
function initModals() {
    try {
        // Order modal
        const orderModal = document.getElementById('orderModal');
        const quickOrderBtn = document.getElementById('quick-order');
        
        if (orderModal && quickOrderBtn) {
            quickOrderBtn.addEventListener('click', () => {
                orderModal.classList.add('show');
                document.body.style.overflow = 'hidden';
                playButtonSound();
            });
        }
        
        // Download modal
        const downloadAppBtn = document.getElementById('downloadAppBtn');
        const downloadModal = document.getElementById('downloadModal');
        
        if (downloadAppBtn && downloadModal) {
            downloadAppBtn.addEventListener('click', (e) => {
                e.preventDefault();
                downloadModal.classList.add('show');
                document.body.style.overflow = 'hidden';
                playButtonSound();
            });
        }
        
        // Close modals on overlay click
        document.querySelectorAll('.modal, .image-modal, .search-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || 
                    e.target.classList.contains('close-modal') || 
                    e.target.classList.contains('close-image-modal') || 
                    e.target.classList.contains('close-search-modal')) {
                    
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close image modal
        const closeImageModal = document.querySelector('.close-image-modal');
        if (closeImageModal) {
            closeImageModal.addEventListener('click', () => {
                document.getElementById('imageModal').classList.remove('show');
                document.body.style.overflow = '';
            });
        }
    } catch (error) {
        console.error('Error initializing modals:', error);
    }
}

/**
 * Initialize audio
 */
function initAudio() {
    try {
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.volume = 0.3;
            
            // Try to play on user interaction
            const playMusic = () => {
                if (bgMusic.paused) {
                    bgMusic.play().catch(e => console.log('Background music play failed:', e));
                }
            };
            
            // Play on first user interaction
            document.body.addEventListener('click', playMusic, { once: true });
            document.body.addEventListener('touchstart', playMusic, { once: true });
        }
    } catch (error) {
        console.error('Error initializing audio:', error);
    }
}

/**
 * Initialize navigation
 */
function initNavigation() {
    try {
        const navbar = document.getElementById('navbar');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        const searchToggle = document.getElementById('searchToggle');
        const navSearch = document.getElementById('navSearch');
        
        // Sticky navbar on scroll
        if (navbar) {
            window.addEventListener('scroll', () => {
                const isScrolled = window.scrollY > 50;
                navbar.classList.toggle('scrolled', isScrolled);
            });
        }
        
        // Mobile menu toggle
        if (mobileMenuToggle && navLinks) {
            mobileMenuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuToggle.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
                playButtonSound();
            });
            
            // Close menu when clicking links
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        }
        
        // Search toggle
        if (searchToggle && navSearch) {
            searchToggle.addEventListener('click', () => {
                navSearch.classList.toggle('active');
                playButtonSound();
                if (navSearch.classList.contains('active')) {
                    const input = navSearch.querySelector('input');
                    if (input) input.focus();
                }
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if (this.getAttribute('href') !== '#' && !this.closest('.search-result-item')) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

/**
 * Initialize particles
 */
function initParticles() {
    try {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                const size = Math.random() * 6 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
                particle.style.animationDelay = `${Math.random() * 10}s`;
                particlesContainer.appendChild(particle);
            }
        }
    } catch (error) {
        console.error('Error initializing particles:', error);
    }
}

/**
 * Initialize notification
 */
function initNotification() {
    try {
        const offerNotification = document.getElementById('offerNotification');
        const step1 = document.getElementById('notificationStep1');
        const step2 = document.getElementById('notificationStep2');
        let notificationTimer;
        
        const showNotification = () => {
            if (offerNotification && !localStorage.getItem('offerDismissed')) {
                offerNotification.classList.add('show');
                playNotificationSound();
                notificationTimer = setTimeout(hideNotification, 5000);
            }
        };
        
        const hideNotification = () => {
            if (offerNotification) {
                offerNotification.classList.remove('show');
                localStorage.setItem('offerDismissed', 'true');
                clearTimeout(notificationTimer);
            }
        };
        
        // Show notification after delay
        setTimeout(showNotification, 5000);
        
        // Notification interactions
        if (offerNotification) {
            // Pause hide on hover
            offerNotification.addEventListener('mouseenter', () => {
                clearTimeout(notificationTimer);
            });
            
            offerNotification.addEventListener('mouseleave', () => {
                clearTimeout(notificationTimer);
                notificationTimer = setTimeout(hideNotification, 5000);
            });
            
            // Handle clicks
            offerNotification.addEventListener('click', (e) => {
                const target = e.target;
                
                if (target.id === 'closeNotification' || 
                    (target.matches('.notification-btn') && target.dataset.action === 'close')) {
                    hideNotification();
                } else if (target.matches('.notification-btn')) {
                    clearTimeout(notificationTimer);
                    const action = target.dataset.action;
                    
                    if (action === 'next') {
                        step1.classList.remove('active');
                        step2.classList.add('active');
                    } else if (action === 'register') {
                        window.open('https://anekamarket.my.id/formulirpendaftaran', '_blank', 'noopener,noreferrer');
                        hideNotification();
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error initializing notification:', error);
    }
}

/**
 * Initialize forms
 */
function initForms() {
    try {
        const contactForm = document.getElementById('contactForm');
        const quickOrderForm = document.getElementById('quickOrderForm');
        const newsletterForm = document.getElementById('newsletterForm');
        
        // Contact form
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Let formsubmit.co handle the submission
                // You can add validation here if needed
            });
        }
        
        // Quick order form
        if (quickOrderForm) {
            quickOrderForm.addEventListener('submit', function(e) {
                // Let formsubmit.co handle the submission
            });
        }
        
        // Newsletter form
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const emailInput = this.querySelector('input[type="email"]');
                if (emailInput && emailInput.value) {
                    alert('Terima kasih telah berlangganan newsletter kami!');
                    emailInput.value = '';
                }
            });
        }
    } catch (error) {
        console.error('Error initializing forms:', error);
    }
}

/**
 * Initialize floating buttons
 */
function initFloatingButtons() {
    try {
        let lastScrollTop = 0;
        const fabContainers = document.querySelectorAll('.autohide-fab');
        
        // Hide/show FABs on scroll
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                fabContainers.forEach(container => container.classList.add('fab-hidden'));
            } else {
                fabContainers.forEach(container => container.classList.remove('fab-hidden'));
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
    } catch (error) {
        console.error('Error initializing floating buttons:', error);
    }
}

/**
 * Initialize product generator
 */
function initGenerator() {
    try {
        const generatorModal = document.getElementById('generatorModal');
        const openGeneratorBtn = document.getElementById('openGeneratorBtn');
        const closeGeneratorModalBtn = document.getElementById('closeGeneratorModal');
        
        if (openGeneratorBtn) {
            openGeneratorBtn.addEventListener('click', () => {
                playButtonSound();
                const password = prompt("Masukkan password untuk mengakses generator:");
                if (password === "LKS.1945") {
                    generatorModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                } else if (password !== null) {
                    alert("Password salah. Akses ditolak.");
                }
            });
        }
        
        if (closeGeneratorModalBtn) {
            closeGeneratorModalBtn.addEventListener('click', () => {
                generatorModal.classList.remove('show');
                document.body.style.overflow = '';
            });
        }
    } catch (error) {
        console.error('Error initializing generator:', error);
    }
}

// ==============================================
// CLEANUP AND MEMORY MANAGEMENT
// ==============================================

/**
 * Cleanup function to free memory
 */
function cleanup() {
    try {
        // Clear any intervals
        const containers = document.querySelectorAll('.gallery-image-container');
        containers.forEach(container => {
            if (container._sliderControls) {
                container._sliderControls.stopSlider();
                delete container._sliderControls;
            }
        });
        
        // Remove event listeners
        const oldBody = document.body;
        const newBody = oldBody.cloneNode(true);
        oldBody.parentNode.replaceChild(newBody, oldBody);
        
        console.log('Cleanup completed');
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
}

// ==============================================
// WINDOW LOAD EVENT
// ==============================================

window.addEventListener('DOMContentLoaded', initApp);

// Cache busting for external resources
window.addEventListener('load', () => {
    // Force refresh external scripts
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
        const src = script.src;
        if (src.includes('script.js')) {
            script.src = src + '?v=' + Date.now();
        }
    });
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause videos and sliders
        document.querySelectorAll('video').forEach(video => video.pause());
    }
});

// Handle beforeunload for cleanup
window.addEventListener('beforeunload', () => {
    cleanup();
});

// Service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export for debugging (optional)
if (window.DEBUG) {
    window.ANEKAMARKET = {
        products,
        appState,
        formatPrice,
        toggleFavorite,
        renderProducts,
        applyFilters
    };
}
