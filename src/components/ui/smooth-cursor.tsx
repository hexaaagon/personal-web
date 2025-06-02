"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { motion, useSpring, useReducedMotion } from "motion/react";
import { FC, JSX, useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: JSX.Element;
  transitionConfig?: {
    duration: number;
    ease: string;
  };
  disableRotation?: boolean;
  disableSmooth?: boolean;
  cursorType?: "default" | "text" | "pointer";
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5, transform: "translate(0px, 0px)" }}
      shapeRendering="geometricPrecision"
    >
      <g>
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
          className="fill-white/[0.15]"
        />
      </g>
    </svg>
  );
};

const TextCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="stroke-white stroke-[1px]"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: "translate(5px, 5px)" }}
      shapeRendering="geometricPrecision"
    >
      <path d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1" />
      <path d="M7 22h1a4 4 0 0 0 4-4v-1" />
      <path d="M7 2h1a4 4 0 0 1 4 4v1" />
    </svg>
  );
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  transitionConfig = {
    duration: 0.15,
    ease: "easeInOut",
  },
  disableRotation = false,
  disableSmooth = false,
  cursorType = "default",
}: SmoothCursorProps) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const [hasMoved, setHasMoved] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const [isOverPointer, setIsOverPointer] = useState(false);
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(-45);
  const accumulatedRotation = useRef(-45);

  // Much more responsive cursor tracking - minimal lag
  const cursorX = useSpring(0, {
    stiffness: disableSmooth ? 10000 : 1200,
    damping: disableSmooth ? 100 : 80,
    mass: disableSmooth ? 0.1 : 0.3,
  });
  const cursorY = useSpring(0, {
    stiffness: disableSmooth ? 10000 : 1200,
    damping: disableSmooth ? 100 : 80,
    mass: disableSmooth ? 0.1 : 0.3,
  });
  const rotation = useSpring(-45, {
    stiffness: 800,
    damping: 60,
    mass: 0.4,
  });
  const scale = useSpring(1, {
    stiffness: 1000,
    damping: 70,
    mass: 0.3,
  });

  useEffect(() => {
    if (isMobile) return;

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const checkIfOverText = (e: MouseEvent) => {
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const isText = [
          "P",
          "H1",
          "H2",
          "H3",
          "H4",
          "H5",
          "H6",
          "SPAN",
          "A",
          "BUTTON",
          "INPUT",
          "TEXTAREA",
          "LI",
          "CODE",
          "PRE",
        ].includes(element.tagName);
        setIsOverText(isText);

        const isPointerElement =
          element.closest("a, button") !== null ||
          window.getComputedStyle(element).cursor === "pointer";
        setIsOverPointer(isPointerElement);
      }
    };

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);
      checkIfOverText(e);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2),
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      if (speed > 0.1) {
        if (!disableRotation && !prefersReducedMotion) {
          const currentAngle =
            Math.atan2(velocity.current.y, velocity.current.x) *
              (180 / Math.PI) +
            90;

          let angleDiff = currentAngle - previousAngle.current;
          if (angleDiff > 180) angleDiff -= 360;
          if (angleDiff < -180) angleDiff += 360;
          accumulatedRotation.current += angleDiff;
          rotation.set(accumulatedRotation.current);
          previousAngle.current = currentAngle;
        }

        // Faster scale feedback
        scale.set(prefersReducedMotion ? 1 : 0.99);
        setIsMoving(true);
        setHasMoved(true);

        const timeout = setTimeout(
          () => {
            scale.set(1);
            setIsMoving(false);
          },
          prefersReducedMotion ? 0 : 50,
        );

        return () => clearTimeout(timeout);
      }
    };

    let rafId: number;
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        smoothMouseMove(e);
        rafId = 0;
      });
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", throttledMouseMove);

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    cursorX,
    cursorY,
    rotation,
    scale,
    disableRotation,
    isMobile,
    hasMoved,
    prefersReducedMotion,
    isOverText,
    isOverPointer,
    disableSmooth,
  ]);

  if (isMobile || !hasMoved) {
    return null;
  }

  // TODO: improve performance by not using framer motion.
  // TODO: use vanilla CSS for default state cursor.
  return (
    <motion.div
      className="pointer-events-none fixed z-[99999] translate-x-[-50%] translate-y-[-50%] mix-blend-exclusion will-change-transform"
      style={{
        left: cursorX,
        top: cursorY,
        scale: scale,
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.1,
        ease: "easeOut",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: cursorType === "pointer" || isOverPointer ? 1 : 0,
          scale: cursorType === "pointer" || isOverPointer ? 1.2 : 1,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.08,
          ease: "easeOut",
          scale: { duration: 0.06, ease: "easeOut" },
        }}
        className={`pointer-events-none h-[32px] w-[32px] rounded-full border bg-white shadow-sm transition-all duration-300 ease-out will-change-transform`}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity:
            (cursorType === "text" || isOverText) && !isOverPointer ? 1 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.06,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.1))",
        }}
      >
        <TextCursorSVG />
      </motion.div>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{
          opacity: !(isOverText || isOverPointer) ? 1 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.06,
          ease: "easeOut",
        }}
        style={{
          rotate: disableRotation ? -45 : rotation,
          position: "absolute",
          top: 0,
          left: 0,
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
        }}
      >
        {cursor}
      </motion.div>
    </motion.div>
  );
}
