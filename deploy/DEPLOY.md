# Landing — self-host on the server (Vercel → Ahost)

The landing is a Next.js SSR app. It's containerised (standalone output) and
fronted by the host Nginx, exactly like the admin stack. Do the steps **in
order** — DNS is last, so the live site never breaks.

## 1. First deploy (server, one-time)

```bash
# clone next to the admin project
sudo git clone https://github.com/prohomeuz/chizlab.git /opt/chizlab-landing
cd /opt/chizlab-landing

# production env
cp .env.example .env
#   NEXT_PUBLIC_API_URL=https://api.chizlab.uz
#   NEXT_PUBLIC_SITE_ORIGIN=https://chizlab.uz

# build + run (container listens on 127.0.0.1:3006)
docker compose up -d --build
```

Verify the container serves the site **before touching DNS**:

```bash
curl -I http://127.0.0.1:3006          # -> HTTP/1.1 200 OK
```

## 2. Host Nginx

Install the server block and issue TLS:

```bash
sudo cp /opt/chizlab-landing/deploy/chizlab.uz.nginx.conf \
        /etc/nginx/sites-available/chizlab.uz
sudo ln -s /etc/nginx/sites-available/chizlab.uz /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d chizlab.uz -d www.chizlab.uz
```

## 3. CI/CD (GitHub Actions)

The workflow `.github/workflows/deploy.yml` redeploys on every push to `main`
(SSH → `git reset --hard origin/main` → `docker compose up -d --build`).

Add these repo **Secrets** (Settings → Secrets and variables → Actions):

| Secret | Value |
|---|---|
| `SSH_HOST` | server IP (`161.97.171.168`) |
| `SSH_USER` | ssh user (e.g. `root` or a deploy user) |
| `SSH_KEY`  | a private SSH key whose public key is in the server's `authorized_keys` |
| `SSH_PORT` | `22` (or your custom port) |

## 4. DNS — LAST STEP (in the account that manages chizlab.uz)

Only after step 1's `curl` returns **200** and Nginx/TLS are up:

- `chizlab.uz` **A** → `161.97.171.168` (replace **both** Vercel A records:
  `76.76.21.21` and `216.198.79.1`)
- `www` CNAME → `chizlab.uz` (already present)
- The `_vercel` A/TXT records can be removed afterwards.
- `api`, `admin`, `media`, `mail`, `MX`, SPF/DKIM/DMARC — **leave unchanged**.

Propagation check:

```bash
dig +short chizlab.uz          # -> 161.97.171.168
curl -I https://chizlab.uz     # -> 200, served from the server
```

## Notes
- `chizlab-meta.jpg` (social share image) ships in `public/` and is served by the
  container — works as soon as it's deployed.
- Changing `NEXT_PUBLIC_*` requires a rebuild (they're baked into the client
  bundle) — the CI/CD `--build` handles it.
- Ports: landing `3006`, api `8005`, admin `3005`, MinIO `9100` — no clash.
