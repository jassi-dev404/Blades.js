/**
 * Parses user agent string
 * @param {string} uaString - User agent string (defaults to browser UA)
 * @returns {{browser: string, os: string, device: string, isMobile: boolean, isTablet: boolean, isDesktop: boolean}}
 */
export default function userAgent(uaString = navigator.userAgent) {
  const ua = uaString.toLowerCase();
  let browser = 'Unknown';
  if (ua.includes('firefox/')) browser = 'Firefox';
  else if (ua.includes('edg/')) browser = 'Edge';
  else if (ua.includes('chrome/')) browser = 'Chrome';
  else if (ua.includes('safari/')) browser = 'Safari';
  else if (ua.includes('opera') || ua.includes('opr/')) browser = 'Opera';

  let os = 'Unknown';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
  else if (ua.includes('mac os')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';

  const isMobile = /android|iphone|ipod|opera mini/i.test(ua);
  const isTablet = /ipad|android(?!.*mobile)/i.test(ua);
  return { browser, os, device: isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop', isMobile, isTablet, isDesktop: !isMobile && !isTablet };
}
