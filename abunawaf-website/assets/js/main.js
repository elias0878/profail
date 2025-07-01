/**
 * Main JavaScript File
 * فريق أبونواف - الموقع الرسمي
 */

document.addEventListener('DOMContentLoaded', function() {
  initializeWebsite();
});

/**
 * تهيئة الموقع
 */
function initializeWebsite() {
  // تحميل بيانات الموقع
  loadSiteData();
  
  // إعداد القائمة الرئيسية
  setupNavbar();
  
  // إعداد الروابط الاجتماعية
  setupSocialLinks();
  
  // إعداد الأزرار
  setupActionButtons();
  
  // إعداد التحريك
  setupAnimations();
  
  // إعداد إمكانية الوصول
  setupAccessibility();
  
  // تحسين الأداء
  optimizePerformance();
}

/**
 * تحميل بيانات الموقع
 */
async function loadSiteData() {
  try {
    // تحميل بيانات الموقع الأساسية
    const siteInfoResponse = await fetch('/data/site-info.json');
    const siteInfo = await siteInfoResponse.json();
    
    // تطبيق بيانات الموقع
    applySiteInfo(siteInfo);
    
    // تحميل بيانات الخدمات إذا كنا في صفحة الخدمات
    if (document.querySelector('.services-section')) {
      const servicesResponse = await fetch('/data/services.json');
      const services = await servicesResponse.json();
      renderServices(services);
    }
    
    // تحميل بيانات فريق العمل إذا كنا في صفحة من نحن
    if (document.querySelector('.team-section')) {
      const teamResponse = await fetch('/data/team.json');
      const team = await teamResponse.json();
      renderTeam(team);
    }
    
    // تحميل بيانات التقييمات إذا كنا في صفحة التقييمات
    if (document.querySelector('.testimonials-section')) {
      const testimonialsResponse = await fetch('/data/testimonials.json');
      const testimonials = await testimonialsResponse.json();
      renderTestimonials(testimonials);
    }
  } catch (error) {
    console.error('Error loading site data:', error);
    showNotification('حدث خطأ أثناء تحميل بيانات الموقع', 'error');
  }
}

/**
 * تطبيق بيانات الموقع الأساسية
 */
function applySiteInfo(siteInfo) {
  // تطبيق عنوان الموقع
  document.title = siteInfo.site.name + ' | ' + siteInfo.site.tagline;
  
  // تطبيق الوصف التعريفي
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', siteInfo.site.description);
  }
  
  // تطبيق الكلمات المفتاحية
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', siteInfo.meta.keywords);
  }
  
  // تطبيق اسم الفريق
  const teamNameElements = document.querySelectorAll('.team-name');
  teamNameElements.forEach(element => {
    element.textContent = siteInfo.site.name;
  });
  
  // تطبيق معلومات الاتصال
  const locationElements = document.querySelectorAll('.contact-location');
  locationElements.forEach(element => {
    element.textContent = siteInfo.contact.location;
  });
  
  const workingHoursElements = document.querySelectorAll('.contact-hours');
  workingHoursElements.forEach(element => {
    element.textContent = siteInfo.contact.working_hours;
  });
  
  const closedDaysElements = document.querySelectorAll('.contact-closed');
  closedDaysElements.forEach(element => {
    element.textContent = siteInfo.contact.closed_days;
  });
  
  const phoneElements = document.querySelectorAll('.contact-phone');
  phoneElements.forEach(element => {
    element.textContent = siteInfo.contact.phone;
    if (element.tagName === 'A') {
      element.href = 'tel:' + siteInfo.contact.phone;
    }
  });
  
  const emailElements = document.querySelectorAll('.contact-email');
  emailElements.forEach(element => {
    element.textContent = siteInfo.contact.email;
    if (element.tagName === 'A') {
      element.href = 'mailto:' + siteInfo.contact.email;
    }
  });
  
  // تطبيق روابط التواصل الاجتماعي
  const socialLinks = {
    'facebook': '.social-facebook',
    'instagram': '.social-instagram',
    'twitter': '.social-twitter',
    'telegram': '.social-telegram',
    'snapchat': '.social-snapchat',
    'tiktok': '.social-tiktok',
    'github': '.social-github'
  };
  
  for (const [platform, selector] of Object.entries(socialLinks)) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (siteInfo.social_media[platform]) {
        element.href = siteInfo.social_media[platform];
      }
    });
  }
  
  // تطبيق الإحصائيات
  const clientsElements = document.querySelectorAll('.stats-clients');
  clientsElements.forEach(element => {
    element.textContent = siteInfo.site.clients;
  });
  
  const satisfactionElements = document.querySelectorAll('.stats-satisfaction');
  satisfactionElements.forEach(element => {
    element.textContent = siteInfo.site.satisfaction_rate;
  });
  
  const ratingElements = document.querySelectorAll('.stats-rating');
  ratingElements.forEach(element => {
    element.textContent = siteInfo.site.average_rating;
  });
  
  const foundedElements = document.querySelectorAll('.stats-founded');
  foundedElements.forEach(element => {
    element.textContent = siteInfo.site.founded;
  });
}

