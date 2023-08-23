<template>
  <form class="post-form" @submit.prevent="onSubmit">
    <input class="post-name" name="name" placeholder="Name" v-model="name" />
    <textarea
      name="message"
      placeholder="Write a comment"
      v-model="message"
    ></textarea>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

//TODO: form validation
const store = useStore();
const message = ref('');
const name = ref('');

const onSubmit = async () => {
  await store.dispatch('postComment', {
    name: name.value,
    message: message.value,
  });
  name.value = '';
  message.value = '';
};
</script>

<style scoped lang="scss">
.post-form {
  margin-top: 24px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px 48px;
  border-radius: 12px;
  border: grey solid 1px;
}
.post-name {
  border: grey solid 1px;
  border-radius: 6px;
  height: 24px;
  margin-bottom: 12px;
}
button {
  align-self: center;
}
textarea {
  border: grey solid 1px;
  height: 100px;
  resize: none;
  border-radius: 6px;
  margin-bottom: 12px;
}
</style>
