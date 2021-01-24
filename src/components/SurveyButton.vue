<template>
  <a class="btn btn-zingtree col-2" href="#" @click="handleClick">{{ data.button_text }}</a>
</template>

<script>
import Vuex from 'vuex';

export default {
  name: "SurveyButton",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log(this.data)
  },
  methods: {
    ...Vuex.mapActions(['updateActiveNode']),
    handleClick() {
      const { target_node_id } = this.data;
      this.updateActiveNode(target_node_id);
    }
  },
}
</script>

<style scoped>
a.btn {
  display: flex;
  padding: 10px 7px;
  background: #0e5a38;
  border-radius: 5px;
  color: #fff;
  text-decoration: none;
  justify-content: center;
}

a.btn .col-2 {
  width: 50%;
}
</style>