/**
 * عرض الخدمات
 */
function renderServices(services) {
  const servicesContainer = document.querySelector('.services-grid');
  if (!servicesContainer) return;
  
  // تفريغ الحاوية
  servicesContainer.innerHTML = '';
  
  // عرض الخدمات
  services.forEach(service => {
    const serviceCard = createServiceCard(service);
    servicesContainer.appendChild(serviceCard);
  });
  
  // إعداد تصفية الخدمات
  setupServiceFilters(services);
}

/**
 * إنشاء بطاقة خدمة
 */
function createServiceCard(service) {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.dataset.category = service.category;
  card.dataset.subcategory = service.subcategory;
  
  // إضافة الفئات للبطاقة
  if (service.popular) card.classList.add('popular');
  if (service.new) card.classList.add('new');
  
  // إنشاء محتوى البطاقة
  card.innerHTML = `
    <div class="service-card-header">
      <i class="fas ${service.icon} service-card-icon"></i>
      <h3 class="service-card-title">${service.title}</h3>
      <div class="service-card-price">${service.price} ريال</div>
    </div>
    <div class="service-card-content">
      <p class="service-card-description">${service.summary}</p>
      <div class="service-card-details" style="display: none;">
        <p>${service.description}</p>
        <h4>خطوات العمل:</h4>
        <ul>
          ${service.workflow.map(step => `<li>${step}</li>`).join('')}
        </ul>
        <h4>المدة المتوقعة:</h4>
        <p>${service.duration}</p>
        <h4>نسبة النجاح:</h4>
        <p>${service.success_rate}</p>
      </div>
    </div>
    <div class="service-card-footer">
      <div class="service-card-meta">
        <i class="fas fa-clock"></i>
        <span>${service.duration}</span>
      </div>
      <button class="btn btn-sm btn-primary service-details-btn">عرض التفاصيل</button>
    </div>
  `;
  
  // إضافة حدث النقر لزر التفاصيل
  const detailsBtn = card.querySelector('.service-details-btn');
  const detailsContent = card.querySelector('.service-card-details');
  
  detailsBtn.addEventListener('click', function() {
    if (detailsContent.style.display === 'none') {
      detailsContent.style.display = 'block';
      detailsBtn.textContent = 'إخفاء التفاصيل';
    } else {
      detailsContent.style.display = 'none';
      detailsBtn.textContent = 'عرض التفاصيل';
    }
  });
  
  return card;
}

/**
 * إعداد تصفية الخدمات
 */
