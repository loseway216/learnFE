import { get } from "./base";

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs);
  }

  return get("/api/getSongsUrl", {
    mid: songs.map((song) => {
      return song.mid;
    }),
  }).then((result) => {
    const map = result.map;
    return songs
      .map((song) => {
        song.url = map[song.mid];
        return song;
      })
      .filter((song) => {
        return song.url && song.url.indexOf("vkey") > -1;
      });
  });
}

const lyricMap = {};

export function getLyric(song) {
  // 同一首歌
  if (song.lyric) {
    return Promise.resolve(song.lyric);
  }

  // 同一首歌 但 不同的song对象
  const lyric = lyricMap[song.mid];
  if (lyric) {
    return Promise.resolve(lyric);
  }

  const mid = song.mid;
  return get("/api/getLyric", {
    mid,
  }).then((result) => {
    const lyric = result ? result.lyric : "[00:00:00]该歌曲暂时无法获取歌词";
    lyricMap[song.mid] = lyric;
    return lyric;
  });
}
