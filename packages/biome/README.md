# @repo/biome

Shared Biome configuration for the monorepo.

## Usage

This package provides a shared Biome configuration that can be extended by individual apps in the monorepo.

### In your app's biome.json:

```json
{
  "extends": ["@repo/biome/biome.json"]
}
```

This will inherit all the base configuration and allow you to override specific settings as needed. 