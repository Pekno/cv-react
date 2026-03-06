#!/usr/bin/env bash
set -uo pipefail

# CV React — Private Repository Setup (Unix/macOS)
# Download and run: curl -fsSL https://raw.githubusercontent.com/Pekno/cv-react/main/scripts/setup.sh | bash
# Or: chmod +x setup.sh && ./setup.sh

REPO_RAW="https://raw.githubusercontent.com/Pekno/cv-react/main"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

print_header() {
  echo ""
  echo -e "  ${BOLD}CV React — Private Repository Setup${RESET}"
  echo ""
}

ask() {
  local prompt="$1"
  local default="${2:-}"
  local result
  if [ -n "$default" ]; then
    read -rp "$(echo -e "${CYAN}?${RESET} ${prompt} ${DIM}(${default})${RESET} ")" result
  else
    read -rp "$(echo -e "${CYAN}?${RESET} ${prompt} ")" result
  fi
  echo "${result:-$default}"
}

ask_yes_no() {
  local prompt="$1"
  local default="${2:-y}"
  local hint
  if [ "$default" = "y" ]; then hint="Y/n"; else hint="y/N"; fi
  local result
  read -rp "$(echo -e "${CYAN}?${RESET} ${prompt} ${DIM}(${hint})${RESET} ")" result
  result="${result:-$default}"
  case "${result,,}" in
    y|yes) return 0 ;;
    *) return 1 ;;
  esac
}

