<template>
  <a class="btn btn-zingtree col-2" @click="handleClick">{{ data.button_text }}</a>
</template>

<script>
export default {
  name: "SurveyButton",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      const { data } = this;
      this.$emit('next', data.target_node_id, data.value);
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