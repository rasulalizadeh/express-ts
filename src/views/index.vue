<template>
  <div>
    <div>Express TS with Vue Templates</div>
    <label for="nameInput">
      Please input your name: 
      <input id="nameInput" type="text" v-model="name"/>
    </label>
    <transition name="fade">
      <div v-if="hasName">Hello, {{name}} :)</div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Index',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    hasName() {
      return this.name.length > 0
    }
  }
}
</script>