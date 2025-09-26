
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector(".mobileMenu");
  const mobileMenuPanel = document.querySelector(".mobileMenuPanel");
  const xMarkButton = document.querySelector(".x-markButton");
  const scrollIndicator = document.getElementById("scrollIndicator");
  const header = document.getElementById('header');
  const anaSayfa = document.getElementById('ana-sayfa');

  // Header'ı güncelleyen fonksiyon
  function updateHeader() {
    const anaSayfaRect = anaSayfa.getBoundingClientRect();

    // Kullanıcı anasayfadaysa
    const isAnaSayfa =
      window.location.hash === '#ana-sayfa' ||
      (window.location.hash === '' && anaSayfaRect.top <= 0 && anaSayfaRect.bottom >= 0);

    if (isAnaSayfa) {
      // Anasayfadaysa header her zaman şeffaf olsun
      header.classList.add('bg-transparent');
      header.classList.remove('bg-black/80', 'backdrop-blur-sm');
    } else {
      // Diğer sayfalarda siyah ve blur olsun
      header.classList.add('bg-black/80', 'backdrop-blur-sm');
      header.classList.remove('bg-transparent');
    }
  }

  // İlk çalıştır ve olayları dinle
  updateHeader();
  window.addEventListener('scroll', updateHeader);
  window.addEventListener('hashchange', updateHeader);


  /* menu açma tusu */
  mobileMenuButton.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenuPanel.classList.toggle("hidden");  //hidden varsa çıkar, yoksa ekle.
  });

  /* menu kapatma tusu */
  xMarkButton.addEventListener("click", (e) => {
    e.preventDefault();
    mobileMenuPanel.classList.toggle("hidden");
  });

  /* menudeki ogelerden birine tıklayınca menuyu kapat */
  document.querySelectorAll(".mobileMenuPanel .pages a").forEach((link) =>
    link.addEventListener("click", () => {
      mobileMenuPanel.classList.toggle("hidden");

    })
  );


  // Menü dışına tıklayınca menuyu kapatma
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = mobileMenuPanel.contains(e.target);
    const isClickOnButton = mobileMenuButton.contains(e.target);

    if (!isClickInsideMenu && !isClickOnButton) {
      mobileMenuPanel.classList.add('hidden');
    }
  });

  /* scroll indicator uyarısı çıkış zamanları */
  setTimeout(() => {
    scrollIndicator.classList.toggle("hidden");
  }, 4000);

  setTimeout(() => {
    scrollIndicator.classList.toggle("hidden");
  }, 5000);



  // Sayfa yüklendiğinde orijinal metinleri ve placeholderları sakla (Dil çevirme için)
  document.querySelectorAll("[data-en]").forEach((el) => {
    if (el.placeholder !== undefined && el.placeholder !== null) {
      el.dataset.originalPlaceholder = el.placeholder;
    } else {
      el.dataset.originalText = el.textContent;
    }
  });

});


/* scroll aşağı kaydıkça navbarı gizle */
let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Aşağı kaydırıyor → header gizle
    header.style.transform = "translateY(-100%)";
  } else {
    // Yukarı kaydırıyor → header göster
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});




/* ÜRÜNLER SAYFASI GEÇİŞLERİ*/
document.addEventListener('DOMContentLoaded', () => {
  const cardSlider = document.getElementById('card-slider');
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const toggleButtons = document.querySelectorAll('.toggle-content');

  // Kart içeriklerini açıp kapama işlevi
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.card'); // Tıklanan butonun en yakınındaki .card elementini bul
      const cardContent = card.querySelector('.card-content');
      const buttonText = button.querySelector('span');
      const buttonIcon = button.querySelector('i');

      // max-h sınıfını kaldırıp ekleyerek animasyonu tetikleme
      if (cardContent.classList.contains('max-h-48')) {
        cardContent.classList.remove('max-h-48', 'overflow-hidden');
        buttonText.textContent =currentLang === 'en' ? 'Show less' : 'Daha az göster';
        buttonIcon.classList.remove('fa-arrow-down');
        buttonIcon.classList.add('fa-arrow-up');
      } else {
        cardContent.classList.add('max-h-48', 'overflow-hidden');
        buttonText.textContent =currentLang === 'en' ? 'Show more' : 'Daha fazla göster';
        buttonIcon.classList.remove('fa-arrow-up');
        buttonIcon.classList.add('fa-arrow-down');
      }
    });
  });

  // Yatay kaydırma işlevi (Ürünler Sayfası)
  scrollRightBtn.addEventListener('click', () => {
    cardSlider.scrollBy({
      left: 350, // Kart genişliği + boşluk
      behavior: 'smooth'
    });
  });

  scrollLeftBtn.addEventListener('click', () => {
    cardSlider.scrollBy({
      left: -350, // Kart genişliği + boşluk
      behavior: 'smooth'
    });
  });
});


