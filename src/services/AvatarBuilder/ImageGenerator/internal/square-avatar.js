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
/**
 * Build avatar image like min block https://github.com/flouthoc/minBlock.js
 */
class SquareImageBuilder {
    constructor(precision = 3, colors = core_avatar_1.DEFAULT_COLORS) {
        this.precision = precision;
        this.colors = colors;
    }
    buildImage(avatar, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = Math.min(width, height);
            const margin = Math.floor(size / (this.precision * 5));
            const index = random.nextInt(this.colors.length);
            const fillColor = this.colors[index];
            const backgroundColor = this.colors[(index + 1) % this.colors.length];
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            ctx.translate((width - size) / 2, (height - size) / 2);
            ctx.fillStyle = fillColor;
            ctx.fillRect(0, 0, size, size);
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(margin, margin, size - margin * 2, size - margin * 2);
            ctx.fillStyle = fillColor;
            const mult = (size - margin * 2) / this.precision;
            for (let x = 0; x < this.precision; x++) {
                for (let y = 0; y < this.precision; y++) {
                    if (random.nextDouble() < 0.5) {
                        ctx.fillRect(Math.floor(x * mult + margin), Math.floor(y * mult + margin), Math.ceil(mult), Math.ceil(mult));
                    }
                }
            }
            return canvas;
        });
    }
}
exports.SquareImageBuilder = SquareImageBuilder;
//# sourceMappingURL=square-avatar.js.map