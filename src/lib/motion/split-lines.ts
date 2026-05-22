/**
 * Wraps each visual line of an element's text into
 *   <span class="line-mask"><span class="line">…</span></span>
 *
 * The mask hides overflow; the inner line is what we animate (yPercent).
 * Re-splits on resize so reveals always match the current wrap.
 */

export type SplitLinesController = {
  lines: HTMLElement[];
  revert: () => void;
  resplit: () => void;
};

const ORIGINAL = Symbol("split-lines:original-html");

type Annotated = HTMLElement & { [ORIGINAL]?: string };

export function splitLines(el: HTMLElement): SplitLinesController {
  const root = el as Annotated;
  if (root[ORIGINAL] == null) root[ORIGINAL] = root.innerHTML;

  const split = (): HTMLElement[] => {
    root.innerHTML = root[ORIGINAL]!;
    const text = root.textContent ?? "";
    if (!text.trim()) return [];

    // Wrap every word in a measurable span. Preserves inline children (e.g. <span class="italic">)
    // by walking nodes and only splitting text nodes.
    const wrap = (node: Node, target: HTMLElement) => {
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = (child.textContent ?? "").split(/(\s+)/);
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              target.appendChild(document.createTextNode(part));
            } else {
              const w = document.createElement("span");
              w.className = "sl-word";
              w.style.display = "inline-block";
              w.textContent = part;
              target.appendChild(w);
            }
          });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          const clone = (child as HTMLElement).cloneNode(false) as HTMLElement;
          wrap(child, clone);
          target.appendChild(clone);
        } else {
          target.appendChild(child.cloneNode(true));
        }
      });
    };

    const buffer = document.createElement("span");
    wrap(root, buffer);
    root.innerHTML = "";
    root.appendChild(buffer);

    // Group words by line based on their top position
    const words = Array.from(root.querySelectorAll<HTMLElement>(".sl-word"));
    if (words.length === 0) return [];

    const lineGroups: HTMLElement[][] = [];
    let currentTop = Number.NaN;
    let currentLine: HTMLElement[] = [];
    words.forEach((w) => {
      const top = w.offsetTop;
      if (Number.isNaN(currentTop) || Math.abs(top - currentTop) > 1) {
        if (currentLine.length) lineGroups.push(currentLine);
        currentLine = [w];
        currentTop = top;
      } else {
        currentLine.push(w);
      }
    });
    if (currentLine.length) lineGroups.push(currentLine);

    // Re-render: each line becomes <span class="line-mask"><span class="line">…words…</span></span>
    root.innerHTML = "";
    const lineEls: HTMLElement[] = [];
    lineGroups.forEach((group, idx) => {
      const mask = document.createElement("span");
      mask.className = "line-mask";
      mask.style.display = "block";
      mask.style.overflow = "hidden";
      mask.style.paddingBottom = "0.06em"; // descenders breathing room

      const line = document.createElement("span");
      line.className = "line";
      line.style.display = "block";
      line.style.willChange = "transform";

      group.forEach((w, j) => {
        line.appendChild(w);
        if (j < group.length - 1) line.appendChild(document.createTextNode(" "));
      });

      mask.appendChild(line);
      root.appendChild(mask);
      if (idx < lineGroups.length - 1) root.appendChild(document.createTextNode(""));
      lineEls.push(line);
    });

    return lineEls;
  };

  let lines = split();

  const revert = () => {
    if (root[ORIGINAL] != null) root.innerHTML = root[ORIGINAL]!;
  };

  const resplit = () => {
    lines = split();
  };

  return {
    get lines() {
      return lines;
    },
    revert,
    resplit,
  };
}
