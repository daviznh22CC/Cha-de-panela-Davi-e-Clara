/* ===== CHÁ DE PANELA — DAVI & CLARA (OTIMIZADO) ===== */
'use strict';

const CONFIG = {
  // Substitua pelo seu link real do WhatsApp
  WHATSAPP_LINK: 'https://wa.me/5585998184396?text=Olá! Gostaria de presentear vocês com: ',
  TARGET_DATE: '2026-06-26T19:30:00'
};

document.addEventListener('DOMContentLoaded', () => {
  initGiftButtons();
  initCountdown();
  initNavScroll();
  initFormHandling();
  initScrollReveal();
  initImageFadeIn();
});

// 1. Botões de Presentes (Direcionando para WhatsApp)
function initGiftButtons() {
  const giftButtons = document.querySelectorAll('a.gift-buy[data-gift-key]');
  giftButtons.forEach(btn => {
    if (!btn.classList.contains('gift-received')) {
      const giftName = btn.closest('.gift-card-body').querySelector('.gift-name').textContent;
      btn.href = CONFIG.WHATSAPP_LINK + encodeURIComponent(giftName);
      btn.classList.remove('gift-buy--pending');
    }
  });

  // Botão do WhatsApp no topo da lista
  const mainWaBtn = document.getElementById('main-wa-btn');
  if (mainWaBtn) {
    mainWaBtn.href = 'https://wa.me/5585999999999?text=Olá! Tenho uma dúvida sobre o Chá de Panela.';
  }
}

// 2. Countdown Restaurado e Otimizado
function initCountdown() {
  const targetDate = new Date(CONFIG.TARGET_DATE).getTime();
  const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  if (!els.days) return;

  const update = () => {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      Object.values(els).forEach(el => el.textContent = '00');
      return;
    }

    els.days.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    els.hours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    els.minutes.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    els.seconds.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  };

  update();
  setInterval(update, 1000);
}

// 3. Navegação Inteligente
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let lastScroll = window.pageYOffset;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 100) {
          nav.classList.remove('nav-hidden');
        } else if (currentScroll > lastScroll) {
          nav.classList.add('nav-hidden');
        } else {
          nav.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// 4. RSVP Form
function initFormHandling() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('rsvp-nome').value.trim();
    const presenca = document.querySelector('input[name="rsvp-presenca"]:checked').value;
    const btnEnviar = document.getElementById('rsvp-btn-enviar');
    const statusEl = document.getElementById('rsvp-status');

    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';
    
    // Feedback visual
    setTimeout(() => {
      statusEl.textContent = '✓ Confirmação recebida! Obrigado.';
      statusEl.style.color = 'var(--forest)';
      form.reset();
      btnEnviar.textContent = 'Enviado!';
    }, 1500);
  });
}

// 5. Scroll Reveal
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 6. Image Fade-in
function initImageFadeIn() {
  document.querySelectorAll('.gift-card-media img').forEach(img => {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'));
  });
}
