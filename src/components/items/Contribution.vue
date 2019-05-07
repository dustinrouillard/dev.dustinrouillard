<template>
    <div class="contribution">
        <div class="contribution-container"><img class="contribution-icon" v-if="contribution.icon" width="30px" :class="{ 'circle': contribution.circle }" :src="contribution.icon"/></div>
        <h2 class="contribution-name">{{ contribution.name }}</h2>
        <a :href="contribution.url" target="_blank" class="contribution-website">Visit Website</a>
    </div>
</template>

<script>
export default {
  name: 'contribution',
  props: ['contribution'],
  components: {}
}
</script>

<style lang="scss">
.circle {
    border-radius:50%;
    overflow:hidden;
}

.contribution-name {
    margin-bottom: 5px;
}

.contribution-container {
    float: left;
    padding-right: 15px;
    padding-top: 15px;
    &.contribution-icon {
        width: 30px;
        height: 30px;
    }
}

.contribution-website {
    font-size: 15px;
}
</style>