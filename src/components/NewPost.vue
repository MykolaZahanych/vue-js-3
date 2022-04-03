<template>
  <PostWriter :post="newPost" @save="save" />
</template>

<script lang="ts">
import { Post } from '../mocks';
import { defineComponent } from 'vue';
import PostWriter from './PostWriter.vue';
import moment from 'moment';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { PostWriter },
  setup() {
    const newPost: Post = {
      id: '-1',
      title: 'New post',
      created: moment().subtract(1, 'second'),
    };

    const store = useStore();
    const router = useRouter();

    const save = async (post: Post) => {
      await store.createPost(post);
      router.push('/');
    };

    return { newPost, save };
  },
});
</script>
