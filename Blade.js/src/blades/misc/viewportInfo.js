/**
 * Returns current viewport dimensions and info
 * @returns {{width: number, height: number, orientation: string, aspectRatio: string, breakpoint: string}}
 */
export default function viewportInfo() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  let breakpoint = 'mobile';
  if (w >= 1280) breakpoint = 'xl';
  else if (w >= 1024) breakpoint = 'lg';
  else if (w >= 768) breakpoint = 'md';
  else if (w >= 640) breakpoint = 'sm';
  return {
    width: w, height: h,
    orientation: w > h ? 'landscape' : 'portrait',
    aspectRatio: `${w}:${h}`,
    breakpoint
  };
}
