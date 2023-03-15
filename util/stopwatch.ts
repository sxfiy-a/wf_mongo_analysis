export class Stopwatch {
    private startTime: number | undefined;
    private stopTime: number | undefined;
    private running: boolean = false;
  
    public start() {
      if (!this.running) {
        this.startTime = Date.now();
        this.running = true;
      }
    }
  
    public stop() {
      if (this.running) {
        this.stopTime = Date.now();
        this.running = false;
      }
    }
  
    public reset() {
      this.startTime = undefined;
      this.stopTime = undefined;
      this.running = false;
    }
  
    public getTime(): number {
      if (this.startTime === undefined) {
        return 0;
      } else if (this.running) {
        return Date.now() - this.startTime;
      } else {
        return (this.stopTime || 0) - this.startTime;
      }
    }
  }
