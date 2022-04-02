<template>
  <a class="panel-block">
    <div class="is-flex is-flex-direction-column is-align-items-flex-start">
      <a>{{ post.title }}</a>
      <div>{{ post.created.format('Do MMM') }}</div>
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Post } from '../mocks';

export default defineComponent({
  name: 'TimelinePost',
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
});
</script>

<style scoped></style>
