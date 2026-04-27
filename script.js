/* ===== CHÁ DE PANELA — DAVI & CLARA ===== */
/* JavaScript otimizado e organizado */

'use strict';

// ===== CONFIGURAÇÕES =====
const MP_LINK = 'https://link.mercadopago.com.br/chadpanelaclaraedavi';

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  initGiftButtons();
  initCountdown();
  initAutoHideNav();
  initFormHandling();
});

// ===== BOTÕES DE PRESENTES =====
function initGiftButtons() {
  const giftButtons = document.querySelectorAll('a.gift-buy[data-gift-key]');
  giftButtons.forEach(btn => {
    btn.href = MP_LINK;
    btn.classList.remove('gift-buy--pending');
  });
}

// ===== CONTAGEM REGRESSIVA =====
function initCountdown() {
  const targetDate = new Date('2026-05-29T19:30:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById('days').textContent = '0';
      document.getElementById('hours').textContent = '0';
      document.getElementById('minutes').textContent = '0';
      document.getElementById('seconds').textContent = '0';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===== AUTO HIDE NAV (MOBILE ONLY) =====
function initAutoHideNav() {
  if (!window.matchMedia('(max-width: 768px)').matches) return;

  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastY = window.pageYOffset;
  let ticking = false;

  function update() {
    const y = window.pageYOffset;

    if (y > 120 && y > lastY) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

// ===== FORM HANDLING =====
function initFormHandling() {
  const form = document.querySelector('form');
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

  // Desabilita o botão durante o envio
  btnEnviar.disabled = true;
  btnEnviar.style.opacity = '0.6';
  statusEl.textContent = 'Enviando...';
  statusEl.style.color = 'var(--ink-muted)';

  // Simula envio (em produção, isso seria uma chamada a um servidor)
  setTimeout(() => {
    statusEl.textContent = '✓ Confirmação recebida com sucesso! Obrigado por confirmar sua presença.';
    statusEl.style.color = 'var(--forest)';
    
    // Limpa o formulário
    document.getElementById('rsvp-nome').value = '';
    document.querySelectorAll('input[name="rsvp-presenca"]').forEach(input => input.checked = false);
    
    // Reabilita o botão após 3 segundos
    setTimeout(() => {
      btnEnviar.disabled = false;
      btnEnviar.style.opacity = '1';
      statusEl.textContent = '';
    }, 3000);
  }, 1500);
}
