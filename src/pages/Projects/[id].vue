<template>
  <v-card v-if="project" class="w-100 mb-16">
    <v-card-title class="d-flex align-center">
      <router-link to="/">{{ project.name }}</router-link>
      <v-spacer />
      <v-bottom-sheet>
        <template #activator="{ props: activatorProps }">
          <v-btn density="compact" :icon="mdiDotsVertical" v-bind="activatorProps" variant="text" />
        </template>
        <v-card>
          <v-list>
            <!--            <v-dialog fullscreen>-->
            <!--              <template #activator="{ props: editDialogProps }">-->
            <!--                <v-list-item :prepend-icon="mdiPencil" v-bind="editDialogProps">Modifier le projet</v-list-item>-->
            <!--              </template>-->
            <!--            </v-dialog>-->
            <ConfirmDialog @yes="finishProject()">
              <template #activator="{ props: finishDialogProps }">
                <v-list-item :disabled="project.current >= maxCurrent" :prepend-icon="mdiCheck" v-bind="finishDialogProps">Marcher ce project comme terminé</v-list-item>
              </template>
            </ConfirmDialog>
            <ConfirmDialog @yes="archiveProject()">
              <template #activator="{ props: deleteDialogProps }">
                <v-list-item :disabled="!project.active" :prepend-icon="mdiArchive" v-bind="deleteDialogProps">Archiver le projet</v-list-item>
              </template>
            </ConfirmDialog>
          </v-list>
        </v-card>
      </v-bottom-sheet>
    </v-card-title>
    <v-card-text class="pt-4">
      <ProjectSection
        v-for="(section, sectionIndex) in project.sections"
        :key="section.id"
        :index="sectionIndex"
        :project="project"
        :section="section"
      />
    </v-card-text>
  </v-card>
  <v-fab
    v-if="project.current > 0"
    app
    :icon="mdiUndo"
    location="bottom left"
    @click="advanceProject(id, -1)"
  />
  <v-fab
    app
    :color="project.current >= maxCurrent ? '' : 'deep-orange-lighten-4'"
    :disabled="project.current >= maxCurrent"
    :icon="mdiArrowRight"
    location="bottom center"
    size="large"
    @click="advanceProject(id)"
  />
</template>
<script lang="ts" setup>
  import { mdiArchive, mdiArrowRight, mdiCheck, mdiDotsVertical, mdiUndo } from '@mdi/js'
  import { toNumber } from 'es-toolkit/compat'
  import { computed, type DeepReadonly, provide } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import useProjects, { type Project } from '@/stores/projects.ts'

  const route = useRoute()
  const router = useRouter()
  const { getProject, advanceProject, patchProject } = useProjects()

  // @ts-expect-error todo type params of route
  const id = computed(() => toNumber(route.params.id as string))
  const maxCurrent = computed(() => project.value.sections.reduce((acc, curr) => acc + (curr.rows * curr.cols), 0))
  const project = computed(() => getProject(id.value))

  function archiveProject () {
    patchProject(id.value, { active: false })
    router.push('/')
  }

  function finishProject () {
    patchProject(id.value, { current: maxCurrent.value })
    router.push('/')
  }

  provide<DeepReadonly<Project>>('project', project.value)

</script>
