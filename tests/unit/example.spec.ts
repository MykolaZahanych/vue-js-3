import { nextTick } from 'vue';
import { Store } from '../../src/store';
import { mount, flushPromises } from '@vue/test-utils';
import Timeline from '../../src/components/Timeline.vue';
import { today, thisWeek, thisMonth } from '../../src/mocks';

jest.mock('axios', () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  },
}));

function mountTimeline() {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false,
    },
  });
  const testComp = {
    components: { Timeline },
    template: `
      <suspense>
        <template #default>
          <Timeline />
        </template>
        <template #fallback>
          Loading...
        </template>
      </suspense>
    `,
  };
  return mount(testComp, {
    global: {
      plugins: [store],
    },
  });
}

describe('Timeline', () => {
  it('renders today post by default', async () => {
    const wrapper = mountTimeline();
    await flushPromises();
    expect(wrapper.html()).toContain(today.created.format('Do MMM'));
  });

  it('update when the period is click', async () => {
    const wrapper = mountTimeline();
    await flushPromises();
    await wrapper.get('[data-test="This Week"]').trigger('click');
    // wait for the next frame
    // await nextTick();

    expect(wrapper.html()).toContain(today.created.format('Do MMM'));
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'));
  });

  it('update when the period is click', async () => {
    const wrapper = mountTimeline();
    await flushPromises();

    await wrapper.get('[data-test="This Month"]').trigger('click');

    expect(wrapper.html()).toContain(today.created.format('Do MMM'));
    expect(wrapper.html()).toContain(thisWeek.created.format('Do MMM'));
    expect(wrapper.html()).toContain(thisMonth.created.format('Do MMM'));
  });
});
