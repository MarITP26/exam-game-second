# 🧱⚽ Brick Breaker - Edición Messi

## 📌 Descripción del proyecto

Este proyecto es un videojuego desarrollado con **HTML5, CSS3 y JavaScript**, utilizando la **Canvas API**. Está inspirado en el clásico juego *Brick Breaker*, pero con una temática futbolística:

* 🐐 La barra es **Messi**
* ⚽ La pelota es un **balón de fútbol**
* 🏟️ Fondo: **Estadio Lusail**
* 🧱 Bloques que debes romper para avanzar

El objetivo del juego es destruir todos los bloques en cada nivel sin perder todas tus vidas.

---

## 🎮 Características principales

* ✅ Sistema de **10 niveles progresivos**
* ✅ Incremento de dificultad por nivel
* ✅ Mensaje al completar nivel: *"🎉 ¡Felicidades! Nivel superado"*
* ✅ Pantalla final con: *"🏆 ¡Ganaste la Copa del Mundo!"*
* ✅ Sistema de **vidas**
* ✅ Sistema de **puntaje (Score)**
* ✅ **High Score** guardado en el navegador
* ✅ Control mediante **mouse**
* ✅ **Puntero personalizado (Messi)**
* ✅ Interfaz moderna con **Bootstrap**
* ✅ Navbar y Footer incluidos
* ✅ Instrucciones visibles para el usuario

---

## 🕹️ Cómo jugar

1. Presiona el botón **START**
2. Mueve el mouse para controlar a Messi
3. Rebota el balón y destruye los bloques
4. Evita que la pelota caiga
5. Avanza niveles hasta ganar el juego

---

## 🧠 Lógica del juego

* Cada bloque destruido suma **10 puntos**
* Al destruir todos los bloques:

  * Se avanza de nivel
  * Aumenta la velocidad de la pelota
  * Se agregan más bloques
* El jugador inicia con **3 vidas**
* Si pierde todas → **Game Over**

---

## 🗂️ Estructura del proyecto

```
/proyecto
│
├── index.html
├── css/
│   └── styles.css
│
├── js/
│   └── game.js
│
├── assets/
│   └── img/
│       ├── messi_arg.png
│       ├── balon_fut.png
│       └── estadio_lusail.jpg
│
└── README.md
```

---

## 🎨 Tecnologías utilizadas

* HTML5
* CSS3
* JavaScript
* Canvas API
* Bootstrap 5

---

## 🖥️ Interfaz

El juego cuenta con:

* 📊 Panel derecho:

  * Score
  * High Score
  * Vidas
  * Nivel
* ▶️ Panel izquierdo:

  * Botón START
* 🧾 Instrucciones visibles
* 📌 Navbar y Footer modernos

---

## ⚙️ Funcionalidades clave

### 🔹 Colisiones

* Rebote contra paredes
* Rebote contra Messi
* Detección de impacto con bloques

### 🔹 Sistema de niveles

* Incremento automático
* Reinicio de bloques
* Aumento de dificultad

### 🔹 Persistencia

* High Score guardado con `localStorage`

---

## 🚀 Posibles mejoras

* 🔊 Efectos de sonido
* ⚡ Power-ups (multibola, barra grande)
* 🎮 Pantalla de inicio animada
* 🎯 Bloques especiales (resistentes)
* 🌟 Animaciones y partículas

---

## 👨‍💻 Autor

Proyecto desarrollado por **Marco**
Como práctica de desarrollo web con Canvas API 🎯

---

## 📷 Vista previa

Juego estilo arcade moderno con temática futbolística ⚽🔥

---

## 🏁 Conclusión

Este proyecto demuestra el uso de la **Canvas API** para crear videojuegos interactivos, combinando lógica de programación, diseño visual y experiencia de usuario.

---
