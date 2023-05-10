import { reactive } from 'vue';

export const state = reactive({
  isNavOpen: false,
});

export const mutations = {
  toggleNav() {
    state.isNavOpen = !state.isNavOpen;
  },
};
