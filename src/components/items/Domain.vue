<template>
  <div class="domain">
    <fa class="domain-icon" :icon="['fa', 'globe']" />
    <a class="domain-name" :href="`https://${domain.domain}`" target="_blank">{{
      domain.domain
    }}</a>
    <span title="Primary Domain" v-tippy="{ placement: 'bottom' }"
      ><fa :icon="['fa', 'star']" class="domain-primary" v-if="domain.primary"
    /></span>
    <p class="domain-added">{{ new Date(domain.added).toLocaleString() }}</p>
  </div>
</template>

<script>
export default {
  name: "domain",
  props: ["domain"],
  components: {}
};
</script>

<style lang="scss">
.domain-name {
  color: #8a8a8a;
  margin-top: -2px;
  font-size: 16px;
}

.domain-icon {
  float: left;
  padding-right: 10px;
  padding-top: 8px;
  font-size: 18px;
  color: #a5bdda;
  height: auto;
}

.domain-primary {
  color: #7f8b9b;
  padding-left: 4px;
  font-size: 10px;
  padding-bottom: 3px;
}

.domain-added {
  color: #b9b9b9;
  opacity: 0.6;
  margin-top: 1px;
  display: flex;
  font-size: 13px;
}
</style>
