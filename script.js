// Loading Screen Animation
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen")
  const mainContent = document.getElementById("main-content")

  // Simular carregamento por 3 segundos
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    loadingScreen.style.transition = "opacity 0.5s ease-out"
    setTimeout(() => {
      loadingScreen.style.display = "none"
      mainContent.classList.remove("hidden")
      // Iniciar animações da página principal
      initializeAnimations()
    }, 500)
  }, 3000)
})

// Inicializar animações e funcionalidades
function initializeAnimations() {
  // Smooth scrolling para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Intersection Observer para animações de scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observar elementos para animação
  const animatedElements = document.querySelectorAll(".about-card, .event-card, .feature")
  animatedElements.forEach((el) => {
    el.classList.add("fade-in-up")
    observer.observe(el)
  })

  // Animação especial para cards
  const cards = document.querySelectorAll(".registration-card")
  cards.forEach((card) => {
    card.classList.add("scale-in")
    observer.observe(card)
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.95)"
    } else {
      header.style.background = "rgba(0, 0, 0, 0.8)"
    }
  })

  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const nav = document.querySelector(".nav")
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")
    })
  }

  // Programação tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  const dayContents = document.querySelectorAll(".day-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      dayContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Show corresponding day content
      const dayId = button.getAttribute("data-day")
      const dayContent = document.getElementById(dayId)
      if (dayContent) {
        dayContent.classList.add("active")
      }
    })
  })

  // Botões de ação
  const inscricaoButtons = document.querySelectorAll(".btn-primary, .btn-form")
  inscricaoButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.textContent.includes("Formulário") || button.textContent.includes("Vaga")) {
        e.preventDefault()
        // Aqui você pode adicionar o link real do formulário
        alert("Redirecionando para o formulário de inscrição...")
        // window.open('https://forms.google.com/seu-formulario', '_blank');
      }
    })
  })

  // Animação de contadores
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)
    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
      }
    }
    updateCounter()
  }

  // Ativar contadores quando visíveis
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll(".stat-number")
          counters.forEach((counter) => {
            const text = counter.textContent
            const number = Number.parseInt(text.replace(/\D/g, ""))
            if (number && !counter.classList.contains("animated")) {
              counter.classList.add("animated")
              counter.textContent = "0" + text.replace(/\d/g, "")
              animateCounter(counter, number)
            }
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsSection = document.querySelector(".stats-grid")
  if (statsSection) {
    statsObserver.observe(statsSection)
  }

  // Parallax effect para hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-bg")
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })

  // Adicionar efeito de hover nos cards
  const hoverCards = document.querySelectorAll(".about-card, .event-card")
  hoverCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)"
    })
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  console.log("🚀 SETEC 2025 - Site carregado com sucesso!")
}
