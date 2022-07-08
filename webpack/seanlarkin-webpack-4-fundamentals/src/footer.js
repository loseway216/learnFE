import { blue, red } from "./button-styles";

const top = document.createElement("div");
top.innerText = "Top of Footer";
top.style = red;

const bottom = document.createElement("div");
bottom.innerText = "Bottom of Footer";
bottom.style = blue;

const footer = document.createElement("footer");

footer.appendChild(top);
footer.appendChild(bottom);

// ESM named export
export { top, bottom, footer };