ask_menu() {
  local prompt="$1"
  shift
  local options=("$@")
  echo ""
  echo -e "${CYAN}?${RESET} ${prompt}"
  echo ""
  for i in "${!options[@]}"; do
    echo -e "  ${BOLD}$((i + 1)).${RESET} ${options[$i]}"
  done
  echo ""
  while true; do
    local choice
    read -rp "$(echo -e "${CYAN}>${RESET} Enter your choice ${DIM}(1-${#options[@]})${RESET}: ")" choice
    if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le "${#options[@]}" ]; then
      return "$((choice - 1))"
    fi
    echo -e "${RED}  Invalid choice. Please try again.${RESET}"
  done
}

download_file() {
  local url="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  if command -v curl &>/dev/null; then
    curl -fsSL "$url" -o "$dest" 2>/dev/null
  elif command -v wget &>/dev/null; then
    wget -q "$url" -O "$dest" 2>/dev/null
  else
    echo -e "${RED}  Error: curl or wget is required to download files.${RESET}"
    return 1
  fi
}

create_dir() {
  local base="$1"
  local dir="$2"
  mkdir -p "${base}/${dir}"
  echo -e "  ${GREEN}+${RESET} ${dir}/"
}

write_file() {
  local path="$1"
  local content="$2"
  mkdir -p "$(dirname "$path")"
  echo "$content" > "$path"
  local rel="${path#*/}"
  echo -e "  ${GREEN}+${RESET} ${rel}"
}

generate_workflow() {
  cat << 'WORKFLOW_EOF'
name: Build and Push Docker Image

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      cv_react_version:
        description: 'cv-react version tag (e.g. v1.0.0). Leave empty to use the latest tag.'
        required: false
        default: ''

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout private repository
        uses: actions/checkout@v4
        with:
          path: private

      - name: Resolve cv-react version
        id: resolve-version
        run: |
          if [ -n "${{ github.event.inputs.cv_react_version }}" ]; then
            echo "ref=${{ github.event.inputs.cv_react_version }}" >> $GITHUB_OUTPUT
          else
            LATEST_TAG=$(git ls-remote --tags --sort=-v:refname https://github.com/Pekno/cv-react.git | head -n1 | sed 's/.*refs\/tags\///')
            echo "ref=${LATEST_TAG}" >> $GITHUB_OUTPUT
          fi
          echo "Using cv-react version: $(cat $GITHUB_OUTPUT | grep ref= | cut -d= -f2)"

      - name: Checkout main repository
        uses: actions/checkout@v4
        with:
          repository: Pekno/cv-react
          ref: ${{ steps.resolve-version.outputs.ref }}
          path: main

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

      - id: lowercase-owner
        name: Repository owner to lowercase
        run: |
          echo "owner=${GITHUB_REPOSITORY_OWNER@L}" >> $GITHUB_OUTPUT

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

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
WORKFLOW_EOF
}

generate_readme() {
  local username="$1"
  cat << EOF
# CV React — Private Data

This repository contains personal data for [cv-react](https://github.com/Pekno/cv-react).

Pushes to \`main\` automatically build and push a Docker image to \`ghcr.io/${username,,}/cv-react-private\`.

See the [deployment guide](https://github.com/Pekno/cv-react/blob/main/DEPLOYMENT.md) for details.
EOF
}

setup_private_repo() {
  print_header

  local target_dir
  target_dir="$(ask "Target directory for your private repo:" "./cv-react-private")"
  target_dir="$(realpath -m "$target_dir")"

  if [ -d "$target_dir" ]; then
    if ! ask_yes_no "${YELLOW}Directory already exists.${RESET} Continue and merge into it?"; then
      echo -e "\n${DIM}  Aborted.${RESET}\n"
      return
    fi
  fi

  local github_username
  github_username="$(ask "Your GitHub username:")"
  if [ -z "$github_username" ]; then
    echo -e "\n${RED}  GitHub username is required. Aborting.${RESET}\n"
    return
  fi

  local include_examples=false
  if ask_yes_no "Include example data files as starting point?"; then
    include_examples=true
  fi

  # Confirm
  echo ""
  echo -e "  ${BOLD}Summary:${RESET}"
  echo -e "  ${DIM}Directory:${RESET}      ${target_dir}"
  echo -e "  ${DIM}GitHub user:${RESET}    ${github_username}"
  echo -e "  ${DIM}Example files:${RESET}  $( [ "$include_examples" = true ] && echo "Yes" || echo "No" )"

  if ! ask_yes_no "Proceed?"; then
    echo -e "\n${DIM}  Aborted.${RESET}\n"
    return
  fi

  echo ""
  echo -e "  ${BOLD}Creating folder structure...${RESET}"
  echo ""

  local dirs=("data" "locales" "assets/companies" "assets/hobbies" "assets/profiles" "assets/projects" "public/pdf" ".github/workflows")
  for dir in "${dirs[@]}"; do
    create_dir "$target_dir" "$dir"
  done

  echo ""

  # Workflow
  generate_workflow > "${target_dir}/.github/workflows/docker-build.yml"
  echo -e "  ${GREEN}+${RESET} .github/workflows/docker-build.yml"

  # .gitignore
  printf "node_modules/\n.DS_Store\nThumbs.db\n" > "${target_dir}/.gitignore"
  echo -e "  ${GREEN}+${RESET} .gitignore"

  # README
  generate_readme "$github_username" > "${target_dir}/README.md"
  echo -e "  ${GREEN}+${RESET} README.md"

  # Example files
  if [ "$include_examples" = true ]; then
    echo ""
    echo -e "  ${BOLD}Downloading example files...${RESET}"
    echo ""

    local -A examples=(
      ["data/profile-data.ts"]="src/data/profile-data.example.ts"
      ["locales/en.ts"]="src/i18n/locales/en.example.ts"
      ["locales/fr.ts"]="src/i18n/locales/fr.example.ts"
    )

    for dest in "${!examples[@]}"; do
      local src="${examples[$dest]}"
      if download_file "${REPO_RAW}/${src}" "${target_dir}/${dest}"; then
        echo -e "  ${GREEN}+${RESET} ${dest} ${DIM}(from example)${RESET}"
      else
        echo -e "  ${YELLOW}!${RESET} ${dest} ${DIM}(download failed, skipped)${RESET}"
      fi
    done
  fi

  echo ""
  echo -e "  ${BOLD}${GREEN}Done!${RESET} Your private repo is ready at:"
  echo -e "  ${CYAN}${target_dir}${RESET}"
  echo ""
  echo -e "  ${BOLD}Next steps:${RESET}"
  echo -e "  1. cd ${target_dir}"
  echo -e "  2. Edit ${CYAN}data/profile-data.ts${RESET} with your information"
  echo -e "  3. Edit ${CYAN}locales/en.ts${RESET} and ${CYAN}locales/fr.ts${RESET} with your translations"
  echo -e "  4. Add your images to the ${CYAN}assets/${RESET} subfolders"
  echo -e "  5. git init && git remote add origin <your-private-repo-url>"
  echo -e "  6. git add . && git commit -m \"Initial setup\" && git push"
  echo ""
}

show_help() {
  echo ""
  echo -e "  ${BOLD}CV React — Docker Deployment Help${RESET}"
  echo ""
  echo "  This script helps you create a private repository that stores"
  echo "  your personal data separately from the main cv-react codebase."
  echo ""
  echo -e "  ${BOLD}How it works:${RESET}"
  echo "  1. Your private repo holds your profile data, translations, and assets"
  echo "  2. A GitHub Actions workflow merges your data with cv-react at build time"
  echo "  3. The result is pushed as a Docker image to GitHub Container Registry"
  echo "  4. You pull and run the image on your server"
  echo ""
  echo -e "  ${BOLD}Version pinning:${RESET}"
  echo "  By default, the workflow uses the latest git tag from Pekno/cv-react."
  echo "  To pin a specific version, trigger the workflow manually and provide"
  echo "  a tag (e.g. v1.0.0) in the cv_react_version input."
  echo ""
  echo "  For full documentation, see DEPLOYMENT.md in the cv-react repository."
  echo ""
}

# Main
main() {
  ask_menu "What would you like to do?" \
    "Setup a new private repository" \
    "Help / How does this work?" \
    "Exit"
  local choice=$?

  case $choice in
    0) setup_private_repo ;;
    1) show_help ;;
    2) ;;
  esac
}

main
