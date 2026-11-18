# Agents

This repo is a sandbox for testing agent workflows, such as orchestrating several PRs from one coordinator thread.

- PR titles start with `[sandbox]`.
- Before pushing, run `pnpm lint` and `pnpm build`.
- CI's `check` job is the required check. It sleeps for two minutes after building, to stand in for a slower test suite.
- CI's `review-bot` job comments once on each new PR as `github-actions[bot]`, standing in for an automated review bot. Treat its comment as a bot review finding.
