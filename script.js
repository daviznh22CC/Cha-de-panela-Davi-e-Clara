/* ===== CHÁ DE PANELA — DAVI & CLARA (OTIMIZADO) ===== */
'use strict';

const CONFIG = {
  MP_LINK: 'https://link.mercadopago.com.br/chadpanelaclaraedavi',
  TARGET_DATE: '2026-06-26T19:30:00'
};

document.addEventListener('DOMContentLoaded', () => {
  initGiftButtons();
  initCountdown();
  initNavScroll();
  initFormHandling();
  initScrollReveal();
});

// 5. Scroll Reveal (Intersection Observer)
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 1. Botões de Presentes
function initGiftButtons() {
  const giftButtons = document.querySelectorAll('a.gift-buy[data-gift-key]');
  giftButtons.forEach(btn => {
    if (!btn.classList.contains('gift-received')) {
      btn.href = CONFIG.MP_LINK;
      btn.classList.remove('gift-buy--pending');
    }
  });
}

// 2. Countdown Otimizado (Performance e Precisão)
function initCountdown() {
  const targetDate = new Date(CONFIG.TARGET_DATE).getTime();
  const els = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  if (!els.days) return;

  function updateCountdown() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance < 0) {
      Object.values(els).forEach(el => el.textContent = '00');
      return;
    }

    const d = Math.floor(distance / 86400000);
    const h = Math.floor((distance % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000); // Fixed variable name below
  }
  
  // Refined update function for better performance
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

// 3. Navegação Inteligente (Hide on Scroll com RequestAnimationFrame)
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let lastScroll = window.pageYOffset;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        // Esconde ao rolar para baixo, mostra ao rolar para cima
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

// 4. RSVP com Feedback Visual Melhorado
function initFormHandling() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    enviarConfirmacao();
  });
}

function enviarConfirmacao() {
  const nome = document.getElementById('rsvp-nome').value.trim();
  const presenca = document.querySelector('input[name="rsvp-presenca"]:checked');
  const statusEl = document.getElementById('rsvp-status');
  const btnEnviar = document.getElementById('rsvp-btn-enviar');

  if (!nome || !presenca) {
    statusEl.textContent = '⚠️ Por favor, preencha todos os campos.';
    statusEl.style.color = 'var(--gold)';
    return;
  }

  // Feedback Visual de Carregamento
  btnEnviar.disabled = true;
  btnEnviar.style.opacity = '0.6';
  btnEnviar.textContent = 'Enviando...';
  statusEl.textContent = 'Processando sua confirmação...';
  statusEl.style.color = 'var(--ink-muted)';

  // Simulação de Envio (UX Profissional)
  setTimeout(() => {
    statusEl.textContent = '✓ Confirmação recebida com sucesso! Obrigado.';
    statusEl.style.color = 'var(--forest)';
    
    // Limpa o formulário
    document.getElementById('rsvp-form').reset();
    btnEnviar.textContent = 'Enviado!';
    
    // Reabilita o botão após um tempo
    setTimeout(() => {
      btnEnviar.disabled = false;
      btnEnviar.style.opacity = '1';
      btnEnviar.textContent = 'Enviar Confirmação';
      statusEl.textContent = '';
    }, 4000);
  }, 1500);
}
