<template>
  <header>
    <nav>
      <router-link to="/"><h1>The Animal Lovers Group</h1></router-link>
    </nav>
    <NoficationButton @toggle="onToggle" />
  </header>
  <div class="card flex justify-content-center">
    <Sidebar v-model:visible="visible" position="right">
      <div class="notifications">
        <h2>Notifications</h2>
        <template v-for="(notification, index) in notifications" :key="index">
          <div class="message">
            {{ notification.message }}
          </div>
        </template>
      </div>
    </Sidebar>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Sidebar from 'primevue/sidebar';
import NoficationButton from './NoficationButton';
const visible = ref(false);

const store = useStore();

const notifications = computed(() => {
  return store.getters.getSortedNotifications;
});

const onToggle = () => {
  visible.value = true;
  store.commit('setNotificationStatus', false);
};
</script>

<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background-color: lightblue;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  height: 60px;
}

nav {
  a {
    font-weight: bold;
    color: black;
    padding: 12px;
    text-decoration: none;
  }
}

.message {
  margin-top: 12px;
}
h1 {
  font-size: 20px;
  margin-left: 12px;
}
</style>
