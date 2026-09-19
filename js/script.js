const colorCountSelect = document.getElementById("cantidad-colores");
const generateButton = document.getElementById("generate-btn");
const paletteContainer = document.getElementById("container-paleta");
const feedbackContainer = document.getElementById("container-feedback");
const colorFormatSelect = document.getElementById("formato-colores");

let currentPalette = [];

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

function hexToRgb(hex) {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);

  return {
    red,
    green,
    blue,
  };
}

function rgbToHsl(red, green, blue) {
  const redDecimal = red / 255;
  const greenDecimal = green / 255;
  const blueDecimal = blue / 255;

  const max = Math.max(redDecimal, greenDecimal, blueDecimal);
  const min = Math.min(redDecimal, greenDecimal, blueDecimal);

  const lightness = (max + min) / 2;

  let hue = 0;
  let saturation = 0;

  const delta = max - min;

  if (delta !== 0) {
    saturation =
      lightness > 0.5
        ? delta / (2 - max - min)
        : delta / (max + min);

    if (max === redDecimal) {
      hue = ((greenDecimal - blueDecimal) / delta) % 6;
    } else if (max === greenDecimal) {
      hue = (blueDecimal - redDecimal) / delta + 2;
    } else {
      hue = (redDecimal - greenDecimal) / delta + 4;
    }

    hue *= 60;

    if (hue < 0) {
      hue += 360;
    }
  }

  return {
    hue: Math.round(hue),
    saturation: Math.round(saturation * 100),
    lightness: Math.round(lightness * 100),
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
  currentPalette = [];

  for (let i = 0; i < colorCount; i++) {
    let color;

    if (colorFormat === "hsl") {
      const randomHsl = generateRandomHsl();

      const rgbColor = hslToRgb(
        randomHsl.hue,
        randomHsl.saturation,
        randomHsl.lightness,
      );

      const hexColor = rgbToHex(
        rgbColor.red,
        rgbColor.green,
        rgbColor.blue,
      );

      color = {
        hsl: randomHsl.colorHSL,
        hex: hexColor,
      };
    } else {
      const hexColor = generateRandomHex();

      const rgbColor = hexToRgb(hexColor);

      const hslColor = rgbToHsl(
        rgbColor.red,
        rgbColor.green,
        rgbColor.blue,
      );

      const colorHSL = `hsl(${hslColor.hue}, ${hslColor.saturation}%, ${hslColor.lightness}%)`;

      color = {
        hsl: colorHSL,
        hex: hexColor,
      };
    }

    currentPalette.push(color);
  }

  renderPalette(currentPalette, colorFormat);
}

function renderPalette(palette, colorFormat) {
  paletteContainer.innerHTML = "";

  let columns;

  if (palette.length === 6) {
    columns = 3;
  } else if (palette.length === 8) {
    columns = 4;
  } else {
    columns = 3;
  }

  paletteContainer.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;

  palette.forEach((color) => {
    const card = document.createElement("div");
    card.classList.add("color-card");

    const colorPreview = document.createElement("div");
    colorPreview.classList.add("color-preview");

    const colorInfo = document.createElement("div");
    colorInfo.classList.add("color-info");

    const hexElement = document.createElement("span");
    hexElement.classList.add("name-hex");
    hexElement.textContent = color.hex;

    const hslElement = document.createElement("span");
    hslElement.classList.add("name-hsl");
    hslElement.textContent = color.hsl;

    if (colorFormat === "hsl") {
      colorPreview.style.backgroundColor = color.hsl;
      colorInfo.appendChild(hslElement);
    } else {
      colorPreview.style.backgroundColor = color.hex;
      colorInfo.appendChild(hexElement);
    }

    card.appendChild(colorPreview);
    card.appendChild(colorInfo);
    paletteContainer.appendChild(card);
  });
}

generateButton.addEventListener("click", () => {
  const colorCount = Number(colorCountSelect.value);
  const colorFormat = colorFormatSelect.value;

  generatePalette(colorCount, colorFormat);
});

colorFormatSelect.addEventListener("change", () => {
  renderPalette(currentPalette, colorFormatSelect.value);
});

generatePalette(6, "hsl");