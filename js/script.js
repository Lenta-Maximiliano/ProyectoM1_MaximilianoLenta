const cantidadColoresSelect = document.getElementById("cantidad-colores");
const generateBtn = document.getElementById("generate-btn");
const containerPaleta = document.getElementById("container-paleta");
const containerFeedback = document.getElementById("container-feedback");

function rgbToHex(red, green, blue) {
  const hex1 = red.toString(16).padStart(2, "0");
  const hex2 = green.toString(16).padStart(2, "0");
  const hex3 = blue.toString(16).padStart(2, "0");

  return `#${hex1}${hex2}${hex3}`;
}

function hslToRgb(hue, saturation, lightness) {
  const saturationDecimal = saturation / 100;
  const lightnessDecimal = lightness / 100;

  const c = (1 - Math.abs(2 * lightnessDecimal - 1)) * saturationDecimal;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightnessDecimal - c / 2;

  let r1;
  let g1;
  let b1;

  if (hue < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (hue < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (hue < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (hue < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (hue < 300) {
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

  return {
    red,
    green,
    blue,
  };
}

generateBtn.addEventListener("click", () => {
  containerPaleta.innerHTML = "";

  const totalColors = Number(cantidadColoresSelect.value);

  containerPaleta.style.gridTemplateColumns = `repeat(${totalColors}, 1fr)`;

  for (let i = 0; i < totalColors; i++) {
    const card = document.createElement("div");
    card.classList.add("color-card");

    const colorHexElement = document.createElement("span");
    colorHexElement.classList.add("name-hexa");

    const hueRandom = Math.floor(Math.random() * 360);
    const saturationRandom = Math.floor(Math.random() * 101);
    const lightnessRandom = Math.floor(Math.random() * 101);

    const colorRGB = hslToRgb(hueRandom, saturationRandom, lightnessRandom);

    const colorHex = rgbToHex(colorRGB.red, colorRGB.green, colorRGB.blue);

    colorHexElement.textContent = colorHex;

    card.style.backgroundColor = `hsl(${hueRandom}, ${saturationRandom}%, ${lightnessRandom}%)`;

    card.appendChild(colorHexElement);
    containerPaleta.appendChild(card);
  }
});
