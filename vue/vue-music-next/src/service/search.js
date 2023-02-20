import { get } from "./base";

export function getHotKeys() {
  // return get("/api/getHotKeys");
  return Promise.resolve({
    hotKeys: [
      { id: 0, key: "周杰伦" },
      { id: 1, key: "是妈妈是女儿" },
      { id: 3, key: "咖啡调调" },
      { id: 4, key: "毛不易" },
      { id: 5, key: "花开忘忧" },
      { id: 6, key: "达尔文" },
    ],
  });
}

export function search(query, page, showSinger) {
  return get("/api/search", {
    query,
    page,
    showSinger,
  });
}
