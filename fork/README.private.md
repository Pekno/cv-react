# CV React — Private Data

This repository contains personal data for [cv-react](https://github.com/Pekno/cv-react).

Pushes to `main` automatically build and push a Docker image to `ghcr.io/{{USERNAME}}/cv-react-private`.

See the [deployment guide](https://github.com/Pekno/cv-react/blob/main/DEPLOYMENT.md) for details.

## Keeping up to date

To pull in new features or fixes from the upstream repository:

```bash
# Add the upstream remote (only needed once)
git remote add upstream https://github.com/Pekno/cv-react.git

# Fetch upstream changes
git fetch upstream

# Merge into your branch
git merge upstream/main
```

Merge conflicts will most likely be in your customized files (`profile-data.ts`, translation files). Keep your personal data and accept the structural changes from upstream.

Once pushed, your hosting platform (Netlify/Vercel) will automatically redeploy.
