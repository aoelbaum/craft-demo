<template>
  <div class="notification-wrapper">
    <button @click="emit('toggle')" class="notification-button">
      <i class="pi pi-bell" style="font-size: 1.5rem"></i>
    </button>
    <div :class="{ badge: showBadge }"></div>
  </div>
</template>

<script setup>
import { defineEmits, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const emit = defineEmits(['toggle']);

const showBadge = computed(() => store.state.showBadge);
</script>

<style scoped lang="scss">
.notification-wrapper {
  position: relative;
}
.notification-button {
  padding: 12px;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 12px;
}

.badge {
  background-color: #c70700;
  border-radius: 50%;
  position: absolute;
  width: 18px;
  height: 18px;
  top: 4px;
  left: 24px;
}
</style>
