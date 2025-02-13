# JobApplyBot 🤖

**JobApplyBot** is an automation tool currently in development designed to simplify and optimize the process of searching and applying for job postings on online platforms like LinkedIn. Using **PuppeteerJS**, this bot automates the process of searching for job openings, filtering them based on custom parameters (such as location, job type, keywords, etc.), and applying to those that meet the established criteria. The goal is to save users time and effort, allowing them to focus on preparing for interviews and improving their skills. Currently, the bot is in the development phase, with future plans to support multiple job platforms.

# Key Features 🚀

- **Google Chrome Connection**: Connects to the Google Chrome instance installed on the device, using the default path or a custom path specified in the `.env` file.
- **LinkedIn Authentication**: Logs into LinkedIn using the credentials provided in the `.env` file.
- **Automated Navigation**: Autonomously navigates through LinkedIn's interface to access job postings.
- **Job Search**: Collects key information from LinkedIn's recommended job postings, including:
  - Job **ID**.
  - Job **title**.
  - Job **location**.
  - Application **type** (easy, complex, etc.).
  - **Status** (viewed or not viewed).
- **Location Filtering**: Filters job postings based on location parameters (currently, this feature does not use the `.env` file).

# Core Dependencies

- **[Node.js](https://nodejs.org/)** (v23.3.0 or higher).
- **[TypeScript](https://www.typescriptlang.org/)** (v5.7.3 or higher).
- **[pnpm](https://pnpm.io/)** (package manager).

# Project Dependencies

The project dependencies will be installed automatically when running `pnpm install`. These include:

- **puppeteer-core** (v24.1.1): For browser automation.
- **dotenv** (v16.4.7): For managing environment variables.
- **ts-node** (v10.9.2): For running TypeScript directly.
- **tsconfig-paths** (v4.2.0): For handling custom paths in TypeScript.
- **@types/node** (v22.12.0): Type definitions for Node.js.

---

# Getting Started

To get started with JobApplyBot, clone the repository and follow the installation instructions in the documentation.

# Installation ⚙️

1. Clone the repository:

```bash
git clone https://github.com/ernest0dev/JobApplyBot.git
cd JobApplyBot
pnpm install
```

5. Create a `.env` file in the root of the project and add the following variables with your personal:

```bash
touch .env
nano .env
```

7. data:
   - **BROWSER_PATH**="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
   - **USER_DATA**="C:\\Users\\[`Your user`]\\AppData\\Local\\Google\\Chrome\\User Data\\Default"
   - **USER**="Your email"
   - **PASSWORD**="Your password"
   - **NAME**="Your name"
8. Run the bot:

```bash
pnpm run test
```

# Contributing 🤝

Contributions are welcome and appreciated! If you'd like to improve **JobApplyBot**, follow these steps:

1. **Fork the repository** and clone it to your local environment:

```bash
git clone https://github.com/ernest0dev/JobApplyBot.git
cd JobApplyBot
pnpm install
```

2. **Create a branch** for your feature or fix:

```bash
git checkout -b your-feature-name
```

3. **Make your changes** and ensure you follow best coding practices:

- Write clean and well-documented code.
- Add tests if necessary.
- Update the documentation if you introduce new features.

4. **Commit your changes** with a descriptive message:

```bash
git commit -m "Add new feature: [brief description]"
```

5. Push to the branch in your forked repository:

```bash
git push origin your-feature-name
```

6. **Open a Pull Request (PR)** in the original repository:

- Describe the changes you've made.
- Explain the purpose of your contribution.
- Ensure your code passes all tests and adheres to the project's standards.

# Contribution Guidelines

- Report issues: If you find a bug or have a suggestion, open an issue on GitHub.
- Keep your code clean: Follow existing code conventions and ensure your contribution is easy to understand.
- Document your changes: If you add new features, update the relevant documentation.

I appreciate your help in making **JobApplyBot** better!

# License

This project is licensed under the MIT License - see the LICENSE file for details.
