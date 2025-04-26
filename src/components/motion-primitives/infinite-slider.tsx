"use client"
import { cn } from "@/lib/utils"
import type React from "react"

import { motion } from "motion/react"
import { useEffect, useState } from "react"

interface InfiniteSliderProps {
  children: React.ReactNode
  direction?: "left" | "right" | "up" | "down"
  speed?: number
  pauseOnHover?: boolean
  className?: string
  childrenClassName?: string
}

export function InfiniteSlider({
  children,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className,
  childrenClassName,
}: InfiniteSliderProps) {
  const isHorizontal = direction === "left" || direction === "right"
  const isReverse = direction === "right" || direction === "up"

  const [duration, setDuration] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)

  useEffect(() => {
    // Calculate the duration based on content size and speed
    const contentElement = document.querySelector(`.slider-content-${direction}`)
    if (contentElement) {
      const width = isHorizontal ? contentElement.scrollWidth : contentElement.scrollHeight
      setContentWidth(width)
      setDuration(width / speed)
    }
  }, [children, direction, isHorizontal, speed])

  return (
    <div className={cn("group relative flex overflow-hidden", isHorizontal ? "w-full" : "h-full flex-col", className)}>
      <motion.div
        className={cn(
          `slider-content-${direction}`,
          "flex shrink-0",
          isHorizontal ? "flex-row" : "flex-col",
          childrenClassName,
        )}
        animate={{
          x: isHorizontal ? (isReverse ? contentWidth : -contentWidth) : 0,
          y: !isHorizontal ? (isReverse ? contentWidth : -contentWidth) : 0,
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          ...(pauseOnHover && {
            repeatDelay: 0,
            repeatType: "loop",
            ease: "linear",
          }),
        }}
        {...(pauseOnHover && {
          onHoverStart: () => {
            const element = document.querySelector(`.slider-content-${direction}`) as HTMLElement
            if (element) element.style.animationPlayState = "paused"
          },
          onHoverEnd: () => {
            const element = document.querySelector(`.slider-content-${direction}`) as HTMLElement
            if (element) element.style.animationPlayState = "running"
          },
        })}
      >
        {children}
      </motion.div>
      <motion.div
        className={cn(
          `slider-content-${direction}`,
          "flex shrink-0",
          isHorizontal ? "flex-row" : "flex-col",
          childrenClassName,
        )}
        animate={{
          x: isHorizontal ? (isReverse ? -contentWidth : contentWidth) : 0,
          y: !isHorizontal ? (isReverse ? -contentWidth : contentWidth) : 0,
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          ease: "linear",
          ...(pauseOnHover && {
            repeatDelay: 0,
            repeatType: "loop",
            ease: "linear",
          }),
        }}
        {...(pauseOnHover && {
          onHoverStart: () => {
            const element = document.querySelector(`.slider-content-${direction}`) as HTMLElement
            if (element) element.style.animationPlayState = "paused"
          },
          onHoverEnd: () => {
            const element = document.querySelector(`.slider-content-${direction}`) as HTMLElement
            if (element) element.style.animationPlayState = "running"
          },
        })}
      >
        {children}
      </motion.div>
    </div>
  )
}
