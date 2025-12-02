# ----------------------------------------------------------------------
# STAGE 1: Build Angular Application
# Uses a Node image with pnpm support to install dependencies and build.
# ----------------------------------------------------------------------
FROM node:24-alpine AS build

# Set environment variables for pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install pnpm globally
RUN npm install -g pnpm@latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package files first to leverage Docker's build cache
# This layer is only invalidated if package.json or pnpm-lock.yaml changes.
COPY package.json pnpm-lock.yaml ./

# Install dependencies
# Using "ci" ensures a clean install based on the lock file.
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Angular application
# The output path will be dist/voces/browser
# This command runs your standard SSG build.
RUN pnpm run build

# ----------------------------------------------------------------------
# STAGE 2: Production/Runtime Image (Nginx Server)
# Uses a minimal Nginx image to serve the static built files.
# ----------------------------------------------------------------------
FROM nginx:alpine AS production

# Remove the default Nginx index.html and configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy the built output from the 'build' stage
# The 'browser' folder contains all the static assets and pre-rendered routes.
# The files are copied directly to the Nginx serving root.
COPY --from=build /app/dist/voces/browser /usr/share/nginx/html

# The standard Nginx configuration file is sufficient for pre-rendered
# SSG applications where all routes exist as static files (e.g., index.html, /route/index.html).
# No special catch-all fallback (try_files $uri $uri/ /index.html) is typically needed.

# Expose the port Nginx listens on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]