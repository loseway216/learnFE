import { save } from "@/assets/js/array-store";
import { FAVORITE_KEY } from "@/assets/js/constant";
import { computed } from "vue";
import { useStore } from "vuex";

export default function useFavorite() {
  const store = useStore();
  const favoriteList = computed(() => store.state.favoriteList);

  function getFavoriteIcon(song) {
    return isFavorite(song) ? "icon-favorite" : "icon-not-favorite";
  }

  function toggleFavorite(song) {
    let list;
    if (isFavorite(song)) {
      // remove
    } else {
      save(song, FAVORITE_KEY, compare);
    }

    store.commit("setFavoriteList", list);

    function compare(item) {
      return item.id === song.id;
    }
  }

  function isFavorite(song) {
    return (
      favoriteList.value.findIndex((item) => {
        return item.id === song.id;
      }) > -1
    );
  }

  return {
    getFavoriteIcon,
    toggleFavorite,
  };
}
