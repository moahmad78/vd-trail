"use client";

import Script from "next/script";
import { ANALYTICS_CONFIG } from "@/config/analytics";

export default function ClarityScript() {
  if (!ANALYTICS_CONFIG.CLARITY_ID) return null;

  return (
    <Script id="microsoft-clarity" strategy="lazyOnload">
      {`
        (function(){
          function initClarity(){
            if(window._clarityInitDone) return;
            window._clarityInitDone = true;
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${ANALYTICS_CONFIG.CLARITY_ID}");
          }
          if('requestIdleCallback' in window){
            requestIdleCallback(function(){ setTimeout(initClarity, 3000); });
          } else {
            setTimeout(initClarity, 3500);
          }
          ['scroll', 'click', 'touchstart'].forEach(function(e){
            window.addEventListener(e, initClarity, { once: true, passive: true });
          });
        })();
      `}
    </Script>
  );
}
