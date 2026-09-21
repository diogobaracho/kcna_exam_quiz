# Contract: Local Storage Schema

## Keys

| Key | Purpose |
|---|---|
| `kcna-quiz:attempts:v1` | Finished attempts |
| `kcna-quiz:settings:v1` | Last used setup form values |

## `kcna-quiz:attempts:v1`

```json
{
  "version": 1,
  "attempts": [
    {
      "id": "1758470400000-k3j9x",
      "startedAt": "2026-09-21T14:00:00.000Z",
      "finishedAt": "2026-09-21T14:12:30.000Z",
      "mode": "practice",
      "categories": ["kubernetes-fundamentals"],
      "topics": null,
      "total": 10,
      "correct": 8,
      "scorePct": 80,
      "passed": true,
      "durationSec": 750,
      "perCategory": { "kubernetes-fundamentals": { "correct": 8, "total": 10 } },
      "perTopic": { "kubernetes-fundamentals/architecture": { "correct": 3, "total": 4 } },
      "answers": [
        {
          "questionId": "kf-arch-001",
          "category": "kubernetes-fundamentals",
          "topic": "architecture",
          "chosenText": "etcd",
          "correctText": "etcd",
          "correct": true
        }
      ]
    }
  ]
}
```

Rules:
- Newest attempt first in the array.
- Reader behaviour: missing key → `[]`; JSON parse error → `[]` + `corrupt: true`;
  `version !== 1` → `[]` + `corrupt: true`; non-array `attempts` → `[]` + `corrupt: true`.
- Writer behaviour: `localStorage.setItem` failures (quota, private mode) are caught and reported
  as `{ ok: false, reason }`; the app shows a warning but the session result is still displayed.

## `kcna-quiz:settings:v1`

```json
{
  "version": 1,
  "mode": "practice",
  "count": 20,
  "categories": ["kubernetes-fundamentals", "container-orchestration"],
  "topics": null,
  "distribution": "weighted",
  "timerEnabled": false
}
```

Any invalid value falls back to defaults field by field.
