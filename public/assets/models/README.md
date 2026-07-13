# Model assets

The live UI now renders the recognized provider SVG marks from the maintained
`@lobehub/icons` brand-asset package. If locally hosted assets are preferred
later, place approved provider files here:

- `chatgpt.svg`
- `grok.svg`
- `gemini.svg`
- `glm.svg`
- `claude.svg`

The shared `ModelIcon` component is the only integration point, so local
approved files can replace the package without changing the rest of the UI.
