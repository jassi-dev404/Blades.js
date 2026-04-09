/**
 * Stopwatch utility
 * @returns {{start: Function, stop: Function, reset: Function, getTime: Function, lap: Function}}
 */
export default function stopwatch() {
  let startTime = 0;
  let elapsed = 0;
  let running = false;
  const laps = [];

  return {
    start() {
      if (!running) { startTime = performance.now() - elapsed; running = true; }
    },
    stop() {
      if (running) { elapsed = performance.now() - startTime; running = false; }
    },
    reset() {
      startTime = 0; elapsed = 0; running = false; laps.length = 0;
    },
    getTime() {
      return running ? performance.now() - startTime : elapsed;
    },
    lap() {
      const time = this.getTime();
      laps.push(time);
      return time;
    },
    isRunning: () => running,
    getLaps: () => [...laps]
  };
}
