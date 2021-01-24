<template>
  <div>
    <label :for="data.name">{{ data.label }}</label>
    <input v-if="!isDropdown" :type="data.type" :value="data.value" :id="data.name" :name="data.name"
           :bind="selectedValue">
    <select v-else-if="isDropdown" :name="data.name" :id="data.name" :bind="selectedValue">
      <option :value="option" v-for="(option, index) in options" :key="index">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Field",
  data() {
    return {
      selectedValue: null,
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    }
  },
  computed: {
    // To check whether field could be a dropdown
    isDropdown() {
      const { data } = this
      return data && data.options && data.options.length
    },
    // Generates options array if it is a dropdown field
    options() {
      const { isDropdown, data: { options: options } } = this;
      if (isDropdown) {
        return options.split('\r\n');
      }
      return [];
    }
  },
}
</script>

<style scoped>

</style>