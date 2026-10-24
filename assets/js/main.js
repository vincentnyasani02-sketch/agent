/**
* Template Name: EstateAgency
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Updated: Aug 09 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

})();

/*==============================================================
  REIGN ELECTRONICS & MALI MALI: GLOBAL E-COMMERCE ENGINE
==============================================================*/

// --- 1. TOAST NOTIFICATIONS ---
window.showToast = function(message, type = 'info', icon = 'bi-check-circle-fill') {
  let container = document.getElementById('reign-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'reign-toast-container';
    container.className = 'reign-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `reign-toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `<i class="bi ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// --- 2. CART ENGINE ---
const CART_STORAGE_KEY = 'reign_cart_items';

window.getCart = function() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  // Default sample items if freshly opened
  return [
    {
      id: 'apex-laptop',
      title: 'Apex Blade Pro 16" Laptop',
      price: 1399,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80',
      quantity: 1
    },
    {
      id: 'echo-headset',
      title: 'EchoPulse Ultra Wireless Headset',
      price: 249,
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80',
      quantity: 1
    }
  ];
};

window.saveCart = function(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.updateCartUI();
};

window.openCart = function() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.renderCartItems();
  }
};

window.closeCart = function(e) {
  if (e && e.target && e.target.id !== 'cart-drawer-overlay' && !e.target.closest('.cart-close-btn')) {
    return;
  }
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.addToCart = function(product) {
  const cart = window.getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += (product.quantity || 1);
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      image: product.image,
      quantity: product.quantity || 1
    });
  }
  window.saveCart(cart);
  window.showToast(`"${product.title}" added to your cart!`, 'success', 'bi-bag-check-fill');
  window.openCart();
};

window.removeFromCart = function(id) {
  let cart = window.getCart();
  cart = cart.filter(item => item.id !== id);
  window.saveCart(cart);
  window.renderCartItems();
  window.showToast('Item removed from cart', 'info', 'bi-trash3');
};

window.updateCartQty = function(id, delta) {
  const cart = window.getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      window.removeFromCart(id);
      return;
    }
    window.saveCart(cart);
    window.renderCartItems();
  }
};

window.clearCart = function() {
  if (confirm('Are you sure you want to clear your cart?')) {
    window.saveCart([]);
    window.renderCartItems();
    window.showToast('Cart has been cleared', 'info', 'bi-cart-x');
  }
};

window.checkoutCart = function() {
  const cart = window.getCart();
  if (!cart.length) {
    window.showToast('Your cart is currently empty', 'info', 'bi-exclamation-circle');
    return;
  }
  window.showToast('Proceeding to Secure Checkout...', 'success', 'bi-shield-lock-fill');
  setTimeout(() => {
    alert(`Thank you for shopping at Reign Electronics & Mali Mali!\n\nOrder total: $${window.getCartSubtotal().toFixed(2)}\nYour order has been recorded.`);
    window.saveCart([]);
    window.closeCart();
  }, 1000);
};

window.getCartSubtotal = function() {
  const cart = window.getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

window.renderCartItems = function() {
  const body = document.getElementById('cart-drawer-body');
  const subtotalEl = document.getElementById('cart-subtotal');
  const countBadge = document.getElementById('cart-count-badge');
  if (!body) return;

  const cart = window.getCart();
  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  if (countBadge) countBadge.textContent = totalCount;

  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty-state">
        <i class="bi bi-bag-x"></i>
        <h4>Your cart is empty</h4>
        <p>Looks like you haven't added anything yet. Explore our top gadgets and deals.</p>
        <a href="properties.html" class="btn-single-cart" style="text-decoration:none; display:inline-flex; width:auto; padding:10px 24px;">Start Shopping</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    return;
  }

  let html = '';
  cart.forEach(item => {
    html += `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <h5>${item.title}</h5>
          <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          <div class="cart-item-controls">
            <button class="qty-control-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-control-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
            <button class="cart-remove-item ms-auto" onclick="removeFromCart('${item.id}')" title="Remove"><i class="bi bi-trash3"></i></button>
          </div>
        </div>
      </div>
    `;
  });
  body.innerHTML = html;

  const subtotal = window.getCartSubtotal();
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
};

