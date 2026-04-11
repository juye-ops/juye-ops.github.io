# juye-ops.github.io Convention
## 1. FSD Architecture
### 1-1. Directory structure
> - Following: https://feature-sliced.design/docs/guides/tech/with-nextjs
```bash
.
├── app   # App Router 
├── pages # EmptyDir
└── src   # FSD Layers
    ├── app
    ├── entities
    ├── features
    ├── pages
    ├── shared
    └── widgets
```

### 1-2. Slices & Segments
```bash
src
└── LAYER
    └── slice   # kebab-case
        ├── index.ts
        ├── model
        │   ├── slice-a.types.ts  # kebab-case
        │   ├── slice-b.types.ts  # kebab-case
        │   └── useSlice.ts       # camelCase
        └── ui
            ├── SliceA.tsx
            ├── SliceB.tsx
            └── SlicePage.tsx
```
- Slice: kebab-case
  - Ex) `home`, `about`, `portfolio`, `blog`
- Segment
  - `index.ts`로 export 관리
  - model
    - `*.types.ts`: kebab-case
    - Hooks: camelCase