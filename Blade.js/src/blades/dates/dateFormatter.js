/**
 * Formats dates into various formats
 * @param {string|Date} date - Input date
 * @param {string} format - 'iso', 'us', 'eu', 'relative', 'unix', 'weekday'
 * @returns {string} Formatted date string
 */
export default function dateFormatter(date, format = 'iso') {
  const d = new Date(date);
  switch (format) {
    case 'iso': return d.toISOString();
    case 'us': return d.toLocaleDateString('en-US');
    case 'eu': return d.toLocaleDateString('en-GB');
    case 'unix': return Math.floor(d.getTime() / 1000).toString();
    case 'weekday': return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    case 'relative': {
      const diff = Date.now() - d.getTime();
      const secs = Math.floor(diff / 1000);
      if (secs < 60) return `${secs}s ago`;
      const mins = Math.floor(secs / 60);
      if (mins < 60) return `${mins}m ago`;
      const hours = Math.floor(mins / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      if (days < 30) return `${days}d ago`;
      const months = Math.floor(days / 30);
      return `${months}mo ago`;
    }
    default: return d.toString();
  }
}
