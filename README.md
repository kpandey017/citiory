# Citiory

City intelligence platform built with Next.js 16 (App Router), TypeScript, and Tailwind CSS.

## Features

- Discover cities worldwide
- Cost of living, safety, pollution, climate, literacy, internet, and quality of life data
- City reviews and rankings
- Compare cities
- Best cities for digital nomads
- SEO-friendly and deployable on Vercel

## Architecture

All data comes from config files in `config/` and is accessed through a data abstraction layer in `lib/data/`. This design supports future migration to a database with minimal changes.

## Data Integrity Policy

- No synthetic/generated city metrics are allowed in production data.
- Each city entry in `config/cities.ts` must be manually verified from trusted sources before being added.
- `scores.overall` is calculated from component scores (safety, pollution, internet, quality of life, job, healthcare, climate) and must not be hardcoded independently.
- If a city cannot be fully verified yet, it should not be included in `cities`.

## Development

```bash
npm install
npm run dev
```

## Deployment

Deploy to Vercel using default settings; the app is fully static where possible.

