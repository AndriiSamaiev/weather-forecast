# 🌦 Nuxt 3 Weather App

## Overview

Nuxt 3 application that fetches and displays weather data based on user input. The app uses a Nuxt server API route to proxy requests to an external weather API:

## Features

Users can enter a city name to get real-time weather data.

Displays key weather information:

🌍 City Name

🌡 Temperature (°C)

☁️ Weather Condition (e.g., "Cloudy")

🖼 Weather Icon

Autocomplete suggestions for city names.

Handles errors and displays appropriate messages.

## 🛠 Tech Stack

Nuxt 3 (Vue 3 framework)

Tailwind CSS for styling

Nuxt server API for handling external API requests


## Configuration

Clone the repository and install dependencies
Copy the Environment Variables File: Make a copy of the .env.example file and rename it to .env. This file contains the necessary environment variables for the application to run correctly.

```bash
cp .env.example .env

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
pnpm dev

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
pnpm build

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
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
