import spotifyApi from "@/api/spotify";

// initial state
const state = () => ({
  albums: String,
  error: Boolean
});

// actions
const actions = {
  getNewReleases({ commit }) {
    spotifyApi.getNewReleases()
      .then(resp => commit("SET_NEW_RELEASES_LIST", resp))
      .catch(() => commit("SET_ERR_RELEASES_LIST"));
  }
};

// mutations
const mutations = {
  SET_NEW_RELEASES_LIST(state, releasesList) {
    const { data: { albums: { items } } } = releasesList;
    state.albums = items;
  },
  SET_ERR_RELEASES_LIST(state) {
    state.error = true;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
