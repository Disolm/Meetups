<template>
  <div
    class="toast"
    @click="$emit('deleteToast', toastInfo.id)"
    :class="{'toast_error': toastInfo.type === 'error', 'toast_success': toastInfo.type === 'success'}"
  >
    <UiIcon v-if="toastInfo.type === 'success'" class="toast__icon" icon="check-circle"/>
    <UiIcon v-if="toastInfo.type === 'error'" class="toast__icon" icon="alert-circle"/>
    <span>{{ toastInfo.message }}</span>
  </div>
</template>
<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',
  components: {UiIcon},
  props: {
    toastInfo: {
      required: true,
      type: Object,
      default: () => ({})
    }
  },
  emits: ['deleteToast'],
};
</script>

<style scoped>
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
