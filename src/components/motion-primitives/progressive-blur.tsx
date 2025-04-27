"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

interface ProgressiveBlurProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  intensity?: number
  startOffset?: number
  endOffset?: number
}

export function ProgressiveBlur({
  children,
  className,
  direction = "down",
  intensity = 10,
  startOffset = 0.1,
  endOffset = 0.9,
}: ProgressiveBlurProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const blurValue = useTransform(
    scrollYProgress,
    direction === "down" ? [startOffset, endOffset] : [endOffset, startOffset],
    [0, intensity],
  )

  const opacityValue = useTransform(
    scrollYProgress,
    direction === "down" ? [startOffset, endOffset] : [endOffset, startOffset],
    [1, 0],
  )

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{
        filter: blurValue.get() > 0 ? `blur(${blurValue.get()}px)` : undefined,
        opacity: opacityValue,
      }}
    >
      {children}
    </motion.div>
  )
}
