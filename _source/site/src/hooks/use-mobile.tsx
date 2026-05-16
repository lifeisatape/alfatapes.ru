import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      const screenSizeMobile = window.innerWidth < MOBILE_BREAKPOINT
      const userAgent = navigator.userAgent.toLowerCase()
      const isAndroid = userAgent.includes('android')
      const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')
      const isMobileDevice = isAndroid || isIOS
      
      // If it's a mobile device OR screen size is mobile, consider it mobile
      setIsMobile(screenSizeMobile || isMobileDevice)
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = checkMobile
    
    mql.addEventListener("change", onChange)
    checkMobile()
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
