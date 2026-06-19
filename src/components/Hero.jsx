import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 300;

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const { scrollY } = useScroll();
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const textY = useTransform(scrollY, [0, 400], [0, -100]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';

    const currentFrame = index => `${import.meta.env.BASE_URL}frames/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const images = [];
    const airpods = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    images[0].onload = render;
    if (images[0].complete) {
      render();
    }

    function render() {
      // Draw image centered and scaled to cover canvas
      const img = images[airpods.frame];
      if(!img || !img.complete) return;
      
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply filters for enhanced quality and cinematic look
      context.filter = 'contrast(1.08) saturate(1.05) brightness(1.1)';
      
      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        
      context.filter = 'none'; // reset filter
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 0.5,
          pin: true,
        }
      });

      tl.to(airpods, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        duration: 1,
        onUpdate: () => requestAnimationFrame(render)
      });
    }, containerRef);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      render();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div className="w-full bg-zinc-50 relative pointer-events-auto">
      <div ref={containerRef} className="relative w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0" />
        
        {/* Center Slogan Overlay */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 pointer-events-none select-none"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)] max-w-6xl leading-tight uppercase font-heading">
            Showing Europe to Indians <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
              in a Safe, Economic & Friendly Way
            </span>
          </h1>
        </motion.div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-white/10 via-transparent to-zinc-50 pointer-events-none"></div>

      </div>
    </div>
  );
};

export default Hero;