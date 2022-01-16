<template>
  <div className="content-top">
    <h1>Box</h1>
  </div>
</template>

<script>
export default {
  created() {
    //console.log("home created!")
  },
  mounted() {
    //console.log("home mounted!");
    this.$emit('notificationBox');
  }
}
</script>