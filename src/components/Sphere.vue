<template>
  <div className="content-sphere">
    <h1>Sphere</h1>
  </div>
</template>

<script>
export default {
  created() {
    //console.log("Sphere created!")
  },
  mounted() {
    //console.log("Sphere mounted!");
    this.$emit('notificationSphere');
  }
}
</script>