<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="show">Sign Up</button>
        <router-link to="/posts/new" class="button">New Post</router-link>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <div>Modal</div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useModal } from '../useModal';

export default defineComponent({
  setup() {
    const modal = useModal();

    return {
      show: () => {
        modal.showModal();
      },
    };
  },
});
</script>
