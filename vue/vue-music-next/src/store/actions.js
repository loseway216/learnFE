import { PLAY_MODE } from "@/assets/js/constant";
import { shuffle } from "@/assets/js/util";

export function selectPlay({ commit }, { list, index }) {
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", list);
  commit("setCurrentIndex", index);
}

export function randomPlay({ commit }, list) {
  commit("setPlayMode", PLAY_MODE.random);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", shuffle(list));
  commit("setCurrentIndex", 0);
}

export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id;

  if (mode === PLAY_MODE.random) {
    commit("setPlaylist", shuffle(state.sequenceList));
  } else {
    commit("setPlaylist", state.sequenceList);
  }
  const index = state.playlist.findIndex((song) => song.id === currentId);
  commit("setCurrentIndex", index);
  commit("setPlayMode", mode);
}

export function removeSong({ commit, state }, song) {
  const playlist = state.playlist.slice();
  const sequenceList = state.sequenceList.slice();

  const playIndex = findIndex(playlist, song);
  const sequenceListIndex = findIndex(sequenceList, song);
  if (playIndex < 0 || sequenceListIndex < 0) {
    return;
  }

  playlist.splice(playIndex, 1);
  sequenceList.splice(sequenceListIndex, 1);

  let currentIndex = state.currentIndex;
  // 删除当前播放歌曲的前面 or 当前播放是最后一首并且想要删除
  if (playIndex < currentIndex || currentIndex === playlist.length) {
    currentIndex--;
  }

  commit("setPlaylist", playlist);
  commit("setSequenceList", sequenceList);
  commit("setCurrentIndex", currentIndex);

  if (!playlist.length) {
    commit("setPlayingState", false);
  }
}

export function clearSongList({ commit }) {
  commit("setSequenceList", []);
  commit("setPlaylist", []);
  commit("setCurrentIndex", 0);
  commit("setPlayingState", false);
}

export function addSong({ commit, state }, song) {
  const playlist = state.playlist.slice();
  const sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  const playIndex = findIndex(playlist, song);

  if (playIndex > -1) {
    currentIndex = playIndex;
  } else {
    playlist.push(song);
    currentIndex = playlist.length - 1;
  }

  const sequenceIndex = findIndex(sequenceList, song);
  if (sequenceIndex === -1) {
    sequenceList.push(song);
  }

  commit("setSequenceList", sequenceList);
  commit("setPlaylist", playlist);
  commit("setCurrentIndex", currentIndex);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
}

function findIndex(list, song) {
  const index = list.findIndex((item) => {
    return item.id === song.id;
  });
  return index;
}