window.updateCartUI = function() {
  const cart = window.getCart();
  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  document.querySelectorAll('.nav-cart-btn span, .cart-counter-pill').forEach(el => {
    el.textContent = totalCount;
  });
};

// --- 3. WISHLIST SYSTEM ---
const WISHLIST_KEY = 'reign_wishlist_ids';
window.getWishlist = function() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch (e) {
    return [];
  }
};

window.toggleWishlist = function(productId, title, btn) {
  let list = window.getWishlist();
  const index = list.indexOf(productId);
  if (index > -1) {
    list.splice(index, 1);
    if (btn) btn.classList.remove('wishlisted');
    window.showToast(`Removed "${title}" from Wishlist`, 'info', 'bi-heart');
  } else {
    list.push(productId);
    if (btn) btn.classList.add('wishlisted');
    window.showToast(`Saved "${title}" to your Wishlist!`, 'success', 'bi-heart-fill');
  }
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  window.updateWishlistUI();
};

window.updateWishlistUI = function() {
  const list = window.getWishlist();
  document.querySelectorAll('.wishlist-counter-pill, .nav-icon-btn[aria-label="Wishlist"] span').forEach(el => {
    el.textContent = list.length;
  });
};

// --- 4. AUTH SYSTEM ---
const AUTH_KEY = 'reign_logged_user';

window.getLoggedUser = function() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY));
  } catch (e) {
    return null;
  }
};

window.openAuthModal = function(tab = 'login') {
  const overlay = document.getElementById('auth-modal-overlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    window.switchAuthTab(tab);
  }
};

window.closeAuthModal = function(e) {
  if (e && e.target && e.target.id !== 'auth-modal-overlay' && !e.target.closest('.auth-modal-close')) {
    return;
  }
  const overlay = document.getElementById('auth-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.switchAuthTab = function(tab) {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const panelLogin = document.getElementById('panel-login');
  const panelRegister = document.getElementById('panel-register');
  const panelSuccess = document.getElementById('panel-success');
  const indicator = document.getElementById('auth-tab-indicator');

  if (panelSuccess) panelSuccess.classList.add('d-none');

  if (tab === 'login') {
    if (tabLogin) tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
    if (panelLogin) panelLogin.classList.remove('d-none');
    if (panelRegister) panelRegister.classList.add('d-none');
    if (indicator) {
      indicator.style.left = '4px';
      indicator.style.width = 'calc(50% - 4px)';
    }
  } else {
    if (tabLogin) tabLogin.classList.remove('active');
    if (tabRegister) tabRegister.classList.add('active');
    if (panelLogin) panelLogin.classList.add('d-none');
    if (panelRegister) panelRegister.classList.remove('d-none');
    if (indicator) {
      indicator.style.left = '50%';
      indicator.style.width = 'calc(50% - 4px)';
    }
  }
};

window.handleLogin = function(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('[name="email"]').value;
  const password = form.querySelector('[name="password"]').value;
  const errBox = document.getElementById('login-error');

  if (!email || !password) {
    if (errBox) {
      errBox.textContent = 'Please provide both email and password.';
      errBox.classList.add('visible');
    }
    return;
  }

  // Simulate authentication
  const user = {
    name: email.split('@')[0].toUpperCase(),
    email: email,
    initials: email.substring(0, 2).toUpperCase()
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));

  const panelLogin = document.getElementById('panel-login');
  const panelSuccess = document.getElementById('panel-success');
  if (panelLogin) panelLogin.classList.add('d-none');
  if (panelSuccess) {
    panelSuccess.classList.remove('d-none');
    const msg = document.getElementById('success-message');
    if (msg) msg.textContent = `Welcome back, ${user.name}!`;
  }

  window.updateAuthUI();
  window.showToast(`Signed in as ${user.name}`, 'success', 'bi-person-check-fill');

  setTimeout(() => {
    window.closeAuthModal();
  }, 1200);
};

