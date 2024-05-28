## プロジェクトを作成する場合

```sh
f:
npx nuxi init nuxt3-booklog
cd ./nuxt3-booklog
npm install
```

```sh
npm install prisma
npm install uuid
npx prisma init
```
schema.prismaファイルの編集
```sh
npx prisma migrate dev
# npx prisma generate
```

```sh
npm run dev
cd ../
```

## 既存プロジェクトを起動させる場合

```sh
cd ./nuxt3-booklog
npm install
npx prisma migrate dev
npx prisma migrate reset <== やりなおし
npm run dev
cd ../
```

## Prisma ドキュメント
https://www.prisma.io/docs
npx prisma studio

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
