<template>
  <div class="d-flex flex-column" style="overflow: auto">
    <ProjectSectionRow
      v-for="(row) in section.rows"
      :key="`${section.id}_${row}`"
      :project="project"
      :row="row"
      :section="section"
      :start-index="startIndexOfSection"
    />
  </div>
</template>
<script lang="ts" setup>
  import type { Project, ProjectSection } from '@/stores/projects.ts'
  import { indexOf } from 'es-toolkit/compat'
  import { computed, type DeepReadonly } from 'vue'
  import ProjectSectionRow from '@/components/ProjectSectionRow.vue'

  const props = defineProps<{ project: DeepReadonly<Project>, section: DeepReadonly<ProjectSection> }>()

  const startIndexOfSection = computed(() => {
    const indexOfSection = indexOf(props.project.sections, props.section)
    if (indexOfSection <= 0)
      return 0

    return props.project.sections.reduce((acc, curr, index) => {
      if (index >= indexOfSection)
        return acc
      return acc + (curr.rows * curr.cols)
    }, 0)
  })

</script>
