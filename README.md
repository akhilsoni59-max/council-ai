# Council AI frontend demo

A frontend-only product demonstration for a multi-model AI council. It opens directly into the chat workspace, simulates four independent model responses followed by a Claude synthesis, and does not make network requests to AI providers.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with:

```bash
npm run build
```

## Structure

- `src/components` - modular application and result components
- `src/data` - realistic mock scenarios and model metadata
- `src/pages` - landing page, application workflow, and secondary screens
- `src/services` - replaceable mock chat, conversation, and user services
- `src/types` - future-backend-ready TypeScript contracts
- `public/assets` - product artwork, including the generated Council AI brand mark

Demo state controls in the app header can simulate success, one-model failure, slow responses, synthesis failure, and complete source unavailability.
