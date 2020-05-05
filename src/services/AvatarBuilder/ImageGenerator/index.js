"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_avatar_1 = require("./internal/core-avatarr");
const cat_avatar_1 = require("./internal/cat-avatar");
const eight_bit_avatar_1 = require("./internal/eight-bit-avatar");
const github_avatar_1 = require("./internal/github-avatar");
const identicon_avatar_1 = require("./internal/identicon-avatar");
const square_avatar_1 = require("./internal/square-avatar");
const triangle_avatar_1 = require("./internal/triangle-avatar");
const cache_1 = require("./internal/cache");
var Avatar;
(function (Avatar) {
	/**
	 * Build a avatar builder
	 * @param imageBuilder a image builder (use Avatar.Image.)
	 * @param width width of avatar result
	 * @param height height of avatar result
	 * @param options builder options (cache,...)
	 */
	function builder(imageBuilder, width, height, options) {
		return new core_avatar_1.AvatarBuilder(
			imageBuilder,
			width,
			height,
			options
		);
	}
	Avatar.builder = builder;
	/**
	 * Create a builder for cat avatar
	 * @param size width & height of image
	 * @param options builder options (cache,...)
	 */
	function catBuilder(size = 256, options) {
		return new core_avatar_1.AvatarBuilder(
			Image.cat(),
			size,
			size,
			options
		);
	}
	Avatar.catBuilder = catBuilder;
	/**
	 * Create a builder github avatar
	 * @param size width & height of image
	 * @param precision precision
	 * @param options builder options (cache,...)
	 */
	function githubBuilder(size = 256, precision = 3, options) {
		return new core_avatar_1.AvatarBuilder(
			Image.github(precision),
			size,
			size,
			options
		);
	}
	Avatar.githubBuilder = githubBuilder;
	/**
	 * Create a builder triangle avatar
	 * @param size width & height of image
	 * @param precision triangle precision
	 * @param colors list of colors
	 * @param options builder options (cache,...)
	 */
	function triangleBuilder(
		size = 256,
		precision = 4,
		colors = core_avatar_1.DEFAULT_COLORS,
		options
	) {
		return new core_avatar_1.AvatarBuilder(
			Image.triangle(precision, colors),
			size,
			size,
			options
		);
	}
	Avatar.triangleBuilder = triangleBuilder;
	/**
	 * Create a builder identicon avatar
	 * @param size width & height of image
	 * @param options builder options (cache,...)
	 * @constructor
	 */
	function identiconBuilder(size = 256, options) {
		return new core_avatar_1.AvatarBuilder(
			Image.identicon(),
			size,
			size,
			options
		);
	}
	Avatar.identiconBuilder = identiconBuilder;
	/**
	 * Create a builder avatar like min block https://github.com/flouthoc/minBlock.js
	 * @param size width & height of image
	 * @param precision block number for line
	 * @param colors list of colors
	 * @param options builder options (cache,...)
	 */
	function squareBuilder(
		size = 256,
		precision = 3,
		colors = core_avatar_1.DEFAULT_COLORS,
		options
	) {
		return new core_avatar_1.AvatarBuilder(
			Image.square(precision, colors),
			size,
			size,
			options
		);
	}
	Avatar.squareBuilder = squareBuilder;
	/**
	 * Build avatar with 8bit female
	 * @param size width & height of image
	 * @param options builder options (cache,...)
	 */
	function female8bitBuilder(size = 256, options) {
		return new core_avatar_1.AvatarBuilder(
			new eight_bit_avatar_1.FemaleEightBitImageBuilder(),
			size,
			size,
			options
		);
	}
	Avatar.female8bitBuilder = female8bitBuilder;
	/**
	 * Build avatar with 8bit male
	 * @param size width & height of image
	 * @param options builder options (cache,...)
	 */
	function male8bitBuilder(size = 256, options) {
		return new core_avatar_1.AvatarBuilder(
			new eight_bit_avatar_1.MaleEightBitImageBuilder(),
			size,
			size,
			options
		);
	}
	Avatar.male8bitBuilder = male8bitBuilder;
	let Image;
	(function (Image) {
		/**
		 * Compose multi image builder
		 * @param imageBuilders image builder to compose (in order)
		 */
		function compose(...imageBuilders) {
			return new core_avatar_1.ComposeImageBuilder(imageBuilders);
		}
		Image.compose = compose;
		/**
		 * Random choosing avatar (by id)
		 * @param imageBuilders
		 */
		function random(...imageBuilders) {
			return new core_avatar_1.RandomImageBuilder(imageBuilders);
		}
		Image.random = random;
		/**
		 * Add margin to child image builder
		 * @param imageBuilder child image builder
		 * @param margin size of margin
		 */
		function margin(imageBuilder, margin = 10) {
			return new core_avatar_1.MarginImageBuilder(imageBuilder, margin);
		}
		Image.margin = margin;
		/**
		 * Create a image with background fill style
		 * @param fillStyle canvas fill style (color, gradient)
		 */
		function fillStyle(fillStyle) {
			return new core_avatar_1.FillStyleImageBuilder(fillStyle);
		}
		Image.fillStyle = fillStyle;
		/**
		 * Create a image with background random fill style
		 * @param fillStyles canvas fill style (color, gradient)
		 */
		function randomFillStyle(fillStyles = core_avatar_1.DEFAULT_COLORS) {
			return new core_avatar_1.RandomFillStyleImageBuilder(fillStyles);
		}
		Image.randomFillStyle = randomFillStyle;
		/**
		 * Create a circle mask with child image
		 * @param imageBuilder child image builder
		 */
		function circleMask(imageBuilder) {
			return new core_avatar_1.CircleMaskImageBuilder(imageBuilder);
		}
		Image.circleMask = circleMask;
		/**
		 * Create a rounded rect mask with child image
		 * @param imageBuilder child image
		 * @param radius radius of rounded
		 */
		function roundedRectMask(imageBuilder, radius = 10) {
			return new core_avatar_1.RoundedRectMaskImageBuilder(
				imageBuilder,
				radius
			);
		}
		Image.roundedRectMask = roundedRectMask;
		/**
		 * Create a shadow below child image
		 * @param imageBuilder child image
		 * @param shadow shadow option
		 */
		function shadow(
			imageBuilder,
			shadow = { blur: 10, color: "#000000", offsetX: 0, offsetY: 0 }
		) {
			return new core_avatar_1.ShadowImageBuilder(imageBuilder, shadow);
		}
		Image.shadow = shadow;
		/**
		 * Create a score shadow (half-image shadow)
		 * @param imageBuilder child image
		 * @param shadowColor shadow color
		 */
		function scoreShadow(
			imageBuilder,
			shadowColor = { red: 0, green: 0, blue: 0, alpha: 24 }
		) {
			return new core_avatar_1.ScoreShadowImageBuilder(
				imageBuilder,
				shadowColor
			);
		}
		Image.scoreShadow = scoreShadow;
		/**
		 * Create a long shadow
		 * @param imageBuilder child image
		 * @param shadowColor shadow color
		 */
		function longShadow(
			imageBuilder,
			shadowColor = { red: 0, green: 0, blue: 0, alpha: 64 }
		) {
			return new core_avatar_1.LongShadowImageBuilder(
				imageBuilder,
				shadowColor
			);
		}
		Image.longShadow = longShadow;
		/**
		 *
		 * @param pathLocation
		 * @param groups
		 */
		function group(pathLocation, groups) {
			return new core_avatar_1.GroupImageBuilder(pathLocation, groups);
		}
		Image.group = group;
		/**
		 * Identicon image
		 * @param patchSize size of patch
		 * @param backgroundColor background color
		 */
		function identicon(
			patchSize = 20,
			backgroundColor = { red: 255, green: 255, blue: 255 }
		) {
			return new identicon_avatar_1.IdenticonImageBuilder(
				patchSize,
				backgroundColor
			);
		}
		Image.identicon = identicon;
		/**
		 * Mini block image
		 * @param precision number of block by line
		 * @param colors list of colors
		 */
		function square(precision = 3, colors = core_avatar_1.DEFAULT_COLORS) {
			return new square_avatar_1.SquareImageBuilder(precision, colors);
		}
		Image.square = square;
		/**
		 * Triangle image
		 * @param precision
		 * @param colors list of colors
		 */
		function triangle(
			precision = 4,
			colors = core_avatar_1.DEFAULT_COLORS
		) {
			return new triangle_avatar_1.TriangleImageBuilder(
				precision,
				colors
			);
		}
		Image.triangle = triangle;
		/**
		 * Github image generator
		 * @param precision
		 */
		function github(precision = 3) {
			return new github_avatar_1.GithubImageBuilder(precision);
		}
		Image.github = github;
		/**
		 * Cat avatar image
		 */
		function cat() {
			return new cat_avatar_1.CatImageBuilder();
		}
		Image.cat = cat;
		/**
		 * 8bit male avatar
		 */
		function male8bit() {
			return new eight_bit_avatar_1.MaleEightBitImageBuilder();
		}
		Image.male8bit = male8bit;
		/**
		 * 8bit female avatar
		 */
		function female8bit() {
			return new eight_bit_avatar_1.FemaleEightBitImageBuilder();
		}
		Image.female8bit = female8bit;
		/**
		 * Create a grid avatar, call gridx * gridy times iage builder
		 * @param imageBuilder
		 * @param gridx number of element for x
		 * @param gridy number of element for y
		 */
		function grid(imageBuilder, gridx, gridy) {
			return new core_avatar_1.GridImageBuilder(
				imageBuilder,
				gridx,
				gridy
			);
		}
		Image.grid = grid;
	})((Image = Avatar.Image || (Avatar.Image = {})));
	let Cache;
	(function (Cache) {
		/**
		 * Memory cache
		 */
		function memory() {
			return new cache_1.MemoryCache();
		}
		Cache.memory = memory;
		/**
		 * LRU cache
		 * @param options
		 */
		function lru(options = { max: 50 }) {
			return new cache_1.LRUCache();
		}
		Cache.lru = lru;
		/**
		 * Folder cache
		 * @param location
		 */
		function folder(location = "./tmp/avatar") {
			return new cache_1.FolderCache(location);
		}
		Cache.folder = folder;
		/**
		 * Compose multi cache
		 * @param caches
		 */
		function compose(...caches) {
			return new cache_1.ComposeCache(caches);
		}
		Cache.compose = compose;
	})((Cache = Avatar.Cache || (Avatar.Cache = {})));
})(Avatar || (Avatar = {}));
exports.default = Avatar;
module.exports = Avatar;
//# sourceMappingURL=index.js.map