function setupServiceFilters(services) {
  const filterButtons = document.querySelectorAll('.service-filter');
  if (!filterButtons.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // إزالة الفئة النشطة من جميع الأزرار
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // إضافة الفئة النشطة للزر المحدد
      this.classList.add('active');
      
      // الحصول على فئة التصفية
      const filter = this.dataset.filter;
      
      // تصفية الخدمات
      const serviceCards = document.querySelectorAll('.service-card');
      serviceCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // تفعيل زر "جميع الخدمات" افتراضيًا
  const allButton = document.querySelector('.service-filter[data-filter="all"]');
  if (allButton) {
    allButton.classList.add('active');
  }
}

/**
 * عرض فريق العمل
 */
function renderTeam(team) {
  const teamContainer = document.querySelector('.team-grid');
  if (!teamContainer) return;
  
  // تفريغ الحاوية
  teamContainer.innerHTML = '';
  
  // عرض أعضاء الفريق
  team.forEach(member => {
    const memberCard = createTeamCard(member);
    teamContainer.appendChild(memberCard);
  });
}

/**
 * إنشاء بطاقة عضو فريق
 */
function createTeamCard(member) {
  const card = document.createElement('div');
  card.className = 'team-card';
  
  // التحقق من وجود صورة
  let imageHtml = '';
  if (member.image) {
    imageHtml = `<img src="${member.image}" alt="${member.name}" class="team-image">`;
  } else {
    imageHtml = `<div class="team-icon"><i class="fas ${member.icon}"></i></div>`;
  }
  
  // إنشاء روابط التواصل الاجتماعي
  let socialHtml = '';
  if (member.social_links) {
    socialHtml = '<div class="team-social">';
    if (member.social_links.linkedin) {
      socialHtml += `<a href="${member.social_links.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>`;
    }
    if (member.social_links.twitter) {
      socialHtml += `<a href="${member.social_links.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>`;
    }
    if (member.social_links.email) {
      socialHtml += `<a href="mailto:${member.social_links.email}"><i class="fas fa-envelope"></i></a>`;
    }
    socialHtml += '</div>';
  }
  
  // إنشاء قائمة المهارات
  let skillsHtml = '';
  if (member.skills && member.skills.length) {
    skillsHtml = '<div class="team-skills">';
    member.skills.forEach(skill => {
      skillsHtml += `<span class="team-skill">${skill}</span>`;
    });
    skillsHtml += '</div>';
  }
  
  // إنشاء محتوى البطاقة
  card.innerHTML = `
    ${imageHtml}
    <div class="team-content">
      <h3 class="team-name">${member.name}</h3>
      <div class="team-role">${member.role}</div>
      <p class="team-description">${member.description}</p>
      ${skillsHtml}
      ${socialHtml}
    </div>
  `;
  
  return card;
}

/**
 * عرض التقييمات
 */
function renderTestimonials(testimonials) {
  const testimonialsContainer = document.querySelector('.testimonials-grid');
  if (!testimonialsContainer) return;
  
  // تفريغ الحاوية
  testimonialsContainer.innerHTML = '';
  
  // عرض التقييمات
  testimonials.forEach(testimonial => {
    const testimonialCard = createTestimonialCard(testimonial);
    testimonialsContainer.appendChild(testimonialCard);
  });
}

/**
 * إنشاء بطاقة تقييم
 */
function createTestimonialCard(testimonial) {
  const card = document.createElement('div');
  card.className = 'testimonial-card';
  
  // إنشاء نجوم التقييم
  let starsHtml = '<div class="testimonial-rating">';
  for (let i = 1; i <= 5; i++) {
    if (i <= testimonial.rating) {
      starsHtml += '<i class="fas fa-star"></i>';
    } else {
      starsHtml += '<i class="far fa-star"></i>';
    }
  }
  starsHtml += '</div>';
  
  // إنشاء شارة التحقق
  let verifiedHtml = '';
  if (testimonial.verified) {
    verifiedHtml = '<div class="testimonial-verified"><i class="fas fa-check-circle"></i> تم التحقق</div>';
  }
  
  // إنشاء محتوى البطاقة
  card.innerHTML = `
    <div class="testimonial-quote">"</div>
    <p class="testimonial-text">${testimonial.text}</p>
    ${starsHtml}
    <div class="testimonial-author">
      <div class="testimonial-author-info">
        <h4 class="testimonial-author-name">${testimonial.client_name}</h4>
        <div class="testimonial-author-title">${testimonial.client_title}</div>
        ${verifiedHtml}
      </div>
    </div>
    <div class="testimonial-service">${testimonial.service_type}</div>
  `;
  
  return card;
}

/**
 * إعداد القائمة الرئيسية
 */
function setupNavbar() {
  const navbar = document.querySelector('.navbar');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (!navbar || !navbarToggle || !navbarMenu) return;
  
  // إضافة حدث النقر لزر القائمة
  navbarToggle.addEventListener('click', function() {
    navbarMenu.classList.toggle('show');
  });
  
  // إغلاق القائمة عند النقر خارجها
  document.addEventListener('click', function(event) {
    if (!navbarMenu.contains(event.target) && !navbarToggle.contains(event.target)) {
      navbarMenu.classList.remove('show');
    }
  });
  
  // تغيير مظهر القائمة عند التمرير
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // تحديد الصفحة النشطة
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * إعداد روابط التواصل الاجتماعي
 */
function setupSocialLinks() {
  const socialCards = document.querySelectorAll('.social-card');
  
  socialCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // السماح بالانتقال العادي إذا كان الرابط صحيحًا
      if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
        e.preventDefault();
        showNotification('سيتم توفير رابط ' + this.querySelector('h3').textContent + ' قريباً', 'info');
      }
      
      // تتبع النقرات على وسائل التواصل الاجتماعي
      trackSocialClick(this.classList[1]);
    });
  });
}

