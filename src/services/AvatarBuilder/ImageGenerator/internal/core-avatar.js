"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const canvas_1 = require("canvas");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const seedrandom_1 = __importDefault(require("seedrandom"));
const cache_1 = require("./cache");
exports.DEFAULT_COLORS = [
    '#6e1e78', '#82be00', '#a1006b', '#009aa6', '#cd0037', '#0088ce', '#e05206', '#d52b1e', '#ffb612', '#d2e100'
];
const DEFAULT_OPTIONS = {
    cache: new cache_1.LRUCache()
};
class Random {
    constructor(rng) {
        this.rng = rng;
    }
    /**
     * Next double [0..1[
     */
    nextDouble() {
        return this.rng();
    }
    /**
     * Next integer [0..max[
     * @param max
     */
    nextInt(max) {
        return Math.floor(max * this.rng());
    }
}
exports.Random = Random;
class AvatarBuilder {
    constructor(imageBuilder, width, height, options) {
        this.imageBuilder = imageBuilder;
        this.width = width;
        this.height = height;
        if (options) {
            this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        }
        else {
            this.options = DEFAULT_OPTIONS;
        }
    }
    create(id) {
        if (!this.options.cache) {
            return this.createBuffer(id);
        }
        return this.options.cache.getOrCreate(id, () => this.createBuffer(id));
    }
    createBuffer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const random = new Random(seedrandom_1.default(id));
            const canvas = yield this.imageBuilder.buildImage(this, random, this.width, this.height);
            return canvas.toBuffer();
        });
    }
}
exports.AvatarBuilder = AvatarBuilder;
/**
 * Compose multi builder
 */
class ComposeImageBuilder {
    constructor(imageBuilders) {
        this.imageBuilders = imageBuilders;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            for (const imageBuilder of this.imageBuilders) {
                const image = yield imageBuilder.buildImage(avatarBuilder, random, width, height);
                ctx.drawImage(image, 0, 0);
            }
            return canvas;
        });
    }
}
exports.ComposeImageBuilder = ComposeImageBuilder;
/**
 * Random avatar builder, choose random builder
 */
class RandomImageBuilder {
    constructor(imageBuilders) {
        this.imageBuilders = imageBuilders;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const index = random.nextInt(this.imageBuilders.length);
            const image = yield this.imageBuilders[index].buildImage(avatarBuilder, random, width, height);
            ctx.drawImage(image, 0, 0);
            return canvas;
        });
    }
}
exports.RandomImageBuilder = RandomImageBuilder;
/**
 * Add margin in child
 */
class MarginImageBuilder {
    constructor(imageBuilder, margin = 10) {
        this.imageBuilder = imageBuilder;
        if (margin instanceof Object) {
            this.margin = margin;
        }
        else {
            const num = margin;
            this.margin = { top: num, bottom: num, left: num, right: num };
        }
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const imgWidth = width - (this.margin.left + this.margin.right);
            const imgHeight = height - (this.margin.top + this.margin.bottom);
            const image = yield this.imageBuilder.buildImage(avatarBuilder, random, imgWidth, imgHeight);
            ctx.drawImage(image, this.margin.left, this.margin.top);
            return canvas;
        });
    }
}
exports.MarginImageBuilder = MarginImageBuilder;
/**
 * Fill background with color
 */
class FillStyleImageBuilder {
    constructor(fillStyle) {
        this.fillStyle = fillStyle;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = this.fillStyle;
            ctx.fillRect(0, 0, width, height);
            return canvas;
        });
    }
}
exports.FillStyleImageBuilder = FillStyleImageBuilder;
/**
 * Fill background with random color
 */
class RandomFillStyleImageBuilder {
    constructor(fillStyles = exports.DEFAULT_COLORS) {
        this.fillStyles = fillStyles;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const index = random.nextInt(this.fillStyles.length);
            ctx.fillStyle = this.fillStyles[index];
            ctx.fillRect(0, 0, width, height);
            return canvas;
        });
    }
}
exports.RandomFillStyleImageBuilder = RandomFillStyleImageBuilder;
/**
 * Circle mask in child
 */
class CircleMaskImageBuilder {
    constructor(imageBuilder) {
        this.imageBuilder = imageBuilder;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const image = yield this.imageBuilder.buildImage(avatarBuilder, random, width, height);
            ctx.beginPath();
            ctx.ellipse(width / 2, height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(image, 0, 0);
            return canvas;
        });
    }
}
exports.CircleMaskImageBuilder = CircleMaskImageBuilder;
/**
 * Rounded rect mask in child
 */
class RoundedRectMaskImageBuilder {
    constructor(imageBuilder, radius = 10) {
        this.imageBuilder = imageBuilder;
        this.corner = { tl: radius, tr: radius, br: radius, bl: radius };
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const image = yield this.imageBuilder.buildImage(avatarBuilder, random, width, height);
            ctx.beginPath();
            ctx.moveTo(this.corner.tl, 0);
            ctx.lineTo(width - this.corner.tr, 0);
            ctx.quadraticCurveTo(width, 0, width, this.corner.tr);
            ctx.lineTo(width, height - this.corner.br);
            ctx.quadraticCurveTo(width, height, width - this.corner.br, height);
            ctx.lineTo(this.corner.bl, height);
            ctx.quadraticCurveTo(0, height, 0, height - this.corner.bl);
            ctx.lineTo(0, this.corner.tl);
            ctx.quadraticCurveTo(0, 0, this.corner.tl, 0);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(image, 0, 0);
            return canvas;
        });
    }
}
exports.RoundedRectMaskImageBuilder = RoundedRectMaskImageBuilder;
/**
 * Add a shadow
 */
