/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'
import { router } from '@/router/index.js';
import { createToaster } from '@/plugins/toaster/index.js'
import { createProgress } from '@/plugins/progress/index.js';

// TO DO: установить плагины: router, pinia, head(title), toaster, progress
const toaster = createToaster({container: '#toaster'})
const progress = createProgress({ container: '#progress', router })
const pinia = createPinia()

const app = createApp(App)
app.config.unwrapInjectedRef = true;

app.use(toaster)
app.use(progress)
app.use(router)
app.use(pinia)
app.mount('#app')

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
