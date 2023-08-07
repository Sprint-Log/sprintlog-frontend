# Sprintlog: "Streamline, Collaborate, and Automate Your Team's Success, In Realtime!"

## **Project Description:**

Sprintlog is also a highly adaptable and pluggable self-hosted solution designed to optimize your team's productivity and streamline agile project management.

## **Highlights**

- Task Management: Create, assign, and track tasks easily.
- Automated Channel Creation: Automatically creates channels for projects.
- Visibility: Monitor progress, view project timelines, and access analytics.
- Scaffold Template Generation: Automatically generate project repos and boilerplate code on creation of projects, integrated with gitea.
- Real-time updates on progress, tasks, deadlines, and notifications.
- Project Structure Generation: Automatically create directories, files, and organizational components.
- Integration with Third-Party Systems: Seamlessly integrate with popular chat systems.
- Chat Notificaiton Integartion: Receive task-related notifications and update task statuses from the chat interface. Chatroom creation based on project names and organization
- Git branch and commits integration
- Markdown and emoji support
- AI-based backlog and project specs generation
- Sprint planning
- 100% Self-hostable , including LLMs
- Analytics and reporting
- Pluggable architecture for custom plugins

Language :

- Python , Typescript ,Svelte,Tailwind

Framework

- Litestar (2.0) , Sqlalchemy , Sveltekit, TanStackQuery

Repo:

- <https://git.hexcode.tech/hexcode-core/sprintlog-backend>
- <https://git.hexcode.tech/hexcode-core/sprintlog-frontend>

## Preliminary requirements tutorials for development contribution

Backend:

- <https://docs.litestar.dev/dev/tutorials/todo-app/index.html>
- <https://docs.litestar.dev/dev/usage/dto.html>
- <https://docs.litestar.dev/dev/tutorials/dto-tutorial/index.html>
- <https://docs.litestar.dev/dev/usage/websockets.html>
- <https://docs.litestar.dev/dev/usage/plugins/sqlalchemy.html>

Frontend

- <https://www.skeleton.dev/elements/chat>
- <https://tanstack.com/query/latest/docs/svelte/examples/svelte/auto-refetching>
- <https://flowbite.com/#components>

## create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
