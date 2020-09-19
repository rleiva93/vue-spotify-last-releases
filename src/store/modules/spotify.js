import spotifyApi from "@/api/spotify";

// initial state
const state = () => ({
  tracks: String,
  error: Boolean
});

// actions
const actions = {
  getNewReleases({ commit }) {
    spotifyApi()
      .then(resp => commit("SET_NEW_RELEASES_LIST", resp))
      .catch(() => commit("SET_ERR_RELEASES_LIST"));
  }
};

// mutations
const mutations = {
  SET_NEW_RELEASES_LIST(state, list) {
    state.tracks = list;
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
