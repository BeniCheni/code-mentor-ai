<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/a25d7f27-4fa3-4578-a5ad-0d0700b18a21" />
<br />
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/a7dd51bc-d73e-4ddd-9e32-04d482292f55" />
</div>

# Try Code Mentor AI
https://code-mentor-ai-a9dec.web.app/

# Run Locally

1. Install dependencies: `npm i`
2. Set the `VITE_API_KEY` in [.env](.env) to your Gemini API key
3. Run the app: `npm run dev`

# Testing

To run the tests, use one of the following commands:

### `npm t` (or `npm test`)

*   **Command:** Runs `vitest` in your terminal.
*   **Interface:** Command-Line Interface (CLI).
*   **Behavior:** It executes all the tests and prints a summary of the results directly into your terminal window. Once the tests are complete, the process exits.
*   **Use Case:** This is ideal for quick checks to see if everything passes or for automated environments like CI/CD pipelines (e.g., GitHub Actions), where you just need a pass/fail status.

### `npm run test:ui`

*   **Command:** Runs `vitest --ui`.
*   **Interface:** Graphical User Interface (GUI) in your browser.
*   **Behavior:** It starts a local web server and opens a new tab in your browser with an interactive dashboard. From this UI, you can:
    *   See a visual breakdown of your test suites and individual tests.
    *   Filter tests to run only specific ones.
    *   See code coverage reports visually.
    *   Click to re-run specific tests.
    *   Inspect test output and errors in a more readable format.
*   **Use Case:** This is incredibly useful during development and debugging. It gives you a much richer and more interactive experience for working with your tests.

### `npm run test:coverage`

*   **Command:** Runs `vitest run --coverage`.
*   **Behavior:** This command runs all tests and generates a code coverage report. The results are displayed in the terminal, and a detailed HTML report is saved to the `coverage/` directory.
*   **To view the HTML report:** Open the `coverage/index.html` file in your web browser.

**In short:**

| Command           | Interface | Best For                              |
| ----------------- | --------- | ------------------------------------- |
| `npm t`           | Terminal  | Quick checks and CI/CD automation     |
| `npm run test:ui` | Browser   | Interactive development and debugging |
| `npm run test:coverage` | Terminal & HTML | Generating and viewing coverage reports |