/**
 * إعداد الأزرار
 */
function setupActionButtons() {
  // زر الخدمات
  const servicesBtn = document.querySelector('.action-card.primary');
  if (servicesBtn) {
    servicesBtn.addEventListener('click', function(e) {
      // السماح بالانتقال العادي إلى صفحة الخدمات
    });
  }
  
  // زر الشروط
  const termsBtn = document.querySelector('.action-card.secondary');
  if (termsBtn) {
    termsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showTermsModal();
    });
  }
  
  // زر آراء العملاء
  const testimonialsBtn = document.querySelector('.action-card.tertiary');
  if (testimonialsBtn) {
    testimonialsBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openTelegramChannel();
    });
  }
}

/**
 * إظهار نافذة الشروط
 */
function showTermsModal() {
  const modal = document.getElementById('termsModal');
  if (!modal) return;
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // تتبع فتح النافذة
  trackEvent('modal_open', 'terms');
}

/**
 * إغلاق نافذة الشروط
 */
function closeTermsModal() {
  const modal = document.getElementById('termsModal');
  if (!modal) return;
  
  modal.classList.remove('show');
  document.body.style.overflow = '';
  
  // تتبع إغلاق النافذة
  trackEvent('modal_close', 'terms');
}

/**
 * فتح قناة تليجرام
 */
function openTelegramChannel() {
  // عرض رسالة حول قناة تليجرام
  showNotification('سيتم توجيهك إلى قناة تليجرام لمشاهدة آراء العملاء', 'info');
  
  // تتبع النقر على تليجرام
  trackEvent('telegram_click', 'testimonials');
  
  // فتح قناة تليجرام
  setTimeout(() => {
    window.open('https://t.me/KSA_hack01', '_blank');
  }, 1000);
}

/**
 * إعداد التحريك
 */
function setupAnimations() {
  // مراقب التقاطع للتحريك
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // مراقبة العناصر للتحريك
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * إعداد إمكانية الوصول
 */
function setupAccessibility() {
  // التنقل باستخدام لوحة المفاتيح للنافذة المنبثقة
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal.show');
      if (modal) {
        closeTermsModal();
      }
    }
  });
  
  // إدارة التركيز
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  
  // حصر التركيز في النافذة المنبثقة
  const modal = document.getElementById('termsModal');
  if (modal) {
    modal.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        const focusable = modal.querySelectorAll(focusableElements);
        const firstFocusable = focusable[0];
        const lastFocusable = focusable[focusable.length - 1];
        
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });
  }
}

/**
 * نظام الإشعارات
 */