class ShadowImageBuilder {
    constructor(imageBuilder, shadow = { blur: 10, color: '#000000', offsetX: 0, offsetY: 0 }) {
        this.imageBuilder = imageBuilder;
        this.shadow = shadow;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            ctx.shadowBlur = this.shadow.blur;
            ctx.shadowColor = this.shadow.color;
            ctx.shadowOffsetX = this.shadow.offsetX;
            ctx.shadowOffsetY = this.shadow.offsetY;
            const image = yield this.imageBuilder.buildImage(avatarBuilder, random, width, height);
            ctx.drawImage(image, 0, 0);
            return canvas;
        });
    }
}
exports.ShadowImageBuilder = ShadowImageBuilder;
/**
 * Add a score shadow
 */
class ScoreShadowImageBuilder {
    constructor(imageBuilder, shadowColor = { red: 0, green: 0, blue: 0, alpha: 24 }) {
        this.imageBuilder = imageBuilder;
        this.shadowColor = shadowColor;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const image = yield this.imageBuilder.buildImage(avatarBuilder, random, width, height);
            ctx.drawImage(image, 0, 0);
            const score = this.createScore(width, height);
            ctx.drawImage(score, 0, 0);
            return canvas;
        });
    }
    createScore(width, height) {
        const canvas = canvas_1.createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        const score = ctx.getImageData(0, 0, width, height);
        let i = 0;
        for (let y = 0; y < height / 2; y++) {
            for (let x = 0; x < width; x++) {
                score.data[i] = this.shadowColor.red; // R value
                score.data[i + 1] = this.shadowColor.green; // G value
                score.data[i + 2] = this.shadowColor.blue; // B value
                score.data[i + 3] = this.shadowColor.alpha; // A value
                i += 4;
            }
        }
        ctx.putImageData(score, 0, 0);
        return canvas;
    }
}
exports.ScoreShadowImageBuilder = ScoreShadowImageBuilder;
/**
 * Add long shadow behind
 */
class LongShadowImageBuilder {
    constructor(imageBuilder, shadowColor = { red: 0, green: 0, blue: 0, alpha: 64 }) {
        this.imageBuilder = imageBuilder;
        this.shadowColor = shadowColor;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const image = yield this.imageBuilder.buildImage(avatarBuilder, random, width, height);
            const score = this.createLong(image, width, height);
            ctx.drawImage(score, 0, 0);
            ctx.drawImage(image, 0, 0);
            return canvas;
        });
    }
    createLong(image, width, height) {
        const imageData = image.getContext('2d').getImageData(0, 0, width, height);
        const canvas = canvas_1.createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        const score = ctx.getImageData(0, 0, width, height);
        const n = this.shadowColor.alpha;
        const step = n / (width + height);
        let i = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (LongShadowImageBuilder.isInShade(imageData, x, y)) {
                    const alpha = (n - ((x + y) * step));
                    score.data[i] = this.shadowColor.red; // R value
                    score.data[i + 1] = this.shadowColor.green; // G value
                    score.data[i + 2] = this.shadowColor.blue; // B value
                    score.data[i + 3] = alpha; // A value
                }
                i += 4;
            }
        }
        ctx.putImageData(score, 0, 0);
        return canvas;
    }
    static isInShade(imageData, x, y) {
        let tx = x;
        let ty = y;
        while (true) {
            tx -= 1;
            ty -= 1;
            if (tx < 0 || ty < 0) {
                return false;
            }
            else {
                const alpha = imageData.data[ty * imageData.width * 4 + tx * 4 + 3];
                if (alpha > 0) {
                    return true;
                }
            }
        }
    }
}
exports.LongShadowImageBuilder = LongShadowImageBuilder;
/**
 * Avatar with images folder
 */
class GroupImageBuilder {
    constructor(pathLocation, groups) {
        this.groups = groups;
        this.partMap = GroupImageBuilder.buildPartMap(pathLocation);
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const group = this.groups[random.nextInt(this.groups.length)];
            for (const part of group) {
                const fileNames = this.partMap[part];
                const fileName = fileNames[random.nextInt(fileNames.length)];
                const image = yield canvas_1.loadImage(fileName);
                ctx.drawImage(image, 0, 0, width, height);
            }
            return canvas;
        });
    }
    static buildPartMap(partsLocation) {
        const regex = new RegExp('.png$', 'i');
        const dirs = fs_1.default
            .readdirSync(partsLocation)
            .filter(partsDir => fs_1.default.statSync(path_1.default.join(partsLocation, partsDir)).isDirectory());
        return dirs.reduce((parts, ps) => {
            const dir = path_1.default.join(partsLocation, ps);
            parts[ps] = fs_1.default.readdirSync(dir).filter(fileName => regex.exec(fileName)).map(fileName => path_1.default.join(dir, fileName));
            return parts;
        }, {});
    }
}
exports.GroupImageBuilder = GroupImageBuilder;
/**
 * Grid builder
 */
class GridImageBuilder {
    constructor(imageBuilders, gridx, gridy) {
        this.imageBuilders = imageBuilders;
        this.gridx = gridx;
        this.gridy = gridy;
    }
    buildImage(avatarBuilder, random, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = canvas_1.createCanvas(width, height);
            const ctx = canvas.getContext('2d');
            const sizex = Math.ceil(width / this.gridx);
            const sizey = Math.ceil(height / this.gridy);
            for (let y = 0; y < this.gridy; y++) {
                for (let x = 0; x < this.gridx; x++) {
                    const image = yield this.imageBuilders.buildImage(avatarBuilder, random, sizex, sizey);
                    ctx.drawImage(image, x * sizex, y * sizey);
                }
            }
            return canvas;
        });
    }
}
exports.GridImageBuilder = GridImageBuilder;
//# sourceMappingURL=core-avatar.js.map