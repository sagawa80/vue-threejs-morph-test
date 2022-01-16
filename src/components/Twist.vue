<template>
  <div className="content-test">
    <h1>Twist</h1>
  </div>
</template>

<script>
export default {
  created() {
    //console.log("Twist created!")
  },
  mounted() {
    //console.log("Twist mounted!");
    this.$emit('notificationTwist');
  }
}
</script>