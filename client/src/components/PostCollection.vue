<template>
  <div class="post-collection">
    <template v-for="(post, index) in posts" :key="index">
      <PostThread :content="post" />
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import PostThread from './PostThread.vue';
const store = useStore();

onMounted(async () => {
  await store.dispatch('fetchComments');
});
const posts = computed(() => store.state.posts);
</script>

<style scoped lang="scss"></style>
