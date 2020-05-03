"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const core_avatar_1 = require("./core-avatar");
class TriangleImageBuilder {
    constructor(precision = 4, colors = core_avatar_1.DEFAULT_COLORS) {
        this.precision = precision;
        this.colors = colors;
    }
    buildImage(avatar, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = Math.min(width, height);
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            ctx.translate((width - size) / 2, (height - size) / 2);
            const index = random.nextInt(this.colors.length);
            const fillColor = this.colors[index];
            const s = random.nextInt(4);
            const n = s + this.precision;
            let p = size;
            const d = size / n;
            let i = s;
            while (p > 0) {
                switch (i % 4) {
                    case 0:
                        ctx.drawImage(TriangleImageBuilder.drawTriangle(size, fillColor, [{ x: 0, y: 0 }, { x: p, y: 0 }, { x: 0, y: p }]), 0, 0);
                        break;
                    case 1:
                        ctx.drawImage(TriangleImageBuilder.drawTriangle(size, fillColor, [{ x: size, y: 0 }, { x: size, y: p }, { x: size - p, y: 0 }]), 0, 0);
                        break;
                    case 2:
                        ctx.drawImage(TriangleImageBuilder.drawTriangle(size, fillColor, [{ x: size, y: size }, { x: size - p, y: size }, { x: size, y: size - p }]), 0, 0);
                        break;
                    case 3:
                        ctx.drawImage(TriangleImageBuilder.drawTriangle(size, fillColor, [{ x: 0, y: size }, { x: 0, y: size - p }, { x: p, y: size }]), 0, 0);
                        break;
                }
                p -= Math.floor(random.nextDouble() % (d / 2) + d / 2);
                i++;
            }
            return canvas;
        });
    }
    static drawTriangle(size, color, points) {
        const canvas = canvas_1.createCanvas(size, size);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(0,0,0,0.75)';
        ctx.shadowBlur = Math.max(1, Math.floor(size / 20));
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.fill();
        return canvas;
    }
}
exports.TriangleImageBuilder = TriangleImageBuilder;
//# sourceMappingURL=triangle-avatar.js.map