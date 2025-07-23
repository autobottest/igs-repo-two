# devai-services

Modular monorepo for the DevAI backend systems. The repository is practically all Kotlin, using Gradle for the build system.

## Cloning this repo

It's a prerequisite to have `git lfs` as we have large files in the repo.

To install `git lfs`:

```shell
brew install git-lfs
git lfs install
```

If you run into "Hook already exists: pre-push" error, you can do the following:

```shell
git lfs update --force
./gradlew installPrePushHook
```

Then you need to do one extra step `git lfs pull` to download large objects.

```shell
git pull                                 # To pull the repo.
git lfs pull                             # To pull large objects such as `.zip` files.
ls -l gradle/wrapper/gradle-8.7-bin.zip  # To verify whether the `.zip` file is downloaded correctly. The size should be ~130MB.
./install-git-hooks.sh                   # Install git hooks for automatic ticket ID inclusion in commit messages.
```

## Helpful Links

- **[Getting Started](./docs/getting_started.md)** - For getting started to work with this repo.
- **[Autodev documentation](https://hello.atlassian.net/wiki/x/uIwUuw)** - For onboarding info and setup.
- **[#devai-eng](https://atlassian.enterprise.slack.com/archives/C072UH43MA5)** - Slack for general eng updates
- **[#devai-ops](https://atlassian.enterprise.slack.com/archives/C06V9GGE27L)** - Slack for updates on repo operations

## Repository Structure

- `applications` - runnable applications, such as services and potentially CLIs
- `modules` - modularized application logic
- `libraries` - published libraries for external use
- `buildSrc` - shared build configurations
- `docs` - project documentation
- `scripts` - utilities built with non-Kotlin code

## Tools

The following are the tools and utilities used for the repository:

- **Atlas CLI** - various Atlassian command-line utilities, including micros, asap, slauth,
  poco, nebulae and more.
- **[Gradle](https://gradle.org/)** - The build tool.
- **[ktlint](https://pinterest.github.io/ktlint/latest/)** - Code linting and formatting tool. In your IDE, configure ktlint to run on file saves.
- **[Git Hooks](.githooks/README.md)** - Helpful git hooks to automate common tasks like adding ticket IDs to commit messages.

## Using Gradle

Gradle is the build tool for this repository. You can run gradle tasks against any
`module` or `application`. To run gradle in the repository, only use:

```shell
$ ./gradlew
```

**DO NOT USE** a gradle pre-installed in your environment, as it may not match the
version of gradle we use for the repository.

The project provides many tasks for building and managing projects. For example,
to compile a Kotlin project, the task is `compileKotlin`. It is not enough to simply
run `compileKotlin` in the repository, instead you need to specify the module or
application the task should be run against. To reference a subproject (module or
application), you should specify the path to the subproject, with `/` replaced with
`:`. eg `:applications:devai-core` or `:modules:shared`. To run `compileKotlin` on
`:modules:shared`, then run:

```shell
$ ./gradlew :modules:shared:compileKotlin
```

### Gradle Tasks

**Development**

- `lintKotlin` - runs linting checks
- `formatKotlin` - formats code not passing linting checks.

**Build**

- `compileKotlin` - compile the code.
- `prepareResources` - process resources files, specifically the configurations.
- `bootJar` - builds a bootable jar, which is in the docker image.
- `bootRun` - run the bootJar, outside of docker and nebulae

**Docker**

- `dockerBuild` - build and tag the docker image
- `dockerPush` - push the docker image to the repository

**Micros**

- `microsLogin` - login to Micros, dependency for various tasks

**Nebulae**

- `nebulaeStart`
- `nebulaeSandboxGenerate`
- `nebulaeSandboxStart`
- `nebulaeErsSeeding`
- `nebulaeSandboxStop`
- `nebulaeRun`
- `nebulaeStop`

**Run**

- `bootRun` - run the application outside of nebulae

## Git Hooks

This repository includes git hooks to help with development workflows. To install them, run:

```shell
./install-git-hooks.sh
```

This script will copy hooks from the `.githooks` directory to your local `.git/hooks` directory, asking for confirmation before overwriting any existing hooks.

Available hooks:
- `prepare-commit-msg` - Automatically prepends the ticket ID from your branch name to commit messages (e.g., "[ABC-123] " from a branch named "feature/ABC-123-description")

See [.githooks/README.md](.githooks/README.md) for more information.
