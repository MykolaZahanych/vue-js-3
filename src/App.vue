<template>
  <section class="section">
    <div class="container">
      <Suspense>
        <template #default>
          <Timeline />
        </template>
        <template #fallback><Spinner /></template>
      </Suspense>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Timeline from './components/Timeline.vue';
import Spinner from './components/Spinner.vue';

export default defineComponent({
  name: 'App',
  components: {
    Timeline,
    Spinner,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
