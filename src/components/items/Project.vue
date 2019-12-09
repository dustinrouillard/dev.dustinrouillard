<template>
  <div class="project">
    <img v-if="project.icon" class="project-icon" :src="project.icon" />
    <h2 class="project-name">{{ project.name }}</h2>
    <p class="project-position">{{ project.position }}</p>
    <a
      :href="project.url"
      target="_blank"
      class="project-website"
      :style="{'padding-left': project.icon ? '47px' : 'none'}"
    >{{ project.type == 'website' ? 'Visit Website' : 'View Project' }}</a>
  </div>
</template>

<script>
export default {
  name: "project",
  props: ["project"],
  components: {}
};
</script>

<style lang="scss">
.project-name {
}

.project-position {
  color: #8a8a8a;
  margin-top: -13px;
  font-size: 15px;
}

.project-icon {
  float: left;
  padding-right: 15px;
  padding-top: 15px;
  width: 30px;
  height: auto;
}

.project-website {
  margin-top: -10px;
  // position: absolute;
  display: flex;
  font-size: 14.2px;
}
</style>