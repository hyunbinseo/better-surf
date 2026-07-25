## Common

- Sync `README.md` with added or removed features. Minor or personal features may be intentionally excluded; only add if the feature has broad user impact.

## Content Scripts

Document non-obvious matching/parsing logic with a real example URL as a comment, placed directly above the line it explains (a `matches` entry, a condition, or a parsing step).

## `declarativeNetRequest`

- Check `chrome-types` JSDoc and [documentation](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest) for the spec.
- Avoid `regexFilter` condition unless capture groups are required.

Narrow conditions — a no-op match is still a match, and can block a lower-priority rule from ever running.

> Chrome picks at most one candidate per request. Chrome finds a matching rule, by ordering all matching rules by priority. Rules with the same priority are ordered by action (`allow` or `allowAllRequests` > `block` > `upgradeScheme` > `redirect`).

Prepend rules on top of each file's `rule_*` arrays.

```plaintext
.
└── utilities/
    └── declarativeNetRequest/
        ├── 001_utilities.ts  # cross browser
        ├── 101_bloats.ts     # analytics, etc.
        └── 201_firefox.ts
```

### `host_permissions`

The `wxt` dev script automatically adds every content script's `matches` to `host_permissions`, so a rule relying on a domain missing from that list can appear to work in dev but silently no-op in production. See [#434](https://github.com/wxt-dev/wxt/issues/434)

This extension requests global `host_permissions` (`*://*/*`) in `wxt.config.ts` by design, so per-domain entries are not needed.

### Priorities

All rules share one evaluation space — the actions above are mutually exclusive "terminating" actions, and untargeted rules (no `urlFilter`/`requestDomains`, e.g. the generic tracker-stripping rule) can match requests meant for a more specific rule. Beyond the action-type tie-break above, same-priority-and-action ties resolve via unspecified, non-standardized ordering — set an explicit `priority` (default `1`, must be `>= 1`, bigger is higher) on the more specific rule so it deterministically wins.

### Redirect Chains

A `redirect` produces a new request, which gets evaluated from scratch — so each hop in a redirect chain can be won by a different rule.

```
307 https://youtube.com/shorts/RZ5OtdsXBsg?si=1&utm_source=2
307 https://youtube.com/shorts/RZ5OtdsXBsg?utm_source=2
301 https://youtube.com/shorts/RZ5OtdsXBsg
200 https://www.youtube.com/shorts/RZ5OtdsXBsg
```

```
307 https://threads.com/@threads?utm_source=1&xmt=2
307 https://threads.com/@threads?utm_source=1
301 https://threads.com/@threads
200 https://www.threads.com/@threads
```
