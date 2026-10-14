document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar-container", "/components/navbar.html", initNavbar);
    loadComponent("footer-container", "/components/footer.html");
    injectFavicon();
});

/**
 * Fungsi untuk mengambil komponen HTML secara dinamis
 * @param {string} elementId - ID dari kontainer penampung
 * @param {string} filePath - Path menuju file HTML komponen
 * @param {function} callback - Fungsi yang dijalankan setelah komponen berhasil dimuat
 */
async function loadComponent(elementId, filePath, callback = null) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
        
        // Eksekusi fungsi tambahan (jika ada) setelah elemen masuk ke DOM
        if (callback) callback();
    } catch (error) {
        console.error(`Gagal memuat komponen dari ${filePath}:`, error);
    }
}

/**
 * Fungsi inisialisasi interaksi Navbar
 */
function initNavbar() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");

    // Hapus kelas 'active' dari semua link
    navLinks.forEach(link => {
        link.classList.remove("active");
        
        // Dapatkan nama file dari href (misal: "menu.html")
        const linkPath = link.getAttribute("href");
        
        // Jika path URL saat ini mengandung nama file di link, jadikan aktif
        if (currentPath.includes(linkPath)) {
            link.classList.add("active");
        }
    });

    // Simulasi update angka keranjang (contoh penggunaan localStorage)
    updateCartBadge();
}

/**
 * Fungsi simulasi untuk membaca isi keranjang
 */
function updateCartBadge() {
    const badge = document.querySelector(".cart-badge");
    if (badge) {
        // Ambil data dari localStorage, jika kosong set ke 0
        const cartData = JSON.parse(localStorage.getItem("nakocing_cart")) || [];
        badge.textContent = cartData.length;
    }
}

