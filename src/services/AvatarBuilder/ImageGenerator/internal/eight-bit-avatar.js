"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const core_avatar_1 = require("./core-avatar");
const GROUPS = [["background", "face", "clothes", "hair", "eye", "mouth"]];
class EightBitImageBuilder extends core_avatar_1.GroupImageBuilder {
	constructor(sexe) {
		super(path_1.default.join(__dirname, "/assets/8bit", sexe), GROUPS);
	}
}
exports.EightBitImageBuilder = EightBitImageBuilder;
class FemaleEightBitImageBuilder extends EightBitImageBuilder {
	constructor() {
		super("female");
	}
}
exports.FemaleEightBitImageBuilder = FemaleEightBitImageBuilder;
class MaleEightBitImageBuilder extends EightBitImageBuilder {
	constructor() {
		super("male");
	}
}
exports.MaleEightBitImageBuilder = MaleEightBitImageBuilder;
//# sourceMappingURL=eight-bit-avatar.js.map
