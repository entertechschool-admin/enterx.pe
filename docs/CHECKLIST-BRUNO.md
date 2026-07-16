# Checklist de onboarding — colaboración con Ariana

Pasos manuales que Claude **no puede** ejecutar por ti (permisos de GitHub/Vercel, o
acciones en la laptop de Ariana). Hazlos en orden.

## 1. GitHub — el candado real

Protege `main` para que nada llegue ahí sin tu revisión:

```bash
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  -f required_pull_request_reviews[required_approving_review_count]=1 \
  -f enforce_admins=true \
  -f restrictions=null \
  -f required_status_checks=null \
  -f allow_force_pushes=false \
  -f allow_deletions=false
```

O desde la web: **Settings → Branches → Add branch protection rule** sobre `main` →
marca "Require a pull request before merging" (con al menos 1 aprobación) y "Do not allow
force pushes".

Invita a Ariana como colaboradora con permiso de escritura (necesita poder hacer push a la
rama `ariana` y abrir PRs, pero no a `main` directamente):

```bash
gh api repos/{owner}/{repo}/collaborators/{ariana-github-username} \
  --method PUT -f permission=push
```

O desde la web: **Settings → Collaborators → Add people**.

## 2. Vercel

Confirma en el dashboard del proyecto (**Settings → Git**):
- **Production Branch** = `main`.
- **Preview Deployments** activos para todas las ramas (o al menos para `ariana`), para que
  cada PR que abra `/sync` genere una URL de vista previa.

## 3. Laptop de Ariana

```bash
# Claude Code
# (instalar según https://claude.com/claude-code — método vigente al momento de leer esto)

# gh CLI, con la cuenta de ELLA (no la tuya)
brew install gh
gh auth login

# Clonar el repo
git clone <url-del-repo>
cd enterx.pe
npm ci

# Activar su rol de colaboración no técnica
cp .claude/plantillas/CLAUDE.ariana.local.md CLAUDE.local.md

# Dependencias de la skill webapp-testing (QA de navegador)
pip install playwright && playwright install chromium
```

## 4. Primera sesión sugerida

1. Ariana abre Claude Code en el repo y escribe: **"explícame el sitio"**.
2. Le pide un cambio pequeño de práctica (p. ej. un ajuste de texto).
3. Cierra la sesión con: **"sincroniza"** — debe crear la rama `ariana`, guardar el cambio,
   enviártelo como propuesta y devolver un enlace de vista previa.

---

**Nota:** `.claude/skills/webapp-testing` requiere Python + Playwright instalados (paso 3
de este checklist) — Claude no puede instalar paquetes de sistema en la laptop de Ariana
por su cuenta.
