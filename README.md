# Umang Donga — Portfolio (Node.js)

Node.js + Express + EJS rebuild of https://dongaumang.framer.website/

## Run

```bash
npm install
npm start        # http://localhost:3000
npm run dev      # auto-restart on file changes
```

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero, process, creative services, selected work, contact |
| `/about` | About: approach, principles, tools |
| `/projects` | All projects |
| `/contact` | Contact form |
| `/campus`, `/book`, `/indu-cafe`, `/ux-laws`, `/careband`, `/renue` | Case studies |

## Editing content

- **Site text, process, principles, tools, links:** `data/site.js`
- **Case studies:** `data/projects.js`. Each project is a list of `sections`
  (`text`, `insights`, `figure`, `beforeAfter`, `steps`, `ideas`, `cards`, `identity`, `law`, `scorecard`).
  Add a new object to the array to add a project; its page will be at `/<slug>`.
- **Styles:** `public/css/style.css`
- **Images:** `public/images` (case-study visuals are in `public/images/case`)

## Contact form

`POST /api/contact` validates the input and appends each message to `data/messages.json`
(this file is git-ignored). To get emails instead, swap the file write in `server.js`
for an email service such as Nodemailer or Resend.
