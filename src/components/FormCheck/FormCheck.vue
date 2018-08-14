<template>
  <div class="formCheck">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "yg-formCheck",
    data: function () {
      return {
        checkItem: []
      }
    },
    provide: {
      foo: 'bar'
    },

    mounted: function () {
      // alert(1)
      this.checkItem = [1,2]
    },
    methods: {
      check: function (found) {
        var vm = this
        found();
      }
    },
  };
</script>
