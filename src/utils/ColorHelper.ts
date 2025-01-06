// colorUtils.ts

// Átlagos szín kivonása képből
export const extractAverageColor = (imgUrl: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // CORS problémák elkerülése
    img.src = imgUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) return reject("No Avaiable Color.");

      canvas.width = img.width;
      canvas.height = img.height;

      context.drawImage(img, 0, 0, img.width, img.height);
      const imageData = context.getImageData(0, 0, img.width, img.height).data;

      let r = 0, g = 0, b = 0;
      const pixelCount = img.width * img.height;

      // Pixel adatok összegzése
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];     // Piros
        g += imageData[i + 1]; // Zöld
        b += imageData[i + 2]; // Kék
      }

      // Átlag színek számítása
      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);

      const averageColor = `rgb(${r}, ${g}, ${b})`;
      resolve(averageColor);
    };

    img.onerror = reject; // Hiba kezelése
  });
};

// Két RGB szín közötti interpolálás
const interpolateColor = (color1: string, color2: string, factor: number): string => {
  const rgb1 = color1.match(/\d+/g)!.map(Number);
  const rgb2 = color2.match(/\d+/g)!.map(Number);
  
  // Színek interpolálása
  const r = Math.round(rgb1[0] + factor * (rgb2[0] - rgb1[0]));
  const g = Math.round(rgb1[1] + factor * (rgb2[1] - rgb1[1]));
  const b = Math.round(rgb1[2] + factor * (rgb2[2] - rgb1[2]));

  return `rgb(${r}, ${g}, ${b})`;
};

// Háttérszín alkalmazása grádienssel
export const applyBackgroundGradient = (newColor: string): void => {
  const currentColor = getComputedStyle(document.body).backgroundColor || 'rgb(255, 255, 255)'; // Fehér alapértelmezett szín
  let startTime: number | null = null;

  const duration = 500; // Animáció időtartama ms-ban

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress < 1) {
      // Szín interpolálása
      const color = interpolateColor(currentColor, newColor, progress);
      document.body.style.background = `linear-gradient(to bottom, var(--background), ${color})`;
      requestAnimationFrame(animate);
    } else {
      // Végső szín beállítása
      document.body.style.background = `linear-gradient(to bottom, var(--background), ${newColor})`;
    }
  };

  // Animáció indítása
  requestAnimationFrame(animate);
};
