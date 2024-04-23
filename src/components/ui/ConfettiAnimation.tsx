import React, { useEffect } from "react";
import Confetti from "react-canvas-confetti";
import confettiLib from "canvas-confetti";

interface ConfettiAnimationProps {
    isActive: boolean;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ isActive }) => {

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive) {
            const duration = 2 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 100 };

            function randomInRange(min: number, max: number) {
                return Math.random() * (max - min) + min;
            }

            interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confettiLib({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confettiLib({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isActive]);

    return <Confetti />;
};

export default ConfettiAnimation;
