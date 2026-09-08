# VEYRO API Hub — V1 approved catalog

Status values:
- APPROVED: suitable for integration after normal provider onboarding/terms review.
- CONDITIONAL: useful, but commercial/public-scale usage requires a paid plan, attribution, provider approval, or additional review.
- HOLD: do not ship as a default dependency in V1.

| API | Category | VEYRO use | Auth | V1 status | Key note |
|---|---|---|---|---|---|
| Open-Meteo | Weather | Weather/forecast apps | None for free endpoint | CONDITIONAL | Free endpoint is non-commercial; commercial use requires a paid plan. |
| REST Countries | Countries | Country/flag/currency apps | API key | CONDITIONAL | Current service has a free quota; review provider terms before scale. |
| Frankfurter | Currency | FX/converter apps | None | APPROVED* | No auth; free/open-source service; use provider terms and attribution where applicable. |
| Nominatim / OpenStreetMap | Geocoding | Maps/address search | None | CONDITIONAL | Must obey OSM/Nominatim usage policy; not a high-volume backend. |
| CoinGecko | Crypto | Crypto price apps | Key/plan varies | CONDITIONAL | Public API is useful but plan/rate/terms must be enforced by the gateway. |
| NASA APIs | Science | Space/science apps | Key | CONDITIONAL | Provider limits apply; use a server-side key. |
| Open Library | Books | Book discovery apps | None | CONDITIONAL | Explicitly not intended as a high-traffic commercial backend; cache and identify requests. |
| Gutendex | Books | Public-domain book apps | None | APPROVED* | Good for prototypes/public-domain catalogues; verify service terms before scale. |
| TVMaze | TV | TV/show discovery | None | CONDITIONAL | Useful read API; provider attribution/usage rules should be retained. |
| Jikan | Anime | Anime apps | None | CONDITIONAL | Third-party unofficial MyAnimeList data API; not suitable as a core dependency without review. |
| PokéAPI | Games | Game/education demos | None | CONDITIONAL | Great for prototypes; cache data and avoid making it a critical commercial dependency. |
| TheMealDB | Food | Recipe apps | Test key / paid for public app store use | CONDITIONAL | Public app-store release requires paid supporter access. |
| Open Food Facts | Food | Barcode/food apps | None | CONDITIONAL | Open data, but licensing/data-quality and API rate limits must be respected. |
| JSONPlaceholder | Testing | Mock data for generated apps | None | APPROVED* | Testing/demo only; never treat as production backend. |
| DummyJSON | Testing | Mock products/users/carts | None | APPROVED* | Testing/demo only; never treat as production backend. |
| Random User | Testing | User/profile mock data | None | APPROVED* | Testing/demo only. |
| Dog API | Demo/Media | Pet/demo apps | None | APPROVED* | Useful demo API; not a core production dependency. |
| URLhaus | Security | URL/security tools | API access | CONDITIONAL | Abuse/security data has usage requirements; isolate in backend and review terms. |
| Dictionary API | Education | Dictionary/learning apps | Varies | CONDITIONAL | Provider choice must be pinned to a specific API/terms before integration. |
| News API candidates | News | News apps | Varies | HOLD | Do not integrate a generic "News API" until a specific provider and commercial licence are selected. |

*APPROVED means technically suitable for the V1 Hub classification, not a blanket legal/commercial guarantee. Provider terms must be rechecked before a public production integration.
