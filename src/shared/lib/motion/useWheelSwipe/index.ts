import { useEffect, useRef, useState } from "react"

export const useWheelSwipe = (maxIndex: number) => {
  const [index, setIndex] = useState(0)
  const [force, setForce] = useState(0)
  const lockRef = useRef(false)

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (lockRef.current) return

      const delta = e.deltaY
      const strength = Math.min(Math.abs(delta), 120)

      lockRef.current = true
      setForce(strength)

      if (delta > 0) {
        setIndex((i) => Math.min(i + 1, maxIndex))
      } else {
        setIndex((i) => Math.max(i - 1, 0))
      }

      setTimeout(() => {
        lockRef.current = false
        setForce(0)
      }, 500)
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [maxIndex])

  return { index, force }
}
