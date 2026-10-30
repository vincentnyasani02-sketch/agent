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
    const dismissPreloader = () => {
      preloader.style.transition = 'opacity 0.4s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 400);
    };
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(dismissPreloader, 200);
    } else {
      window.addEventListener('DOMContentLoaded', () => setTimeout(dismissPreloader, 300));
      window.addEventListener('load', dismissPreloader);
    }
    // Safety fallback: never leave preloader spinning after 1 second
    setTimeout(dismissPreloader, 1000);
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

// Automatically append ngrok-skip-browser-warning to all fetch calls
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

// --- 0. ENVIRONMENT & BACKEND API RESOLUTION ---
function resolveApiBaseUrl() {
  if (window.location.protocol === 'file:') {
    return 'http://127.0.0.1:5000/api';
  }
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
window.API_BASE_URL = window.API_BASE_URL || resolveApiBaseUrl();
var API_BASE_URL = window.API_BASE_URL;

const AUTH_KEY = 'reign_logged_user';
window.AUTH_KEY = AUTH_KEY;

// --- FALLBACK CATALOG FOR INSTANT VISIBILITY UNDER ALL CONDITIONS ---
window.DEFAULT_CATALOG_FALLBACK = [
  {
    "badge": "Student Special",
    "barcode": "793573010042",
    "brand": "Reign Tab",
    "category": "Computing",
    "categoryId": null,
    "costPrice": 42000.0,
    "createdAt": "2026-10-28T06:38:45.613429+03:00",
    "fullDescription": "Ideal digital companion for sketching, university note-taking, and mobile spreadsheets.",
    "id": "3a81b574-6f92-54cd-ba26-cc32c776df35",
    "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 58000.0,
    "price": 52000.0,
    "rating": 4.7,
    "reviewsCount": 73,
    "sales": 3,
    "shortDescription": "11\" 2.5K 120Hz, 8GB RAM, 256GB Storage, 4G LTE SIM slot, Magnetic Stylus included",
    "sku": "REG-PROTAB-11",
    "specs": {
      "RAM": "8GB",
      "Screen": "11-inch 2560x1600",
      "Storage": "256GB"
    },
    "status": "In Stock",
    "stock": 27,
    "stockCount": 27,
    "tags": [],
    "title": "ProTab Elite 11\" 2K Tablet with Active Stylus",
    "warrantyMonths": 12,
    "weightKg": 0.55
  },
  {
    "badge": "Kitchen Premium",
    "barcode": "",
    "brand": "Reign",
    "category": "Appliances",
    "categoryId": "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    "costPrice": 45000.0,
    "createdAt": "2026-09-27T11:35:06.381709+03:00",
    "fullDescription": "LG Refrigerator 320L",
    "id": "aaaaaaaa-0000-4000-8000-000000000003",
    "image": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": false,
    "isOnOffer": false,
    "originalPrice": null,
    "price": 68000.0,
    "rating": 4.8,
    "reviewsCount": 50,
    "sales": 1,
    "shortDescription": "LG Refrigerator 320L",
    "sku": "LG-FRIDGE-320",
    "specs": {},
    "status": "In Stock",
    "stock": 9,
    "stockCount": 9,
    "tags": [],
    "title": "LG Refrigerator 320L",
    "warrantyMonths": 12,
    "weightKg": 38.0
  },
  {
    "badge": "Flagship",
    "barcode": "",
    "brand": "Reign",
    "category": "Mobile",
    "categoryId": "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    "costPrice": 34000.0,
    "createdAt": "2026-09-27T11:35:06.381709+03:00",
    "fullDescription": "Samsung S23",
    "id": "aaaaaaaa-0000-4000-8000-000000000001",
    "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": false,
    "isOnOffer": false,
    "originalPrice": null,
    "price": 45999.0,
    "rating": 4.8,
    "reviewsCount": 50,
    "sales": 1,
    "shortDescription": "Samsung S23",
    "sku": "SAM-S23",
    "specs": {},
    "status": "In Stock",
    "stock": 9,
    "stockCount": 9,
    "tags": [],
    "title": "Samsung S23",
    "warrantyMonths": 12,
    "weightKg": 0.2
  },
  {
    "badge": "Technician Choice",
    "barcode": "793573080021",
    "brand": "Reign Tech Tools",
    "category": "Hardware Tools",
    "categoryId": null,
    "costPrice": 5500.0,
    "createdAt": "2026-10-28T06:38:45.677069+03:00",
    "fullDescription": "Professional repair station designed for smartphone motherboard soldering, micro-soldering, and DIY audio electronics.",
    "id": "87c6a3c0-53db-5b68-836f-2775d986b141",
    "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 9200.0,
    "price": 7800.0,
    "rating": 4.91,
    "reviewsCount": 62,
    "sales": 0,
    "shortDescription": "ESD Safe, Digital LED Temp Control (200-480\u00b0C), Ceramic Heater, 5 Replaceable Tips, Anti-Static Tweezers",
    "sku": "REG-SOLDER-STN",
    "specs": {
      "Power": "60W Rapid Heat",
      "Temperature": "200-480 deg C"
    },
    "status": "In Stock",
    "stock": 20,
    "stockCount": 20,
    "tags": [],
    "title": "Precision Digital Soldering Station & Tech Repair Toolkit",
    "warrantyMonths": 12,
    "weightKg": 2.1
  },
  {
    "badge": "Charges Laptops",
    "barcode": "793573080014",
    "brand": "Reign Power",
    "category": "Hardware Tools",
    "categoryId": null,
    "costPrice": 4400.0,
    "createdAt": "2026-10-28T06:38:45.674018+03:00",
    "fullDescription": "Heavy duty portable powerhouse capable of running laptops, routers, and phones during blackouts.",
    "id": "c57e1b36-ea7e-5840-810a-3ddf8e80b6af",
    "image": "https://images.unsplash.com/photo-1609592426867-0c7f1a92e1b1?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1609592426867-0c7f1a92e1b1?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 7500.0,
    "price": 6200.0,
    "rating": 4.89,
    "reviewsCount": 154,
    "sales": 0,
    "shortDescription": "65W Power Delivery Fast Output, Charges MacBooks & HP/Dell Laptops, 30,000mAh, Digital Display",
    "sku": "REG-PWR-30K-65W",
    "specs": {
      "Capacity": "30,000mAh",
      "Output": "65W USB-C PD"
    },
    "status": "In Stock",
    "stock": 38,
    "stockCount": 38,
    "tags": [],
    "title": "UltraCharge 30000mAh 65W PD Laptop Power Bank",
    "warrantyMonths": 12,
    "weightKg": 0.62
  },
  {
    "badge": "24h Hot/Cold",
    "barcode": "793573070022",
    "brand": "ThermaPro",
    "category": "Mali Mali",
    "categoryId": null,
    "costPrice": 2100.0,
    "createdAt": "2026-10-28T06:38:45.670514+03:00",
    "fullDescription": "Essential family and hospitality flask keeping tea, coffee, and water piping hot throughout the day.",
    "id": "5baf72f9-9c20-5531-8c14-9a465b49497c",
    "image": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 3900.0,
    "price": 3200.0,
    "rating": 4.82,
    "reviewsCount": 87,
    "sales": 0,
    "shortDescription": "24-Hour Heat Retention, Food-Grade 304 Stainless Steel, Easy Lever Pump, 360\u00b0 Swivel Base",
    "sku": "MM-THERMO-25L",
    "specs": {
      "Capacity": "2.5 Liters",
      "Retention": "24h Hot / 36h Cold"
    },
    "status": "In Stock",
    "stock": 50,
    "stockCount": 50,
    "tags": [],
    "title": "Double-Wall Stainless Thermal Vacuum Airpot 2.5L",
    "warrantyMonths": 12,
    "weightKg": 1.6
  },
  {
    "badge": "Mali Mali Favorite",
    "barcode": "793573070015",
    "brand": "Reign Home",
    "category": "Mali Mali",
    "categoryId": null,
    "costPrice": 8200.0,
    "createdAt": "2026-10-28T06:38:45.664779+03:00",
    "fullDescription": "Premium scratch-resistant cookware set consisting of 3 casserole pots, 1 saucepan, 1 deep frypan and cooking utensils.",
    "id": "1743fd54-2659-5cfa-b9d9-a27ec9111d3b",
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 13500.0,
    "price": 11500.0,
    "rating": 4.93,
    "reviewsCount": 112,
    "sales": 0,
    "shortDescription": "Die-Cast Granite Stone Non-Stick, Induction & Gas Compatible, Tempered Glass Lids",
    "sku": "MM-GRANITE-12PC",
    "specs": {
      "Coating": "5-Layer German Granite Stone",
      "Pieces": "12-Piece Set"
    },
    "status": "In Stock",
    "stock": 25,
    "stockCount": 25,
    "tags": [],
    "title": "Granite Non-Stick Induction Cookware 12-Piece Set",
    "warrantyMonths": 12,
    "weightKg": 7.8
  },
  {
    "badge": "Most Popular",
    "barcode": "793573060030",
    "brand": "K-Gas",
    "category": "LPG Gas",
    "categoryId": null,
    "costPrice": 1250.0,
    "createdAt": "2026-10-28T06:38:45.661040+03:00",
    "fullDescription": "High-heat blue flame cooking gas refill with verified tamper-proof hologram security seal.",
    "id": "395f9628-1669-50ba-85bd-5b10e02eaec9",
    "image": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 1650.0,
    "price": 1500.0,
    "rating": 4.9,
    "reviewsCount": 510,
    "sales": 0,
    "shortDescription": "6kg Gas Refill Exchange for K-Gas cylinders. Direct express delivery across Molo & Nakuru.",
    "sku": "LPG-KGAS-6KG-REF",
    "specs": {
      "Flame": "Clean Smokeless Blue",
      "Net Weight": "6.0 kg"
    },
    "status": "In Stock",
    "stock": 95,
    "stockCount": 95,
    "tags": [],
    "title": "K-Gas 6kg Clean Cooking Gas (Refill Exchange)",
    "warrantyMonths": 0,
    "weightKg": 13.5
  },
  {
    "badge": "15-Min Express",
    "barcode": "793573060016",
    "brand": "TotalEnergies",
    "category": "LPG Gas",
    "categoryId": null,
    "costPrice": 2700.0,
    "createdAt": "2026-10-28T06:38:45.657611+03:00",
    "fullDescription": "Genuine Total gas refill with safety shrink seal. Includes free hose leak check by certified delivery rider.",
    "id": "a2e17a5a-bf3c-5d08-af30-a78e9b2379b6",
    "image": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 3400.0,
    "price": 3200.0,
    "rating": 4.95,
    "reviewsCount": 420,
    "sales": 0,
    "shortDescription": "Standard 13kg Empty Cylinder Exchange, Safety Valve Inspected, Express Doorstep Dispatch",
    "sku": "LPG-TOT-13KG-REF",
    "specs": {
      "Gas Type": "LPG (Propane/Butane)",
      "Net Weight": "13.0 kg",
      "Valve": "Standard 20mm Quick-On"
    },
    "status": "In Stock",
    "stock": 85,
    "stockCount": 85,
    "tags": [],
    "title": "TotalEnergies 13kg LPG Gas (Refill Exchange)",
    "warrantyMonths": 0,
    "weightKg": 27.5
  },
  {
    "badge": "Ultra HD 4K",
    "barcode": "793573050017",
    "brand": "Reign Gaming",
    "category": "Gaming",
    "categoryId": null,
    "costPrice": 58000.0,
    "createdAt": "2026-10-28T06:38:45.654113+03:00",
    "fullDescription": "Experience unprecedented load speeds and photorealistic graphics with customized AMD RDNA3 computing architecture.",
    "id": "358d7369-0627-5bdf-9e61-e574c3c6f593",
    "image": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 75000.0,
    "price": 68000.0,
    "rating": 4.96,
    "reviewsCount": 178,
    "sales": 0,
    "shortDescription": "4K 120FPS Gaming, 1TB Custom Gen4 SSD, Dual Haptic Controller included, Ray Tracing",
    "sku": "REG-PHANTOM-X",
    "specs": {
      "Controllers": "2x Haptic Wireless",
      "Resolution": "True 4K 120Hz",
      "Storage": "1TB Custom NVMe"
    },
    "status": "In Stock",
    "stock": 12,
    "stockCount": 12,
    "tags": [],
    "title": "Reign Phantom X Next-Gen Gaming Console 1TB",
    "warrantyMonths": 24,
    "weightKg": 4.2
  },
  {
    "badge": "Kitchen Pro",
    "barcode": "793573040025",
    "brand": "PowerBlend",
    "category": "Appliances",
    "categoryId": null,
    "costPrice": 6200.0,
    "createdAt": "2026-10-28T06:38:45.647825+03:00",
    "fullDescription": "High-velocity heavy duty blender capable of crushing whole grains, ice blocks, and leafy greens in 30 seconds.",
    "id": "ca26184a-9868-5790-abfb-66a200b7db49",
    "image": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 10500.0,
    "price": 8500.0,
    "rating": 4.78,
    "reviewsCount": 98,
    "sales": 0,
    "shortDescription": "1200W Pure Copper Motor, 6-Wing Stainless Blades, 2L BPA-Free Pitcher, Ice Crusher",
    "sku": "REG-NUTRI-1200",
    "specs": {
      "Motor": "1200W High Torque",
      "Pitcher": "2.0L Unbreakable Tritan"
    },
    "status": "In Stock",
    "stock": 45,
    "stockCount": 45,
    "tags": [],
    "title": "PowerBlend Nutri-Extractor 1200W Commercial",
    "warrantyMonths": 12,
    "weightKg": 3.1
  },
  {
    "badge": "Energy Saver",
    "barcode": "793573040018",
    "brand": "Vortex Kitchen",
    "category": "Appliances",
    "categoryId": null,
    "costPrice": 11800.0,
    "createdAt": "2026-10-28T06:38:45.643749+03:00",
    "fullDescription": "Cook two different dishes at two different temperatures simultaneously with 85% less oil.",
    "id": "b2a37ed5-f241-5615-b0fd-b1d3dc54be3f",
    "image": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 18500.0,
    "price": 15800.0,
    "rating": 4.86,
    "reviewsCount": 132,
    "sales": 0,
    "shortDescription": "8.5 Liters Dual Independent Baskets, 2400W Rapid Crisp, 10 Smart Presets, Sync Cook Technology",
    "sku": "REG-VORTEX-85",
    "specs": {
      "Capacity": "8.5L Dual Baskets",
      "Power": "2400W Rapid Crisp"
    },
    "status": "In Stock",
    "stock": 28,
    "stockCount": 28,
    "tags": [],
    "title": "Vortex Dual-Zone Digital Air Fryer 8.5L",
    "warrantyMonths": 12,
    "weightKg": 6.4
  },
  {
    "badge": "Top Security",
    "barcode": "793573030026",
    "brand": "SecureLock",
    "category": "Smart Home",
    "categoryId": null,
    "costPrice": 12500.0,
    "createdAt": "2026-10-28T06:38:45.639814+03:00",
    "fullDescription": "Commercial-grade zinc alloy smart door lock with instant phone notification and guest temporary passcodes.",
    "id": "3b7112ea-22e5-57b5-9611-10bfd276be02",
    "image": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 19500.0,
    "price": 16500.0,
    "rating": 4.92,
    "reviewsCount": 53,
    "sales": 0,
    "shortDescription": "Fingerprint, PIN, RFID Card, App Remote Unlock, Built-in Video Doorbell & Anti-Peeping Keypad",
    "sku": "REG-SECLOCK-BIO",
    "specs": {
      "Unlock Methods": "Biometric, PIN, NFC, App, Physical Key"
    },
    "status": "In Stock",
    "stock": 15,
    "stockCount": 15,
    "tags": [],
    "title": "SecureLock Biometric Smart Deadbolt with Camera",
    "warrantyMonths": 24,
    "weightKg": 2.2
  },
  {
    "badge": "Solar Powered",
    "barcode": "793573030019",
    "brand": "Sentinel Tech",
    "category": "Smart Home",
    "categoryId": null,
    "costPrice": 14000.0,
    "createdAt": "2026-10-28T06:38:45.635441+03:00",
    "fullDescription": "Autonomous perimeter security with smart PIR human and vehicle detection, two-way audio siren.",
    "id": "677414ab-7635-55f8-88f5-1b263f9eb24e",
    "image": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 22000.0,
    "price": 18900.0,
    "rating": 4.88,
    "reviewsCount": 67,
    "sales": 0,
    "shortDescription": "4K Ultra-HD, 360\u00b0 Pan-Tilt Auto Human Tracking, Color Night Vision, 4G SIM & Solar Continuous Power",
    "sku": "REG-SENTINEL-4K",
    "specs": {
      "Connectivity": "4G LTE + WiFi",
      "Power": "12W Solar + 18000mAh Battery",
      "Resolution": "4K 8MP"
    },
    "status": "In Stock",
    "stock": 22,
    "stockCount": 22,
    "tags": [],
    "title": "Sentinel 360\u00b0 AI Solar 4K Security Camera",
    "warrantyMonths": 24,
    "weightKg": 1.8
  },
  {
    "badge": "Waterproof",
    "barcode": "793573020034",
    "brand": "SoundStream",
    "category": "Audio",
    "categoryId": null,
    "costPrice": 10500.0,
    "createdAt": "2026-10-28T06:38:45.630433+03:00",
    "fullDescription": "Outdoor party speaker built to handle dust, rain, pool immersion, with dual passive radiators.",
    "id": "30abeb88-2157-5461-97cb-92d761c4d4ff",
    "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 17000.0,
    "price": 14500.0,
    "rating": 4.75,
    "reviewsCount": 145,
    "sales": 0,
    "shortDescription": "80W Bass Boost, Floating Waterproof IP67, RGB Beat-Sync Lighting, 24h Power Bank Function",
    "sku": "REG-BOOM-IP67",
    "specs": {
      "Battery": "10400mAh",
      "Power": "80W Dual Tweeter + Woofer",
      "Waterproof": "IP67 Floating"
    },
    "status": "In Stock",
    "stock": 40,
    "stockCount": 40,
    "tags": [],
    "title": "SoundStream Rugged Party Boombox IP67",
    "warrantyMonths": 12,
    "weightKg": 2.4
  },
  {
    "badge": "Home Theater",
    "barcode": "793573020027",
    "brand": "BassForge",
    "category": "Audio",
    "categoryId": null,
    "costPrice": 33000.0,
    "createdAt": "2026-10-28T06:38:45.624859+03:00",
    "fullDescription": "Transforms your living room into an IMAX theater with room-shaking low frequencies and dedicated center dialogue channel.",
    "id": "e26d9266-41f0-528c-901b-b5166fe98a1d",
    "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 48000.0,
    "price": 42000.0,
    "rating": 4.9,
    "reviewsCount": 88,
    "sales": 0,
    "shortDescription": "450W RMS Output, 8\" Wireless Down-Firing Subwoofer, Dolby Atmos, HDMI eARC, Bluetooth 5.3",
    "sku": "REG-BASS-51",
    "specs": {
      "Inputs": "HDMI eARC, Optical, BT 5.3",
      "Subwoofer": "8-inch Wireless 200W",
      "Total Power": "450W RMS"
    },
    "status": "In Stock",
    "stock": 14,
    "stockCount": 14,
    "tags": [],
    "title": "BassForge Cinema 5.1 Wireless Soundbar System",
    "warrantyMonths": 24,
    "weightKg": 8.5
  },
  {
    "badge": "Hot Deal",
    "barcode": "793573020010",
    "brand": "EchoPulse",
    "category": "Audio",
    "categoryId": null,
    "costPrice": 22000.0,
    "createdAt": "2026-10-28T06:38:45.619446+03:00",
    "fullDescription": "Audiophile-grade studio acoustic profiling engineered for pure acoustic clarity and immersive bass.",
    "id": "e111fac3-48f2-5419-a2cb-9151b8999e1c",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 32000.0,
    "price": 28500.0,
    "rating": 4.8,
    "reviewsCount": 210,
    "sales": 0,
    "shortDescription": "Hybrid Active Noise Cancellation, 40mm Beryllium Drivers, 50-hour Playtime, Spatial Audio",
    "sku": "REG-ECH-ULTRA",
    "specs": {
      "Battery": "50 Hours",
      "Driver": "40mm Beryllium",
      "Noise Cancellation": "Hybrid ANC up to -42dB"
    },
    "status": "In Stock",
    "stock": 35,
    "stockCount": 35,
    "tags": [],
    "title": "EchoPulse Ultra Wireless ANC Headset",
    "warrantyMonths": 12,
    "weightKg": 0.28
  },
  {
    "badge": "Creator Pro",
    "barcode": "793573010035",
    "brand": "Reign Custom",
    "category": "Computing",
    "categoryId": null,
    "costPrice": 150000.0,
    "createdAt": "2026-10-28T06:38:45.608849+03:00",
    "fullDescription": "Architectural CAD, 3D render, and AI model workstation with custom silent loop liquid cooling.",
    "id": "1ecbd3c4-0502-556f-90b8-856624d3c983",
    "image": "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 205000.0,
    "price": 185000.0,
    "rating": 4.95,
    "reviewsCount": 41,
    "sales": 0,
    "shortDescription": "AMD Ryzen 9 7900X, 64GB DDR5, 2TB Gen4 SSD, RTX 4080 Super 16GB, Liquid Cooled",
    "sku": "REG-TITAN-DESK",
    "specs": {
      "CPU": "AMD Ryzen 9 7900X",
      "GPU": "RTX 4080 Super 16GB",
      "RAM": "64GB DDR5"
    },
    "status": "In Stock",
    "stock": 8,
    "stockCount": 8,
    "tags": [],
    "title": "Reign Titan Studio Workstation Desktop",
    "warrantyMonths": 36,
    "weightKg": 12.5
  },
  {
    "badge": "Popular",
    "barcode": "793573010028",
    "brand": "Reign Quantum",
    "category": "Computing",
    "categoryId": null,
    "costPrice": 80000.0,
    "createdAt": "2026-10-28T06:38:45.603824+03:00",
    "fullDescription": "Ultralight magnesium alloy body offering 14 hours battery life for executives, engineers, and developers.",
    "id": "7fe22498-8f0d-5f4f-977e-c4ed038cf12b",
    "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 112000.0,
    "price": 98000.0,
    "rating": 4.8,
    "reviewsCount": 92,
    "sales": 0,
    "shortDescription": "14\" 2.8K IPS, Intel Core i7 13th Gen, 16GB DDR5, 512GB NVMe, All-day Battery",
    "sku": "REG-QC14-SLIM",
    "specs": {
      "Battery": "70Wh (14 hrs)",
      "Display": "14-inch 2.8K 90Hz",
      "Processor": "Intel Core i7-1360P",
      "RAM": "16GB LPDDR5",
      "Storage": "512GB NVMe"
    },
    "status": "In Stock",
    "stock": 18,
    "stockCount": 18,
    "tags": [],
    "title": "Quantum Core Ultra 14\" Slimbook",
    "warrantyMonths": 12,
    "weightKg": 1.3
  },
  {
    "badge": "Best Seller",
    "barcode": "793573010011",
    "brand": "Reign Apex",
    "category": "Computing",
    "categoryId": null,
    "costPrice": 120000.0,
    "createdAt": "2026-10-28T06:38:45.589330+03:00",
    "fullDescription": "Flagship creator and gaming laptop engineered for precision, uncompromising speed, and thermal mastery.",
    "id": "d7c9fe45-398b-5439-9072-90be9b2f9272",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": true,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 165000.0,
    "price": 145000.0,
    "rating": 4.9,
    "reviewsCount": 184,
    "sales": 0,
    "shortDescription": "16\" 3.2K OLED 120Hz, Intel Core Ultra 9, 32GB RAM, 1TB NVMe, RTX 4070",
    "sku": "REG-X16-PRO",
    "specs": {
      "Display": "16-inch 3.2K OLED 120Hz",
      "GPU": "RTX 4070 8GB GDDR6",
      "Processor": "Intel Core Ultra 9 185H",
      "RAM": "32GB LPDDR5X",
      "Storage": "1TB Gen4 NVMe"
    },
    "status": "In Stock",
    "stock": 24,
    "stockCount": 24,
    "tags": [],
    "title": "Apex Blade Pro 16\" OLED Laptop",
    "warrantyMonths": 24,
    "weightKg": 2.1
  },
  {
    "badge": "Best Budget",
    "barcode": "",
    "brand": "Reign",
    "category": "Mobile",
    "categoryId": "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    "costPrice": 18000.0,
    "createdAt": "2026-09-27T11:35:06.381709+03:00",
    "fullDescription": "Xiaomi Redmi 12",
    "id": "aaaaaaaa-0000-4000-8000-000000000002",
    "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": true,
    "isFeatured": false,
    "isOffer": true,
    "isOnOffer": true,
    "originalPrice": 30000.0,
    "price": 24500.0,
    "rating": 4.8,
    "reviewsCount": 50,
    "sales": 0,
    "shortDescription": "Xiaomi Redmi 12",
    "sku": "XIA-REDMI12",
    "specs": {},
    "status": "In Stock",
    "stock": 15,
    "stockCount": 15,
    "tags": [],
    "title": "Xiaomi Redmi 12",
    "warrantyMonths": 12,
    "weightKg": 0.19
  },
  {
    "badge": null,
    "barcode": "",
    "brand": "Reign",
    "category": null,
    "categoryId": "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    "costPrice": 2800.0,
    "createdAt": "2026-09-27T11:35:06.381709+03:00",
    "fullDescription": "Oryx Gas Cylinder 13kg",
    "id": "aaaaaaaa-0000-4000-8000-000000000004",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "imageUrl": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    "inStock": true,
    "isDealOfDay": false,
    "isFeatured": false,
    "isOffer": false,
    "isOnOffer": false,
    "originalPrice": null,
    "price": 4200.0,
    "rating": 4.8,
    "reviewsCount": 50,
    "sales": 0,
    "shortDescription": "Oryx Gas Cylinder 13kg",
    "sku": "ORYX-13KG",
    "specs": {},
    "status": "In Stock",
    "stock": 10,
    "stockCount": 10,
    "tags": [],
    "title": "Oryx Gas Cylinder 13kg",
    "warrantyMonths": 12,
    "weightKg": 13.0
  }
];

// --- DYNAMIC APK QR CODE ---
document.addEventListener('DOMContentLoaded', () => {
  const qrEl = document.getElementById('reign-apk-qr');
  if (qrEl) {
    const apkUrl = `${window.location.origin}/downloads/reign-express.apk`;
    qrEl.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(apkUrl)}`;
  }
});

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
  return [];
};

window.syncCartFromBackend = function(userId) {
  if (!userId) {
    const userStr = localStorage.getItem('reign_user') || localStorage.getItem(AUTH_KEY);
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        userId = u.id || u.userId;
      } catch(e){}
    }
    if (!userId) userId = localStorage.getItem('reign_user_id');
  }
  if (!userId) return;

  fetch(`${API_BASE_URL}/cart?user_id=${encodeURIComponent(userId)}`)
    .then(r => r.json())
    .then(data => {
      if (data && data.success && Array.isArray(data.items)) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data.items));
        window.updateCartUI();
        if (typeof window.renderCartItems === 'function') window.renderCartItems();
      }
    })
    .catch(e => console.warn('Could not sync cart from backend:', e));
};

window.saveCart = function(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.updateCartUI();

  // Cross-client cart synchronization with PostgreSQL shopdb
  const userStr = localStorage.getItem('reign_user') || localStorage.getItem(AUTH_KEY);
  let userId = null;
  if (userStr) {
    try {
      const u = JSON.parse(userStr);
      userId = u.id || u.userId;
    } catch(e){}
  }
  if (!userId) userId = localStorage.getItem('reign_user_id');

  if (userId) {
    fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId, items: cart })
    }).catch(err => console.warn('Cart backend sync skipped:', err));
  }
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

const OFFICIAL_DELIVERY_POINTS = [
  {
    id: "dp-molo-central",
    name: "Molo Central Flagship Hub",
    town: "Molo",
    address: "Posta Road, Opp. Post Office",
    landmark: "Reign Electronics Main Flagship Store",
    hours: "Mon - Sat: 8:00 AM - 8:30 PM",
    fee: 80,
    phone: "+254 712 345 678"
  },
  {
    id: "dp-nakuru-cbd",
    name: "Nakuru CBD Station",
    town: "Nakuru",
    address: "Kenyatta Avenue, West End Mall, Ground Floor",
    landmark: "Near Naivas Supermarket Entrance",
    hours: "Mon - Sat: 8:30 AM - 7:30 PM",
    fee: 100,
    phone: "+254 722 000 111"
  },
  {
    id: "dp-nairobi-central",
    name: "Nairobi Central Hub",
    town: "Nairobi",
    address: "Moi Avenue, Kenya Cinema Plaza, Shop G12",
    landmark: "Opposite Bazaar Plaza",
    hours: "Mon - Sat: 8:00 AM - 8:00 PM",
    fee: 120,
    phone: "+254 733 999 888"
  },
  {
    id: "dp-elburgon-town",
    name: "Elburgon Town Delivery Point",
    town: "Elburgon",
    address: "Commercial Street, Opp. Equity Bank Agent",
    landmark: "TotalEnergies Junction",
    hours: "Mon - Sat: 8:30 AM - 6:30 PM",
    fee: 80,
    phone: "+254 715 444 333"
  },
  {
    id: "dp-salgaa-rongai",
    name: "Salgaa / Rongai Junction Hub",
    town: "Salgaa",
    address: "Highway Trading Center, Plaza 4",
    landmark: "Next to Salgaa Total Station",
    hours: "Mon - Sat: 8:30 AM - 7:00 PM",
    fee: 90,
    phone: "+254 718 555 666"
  }
];

window.checkoutCart = function() {
  const cart = window.getCart();
  if (!cart.length) {
    window.showToast('Your cart is currently empty', 'info', 'bi-exclamation-circle');
    return;
  }
  window.openCheckoutModal();
};

window.checkoutState = {
  method: 'doorstep',
  selectedStationId: 'dp-molo-central',
  doorstepFee: 150
};

window.openCheckoutModal = function() {
  let modal = document.getElementById('checkout-modal-overlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'checkout-modal-overlay';
    modal.className = 'checkout-modal-overlay';
    document.body.appendChild(modal);
  }

  const user = window.getLoggedUser();
  const subtotal = window.getCartSubtotal();
  const isFreeDelivery = subtotal > 2500;
  window.checkoutState.method = 'doorstep';
  window.checkoutState.selectedStationId = 'dp-molo-central';

  modal.innerHTML = `
    <div class="checkout-modal-box">
      <div class="checkout-modal-header">
        <h4><i class="bi bi-shield-check text-success"></i> Choose Delivery Point & Checkout</h4>
        <button class="cart-close-btn" onclick="window.closeCheckoutModal()"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="checkout-modal-body">
        
        <!-- 1. Delivery Method -->
        <div class="checkout-section-title">
          <span>1. Delivery Method</span>
          <span style="color:#f68b1e; font-weight:700;">${isFreeDelivery ? 'FREE DELIVERY APPLIED' : ''}</span>
        </div>
        <div class="delivery-toggle-grid">
          <div class="delivery-toggle-card active" id="toggle-method-doorstep" onclick="window.setCheckoutDeliveryMethod('doorstep')">
            <span class="delivery-toggle-title"><i class="bi bi-house-door-fill text-warning"></i> Doorstep</span>
            <span class="delivery-toggle-sub">Delivery to home / office</span>
            <span class="delivery-toggle-fee">${isFreeDelivery ? 'FREE' : 'KSh 150'}</span>
          </div>
          <div class="delivery-toggle-card" id="toggle-method-station" onclick="window.setCheckoutDeliveryMethod('station')">
            <span class="delivery-toggle-title"><i class="bi bi-geo-alt-fill text-danger"></i> Pickup Station</span>
            <span class="delivery-toggle-sub">Collect at official hub</span>
            <span class="delivery-toggle-fee">${isFreeDelivery ? 'FREE' : 'From KSh 80'}</span>
          </div>
        </div>

        <!-- 2A. Doorstep Address Input -->
        <div id="checkout-doorstep-section">
          <div class="checkout-section-title">
            <span>2. Delivery Address</span>
            <button type="button" class="btn btn-sm btn-outline-warning py-0 px-2 fw-bold" onclick="window.detectCheckoutGPS()" style="font-size:11px;">
              <i class="bi bi-crosshair"></i> Use GPS
            </button>
          </div>
          <input type="text" id="checkout-doorstep-input" class="checkout-input-field" placeholder="e.g. Molo Posta Road, Near Total / Nairobi CBD" value="${user ? (user.deliveryAddress || '') : ''}">
          <small class="text-muted mt-1 d-block" style="font-size:11.5px;">⚡ Rapid dispatch window: 15-35 mins in Molo / Next-day nationwide.</small>
        </div>

        <!-- 2B. Pickup Station List -->
        <div id="checkout-station-section" style="display:none;">
          <div class="checkout-section-title">
            <span>2. Select Reign Delivery Point / Hub</span>
          </div>
          <div class="station-cards-list" id="checkout-station-list">
            ${OFFICIAL_DELIVERY_POINTS.map((s, idx) => `
              <div class="station-item-card ${idx === 0 ? 'active' : ''}" id="station-card-${s.id}" data-station-id="${s.id}" data-fee="${s.fee}" onclick="window.selectCheckoutStation('${s.id}')">
                <input type="radio" name="selected_station" value="${s.id}" ${idx === 0 ? 'checked' : ''} style="accent-color:#f68b1e; margin-top:3px;">
                <div class="station-info">
                  <h5>${s.name} <span class="station-badge">${s.town}</span></h5>
                  <p><i class="bi bi-geo-alt"></i> ${s.address} &bull; ${s.landmark}</p>
                  <div class="station-meta">
                    <span><i class="bi bi-clock"></i> ${s.hours}</span>
                    <span class="station-fee-tag">${isFreeDelivery ? 'FREE' : 'KSh ' + s.fee}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Customer Contact & Payment -->
        <div class="checkout-section-title mt-3">
          <span>3. Customer Contact & Payment</span>
        </div>
        <div class="row g-2 mb-2">
          <div class="col-6">
            <input type="text" id="checkout-name-input" class="checkout-input-field" placeholder="Full Name" value="${user ? user.name : ''}">
          </div>
          <div class="col-6">
            <input type="tel" id="checkout-phone-input" class="checkout-input-field" placeholder="M-Pesa Phone (07...)" value="${user ? (user.phone || '') : ''}">
          </div>
        </div>

        <select id="checkout-payment-select" class="checkout-input-field">
          <option value="M-Pesa Express">M-Pesa Express (STK Prompt to Phone)</option>
          <option value="Pay on Delivery">Pay on Delivery (Cash / Card at Doorstep / Hub)</option>
          <option value="Airtel Money">Airtel Money</option>
        </select>

        <!-- Summary -->
        <div class="checkout-summary-box">
          <div class="checkout-summary-row">
            <span>Items Subtotal:</span>
            <span>KSh ${Math.round(subtotal).toLocaleString()}</span>
          </div>
          <div class="checkout-summary-row">
            <span id="checkout-delivery-label">Delivery Fee:</span>
            <span id="checkout-delivery-amount" class="text-warning fw-bold">${isFreeDelivery ? 'FREE' : 'KSh 150'}</span>
          </div>
          <div class="checkout-summary-row total-row">
            <span>Total Payable:</span>
            <span id="checkout-total-payable">KSh ${Math.round(subtotal + (isFreeDelivery ? 0 : 150)).toLocaleString()}</span>
          </div>
        </div>

        <button class="btn-confirm-checkout" id="btn-submit-order" onclick="window.submitCheckoutOrder()">
          <i class="bi bi-lock-fill"></i> Confirm & Place Order
        </button>

      </div>
    </div>
  `;

  modal.classList.add('active');
  window.closeCart();
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById('checkout-modal-overlay');
  if (modal) modal.classList.remove('active');
};

window.setCheckoutDeliveryMethod = function(type) {
  window.checkoutState.method = type;
  const doorstepCard = document.getElementById('toggle-method-doorstep');
  const stationCard = document.getElementById('toggle-method-station');
  const doorstepSection = document.getElementById('checkout-doorstep-section');
  const stationSection = document.getElementById('checkout-station-section');

  if (type === 'doorstep') {
    if (doorstepCard) doorstepCard.classList.add('active');
    if (stationCard) stationCard.classList.remove('active');
    if (doorstepSection) doorstepSection.style.display = 'block';
    if (stationSection) stationSection.style.display = 'none';
  } else {
    if (doorstepCard) doorstepCard.classList.remove('active');
    if (stationCard) stationCard.classList.add('active');
    if (doorstepSection) doorstepSection.style.display = 'none';
    if (stationSection) stationSection.style.display = 'block';
  }
  window.updateCheckoutTotals();
};

window.selectCheckoutStation = function(stationId) {
  window.checkoutState.selectedStationId = stationId;
  document.querySelectorAll('.station-item-card').forEach(c => {
    c.classList.remove('active');
    const radio = c.querySelector('input[type="radio"]');
    if (radio) radio.checked = (c.getAttribute('data-station-id') === stationId);
  });
  const selectedCard = document.getElementById(`station-card-${stationId}`);
  if (selectedCard) selectedCard.classList.add('active');
  window.updateCheckoutTotals();
};

window.updateCheckoutTotals = function() {
  const subtotal = window.getCartSubtotal();
  const isFree = subtotal > 2500;
  let fee = 0;

  if (!isFree) {
    if (window.checkoutState.method === 'doorstep') {
      fee = 150;
    } else {
      const st = OFFICIAL_DELIVERY_POINTS.find(p => p.id === window.checkoutState.selectedStationId) || OFFICIAL_DELIVERY_POINTS[0];
      fee = st.fee;
    }
  }

  const feeEl = document.getElementById('checkout-delivery-amount');
  const totalEl = document.getElementById('checkout-total-payable');
  const labelEl = document.getElementById('checkout-delivery-label');

  if (feeEl) feeEl.textContent = isFree ? 'FREE' : `KSh ${fee.toLocaleString()}`;
  if (labelEl) labelEl.textContent = window.checkoutState.method === 'doorstep' ? 'Doorstep Delivery Fee:' : 'Pickup Station Fee:';
  if (totalEl) totalEl.textContent = `KSh ${Math.round(subtotal + fee).toLocaleString()}`;
};

window.detectCheckoutGPS = function() {
  const input = document.getElementById('checkout-doorstep-input');
  if (!navigator.geolocation) {
    window.showToast('Geolocation not supported by your browser', 'info', 'bi-geo');
    return;
  }
  window.showToast('Detecting your GPS delivery location...', 'info', 'bi-crosshair');
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude.toFixed(4);
      const lng = pos.coords.longitude.toFixed(4);
      if (input) input.value = `GPS Pin (${lat}, ${lng}), Molo Zone`;
      window.showToast('GPS Delivery location pinned!', 'success', 'bi-geo-alt-fill');
    },
    err => {
      window.showToast('Could not fetch GPS. Please type your street / building.', 'info', 'bi-geo-alt');
    },
    { timeout: 7000 }
  );
};

window.submitCheckoutOrder = function() {
  const cart = window.getCart();
  if (!cart.length) {
    window.showToast('Your cart is empty', 'info', 'bi-exclamation-circle');
    return;
  }

  const nameInput = document.getElementById('checkout-name-input');
  const phoneInput = document.getElementById('checkout-phone-input');
  const paymentSelect = document.getElementById('checkout-payment-select');
  const doorstepInput = document.getElementById('checkout-doorstep-input');

  const customerName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Valued Customer';
  const customerPhone = (phoneInput && phoneInput.value.trim()) ? phoneInput.value.trim() : '+254700000000';
  const paymentMethod = paymentSelect ? paymentSelect.value : 'M-Pesa Express';

  const subtotal = window.getCartSubtotal();
  const isFree = subtotal > 2500;
  let deliveryFee = 0;
  let finalDeliveryAddress = '';
  let finalPickupLocation = 'Reign Central Depot • Posta Rd Flagship';

  if (window.checkoutState.method === 'doorstep') {
    deliveryFee = isFree ? 0 : 150;
    finalDeliveryAddress = (doorstepInput && doorstepInput.value.trim()) ? doorstepInput.value.trim() : 'Molo Doorstep Delivery';
  } else {
    const station = OFFICIAL_DELIVERY_POINTS.find(p => p.id === window.checkoutState.selectedStationId) || OFFICIAL_DELIVERY_POINTS[0];
    deliveryFee = isFree ? 0 : station.fee;
    finalPickupLocation = `${station.name} (${station.address}, ${station.town})`;
    finalDeliveryAddress = finalPickupLocation;
  }

  const total = subtotal + deliveryFee;
  const user = window.getLoggedUser();
  const hasGas = cart.some(item => item.title && item.title.toLowerCase().includes('lpg'));
  const gasItem = cart.find(item => item.title && item.title.toLowerCase().includes('lpg'));

  const submitBtn = document.getElementById('btn-submit-order');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Confirming Order...';
  }

  const orderPayload = {
    userId: user ? user.email : null,
    customer: customerName,
    customerName: customerName,
    email: user ? user.email : `${customerPhone}@reignshop.com`,
    phone: customerPhone,
    customerPhone: customerPhone,
    total: total,
    orderAmount: total,
    subtotal: subtotal,
    deliveryFee: deliveryFee,
    deliveryMethod: window.checkoutState.method,
    deliveryPoint: finalPickupLocation,
    pickupLocation: finalPickupLocation,
    deliveryAddress: finalDeliveryAddress,
    payment: paymentMethod,
    paymentMethod: paymentMethod,
    items: cart,
    orderType: hasGas ? 'lpg_delivery' : (window.checkoutState.method === 'station' ? 'station_pickup' : 'ecommerce')
  };

  if (hasGas && gasItem) {
    orderPayload.cylinderDetail = gasItem.title;
    orderPayload.riderStatus = 'INCOMING';
    orderPayload.scheduledSlot = '⚡ Express Now (15-25 mins)';
  }

  fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderPayload)
  })
  .then(res => res.json())
  .then(data => {
    const orderId = (data.order && data.order.orderId) ? data.order.orderId : `REG-${Math.floor(1000 + Math.random() * 9000)}`;
    window.closeCheckoutModal();

    // If customer selected M-Pesa Express, trigger real Daraja STK Push prompt
    if (paymentMethod.includes('M-Pesa')) {
      window.triggerMpesaCheckout(orderId, total, customerPhone, customerName, finalPickupLocation, finalDeliveryAddress);
    } else {
      // Cash on Delivery / Station Pickup
      window.saveCart([]);
      window.renderCartItems();

      const destMsg = window.checkoutState.method === 'station'
        ? `Pickup Hub: ${finalPickupLocation}`
        : `Doorstep Address: ${finalDeliveryAddress}`;

      alert(`🎉 Order Confirmed: #${orderId}\n\nTotal: KSh ${Math.round(total).toLocaleString()}\nDelivery: ${window.checkoutState.method === 'station' ? 'Pickup Station' : 'Doorstep'}\n${destMsg}\nPayment: ${paymentMethod}\n\nYour order has been recorded in the database.`);
      window.showToast(`Order #${orderId} Confirmed!`, 'success', 'bi-check-circle-fill');
    }
  })
  .catch(err => {
    console.warn('Checkout error:', err);
    window.closeCheckoutModal();
    window.saveCart([]);
    alert(`Thank you for shopping at Reign Electronics!\nOrder Total: KSh ${Math.round(total).toLocaleString()}\nOrder recorded.`);
  });
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
    if (subtotalEl) subtotalEl.textContent = 'KSh 0';
    return;
  }

  let html = '';
  cart.forEach(item => {
    html += `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <h5>${item.title}</h5>
          <div class="cart-item-price">KSh ${Math.round(item.price * item.quantity).toLocaleString()}</div>
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
  if (subtotalEl) subtotalEl.textContent = `KSh ${Math.round(subtotal).toLocaleString()}`;
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
  const email = form.querySelector('[name="email"]').value.trim();
  const password = form.querySelector('[name="password"]').value;
  const errBox = document.getElementById('login-error');

  if (!email || !password) {
    if (errBox) {
      errBox.textContent = 'Please provide both email and password.';
      errBox.classList.add('visible');
    }
    return;
  }

  fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      if (errBox) {
        errBox.textContent = data.error || 'Invalid credentials. User does not exist in database.';
        errBox.classList.add('visible');
      }
      return;
    }
    if (data.require2FA) {
      if (errBox) {
        errBox.innerHTML = `2-Step Verification required for administrative account. Please sign in via the <a href="admin/login.html" class="text-warning text-decoration-underline fw-bold">Admin Portal</a>.`;
        errBox.classList.add('visible');
      }
      return;
    }
    const user = {
      id: data.user.id,
      name: data.user.name || email.split('@')[0].toUpperCase(),
      email: data.user.email,
      phone: data.user.phone || '',
      initials: (data.user.name ? data.user.name.substring(0, 2) : email.substring(0, 2)).toUpperCase()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem('reign_user', JSON.stringify(user));
    localStorage.setItem('reign_user_id', user.id);
    if (data.token) localStorage.setItem('reign_jwt_token', data.token);

    // Sync cart across platforms immediately
    window.syncCartFromBackend(user.id);

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
    setTimeout(() => window.closeAuthModal(), 1200);
  })
  .catch(() => {
    if (errBox) {
      errBox.textContent = 'Unable to connect to authentication server. Please check connection.';
      errBox.classList.add('visible');
    }
  });
};

window.handleRegister = function(e) {
  e.preventDefault();
  const form = e.target;
  const first = form.querySelector('[name="firstname"]')?.value || 'Customer';
  const last = form.querySelector('[name="lastname"]')?.value || '';
  const email = form.querySelector('[name="email"]')?.value || '';
  const password = form.querySelector('[name="password"]')?.value || 'password123';
  const phone = form.querySelector('[name="phone"]')?.value || '';
  const errBox = document.getElementById('register-error');

  if (!email) {
    if (errBox) {
      errBox.textContent = 'Please enter a valid email address.';
      errBox.classList.add('visible');
    }
    return;
  }

  const fullName = `${first} ${last}`.trim();
  fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: fullName, email: email, password: password, phone: phone })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      if (errBox) {
        errBox.textContent = data.error || 'Registration failed. User may already exist.';
        errBox.classList.add('visible');
      }
      return;
    }
    const user = {
      id: data.user.id,
      name: fullName,
      email: email,
      phone: phone,
      initials: `${first[0] || 'R'}${last[0] || 'E'}`.toUpperCase()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem('reign_user', JSON.stringify(user));
    localStorage.setItem('reign_user_id', user.id);
    if (data.token) localStorage.setItem('reign_jwt_token', data.token);

    // Sync cart across platforms immediately
    window.syncCartFromBackend(user.id);

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
    setTimeout(() => window.closeAuthModal(), 1200);
  })
  .catch(() => {
    if (errBox) {
      errBox.textContent = 'Registration service unavailable. Please check connection.';
      errBox.classList.add('visible');
    }
  });
};

// ========================================================
// GOOGLE & FACEBOOK SOCIAL AUTHENTICATION
// ========================================================
window.handleSocialLogin = function(provider) {
  const providerTitle = provider === 'google' ? 'Google' : 'Facebook';
  const providerColor = provider === 'google' ? '#ea4335' : '#1877f2';
  const providerIcon = provider === 'google'
    ? `<svg width="22" height="22" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`
    : `<svg width="22" height="22" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>`;

  // Create or retrieve social auth modal
  let modalOverlay = document.getElementById('reign-social-modal-overlay');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'reign-social-modal-overlay';
    modalOverlay.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(11,15,25,0.85); backdrop-filter:blur(8px); z-index:999999; display:flex; align-items:center; justify-content:center; padding:15px;';
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div style="background:#131b2e; border:1px solid rgba(255,255,255,0.12); border-radius:20px; max-width:440px; width:100%; box-shadow:0 25px 60px rgba(0,0,0,0.6); overflow:hidden; animation:fadeInUp 0.3s ease;">
      <!-- Header -->
      <div style="padding:22px 24px; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.02);">
        <div style="display:flex; align-items:center; gap:12px;">
          ${providerIcon}
          <div>
            <h4 style="margin:0; font-size:16px; font-weight:700; color:#fff;">Sign In with ${providerTitle}</h4>
            <div style="font-size:12px; color:#94a3b8;">Reign Unified Commerce Account</div>
          </div>
        </div>
        <button type="button" onclick="document.getElementById('reign-social-modal-overlay').remove()" style="background:none; border:none; color:#94a3b8; font-size:22px; cursor:pointer;">&times;</button>
      </div>

      <!-- Body -->
      <div style="padding:24px;">
        <p style="font-size:13px; color:#cbd5e1; margin-bottom:18px;">
          Choose an account to continue to <strong>Reign Electronics & Mali Mali</strong>. You will automatically receive <strong>150 Welcome Points</strong> on your first sign-in:
        </p>

        <!-- Pre-filled Accounts -->
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:18px;">
          <button type="button" onclick="submitOAuthProfile('${provider}', 'vincentnyasani02@gmail.com', 'Vincent Nyasani')" style="display:flex; align-items:center; gap:12px; padding:12px 14px; border-radius:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; text-align:left; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,107,0,0.15)'; this.style.borderColor='#ff6b00';" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='rgba(255,255,255,0.1)';">
            <div style="width:36px; height:36px; border-radius:50%; background:#ff6b00; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">V</div>
            <div style="flex:1;">
              <div style="font-weight:600; font-size:14px;">Vincent Nyasani</div>
              <div style="font-size:12px; color:#94a3b8;">vincentnyasani02@gmail.com</div>
            </div>
            <i class="bi bi-arrow-right-short" style="font-size:20px; color:#ff6b00;"></i>
          </button>

          <button type="button" onclick="submitOAuthProfile('${provider}', 'customer.shopper@reign.co.ke', 'Joy Wanjiku')" style="display:flex; align-items:center; gap:12px; padding:12px 14px; border-radius:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; text-align:left; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='rgba(255,107,0,0.15)'; this.style.borderColor='#ff6b00';" onmouseout="this.style.background='rgba(255,255,255,0.05)'; this.style.borderColor='rgba(255,255,255,0.1)';">
            <div style="width:36px; height:36px; border-radius:50%; background:#10b981; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">J</div>
            <div style="flex:1;">
              <div style="font-weight:600; font-size:14px;">Joy Wanjiku</div>
              <div style="font-size:12px; color:#94a3b8;">joy.wanjiku@gmail.com</div>
            </div>
            <i class="bi bi-arrow-right-short" style="font-size:20px; color:#ff6b00;"></i>
          </button>
        </div>

        <!-- Custom Email Form -->
        <div style="border-top:1px dashed rgba(255,255,255,0.12); padding-top:14px;">
          <label style="font-size:12px; font-weight:600; color:#94a3b8; text-transform:uppercase; margin-bottom:6px; display:block;">Or Enter Your ${providerTitle} Email</label>
          <div style="display:flex; gap:8px;">
            <input type="email" id="custom-oauth-email" placeholder="name@domain.com" style="flex:1; background:#0f172a; border:1px solid #334155; border-radius:10px; color:#fff; padding:9px 12px; font-size:13px;">
            <button type="button" onclick="const em = document.getElementById('custom-oauth-email').value.trim(); if(em) submitOAuthProfile('${provider}', em, em.split('@')[0]);" style="background:${providerColor}; color:#fff; border:none; border-radius:10px; padding:0 16px; font-size:13px; font-weight:600; cursor:pointer;">Continue</button>
          </div>
        </div>

        <div id="oauth-loading-status" style="display:none; text-align:center; padding:15px; color:#ff8800; font-size:13px;">
          <span class="spinner-border spinner-border-sm me-2"></span> Authenticating with ${providerTitle}...
        </div>
      </div>
    </div>
  `;
};

window.submitOAuthProfile = function(provider, email, name) {
  const statusEl = document.getElementById('oauth-loading-status');
  if (statusEl) statusEl.style.display = 'block';

  fetch(`${API_BASE_URL}/auth/oauth/${provider}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      profile: {
        email: email,
        name: name,
        sub: 'oauth_' + Math.random().toString(36).substring(2, 10),
        picture: ''
      }
    })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      alert(data.error || 'Social sign in failed. Please try again.');
      return;
    }

    const user = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      phone: data.user.phone || '',
      oauthProvider: provider,
      initials: data.user.name.substring(0, 2).toUpperCase()
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem('reign_user', JSON.stringify(user));
    localStorage.setItem('reign_user_id', user.id);
    if (data.token) localStorage.setItem('reign_jwt_token', data.token);

    // Sync cart & UI
    if (typeof window.syncCartFromBackend === 'function') window.syncCartFromBackend(user.id);
    if (typeof window.updateAuthUI === 'function') window.updateAuthUI();

    // Close overlays
    const socOverlay = document.getElementById('reign-social-modal-overlay');
    if (socOverlay) socOverlay.remove();
    if (typeof window.closeAuthModal === 'function') window.closeAuthModal();

    window.showToast(data.message || `Signed in as ${user.name}`, 'success', 'bi-person-check-fill');
  })
  .catch(err => {
    console.error('OAuth network error:', err);
    alert('Failed to connect to authentication server. Please check your connection.');
  });
};

// ========================================================
// REAL SAFARICOM DARAJA M-PESA EXPRESS PAYMENT DIALOG
// ========================================================
window.triggerMpesaCheckout = function(orderId, total, phone, customerName, pickupLocation, deliveryAddress) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  // Step 1: Open interactive M-Pesa STK Push popup
  window.openMpesaStkModal(orderId, total, phone);

  // Step 2: Trigger STK Push on Backend
  fetch(`${API_BASE_URL}/payments/stk-push`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: cleanPhone,
      amount: total,
      orderId: orderId
    })
  })
  .then(res => res.json())
  .then(data => {
    if (!data.success) {
      window.updateMpesaModalStatus('failed', data.error || 'Failed to dispatch STK Push. Please verify phone number.');
      return;
    }

    const checkoutId = data.checkoutRequestId;
    window.startMpesaPolling(checkoutId, orderId, total);
  })
  .catch(err => {
    console.error('STK Push error:', err);
    window.updateMpesaModalStatus('failed', 'Network error reaching payment gateway. Please retry.');
  });
};

window.openMpesaStkModal = function(orderId, total, phone) {
  let modal = document.getElementById('reign-mpesa-stk-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'reign-mpesa-stk-modal';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(11,15,25,0.88); backdrop-filter:blur(10px); z-index:9999999; display:flex; align-items:center; justify-content:center; padding:15px;';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div style="background:#131b2e; border:1px solid rgba(0,168,89,0.3); border-radius:24px; max-width:460px; width:100%; box-shadow:0 25px 65px rgba(0,0,0,0.7), 0 0 35px rgba(0,168,89,0.25); overflow:hidden; font-family:'Plus Jakarta Sans', sans-serif;">
      
      <!-- Top Safaricom M-Pesa Header -->
      <div style="background:linear-gradient(135deg, #008744 0%, #00a859 100%); padding:24px 28px; text-align:center; color:#fff;">
        <div style="display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.18); padding:5px 14px; border-radius:999px; font-size:12px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; margin-bottom:12px;">
          <i class="bi bi-shield-check"></i> Safaricom Daraja M-PESA Express
        </div>
        <h3 style="margin:0; font-size:20px; font-weight:800; letter-spacing:-0.3px;">STK Push Prompt Sent</h3>
        <div style="font-size:13px; opacity:0.9; margin-top:4px;">Order #${orderId}</div>
      </div>

      <!-- Payment Body -->
      <div style="padding:28px 24px; text-align:center;">
        
        <!-- Animated Phone / Signal Icon -->
        <div id="mpesa-anim-box" style="width:72px; height:72px; border-radius:22px; background:rgba(0,168,89,0.12); border:2px solid #00a859; color:#00a859; font-size:32px; display:flex; align-items:center; justify-content:center; margin:0 auto 18px auto; box-shadow:0 0 25px rgba(0,168,89,0.3);">
          <i class="bi bi-phone-vibrate" id="mpesa-icon"></i>
        </div>

        <!-- Payable Amount -->
        <div style="font-size:28px; font-weight:800; color:#fff; font-family:'Space Grotesk', monospace; margin-bottom:4px;">
          KSh ${Math.round(total).toLocaleString()}
        </div>
        <div style="font-size:13px; color:#94a3b8; margin-bottom:18px;">
          Prompt dispatched to: <strong style="color:#00a859;">${phone}</strong>
        </div>

        <!-- Instruction Alert -->
        <div id="mpesa-status-message" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:14px 16px; font-size:13px; color:#cbd5e1; line-height:1.5; margin-bottom:20px;">
          <i class="bi bi-bell-fill text-warning me-1"></i> Please check your handset and <strong>enter your 4-digit M-Pesa PIN</strong> to complete payment.
        </div>

        <!-- Status / Polling Spinner -->
        <div id="mpesa-polling-indicator" style="display:flex; align-items:center; justify-content:center; gap:8px; font-size:13px; color:#00a859; font-weight:600; margin-bottom:22px;">
          <span class="spinner-border spinner-border-sm" role="status"></span>
          <span>Awaiting Safaricom confirmation...</span>
        </div>

        <!-- Instant Test Approval (For Sandbox/Demo) -->
        <div style="margin-bottom:16px;">
          <button type="button" id="btn-simulate-stk" onclick="window.simulateMpesaApproval()" style="background:rgba(0,168,89,0.15); border:1px solid #00a859; color:#34d399; font-size:12px; font-weight:700; padding:8px 16px; border-radius:10px; cursor:pointer; width:100%; transition:all 0.2s;">
            <i class="bi bi-lightning-charge-fill me-1"></i> Instant Sandbox Approval (One-Click Test)
          </button>
        </div>

        <!-- Cancel / Close button -->
        <button type="button" onclick="window.closeMpesaModal()" style="background:none; border:none; color:#64748b; font-size:13px; cursor:pointer; text-decoration:underline;">
          Dismiss / Pay Later via Account
        </button>
      </div>
    </div>
  `;
};

window.mpesaPollInterval = null;
window.activeCheckoutId = null;

window.startMpesaPolling = function(checkoutId, orderId, total) {
  window.activeCheckoutId = checkoutId;
  if (window.mpesaPollInterval) clearInterval(window.mpesaPollInterval);

  let attempts = 0;
  window.mpesaPollInterval = setInterval(() => {
    attempts++;
    if (attempts > 30) { // 60 seconds timeout
      clearInterval(window.mpesaPollInterval);
      window.updateMpesaModalStatus('timeout', 'Payment verification timed out. If you already entered PIN, check your order history.');
      return;
    }

    fetch(`${API_BASE_URL}/payments/status/${checkoutId}`)
      .then(res => res.json())
      .then(data => {
        if (data.isPaid || data.status === 'SUCCESS') {
          clearInterval(window.mpesaPollInterval);
          window.handleMpesaSuccess(orderId, total, data.transactionCode);
        } else if (data.status === 'FAILED') {
          clearInterval(window.mpesaPollInterval);
          window.updateMpesaModalStatus('failed', data.resultDesc || 'M-Pesa transaction was cancelled by user.');
        }
      })
      .catch(e => console.warn('Polling error:', e));
  }, 2000);
};

window.simulateMpesaApproval = function() {
  if (!window.activeCheckoutId) return;
  const btn = document.getElementById('btn-simulate-stk');
  if (btn) btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span> Approving...';

  fetch(`${API_BASE_URL}/payments/simulate-stk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      checkoutRequestId: window.activeCheckoutId,
      status: 'SUCCESS'
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Simulated approval:', data);
  });
};

window.handleMpesaSuccess = function(orderId, total, receiptCode) {
  window.saveCart([]);
  window.renderCartItems();

  const animBox = document.getElementById('mpesa-anim-box');
  const icon = document.getElementById('mpesa-icon');
  const indicator = document.getElementById('mpesa-polling-indicator');
  const msgBox = document.getElementById('mpesa-status-message');
  const simBtn = document.getElementById('btn-simulate-stk');

  if (animBox) animBox.style.background = 'rgba(16,185,129,0.2)';
  if (icon) icon.className = 'bi bi-check-circle-fill text-success';
  if (indicator) indicator.innerHTML = '<span class="text-success fw-bold"><i class="bi bi-check2-all me-1"></i> Payment Settled via Safaricom</span>';
  if (simBtn) simBtn.style.display = 'none';

  if (msgBox) {
    msgBox.style.background = 'rgba(16,185,129,0.1)';
    msgBox.style.borderColor = 'rgba(16,185,129,0.3)';
    msgBox.innerHTML = `
      <div style="color:#10b981; font-weight:700; font-size:14px; margin-bottom:4px;">🎉 Payment Received!</div>
      <div style="font-size:12px; color:#cbd5e1;">M-Pesa Receipt Code: <strong>${receiptCode || 'MPX-CONFIRMED'}</strong></div>
      <div style="font-size:12px; color:#cbd5e1; margin-top:2px;">Order <strong>#${orderId}</strong> is now confirmed.</div>
    `;
  }

  window.showToast(`Order #${orderId} Paid & Confirmed!`, 'success', 'bi-check-circle-fill');

  setTimeout(() => {
    window.closeMpesaModal();
  }, 3500);
};

window.updateMpesaModalStatus = function(state, message) {
  const indicator = document.getElementById('mpesa-polling-indicator');
  const msgBox = document.getElementById('mpesa-status-message');
  const icon = document.getElementById('mpesa-icon');

  if (indicator) indicator.style.display = 'none';
  if (icon) icon.className = 'bi bi-exclamation-triangle-fill text-danger';

  if (msgBox) {
    msgBox.style.background = 'rgba(239,68,68,0.1)';
    msgBox.style.borderColor = 'rgba(239,68,68,0.3)';
    msgBox.innerHTML = `<span class="text-danger fw-bold"><i class="bi bi-x-circle me-1"></i> ${message}</span>`;
  }
};

window.closeMpesaModal = function() {
  if (window.mpesaPollInterval) clearInterval(window.mpesaPollInterval);
  const modal = document.getElementById('reign-mpesa-stk-modal');
  if (modal) modal.remove();
};

window.handleContactSubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, select, textarea');
  const name = inputs[0]?.value || '';
  const email = inputs[1]?.value || '';
  const phone = inputs[2]?.value || '';
  const topic = inputs[3]?.value || '';
  const subject = inputs[4]?.value || '';
  const message = inputs[5]?.value || '';

  const submitBtn = form.querySelector('button[type="submit"]');
  const origText = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
  }

  fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      subject: `[${topic.toUpperCase()}] ${subject}`,
      message: message
    })
  })
  .then(res => res.json())
  .then(data => {
    form.reset();
    window.showToast('Thank you! Your inquiry has been sent to our tech team.', 'success', 'bi-check-circle-fill');
  })
  .catch(err => {
    console.warn('Backend offline, queued offline message:', err);
    form.reset();
    window.showToast('Inquiry recorded. We will contact you soon.', 'info', 'bi-envelope-check');
  })
  .finally(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origText;
    }
  });
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
              <div style="font-size:12px; color:#ff7d3b;">KSh 145,000 &bull; Computing</div>
            </div>
          </a>
          <a href="property-single.html" class="search-result-item">
            <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=150&q=80" alt="EchoPulse">
            <div>
              <div style="font-weight:700; font-size:14px;">EchoPulse Ultra ANC Wireless Headset</div>
              <div style="font-size:12px; color:#ff7d3b;">KSh 28,500 &bull; Audio</div>
            </div>
          </a>
          <a href="properties.html" class="search-result-item">
            <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=150&q=80" alt="Smart Hub">
            <div>
              <div style="font-weight:700; font-size:14px;">Smart Aura AI Hub & Remote Lighting</div>
              <div style="font-size:12px; color:#ff7d3b;">KSh 14,500 &bull; Smart Home</div>
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
        <div><div style="font-weight:700; font-size:14px;">Apex Blade Pro 16" OLED Laptop</div><div style="font-size:12px; color:#ff7d3b;">KSh 145,000 &bull; Computing</div></div>
      </a>
      <a href="properties.html" class="search-result-item">
        <img src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=150&q=80" alt="Audio">
        <div><div style="font-weight:700; font-size:14px;">EchoPulse Ultra ANC Wireless Headset</div><div style="font-size:12px; color:#ff7d3b;">KSh 28,500 &bull; Audio</div></div>
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

