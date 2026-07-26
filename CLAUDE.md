## Common

- Sync `README.md` with added or removed features. Minor or personal features may be intentionally excluded; only add if the feature has broad user impact.

## Testing

Don't use `wxt dev` — it launches its own browser instance that an agent can't drive.

Use the `chrome-devtools` MCP to test this extension in a real browser: run the `build` script, then load `.output/chrome-mv3` via the MCP's `install_extension` tool.

## Content Scripts

Document non-obvious matching/parsing logic with a real example URL as a comment, placed directly above the line it explains (a `matches` entry, a condition, or a parsing step).

## `declarativeNetRequest`

- Check `chrome-types` JSDoc and [documentation](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest) for the spec.
- Avoid `regexFilter` condition unless capture groups are required.
- Update and test the `Redirect Checklists` on redirect rule changes.

Narrow conditions — a no-op match is still a match, and can block a lower-priority rule from ever running.

> Chrome picks at most one candidate per request. Chrome finds a matching rule, by ordering all matching rules by priority. Rules with the same priority are ordered by action (`allow` or `allowAllRequests` > `block` > `upgradeScheme` > `redirect`).

### `host_permissions`

The `wxt` dev script automatically adds every content script's `matches` to `host_permissions`, so a rule relying on a domain missing from that list can appear to work in dev but silently no-op in production. See [#434](https://github.com/wxt-dev/wxt/issues/434)

This extension requests global `host_permissions` (`*://*/*`) in `wxt.config.ts` by design, so per-domain entries are not needed.

### Rulesets

A ruleset is one JSON rule file registered via a `Ruleset` dictionary (`{ id, path, enabled }`) in `rule_resources`. `Rule.id` only needs to be unique _within its own ruleset file_ — different rulesets can reuse the same numbers.

```plaintext
.
└── utilities/
    └── declarativeNetRequest/
        ├── trackers.ts
        ├── sites/
        │   └── <site>.ts
        └── blocklists/
            └── <vendor>.ts
```

Files under `sites/` and `blocklists/` are discovered via `glob` in `wxt.config.ts` — no manual registration needed.

Each becomes its own ruleset, so its `Rule.id`s just start at `1`. Across files, entries can share the same default `priority` since their `requestDomains`/`urlFilter` don't overlap between different sites/vendors — but multiple rules _within_ the same file can still overlap (see `sites/youtube.ts`), and need an explicit `priority` if that overlap doesn't self-resolve.

### Priorities

All rules share one evaluation space — the actions above are mutually exclusive "terminating" actions, and untargeted rules (no `urlFilter`/`requestDomains`, e.g. the generic tracker-stripping rule) can match requests meant for a more specific rule. Beyond the action-type tie-break above, same-priority-and-action ties resolve via unspecified, non-standardized ordering — set an explicit `priority` (default `1`, must be `>= 1`, bigger is higher) on the more specific rule so it deterministically wins.

### Redirect Chains

A `redirect` produces a new request, which gets evaluated from scratch — so each hop in a redirect chain can be won by a different rule.

### Redirect Checklists

```
307 https://www.youtube.com/redirect?event=video_description&q=https%3A%2F%2Fexample.com&redir_token=1&si=2
307 https://www.youtube.com/redirect?event=video_description&q=https%3A%2F%2Fexample.com&si=2
200 https://www.youtube.com/redirect?event=video_description&q=https%3A%2F%2Fexample.com
200 https://example.com/
```

```
307 https://youtube.com/shorts/RZ5OtdsXBsg?utm_source=1&si=2
307 https://youtube.com/shorts/RZ5OtdsXBsg?utm_source=1
301 https://youtube.com/shorts/RZ5OtdsXBsg
200 https://www.youtube.com/shorts/RZ5OtdsXBsg
```

```
307 https://threads.com/@threads?utm_source=1&xmt=2
307 https://threads.com/@threads?utm_source=1
301 https://threads.com/@threads
200 https://www.threads.com/@threads
```

```
307 https://example.com/?utm_source=1&fbclid=2
200 https://example.com/
```

```
307 https://example.com/?airbridge_referrer=1&sub_id=2
200 https://example.com/
```

```
307 https://pbs.twimg.com/media/ABC123?format=jpg&name=small
200 https://pbs.twimg.com/media/ABC123?format=jpg&name=orig
```
