<template>
  <div class='toasts'>
    <UiToast
      v-for='toast in toasts'
      :key='toast.id'
      :toastInfo='toast'
      @deleteToast='deleteToast'
    />
  </div>
</template>

<script>
// TO DO: Task 04-vue-router/02-TheToaster
import UiToast from '@/components/UiToast.vue';

const SHOW_TIME = 6000;

export default {
  name: 'TheToaster',
  components: { UiToast },
  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    success(message) {
      this.addMessageInToast('success', message)
    },
    error(message) {
      this.addMessageInToast('error', message)
    },
    addMessageInToast(type, message) {
      const id = this.generateId();
      this.toasts.push({
        type: type,
        message: message,
        id: id,
      });
      setTimeout(() => {
        this.deleteToast(id);
      }, SHOW_TIME);
    },
    deleteToast(id) {
      const index = this.toasts.findIndex(toast => toast.id === id);
      if (index >= 0) {
        this.toasts.splice(index, 1);
      }
    },
    generateId() {
      return Date.now().toString(36) + Math.random().toString(36).slice(2);
    },
  },
};
</script>

<style scoped>
/* _toaster.css */
.toasts {
    position: fixed;
    bottom: 8px;
    right: 8px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    white-space: pre-wrap;
    z-index: 999;
}

@media all and (min-width: 992px) {
    .toasts {
        bottom: 72px;
        right: 112px;
    }
}

.toast {
    display: flex;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    font-size: 18px;
    line-height: 28px;
    width: auto;
}

.toast + .toast {
    margin-top: 20px;
}

.toast__icon {
    margin-right: 12px;
}

.toast.toast_success {
    color: var(--green);
}

.toast.toast_error {
    color: var(--red);
}
</style>
