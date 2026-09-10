const cantidadColores = document.getElementById("cantidad-colores");
const generateBtn = document.getElementById("generate-btn");
const containerPaleta = document.getElementById("container-paleta");
const containerFeedback = document.getElementById("container-feedback");

generateBtn.addEventListener("click", () => {
  containerPaleta.innerHTML = "";

  const colorsTotal = Number(cantidadColores.value);

  containerPaleta.style.gridTemplateColumns = `repeat(${colorsTotal}, 1fr)`;

  for (let i = 0; i < colorsTotal; i++) {
    const card = document.createElement("div");
    card.classList.add("color-card");

    const textColor = document.createElement("span");
    textColor.classList.add("name-hexa");

    const hueRandom = Math.floor(Math.random() * 360);
    const saturationRandom = Math.floor(Math.random() * 101);
    const lightnessRandom = Math.floor(Math.random() * 101);

    const saturation = saturationRandom / 100;
    const lightness = lightnessRandom / 100;

    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = c * (1 - Math.abs(((hueRandom / 60) % 2) - 1));
    const m = lightness - c / 2;

    let r1;
    let g1;
    let b1;

    if (hueRandom < 60) {
      r1 = c;
      g1 = x;
      b1 = 0;
    } else if (hueRandom < 120) {
      r1 = x;
      g1 = c;
      b1 = 0;
    } else if (hueRandom < 180) {
      r1 = 0;
      g1 = c;
      b1 = x;
    } else if (hueRandom < 240) {
      r1 = 0;
      g1 = x;
      b1 = c;
    } else if (hueRandom < 300) {
      r1 = x;
      g1 = 0;
      b1 = c;
    } else {
      r1 = c;
      g1 = 0;
      b1 = x;
    }

    const red = Math.round((r1 + m) * 255);
    const green = Math.round((g1 + m) * 255);
    const blue = Math.round((b1 + m) * 255);

    const hex1 = red.toString(16).padStart(2, "0");
    const hex2 = green.toString(16).padStart(2, "0");
    const hex3 = blue.toString(16).padStart(2, "0");

    textColor.textContent = `#${hex1}${hex2}${hex3}`;

    card.style.backgroundColor = `hsl(${hueRandom}, ${saturationRandom}%, ${lightnessRandom}%)`;

    card.appendChild(textColor);
    containerPaleta.appendChild(card);
  }
});
