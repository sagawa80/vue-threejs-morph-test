<template>
  <div class="app">
    <Header />
    <div className="content-main">
      <router-view></router-view>
    </div>
  </div>
  <div className="webgl-bg">
    <WebglBG ref="child" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import WebglBG from './components/WebglBG.vue'

export default {
  name: 'app',
  components: {
    Header,
    WebglBG
  },
  created() {
    //console.log("app created!")
  },
  mounted() {
    //console.log("app mounted!");
    this.$router.beforeEach((to, from, next) => {
      //console.log(to.fullPath);
      if (to.fullPath === '/twist') {
        this.$refs.child.morphTwist();
      } else if (to.fullPath === '/sphere') {
        this.$refs.child.morphSphere();
      } else {
        this.$refs.child.morphBox();
      }
      //this.$refs.child.morphBox();
      next();
    });
  },
  data() {
    return {
      title: 'Router'
    }
  },
  methods: {
    notificationBox: function() {
      this.$refs.child.morphBox();
    },
    notificationSphere: function() {
      this.$refs.child.morphSphere();
    },
    notificationTwist: function() {
      this.$refs.child.morphTwist();
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

ul {
  list-style: none;
  list-style-type: none !important;
}
li {
  list-style: none;
}
</style>
