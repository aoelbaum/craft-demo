<template>
  <div v-if="content" class="post-thread">
    <router-link :to="`/post/${content.id}`">
      <PostCard :post="content">
        <template #description>
          <div class="description">
            <p>
              {{ content.description }}
            </p>
          </div>
        </template>
      </PostCard>
    </router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import PostCard from './PostCard';

defineProps({
  content: {
    type: Object,
    default: () => {},
  },
});
</script>

<style scoped lang="scss">
.h2 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
  @media only screen and (min-width: 1200px) {
    max-width: 300px;
  }
}
.heading-container {
  display: flex;
}
.heading-details {
  display: flex;
  font-size: 14px;
}

.heading-details-wrapper {
  display: flex;
  flex-direction: column;
}
.heading-author {
  margin-right: 12px;
}

.post-thread {
  border: grey solid 1px;
  background-color: white;
  border-radius: 12px;
  text-align: left;
  padding: 40px;
  margin-bottom: 24px;
  a {
    color: black;
    text-decoration: none;
  }
}
</style>
