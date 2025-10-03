document.addEventListener('DOMContentLoaded', () => {
    // --- RENDER PRODUCTS ---
    const galleryGrid = document.getElementById('gallery-grid');

    function formatPrice(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount).replace(/\s?IDR/g, 'Rp ');
    }
    
    function renderProducts() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = ''; // Clear existing products
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'gallery-item';
            productCard.setAttribute('data-category', product.category);
            productCard.setAttribute('data-type', product.type);
            productCard.setAttribute('data-id', product.id);

            const priceVariationsHTML = product.priceVariations.map((v, index) => `
                <div class="price-variation ${index === 0 ? 'active' : ''}" data-price="${v.price}">
                    <span class="price-variation-name">${v.name}</span>
                    <span class="price-variation-value">${formatPrice(v.price)}</span>
                </div>
            `).join('');

            const unitOptionsHTML = product.units.map(unit => `
                <option value="${unit}" ${unit === product.defaultUnit ? 'selected' : ''}>${unit}</option>
            `).join('');

            const detailImagesHTML = product.details.images.map((img, index) => `
                <img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail lazy" loading="lazy">
            `).join('');

            const detailSpecsHTML = product.details.specs.map(spec => `
                <div class="spec-item">
                    <span class="spec-label">${spec.label}:</span>
                    <span class="spec-value">${spec.value}</span>
                </div>
            `).join('');

            productCard.innerHTML = `
                <a href="${product.seller.link}" target="_blank" class="gallery-badge seller">Gerai: ${product.seller.name}</a>
                <span class="gallery-badge ${product.badge.type}">${product.badge.text}</span>
                <div class="gallery-image-container">
                    <img src="${product.mainImage}" alt="${product.title}" class="gallery-image lazy" loading="lazy">
                </div>
                <div class="gallery-details">
                    <h3 class="gallery-title">${product.title}</h3>
                    <div class="gallery-meta">
                        <span class="gallery-code">Kode: ${product.code}</span>
                        <span class="gallery-seller"><i class="fas fa-store"></i> ${product.seller.name}</span>
                    </div>
                    <p class="gallery-price">
                        ${formatPrice(product.price)}
                        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                        ${product.discount ? `<span class="discount">${product.discount}</span>` : ''}
                    </p>
                    
                    <div class="price-variations">${priceVariationsHTML}</div>
                    
                    <div class="quantity-selector">
                        <span class="quantity-label">Jumlah:</span>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" class="quantity-input" value="1" min="1">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <div class="unit-selector">
                            <select class="unit-select">${unitOptionsHTML}</select>
                        </div>
                    </div>
                    
                    <div class="total-price">
                        <span class="total-price-label">Total Harga:</span>
                        <span class="total-price-value">${formatPrice(product.priceVariations[0].price)}</span>
                    </div>
                    
                    <div class="gallery-actions">
                        <button class="btn-detail">
                            <i class="fas fa-chevron-down"></i> Detail Produk
                        </button>
                        <button class="btn-order">
                            <i class="fas fa-shopping-cart"></i> Pesan Sekarang
                        </button>
                        <button class="btn-preorder-toggle">
                            <i class="fas fa-calendar-check"></i> Pre-Order
                        </button>
                    </div>
                    
                    <div class="preorder-form">
                        <div class="preorder-title">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>Form Uang Muka (DP)</span>
                        </div>
                        <input type="number" class="preorder-input" placeholder="Masukkan nominal DP (minimal 40%)">
                        <p class="preorder-note">
                            * Untuk pre-order, harap masukkan nominal uang muka minimal 40% dari total harga. 
                            Kami akan menghubungi Anda untuk konfirmasi lebih lanjut.
                        </p>
                        <button class="btn-preorder">
                            <i class="fas fa-paper-plane"></i> Kirim Pre-Order
                        </button>
                    </div>
                    
                    <div class="gallery-detail-expanded">
                        <div class="gallery-carousel">
                            <img src="${product.mainImage}" alt="${product.title}" class="gallery-main-image lazy" loading="lazy">
                            <div class="gallery-thumbnails">
                                ${detailImagesHTML}
                            </div>
                        </div>
                        <div class="gallery-content">
                            <p class="gallery-description">${product.details.description}</p>
                            <div class="gallery-specs">${detailSpecsHTML}</div>
                        </div>
                        <div class="gallery-actions-expanded">
                            <a href="https://wa.me/${product.contact.whatsapp}?text=Halo%20${encodeURIComponent(product.seller.name)},%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.title)}%20(${product.code})" class="btn-whatsapp" target="_blank">
                                <i class="fab fa-whatsapp"></i> Chat via WhatsApp
                            </a>
                            <a href="tel:${product.contact.phone}" class="btn-call">
                                <i class="fas fa-phone-alt"></i> Telepon Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            `;
            galleryGrid.appendChild(productCard);
        });
    }

    // Call render function
    renderProducts();


    // --- EVENT LISTENERS (using event delegation) ---
    const body = document.body;

    // Gallery Actions
    galleryGrid.addEventListener('click', e => {
        const target = e.target;
        const detailsContainer = target.closest('.gallery-details');
        
        // Update total price function
        const updateTotalPrice = (container) => {
            const activeVariation = container.querySelector('.price-variation.active');
            const quantityInput = container.querySelector('.quantity-input');
            if (activeVariation && quantityInput) {
                const price = parseFloat(activeVariation.dataset.price);
                const quantity = parseInt(quantityInput.value);
                const totalPrice = price * quantity;
                const totalPriceElement = container.querySelector('.total-price-value');
                if (totalPriceElement) {
                    totalPriceElement.textContent = formatPrice(totalPrice);
                }
            }
        };

        // Toggle Details
        if (target.closest('.btn-detail')) {
            const btn = target.closest('.btn-detail');
            const expandedContent = btn.closest('.gallery-details').querySelector('.gallery-detail-expanded');
            expandedContent.classList.toggle('active');
            btn.classList.toggle('active');
            btn.innerHTML = expandedContent.classList.contains('active') 
                ? '<i class="fas fa-chevron-up"></i> Sembunyikan Detail' 
                : '<i class="fas fa-chevron-down"></i> Detail Produk';
            if (expandedContent.classList.contains('active')) {
                expandedContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            playButtonSound();
        }

        // Change Price Variation
        if (target.closest('.price-variation')) {
            const variation = target.closest('.price-variation');
            variation.parentElement.querySelectorAll('.price-variation').forEach(v => v.classList.remove('active'));
            variation.classList.add('active');
            updateTotalPrice(detailsContainer);
            playButtonSound();
        }

        // Quantity Buttons
        if (target.closest('.quantity-btn')) {
            const btn = target.closest('.quantity-btn');
            const input = btn.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            if (btn.classList.contains('plus')) value++;
            else if (btn.classList.contains('minus') && value > 1) value--;
            input.value = value;
            updateTotalPrice(detailsContainer);
            playButtonSound();
        }

        // Thumbnail Click
        if (target.classList.contains('thumbnail')) {
            const mainImage = target.closest('.gallery-carousel').querySelector('.gallery-main-image');
            mainImage.src = target.src;
            target.parentElement.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            target.classList.add('active');
            playButtonSound();
        }

        // Image Zoom
        if(target.classList.contains('gallery-main-image')) {
            const zoomedImage = document.getElementById('zoomedImage');
            zoomedImage.src = target.src;
            document.getElementById('imageModal').classList.add('show');
            body.style.overflow = 'hidden';
            playButtonSound();
        }

        // Toggle Pre-order Form
        if (target.closest('.btn-preorder-toggle')) {
            const btn = target.closest('.btn-preorder-toggle');
            const preorderForm = detailsContainer.querySelector('.preorder-form');
            preorderForm.classList.toggle('active');
            btn.classList.toggle('active');
            btn.innerHTML = preorderForm.classList.contains('active')
                ? '<i class="fas fa-times"></i> Batal Pre-Order'
                : '<i class="fas fa-calendar-check"></i> Pre-Order';
            playButtonSound();
        }
        
        // Order and Pre-order buttons
        const galleryItem = target.closest('.gallery-item');
        if (!galleryItem) return;
        
        const productId = galleryItem.dataset.id;
        const productData = products.find(p => p.id === productId);

        if (target.closest('.btn-order')) {
            const quantity = detailsContainer.querySelector('.quantity-input').value;
            const unit = detailsContainer.querySelector('.unit-select').value;
            const totalPrice = detailsContainer.querySelector('.total-price-value').textContent;
            
            const message = `Halo, saya ingin memesan produk:\n\n*${productData.title}* (${productData.code})\n\nJumlah: ${quantity} ${unit}\nTotal Harga: ${totalPrice}\n\nMohon info lebih lanjut mengenai cara pembayaran dan pengiriman. Terima kasih.`;
            window.open(`https://wa.me/${productData.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
            playButtonSound();
        }
        
        if (target.closest('.btn-preorder')) {
            const dpInput = detailsContainer.querySelector('.preorder-input');
            const dpValue = parseFloat(dpInput.value);
            
            if (isNaN(dpValue) || dpValue <= 0) {
                alert('Mohon masukkan nominal DP yang valid');
                return;
            }

            const totalPriceText = detailsContainer.querySelector('.total-price-value').textContent;
            const totalPrice = parseFloat(totalPriceText.replace(/[^0-9]/g, ''));
            
            if (dpValue < (totalPrice * 0.4)) {
                alert(`Uang muka minimal 40% dari total harga (${formatPrice(totalPrice * 0.4)})`);
                return;
            }

            const message = `Halo, saya ingin melakukan pre-order produk:\n\n*${productData.title}* (${productData.code})\n\nTotal Harga: ${totalPriceText}\nUang Muka: ${formatPrice(dpValue)}\n\nMohon info lebih lanjut. Terima kasih.`;
            window.open(`https://wa.me/${productData.contact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
            playButtonSound();
        }

    });
    
    // Quantity input direct change
    galleryGrid.addEventListener('change', e => {
        if(e.target.classList.contains('quantity-input')) {
            if (e.target.value < 1) e.target.value = 1;
            updateTotalPrice(e.target.closest('.gallery-details'));
        }
    });


    // --- GENERAL PAGE SCRIPT ---

    // Background Music
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(() => {
            document.addEventListener('click', () => bgMusic.play(), { once: true });
        });
    }

    // Particles
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
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile Menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.innerHTML = navLinks.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        playButtonSound();
    });
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Mobile Search Toggle
    const searchToggle = document.getElementById('searchToggle');
    const navSearch = document.getElementById('navSearch');
    searchToggle.addEventListener('click', () => {
        navSearch.classList.toggle('active');
        playButtonSound();
    });
    
    // Category Filtering
    document.querySelector('.product-categories')?.addEventListener('click', e => {
        if (e.target.classList.contains('product-category-btn')) {
            document.querySelectorAll('.product-category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const category = e.target.dataset.category;
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.display = (category === 'all' || item.dataset.category === category) ? 'block' : 'none';
            });
            playButtonSound();
        }
    });

    document.querySelector('.category-tabs')?.addEventListener('click', e => {
        if (e.target.classList.contains('category-btn')) {
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const type = e.target.dataset.type;
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.display = (type === 'all' || item.dataset.type === type) ? 'block' : 'none';
            });
            playButtonSound();
        }
    });
    
    // Contact Form
    document.getElementById('contactForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here (e.g., using Fetch API or AJAX)
        alert('Fitur ini sedang dalam pengembangan.');
        playButtonSound();
    });
    
    // Quick Order Modal
    const orderModal = document.getElementById('orderModal');
    document.getElementById('quick-order').addEventListener('click', () => {
        orderModal.classList.add('show');
        body.style.overflow = 'hidden';
        playButtonSound();
    });
    
    // All Modals Close Logic
    document.querySelectorAll('.modal, .image-modal, .search-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal') || e.target.classList.contains('close-image-modal') || e.target.classList.contains('close-search-modal')) {
                modal.classList.remove('show');
                body.style.overflow = '';
            }
        });
    });

    // Button Sound
    const buttonSound = document.getElementById('buttonSound');
    function playButtonSound() {
        if(buttonSound) {
            buttonSound.currentTime = 0;
            buttonSound.play().catch(() => {});
        }
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80, // Offset for sticky nav
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
