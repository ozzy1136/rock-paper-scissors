export default {
	plugins:
		process.env.NODE_ENV === "production"
			? {
					"postcss-preset-env": {
						autoprefixer: true,
						stage: 2,
						features: {
							"nesting-rules": true,
							"custom-media-queries": {
								importFrom: "src/index.css",
							},
							"all-property": false,
							"any-link-pseudo-class": false,
							"custom-properties": false,
							"font-variant-property": false,
							"image-set-function": false,
							"is-pseudo-class": false,
							"logical-properties-and-values": false,
							"not-pseudo-class": false,
							"overflow-property": false,
							"overflow-wrap-property": false,
							"unset-value": false,
						},
					},
			  }
			: {
					"postcss-preset-env": {
						autoprefixer: true,
						stage: 2,
						features: {
							"nesting-rules": true,
							"custom-media-queries": {
								importFrom: "src/index.css",
							},
							"all-property": false,
							"any-link-pseudo-class": false,
							"custom-properties": false,
							"font-variant-property": false,
							"gap-properties": false,
							"image-set-function": false,
							"is-pseudo-class": false,
							"logical-properties-and-values": false,
							"not-pseudo-class": false,
							"overflow-property": false,
							"overflow-wrap-property": false,
							"unset-value": false,
						},
					},
			  },
};
