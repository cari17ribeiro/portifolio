import './style.css'

declare const lucide: any;

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa os ícones
  lucide.createIcons();

  // Lógica de Animação no Scroll (Reveal) repetitiva
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