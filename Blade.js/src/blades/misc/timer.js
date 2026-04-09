/**
 * Countdown timer utility
 * @param {number} durationMs - Duration in milliseconds
 * @returns {{start: Function, pause: Function, resume: Function, stop: Function, getTime: Function, onDone: Function}}
 */
export default function timer(durationMs) {
  let remaining = durationMs;
  let startTime = 0;
  let running = false;
  let doneCallback = null;
  let intervalId = null;

  function tick() {
    if (!running) return;
    const elapsed = performance.now() - startTime;
    remaining = Math.max(0, remaining - elapsed);
    if (remaining <= 0) {
      running = false;
      if (doneCallback) doneCallback();
    }
  }

  return {
    start() {
      if (running) return;
      running = true;
      startTime = performance.now();
      intervalId = setInterval(() => {
        tick();
        if (!running) clearInterval(intervalId);
      }, 16);
    },
    pause() {
      if (!running) return;
      const elapsed = performance.now() - startTime;
      remaining = Math.max(0, remaining - elapsed);
      running = false;
      clearInterval(intervalId);
    },
    resume() {
      this.start();
    },
    stop() {
      running = false;
      remaining = durationMs;
      clearInterval(intervalId);
    },
    getTime() {
      if (!running) return remaining;
      return Math.max(0, remaining - (performance.now() - startTime));
    },
    onDone(callback) {
      doneCallback = callback;
    },
    isRunning: () => running
  };
}
