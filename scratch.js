const vmin = 320;
const vmax = 1280;
const scales = [
  { name: 'H1', min: 48, max: 72 },
  { name: 'H2', min: 36, max: 56 },
  { name: 'H3', min: 28, max: 40 },
  { name: 'H4', min: 24, max: 32 },
  { name: 'H5', min: 20, max: 24 },
  { name: 'H6', min: 18, max: 20 },
  { name: 'BodyLg', min: 18, max: 20 },
  { name: 'Body', min: 16, max: 18 },
  { name: 'Small', min: 14, max: 16 },
  { name: 'Caption', min: 12, max: 14 },
  { name: 'Button', min: 15, max: 17 },
  { name: 'Nav', min: 15, max: 18 }
];

scales.forEach(s => {
  const minRem = s.min / 16;
  const maxRem = s.max / 16;
  const slope = (s.max - s.min) / (vmax - vmin);
  const yAxisIntercept = (s.min - slope * vmin) / 16;
  const vw = (slope * 100).toFixed(4);
  const yInt = yAxisIntercept.toFixed(4);
  console.log(`--text-${s.name.toLowerCase()}: clamp(${minRem}rem, ${yInt}rem + ${vw}vw, ${maxRem}rem);`);
});
