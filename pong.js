// Variables de la pelota
let pelotaX, pelotaY;
let velocidadPelotaX = 4;
let velocidadPelotaY = 4;
let diametroPelota = 20;

// Variables de las raquetas
let anchoRaqueta = 10;
let altoRaqueta = 100;

// Raqueta del jugador
let raquetaJugadorX = 20;
let raquetaJugadorY;

// Raqueta de la computadora
let raquetaComputadoraX;
let raquetaComputadoraY;

// Puntuaciones
let puntuacionJugador = 0;
let puntuacionComputadora = 0;

// Grosor del marco superior e inferior
let grosorMarco = 10;

// Factor de reacción y velocidad máxima de la computadora
let factorReaccion = 0.05; // Precisión ajustable
let velocidadMaximaComputadora = 3; // Velocidad máxima de la computadora
let errorAleatorio = 0; // Desviación aleatoria
let tiempoProximoError = 0; // Tiempo para el próximo ajuste de error

function setup() {
  createCanvas(800, 400);
  pelotaX = width / 2;
  pelotaY = height / 2;
  raquetaJugadorY = height / 2 - altoRaqueta / 2;
  raquetaComputadoraX = width - 30;
  raquetaComputadoraY = height / 2 - altoRaqueta / 2;
}

function draw() {
  background(0);

  // Dibujar marcos superior e inferior
  fill(255);
  rect(0, 0, width, grosorMarco); // Marco superior
  rect(0, height - grosorMarco, width, grosorMarco); // Marco inferior

  // Dibujar la pelota
  ellipse(pelotaX, pelotaY, diametroPelota, diametroPelota);

  // Dibujar raqueta del jugador
  rect(raquetaJugadorX, raquetaJugadorY, anchoRaqueta, altoRaqueta);

  // Dibujar raqueta de la computadora
  rect(raquetaComputadoraX, raquetaComputadoraY, anchoRaqueta, altoRaqueta);

  // Movimiento de la pelota
  pelotaX += velocidadPelotaX;
  pelotaY += velocidadPelotaY;

  // Rebote en los marcos superior e inferior
  if (pelotaY - diametroPelota / 2 < grosorMarco || 
      pelotaY + diametroPelota / 2 > height - grosorMarco) {
    velocidadPelotaY *= -1;
  }

  // Colisión con la raqueta del jugador
  if (pelotaX - diametroPelota / 2 < raquetaJugadorX + anchoRaqueta &&
      pelotaY > raquetaJugadorY &&
      pelotaY < raquetaJugadorY + altoRaqueta) {
    velocidadPelotaX *= -1;
  }

  // Colisión con la raqueta de la computadora
  if (pelotaX + diametroPelota / 2 > raquetaComputadoraX &&
      pelotaY > raquetaComputadoraY &&
      pelotaY < raquetaComputadoraY + altoRaqueta) {
    velocidadPelotaX *= -1;
  }

  // Movimiento de la raqueta del jugador con límites
  if (keyIsDown(UP_ARROW) && raquetaJugadorY > grosorMarco) {
    raquetaJugadorY -= 5;
  }
  if (keyIsDown(DOWN_ARROW) && raquetaJugadorY < height - altoRaqueta - grosorMarco) {
    raquetaJugadorY += 5;
  }

  // Movimiento automático de la raqueta de la computadora
  let destinoY = pelotaY - altoRaqueta / 2 + errorAleatorio;
  let diferencia = destinoY - raquetaComputadoraY;

  // Limitar la velocidad de la raqueta de la computadora
  raquetaComputadoraY += constrain(diferencia * factorReaccion, -velocidadMaximaComputadora, velocidadMaximaComputadora);

  // Restringir dentro de los márgenes
  raquetaComputadoraY = constrain(raquetaComputadoraY, grosorMarco, height - altoRaqueta - grosorMarco);

  // Ajustar error aleatorio a intervalos aleatorios
  if (millis() > tiempoProximoError) {
    errorAleatorio = random(-30, 30); // Introduce un error entre -30 y 30 píxeles
    tiempoProximoError = millis() + random(1000, 3000); // Nuevo error cada 1-3 segundos
  }

  // Comprobar si la pelota sale por los bordes laterales
  if (pelotaX < 0) {
    puntuacionComputadora++;
    reiniciarPelota();
  } else if (pelotaX > width) {
    puntuacionJugador++;
    reiniciarPelota();
  }

  // Mostrar puntuaciones
  mostrarPuntuacion();
}

function reiniciarPelota() {
  pelotaX = width / 2;
  pelotaY = height / 2;
  velocidadPelotaX *= -1;
}

function mostrarPuntuacion() {
  fill(255);
  textSize(24);
  text(`Jugador: ${puntuacionJugador}`, 50, 30);
  text(`Computadora: ${puntuacionComputadora}`, width - 200, 30);
}