window.handleRegister = function(e) {
  e.preventDefault();
  const form = e.target;
  const first = form.querySelector('[name="firstname"]')?.value || 'Customer';
  const last = form.querySelector('[name="lastname"]')?.value || '';
  const email = form.querySelector('[name="email"]')?.value || '';
  const errBox = document.getElementById('register-error');

  if (!email) {
    if (errBox) {
      errBox.textContent = 'Please enter a valid email address.';
      errBox.classList.add('visible');
    }
    return;
  }

  const user = {
    name: `${first} ${last}`.trim(),
    email: email,
    initials: `${first[0] || 'R'}${last[0] || 'E'}`.toUpperCase()
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));

  const panelRegister = document.getElementById('panel-register');
  const panelSuccess = document.getElementById('panel-success');
  if (panelRegister) panelRegister.classList.add('d-none');
  if (panelSuccess) {
    panelSuccess.classList.remove('d-none');
    const msg = document.getElementById('success-message');
    if (msg) msg.textContent = `Account created! Welcome, ${user.name}!`;
  }

  window.updateAuthUI();
  window.showToast(`Welcome to Reign Electronics, ${user.name}!`, 'success', 'bi-gift-fill');

  setTimeout(() => {
    window.closeAuthModal();
  }, 1200);
};

window.signOut = function() {
  localStorage.removeItem(AUTH_KEY);
  window.updateAuthUI();
  window.showToast('You have been signed out', 'info', 'bi-box-arrow-right');
};

window.togglePassword = function(id, btn) {
  const input = document.getElementById(id);
  if (!input) return;
  const isPass = input.type === 'password';
  input.type = isPass ? 'text' : 'password';
  const icon = btn.querySelector('i');
  if (icon) {
    icon.className = isPass ? 'bi bi-eye-slash' : 'bi bi-eye';
  }
};

window.updateAuthUI = function() {
  const user = window.getLoggedUser();
  const guestContainers = document.querySelectorAll('#auth-guest');
  const userContainers = document.querySelectorAll('#auth-user');

  if (user) {
    guestContainers.forEach(el => el.classList.add('d-none'));
    userContainers.forEach(el => el.classList.remove('d-none'));

    document.querySelectorAll('#user-initials').forEach(el => el.textContent = user.initials || 'RE');
    document.querySelectorAll('#user-display-name').forEach(el => el.textContent = user.name || 'Valued Customer');
    document.querySelectorAll('#user-display-email').forEach(el => el.textContent = user.email || 'customer@reignshop.com');
  } else {
    guestContainers.forEach(el => el.classList.remove('d-none'));
    userContainers.forEach(el => el.classList.add('d-none'));
  }
};

// Toggle user dropdown menu
document.addEventListener('click', function(e) {
  const avatarBtn = e.target.closest('#user-avatar-btn');
  const menu = document.getElementById('user-dropdown-menu');
  if (avatarBtn && menu) {
    menu.classList.toggle('open');
  } else if (menu && !e.target.closest('#auth-user')) {
    menu.classList.remove('open');
  }
});

