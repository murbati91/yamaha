import { useEffect, useState } from "react"

export function useToast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (toasts.length > 0) {
        setToasts((prev) => prev.slice(1))
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [toasts])

  const toast = ({ title, description, variant = "default" }) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, title, description, variant }])
  }

  return {
    toasts,
    toast,
  }
}