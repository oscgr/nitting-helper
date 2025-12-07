import { useLocalStorage } from '@vueuse/core'
import { maxBy, trim } from 'es-toolkit'

interface CreatedEntity { id: number }

export interface ProjectSection extends CreatedEntity {
  repetitions: number
  rows: number
}
export interface Project extends CreatedEntity {
  name: string
  sections: ProjectSection[]
}

export interface ProjectSectionToCreate extends Omit<ProjectSection, 'id'> {}

export interface ProjectToCreate {
  name?: string
  sections: ProjectSectionToCreate[]
}

const projects = useLocalStorage<Project[]>('projects', [])
function useProjects () {
  const addProject = (project: ProjectToCreate) => {
    if (!project.name) {
      project.name = 'New project'
    }

    projects.value.push({
      ...project,
      name: trim(project.name),
      sections: project.sections.map((g, i) => ({ ...g, id: i + 1 })),
      id: (maxBy(projects.value, p => p.id)?.id || 0) + 1,
    })
  }
  const removeProject = (id: number) => {
    projects.value = projects.value.filter(p => p.id !== id)
  }
  return { addProject, removeProject }
}

export default useProjects
