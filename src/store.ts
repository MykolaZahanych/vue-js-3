import { App, inject, reactive, readonly } from 'vue';
import axios from 'axios';
import { Post } from './mocks';

export interface User {
  id: string;
  username: string;
  password: string;
}

interface State {
  posts: PostsState;
}

export const storeKey = Symbol('store');

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

  install(app: App) {
    app.provide(storeKey, this);
  }

  getState() {
    return readonly(this.state);
  }

  // updateTest(test: string) {
  //   this.state.test = test;
  // }
  async createPost(post: Post) {
    const response = await axios.post<Post>('/posts', post);
    this.state.posts.all.set(post.id, response.data);
    this.state.posts.ids.push(post.id);
  }

  async createUser(user: User) {
    console.log('user', user);
  }

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

export const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false,
  },
});

export function useStore(): Store {
  const _store = inject<Store>(storeKey);
  if (!_store) {
    throw Error('Did you forgot to call provide?');
  }
  return _store;
}
