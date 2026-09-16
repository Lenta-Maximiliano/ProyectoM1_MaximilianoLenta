const colorCountSelect = document.getElementById("cantidad-colores");
const generateButton = document.getElementById("generate-btn");
const paletteContainer = document.getElementById("container-paleta");
const feedbackContainer = document.getElementById("container-feedback");
const colorFormatSelect = document.getElementById("formato-colores");

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

function generateRandomHsl() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 101);
  const lightness = Math.floor(Math.random() * 101);

  const colorHSL = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return {
    hue,
    saturation,
    lightness,
    colorHSL,
  };
}

function generateRandomHex() {
  const characters = "0123456789ABCDEF";
  let colorHex = "#";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    colorHex += characters[randomIndex];
  }

  return colorHex;
}

function generatePalette(colorCount, colorFormat) {
  paletteContainer.innerHTML = "";

  let columns;

  if (colorCount === 6) {
    columns = 3;
  } else if (colorCount === 8) {
    columns = 4;
  } else {
    columns = 3;
  }

  paletteContainer.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;

  for (let i = 0; i < colorCount; i++) {
    const card = document.createElement("div");
    card.classList.add("color-card");

    const colorPreview = document.createElement("div");
    colorPreview.classList.add("color-preview");

    const colorInfo = document.createElement("div");
    colorInfo.classList.add("color-info");

    const hexElement = document.createElement("span");
    hexElement.classList.add("name-hex");

    const hslElement = document.createElement("span");
    hslElement.classList.add("name-hsl");

    const randomColor =
      colorFormat === "hsl" ? generateRandomHsl() : generateRandomHex();

    if (colorFormat === "hsl") {
      const rgbColor = hslToRgb(
        randomColor.hue,
        randomColor.saturation,
        randomColor.lightness,
      );
      const hexColor = rgbToHex(rgbColor.red, rgbColor.green, rgbColor.blue);

      hslElement.textContent = randomColor.colorHSL;
      colorInfo.appendChild(hslElement);

      hexElement.textContent = hexColor;
      colorInfo.appendChild(hexElement);

      colorPreview.style.backgroundColor = randomColor.colorHSL;
    } else {
      hexElement.textContent = randomColor;
      colorInfo.appendChild(hexElement);

      colorPreview.style.backgroundColor = randomColor;
    }

    card.appendChild(colorPreview);
    card.appendChild(colorInfo);
    paletteContainer.appendChild(card);
  }

}

generateButton.addEventListener("click", () => {
  const colorCount = Number(colorCountSelect.value);
  const colorFormat = colorFormatSelect.value;

  generatePalette(colorCount, colorFormat);
});

generatePalette(6, "hsl");