// Fungsi untuk me-render menu di halaman Beranda (index.html)
function renderFeaturedMenu() {
    const grid = document.querySelector('.featured-menu .menu-grid');
    if (!grid) return;

    grid.innerHTML = '';
    
    if (typeof menuData === 'undefined') return;
    const featuredItems = menuData.filter(item => item.featured);
    
    featuredItems.forEach(item => {
        grid.innerHTML += `
            <div class="menu-card">
                <a href="detail-menu.html?id=${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                </a>
                <div class="menu-detail">
                    <a href="detail-menu.html?id=${item.id}" style="color: var(--black);">
                        <h4>${item.name}</h4>
                    </a>
                    <p>${item.description.substring(0, 50)}...</p>
                    <div class="menu-bottom">
                        <span class="price">${formatRupiah(item.price)}</span>
                        <button class="add-btn" onclick="addToCart('${item.id}')"><i class="ph ph-plus"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Fungsi untuk me-render daftar pesanan di pesanan-saya.html
function renderOrders() {
    const container = document.getElementById('orders-container');
    if (!container || typeof ordersData === 'undefined') return;

    container.innerHTML = ''; // Kosongkan

    ordersData.forEach(order => {
        let miniItemsHtml = '';
        order.items.forEach(item => {
            miniItemsHtml += `
                <div class="mini-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="mini-item-info">
                        <p>${item.name}</p>
                        <span>x ${item.qty}</span>
                    </div>
                </div>
            `;
        });

        if (order.extra > 0) {
            miniItemsHtml += `<div class="more-items">+${order.extra}</div>`;
        }

        container.innerHTML += `
            <div class="order-card">
                <img src="${order.mainImage}" alt="Order Image" class="order-img-main">
                <div class="order-info">
                    <div class="order-top">
                        <div class="order-title-group">
                            <h3>#${order.id}</h3>
                            <span class="order-meta">${order.table} &nbsp;&bull;&nbsp; ${order.itemCount} item &nbsp;&bull;&nbsp; ${order.date}</span>
                        </div>
                        <div class="status-badge ${order.status}">
                            <i class="ph ${order.icon}"></i> ${order.statusLabel}
                        </div>
                    </div>
                    <div class="order-items-mini">
                        ${miniItemsHtml}
                    </div>
                </div>
                <div class="order-price-action">
                    <div class="order-price">${formatRupiah(order.total)}</div>
                </div>
            </div>
        `;
    });
}

// Fungsi untuk me-render menu berdasarkan kategori di Menu (menu.html)
function renderCategoryMenu(categoryId, categoryName) {
    const container = document.getElementById(categoryId);
    if (!container) return;
    
    // Ambil div untuk menaruh item
    const gridItems = container.querySelector('.menu-grid-items');
    if (!gridItems) return;

    gridItems.innerHTML = '';
    
    // Filter data berdasarkan kategori
    if (typeof menuData === 'undefined') return;
    const items = menuData.filter(item => item.category === categoryId);
    
    // Update jumlah menu
    const countSpan = container.querySelector('.menu-count');
    if(countSpan) countSpan.textContent = `${items.length} Menu`;
    
    items.forEach(item => {
        gridItems.innerHTML += `
            <div class="menu-item-card">
                <div class="menu-img-box">
                    <a href="detail-menu.html?id=${item.id}">
                        <img src="${item.image}" alt="${item.name}">
                    </a>
                </div>
                <div class="menu-item-info">
                    <a href="detail-menu.html?id=${item.id}" style="color: var(--black);">
                        <h4>${item.name}</h4>
                    </a>
                    <p>${item.description.substring(0, 60)}...</p>
                    <div class="menu-action-row">
                        <span class="price">${formatRupiah(item.price)}</span>
                        <button class="add-btn" onclick="addToCart('${item.id}')"><i class="ph ph-shopping-cart"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Fungsi untuk me-render detail produk (detail-menu.html)
function renderProductDetail() {
    const wrapper = document.querySelector('.product-detail-wrapper');
    if (!wrapper) return; // Keluar jika bukan di halaman detail

    // Ambil ID dari URL (misal: detail-menu.html?id=m01)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (typeof menuData === 'undefined') return;

    // Cari data produk berdasarkan ID
    const product = menuData.find(item => item.id === productId);
    
    if (product) {
        // Update DOM dengan data produk
        document.querySelector('.product-gallery img').src = product.image;
        document.querySelector('.product-gallery img').alt = product.name;
        document.querySelector('.product-info-panel h1').textContent = product.name;
        document.querySelector('.product-price-large').textContent = formatRupiah(product.price);
        document.querySelector('.product-description').innerHTML = product.description;
        
        const addBtn = document.querySelector('.btn-add-large');
        const qtyValElement = document.querySelector('.product-actions .qty-val');
        const minusBtn = document.querySelector('.product-actions .minus');
        const plusBtn = document.querySelector('.product-actions .plus');

        if (addBtn && qtyValElement) {
            let cart = getCart();
            let existingItem = cart.find(i => i.id === product.id);
            let currentQty = existingItem ? existingItem.qty : 1;
            
            qtyValElement.textContent = currentQty;

            if (existingItem) {
                addBtn.innerHTML = `<i class="ph ph-shopping-cart"></i> Perbarui Pesanan`; 
            }

            // PERBAIKAN LOGIKA TOMBOL MINUS
            minusBtn.onclick = () => {
                let currentCart = getCart();
                let itemInCart = currentCart.find(i => i.id === product.id);

                if (currentQty > 1) {
                    currentQty--;
                    qtyValElement.textContent = currentQty;
                    // Jika item sudah ada di keranjang, langsung update datanya!
                    if (itemInCart) updateCartQty(product.id, -1);
                } else if (currentQty === 1 && itemInCart) {
                    if(confirm('Hapus item ini dari keranjang?')) {
                        removeFromCart(product.id);
                        currentQty = 1; // Reset layar kembali ke angka 1
                        qtyValElement.textContent = currentQty;
                        addBtn.innerHTML = `<i class="ph ph-shopping-cart"></i> Tambah ke Keranjang`;
                    }
                }
            };
            
            // PERBAIKAN LOGIKA TOMBOL PLUS
            plusBtn.onclick = () => {
                currentQty++;
                qtyValElement.textContent = currentQty;
                // Jika item sudah ada di keranjang, langsung update datanya!
                let currentCart = getCart();
                if (currentCart.find(i => i.id === product.id)) {
                    updateCartQty(product.id, 1);
                }
            };

            // PERBAIKAN LOGIKA TOMBOL TAMBAH/PERBARUI
            addBtn.onclick = () => {
                let currentCart = getCart();
                let itemIndex = currentCart.findIndex(i => i.id === product.id);
                
                if (itemIndex !== -1) {
                    // Jika sudah ada, tapi user malah ngetik angka manual atau update
                    currentCart[itemIndex].qty = currentQty;
                    saveCart(currentCart);
                    alert('Keranjang berhasil diperbarui!');
                } else {
                    // Baru pertama kali dimasukkan
                    currentCart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        qty: currentQty
                    });
                    saveCart(currentCart);
                    alert(`${product.name} berhasil ditambahkan!`);
                    addBtn.innerHTML = `<i class="ph ph-shopping-cart"></i> Perbarui Pesanan`;
                }
            };
        }
    }
}

// Tambahkan event listener tambahan tanpa menimpa yang sudah ada
document.addEventListener('DOMContentLoaded', () => {
    // Panggil fungsi render
    renderFeaturedMenu();
    renderOrders();
    renderCartSidebar();
    renderCheckoutItems();
    attachCheckoutEvent();

    const clearBtn = document.querySelector('.clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCart);
    }

    // Panggil renderCategoryMenu untuk setiap kategori yang ada di menu.html
    renderCategoryMenu('kopi', 'Kopi');
    renderCategoryMenu('non-kopi', 'Non Kopi');
    renderCategoryMenu('makanan', 'Makanan');
    renderCategoryMenu('dessert', 'Dessert');
    initCategoryFilter();

    renderProductDetail();
    initOrderFilters();
    initHeroSlider();
});

// ==========================================
// SISTEM KERANJANG BELANJA (Local Storage)
// ==========================================

// Fungsi untuk mendapatkan isi keranjang dari localStorage
function getCart() {
    const cart = localStorage.getItem('nakocing_cart');
    return cart ? JSON.parse(cart) : [];
}

// Fungsi untuk menyimpan keranjang ke localStorage
function saveCart(cart) {
    localStorage.setItem('nakocing_cart', JSON.stringify(cart));
    updateCartBadge(); // Update badge navbar otomatis
}

// Fungsi untuk menambah item ke keranjang
function addToCart(productId, quantity = 1) {
    if (typeof menuData === 'undefined') return;
    
    const product = menuData.find(item => item.id === productId);
    if (!product) return;

    let cart = getCart();
    
    // Cek apakah item sudah ada di keranjang
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        // Jika ada, tambah quantity
        cart[existingItemIndex].qty += quantity;
    } else {
        // Jika belum, masukkan item baru
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: quantity
        });
    }
    
    saveCart(cart);
    alert(`${product.name} ditambahkan ke keranjang!`);
    
    // Jika sedang di halaman menu, update sidebar keranjang
    if(window.location.pathname.includes('menu.html')) {
        renderCartSidebar();
    }
}

