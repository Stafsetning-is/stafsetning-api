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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const lru_cache_1 = __importDefault(require("lru-cache"));
class MemoryCache {
    constructor() {
        this.map = {};
    }
    getOrCreate(id, createCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let element = this.map[id];
            if (!element) {
                element = yield createCallback();
                this.map[id] = element;
            }
            return element;
        });
    }
}
exports.MemoryCache = MemoryCache;
class LRUCache {
    constructor(options = { max: 50 }) {
        this.lru = new lru_cache_1.default(options);
    }
    getOrCreate(id, createCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            let element = this.lru.get(id);
            if (!element) {
                element = yield createCallback();
                this.lru.set(id, element);
            }
            return element;
        });
    }
}
exports.LRUCache = LRUCache;
class FolderCache {
    constructor(location = './tmp/avatar') {
        this.location = location;
        if (!fs_1.default.existsSync(location)) {
            fs_1.default.mkdirSync(location, { recursive: true });
        }
    }
    getOrCreate(id, createCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = path_1.default.join(this.location, `${id}.png`);
            if (fs_1.default.existsSync(file)) {
                return fs_1.default.readFileSync(file);
            }
            const buffer = yield createCallback();
            fs_1.default.writeFileSync(file, buffer);
            return buffer;
        });
    }
}
exports.FolderCache = FolderCache;
class ComposeCache {
    constructor(caches) {
        this.caches = caches;
    }
    getOrCreate(id, createCallback) {
        return ComposeCache._getOrCreate(this.caches, id, createCallback);
    }
    static _getOrCreate(caches, id, createCallback) {
        const [first, ...rest] = caches;
        return first.getOrCreate(id, rest.length === 0 ? createCallback : () => {
            return ComposeCache._getOrCreate(rest, id, createCallback);
        });
    }
}
exports.ComposeCache = ComposeCache;
//# sourceMappingURL=cache.js.map