<div style="text-align:center;">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/a25d7f27-4fa3-4578-a5ad-0d0700b18a21" />
<br />
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/a7dd51bc-d73e-4ddd-9e32-04d482292f55" />
</div>

# Try Code Mentor AI

https://code-mentor-ai-a9dec.web.app/

Personal AI Code Mentor for mastering DSA, System Design, and articulating your experience and technical decisions.

# Run Locally

1. Install dependencies: `npm i`
2. Set the `VITE_API_KEY` in [.env](.env) to your Gemini API key
3. Run the app: `npm run dev`

# Testing

This project uses [Vitest](https://vitest.dev/) for unit testing. The following scripts are available to run tests and
view coverage:

| Command                 | Description                                                                                               |
|-------------------------|-----------------------------------------------------------------------------------------------------------|
| `npm test` (or `npm t`) | Runs all tests in the terminal. Ideal for quick checks and CI/CD pipelines.                               |
| `npm run test:ui`       | Starts Vitest in UI mode, opening an interactive dashboard in your browser for development and debugging. |
| `npm run test:coverage` | Generates a code coverage report. Open `coverage/index.html` to view the detailed HTML report.            |
