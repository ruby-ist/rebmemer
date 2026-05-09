<template>
  <div>
    <div
      class="absolute t-12 l-12 flex gap-8 align-i-center just-c-space-between w-[calc(100vw-64px)]"
    >
      <div class="slider-wrapper relative grid place-i-center">
        <div
          class="slider-bro absolute bg-color-cyan-one h-16 w-[calc(100%-19px)]"
        ></div>
        <input
          v-model="strokeWidth"
          class="slider pointer relative z-1 w-100p"
          type="range"
          min="1"
          max="16"
        />
      </div>
      <div class="flex gap-4">
        <button
          class="bg-color-green-two no-bg no-outline border-none pointer p-2-4 icon-color-green-two"
          border="rad-10"
          @click="undo"
        >
          <undoIcon class="w-28 h-28" />
        </button>
        <button
          class="bg-color-green-two no-bg no-outline border-none pointer p-2-4 icon-color-green-two"
          border="rad-10"
          @click="clearCanvas"
        >
          <eraseIcon class="w-28 h-28" />
        </button>
      </div>
    </div>
    <canvas
      ref="canvas"
      class="bg-color-blue-one p-24-12 -mb-4 w-100p h-[calc(100vw-40px)] box-size-border-box"
      border="1 solid color-cyan-one rad-20"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.prevent="startDrawing"
      @touchmove.prevent="draw"
      @touchend="stopDrawing"
    ></canvas>
  </div>
</template>

<script lang="ts">
type Point = {
  x: number;
  y: number;
};
type Stroke = Point[];

export default defineNuxtComponent({
  data: () => ({
    isDrawing: false,
    ctx: null as CanvasRenderingContext2D | null,
    lastX: 0 as number,
    lastY: 0 as number,
    strokes: [] as [Stroke, number][],
    currentStroke: [] as Stroke,
    strokeWidth: 8,
  }),
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    this.ctx = ctx;
    this.scaleCanvas(canvas);
    this.styleLines();
  },
  methods: {
    scaleCanvas(canvas: HTMLCanvasElement) {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Set internal resolution based on actual rendered size
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      this.ctx!.scale(dpr, dpr);
    },

    styleLines() {
      if (!this.ctx) return;

      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = this.strokeWidth;
      this.ctx.strokeStyle = "#fff";
    },

    getPosition(e: MouseEvent | TouchEvent): Point {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e && e.touches.length > 0) {
        return {
          x: e.touches[0]!.clientX - rect.left,
          y: e.touches[0]!.clientY - rect.top,
        };
      }
      const m = e as MouseEvent;

      return {
        x: m.clientX - rect.left,
        y: m.clientY - rect.top,
      };
    },

    startDrawing(e: MouseEvent | TouchEvent) {
      if (!this.ctx) return;

      this.isDrawing = true;
      const { x, y } = this.getPosition(e);
      this.currentStroke = [{ x, y }];
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.lastX = x;
      this.lastY = y;
    },

    draw(e: MouseEvent | TouchEvent) {
      if (!this.isDrawing || !this.ctx) return;

      const { x, y } = this.getPosition(e);
      const dx = x - this.lastX;
      const dy = y - this.lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.ceil(distance / 2); // smaller = smoother

      for (let i = 1; i <= steps; i++) {
        const ix = this.lastX + (dx * i) / steps;
        const iy = this.lastY + (dy * i) / steps;

        this.ctx.lineTo(ix, iy);
        this.currentStroke.push({ x: ix, y: iy });
      }

      this.ctx.stroke();
      this.lastX = x;
      this.lastY = y;
    },

    stopDrawing() {
      if (!this.ctx) return;

      this.isDrawing = false;
      if (this.currentStroke.length > 0) {
        this.strokes.push([this.currentStroke, this.strokeWidth]);
        // enforce history limit
        if (this.strokes.length > 10) {
          this.strokes.shift();
        }
      }
      this.currentStroke = [];
      this.ctx.closePath(); // optional
    },

    clearCanvas() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      if (!this.ctx) return;
      this.strokes = [];
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    undo() {
      if (!this.ctx) return;
      this.strokes.pop(); // remove last stroke
      this.redraw();
    },

    redraw() {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      if (!this.ctx) return;

      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const [stroke, strokeWidth] of this.strokes) {
        if (stroke.length === 0) continue;
        this.ctx.beginPath();
        this.ctx.lineWidth = strokeWidth;
        this.ctx.moveTo(stroke[0]!.x, stroke[0]!.y);

        for (let i = 1; i < stroke.length; i++) {
          this.ctx.lineTo(stroke[i]!.x, stroke[i]!.y);
        }

        this.ctx.stroke();
      }
      this.ctx.lineWidth = this.strokeWidth;
    },
  },

  watch: {
    strokeWidth(value) {
      if (!this.ctx) return;

      this.ctx.lineWidth = value;
    },
  },
});
</script>

<style scoped>
.slider-wrapper {
  width: -webkit-fill-available;
}
.slider-bro {
  clip-path: shape(
    from 0% calc(50% - 0.5px),
    line to 100% 0%,
    line to 100% 100%,
    line to 0% calc(50% + 0.5px),
    close
  );
}
.slider {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: var(--white-one);
    border: 1px solid var(--indigo-one);
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: var(--white-one);
    border: 1px solid var(--indigo-one);
    border-radius: 50%;
  }
}
</style>
