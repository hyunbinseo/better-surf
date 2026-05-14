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
