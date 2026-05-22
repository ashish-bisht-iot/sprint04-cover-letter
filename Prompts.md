# Prompts.md — Sprint 04

This file documents the AI prompts I used during development as a pair-programmer. I used Claude/ChatGPT to understand concepts, debug issues, and get unstuck.

---

## 1. Understanding how to capture form state in React

I knew I needed a form but wasn't sure whether to use a single state object or separate useState for each field.

**My prompt:**
> "in react should i use one useState object for all form fields or separate useState for each field, whats the difference"

**What I learned:**
Using a single object with `useState({})` is cleaner for forms with multiple fields. I update it using the spread operator `...prev` so existing fields aren't overwritten. I then wrote the `handleChange` function myself using `e.target.name` to dynamically update whichever field changed.

---

## 2. Building the template string interpolation

I wanted to build a cover letter from the form values without any API. Wasn't sure how to cleanly inject multiple variables into a paragraph of text.

**My prompt:**
> "how do i use template literals in javascript to build a multi line string with variables injected into it"

**What I learned:**
Template literals use backticks and `${}` for variable injection. They also preserve line breaks naturally. I wrote the entire `generateTemplate()` function myself — including the skill list formatter that joins comma-separated skills with "and" before the last item.

---

## 3. Handling comma separated skills input into an array

The skills field takes a comma separated string like "React, Node.js, Python" and I needed to format it properly in the letter.

**My prompt:**
> "how do i split a comma separated string into an array and join it back with 'and' before the last item in javascript"

**What I learned:**
Use `.split(",")` then `.map()` to trim whitespace, then check the array length — if more than one item, use `.slice()` to join all but last with commas and append "and" + last item. I handled the edge case of a single skill with a ternary. Wrote the whole logic myself after understanding the pattern.

---

## 4. Copy to clipboard functionality

I wanted a button that copies the generated letter text to the clipboard without any library.

**My prompt:**
> "how do i copy text to clipboard in javascript without using any external library"

**What I learned:**
The browser has a built-in `navigator.clipboard.writeText()` API that returns a Promise. I used `.then()` to trigger a toast notification after copying succeeds. I built the toast UI myself — a fixed position div that animates in and out using a CSS class toggle.

---

## 5. Connecting to the Groq API

I had never called an external AI API before. I needed to understand what the request body should look like.

**My prompt:**
> "how do i call the groq api from javascript using fetch, what does the request body structure look like for a chat completion"

**What I learned:**
Groq uses the same format as OpenAI — a `messages` array with `role` and `content`. I set `role: "user"` and passed my prompt as `content`. I then wrote the full `generateAI()` function myself, including injecting all form state variables into the prompt string before sending.

---

## 6. Prompt engineering — injecting form variables

I needed to figure out how to structure the prompt so the AI generates a relevant, personalized letter and not a generic one.

**My prompt:**
> "how do i write a good prompt for an llm that generates consistent structured output, what makes a prompt effective"

**What I learned:**
Being specific about format — number of paragraphs, opening line, tone — gives much more consistent output. I engineered the prompt myself, listing each variable as a bullet point and giving explicit instructions like "Start with Dear Hiring Manager at [company]" and "No extra commentary". This made the output clean and predictable.

---

## 7. Showing a loading state during the API call

The Groq API takes 2-3 seconds to respond. I needed the UI to show something while waiting instead of just freezing.

**My prompt:**
> "how do i show a loading spinner in react while waiting for an async api call to finish"

**What I learned:**
Set a status state variable to "generating" before the fetch call, then update it to "done" or "error" after it resolves. I conditionally render different UI based on the status value. I designed and built the spinner and animated dots myself using CSS keyframes.

---

## 8. Environment variables in Vite

I needed to store my API key securely and not commit it to GitHub.

**My prompt:**
> "how do i use environment variables in a vite react project so my api key is not hardcoded in the source code"

**What I learned:**
Vite requires variables to start with `VITE_` to be accessible in the browser via `import.meta.env`. I created the `.env` file myself, added it to `.gitignore` before the first commit, and verified on GitHub that it was not visible. I also added the variable to Vercel via CLI for the live deployment.

---

## 9. Vercel CLI deployment

First time deploying with Vercel CLI — wasn't sure about the build settings for a Vite project.

**My prompt:**
> "how do i deploy a vite react app using vercel cli, what build command and output directory should i use"

**What I learned:**
Vercel auto-detects Vite and sets `vite build` as the build command and `dist` as the output directory automatically. I just ran `npx vercel` and answered the setup questions. I also learned to use `npx vercel env add` to securely add environment variables to the deployment without exposing them in the code.

---

## 10. API key not working on live deployment

My app worked locally but gave a 401 error on the live Vercel URL even though I had added the environment variable.

**My prompt:**
> "my vite app uses import.meta.env.VITE_API_KEY locally but after deploying to vercel the key is undefined and i get 401, what am i missing"

**What I learned:**
Vite embeds `VITE_` prefixed env variables at build time — not runtime. This means the variable must be present on Vercel before the build runs. I had added it after the first deployment. The fix was to add the variable properly via `npx vercel env add` and then force a fresh rebuild with `npx vercel --prod --force`. After that it worked correctly.

---

## 11. Git and .gitignore setup

First time setting up a repo from scratch and making sure sensitive files are excluded.

**My prompt:**
> "what should i put in my gitignore for a vite react project and how do i make sure my env file is never committed"

**What I learned:**
Add `.env` to `.gitignore` before running `git add .` for the first time — order matters. I confirmed after pushing by opening the repo on GitHub and manually checking that no `.env` file appeared in the file list. The `node_modules` and `dist` folders are also excluded to keep the repo clean.

---
