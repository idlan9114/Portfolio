import type { App } from 'vue'

export function setupRevealDirective(app: App) {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('active')
    }),
    { threshold: 0.1 }
  )

  app.directive('reveal', {
    mounted: (el: HTMLElement) => observer.observe(el),
    unmounted: (el: HTMLElement) => observer.unobserve(el),
  })
}