# Github Blog

## 1. Basic Information
- The site is automatically deployed using GitHub Actions.
- Blog posts are written in Markdown, which are then rendered as a web view.
- ! DO NOT EDIT OR INSTALL ANY NPM PACKAGES


### Folder Structure
├── src/
    ├── assets/
    ├── components/
    │   ├── common/
    │   ├── layout/
    │   └── ui/
    ├── pages/
    │   ├── Home/
    │   ├── Portfolio/
    │   └── Blog/
    │       └── posts/
    │           └── Index1(Kubernetes)/
    │               └── Subindex1(Ingress)/
    ├── features/
    ├── hooks/
    ├── routes/
    ├── types/
    ├── utils/
    ├── App.tsx
    └── main.tsx

## 2. Theme

### Home
- Background with a red tone.
- Center displays my photo styled like a record UI.
- Page navigation at the bottom with a rounded carousel for selecting sections (Portfolio, Blog, etc.).
- Designed to be very compact.

### Portfolio
- Starts with an introduction about me.
- Projects are organized by sections.
- On the right side, a Table of Contents (TOC) lists project names as section titles.
- Layout:
  - Sections containing sets of project images.
  - Each project includes a title and date.
  - Description.
  - A table with the following columns:
    - Main development details (presented as an unordered list).
    - Technology stack.
    - Open source projects.

### Blog
- UI Like notion, Select like a directory
- read posts/*.md

## 3. GitHub Information
- Github address: https://github.com/juye-ops/github-blog