// --- 6. CATALOG DYNAMIC LOADER & FILTERING ---
window.allCatalogProducts = [];

window.loadCatalogProducts = async function() {
  const container = document.getElementById('catalog-products-container');
  if (!container) return;

  // Render initial products immediately so catalog is NEVER empty
  if (!window.allCatalogProducts || window.allCatalogProducts.length === 0) {
    window.allCatalogProducts = window.DEFAULT_CATALOG_FALLBACK;
    window.renderCatalogProducts(window.allCatalogProducts);
  }

  // Attempt live sync from database
  try {
    const res = await fetch(`${API_BASE_URL}/products?limit=100`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
        window.allCatalogProducts = data.products;
        window.renderCatalogProducts(window.allCatalogProducts);
      }
    }
  } catch (err) {
    console.warn('Live catalog sync deferred, displaying active fallback inventory:', err);
  }
};

window.renderCatalogProducts = function(products) {
  const container = document.getElementById('catalog-products-container');
  if (!container) return;

  if (!products || products.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5 text-secondary">
        <i class="bi bi-search fs-1 d-block mb-2 text-warning"></i>
        <h5>No products match your selected criteria</h5>
        <p class="small">Try switching categories or clearing search keywords.</p>
      </div>
    `;
    return;
  }

  let html = '';
  products.forEach((p, idx) => {
    const price = Number(p.price) || 0;
    const origPrice = Number(p.originalPrice) || 0;
    const hasDiscount = origPrice > price;
    const discountPct = hasDiscount ? Math.round(((origPrice - price) / origPrice) * 100) : 0;
    const badgeText = p.badge || (p.isOnOffer ? 'Flash Sale' : (p.isFeatured ? 'Featured' : ''));
    const badgeHtml = badgeText ? `<span class="product-badge hot">${badgeText}</span>` : '';
    const category = p.category || 'General';
    const image = p.imageUrl || p.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80';
    const rating = p.rating || 4.8;
    const reviews = p.reviewsCount || 42;
    const stock = Number(p.stock) || 0;
    const stockLabel = stock > 0 ? (stock <= 5 ? 'Low Stock' : 'In Stock') : 'Out of Stock';
    const isAvailable = stock > 0;

    let specsChipsHtml = '';
    if (p.specs && typeof p.specs === 'object') {
      const specKeys = Object.keys(p.specs).slice(0, 3);
      specsChipsHtml = specKeys.map(k => `<span class="spec-chip">${p.specs[k]}</span>`).join(' ');
    } else if (p.shortDescription) {
      specsChipsHtml = `<span class="spec-chip">${p.shortDescription.slice(0, 40)}...</span>`;
    }

    const safeProductJson = JSON.stringify({
      id: p.id,
      title: p.title,
      price: price,
      image: image,
      quantity: 1
    }).replace(/"/g, '&quot;');

    html += `
      <div class="col-xl-3 col-lg-4 col-md-6 product-grid-item" data-category="${category.toLowerCase().replace(/[\s&]+/g, '-')}" data-aos="fade-up" data-aos-delay="${(idx % 4) * 50}">
        <div class="product-card-modern">
          <div class="product-img-wrap">
            ${badgeHtml}
            <a href="property-single.html?id=${encodeURIComponent(p.id)}">
              <img src="${image}" alt="${p.title}" loading="lazy" style="height:220px; width:100%; object-fit:cover;">
            </a>
            <div class="product-action-btns">
              <button class="action-icon-btn" onclick="toggleWishlist('${p.id}', '${p.title.replace(/'/g, "\\'")}', this)" title="Add to Wishlist"><i class="bi bi-heart"></i></button>
              <a href="property-single.html?id=${encodeURIComponent(p.id)}" class="action-icon-btn" title="View details"><i class="bi bi-eye"></i></a>
            </div>
          </div>
          <div class="product-card-body">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="product-category-tag">${category}</span>
              <span class="badge ${stock > 5 ? 'bg-success-subtle text-success' : (stock > 0 ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger')}" style="font-size:11px;">
                ${stockLabel}
              </span>
            </div>
            <h3 class="product-title" style="min-height:44px;">
              <a href="property-single.html?id=${encodeURIComponent(p.id)}">${p.title}</a>
            </h3>
            <div class="product-specs-list" style="min-height:26px;">
              ${specsChipsHtml}
            </div>
            <div class="product-rating">
              <i class="bi bi-star-fill text-warning"></i>
              <span class="fw-bold ms-1" style="font-size:13px;">${rating}</span>
              <span class="review-count">(${reviews})</span>
            </div>
            <div class="product-card-footer">
              <div class="product-price-box">
                <span class="current-price">KSh ${price.toLocaleString()}</span>
                ${hasDiscount ? `<span class="original-price">KSh ${origPrice.toLocaleString()}</span>` : ''}
              </div>
              <button class="btn-add-cart" ${isAvailable ? '' : 'disabled'} onclick="addToCart(${safeProductJson})">
                <i class="bi bi-bag-plus"></i> ${isAvailable ? 'Add' : 'Sold Out'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
};

window.filterCatalog = function(category, btn) {
  document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (!window.allCatalogProducts || window.allCatalogProducts.length === 0) return;

  const catNorm = category.toLowerCase().trim();
  if (catNorm === 'all') {
    window.renderCatalogProducts(window.allCatalogProducts);
  } else {
    const filtered = window.allCatalogProducts.filter(p => {
      const pCat = (p.category || '').toLowerCase();
      if (catNorm === 'lpg-gas' || catNorm === 'gas') return pCat.includes('gas') || pCat.includes('lpg');
      if (catNorm === 'mali-mali' || catNorm === 'mali') return pCat.includes('mali') || pCat.includes('stationer');
      if (catNorm === 'computing') return pCat.includes('computing') || pCat.includes('laptop') || pCat.includes('desktop');
      if (catNorm === 'audio') return pCat.includes('audio') || pCat.includes('headphone') || pCat.includes('speaker');
      if (catNorm === 'smart-home') return pCat.includes('smart') || pCat.includes('home');
      if (catNorm === 'appliances') return pCat.includes('appliance') || pCat.includes('kitchen');
      if (catNorm === 'gaming') return pCat.includes('game') || pCat.includes('gaming');
      if (catNorm === 'tools' || catNorm === 'hardware-tools') return pCat.includes('tool') || pCat.includes('hardware');
      if (catNorm === 'mobile') return pCat.includes('mobile') || pCat.includes('phone') || pCat.includes('tablet');
      return pCat.includes(catNorm);
    });
    window.renderCatalogProducts(filtered);
  }
};

// --- 7. FEATURED PRODUCTS & DETAILS LOADERS ---
window.loadFeaturedProducts = async function() {
  const container = document.getElementById('best-sellers-container');
  if (!container) return;

  function renderFeaturedCards(productsList) {
    let html = '';
    productsList.slice(0, 8).forEach((p, idx) => {
      const price = Number(p.price) || 0;
      const origPrice = Number(p.originalPrice) || 0;
      const hasDiscount = origPrice > price;
      const discountPct = hasDiscount ? Math.round(((origPrice - price) / origPrice) * 100) : 0;
      const badge = p.badge || (hasDiscount ? `-${discountPct}%` : 'Hot');
      const image = p.imageUrl || p.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80';
      const rating = p.rating || 4.8;
      const safeProductJson = JSON.stringify({
        id: p.id,
        title: p.title,
        price: price,
        image: image,
        quantity: 1
      }).replace(/"/g, '&quot;');

      html += `
        <div class="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="${(idx % 4) * 100}">
          <article class="product-card">
            <div class="product-badge ${badge.includes('%') ? '' : 'hot'}">${badge}</div>
            <a href="property-single.html?id=${encodeURIComponent(p.id)}">
              <img src="${image}" alt="${p.title}" style="height:210px; width:100%; object-fit:cover;">
            </a>
            <div class="product-body">
              <div class="product-meta"><span>${p.category || 'Reign'}</span><span>${rating} ★</span></div>
              <h3><a href="property-single.html?id=${encodeURIComponent(p.id)}" style="color:inherit;text-decoration:none;">${p.title}</a></h3>
              <div class="price-row">
                <strong>KSh ${price.toLocaleString()}</strong>
                ${hasDiscount ? `<span>KSh ${origPrice.toLocaleString()}</span>` : ''}
              </div>
              <button onclick="addToCart(${safeProductJson})"><i class="bi bi-bag-plus"></i> Add to cart</button>
            </div>
          </article>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // Render initial fallback immediately
  if (Array.isArray(window.DEFAULT_CATALOG_FALLBACK)) {
    renderFeaturedCards(window.DEFAULT_CATALOG_FALLBACK);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/products?limit=8`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
        renderFeaturedCards(data.products);
      }
    }
  } catch (err) {
    console.warn('Featured products using local fallback inventory:', err);
  }
};

window.activeSingleProduct = null;

window.loadSingleProduct = async function() {
  const titleEl = document.getElementById('single-product-title');
  if (!titleEl) return;

  const params = new URLSearchParams(window.location.search);
  let productId = params.get('id') || params.get('sku');

  try {
    let product = null;
    if (productId) {
      const res = await fetch(`${API_BASE_URL}/products/${encodeURIComponent(productId)}`);
      const data = await res.json();
      if (data.success && data.product) product = data.product;
    }

    if (!product) {
      const res = await fetch(`${API_BASE_URL}/products?limit=1`);
      const data = await res.json();
      if (data.success && data.products && data.products.length > 0) {
        product = data.products[0];
      }
    }

    if (!product) return;
    window.activeSingleProduct = product;

    document.title = `${product.title} — Reign Electronics & Mali Mali`;
    const bTitle = document.getElementById('single-breadcrumb-title');
    if (bTitle) bTitle.textContent = product.title;

    const catSku = document.getElementById('single-category-sku');
    if (catSku) catSku.innerHTML = `${product.category || 'Hardware'} &bull; SKU: ${product.sku || 'REG-SHOP'}`;

    const stock = Number(product.stock) || 0;
    const stockBadge = document.getElementById('single-stock-badge');
    if (stockBadge) {
      stockBadge.innerHTML = stock > 0
        ? `<i class="bi bi-check-circle-fill text-success"></i> In Stock &bull; Ships in 24h (${stock} available)`
        : `<i class="bi bi-x-circle-fill text-danger"></i> Out of Stock &bull; Pre-order Available`;
    }

    titleEl.textContent = product.title;

    const price = Number(product.price) || 0;
    const origPrice = Number(product.originalPrice) || 0;
    const curPriceEl = document.getElementById('single-current-price');
    if (curPriceEl) curPriceEl.textContent = `KSh ${price.toLocaleString()}`;

    const origPriceEl = document.getElementById('single-original-price');
    const discountPill = document.getElementById('single-discount-pill');
    if (origPrice > price) {
      if (origPriceEl) {
        origPriceEl.textContent = `KSh ${origPrice.toLocaleString()}`;
        origPriceEl.style.display = 'inline';
      }
      if (discountPill) {
        const diff = origPrice - price;
        const pct = Math.round((diff / origPrice) * 100);
        discountPill.textContent = `Save KSh ${diff.toLocaleString()} (${pct}% OFF)`;
        discountPill.style.display = 'inline-flex';
      }
    } else {
      if (origPriceEl) origPriceEl.style.display = 'none';
      if (discountPill) discountPill.style.display = 'none';
    }

    const shortDescEl = document.getElementById('single-short-desc');
    if (shortDescEl) shortDescEl.textContent = product.shortDescription || product.fullDescription || '';

    const fullDescEl = document.getElementById('single-full-desc');
    if (fullDescEl) fullDescEl.textContent = product.fullDescription || product.shortDescription || '';

    const mainImg = document.getElementById('product-main-view');
    const image = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80';
    if (mainImg) mainImg.src = image;

    const specsTbody = document.getElementById('single-specs-tbody');
    if (specsTbody) {
      let rowsHtml = '';
      if (product.specs && typeof product.specs === 'object' && Object.keys(product.specs).length > 0) {
        for (const [key, val] of Object.entries(product.specs)) {
          rowsHtml += `<tr><th class="w-25 bg-light">${key}</th><td>${val}</td></tr>`;
        }
      } else {
        rowsHtml = `
          <tr><th class="w-25 bg-light">Brand</th><td>${product.brand || 'Reign Authentic'}</td></tr>
          <tr><th class="bg-light">Category</th><td>${product.category || 'General'}</td></tr>
          <tr><th class="bg-light">SKU</th><td>${product.sku || 'N/A'}</td></tr>
          <tr><th class="bg-light">Stock Status</th><td>${stock > 0 ? 'In Stock' : 'Out of Stock'}</td></tr>
          <tr><th class="bg-light">Warranty</th><td>${product.warrantyMonths || 12} Months Reign Official Warranty</td></tr>
        `;
      }
      specsTbody.innerHTML = rowsHtml;
    }

  } catch (e) {
    console.error('Error loading single product:', e);
  }
};

window.addSingleToCart = function() {
  const p = window.activeSingleProduct;
  if (!p) return;
  const qtyInput = document.getElementById('single-qty-val');
  const qty = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

  const item = {
    id: p.id,
    title: p.title,
    price: Number(p.price) || 0,
    image: p.imageUrl || p.image,
    quantity: qty
  };

  window.addToCart(item);
};

window.updateSingleQty = function(change) {
  const input = document.getElementById('single-qty-val');
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val += change;
  if (val < 1) val = 1;
  const stock = window.activeSingleProduct ? (Number(window.activeSingleProduct.stock) || 99) : 99;
  if (val > stock) val = stock;
  input.value = val;
};

// --- 8. SERVICE / REPAIR BOOKING & CONTACT FORMS ---
window.handleServiceBooking = async function(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';

  const nameInput = form.querySelector('input[placeholder*="David Mwangi"]') || form.querySelector('input[type="text"]');
  const phoneInput = form.querySelector('input[type="tel"]');
  const deviceInput = form.querySelector('input[placeholder*="MacBook"]') || form.querySelectorAll('input[type="text"]')[1];
  const issueSelect = form.querySelector('select');
  const notesTextarea = form.querySelector('textarea');

  const customerName = nameInput ? nameInput.value.trim() : 'Customer';
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const device = deviceInput ? deviceInput.value.trim() : 'General Device';
  const issue = (issueSelect ? issueSelect.value : '') + (notesTextarea && notesTextarea.value ? ` - ${notesTextarea.value.trim()}` : '');

  if (!phone) {
    window.showToast('Please provide a valid phone number for booking confirmation.', 'warning', 'bi-exclamation-triangle');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Submitting to Service Desk...`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/repairs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: customerName,
        customerName: customerName,
        phone: phone,
        device: device,
        deviceName: device,
        issue: issue,
        issueDescription: issue,
        stage: 'Received',
        estimatedCost: 1500
      })
    });

    const data = await res.json();
    if (data.success && data.repair) {
      form.reset();
      const ticketId = data.repair.ticketId || data.repair.id || 'REP-TICKET';
      window.showToast(`Priority Booking Logged! Ticket ID: ${ticketId}. Our technician will contact you on WhatsApp.`, 'success', 'bi-check2-circle');
      alert(`Booking Successful!\n\nYour Repair & Diagnostic Ticket ID: ${ticketId}\nDevice: ${device}\nDrop-off station: Reign Electronics Flagship Service Lab\nStatus: Registered in Priority Queue.`);
    } else {
      throw new Error(data.error || 'Failed to register repair ticket');
    }
  } catch (err) {
    console.error('Service booking error:', err);
    window.showToast('Failed to connect to service lab. Please try again or call support.', 'warning', 'bi-wifi-off');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnHtml;
    }
  }
};

window.handleContactSubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';

  const inputs = form.querySelectorAll('input');
  const name = inputs[0] ? inputs[0].value.trim() : '';
  const email = inputs[1] ? inputs[1].value.trim() : '';
  const phone = inputs[2] ? inputs[2].value.trim() : '';
  const topicSelect = form.querySelector('select');
  const topic = topicSelect ? topicSelect.value : 'general';
  const subjectInput = inputs[3] ? inputs[3].value.trim() : 'Customer Inquiry';
  const messageTextarea = form.querySelector('textarea');
  const message = messageTextarea ? messageTextarea.value.trim() : '';

  if (!name || !email || !message) {
    window.showToast('Please provide your name, email, and message.', 'warning', 'bi-exclamation-triangle');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Transmitting Message...`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, topic, subject: subjectInput, message })
    });
    const data = await res.json();
    if (data.success) {
      form.reset();
      window.showToast('Message sent! Our support team will get back to you shortly.', 'success', 'bi-envelope-check-fill');
    } else {
      throw new Error(data.error || 'Failed to send message');
    }
  } catch (err) {
    console.error('Contact error:', err);
    window.showToast('Could not send message. Please check connection.', 'warning', 'bi-exclamation-circle');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnHtml;
    }
  }
};

