## Common

- Sync `README.md` with added or removed features. Minor or personal features may be intentionally excluded; only add if the feature has broad user impact.

## `declarativeNetRequest`

Prepend rules on top of each file's `rule_*` arrays.

```plaintext
.
└── utilities/
    └── declarativeNetRequest/
        ├── 001_utilities.ts  # cross browser
        ├── 101_bloats.ts     # analytics, etc.
        └── 201_firefox.ts
```

> `"declarativeNetRequest"` — triggers a permission warning at install time but provides implicit access to `allow`, `allowAllRequests` and `block` rules. Use this when possible to avoid needing to request full access to hosts.

For rule action types not listed above, sync the target domain with `host_permissions` in `wxt.config.ts`.

## Sites

### YouTube

Use `urlFilter` unless capture groups are needed.

| Type      | Rule          | Domains                  |
| --------- | ------------- | ------------------------ |
| Utilities | `urlFilter`   | `www.` only              |
| Utilities | `regexFilter` | bare and `www.`          |
| Bloats    | `regexFilter` | all including `youtu.be` |
