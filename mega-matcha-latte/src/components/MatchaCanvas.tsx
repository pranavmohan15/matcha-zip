"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSpring, useTransform, motion, MotionValue, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 80;

export default function MatchaCanvas({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(0);

    // Smooth the scroll input
    const smoothProgress = useSpring(scrollProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Scroll indicator opacity mapping (0 to 10%)
    const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

    // Preload frames
    useEffect(() => {
        let isCancelled = false;

        const loadImages = () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = `/sequence/frame_${i}.webp`;
                img.onload = () => {
                    if (isCancelled) return;
                    loadedCount++;
                    setLoaded(loadedCount);
                };
                img.onerror = () => {
                    if (isCancelled) return;
                    loadedCount++; // Avoid trapping loading state if a frame drops
                    setLoaded(loadedCount);
                };
                loadedImages.push(img);
            }
            if (!isCancelled) {
                setImages(loadedImages);
            }
        };

        loadImages();
        return () => { isCancelled = true; };
    }, []);

    // Render loop
    useEffect(() => {
        if (loaded < FRAME_COUNT || images.length < FRAME_COUNT) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            const progress = smoothProgress.get();
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.floor(progress * FRAME_COUNT))
            );

            const img = images[frameIndex];
            if (img && img.complete) {
                // Handle resize inherently in requestAnimationFrame
                if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                }

                // 'cover' fit logic with 10% zoom to hide watermark
                const imgWidth = img.naturalWidth || 1920;
                const imgHeight = img.naturalHeight || 1080;

                const hRatio = canvas.width / imgWidth;
                const vRatio = canvas.height / imgHeight;
                // Use Math.max for perfect 'cover' effect without extra zooming
                const ratio = Math.max(hRatio, vRatio);

                const centerShift_x = (canvas.width - imgWidth * ratio) / 2;
                const centerShift_y = (canvas.height - imgHeight * ratio) / 2;

                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                if (img.naturalWidth > 0) {
                    ctx.drawImage(
                        img,
                        0, 0, imgWidth, imgHeight,
                        centerShift_x, centerShift_y, imgWidth * ratio, imgHeight * ratio
                    );
                }
            }
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [loaded, images, smoothProgress]);

    const isLoaded = loaded >= FRAME_COUNT;
    const progressPercent = Math.round((loaded / FRAME_COUNT) * 100);

    return (
        <div className="sticky top-0 h-screen w-full bg-black overflow-hidden flex items-center justify-center pointer-events-none">
            <canvas
                ref={canvasRef}
                className="block absolute inset-0 w-full h-full"
            />

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: scrollIndicatorOpacity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
            >
                <div className="text-[10px] tracking-widest text-white/50 uppercase">Scroll slowly</div>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
            </motion.div>

            {/* Global Loader Veil */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        key="global-loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#090E17] text-white/60 pointer-events-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center w-full max-w-sm px-6"
                        >
                            <div className="text-sm font-bold tracking-[0.3em] uppercase text-white mb-8">
                                Matcha
                            </div>
                            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-6 relative">
                                <div
                                    className="absolute top-0 left-0 h-full bg-[#84A96C] transition-all duration-300 ease-out"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <div className="text-[10px] tracking-[0.2em] font-medium uppercase animate-pulse">
                                Brewing Experience {progressPercent}%
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