/* DİL SEÇİM */
let currentLang = "tr";

// Tüm lang butonlarını yakala
document.querySelectorAll(".langMenuButton").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // Aynı butonun içindeki dropdown'u bul
    const dropdown = btn.parentElement.querySelector(".langMenu");
    dropdown.classList.toggle("hidden");

    // Diğer açık menüleri kapat
    document.querySelectorAll(".langMenu").forEach((menu, i) => {
      if (i !== index) menu.classList.add("hidden");
    });
  });
});

// Her dropdown içindeki dil seçeneğini işle
document.querySelectorAll(".langMenu").forEach((menu) => {
  menu.querySelectorAll("button").forEach((langBtn) => {
    langBtn.addEventListener("click", () => {
      const selectedLang = langBtn.dataset.lang;
      currentLang = selectedLang;

      // Menü kapat
      menu.classList.add("hidden");

      // Diğer dil butonları güncellenebilirse
      document.querySelectorAll(".langToggle").forEach((b) => {
        b.textContent = currentLang === "tr" ? "EN" : "TR";
      });

      // Sayfa içeriğini güncelle
      document.querySelectorAll("[data-en]").forEach((el) => {
        if (el.placeholder !== undefined && el.placeholder !== null) {
          el.placeholder =
            currentLang === "en"
              ? el.getAttribute("data-en")
              : el.dataset.originalPlaceholder;
        } else {
          el.textContent =
            currentLang === "en"
              ? el.getAttribute("data-en")
              : el.dataset.originalText;
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById('header');
  const anaSayfa = document.getElementById('ana-sayfa');

  function updateHeader() {
    const anaSayfaRect = anaSayfa.getBoundingClientRect();

    // Gerçekten ekranda mı? (yukardan başladı ve altı görünür durumda mı?)
    const isAnaSayfaVisible = anaSayfaRect.top <= 0 && anaSayfaRect.bottom > 100;

    if (isAnaSayfaVisible) {
      // Anasayfa görünüyorsa şeffaf
      header.classList.add('bg-transparent');
      header.classList.remove('bg-black/80', 'backdrop-blur-sm');
    } else {
      // Değilse siyah ve blur
      header.classList.add('bg-black/80', 'backdrop-blur-sm');
      header.classList.remove('bg-transparent');
    }
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader);
  window.addEventListener('hashchange', updateHeader);
});

// Sayfa dışında bir yere tıklanırsa dropdown'u kapat
document.addEventListener("click", (e) => {
  const isDropdown = e.target.closest(".langMenuButton") || e.target.closest(".langMenu");
  if (!isDropdown) {
    document.querySelectorAll(".langMenu").forEach((menu) => menu.classList.add("hidden"));
  }
});




// mobil için animasyon hızı ayarla (daha hızlı olmalı)

function setMarqueeSpeed() {
  const marquee = document.getElementById('brandMarquee');
  const isMobile = window.innerWidth < 768;

  if (marquee) {
    // Reset animasyonu
    marquee.style.animation = 'none';
    void marquee.offsetWidth; // Force reflow
    marquee.style.animation = `marquee ${isMobile ? '10s' : '20s'} linear infinite`;
  }
}

/* Menu içinden dil seçimi (fullscreen menü) */ 
document.querySelectorAll('.mobileMenuPanel [data-lang]').forEach((langBtn) => {
  langBtn.addEventListener('click', () => {
    const selectedLang = langBtn.dataset.lang;
    currentLang = selectedLang;

    // Sayfa içeriğini güncelle
    document.querySelectorAll("[data-en]").forEach((el) => {
      if (el.placeholder !== undefined && el.placeholder !== null) {
        el.placeholder =
          currentLang === "en"
            ? el.getAttribute("data-en")
            : el.dataset.originalPlaceholder;
      } else {
        el.textContent =
          currentLang === "en"
            ? el.getAttribute("data-en")
            : el.dataset.originalText;
      }
    });

    // Toggle butonlarını da güncelle (varsa)
    document.querySelectorAll(".langToggle").forEach((b) => {
      b.textContent = currentLang === "tr" ? "EN" : "TR";
    });
    document.querySelector(".mobileMenuPanel").classList.add("hidden");
  });
});
