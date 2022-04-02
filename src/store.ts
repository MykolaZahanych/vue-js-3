import { reactive, readonly } from 'vue';
import axios from 'axios';
import { Post, today, thisWeek, thisMonth } from './mocks';

interface State {
  posts: PostsState;
}

interface PostsState {
  ids: string[];
  // o(n)
  // posts: Post[];
  // o(1)
  all: Map<string, Post>;
  loaded: boolean;
}

class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  getState() {
    return readonly(this.state);
  }

  // updateTest(test: string) {
  //   this.state.test = test;
  // }
  async fetchPosts() {
    const response = await axios.get<Post[]>('/posts');
    const postsState: PostsState = {
      ids: [],
      all: new Map(),
      loaded: true,
    };

    for (const post of response.data) {
      // unefficient, reactivity will be triggert every time when new value sets
      // this.state.posts.ids.push(post.id);
      // this.state.posts.all.set(post.id, post);
      postsState.ids.push(post.id);
      postsState.all.set(post.id, post);
    }
    this.state.posts = postsState;
  }
}

const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false,
  },
});

export function useStore() {
  return store;
}
