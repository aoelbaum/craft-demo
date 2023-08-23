<template>
  <div class="avatar">
    <img :alt="`${avatar.alt}`" :src="getImage(avatar.img)" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import getImage from '../utils/getImage';

const props = defineProps({
  avatar: {
    type: Object,
    default: () => ({ img: '', alt: '' }),
  },
  size: {
    type: Object,
    default: () => ({ width: '70px', height: '70px' }),
  },
});

// eslint-disable-next-line vue/no-setup-props-destructure
const width = props.size?.width;
// eslint-disable-next-line vue/no-setup-props-destructure
const height = props.size?.height;
</script>

<style scoped lang="scss">
.avatar {
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  display: inline-block;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 12px;
  flex: 0 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
