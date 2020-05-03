"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const core_avatar_1 = require("./core-avatar");
const GROUPS = [
	["bodies", "furs", "eyes", "mouths"],
	["bodies", "furs", "eyes", "mouths", "accessories"],
	["bodies", "furs", "eyes", "mouths", "zzs"],
];
class CatImageBuilder extends core_avatar_1.GroupImageBuilder {
	constructor() {
		super(path_1.default.join(__dirname, "/assets/cat"), GROUPS);
	}
}
exports.CatImageBuilder = CatImageBuilder;
//# sourceMappingURL=cat-avatar.js.map