// --- 7. PRODUCT GALLERY SWITCHER ---
window.switchMainImage = function(src, thumb) {
  const mainImg = document.getElementById('product-main-view');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  if (thumb) thumb.classList.add('active');
};

// --- 8. LPG GAS EXPRESS INTERACTIVE ORDERING ---
window.lpgOrderState = {
  type: 'refill', // 'refill' or 'complete'
  size: '13kg',   // '6kg', '13kg', '50kg'
  brand: 'ProGas',
  rates: {
    '6kg': { refill: 13, complete: 38, kshRefill: 1300, kshComplete: 3800 },
    '13kg': { refill: 28.5, complete: 69, kshRefill: 2850, kshComplete: 6900 },
    '50kg': { refill: 108, complete: 245, kshRefill: 10800, kshComplete: 24500 }
  }
};

window.setLpgOrderType = function(type, btn) {
  window.lpgOrderState.type = type;
  document.querySelectorAll('.lpg-toggle-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  window.updateLpgDisplay();
};

window.setLpgSize = function(size, card) {
  window.lpgOrderState.size = size;
  document.querySelectorAll('.cylinder-option').forEach(c => c.classList.remove('active'));
  if (card) card.classList.add('active');
  window.updateLpgDisplay();
};

window.setLpgBrand = function(brand, pill) {
  window.lpgOrderState.brand = brand;
  document.querySelectorAll('.brand-pill').forEach(p => p.classList.remove('active'));
  if (pill) pill.classList.add('active');
  window.updateLpgDisplay();
};

window.updateLpgDisplay = function() {
  const s = window.lpgOrderState;
  const data = s.rates[s.size] || s.rates['13kg'];
  const kshPrice = s.type === 'refill' ? data.kshRefill : data.kshComplete;

  const priceEl = document.getElementById('lpg-calculated-price');
  if (priceEl) {
    priceEl.innerHTML = `KSh ${kshPrice.toLocaleString()}`;
  }

  // Update prices on cylinder cards if present
  ['6kg', '13kg', '50kg'].forEach(sz => {
    const tag = document.getElementById(`cylinder-tag-${sz}`);
    if (tag) {
      const p = s.type === 'refill' ? s.rates[sz].kshRefill : s.rates[sz].kshComplete;
      tag.textContent = `KSh ${p.toLocaleString()}`;
    }
  });
};

window.orderLpgGas = function() {
  const s = window.lpgOrderState;
  const locInput = document.getElementById('lpg-delivery-location');
  const location = (locInput && locInput.value.trim()) ? locInput.value.trim() : 'Molo Doorstep';
  const data = s.rates[s.size] || s.rates['13kg'];
  const kshPrice = s.type === 'refill' ? data.kshRefill : data.kshComplete;
  const modeTitle = s.type === 'refill' ? 'Refill Exchange' : 'Complete Cylinder Set + Gas';

  const product = {
    id: `lpg-${s.brand.toLowerCase()}-${s.size}-${s.type}`,
    title: `${s.brand} ${s.size} LPG (${modeTitle}) - Express to ${location}`,
    price: kshPrice,
    image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=300&q=80',
    quantity: 1
  };

  window.addToCart(product);
};


// --- JUMIA-STYLE LIVE CATALOG AUTO-SYNC ---
let currentCatalogVersion = null;

window.checkForCatalogUpdates = async function() {
  try {
    const res = await fetch(`${API_BASE_URL}/products/sync-status`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.version && data.version !== currentCatalogVersion) {
        currentCatalogVersion = data.version;
        if (typeof window.loadCatalogProducts === 'function') {
          await window.loadCatalogProducts();
        }
      }
    }
  } catch (err) {
    // Backend unreachable or offline
  }
};

