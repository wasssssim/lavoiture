"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;

    setCount(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const startTime = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [target]);

  return (
    <div
      ref={ref}
      className="text-4xl sm:text-5xl font-black text-red tabular-nums"
    >
      {count}
      <span className="text-red/60">+</span>
    </div>
  );
}
