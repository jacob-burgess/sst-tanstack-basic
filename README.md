# SST Notes

deploying an in-memory db to lambda was dumb, come to think of it

https://d1qb1fw8dmy6mk.cloudfront.net

- `sst init` detects as SolidStart, 1 line userspace change in sst.config.ts
- nitro still not happy with the override in package.json
  - complains about no 'compatibility date' specified
  - can override with `COMPATIBILITY_DATE=2024-09-20 bun sst dev`

# Trello-like example

To run this example:

```sh
pnpm install
pnpm dev
```
