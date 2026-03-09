# Digital Employees — MiniClaw Commercial Product

Deploy a digital PhD employee who learns your business in weeks.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Hero + onboarding landing
│   ├── globals.css         # Tailwind + base styles
│   ├── onboard/            # Onboarding flow (7 steps)
│   ├── api/                # Backend API routes
│   │   ├── auth/           # Auth0 integration
│   │   └── slack/          # Slack OAuth
│   └── dashboard/          # Post-onboarding monitoring
```

## Development

```bash
npm install
npm run dev  # http://localhost:3000
```

## Deployment

Auto-deploys to Vercel on push to main branch.

```bash
git push origin main
```

## Specs

- **Website Wireframes**: [crd_82451168 notes](../../../workspace/crd_82451168)
- **Onboarding UI**: 7-step flow (account setup → digital employee creation → knowledge base → integrations → voice training → deploy → success)
- **Video Demo**: 2:00 hero video (chaos → solution → learning curve)

## Status

- ✓ Domain registered: digitalemployees.io
- ✓ Next.js scaffold + Tailwind setup
- [ ] Vercel deployment configured
- [ ] Onboarding flow implemented
- [ ] Slack OAuth integration
- [ ] Backend API (Auth0, knowledge base ingestion)

---

## Part of the AugmentedMike Ecosystem

| | |
|---|---|
| 🦞 **MiniClaw** | [miniclaw.bot](https://miniclaw.bot) — The technology behind AM and a popular OpenClaw plugin ecosystem |
| 👋 **Amelia** | [helloam.bot](https://helloam.bot) — Your personal AI companion |
| 👨‍💻 **Michael ONeal** | [augmentedmike.com](https://augmentedmike.com) — The engineer behind it all |
| 📖 **AM Blog** | [blog.augmentedmike.com](https://blog.augmentedmike.com) — Comic strip dev log |
| 💻 **GitHub** | [github.com/augmentedmike](https://github.com/augmentedmike) |
