# Voces

Spanish - French dictionary

## Deploy to GitHub Pages

```
npm run build-gh

git add site/browser

git commit -m "ci: deploy site"

git push origin `git subtree split --prefix site/browser`:gh-pages --force

git reset --hard origin/main && git clean site -f
```
