declare module "nprogress" {
  interface NProgressOptions {
    minimum?: number;
    easing?: string;
    speed?: number;
    trickle?: boolean;
    trickleSpeed?: number;
    showSpinner?: boolean;
    parent?: string;
    template?: string;
  }

  interface NProgressStatic {
    start(): NProgressStatic;
    done(force?: boolean): NProgressStatic;
    set(n: number): NProgressStatic;
    inc(amount?: number): NProgressStatic;
    configure(options: NProgressOptions): NProgressStatic;
    status: number | null;
    isStarted(): boolean;
  }

  const nprogress: NProgressStatic;
  export default nprogress;
}

