<template>
  <div>
      Test
  </div>
</template>

<script>
export default {
    name: 'app',
    props: {
        profile: Object,
        languages: Object
    },
    created() {
        console.log(this.profile, this.languages);
    }
}
</script>

<style lang="scss" scoped>

</style>
