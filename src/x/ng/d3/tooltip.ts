
import { mouse } from 'd3-selection';

export class Tooltip {
    constructor(container: HTMLElement) {
        Object.assign(this.tooltip.style, {
            position: "absolute",
            width: "auto",
            height: "auto",
            padding: "2px",
            font: "1em sans-serif",
            background: "#eee",
            border: "0px",
            borderRadius: "2px",
            pointerEvents: "none",
            boxShadow: "0 0 5px #999999",
            zIndex: "1"
        });
        container.appendChild(this.tooltip);
        this.style.opacity = "0";
        this.offset.x = container.offsetLeft;
        this.offset.y = container.offsetTop;
    }

    Show() {
        this.style.opacity = "0.9";
        return this;
    }

    Offset(x, y) {
        this.style.left = `${this.offset.x + x}px`;
        this.style.top = `${this.offset.y + y}px`;
        return this;
    }

    Html(text: string) {
        this.tooltip.innerHTML = text;
        return this;
    }

    Hide() {
        this.style.opacity = "0";
    }

    private offset = { x: 0, y: 0 }

    private tooltip = document.createElement("div");
    private style = this.tooltip.style;
}