// --- 5. SEARCH MODAL ---
window.openSearchModal = function() {
  let modal = document.getElementById('search-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'search-modal-overlay';
    modal.className = 'search-modal-overlay';
    modal.innerHTML = `
      <div class="search-modal-box">
        <div class="search-modal-header">
          <i class="bi bi-search"></i>
          <input type="text" id="quick-search-input" placeholder="Search laptops, headphones, smart gadgets, mali mali..." autofocus oninput="handleSearchQuery(this.value)">
          <button class="cart-close-btn" onclick="closeSearchModal()"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="search-modal-results" id="search-modal-results">
          <a href="property-single.html" class="search-result-item">
            <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=80" alt="Apex Laptop">
            <div>
              <div style="font-weight:700; font-size:14px;">Apex Blade Pro 16" OLED Laptop</div>
              <div style="font-size:12px; color:#ff7d3b;">$1,399.00 &bull; Computing</div>
            </div>
          </a>
          <a href="property-single.html" class="search-result-item">
            <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=150&q=80" alt="EchoPulse">
            <div>
              <div style="font-weight:700; font-size:14px;">EchoPulse Ultra ANC Wireless Headset</div>
              <div style="font-size:12px; color:#ff7d3b;">$249.00 &bull; Audio</div>
            </div>
          </a>
          <a href="properties.html" class="search-result-item">
            <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=150&q=80" alt="Smart Hub">
            <div>
              <div style="font-weight:700; font-size:14px;">Smart Aura AI Hub & Remote Lighting</div>
              <div style="font-size:12px; color:#ff7d3b;">$129.00 &bull; Smart Home</div>
            </div>
          </a>
        </div>
      </div>
    `;
    modal.onclick = function(e) {
      if (e.target.id === 'search-modal-overlay') window.closeSearchModal();
    };
    document.body.appendChild(modal);
  }
  modal.classList.add('active');
  const input = modal.querySelector('input');
  if (input) setTimeout(() => input.focus(), 100);
};

window.closeSearchModal = function() {
  const modal = document.getElementById('search-modal-overlay');
  if (modal) modal.classList.remove('active');
};

window.handleSearchQuery = function(query) {
  const container = document.getElementById('search-modal-results');
  if (!container) return;
  if (!query.trim()) {
    container.innerHTML = `
      <a href="property-single.html" class="search-result-item">
        <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=80" alt="Laptop">
        <div><div style="font-weight:700; font-size:14px;">Apex Blade Pro 16" OLED Laptop</div><div style="font-size:12px; color:#ff7d3b;">$1,399.00 &bull; Computing</div></div>
      </a>
      <a href="properties.html" class="search-result-item">
        <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=150&q=80" alt="Audio">
        <div><div style="font-weight:700; font-size:14px;">EchoPulse Ultra ANC Wireless Headset</div><div style="font-size:12px; color:#ff7d3b;">$249.00 &bull; Audio</div></div>
      </a>
    `;
    return;
  }
  container.innerHTML = `
    <div style="padding:10px; font-size:13px; color:#64748b;">Showing live results matching "<strong>${query}</strong>":</div>
    <a href="properties.html" class="search-result-item">
      <i class="bi bi-search" style="font-size:24px; color:#ff7d3b;"></i>
      <div>
        <div style="font-weight:700;">Search "${query}" in all departments</div>
        <div style="font-size:12px; color:#94a3b8;">Electronics, Smart Home & Mali Mali</div>
      </div>
    </a>
  `;
};

// --- 6. CATALOG FILTERING ---
window.filterCatalog = function(category, btn) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.product-grid-item');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

// --- 7. PRODUCT GALLERY SWITCHER ---
window.switchMainImage = function(src, thumb) {
  const mainImg = document.getElementById('product-main-view');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  if (thumb) thumb.classList.add('active');
};

// --- 8. INITIALIZATION ON DOM READY ---
document.addEventListener('DOMContentLoaded', function() {
  window.updateCartUI();
  window.updateWishlistUI();
  window.updateAuthUI();

  // Attach search button listeners
  document.querySelectorAll('.nav-icon-btn[aria-label="Search"]').forEach(btn => {
    btn.onclick = window.openSearchModal;
  });

  // Attach cart button listeners
  document.querySelectorAll('.nav-cart-btn').forEach(btn => {
    btn.onclick = window.openCart;
  });

  // Attach wishlist button listeners
  document.querySelectorAll('.nav-icon-btn[aria-label="Wishlist"]').forEach(btn => {
    btn.onclick = function() {
      window.showToast(`You have ${window.getWishlist().length} items in your Wishlist.`, 'info', 'bi-heart-fill');
    };
  });
});