# Deployment Guide for CV React

This guide explains how to deploy your own personalized version of the CV React application using GitHub Actions and Docker. This approach allows you to maintain your personal profile data separately from the main application code and automate the build process.

## Overview

The deployment process follows these steps:
1. Create a private GitHub repository to store your personal data
2. Set up the correct folder structure for your data
3. Configure GitHub Actions to build a Docker image
4. Deploy the container image to your hosting service

## 1. Create Your Personal Data Repository

First, create a new private repository on GitHub to store your personal profile data:

1. Log in to GitHub and click on "New repository"
2. Name it something like `cv-react-private`
3. Make sure the repository is set to **Private**
4. Initialize with a README file
5. Click "Create repository"

## 2. Set Up Your Folder Structure

Your repository needs to follow this specific folder structure:

```
cv-react-private/
├── .github/
│   └── workflows/
│       └── docker-build.yml    # GitHub Actions workflow file
├── data/
│   └── profile-data.ts         # Your profile data
├── locales/
│   ├── en.json                 # English translations
│   └── fr.json                 # French translations
├── assets/                     # Your images and other assets
│   ├── companies/              # Company logos and images
│   │   └── company-logo.png
│   ├── hobbies/                # Hobby-related images
│   │   └── hobby-image.jpg
│   ├── profiles/               # Personal profile photos
│   │   └── profile-photo.jpg
│   └── projects/               # Project images
│       └── project-image.png
└── public/                     # Additional public files
    └── pdf/                    # PDF documents (resumes, certificates, etc.)
        └── resume.pdf
```

### Required Files

1. **Profile Data (`data/profile-data.ts`)**:
   - Contains your profile information (experience, education, skills, etc.)

2. **Translations (`locales/en.json`, `locales/fr.json`)**:
   - Language-specific text for your profile
   - At minimum, include English (`en.json`) and French (`fr.json`) translations

3. **Assets (`assets/` folder)**:
   - Organized in subfolders by type (companies, hobbies, profiles, projects)
   - Images referenced in your profile data

4. **Public Files (`public/` folder)**:
   - Additional files like PDFs that need to be accessible

## 3. Add GitHub Actions Workflow

Create the `.github/workflows/docker-build.yml` file with the following content:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]  # Automatically trigger on pushes to main branch
  workflow_dispatch:  # Also allows manual triggering from GitHub UI

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    
    steps:
      # Step 1: Check out your private repository
      - name: Checkout private repository
        uses: actions/checkout@v4
        with:
          path: private
      
      # Step 2: Check out the main CV React repository
      - name: Checkout main repository
        uses: actions/checkout@v4
        with:
          repository: Pekno/cv-react  # The main repository
          path: main
      
      # Step 3: Copy your personal profile data and translations
      - name: Copy profile data and translations
        run: |
          cp -r private/data/profile-data.ts main/src/data/
          
          cp -r private/locales/* main/src/i18n/locales/
          
          if [ -d "private/assets" ]; then
            cp -r private/assets/* main/src/assets/
          fi

          if [ -d "private/public" ]; then
            cp -r private/public/* main/public/
          fi
          
          echo "Copied profile data and translations successfully"
      
      # Step 4: Convert repository owner to lowercase
      - id: lowercase-owner
        name: Repository owner to lowercase
        run: |
          echo "owner=${GITHUB_REPOSITORY_OWNER@L}" >> $GITHUB_OUTPUT
      
      # Step 5: Set up Docker Buildx
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      # Step 6: Log in to GitHub Container Registry
      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      # Step 7: Build the Docker image and push it to GitHub Container Registry
      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: ./main
          push: true
          tags: |
            ghcr.io/${{ steps.lowercase-owner.outputs.owner }}/cv-react-private:latest
            ghcr.io/${{ steps.lowercase-owner.outputs.owner }}/cv-react-private:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

This workflow will:
- Check out both your private repository and the main CV React repository
- Copy your personal data, translations, and assets into the main repository
- Build a Docker image and push it to GitHub Container Registry

## 4. Deploy the Container

Once your GitHub Actions workflow has successfully built and pushed your Docker image, you can deploy it using any container platform that supports Docker.

You can use the container image with a simple docker-compose.yml file:

```yaml
version: '3.8'

services:
  app:
    image: ghcr.io/yourusername/cv-react-private:latest
    container_name: cv-react
    ports:
      - "80:80"
    restart: unless-stopped
```

Replace `yourusername` with your GitHub username (in lowercase).

This image can be deployed on any platform that supports Docker containers including Docker standalone, TrueNAS SCALE with Dockge, Kubernetes, Docker Swarm, or cloud container services.

## 5. Keeping Your Fork Updated

To keep your deployment up-to-date with changes from the main repository, you don't need to do anything special. Each time you push changes to your private repository, the GitHub Actions workflow will automatically check out the latest version of the main repository.

If you want to trigger a new build manually, you can use the "Run workflow" button in the Actions tab of your GitHub repository.

## Customizing Your Data

For details on how to structure your profile data and translations, please refer to the README.md file in the main repository. It contains comprehensive documentation on the data model and internationalization setup.

## Troubleshooting

### Image Not Building

1. Check the GitHub Actions logs for any errors
2. Verify that your folder structure matches the expected structure
3. Make sure your profile-data.ts file is valid TypeScript

### Container Not Starting

1. Check that your image was successfully pushed to GitHub Container Registry
2. Verify that your server has access to pull from GitHub Container Registry
3. Check the container logs for any runtime errors

## Security Considerations

1. Keep your repository private to protect personal information
2. Consider using GitHub's security features like Dependabot
3. Regularly update the main repository to get security fixes

## Conclusion

Following this guide allows you to maintain your personal data separately from the application code while still benefiting from updates to the main CV React project. The automated GitHub Actions workflow makes deploying updates as simple as pushing changes to your private repository.