// Fungsi untuk mengubah jumlah qty di keranjang (+ / -)
function updateCartQty(productId, change) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].qty += change;
        
        // Hapus item jika qty jadi 0
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        saveCart(cart);
        
        // Render ulang keranjang berdasarkan halaman aktif
        if(window.location.pathname.includes('menu.html')) renderCartSidebar();
        if(window.location.pathname.includes('checkout.html')) renderCheckoutItems();
    }
}

// Fungsi untuk menghapus 1 jenis item sepenuhnya
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    
    if(window.location.pathname.includes('menu.html')) renderCartSidebar();
    if(window.location.pathname.includes('checkout.html')) renderCheckoutItems();
}

// Fungsi untuk membersihkan seluruh keranjang
function clearCart() {
    if(confirm('Hapus semua pesanan?')) {
        saveCart([]);
        if(window.location.pathname.includes('menu.html')) renderCartSidebar();
    }
}

// Fungsi Render Keranjang di Sidebar (menu.html)
function renderCartSidebar() {
    const listContainer = document.querySelector('.cart-items-list');
    const subtotalText = document.querySelector('.subtotal-price');
    
    if (!listContainer || !subtotalText) return;
    
    const cart = getCart();
    listContainer.innerHTML = ''; // Kosongkan
    let subtotal = 0;

    if (cart.length === 0) {
        listContainer.innerHTML = `<p style="text-align:center; color:var(--gray-text); padding:2rem 0;">Keranjang kosong.</p>`;
        subtotalText.textContent = 'Rp 0';
        return;
    }

    cart.forEach(item => {
        subtotal += (item.price * item.qty);
        
        listContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.qty} x ${formatRupiah(item.price)}</p>
                    <div class="qty-control cart-qty" style="display:inline-flex;">
                        <button class="qty-btn minus" onclick="updateCartQty('${item.id}', -1)"><i class="ph ph-minus"></i></button>
                        <span class="qty-val">${item.qty}</span>
                        <button class="qty-btn plus" onclick="updateCartQty('${item.id}', 1)"><i class="ph ph-plus"></i></button>
                    </div>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart('${item.id}')"><i class="ph ph-trash"></i></button>
            </div>
        `;
    });
    
    subtotalText.textContent = formatRupiah(subtotal);
}

// Fungsi Render Keranjang di Halaman Checkout (checkout.html)
function renderCheckoutItems() {
    const container = document.getElementById('checkout-items-container');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');
    
    if (!container) return; // Hanya jalan di checkout.html

    const cart = getCart();
    container.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--gray-text); padding:1rem 0;">Keranjang kosong. Silakan pesan menu terlebih dahulu.</p>`;
        subtotalEl.textContent = 'Rp 0';
        taxEl.textContent = 'Rp 0';
        totalEl.textContent = 'Rp 0';
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        container.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--gray-border); padding-bottom: 1rem;">
                <div style="display: flex; gap: 1rem; align-items: center;">
                    <img src="${item.image}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;">
                    <div>
                        <h4 style="font-size: 0.95rem; margin-bottom: 0.2rem; color: var(--black);">${item.name}</h4>
                        <div class="qty-control" style="transform: scale(0.8); transform-origin: left; display: inline-flex;">
                            <button class="qty-btn minus" onclick="updateCartQty('${item.id}', -1)"><i class="ph ph-minus"></i></button>
                            <span class="qty-val">${item.qty}</span>
                            <button class="qty-btn plus" onclick="updateCartQty('${item.id}', 1)"><i class="ph ph-plus"></i></button>
                        </div>
                    </div>
                </div>
                <span style="font-weight: 600; font-size: 0.95rem;">${formatRupiah(itemTotal)}</span>
            </div>
        `;
    });

    const tax = subtotal * 0.10; // Pajak restoran 10%
    const grandTotal = subtotal + tax;

    subtotalEl.textContent = formatRupiah(subtotal);
    taxEl.textContent = formatRupiah(tax);
    totalEl.textContent = formatRupiah(grandTotal);
}

// Simulasi Klik Tombol Bayar
function attachCheckoutEvent() {
    const payBtn = document.getElementById('btn-pay');
    if(payBtn) {
        payBtn.addEventListener('click', () => {
            const cart = getCart();
            if(cart.length === 0) {
                alert("Keranjang kosong!");
                return;
            }
            
            payBtn.innerHTML = 'Memproses...';
            payBtn.disabled = true;
            
            setTimeout(() => {
                // 1. Buat ID Pesanan Baru Acak (misal: NK-006)
                const newId = `NK-00${Math.floor(Math.random() * 900) + 100}`;
                
                // 2. Hitung Total dan Item
                let subtotal = 0;
                let itemCount = 0;
                const formattedItems = [];
                
                cart.forEach(item => {
                    subtotal += (item.price * item.qty);
                    itemCount += item.qty;
                    // Format item agar sesuai dengan struktur ordersData di dummy.js
                    formattedItems.push({
                        name: item.name,
                        qty: item.qty,
                        img: item.image
                    });
                });
                
                const grandTotal = subtotal + (subtotal * 0.10);
                
                // 3. Format Tanggal Hari Ini
                const today = new Date();
                const dateString = `${today.getDate()} Okt ${today.getFullYear()}, ${today.getHours()}:${String(today.getMinutes()).padStart(2, '0')}`;
                
                // 4. Buat Object Pesanan Baru
                const newOrder = {
                    id: newId,
                    status: "diproses",
                    statusLabel: "Diproses",
                    icon: "ph-clock",
                    table: "Meja A03",
                    itemCount: itemCount,
                    date: dateString,
                    total: grandTotal,
                    mainImage: cart[0].image, // Ambil gambar item pertama
                    items: formattedItems.slice(0, 2), // Tampilkan maks 2 gambar mini
                    extra: formattedItems.length > 2 ? formattedItems.length - 2 : 0
                };
                
                // 5. Masukkan ke urutan paling atas di ordersData
                if (typeof ordersData !== 'undefined') {
                    ordersData.unshift(newOrder); 
                }

                alert("Pembayaran Berhasil! Pesanan sedang diproses.");
                saveCart([]); // Kosongkan keranjang
                
                // 6. Redirect ke halaman Pesanan Saya
                window.location.href = "pesanan-saya.html";
            }, 1500);
        });
    }
}

// Tambahkan di dalam fungsi updateCartQty() di main.js
function updateCartQty(productId, change) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].qty += change;
        
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        saveCart(cart);
        
        // Update angka di tombol card menu jika elemennya ada
        const qtySpan = document.getElementById(`qty-${productId}`);
        if(qtySpan) {
            const currentItem = cart.find(item => item.id === productId);
            qtySpan.textContent = currentItem ? currentItem.qty : "0";
        }

        if(window.location.pathname.includes('menu.html')) renderCartSidebar();
        if(window.location.pathname.includes('checkout.html')) renderCheckoutItems();
    }
}

// js/main.js - Fungsi Filter Kategori

function initCategoryFilter() {
    const catLinks = document.querySelectorAll('.cat-item');
    const sections = document.querySelectorAll('.menu-category-section');

    if (catLinks.length === 0 || sections.length === 0) return;

    // Fungsi untuk menyembunyikan semua dan menampilkan yang dipilih
    function showCategory(categoryId) {
        sections.forEach(sec => sec.style.display = 'none'); // Sembunyikan semua
        
        const targetSection = document.getElementById(categoryId);
        if (targetSection) {
            targetSection.style.display = 'block'; // Tampilkan yang sesuai
        }
    }

    // Default: Tampilkan Kopi saat pertama kali muat
    showCategory('kopi');

    // Event Listener untuk klik sidebar
    catLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Cegah default anchor jump
            
            // Hapus class active dari semua link
            catLinks.forEach(l => l.classList.remove('active'));
            // Tambahkan class active ke link yang diklik
            link.classList.add('active');

            // Ambil ID kategori dari href (misal: "#kopi" -> "kopi")
            const targetId = link.getAttribute('href').substring(1);
            showCategory(targetId);
        });
    });
}

function initOrderFilters() {
    const filterBtns = document.querySelectorAll('.orders-filters .filter-btn');
    const orderCards = document.querySelectorAll('.order-card');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus status aktif dari semua tombol
            filterBtns.forEach(b => b.classList.remove('active'));
            // Tambahkan status aktif ke tombol yang diklik
            btn.classList.add('active');

            // Ambil teks dari tombol (Semua, Diproses, Siap Disajikan, Selesai)
            const filterText = btn.textContent.trim().toLowerCase();

            orderCards.forEach(card => {
                // Ambil status dari badge di dalam masing-masing card
                const statusBadge = card.querySelector('.status-badge').textContent.trim().toLowerCase();
                
                // Logika penyaringan
                if (filterText === 'semua' || statusBadge.includes(filterText)) {
                    card.style.display = 'flex'; // Tampilkan
                } else {
                    card.style.display = 'none'; // Sembunyikan
                }
            });
        });
    });
}

// Fungsi untuk menyuntikkan Favicon ke semua halaman secara otomatis

function injectFavicon() {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = '/assets/images/logo-favicon.svg'; // Pakai awalan '/'
    
    document.head.appendChild(link);
}

// ==========================================
// HERO SLIDER GESER KANAN-KIRI (index.html)
// ==========================================
function initHeroSlider() {
    const heroBg = document.querySelector('.hero-bg');
    const dots = document.querySelectorAll('.hero-pagination .dot');
    
    // Keluar jika bukan di halaman index/beranda
    if (!heroBg || dots.length === 0) return;

    // Daftar gambar banner kafe
    const images = [
        '../assets/images/hero-banner.png',
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=80',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80'
    ];

    // Susun elemen slider track secara otomatis di dalam DOM
    heroBg.innerHTML = `
        <div class="hero-slider-track">
            ${images.map(img => `<div class="hero-slide" style="background-image: url('${img}');"></div>`).join('')}
        </div>
    `;

    const track = heroBg.querySelector('.hero-slider-track');
    let currentIndex = 0;
    let slideInterval;

    // Fungsi geser track ke indeks tertentu
    function changeSlide(index) {
        currentIndex = index;
        // Geser posisi track ke kiri berdasarkan indeks (0%, -100%, -200%, -300%)
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Jalankan auto slide tiap 4 detik
    function startAutoSlide() {
        slideInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % images.length;
            changeSlide(nextIndex);
        }, 4000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Navigasi manual saat dot diklik
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            changeSlide(index);
            startAutoSlide();
        });
    });

    // Inisialisasi slide pertama
    changeSlide(0);
    startAutoSlide();
}