import type { SprintlogPagination, ActiveProject } from '$lib/types/sprintlog';
import { StatusEnum } from '$lib/types/sprintlog';

export function getActiveProjects(data: SprintlogPagination): { projects: ActiveProject[] } {
  const projectMap = new Map<string, ActiveProject>();


  for (const sprintlog of data.items) {
    const projectSlug = sprintlog.project_slug;

    if (!projectMap.has(projectSlug)) {
      projectMap.set(projectSlug, {
        project_name: projectSlug,
        task_assigned: 0,
        completed_task: 0,
        remaining_task: 0,
        task_due: 0,
      });
    }

    // Incrementing counts based on the sprintlog's status
    const project = projectMap.get(projectSlug)!;

    switch (sprintlog.status) {
      case StatusEnum.new:
      case StatusEnum.started:
      case StatusEnum.checked_in:
        project.task_assigned++;
        break;
      case StatusEnum.completed:
        project.completed_task++;
        project.task_assigned++;
        break;
      default:
        break;
    }

    // Checking whether the task is due or not
    if (sprintlog.status !== StatusEnum.completed && new Date(sprintlog.due_date) < new Date()) {
      // console.log(sprintlog.slug+" is due task")
      project.task_due++;
    }
  }

  // Calculating the remaining tasks for each project
  projectMap.forEach((project) => {
    project.remaining_task = project.task_assigned - project.completed_task;
  });
  

  const projects = Array.from(projectMap.values());

  return { projects };
}
