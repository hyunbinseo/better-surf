## Common

- Sync `README.md` with added or removed features. Minor or personal features may be intentionally excluded; only add if the feature has broad user impact.

## Content Scripts

Document non-obvious matching/parsing logic with a real example URL as a comment, placed directly above the line it explains (a `matches` entry, a condition, or a parsing step).

## `declarativeNetRequest`

- Check `chrome-types` JSDoc and [documentation](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest) for each field's behavior.
- Avoid `regexFilter` unless capture groups are needed
- Prepend rules on top of each file's `rule_*` arrays.

```plaintext
.
└── utilities/
    └── declarativeNetRequest/
        ├── 001_utilities.ts  # cross browser
        ├── 101_bloats.ts     # analytics, etc.
        └── 201_firefox.ts
```

> `"declarativeNetRequest"` — triggers a permission warning at install time but provides implicit access to `allow`, `allowAllRequests` and `block` rules. Use this when possible to avoid needing to request full access to hosts.

The `wxt` dev script automatically adds every content script's `matches` to `host_permissions`, so a rule relying on a domain missing from that list can appear to work in dev but silently no-op in production. See [#434](https://github.com/wxt-dev/wxt/issues/434)

This extension requests global `host_permissions` (`*://*/*`) in `wxt.config.ts` by design, so per-domain entries are not needed.
