import spotifyApi from "@/api/spotify";

// initial state
const state = () => ({
  albumsList: [],
  album: {
    loaded: false,
    data: {}
  },
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
  },
  loadAlbum({ commit }, albumId) {
    spotifyApi.getAlbum(albumId)
      .then(resp => commit("SET_ALBUM", resp))
      .catch(() => commit("SET_ERR_ALBUM"));
  },
  removeAlbum({ commit }) {
    commit("REMOVE_ALBUM");
  }
};

// mutations
const mutations = {
  SET_NEW_RELEASES_LIST(state, releasesList) {
    const { data: { albums: { items } } } = releasesList;

    if(items.length > 0) {
      state.albumsList.push(...items);
      state.pagination.offset += state.pagination.limit;
    } else {
      state.pagination.finished = true;
    }
  },
  SET_ALBUM(state, album) {
    const { data } = album;
    state.album.data = data;
    state.album.loaded = true;
  },
  REMOVE_ALBUM(state) {
    state.album.data = {};
    state.album.loaded = false;
  },
  SET_ERR_RELEASES_LIST(state) {
    state.error = true;
  },
  SET_ERR_ALBUM(state) {
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
