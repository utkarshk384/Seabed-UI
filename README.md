# Things to change

1. Project name in `package.json`
2. If your not using tailwindcss in your project then: 

    a. Remove `postcss.config.js`, `tailwind.config.js` and `/styles/tailwind.scss`
    
    b. Remove `@use "tailwind";` line from `main.scss` in `"/styles/main.scss"`

## Add tailwind css

First install the required packages 
```bash
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
# or
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Then edit `postcss.config.js` and `tailwind.config.js` as your like it 
## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

Building the app is relatively simple by running:
```bash
yarn build
# or
npm run build
```

Then finally to serve the build you can use:
```bash
yarn start
# or
npm run start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.
