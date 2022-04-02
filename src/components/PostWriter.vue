<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input data-test="title" v-model="title" type="text" class="input" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div
        contenteditable
        data-test="content"
        ref="contentEditable"
        @input="handleInput"
      />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button
        @click="save"
        data-test="submit"
        class="button is-primary is-pulled-right"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from '../mocks';
import { defineComponent, onMounted, ref, watch, watchEffect } from 'vue';
import { parse } from 'marked';
import highlight from 'highlight.js';
import debounce from 'lodash/debounce';

export default defineComponent({
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },

  emits: {
    save: (post: Post) => {
      return true;
    },
  },

  setup(props, ctx) {
    const title = ref(props.post.title);
    const content = ref('## Title\nEnter your post content');
    const html = ref('');
    const contentEditable = ref<HTMLDivElement | null>(null);

    const parseHtml = (str: string) => {
      html.value = parse(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => {
          return highlight.highlightAuto(code).value;
        },
      });
    };

    watch(
      content,
      debounce((newVal) => {
        parseHtml(newVal);
      }, 250),
      { immediate: true }
    );

    // watchEffect(() => {
    //   html.value = parse(content.value, {
    //     gfm: true,
    //     breaks: true,
    //     highlight: (code: string) => {
    //       return highlight.highlightAuto(code).value;
    //     },
    //   });
    // });

    const handleInput = () => {
      content.value = contentEditable.value?.innerText || '';
    };

    onMounted(() => {
      if (!contentEditable.value) {
        throw new Error('This should never happen');
      }
      contentEditable.value.innerText = content.value;
    });

    const save = () => {
      const newPost: Post = {
        ...props.post,
        title: title.value,
        html: html.value,
        markdown: content.value,
      };

      ctx.emit('save', newPost);
    };

    return {
      save,
      html,
      title,
      content,
      contentEditable,
      handleInput,
    };
  },
});
</script>

<style>
.column {
  overflow-y: scroll;
}
</style>
