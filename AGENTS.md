## Common

- Sync `README.md` with added or removed features that have broad user impact; minor or personal ones can stay out.

## Testing

Test every behavior change in both Chrome and Firefox:

|                 | Chrome                 | Firefox                               |
| --------------- | ---------------------- | ------------------------------------- |
| MCP             | `chrome-devtools`      | `firefox-devtools`                    |
| Build script    | `build`                | `build:firefox`                       |
| Install         | `.output/chrome-mv3`   | `.output/firefox-mv3`, `type: "path"` |
| Reload          | `reload_extension`     | `uninstall_extension` then reinstall  |
| Redirect hops   | All hops[^chrome-hops] | Final hop only; check `location.href` |
| `modifyHeaders` | Applied, then logged   | Logged, then applied[^ff-headers]     |

[^chrome-hops]: `list_network_requests` with `includePreservedRequests: true`.

[^ff-headers]: Verify by the page's response instead (e.g. `youtube.com/tv` stays on the TV UI only with the spoofed `User-Agent`).

## Example URLs

- Comment a real URL above code that reads or matches one, unless the pattern already is a full URL (e.g. `urlFilter: '|https://www.youtube.com/tv^'`).
- Anonymize account-tied IDs and tokens (affiliate IDs, channel IDs, session tokens) by replacing each character with a placeholder, keeping the length.

```ts
// https://brandconnect.naver.com/affiliates/000000000000000?channelProductNo=00000000000
const productId = new URL(window.location.href).searchParams.get('channelProductNo');
```

## `declarativeNetRequest`

- Check `chrome-types` JSDoc and the [Chrome](https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest) / [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/declarativeNetRequest) docs for the spec.
  - Where they differ, follow the stricter one and record the verified difference in [Chrome vs Firefox](#chrome-vs-firefox).
- Avoid `regexFilter` unless capture groups are required.
- Narrow conditions (e.g. in Firefox, a no-op `redirect` blocks lower-priority rules).
- Keep `host_permissions` at `*://*/*` in `wxt.config.ts`.
  - With per-domain entries, a missing domain works in `wxt dev` but not in production ([#434](https://github.com/wxt-dev/wxt/issues/434)).

### Rulesets

In `utilities/declarativeNetRequest/` (`index.ts` globs `blocklists/` and `sites/`):

- `trackers.ts` → `rules/trackers.json`
- `blocklists/*.ts` → `rules/blocklists.json`
- `sites/*.ts` → `rules/sites.json`

`Rule.id`s are assigned at build time; leave them `0`.

### Priorities

- At most one terminating rule (all but `modifyHeaders`) applies per request, across all rulesets.
  - A `redirect` starts a new request, so each hop gets its own (see [Redirect Checklists](#redirect-checklists)).
  - Untargeted rules (no `urlFilter`/`requestDomains`, e.g. `trackers.ts`) compete with specific rules for that one slot.
- The larger `priority` number wins (default `1`, must be `>= 1`).
  - Within the same priority, action decides: `allow` >= `allowAllRequests` > `block` > `upgradeScheme` > `redirect`.
- `wxt.config.ts` defaults every `sites/`/`blocklists/` rule's `priority` to `100`, above `trackers.ts` (`1`–`2`).
  - Rules from different files can share `100` since their conditions don't overlap.
  - When rules in one file overlap, raise the one that must win (e.g. `101` in `sites/youtube.ts`).

### Chrome vs Firefox

|                                    | Chrome     | Firefox                                        |
| ---------------------------------- | ---------- | ---------------------------------------------- |
| `allow` vs `allowAllRequests`      | Equal      | `allow` wins[^docs-only]                       |
| Enabled static rulesets            | 50         | 20; the rest are silently ignored              |
| No-op `redirect` match             | Skipped    | Wins; lower-priority rules don't run[^ff-noop] |
| `modifyHeaders` + terminating rule | Both apply | `modifyHeaders` is dropped[^ff-modify]         |

[^docs-only]: Per the Chrome and MDN docs; not verified (no rule here uses `allowAllRequests`).

[^ff-noop]: Firefox builds merge `trackerParams` into every `sites/` `queryTransform` redirect (`wxt.config.ts`), so a winning no-op loses nothing.

[^ff-modify]: Regardless of priority, including a no-op match from the untargeted `trackers.ts` redirect, which matches every `main_frame`. Scope the competing rule away with `excludedRequestDomains`.

### Redirect Checklists

- Each trace is the expected redirect chain for one URL: one line per hop, status then URL.
  - Pick a URL whose hops show which rule fires where; add a `#` note only when they can't.
- Add or update a trace when changing a `redirect` rule.
  - Verify hops in Chrome and the final URL in Firefox (see [Testing](#testing)).
- Re-run traces after changing a rule:
  - Untargeted (`trackers.ts`): every trace, since it can shift hops in any chain.
  - Domain-scoped: only traces whose chain passes through that domain.

```plaintext
307 https://www.youtube.com/redirect?event=video_description&q=https%3A%2F%2Fexample.com&redir_token=1&si=2
307 https://www.youtube.com/redirect?event=video_description&q=https%3A%2F%2Fexample.com&si=2
200 https://www.youtube.com/redirect?event=video_description&q=https%3A%2F%2Fexample.com
```

```plaintext
307 https://youtube.com/shorts/RZ5OtdsXBsg?utm_source=1&si=2
307 https://youtube.com/shorts/RZ5OtdsXBsg?utm_source=1
301 https://youtube.com/shorts/RZ5OtdsXBsg
200 https://www.youtube.com/shorts/RZ5OtdsXBsg
```

```plaintext
307 https://threads.com/@threads?utm_source=1&xmt=2
307 https://threads.com/@threads?utm_source=1
301 https://threads.com/@threads
200 https://www.threads.com/@threads
```

```plaintext
# The airbridge rule outranks the generic one and removes a superset of its params, so one hop clears all.
307 https://example.com/?fbclid=1&airbridge_referrer=2&sub_id=3
200 https://example.com/
```

```plaintext
307 https://pbs.twimg.com/media/ABC123?format=jpg&name=small
404 https://pbs.twimg.com/media/ABC123?format=jpg&name=orig
```

```plaintext
307 https://pbs.twimg.com/media/ABC123?format=jpg&name=orig&utm_source=1
404 https://pbs.twimg.com/media/ABC123?format=jpg&name=orig
```

```plaintext
# The musinsa rule keeps `af_dp`, so it no-ops on hop 2. Chrome falls through to the generic rule; Firefox clears all on hop 1 (merged `trackerParams`).
307 https://www.musinsa.com/?af_dp=1&pid=2&utm_source=3
307 https://www.musinsa.com/?af_dp=1&utm_source=3
308 https://www.musinsa.com/?af_dp=1
200 https://www.musinsa.com/main/musinsa/recommend?af_dp=1
```