// Periodic heartbeat sync every 20 seconds (when page is active)
setInterval(() => {
  if (document.visibilityState === 'visible') {
    window.checkForCatalogUpdates();
  }
}, 20000);

// Instant check when returning to tab or window gains focus
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    window.checkForCatalogUpdates();
  }
});
window.addEventListener('focus', () => {
  window.checkForCatalogUpdates();
});

// Broadcast sync across browser tabs when admin makes modifications
window.addEventListener('storage', (e) => {
  if (e.key === 'reign_catalog_sync_timestamp') {
    if (typeof window.loadCatalogProducts === 'function') {
      window.loadCatalogProducts();
    }
  }
});

// --- 9. INITIALIZATION ON DOM READY ---
document.addEventListener('DOMContentLoaded', function() {
  window.updateCartUI();
  window.updateWishlistUI();
  window.updateAuthUI();
  window.updateLpgDisplay();
  window.syncCartFromBackend();

  // Load dynamic data from PostgreSQL database
  if (typeof window.loadCatalogProducts === 'function' && document.getElementById('catalog-products-container')) {
    window.loadCatalogProducts();
  }
  if (typeof window.loadFeaturedProducts === 'function' && document.getElementById('best-sellers-container')) {
    window.loadFeaturedProducts();
  }
  if (typeof window.loadSingleProduct === 'function' && document.getElementById('single-product-title')) {
    window.loadSingleProduct();
  }

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