// Variáveis globais
let currentSection = 1
let starsClicked = 0
let rosesBloomedCount = 0
let candlesBlown = false

// Mensagens românticas para as estrelas
const starMessages = [
  "Feliz aniversário! Que seu dia seja tão incrível e brilhante quanto você! ✨",
  "Parabéns pra você! Que este ano seja cheio de sorrisos, conquistas e momentos inesquecíveis! 💖",
  "Parabéns pra quem faz o mundo mais feliz só por existir! Feliz aniversário! 🎉",
  "Hoje é dia de festa! Que seu aniversário seja tão fofo e incrível quanto você! 🎂💝",
  "Hoje é dia de comemorar! Bolo, presentes e muita alegria, você merece o melhor! 🥳",
]

// Função para iniciar a jornada
function startJourney() {
  document.getElementById("section1").classList.add("hidden")
  document.getElementById("section2").classList.remove("hidden")
  document.getElementById("section2").classList.add("fade-in")
  currentSection = 2

  // Embaralhar corações
  shuffleHearts()
}

// Função para embaralhar os corações
function shuffleHearts() {
  const container = document.querySelector(".hearts-container")
  const hearts = Array.from(container.children)

  // Embaralhar array
  for (let i = hearts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[hearts[i], hearts[j]] = [hearts[j], hearts[i]]
  }

  // Reordenar no DOM
  hearts.forEach((heart) => container.appendChild(heart))
}

// Função para quando um coração é clicado
function heartClicked(element, isCorrect) {
  const messageDiv = document.getElementById("heartMessage")

  if (isCorrect) {
    element.style.transform = "scale(1.5)"
    element.style.filter = "drop-shadow(0 0 20px rgba(255, 107, 107, 0.8))"
    messageDiv.innerHTML = "💖 Você encontrou meu coração! Ele bate só por você! 💖"
    messageDiv.style.color = "#d63384"

    // Animar todos os corações
    const allHearts = document.querySelectorAll(".clickable-heart")
    allHearts.forEach((heart, index) => {
      setTimeout(() => {
        heart.innerHTML = "💕"
        heart.style.animation = "heartbeat 0.5s ease-in-out"
      }, index * 200)
    })

    // Continuar para próxima seção após 3 segundos
    setTimeout(() => {
      document.getElementById("section2").classList.add("hidden")
      document.getElementById("section3").classList.remove("hidden")
      document.getElementById("section3").classList.add("fade-in")
      currentSection = 3
    }, 3000)
  } else {
    element.innerHTML = "💔"
    element.style.animation = "shake 0.5s ease-in-out"
    messageDiv.innerHTML = "💔 Ops! Esse não é o coração certo. Tente novamente!"
    messageDiv.style.color = "#dc3545"

    // Resetar após 1 segundo
    setTimeout(() => {
      element.innerHTML = "🖤"
      element.style.animation = ""
      messageDiv.innerHTML = ""
    }, 1500)
  }
}

// Função para revelar mensagens das estrelas
function revealMessage(index) {
  const star = document.querySelectorAll(".star")[index]
  const messageDisplay = document.getElementById("messageDisplay")

  if (!star.classList.contains("clicked")) {
    star.classList.add("clicked")
    star.innerHTML = "🌟"

    messageDisplay.innerHTML = `<p>${starMessages[index]}</p>`
    starsClicked++

    // Mostrar botão continuar quando todas as estrelas forem clicadas
    if (starsClicked >= 5) {
      setTimeout(() => {
        document.getElementById("continueBtn").classList.remove("hidden")
      }, 1000)
    }
  }
}

// Função para próxima seção
function nextSection() {
  document.getElementById("section3").classList.add("hidden")
  document.getElementById("section4").classList.remove("hidden")
  document.getElementById("section4").classList.add("fade-in")
  currentSection = 4
}

// Função para florescer rosas
function bloomRose(element) {
  if (!element.classList.contains("bloomed")) {
    element.classList.add("bloomed")
    element.innerHTML = "🌹"
    rosesBloomedCount++

    // Atualizar contador
    document.getElementById("bloomedCount").textContent = rosesBloomedCount

    // Efeito de partículas
    createSparkles(element)

    // Mostrar botão quando todas as rosas florescerem
    if (rosesBloomedCount >= 6) {
      setTimeout(() => {
        document.getElementById("rosesContinue").classList.remove("hidden")
      }, 1000)
    }
  }
}

// Função para criar efeito de brilhos
function createSparkles(element) {
  const rect = element.getBoundingClientRect()
  const sparkles = ["✨", "⭐", "💫", "🌟"]

  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement("div")
    sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)]
    sparkle.style.position = "fixed"
    sparkle.style.left = rect.left + Math.random() * rect.width + "px"
    sparkle.style.top = rect.top + Math.random() * rect.height + "px"
    sparkle.style.fontSize = "1.5rem"
    sparkle.style.pointerEvents = "none"
    sparkle.style.zIndex = "1000"
    sparkle.style.animation = "sparkleFloat 2s ease-out forwards"

    document.body.appendChild(sparkle)

    setTimeout(() => {
      sparkle.remove()
    }, 2000)
  }
}

// Função para seção final
function finalSection() {
  document.getElementById("section4").classList.add("hidden")
  document.getElementById("section5").classList.remove("hidden")
  document.getElementById("section5").classList.add("fade-in")
  currentSection = 5
}

// Função para soprar velas
function blowCandles() {
  if (!candlesBlown) {
    const cake = document.querySelector(".birthday-cake")
    const instruction = document.getElementById("cakeInstruction")

    cake.innerHTML = "🎂✨"
    cake.style.animation = "cakeShine 1s ease-in-out"
    instruction.innerHTML = "🎉 Parabéns! Você soprou as velas! Seu desejo vai se realizar! 🎉"
    instruction.style.color = "#d63384"
    instruction.style.fontWeight = "bold"

    candlesBlown = true

    // Mostrar surpresa final
    setTimeout(() => {
      document.getElementById("finalSurprise").classList.remove("hidden")
      createConfetti()
    }, 2000)
  }
}

// Função para criar confetti
function createConfetti() {
  const colors = ["#ff6b6b", "#ff8e8e", "#ffa8a8", "#ffb6c1", "#ffc0cb"]
  const emojis = ["🎉", "🎊", "💕", "💖", "🌟", "✨"]

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div")
      const isEmoji = Math.random() > 0.5

      if (isEmoji) {
        confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)]
        confetti.style.fontSize = "2rem"
      } else {
        confetti.style.width = "10px"
        confetti.style.height = "10px"
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      }

      confetti.style.position = "fixed"
      confetti.style.left = Math.random() * window.innerWidth + "px"
      confetti.style.top = "-20px"
      confetti.style.pointerEvents = "none"
      confetti.style.zIndex = "1000"
      confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`

      document.body.appendChild(confetti)

      setTimeout(() => {
        confetti.remove()
      }, 5000)
    }, i * 100)
  }
}

// Adicionar animações CSS dinamicamente
const style = document.createElement("style")
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes sparkleFloat {
        0% { opacity: 1; transform: translateY(0) scale(1); }
        100% { opacity: 0; transform: translateY(-50px) scale(0); }
    }
    
    @keyframes cakeShine {
        0%, 100% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(1.2); filter: brightness(1.5) drop-shadow(0 0 30px gold); }
    }
    
    @keyframes confettiFall {
        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
`
document.head.appendChild(style)

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Adicionar efeitos de entrada
  setTimeout(() => {
    document.querySelector(".romantic-intro").classList.add("fade-in")
  }, 500)
})