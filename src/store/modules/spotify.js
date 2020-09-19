import spotifyApi from "@/api/spotify";

// initial state
const state = () => ({
  albums: [],
  pagination: {
    offset: 0,
    limit: 9,
    finished: false
  }
});

const getters = {
  getPaginationData: state => state.pagination
};

// actions
const actions = {
  loadNewReleases({ commit, getters }) {
    const { offset, limit } = getters.getPaginationData;
    spotifyApi.getNewReleases(offset, limit)
      .then(resp => commit("SET_NEW_RELEASES_LIST", resp))
      .catch(() => commit("SET_ERR_RELEASES_LIST"));
  }
};

// mutations
const mutations = {
  SET_NEW_RELEASES_LIST(state, releasesList) {
    const { data: { albums: { items } } } = releasesList;

    if(items.length > 0) {
      state.albums.push(...items);
      state.pagination.offset += state.pagination.limit;
    } else {
      state.pagination.finished = true;
    }
  },
  SET_ERR_RELEASES_LIST(state) {
    state.error = true;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
