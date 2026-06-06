const fs = require('fs');

let c = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const imageRegex = /<Image unoptimized={true}\s*src={heroSlides\[currentImage\]\.image}\s*alt="Luxury Architecture"\s*fill\s*quality={100}\s*sizes="100vw"\s*className="object-cover"\s*priority\s*\/>/;

const replacement = `<div className="absolute inset-0 w-full h-full">
                <Image unoptimized={true}
                  src={heroSlides[currentImage].image}
                  alt="Luxury Architecture"
                  fill
                  quality={100}
                  sizes="100vw"
                  className="object-cover"
                  priority
                />
                {/* RESTORED PREMIUM SLATE GRADIENT OVERLAY LAYER */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/70 to-transparent z-10 mix-blend-multiply opacity-90" />
              </div>`;

c = c.replace(imageRegex, replacement);

// Remove the static gradient
const staticGradientRegex = /\{\/\* Static Gradient Overlay.*?\}\s*<div className="absolute inset-0 z-10 bg-gradient-to-r from-black\/60 via-black\/20 to-transparent" \/>/s;

c = c.replace(staticGradientRegex, '');

fs.writeFileSync('src/components/Hero.tsx', c);
console.log('Fixed Hero gradient');
