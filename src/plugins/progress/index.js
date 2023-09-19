import { createApp, inject } from 'vue';
import TheTopProgressBar from './TheTopProgressBar.vue';

// TO DO: Task ProgressPlugin

export const PROGRESS_KEY = Symbol('PROGRESS_KEY');

export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {

  const mountProgress = document.querySelector(container);
  let progressInstance;
  if (mountProgress && mountProgress.__vue_app__) {
    progressInstance = mountProgress.__vue_app__._instance.proxy
  } else {
    const addDefaultContainer = () => document.body.appendChild(document.createElement('div'));
    progressInstance = createApp(TheTopProgressBar).mount(container ?? addDefaultContainer());
  }

  const progress = {
    start: progressInstance.start,
    finish: progressInstance.finish,
    fail: progressInstance.fail,

    install(app) {
      app.provide(PROGRESS_KEY, progress);
    },
  };

  if (router) {
    router.beforeEach(() => {
      progress.start();
    });

    router.afterEach(() => {
      progress.finish();
    });

    router.onError(() => {
      progress.fail();
    });
  }

  return progress;
}