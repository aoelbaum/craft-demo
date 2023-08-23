<template>
  <div v-if="post" class="post">
    <div class="post-content">
      <div class="content-wrapper">
        <PostCard :post="post" :avatarSize="{ width: '90px', height: '90px' }">
          <template #media>
            <div class="image-container">
              <img
                :alt="`${post.media?.alt}`"
                :src="getImage(post.media?.img)"
              />
            </div>
          </template>
          <template #description>
            <div class="description">
              <p>
                {{ post.description }}
              </p>
            </div>
          </template>
        </PostCard>
      </div>
      <h3>
        {{
          `${
            comments?.length && post.commentsEnabled ? comments.length : 0
          }  Comments`
        }}
      </h3>
      <template v-if="comments?.length && post.commentsEnabled">
        <div :class="['comments', { hide: hideComments }]">
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="comment"
          >
            <div class="comment-heading">
              <span class="comment-name">{{ comment.name }}</span>
              <span>{{ comment.created }}</span>
            </div>
            <p>{{ comment.message }}</p>
          </div>
        </div>

        <button
          v-if="comments.length > 3"
          class="toggle-comments"
          @click.prevent="toggleComments"
        >
          {{ `View ${hideComments ? 'more' : 'less'} comments` }}
        </button>
      </template>
    </div>
    <div v-if="post.commentsEnabled">
      <PostForm />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import getImage from '../utils/getImage';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
const store = useStore();
const route = useRoute();

onMounted(async () => {
  await store.dispatch('fetchComments');
});
const hideComments = ref(true);
const post = computed(() => store.getters.getPost(route.params.id));
const comments = computed(() => store.state.comments);
const toggleComments = () => {
  hideComments.value = !hideComments.value;
};
//TODO: convert timestamp
// const getCreated = (created) => {
//
// }
</script>

<style scoped lang="scss">
.post-content {
  border-radius: 12px;
  padding: 24px;
  background-color: white;
  border: grey solid 1px;
}
.content-wrapper {
  background-color: white;
  padding: 24px;
}

.post {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  @media only screen and (min-width: 1200px) {
    padding: 0 20%;
  }
}

.image-container {
  img {
    max-width: 200px;
    width: 100%;
    height: auto;
  }
}
h3 {
  font-size: 14px;
  margin-right: 24px;
  text-align: right;
}
.comments {
  padding: 12px 24px 24px 24px;
  &.hide {
    max-height: 324px;
    overflow: hidden;
  }
}
.comment {
  display: flex;
  flex-direction: column;
  border: grey solid 1px;
  background-color: white;
  border-radius: 12px;
  text-align: left;
  padding: 8px;
  margin-bottom: 24px;
}
.comment-heading {
  display: flex;
  font-size: 14px;
}
.comment-name {
  margin-right: 8px;
}

.description {
  text-align: left;
}

.toggle-comments {
  background: none;
  padding: 0;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  text-align: left;
  margin-left: 24px;
}
</style>
