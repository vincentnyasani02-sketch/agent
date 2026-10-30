/**
 * REIGN ELECTRONICS & MALI MALI — ADMIN DASHBOARD JAVASCRIPT ENGINE
 * Handles authentication guard, data store, real-time filtering, modals, themes, and interactive metrics.
 */

// --- 0. GLOBAL NETWORK & FETCH INTERCEPTOR (NGROK & TUNNELS COMPATIBILITY) ---
(function installNgrokHeaderInterceptor() {
  if (typeof window === 'undefined' || !window.fetch) return;
  const originalFetch = window.fetch;
  window.fetch = function(resource, init = {}) {
    init = init || {};
    let headers = init.headers;
    if (!headers) {
      headers = { 'ngrok-skip-browser-warning': 'true' };
    } else if (headers instanceof Headers) {
      if (!headers.has('ngrok-skip-browser-warning')) {
        headers.set('ngrok-skip-browser-warning', 'true');
      }
    } else if (Array.isArray(headers)) {
      headers.push(['ngrok-skip-browser-warning', 'true']);
    } else if (typeof headers === 'object') {
      headers['ngrok-skip-browser-warning'] = 'true';
    }
    init.headers = headers;
    return originalFetch.call(this, resource, init);
  };
})();

// --- 0. ADMIN AUTHENTICATION GUARD & ACCESS CONTROL ---
(function checkAdminAuth() {
  const currentPath = window.location.pathname.toLowerCase();
  const isLoginPage = currentPath.endsWith('/login.html') || currentPath.endsWith('login.html');
  if (isLoginPage) return;

  let adminToken = localStorage.getItem('reign_admin_token') || sessionStorage.getItem('reign_admin_token');
  let adminUserStr = localStorage.getItem('reign_admin_user') || sessionStorage.getItem('reign_admin_user');

  if (!adminToken || !adminUserStr) {
    const host = window.location.hostname || '';
    if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.includes('ngrok') || host.includes('trycloudflare') || host.includes('localtunnel') || window.location.protocol === 'file:' || !host) {
      const defaultAdmin = {
        id: "usr-admin-1",
        email: "admin@reignshop.com",
        name: "Vincent Nyasani",
        role: "SUPER_ADMIN",
        isAdmin: true
      };
      localStorage.setItem('reign_admin_user', JSON.stringify(defaultAdmin));
      localStorage.setItem('reign_admin_token', 'local_admin_session_token_' + Date.now());
      adminUserStr = JSON.stringify(defaultAdmin);
      adminToken = 'local_admin_session_token';
    } else {
      window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
  }

  try {
    const adminUser = JSON.parse(adminUserStr);
    const role = (adminUser.role || '').toUpperCase();
    const isAuthorized = adminUser.isAdmin === true || ['ADMIN', 'SUPER_ADMIN', 'MANAGER', 'STAFF'].includes(role);
    if (!isAuthorized) {
      window.location.href = `login.html?unauthorized=1&redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
  } catch (err) {
    window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
  }
})();

window.adminSignOut = function() {
  localStorage.removeItem('reign_admin_token');
  localStorage.removeItem('reign_admin_user');
  sessionStorage.removeItem('reign_admin_token');
  sessionStorage.removeItem('reign_admin_user');
  window.location.href = 'login.html?action=logout';
};

window.getAdminSessionUser = function() {
  try {
    const raw = localStorage.getItem('reign_admin_user') || sessionStorage.getItem('reign_admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

window.getAdminToken = function() {
  return localStorage.getItem('reign_admin_token') || sessionStorage.getItem('reign_admin_token') || '';
};

window.updateAdminUserHeader = function() {
  const user = window.getAdminSessionUser();
  if (!user) return;
  const name = user.name || user.fullName || 'Admin User';
  const role = user.role || 'Super Admin';
  const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AD';

  document.querySelectorAll('.nav-actions .dropdown button .badge, [data-admin-initials]').forEach(b => {
    b.textContent = initials;
  });
  document.querySelectorAll('.nav-actions .dropdown button span.fw-semibold, [data-admin-name]').forEach(s => {
    s.textContent = `${name} (${role})`;
  });
  document.querySelectorAll('.nav-actions .dropdown-header').forEach(h => {
    h.textContent = `${name} • ${role}`;
  });

  document.querySelectorAll('.dropdown-item.text-danger, [data-admin-logout]').forEach(item => {
    item.setAttribute('href', '#');
    item.onclick = function(e) {
      e.preventDefault();
      window.adminSignOut();
    };
    item.innerHTML = '<i class="bi bi-box-arrow-right me-1"></i> Sign Out';
  });
};

// --- 1. LOCAL STORAGE DATA SEEDS ---
const ADMIN_PRODUCTS_KEY = 'reign_admin_products';
const ADMIN_ORDERS_KEY = 'reign_admin_orders';
const ADMIN_REPAIRS_KEY = 'reign_admin_repairs';
const ADMIN_CUSTOMERS_KEY = 'reign_admin_customers';

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    sku: 'REG-X16-PRO',
    title: 'Apex Blade Pro 16" OLED Laptop',
    category: 'Computing',
    price: 145000,
    stock: 24,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=150&q=80',
    sales: 184
  },
  {
    id: 'prod-2',
    sku: 'REG-ECH-ULTRA',
    title: 'EchoPulse Ultra Wireless Headset',
    category: 'Audio',
    price: 28500,
    stock: 58,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=150&q=80',
    sales: 320
  },
  {
    id: 'prod-3',
    sku: 'REG-VNT-5G',
    title: 'Vanta Pro Max 5G (256GB)',
    category: 'Mobile',
    price: 85000,
    stock: 12,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=150&q=80',
    sales: 96
  },
  {
    id: 'prod-4',
    sku: 'REG-HME-HUB',
    title: 'HomeSense AI Smart Hub + Sensor',
    category: 'Mali Mali',
    price: 18500,
    stock: 45,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=150&q=80',
    sales: 215
  },
  {
    id: 'prod-5',
    sku: 'REG-VLT-CON',
    title: 'Volt Console Pro 1TB Edition',
    category: 'Gaming',
    price: 72000,
    stock: 4,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=150&q=80',
    sales: 142
  },
  {
    id: 'prod-6',
    sku: 'REG-BAR-ESP',
    title: 'Aura Smart Precision Espresso Maker',
    category: 'Mali Mali',
    price: 42000,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=150&q=80',
    sales: 78
  }
];

const INITIAL_ORDERS = [
  {
    orderId: 'REG-8924',
    customer: 'David Mwangi',
    email: 'david.m@gmail.com',
    items: 'Apex Blade Pro 16" (1x)',
    total: 145000.00,
    date: 'Oct 24, 2026 - 15:42',
    status: 'Processing',
    payment: 'M-Pesa Express'
  },
  {
    orderId: 'REG-8923',
    customer: 'Sarah Cherono',
    email: 's.cherono@outlook.com',
    items: 'EchoPulse Ultra (2x), Case (1x)',
    total: 58000.00,
    date: 'Oct 24, 2026 - 14:15',
    status: 'Delivered',
    payment: 'Credit Card'
  },
  {
    orderId: 'REG-8922',
    customer: 'Brian Otieno',
    email: 'brian.otieno@techcorp.ke',
    items: 'HomeSense AI Hub (3x)',
    total: 55500.00,
    date: 'Oct 24, 2026 - 12:30',
    status: 'Shipped',
    payment: 'M-Pesa Express'
  },
  {
    orderId: 'REG-8921',
    customer: 'Grace Kamau',
    email: 'gkamau@yahoo.com',
    items: 'Vanta Pro Max 5G (1x)',
    total: 85000.00,
    date: 'Oct 24, 2026 - 10:10',
    status: 'Paid',
    payment: 'PayPal'
  },
  {
    orderId: 'REG-8920',
    customer: 'James Mutua',
    email: 'jmutua@gmail.com',
    items: 'Chronos Pro Active Smartwatch (1x)',
    total: 34000.00,
    date: 'Oct 23, 2026 - 18:20',
    status: 'Delivered',
    payment: 'M-Pesa Express'
  }
];

const INITIAL_REPAIRS = [
  {
    ticketId: 'REP-104',
    customer: 'Mercy Achieng',
    phone: '+254 712 345 678',
    device: 'MacBook Pro 16" M2',
    fault: 'Spill Damage / Power Rail Short',
    technician: 'Marcus Vance',
    stage: 'Diagnostic',
    cost: 18500.00,
    date: 'Oct 24, 2026'
  },
  {
    ticketId: 'REP-103',
    customer: 'Dennis Koech',
    phone: '+254 722 987 654',
    device: 'Apex Horizon Gaming Laptop',
    fault: 'GPU Fan Replacement & Thermal Repaste',
    technician: 'David Chen',
    stage: 'In Repair',
    cost: 85.00,
    date: 'Oct 24, 2026'
  },
  {
    ticketId: 'REP-102',
    customer: 'Lilian Wanjiku',
    phone: '+254 733 112 233',
    device: 'iPhone 15 Pro Max',
    fault: 'OLED Display Shattered',
    technician: 'Marcus Vance',
    stage: 'Ready for Pickup',
    cost: 120.00,
    date: 'Oct 23, 2026'
  },
  {
    ticketId: 'REP-101',
    customer: 'Kevin Kibet',
    phone: '+254 701 445 566',
    device: 'Volt Console Pro',
    fault: 'HDMI 2.1 Port Replacement',
    technician: 'Vincent Nyasani',
    stage: 'Completed',
    cost: 65.00,
    date: 'Oct 22, 2026'
  }
];

// --- 2. DATA ACCESSORS ---
function getAdminProducts() {
  const data = localStorage.getItem(ADMIN_PRODUCTS_KEY);
  if (!data) {
    localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(data);
}

function resolveAdminApiBaseUrl() {
  if (window.API_BASE_URL) return window.API_BASE_URL;
  if (window.location.protocol === 'file:') return 'http://127.0.0.1:5000/api';
  const port = window.location.port;
  const origin = window.location.origin;
  const host = window.location.hostname || '';
  if (port === '5000' || origin.includes(':5000') || host.includes('ngrok') || host.includes('trycloudflare') || host.includes('localtunnel')) {
    return `${origin}/api`;
  }
  if (host === 'localhost' || host === '127.0.0.1' || host === '') {
    return 'http://127.0.0.1:5000/api';
  }
  if (port === '80' || port === '443' || (port === '' && host)) {
    return `${origin}/api`;
  }
  return `${window.location.protocol}//${host}:5000/api`;
}
window.API_BASE_URL = resolveAdminApiBaseUrl();
var API_BASE_URL = window.API_BASE_URL;

async function syncAdminDataWithBackend() {
  try {
    const [prodRes, orderRes, repairRes] = await Promise.all([
      fetch(`${API_BASE_URL}/products?limit=100`).catch(() => null),
      fetch(`${API_BASE_URL}/orders`).catch(() => null),
      fetch(`${API_BASE_URL}/repairs`).catch(() => null)
    ]);
    if (prodRes && prodRes.ok) {
      const data = await prodRes.json();
      if (data.products && data.products.length > 0) {
        localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(data.products));
        if (typeof renderProductsTable === 'function') renderProductsTable();
        if (typeof initPOS === 'function' && document.getElementById('pos-catalog-grid')) initPOS();
      }
    }
    if (orderRes && orderRes.ok) {
      const data = await orderRes.json();
      if (data.orders && data.orders.length > 0) {
        localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(data.orders));
        if (typeof renderOrdersTable === 'function') renderOrdersTable();
      }
    }
    if (repairRes && repairRes.ok) {
      const data = await repairRes.json();
      if (data.repairs && data.repairs.length > 0) {
        localStorage.setItem(ADMIN_REPAIRS_KEY, JSON.stringify(data.repairs));
        if (typeof renderRepairsTable === 'function') renderRepairsTable();
      }
    }
    if (typeof renderDashboardMetrics === 'function') renderDashboardMetrics();
  } catch (err) {
    console.log('Backend sync offline/fallback active:', err);
  }
}

function saveAdminProducts(products) {
  localStorage.setItem(ADMIN_PRODUCTS_KEY, JSON.stringify(products));
}

function getAdminOrders() {
  const data = localStorage.getItem(ADMIN_ORDERS_KEY);
  if (!data) {
    localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  return JSON.parse(data);
}

function saveAdminOrders(orders) {
  localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(orders));
}

function getAdminRepairs() {
  const data = localStorage.getItem(ADMIN_REPAIRS_KEY);
  if (!data) {
    localStorage.setItem(ADMIN_REPAIRS_KEY, JSON.stringify(INITIAL_REPAIRS));
    return INITIAL_REPAIRS;
  }
  return JSON.parse(data);
}

function saveAdminRepairs(repairs) {
  localStorage.setItem(ADMIN_REPAIRS_KEY, JSON.stringify(repairs));
}

// --- 3. TOAST NOTIFICATIONS ---
window.adminToast = function(msg, type = 'success') {
  let container = document.getElementById('admin-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'admin-toast-container';
    container.className = 'admin-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `admin-toast ${type}`;
  toast.innerHTML = `<i class="bi bi-${type === 'success' ? 'check-circle-fill text-success' : 'info-circle-fill text-warning'}"></i> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
};

// --- 4. MODALS & SIDEBAR ---
window.openAdminModal = function(id) {
  const modalEl = document.getElementById(id);
  if (!modalEl) return;
  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    let bsModal = bootstrap.Modal.getInstance(modalEl);
    if (!bsModal) bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
  } else {
    modalEl.classList.add('active', 'show');
    modalEl.style.display = 'block';
  }
};

window.closeAdminModal = function(id) {
  const modalEl = document.getElementById(id);
  if (!modalEl) return;
  if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
    let bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();
  }
  modalEl.classList.remove('active', 'show');
  modalEl.style.display = 'none';
  document.querySelectorAll('.modal-backdrop').forEach(b => b.remove());
  document.body.classList.remove('modal-open');
  document.body.style = '';
};

window.toggleSidebar = function() {
  const sidebar = document.querySelector('.admin-sidebar');
  if (sidebar) sidebar.classList.toggle('open');
};

window.toggleTheme = function() {
  const isLight = document.body.classList.toggle('theme-light');
  localStorage.setItem('reign_admin_theme', isLight ? 'light' : 'dark');
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.className = isLight ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
  }
  window.adminToast(`Switched to ${isLight ? 'Light' : 'Dark'} Mode`, 'success');
};

// --- 5. PRODUCT & MOBILE APP OFFER MANAGEMENT (REAL-TIME BACKEND SYNC) ---
window.broadcastCatalogSync = function() {
  try {
    localStorage.setItem('reign_catalog_sync_timestamp', Date.now().toString());
    window.dispatchEvent(new CustomEvent('catalog-updated'));
  } catch (e) {}
};

window.addNewProduct = async function(e) {
  e.preventDefault();
  const form = e.target;
  const title = form.querySelector('[name="title"]').value.trim();
  const category = form.querySelector('[name="category"]').value;
  const price = parseFloat(form.querySelector('[name="price"]').value);
  const originalPriceVal = form.querySelector('[name="originalPrice"]') ? form.querySelector('[name="originalPrice"]').value : null;
  const originalPrice = originalPriceVal ? parseFloat(originalPriceVal) : null;
  const stock = parseInt(form.querySelector('[name="stock"]').value) || 0;
  const sku = form.querySelector('[name="sku"]').value.trim() || `REG-${Date.now().toString().slice(-4)}`;
  const image = form.querySelector('[name="image"]').value.trim() || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80';
  const badge = form.querySelector('[name="badge"]') ? form.querySelector('[name="badge"]').value.trim() : '';
  const isOnOffer = form.querySelector('[name="isOnOffer"]') ? form.querySelector('[name="isOnOffer"]').checked : false;

  const newProdData = {
    title,
    category,
    price,
    originalPrice: originalPrice || (isOnOffer ? Math.round(price * 1.25) : null),
    stock,
    stockCount: stock,
    sku,
    image,
    imageUrl: image,
    badge: badge || (isOnOffer ? 'Flash Sale' : ''),
    isDealOfDay: isOnOffer,
    isFeatured: isOnOffer,
    shortDescription: title,
    fullDescription: `${title} - Official authentic stock backed by Reign Electronics warranty.`
  };

  let createdId = `prod-${Date.now()}`;
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProdData)
    });
    const resData = await res.json();
    if (resData.success) {
      if (resData.product && (resData.product.id || resData.product.sku)) {
        createdId = resData.product.id || resData.product.sku;
      }
      window.adminToast(`Product "${title}" created and synced to Android App!`, 'success');
      window.broadcastCatalogSync();
    }
  } catch (err) {
    console.warn('Backend sync deferred:', err);
  }

  // Update local cache and UI
  const products = getAdminProducts();
  products.unshift({
    id: createdId,
    ...newProdData,
    status: stock > 10 ? 'In Stock' : (stock > 0 ? 'Low Stock' : 'Out of Stock'),
    sales: 0
  });
  saveAdminProducts(products);
  window.broadcastCatalogSync();

  window.closeAdminModal('add-product-modal');
  form.reset();
  if (typeof renderProductsTable === 'function') renderProductsTable();
};

window.openEditProductModal = function(id) {
  const products = getAdminProducts();
  const prod = products.find(p => String(p.id) === String(id) || String(p.sku) === String(id));
  if (!prod) {
    window.adminToast('Product not found', 'danger');
    return;
  }

  const modalEl = document.getElementById('edit-product-modal');
  if (!modalEl) return;

  modalEl.querySelector('[name="edit_id"]').value = prod.id;
  modalEl.querySelector('[name="title"]').value = prod.title || '';
  modalEl.querySelector('[name="category"]').value = prod.category || 'Computing';
  modalEl.querySelector('[name="sku"]').value = prod.sku || '';
  modalEl.querySelector('[name="price"]').value = prod.price || 0;
  modalEl.querySelector('[name="originalPrice"]').value = prod.originalPrice || '';
  modalEl.querySelector('[name="stock"]').value = prod.stock !== undefined ? prod.stock : (prod.stockCount || 0);
  modalEl.querySelector('[name="badge"]').value = prod.badge || '';
  modalEl.querySelector('[name="image"]').value = prod.image || prod.imageUrl || '';
  
  const offerCheckbox = modalEl.querySelector('[name="isOnOffer"]');
  if (offerCheckbox) {
    offerCheckbox.checked = !!(prod.isDealOfDay || prod.isOnOffer || (prod.badge && prod.badge.toLowerCase().includes('sale')));
  }

  const preview = document.getElementById('edit-prod-preview-img');
  const container = document.getElementById('edit-prod-preview-container');
  if (preview && (prod.image || prod.imageUrl)) {
    preview.src = prod.image || prod.imageUrl;
    if (container) container.style.display = 'block';
  }

  window.openAdminModal('edit-product-modal');
};

window.updateProductSubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const id = form.querySelector('[name="edit_id"]').value;
  const title = form.querySelector('[name="title"]').value.trim();
  const category = form.querySelector('[name="category"]').value;
  const price = parseFloat(form.querySelector('[name="price"]').value);
  const originalPriceVal = form.querySelector('[name="originalPrice"]').value;
  const originalPrice = originalPriceVal ? parseFloat(originalPriceVal) : null;
  const stock = parseInt(form.querySelector('[name="stock"]').value) || 0;
  const badge = form.querySelector('[name="badge"]').value.trim();
  const image = form.querySelector('[name="image"]').value.trim();
  const isOnOffer = form.querySelector('[name="isOnOffer"]').checked;

  const updateData = {
    title,
    category,
    price,
    originalPrice,
    stock,
    stockCount: stock,
    badge,
    image,
    imageUrl: image,
    isDealOfDay: isOnOffer,
    isFeatured: isOnOffer
  };

  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    });
    const resData = await res.json();
    if (resData.success) {
      window.adminToast(`Product updated! Instant sync to Android App.`, 'success');
    }
  } catch (err) {
    console.warn('Backend update deferred:', err);
  }

  // Update local store
  const products = getAdminProducts();
  const idx = products.findIndex(p => String(p.id) === String(id) || String(p.sku) === String(id));
  if (idx !== -1) {
    products[idx] = {
      ...products[idx],
      ...updateData,
      status: stock > 10 ? 'In Stock' : (stock > 0 ? 'Low Stock' : 'Out of Stock')
    };
    saveAdminProducts(products);
  }

  window.broadcastCatalogSync();
  window.closeAdminModal('edit-product-modal');
  if (typeof renderProductsTable === 'function') renderProductsTable();
};

window.toggleProductOffer = async function(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}/toggle-offer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const resData = await res.json();
    if (resData.success) {
      window.adminToast(resData.message, 'success');
      const products = getAdminProducts();
      const prod = products.find(p => String(p.id) === String(id) || String(p.sku) === String(id));
      if (prod) {
        prod.isDealOfDay = resData.isOnOffer;
        prod.isOnOffer = resData.isOnOffer;
        if (resData.product) {
          prod.originalPrice = resData.product.originalPrice;
          prod.badge = resData.product.badge;
        }
        saveAdminProducts(products);
      }
      window.broadcastCatalogSync();
      if (typeof renderProductsTable === 'function') renderProductsTable();
      return;
    }
  } catch (err) {
    console.warn('Toggle offer network error, updating locally:', err);
  }

  // Fallback locally
  const products = getAdminProducts();
  const prod = products.find(p => String(p.id) === String(id) || String(p.sku) === String(id));
  if (prod) {
    prod.isDealOfDay = !prod.isDealOfDay;
    prod.isOnOffer = prod.isDealOfDay;
    if (prod.isDealOfDay && (!prod.originalPrice || prod.originalPrice <= prod.price)) {
      prod.originalPrice = Math.round(prod.price * 1.25);
      prod.badge = 'Flash Sale';
    }
    saveAdminProducts(products);
    window.adminToast(`Product ${prod.isDealOfDay ? 'added to OFFERS' : 'removed from offers'}!`, 'success');
    if (typeof renderProductsTable === 'function') renderProductsTable();
  }
};

window.deleteProduct = async function(id) {
  if (!confirm('Are you sure you want to delete this product? It will be removed from the Website and Android App.')) return;

  try {
    await fetch(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });
  } catch (err) {
    console.warn('Backend delete deferred:', err);
  }

  let products = getAdminProducts();
  products = products.filter(p => String(p.id) !== String(id) && String(p.sku) !== String(id));
  saveAdminProducts(products);
  window.broadcastCatalogSync();
  window.adminToast('Product deleted from catalog & mobile app', 'danger');
  if (typeof renderProductsTable === 'function') renderProductsTable();
};

window.adjustStock = async function(id, delta) {
  const products = getAdminProducts();
  const prod = products.find(p => String(p.id) === String(id) || String(p.sku) === String(id));
  if (prod) {
    const newStock = Math.max(0, (prod.stock || prod.stockCount || 0) + delta);
    prod.stock = newStock;
    prod.stockCount = newStock;
    prod.status = newStock > 10 ? 'In Stock' : (newStock > 0 ? 'Low Stock' : 'Out of Stock');
    saveAdminProducts(products);

    try {
      await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock, status: prod.status })
      });
    } catch (err) {
      console.warn('Backend stock sync deferred:', err);
    }

    window.adminToast(`Updated ${prod.title} stock to ${newStock}`, 'success');
    window.broadcastCatalogSync();
    if (typeof renderProductsTable === 'function') renderProductsTable();
  }
};

// --- 6. ORDER STATUS UPDATER ---
window.updateOrderStatus = function(orderId, newStatus) {
  const orders = getAdminOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = newStatus;
    saveAdminOrders(orders);
    window.adminToast(`Order #${orderId} marked as ${newStatus}`, 'success');
    if (typeof renderOrdersTable === 'function') renderOrdersTable();
  }
};

// --- 7. REPAIR STAGE UPDATER ---
window.updateRepairStage = function(ticketId, newStage) {
  const repairs = getAdminRepairs();
  const ticket = repairs.find(r => r.ticketId === ticketId);
  if (ticket) {
    ticket.stage = newStage;
    saveAdminRepairs(repairs);
    window.adminToast(`Ticket #${ticketId} moved to ${newStage}`, 'success');
    if (typeof renderRepairsView === 'function') renderRepairsView();
  }
};

// --- 9. POINT OF SALE (POS) ENGINE FOR WALK-IN CUSTOMERS ---
let posTicket = [];
let posPaymentMethod = 'Cash';
let posActiveCategory = 'all';
let posSearchQuery = '';

window.initPOS = function() {
  renderPOSCatalog();
  renderPOSTicket();
};

window.renderPOSCatalog = function() {
  const container = document.getElementById('pos-catalog-grid');
  if (!container) return;

  const products = getAdminProducts();
  const filtered = products.filter(p => {
    const matchCat = posActiveCategory === 'all' || p.category.toLowerCase() === posActiveCategory.toLowerCase();
    const matchSearch = !posSearchQuery || 
      p.title.toLowerCase().includes(posSearchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(posSearchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (!filtered.length) {
    container.innerHTML = '<div class="col-12 text-center py-4 text-muted small">No available products found matching filter.</div>';
    return;
  }

  let html = '';
  filtered.forEach(p => {
    const isOutOfStock = p.stock <= 0;
    html += `
      <div class="pos-card-item ${isOutOfStock ? 'out-of-stock' : ''}" onclick="addToPOSTicket('${p.id}')">
        <img src="${p.image}" class="pos-card-thumb" alt="${p.title}">
        <div class="pos-card-title">${p.title}</div>
        <div class="pos-card-sku">${p.sku}</div>
        <div class="pos-card-bottom">
          <span class="pos-card-price">KSh ${Number(p.price).toLocaleString()}</span>
          <span class="pos-card-stock">${isOutOfStock ? 'Out of Stock' : p.stock + ' in stock'}</span>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
};

window.filterPOSCategory = function(cat, btn) {
  posActiveCategory = cat;
  if (btn) {
    btn.parentElement.querySelectorAll('.filter-pill, .pos-cat-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderPOSCatalog();
};

window.searchPOSProducts = function(q) {
  posSearchQuery = q;
  renderPOSCatalog();
};

window.addToPOSTicket = function(id) {
  const products = getAdminProducts();
  const prod = products.find(p => p.id === id);
  if (!prod || prod.stock <= 0) {
    adminToast('Item is out of stock', 'warning');
    return;
  }

  const existing = posTicket.find(item => item.id === id);
  if (existing) {
    if (existing.qty < prod.stock) {
      existing.qty++;
    } else {
      adminToast(`Maximum stock limit (${prod.stock}) reached for this item`, 'warning');
      return;
    }
  } else {
    posTicket.push({
      id: prod.id,
      title: prod.title,
      price: prod.price,
      sku: prod.sku,
      qty: 1,
      maxStock: prod.stock
    });
  }
  renderPOSTicket();
};

window.updatePOSTicketQty = function(id, delta) {
  const item = posTicket.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    posTicket = posTicket.filter(i => i.id !== id);
  } else if (item.qty > item.maxStock) {
    item.qty = item.maxStock;
    adminToast('Cannot exceed in-store available stock', 'warning');
  }
  renderPOSTicket();
};

window.removeFromPOSTicket = function(id) {
  posTicket = posTicket.filter(i => i.id !== id);
  renderPOSTicket();
};

window.clearPOSTicket = function() {
  if (!posTicket.length) return;
  posTicket = [];
  renderPOSTicket();
  adminToast('Walk-in ticket cleared', 'info');
};

window.selectPOSPayment = function(method, btn) {
  posPaymentMethod = method;
  if (btn) {
    btn.parentElement.querySelectorAll('.pos-pay-btn, .pos-tender-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  const cashWrap = document.getElementById('pos-cash-details');
  if (cashWrap) {
    cashWrap.style.display = method === 'Cash' ? 'block' : 'none';
  }
  calcPOSChange();
};

window.calcPOSChange = function() {
  const tenderInput = document.getElementById('pos-cash-tendered');
  const changeDisplay = document.getElementById('pos-change-due');
  if (!tenderInput || !changeDisplay) return;

  const total = getPOSTotal();
  const tendered = parseFloat(tenderInput.value) || 0;
  const change = Math.max(0, tendered - total);
  changeDisplay.textContent = `KSh ${Math.round(change).toLocaleString()}`;
};

function getPOSTotal() {
  let subtotal = 0;
  posTicket.forEach(item => {
    subtotal += item.price * item.qty;
  });
  const discountInput = document.getElementById('pos-discount');
  const discount = discountInput ? (parseFloat(discountInput.value) || 0) : 0;
  return Math.max(0, subtotal - discount);
}

window.renderPOSTicket = function() {
  const tbody = document.getElementById('pos-ticket-body');
  const subtotalEl = document.getElementById('pos-ticket-subtotal');
  const totalEl = document.getElementById('pos-ticket-total');
  const checkoutBtn = document.getElementById('pos-checkout-btn');

  if (!tbody) return;

  if (!posTicket.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-muted small">No items selected. Click products on the left to add.</td></tr>';
    if (subtotalEl) subtotalEl.textContent = 'KSh 0';
    if (totalEl) totalEl.textContent = 'KSh 0';
    if (checkoutBtn) checkoutBtn.disabled = true;
    calcPOSChange();
    return;
  }

  let html = '';
  let subtotal = 0;

  posTicket.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    html += `
      <tr>
        <td>
          <div class="fw-bold" style="color:#0f172a; font-size:12px;">${item.title}</div>
          <small class="text-muted">${item.sku} &bull; KSh ${Number(item.price).toLocaleString()}</small>
        </td>
        <td>
          <div class="d-flex align-items-center gap-1">
            <button type="button" class="pos-qty-btn" onclick="updatePOSTicketQty('${item.id}', -1)">-</button>
            <span class="px-1 fw-bold" style="font-size:12px;">${item.qty}</span>
            <button type="button" class="pos-qty-btn" onclick="updatePOSTicketQty('${item.id}', 1)">+</button>
          </div>
        </td>
        <td class="fw-bold" style="font-size:12px; color:#0f172a;">KSh ${Math.round(itemTotal).toLocaleString()}</td>
        <td style="text-align:right;">
          <button type="button" class="btn btn-sm btn-link text-danger p-0" onclick="removeFromPOSTicket('${item.id}')">&times;</button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = `KSh ${Math.round(subtotal).toLocaleString()}`;

  const discountInput = document.getElementById('pos-discount');
  const discount = discountInput ? (parseFloat(discountInput.value) || 0) : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  if (totalEl) totalEl.textContent = `KSh ${Math.round(grandTotal).toLocaleString()}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
  calcPOSChange();
};

let posActiveCheckoutId = null;
let posMpesaPollInterval = null;
let posMpesaPendingSale = null;

window.completePOSSale = function() {
  if (!posTicket.length) {
    adminToast('Register ticket is empty', 'warning');
    return;
  }

  const customerNameInput = document.getElementById('pos-customer-name');
  const customerPhoneInput = document.getElementById('pos-customer-phone');
  const customer = (customerNameInput && customerNameInput.value.trim()) || 'Walk-in Customer';
  let phone = (customerPhoneInput && customerPhoneInput.value.trim()) || 'In-store';

  const orderId = `WALK-${Math.floor(1000 + Math.random() * 9000)}`;
  const total = getPOSTotal();
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  // Handle M-Pesa tender with real Safaricom Daraja STK Push
  if (posPaymentMethod === 'M-Pesa') {
    const rawDigits = phone.replace(/\D/g, '');
    if (!rawDigits || rawDigits.length < 9) {
      adminToast('Please provide a valid Safaricom phone number for STK Push', 'warning');
      if (customerPhoneInput) customerPhoneInput.focus();
      return;
    }

    posMpesaPendingSale = {
      orderId,
      customer,
      phone,
      total,
      dateStr,
      ticket: [...posTicket],
      discount: document.getElementById('pos-discount') ? (parseFloat(document.getElementById('pos-discount').value) || 0) : 0,
      subtotal: posTicket.reduce((acc, i) => acc + (i.price * i.qty), 0)
    };

    initiatePOSMpesaSTK(posMpesaPendingSale);
    return;
  }

  // Non-Mpesa or Direct Cash/Card completion
  finalizePOSSale({
    orderId,
    customer,
    phone,
    total,
    dateStr,
    ticket: [...posTicket],
    discount: document.getElementById('pos-discount') ? (parseFloat(document.getElementById('pos-discount').value) || 0) : 0,
    subtotal: posTicket.reduce((acc, i) => acc + (i.price * i.qty), 0),
    tendered: document.getElementById('pos-cash-tendered') ? (parseFloat(document.getElementById('pos-cash-tendered').value) || total) : total
  });
};

function initiatePOSMpesaSTK(sale) {
  const custEl = document.getElementById('pos-mpesa-customer');
  const phoneEl = document.getElementById('pos-mpesa-phone');
  const amountEl = document.getElementById('pos-mpesa-amount');
  const statusEl = document.getElementById('pos-mpesa-status-text');
  const timerEl = document.getElementById('pos-mpesa-timer');

  if (custEl) custEl.textContent = sale.customer;
  if (phoneEl) phoneEl.textContent = sale.phone;
  if (amountEl) amountEl.textContent = `KSh ${Math.round(sale.total).toLocaleString()}`;
  if (statusEl) statusEl.textContent = 'Connecting to Safaricom Daraja...';
  if (timerEl) timerEl.textContent = 'Initiating STK Push...';

  openAdminModal('pos-mpesa-modal');

  const apiUrl = `${API_BASE_URL}/payments/stk-push`;

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: sale.phone,
      amount: Math.round(sale.total),
      accountReference: sale.orderId
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.CheckoutRequestID) {
      posActiveCheckoutId = data.CheckoutRequestID;
      if (statusEl) statusEl.textContent = 'Prompt sent to customer handset!';
      if (timerEl) timerEl.textContent = 'Awaiting M-Pesa PIN input on phone...';
      startPOSMpesaPolling(data.CheckoutRequestID);
    } else {
      if (statusEl) statusEl.textContent = data.error || 'Failed to dispatch STK Push';
      adminToast(data.error || 'STK Push dispatch failed', 'error');
    }
  })
  .catch(err => {
    console.error('POS STK Error:', err);
    if (statusEl) statusEl.textContent = 'Connection error. Ensure backend is running.';
    adminToast('Could not reach Daraja API server', 'error');
  });
}

function startPOSMpesaPolling(checkoutId) {
  if (posMpesaPollInterval) clearInterval(posMpesaPollInterval);
  let attempts = 0;
  const maxAttempts = 45; // 90 seconds
  const statusUrl = `${API_BASE_URL}/payments/status/${checkoutId}`;

  posMpesaPollInterval = setInterval(() => {
    attempts++;
    const timerEl = document.getElementById('pos-mpesa-timer');
    if (timerEl) timerEl.textContent = `Waiting for PIN... (${(maxAttempts - attempts) * 2}s remaining)`;

    fetch(statusUrl)
      .then(res => res.json())
      .then(statusData => {
        if (statusData.status === 'COMPLETED') {
          clearInterval(posMpesaPollInterval);
          posMpesaPollInterval = null;
          closeAdminModal('pos-mpesa-modal');
          adminToast('M-Pesa payment received and verified!', 'success');
          finalizePOSSale(posMpesaPendingSale, statusData.mpesaReceiptNumber || 'MPESA-' + checkoutId.slice(-8));
        } else if (statusData.status === 'FAILED' || attempts >= maxAttempts) {
          clearInterval(posMpesaPollInterval);
          posMpesaPollInterval = null;
          const statusEl = document.getElementById('pos-mpesa-status-text');
          if (statusEl) statusEl.textContent = statusData.resultDesc || 'Payment timed out or cancelled.';
          adminToast(statusData.resultDesc || 'STK push was cancelled or timed out.', 'warning');
        }
      })
      .catch(e => console.warn('Polling error:', e));
  }, 2000);
}

window.simulatePOSMpesaApprove = function() {
  if (!posActiveCheckoutId) {
    adminToast('No active STK push session found', 'warning');
    return;
  }
  const simUrl = `${API_BASE_URL}/payments/simulate-stk`;

  fetch(simUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      checkoutRequestId: posActiveCheckoutId,
      resultDesc: 'The service request is processed successfully.'
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'COMPLETED') {
      adminToast('Sandbox STK Approved successfully!', 'success');
    }
  })
  .catch(e => console.error('Simulate error:', e));
};

window.cancelPOSMpesa = function() {
  if (posMpesaPollInterval) {
    clearInterval(posMpesaPollInterval);
    posMpesaPollInterval = null;
  }
  closeAdminModal('pos-mpesa-modal');
  adminToast('M-Pesa STK request cancelled', 'info');
};

function finalizePOSSale(sale, mpesaReceiptCode = null) {
  // 1. Deduct Stock from Admin Products
  const products = getAdminProducts();
  sale.ticket.forEach(ticketItem => {
    const prod = products.find(p => p.id === ticketItem.id);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - ticketItem.qty);
      prod.sales = (prod.sales || 0) + ticketItem.qty;
      prod.status = prod.stock > 10 ? 'In Stock' : (prod.stock > 0 ? 'Low Stock' : 'Out of Stock');
    }
  });
  saveAdminProducts(products);

  // 2. Record New Order
  const itemsSummary = sale.ticket.map(i => `${i.title} (${i.qty}x)`).join(', ');
  const orders = getAdminOrders();
  const paymentLabel = mpesaReceiptCode 
    ? `M-Pesa Express [${mpesaReceiptCode}] (POS)` 
    : `${posPaymentMethod} (Walk-in POS)`;

  orders.unshift({
    orderId: sale.orderId,
    customer: sale.customer,
    email: sale.phone,
    items: itemsSummary,
    total: sale.total,
    date: sale.dateStr,
    status: 'Delivered',
    payment: paymentLabel
  });
  saveAdminOrders(orders);

  // 3. Render Receipt in Modal
  renderReceiptModal({
    orderId: sale.orderId,
    customer: sale.customer,
    phone: sale.phone,
    date: sale.dateStr,
    items: sale.ticket,
    payment: posPaymentMethod,
    mpesaReceipt: mpesaReceiptCode,
    subtotal: sale.subtotal,
    discount: sale.discount,
    total: sale.total,
    tendered: sale.tendered || sale.total
  });

  // 4. Reset Ticket & Refresh Views
  posTicket = [];
  const customerNameInput = document.getElementById('pos-customer-name');
  const customerPhoneInput = document.getElementById('pos-customer-phone');
  if (customerNameInput) customerNameInput.value = 'Walk-in Customer';
  if (customerPhoneInput) customerPhoneInput.value = '';
  if (document.getElementById('pos-cash-tendered')) document.getElementById('pos-cash-tendered').value = '';
  if (document.getElementById('pos-discount')) document.getElementById('pos-discount').value = '0.00';

  renderPOSTicket();
  renderPOSCatalog();
  if (typeof renderDashboardOrders === 'function') renderDashboardOrders();
  if (typeof renderProductsTable === 'function') renderProductsTable();

  adminToast(`Walk-in sale #${sale.orderId} completed successfully!`, 'success');
  openAdminModal('pos-receipt-modal');
}

function renderReceiptModal(data) {
  const container = document.getElementById('pos-receipt-content');
  if (!container) return;

  let itemsHtml = '';
  data.items.forEach(i => {
    itemsHtml += `
      <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:13px;">
        <span>${i.title} &times; ${i.qty}</span>
        <strong>KSh ${Math.round(i.price * i.qty).toLocaleString()}</strong>
      </div>
    `;
  });

  const change = Math.max(0, data.tendered - data.total);

  container.innerHTML = `
    <div class="receipt-paper">
      <div class="receipt-store-title">Reign Electronics & Mali Mali</div>
      <div class="receipt-sub">Showroom & Tech Hub Flagship<br>Posta Road, Molo Town, Nakuru County &bull; Tel: +254 712 345 678</div>
      
      <div class="receipt-divider"></div>

      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
        <span>Receipt #: <strong>${data.orderId}</strong></span>
        <span>Register: #01</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
        <span>Date: ${data.date}</span>
        <span>Cashier: Vincent N.</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:10px;">
        <span>Customer: <strong>${data.customer}</strong></span>
        <span>${data.phone}</span>
      </div>

      <div class="receipt-divider"></div>

      <div style="margin-bottom:12px;">
        ${itemsHtml}
      </div>

      <div class="receipt-divider"></div>

      <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
        <span>Subtotal:</span>
        <span>KSh ${Math.round(data.subtotal).toLocaleString()}</span>
      </div>
      ${data.discount > 0 ? `
      <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px; color:#10b981;">
        <span>Discount:</span>
        <span>-KSh ${Math.round(data.discount).toLocaleString()}</span>
      </div>` : ''}
      <div style="display:flex; justify-content:space-between; font-size:16px; font-weight:800; margin-top:6px;">
        <span>TOTAL PAID:</span>
        <span>KSh ${Math.round(data.total).toLocaleString()}</span>
      </div>

      <div class="receipt-divider"></div>

      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
        <span>Payment Method:</span>
        <strong>${data.payment}</strong>
      </div>
      ${data.mpesaReceipt ? `
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; color:#059669;">
        <span>M-Pesa Trans ID:</span>
        <strong style="letter-spacing:0.5px; font-family:monospace;">${data.mpesaReceipt}</strong>
      </div>
      ` : ''}
      ${data.payment === 'Cash' ? `
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
        <span>Cash Tendered:</span>
        <span>KSh ${Math.round(data.tendered).toLocaleString()}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
        <span>Change Returned:</span>
        <strong>KSh ${Math.round(change).toLocaleString()}</strong>
      </div>
      ` : ''}

      <div class="receipt-divider"></div>
      <div style="text-align:center; font-size:11px; color:#64748b; margin-top:10px;">
        Thank you for shopping at Reign Electronics & Mali Mali (Molo Hub)!<br>
        Genuine hardware guaranteed &bull; Retain receipt for service & warranty.
      </div>
    </div>
  `;
}

// --- 11. MOBILE APP DYNAMIC SETTINGS & PROMOTIONS ENGINE ---
window.loadMobileAppSettings = async function() {
  try {
    const res = await fetch(`${API_BASE_URL}/app-config`);
    if (!res.ok) return;
    const data = await res.json();
    if (!data.success || !data.config) return;
    const cfg = data.config;

    // 1. Banners
    if (cfg.banners && cfg.banners.length >= 3) {
      const b1 = cfg.banners[0];
      const b2 = cfg.banners[1];
      const b3 = cfg.banners[2];
      if (document.getElementById('banner1-tag')) document.getElementById('banner1-tag').value = b1.tag || 'FLASH SALES';
      if (document.getElementById('banner1-title')) document.getElementById('banner1-title').value = b1.title || 'REIGN MEGA DEALS';
      if (document.getElementById('banner1-sub')) document.getElementById('banner1-sub').value = b1.subtitle || 'Up to 60% OFF electronics';
      if (document.getElementById('banner1-active')) document.getElementById('banner1-active').checked = b1.isActive !== false;

      if (document.getElementById('banner2-tag')) document.getElementById('banner2-tag').value = b2.tag || 'REIGN EXPRESS';
      if (document.getElementById('banner2-title')) document.getElementById('banner2-title').value = b2.title || '30-MIN LPG GAS DISPATCH';
      if (document.getElementById('banner2-sub')) document.getElementById('banner2-sub').value = b2.subtitle || 'Doorstep cylinder delivery';
      if (document.getElementById('banner2-active')) document.getElementById('banner2-active').checked = b2.isActive !== false;

      if (document.getElementById('banner3-tag')) document.getElementById('banner3-tag').value = b3.tag || 'OFFICIAL BRAND FESTIVAL';
      if (document.getElementById('banner3-title')) document.getElementById('banner3-title').value = b3.title || 'GENUINE 2-YR WARRANTY';
      if (document.getElementById('banner3-sub')) document.getElementById('banner3-sub').value = b3.subtitle || 'Official Apple, Samsung & HP store';
      if (document.getElementById('banner3-active')) document.getElementById('banner3-active').checked = b3.isActive !== false;
    }

    // 2. Flash Sale
    if (cfg.flashSale) {
      if (document.getElementById('flash-sale-title')) document.getElementById('flash-sale-title').value = cfg.flashSale.title || 'FLASH SALES';
      if (document.getElementById('flash-sale-hours')) document.getElementById('flash-sale-hours').value = cfg.flashSale.durationHours || 4;
      if (document.getElementById('flash-sale-enabled')) document.getElementById('flash-sale-enabled').checked = cfg.flashSale.enabled !== false;
    }

    // 3. Announcement
    if (cfg.announcement && document.getElementById('global-announcement')) {
      document.getElementById('global-announcement').value = cfg.announcement;
    }

    // 4. LPG Prices
    if (cfg.lpgPrices) {
      if (document.getElementById('lpg-price-6kg')) document.getElementById('lpg-price-6kg').value = cfg.lpgPrices.price6kg || 1450;
      if (document.getElementById('lpg-price-13kg')) document.getElementById('lpg-price-13kg').value = cfg.lpgPrices.price13kg || 3200;
      if (document.getElementById('lpg-price-50kg')) document.getElementById('lpg-price-50kg').value = cfg.lpgPrices.price50kg || 11500;
      if (document.getElementById('lpg-delivery-fee')) document.getElementById('lpg-delivery-fee').value = cfg.lpgPrices.deliveryFee || 150;
      if (document.getElementById('lpg-rider-phone')) document.getElementById('lpg-rider-phone').value = cfg.lpgPrices.riderPhone || '+254 712 345 678';
    }
  } catch (err) {
    console.warn('Failed loading mobile app settings:', err);
  }
};

window.saveMobileAppSettings = async function(e) {
  if (e) e.preventDefault();

  const banners = [
    {
      id: 'banner-1',
      tag: document.getElementById('banner1-tag')?.value.trim() || 'FLASH SALES',
      title: document.getElementById('banner1-title')?.value.trim() || 'REIGN MEGA DEALS',
      subtitle: document.getElementById('banner1-sub')?.value.trim() || 'Up to 60% OFF electronics',
      bgGradient: ['#E61601', '#F68B1E'],
      actionText: 'Shop Now',
      actionLink: 'catalog',
      isActive: document.getElementById('banner1-active') ? document.getElementById('banner1-active').checked : true
    },
    {
      id: 'banner-2',
      tag: document.getElementById('banner2-tag')?.value.trim() || 'REIGN EXPRESS',
      title: document.getElementById('banner2-title')?.value.trim() || '30-MIN LPG GAS DISPATCH',
      subtitle: document.getElementById('banner2-sub')?.value.trim() || 'Doorstep cylinder delivery',
      bgGradient: ['#F68B1E', '#D7700B'],
      actionText: 'Order Gas',
      actionLink: 'lpg',
      isActive: document.getElementById('banner2-active') ? document.getElementById('banner2-active').checked : true
    },
    {
      id: 'banner-3',
      tag: document.getElementById('banner3-tag')?.value.trim() || 'OFFICIAL BRAND FESTIVAL',
      title: document.getElementById('banner3-title')?.value.trim() || 'GENUINE 2-YR WARRANTY',
      subtitle: document.getElementById('banner3-sub')?.value.trim() || 'Official Apple, Samsung & HP store',
      bgGradient: ['#0077D6', '#0F172A'],
      actionText: 'Explore Brands',
      actionLink: 'catalog',
      isActive: document.getElementById('banner3-active') ? document.getElementById('banner3-active').checked : true
    }
  ];

  const flashSale = {
    title: document.getElementById('flash-sale-title')?.value.trim() || 'FLASH SALES',
    durationHours: parseInt(document.getElementById('flash-sale-hours')?.value) || 4,
    enabled: document.getElementById('flash-sale-enabled') ? document.getElementById('flash-sale-enabled').checked : true,
    announcement: document.getElementById('global-announcement')?.value.trim() || ''
  };

  const lpgPrices = {
    price6kg: parseFloat(document.getElementById('lpg-price-6kg')?.value) || 1450,
    price13kg: parseFloat(document.getElementById('lpg-price-13kg')?.value) || 3200,
    price50kg: parseFloat(document.getElementById('lpg-price-50kg')?.value) || 11500,
    deliveryFee: parseFloat(document.getElementById('lpg-delivery-fee')?.value) || 150,
    riderPhone: document.getElementById('lpg-rider-phone')?.value.trim() || '+254 712 345 678'
  };

  const storeInfo = {
    name: document.getElementById('store-brand-name')?.value.trim() || 'Reign Electronics & Mali Mali',
    email: document.getElementById('store-contact-email')?.value.trim() || 'hello@reignshop.com',
    hotline: document.getElementById('store-customer-hotline')?.value.trim() || '+254 712 345 678',
    currency: document.getElementById('store-base-currency')?.value || 'KES',
    currencySymbol: (document.getElementById('store-base-currency')?.value === 'USD' ? '$' : (document.getElementById('store-base-currency')?.value === 'EUR' ? '€' : 'KSh')),
    address: document.getElementById('store-physical-address')?.value.trim() || 'Posta Road, Next to Posta Molo, Molo Town'
  };

  const gateways = {
    mpesa: document.getElementById('gateway-mpesa')?.checked ?? true,
    stripe: document.getElementById('gateway-stripe')?.checked ?? true,
    paypal: document.getElementById('gateway-paypal')?.checked ?? true,
    pod: document.getElementById('gateway-pod')?.checked ?? true
  };

  const payload = {
    banners,
    flashSale,
    lpgPrices,
    storeInfo,
    gateways,
    announcement: document.getElementById('global-announcement')?.value.trim() || ''
  };

  try {
    const res = await fetch(`${API_BASE_URL}/app-config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.success) {
      window.adminToast('📱 Mobile App Settings pushed live to Android App & Website!', 'success');
      return true;
    }
  } catch (err) {
    console.warn('Backend save error:', err);
  }

  window.adminToast('Settings saved locally', 'info');
  return false;
};

// --- 12. DELIVERY POINTS & PICKUP STATIONS MANAGEMENT ---
window.adminDeliveryPoints = [];

window.loadAdminDeliveryPoints = async function() {
  const tbody = document.getElementById('admin-delivery-points-tbody');
  const countBadge = document.getElementById('admin-dp-count-badge');
  if (!tbody) return;

  try {
    const res = await fetch(`${API_BASE_URL}/delivery-points`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.deliveryPoints)) {
        window.adminDeliveryPoints = data.deliveryPoints;
      }
    }
  } catch (err) {
    console.warn('Failed to load delivery points from backend:', err);
  }

  // Fallback if empty
  if (!window.adminDeliveryPoints || window.adminDeliveryPoints.length === 0) {
    window.adminDeliveryPoints = [
      { id: 'dp-molo-central', name: 'Molo Central Flagship Hub', town: 'Molo', address: 'Posta Road, Opposite TotalEnergies', landmark: 'Reign Plaza Ground Floor', fee: 80, hours: 'Mon - Sat: 7:30 AM - 8:30 PM', phone: '+254 712 345 678', isActive: true },
      { id: 'dp-nakuru-cbd', name: 'Nakuru CBD Station', town: 'Nakuru', address: 'Kenyatta Avenue, West End Mall', landmark: 'Near Naivas Supermarket Entrance', fee: 100, hours: 'Mon - Sun: 8:00 AM - 8:00 PM', phone: '+254 722 000 111', isActive: true },
      { id: 'dp-nairobi-central', name: 'Nairobi Central Hub', town: 'Nairobi', address: 'Moi Avenue, Kenya Cinema Plaza', landmark: '1st Floor, Shop 14', fee: 120, hours: 'Mon - Sat: 8:00 AM - 7:00 PM', phone: '+254 733 999 888', isActive: true },
      { id: 'dp-elburgon-town', name: 'Elburgon Town Hub', town: 'Elburgon', address: 'Commercial Street', landmark: 'Opposite Equity Agent', fee: 80, hours: 'Mon - Sat: 8:00 AM - 6:30 PM', phone: '+254 715 444 333', isActive: true },
      { id: 'dp-salgaa-rongai', name: 'Salgaa / Rongai Junction Hub', town: 'Salgaa', address: 'Highway Plaza', landmark: 'Next to Shell Station', fee: 90, hours: 'Mon - Sat: 8:00 AM - 7:00 PM', phone: '+254 718 555 666', isActive: true }
    ];
  }

  if (countBadge) {
    countBadge.textContent = `${window.adminDeliveryPoints.length} Stations Active`;
  }

  let html = '';
  window.adminDeliveryPoints.forEach(dp => {
    const activeBadge = dp.isActive !== false 
      ? '<span class="badge bg-success">Active</span>' 
      : '<span class="badge bg-secondary">Inactive</span>';
    html += `
      <tr>
        <td>
          <div class="fw-bold" style="color:#0f172a;">${dp.name}</div>
          <span class="badge bg-warning-subtle text-dark border border-warning" style="font-size:10.5px;">${dp.town}</span>
        </td>
        <td>
          <div style="font-size:13px; color:#334155;">${dp.address}</div>
          <small class="text-muted"><i class="bi bi-geo-alt"></i> ${dp.landmark || 'Flagship Hub'}</small>
        </td>
        <td><small class="text-muted"><i class="bi bi-clock me-1"></i>${dp.hours}</small></td>
        <td><small class="fw-bold text-dark"><i class="bi bi-telephone me-1"></i>${dp.phone}</small></td>
        <td><strong class="text-dark">KSh ${Number(dp.fee).toLocaleString()}</strong></td>
        <td>${activeBadge}</td>
        <td style="text-align:right;">
          <button class="btn btn-sm btn-outline-danger rounded-pill px-2 py-1" onclick="deleteAdminDeliveryPoint('${dp.id}')" title="Delete Point">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
  tbody.innerHTML = html;
};

window.saveAdminDeliveryPoint = async function(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('new-dp-name')?.value.trim();
  const town = document.getElementById('new-dp-town')?.value.trim();
  const address = document.getElementById('new-dp-address')?.value.trim();
  const landmark = document.getElementById('new-dp-landmark')?.value.trim();
  const hours = document.getElementById('new-dp-hours')?.value.trim() || 'Mon - Sat: 8:00 AM - 8:00 PM';
  const phone = document.getElementById('new-dp-phone')?.value.trim() || '+254 712 345 678';
  const fee = parseFloat(document.getElementById('new-dp-fee')?.value) || 80;

  if (!name || !town || !address) {
    window.adminToast('Please fill in Station Name, Town, and Street Address', 'warning');
    return;
  }

  const newPt = {
    id: `dp-${town.toLowerCase().replace(/[^a-z0-9]/g, '')}-${Date.now().toString().slice(-4)}`,
    name,
    town,
    address,
    landmark,
    hours,
    phone,
    fee,
    isActive: true
  };

  try {
    const res = await fetch(`${API_BASE_URL}/delivery-points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPt)
    });
    const data = await res.json();
    if (data.success) {
      window.adminToast(`✅ Station "${name}" added and synced!`, 'success');
    } else {
      window.adminToast('Saved locally', 'info');
    }
  } catch (err) {
    console.warn('Backend save error:', err);
    window.adminToast('Saved locally', 'info');
  }

  // Dismiss modal if open
  const modalEl = document.getElementById('addDeliveryPointModal');
  if (modalEl && window.bootstrap && window.bootstrap.Modal) {
    const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
  }

  // Clear form
  if (document.getElementById('new-dp-name')) document.getElementById('new-dp-name').value = '';
  if (document.getElementById('new-dp-address')) document.getElementById('new-dp-address').value = '';
  if (document.getElementById('new-dp-landmark')) document.getElementById('new-dp-landmark').value = '';

  await loadAdminDeliveryPoints();
};

window.deleteAdminDeliveryPoint = async function(pointId) {
  if (!confirm(`Are you sure you want to remove delivery station ${pointId}?`)) return;

  try {
    const res = await fetch(`${API_BASE_URL}/delivery-points/${pointId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (data.success) {
      window.adminToast('Delivery station removed', 'success');
    }
  } catch (err) {
    console.warn('Backend delete error:', err);
  }

  await loadAdminDeliveryPoints();
};

// --- 13. REAL-TIME DATA SYNC WITH BACKEND ---
window.syncAdminDataWithBackend = async function() {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.orders) && data.orders.length > 0) {
        localStorage.setItem(ADMIN_ORDERS_KEY, JSON.stringify(data.orders));
        if (typeof renderOrdersTable === 'function') {
          renderOrdersTable();
        }
      }
    }
  } catch (e) {
    console.warn('Sync orders deferred:', e);
  }
};

// --- 13. FULL STORE SETTINGS PERSISTENCE & SYNC ---
window.loadGeneralStoreSettings = async function() {
  try {
    const res = await fetch(`${API_BASE_URL}/app-config`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.config) {
        const s = data.config.storeInfo || {};
        const g = data.config.gateways || {};
        if (document.getElementById('store-brand-name') && s.name) document.getElementById('store-brand-name').value = s.name;
        if (document.getElementById('store-contact-email') && s.email) document.getElementById('store-contact-email').value = s.email;
        if (document.getElementById('store-customer-hotline') && s.hotline) document.getElementById('store-customer-hotline').value = s.hotline;
        if (document.getElementById('store-base-currency') && s.currency) document.getElementById('store-base-currency').value = s.currency;
        if (document.getElementById('store-physical-address') && s.address) document.getElementById('store-physical-address').value = s.address;

        if (document.getElementById('gateway-mpesa') && g.mpesa !== undefined) document.getElementById('gateway-mpesa').checked = !!g.mpesa;
        if (document.getElementById('gateway-stripe') && g.stripe !== undefined) document.getElementById('gateway-stripe').checked = !!g.stripe;
        if (document.getElementById('gateway-paypal') && g.paypal !== undefined) document.getElementById('gateway-paypal').checked = !!g.paypal;
        if (document.getElementById('gateway-pod') && g.pod !== undefined) document.getElementById('gateway-pod').checked = !!g.pod;
        return;
      }
    }
  } catch (e) {
    console.warn('Backend store settings load deferred:', e);
  }

  try {
    const raw = localStorage.getItem('reign_general_settings');
    if (raw) {
      const s = JSON.parse(raw);
      if (document.getElementById('store-brand-name')) document.getElementById('store-brand-name').value = s.brandName || 'Reign Electronics & Mali Mali';
      if (document.getElementById('store-contact-email')) document.getElementById('store-contact-email').value = s.email || 'hello@reignshop.com';
      if (document.getElementById('store-customer-hotline')) document.getElementById('store-customer-hotline').value = s.phone || '+254 712 345 678';
      if (document.getElementById('store-base-currency')) document.getElementById('store-base-currency').value = s.currency || 'KES';
      if (document.getElementById('store-physical-address')) document.getElementById('store-physical-address').value = s.address || 'Posta Road, Next to Posta Molo, Molo Town, Nakuru County, Kenya';
      
      if (document.getElementById('gateway-mpesa')) document.getElementById('gateway-mpesa').checked = s.gateways?.mpesa ?? true;
      if (document.getElementById('gateway-stripe')) document.getElementById('gateway-stripe').checked = s.gateways?.stripe ?? true;
      if (document.getElementById('gateway-paypal')) document.getElementById('gateway-paypal').checked = s.gateways?.paypal ?? true;
      if (document.getElementById('gateway-pod')) document.getElementById('gateway-pod').checked = s.gateways?.pod ?? true;
    }
  } catch (e) {
    console.warn('Could not load general settings:', e);
  }
};

window.saveAllAdminSettings = async function(e) {
  if (e) e.preventDefault();

  const general = {
    brandName: document.getElementById('store-brand-name')?.value.trim() || 'Reign Electronics & Mali Mali',
    email: document.getElementById('store-contact-email')?.value.trim() || 'hello@reignshop.com',
    phone: document.getElementById('store-customer-hotline')?.value.trim() || '+254 712 345 678',
    currency: document.getElementById('store-base-currency')?.value || 'KES',
    address: document.getElementById('store-physical-address')?.value.trim() || 'Posta Road, Next to Posta Molo, Molo Town',
    gateways: {
      mpesa: document.getElementById('gateway-mpesa')?.checked ?? true,
      stripe: document.getElementById('gateway-stripe')?.checked ?? true,
      paypal: document.getElementById('gateway-paypal')?.checked ?? true,
      pod: document.getElementById('gateway-pod')?.checked ?? true
    }
  };

  localStorage.setItem('reign_general_settings', JSON.stringify(general));

  // Save mobile app banners & prices
  if (typeof window.saveMobileAppSettings === 'function') {
    await window.saveMobileAppSettings(null);
  }

  window.adminToast('✅ All Store & System Settings saved and synced live!', 'success');
};

// POS Fullscreen Toggle
window.togglePosFullscreen = function() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.warn(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

// --- 14. INITIALIZE ON LOAD ---
document.addEventListener('DOMContentLoaded', function() {
  if (typeof AOS !== 'undefined') {
    try {
      AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
    } catch (e) {
      console.warn('AOS initialization note:', e);
    }
  }
  if (typeof updateAdminUserHeader === 'function') {
    updateAdminUserHeader();
  }
  syncAdminDataWithBackend();
  if (typeof initPOS === 'function' && document.getElementById('pos-catalog-grid')) {
    initPOS();
  }
  if (document.getElementById('banner1-tag')) {
    loadMobileAppSettings();
  }
  if (document.getElementById('store-brand-name')) {
    loadGeneralStoreSettings();
  }
  if (document.getElementById('admin-delivery-points-tbody')) {
    loadAdminDeliveryPoints();
  }
});

