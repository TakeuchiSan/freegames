// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
  const languageSelect = document.getElementById('language-select');
  
  // Load saved language preference or default to English
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  languageSelect.value = savedLanguage;
  loadLanguage(savedLanguage);
  
  // Change language on select
  languageSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    localStorage.setItem('preferredLanguage', selectedLanguage);
    loadLanguage(selectedLanguage);
  });
});

// Load language translations
function loadLanguage(lang) {
  // In a real implementation, you would fetch this from translations.json
  const translations = {
    en: {
      hero_title: "Get Free Game Accounts & Redeem Codes",
      hero_desc: "Daily updated free Mobile Legends and Free Fire accounts plus working redeem codes for in-game items.",
      get_accounts: "Get Free Accounts",
      get_codes: "Get Redeem Codes",
      free_accounts: "Free Game Accounts",
      accounts_desc: "Claim these free accounts for Mobile Legends and Free Fire. Updated daily!",
      all: "All",
      ml: "Mobile Legends",
      ff: "Free Fire",
      load_more: "Load More",
      redeem_codes: "Redeem Codes",
      redeem_desc: "Latest working redeem codes for Mobile Legends and Free Fire.",
      about_us: "About Us",
      about_text1: "Welcome to GameFreebies, your number one source for free game accounts and redeem codes. We're dedicated to providing you the best of free gaming resources, with a focus on Mobile Legends and Free Fire.",
      about_text2: "Our team works hard to verify all accounts and codes before sharing them with our community. We update our content daily to ensure you get fresh, working freebies.",
      about_text3: "This service is completely free for all gamers. We support the gaming community by helping players access premium content without cost.",
      footer_about: "GameFreebies provides free game accounts and redeem codes for popular mobile games like Mobile Legends and Free Fire.",
      quick_links: "Quick Links",
      home: "Home",
      contact: "Contact",
      copyright: "© 2023 GameFreebies. All Rights Reserved."
    },
    id: {
      hero_title: "Dapatkan Akun Game & Kode Redeem Gratis",
      hero_desc: "Akun Mobile Legends dan Free Fire gratis yang diperbarui setiap hari plus kode redeem yang bekerja untuk item dalam game.",
      get_accounts: "Dapatkan Akun Gratis",
      get_codes: "Dapatkan Kode Redeem",
      free_accounts: "Akun Game Gratis",
      accounts_desc: "Klaim akun gratis untuk Mobile Legends dan Free Fire ini. Diperbarui setiap hari!",
      all: "Semua",
      ml: "Mobile Legends",
      ff: "Free Fire",
      load_more: "Muat Lebih Banyak",
      redeem_codes: "Kode Redeem",
      redeem_desc: "Kode redeem terbaru yang bekerja untuk Mobile Legends dan Free Fire.",
      about_us: "Tentang Kami",
      about_text1: "Selamat datang di GameFreebies, sumber nomor satu Anda untuk akun game dan kode redeem gratis. Kami berdedikasi untuk memberikan yang terbaik dari sumber daya game gratis, dengan fokus pada Mobile Legends dan Free Fire.",
      about_text2: "Tim kami bekerja keras untuk memverifikasi semua akun dan kode sebelum membagikannya dengan komunitas kami. Kami memperbarui konten kami setiap hari untuk memastikan Anda mendapatkan freebie yang segar dan bekerja.",
      about_text3: "Layanan ini sepenuhnya gratis untuk semua gamer. Kami mendukung komunitas gaming dengan membantu pemain mengakses konten premium tanpa biaya.",
      footer_about: "GameFreebies menyediakan akun game dan kode redeem gratis untuk game mobile populer seperti Mobile Legends dan Free Fire.",
      quick_links: "Tautan Cepat",
      home: "Beranda",
      contact: "Kontak",
      copyright: "© 2023 GameFreebies. Semua Hak Dilindungi."
    }
  };
  
  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update page title
  if (lang === 'en') {
    document.title = "GameFreebies - Free Accounts & Redeem Codes";
  } else if (lang === 'id') {
    document.title = "GameFreebies - Akun & Kode Redeem Gratis";
  }
}
