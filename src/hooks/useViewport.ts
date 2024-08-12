import { useMediaQuery } from "@studio-freight/hamo";

export type Viewport = "mobile" | "mobileXL" | "tablet" | "laptop" | "desktop" | "desktopXL" | null;

export function useViewport(defaultViewport: Viewport = null): Viewport {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isMobileXL = useMediaQuery("(min-width: 640px) and (max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isLaptop = useMediaQuery("(min-width: 1024px) and (max-width: 1439px)");
  const isDesktop = useMediaQuery("(min-width: 1440px) and (max-width: 1919px)");
  const isDesktopXL = useMediaQuery("(min-width: 1920px)");

  switch (true) {
    case isMobile:
      return "mobile";
    case isMobileXL:
      return "mobileXL";
    case isTablet:
      return "tablet";
    case isLaptop:
      return "laptop";
    case isDesktop:
      return "desktop";
    case isDesktopXL:
      return "desktopXL";
    default:
      return defaultViewport;
  }
}
