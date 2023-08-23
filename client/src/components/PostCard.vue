<template>
  <div v-if="post" class="post-card">
    <div class="heading-container">
      <AvatarImage :avatar="post.avatar" :size="avatarSize" />
      <div class="heading-details-wrapper">
        <div class="heading-details">
          <div class="heading-author">{{ post.author }}</div>
          <div>{{ post.created }}</div>
        </div>
        <h2>{{ post.title }}</h2>
      </div>
    </div>
    <slot name="media" />
    <slot name="description" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

import AvatarImage from './AvatarImage';

defineProps({
  post: {
    type: Object,
    default: () => {},
  },
  avatarSize: {
    type: Object,
    default: () => ({ width: '70px', height: '70px' }),
  },
});
</script>

<style scoped lang="scss">
.post-content {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 12px;
  border: grey solid 1px;
}
h2 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
  @media only screen and (min-width: 480px) {
    max-width: 300px;
  }
}

.heading-container {
  display: flex;
  margin-bottom: 12px;
}
.heading-details {
  display: flex;
  font-size: 14px;
}
.heading-details-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.heading-author {
  margin-right: 12px;
}
</style>
