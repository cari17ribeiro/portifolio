import './style.css'

declare const lucide: any;

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa os ícones
  lucide.createIcons();

  const splash = document.getElementById('splash');
  const splashText = document.getElementById('text-rotate');
  const splashPhrases = [
    'Analista de Dados',
    'Engenheira Mecânica',
    'Apaixonada por Tecnologia',
  ];

  if (splash && splashText) {
    let phraseIndex = 0;
    let phraseTimer: number | undefined;
    let hideTimer: number | undefined;

    const hideSplash = () => {
      window.clearTimeout(phraseTimer);
      window.clearTimeout(hideTimer);
      splash.classList.add('splash-hidden');
    };

    const showNextPhrase = () => {
      splashText.classList.remove('is-visible');

      window.setTimeout(() => {
        splashText.textContent = splashPhrases[phraseIndex];
        splashText.classList.add('is-visible');
        phraseIndex += 1;

        if (phraseIndex < splashPhrases.length) {
          phraseTimer = window.setTimeout(showNextPhrase, 2200);
        } else {
          hideTimer = window.setTimeout(hideSplash, 2200);
        }
      }, phraseIndex === 0 ? 0 : 300);
    };

    showNextPhrase();
    splash.addEventListener('click', hideSplash, { once: true });
  }

  // Lógica de animação no scroll
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        // Só remove a classe se o elemento estiver saindo por baixo da tela
        if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('active');
        }
      }
    });
  }, {
    threshold: 0.15 
  });

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // ==========================================
  // Lógica para tocar GIFs apenas no hover
  // ==========================================
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    // Usando cast para HTMLImageElement para o TypeScript reconhecer as propriedades
    const img = card.querySelector('.project-media img') as HTMLImageElement;
    
    // Verifica se a imagem existe e se ela tem um GIF configurado no atributo 'data-gif'
    if (img && img.dataset.gif) {
      const staticSrc = img.src; // A imagem normal (capa)
      const animatedSrc = img.dataset.gif; // O GIF animado

      card.addEventListener('mouseenter', () => {
        img.src = animatedSrc; // Troca para o GIF quando o mouse entra
      });

      card.addEventListener('mouseleave', () => {
        img.src = staticSrc; // Volta para a capa parada quando o mouse sai
      });
    }
  });
});