function showNotification(message, type = 'info') {
  // إنشاء عنصر الإشعار
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // تحديد أيقونة الإشعار
  let icon = '';
  switch (type) {
    case 'success':
      icon = 'check-circle';
      break;
    case 'warning':
      icon = 'exclamation-triangle';
      break;
    case 'error':
      icon = 'exclamation-circle';
      break;
    default:
      icon = 'info-circle';
  }
  
  // إنشاء محتوى الإشعار
  notification.innerHTML = `
    <div class="notification-icon">
      <i class="fas fa-${icon}"></i>
    </div>
    <div class="notification-content">
      ${message}
    </div>
    <button class="notification-close" onclick="hideNotification(this.parentElement)">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // إضافة الإشعار إلى الصفحة
  document.body.appendChild(notification);
  
  // إظهار الإشعار
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  // إخفاء الإشعار تلقائيًا بعد 5 ثوانٍ
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);
}

/**
 * إخفاء الإشعار
 */
function hideNotification(notification) {
  notification.classList.remove('show');
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

/**
 * تتبع النقر على وسائل التواصل الاجتماعي
 */
function trackSocialClick(platform) {
  console.log('Social media clicked:', platform);
  
  // إرسال إلى خدمة التحليلات إذا كانت متوفرة
  if (typeof gtag !== 'undefined') {
    gtag('event', 'social_click', {
      event_category: 'Social Media',
      event_label: platform
    });
  }
}

/**
 * تتبع الحدث
 */
function trackEvent(action, category) {
  console.log('Event tracked:', action, category);
  
  // إرسال إلى خدمة التحليلات إذا كانت متوفرة
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category
    });
  }
}

/**
 * معالج النقر على الخلفية
 */
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    closeTermsModal();
  }
});

/**
 * التمرير السلس للروابط الداخلية
 */
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

/**
 * تحسين الأداء
 */
function optimizePerformance() {
  // تحميل الصور بشكل كسول
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // تحميل الموارد الحرجة مسبقًا
  const criticalResources = [
    'assets/css/main.css',
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.css') ? 'style' : 'font';
    if (resource.includes('font')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}

/**
 * تسجيل خدمة العامل
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(error) {
        console.log('ServiceWorker registration failed');
      });
  });
}

/**
 * معالجة الأخطاء
 */
window.addEventListener('error', function(e) {
  console.error('JavaScript error:', e.error);
  
  // تتبع الخطأ إذا كانت التحليلات متوفرة
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: e.error.message,
      fatal: false
    });
  }
});

/**
 * معالجة رفض الوعود غير المعالجة
 */
window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
  
  // تتبع الخطأ إذا كانت التحليلات متوفرة
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: 'Unhandled promise rejection: ' + e.reason,
      fatal: false
    });
  }
});

/**
 * واجهة برمجة رؤية الصفحة للتحليلات
 */
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'hidden') {
    trackEvent('page_hidden', 'engagement');
  } else {
    trackEvent('page_visible', 'engagement');
  }
});

/**
 * اكتشاف جهاز اللمس
 */
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// إضافة فئة اللمس للأجهزة التي تدعم اللمس
if (isTouchDevice()) {
  document.body.classList.add('touch-device');
}

/**
 * معالج تغيير الحجم للتعديلات المتجاوبة
 */
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // معالجة التعديلات المتجاوبة
    adjustForViewport();
  }, 250);
});

/**
 * ضبط العرض المتجاوب
 */
function adjustForViewport() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// تهيئة تعديلات العرض المتجاوب
adjustForViewport();

/**
 * منع التكبير عند النقر المزدوج لنظام iOS
 */
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

/**
 * وظيفة النسخ إلى الحافظة
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function() {
      showNotification('تم النسخ إلى الحافظة', 'success');
    }).catch(function() {
      fallbackCopyToClipboard(text);
    });
  } else {
    fallbackCopyToClipboard(text);
  }
}

/**
 * وظيفة النسخ إلى الحافظة البديلة
 */
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showNotification('تم النسخ إلى الحافظة', 'success');
  } catch (err) {
    showNotification('فشل في النسخ', 'error');
  }
  
  document.body.removeChild(textArea);
}

/**
 * التحقق من حالة العمل
 */
function checkWorkStatus() {
  const now = new Date();
  const hour = now.getHours() + (now.getMinutes()/60);
  const day = now.getDay();
  const statusElem = document.getElementById('statusIndicator');
  
  if (!statusElem) return;
  
  // تحديد حالة العمل
  const isFriday = day === 5; // الجمعة يوم إجازة
  const isHoliday = false; // يمكن إضافة منطق للعطل الرسمية
  const isWorkingHours = (hour >= 14.5 && hour < 24) || (hour >= 0 && hour < 0.5);
  
  if(isFriday || isHoliday || !isWorkingHours) {
    statusElem.classList.add('offline');
    statusElem.innerHTML = '<span>●</span> مغلق حالياً';
  } else {
    statusElem.classList.remove('offline');
    statusElem.innerHTML = '<span>●</span> متاح الآن';
  }
}

// تحديث حالة العمل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  checkWorkStatus();
  // تحديث الحالة كل 10 دقائق
  setInterval(checkWorkStatus, 600000);
});

