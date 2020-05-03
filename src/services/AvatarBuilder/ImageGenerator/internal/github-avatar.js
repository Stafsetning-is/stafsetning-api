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
class GithubImageBuilder {
    constructor(precision = 3) {
        this.precision = precision;
    }
    buildImage(avatar, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = Math.min(width, height);
            const red = random.nextInt(256);
            const green = random.nextInt(256);
            const blue = random.nextInt(256);
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            ctx.translate((width - size) / 2, (height - size) / 2);
            ctx.fillStyle = `rgb(${red},${green},${blue})`;
            const mult = size / ((this.precision * 2) - 1);
            for (let x = 0; x < this.precision; x++) {
                for (let y = 0; y < this.precision * 2; y++) {
                    if (random.nextDouble() < 0.5) {
                        ctx.fillRect(Math.floor(x * mult), Math.floor(y * mult), Math.ceil(mult), Math.ceil(mult));
                        ctx.fillRect(Math.floor(size - (x + 1) * mult), Math.floor(y * mult), Math.ceil(mult), Math.ceil(mult));
                    }
                }
            }
            return canvas;
        });
    }
}
exports.GithubImageBuilder = GithubImageBuilder;
//# sourceMappingURL=github-avatar.js.map