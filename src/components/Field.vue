<template>
  <div>
    <label :for="data.name">{{ data.label }}</label>
    <input v-if="!isDropdown" :type="data.type" :value="data.value" :id="data.name" :name="data.name"
           @click="onCheckboxUpdate" :checked="data.checked">
    <select v-else-if="isDropdown" :name="data.name" :id="data.name" v-model="selectedValue" @change="onSelect">
      <option :value="option" v-for="(option, index) in options" :key="index">{{ option }}</option>
    </select>
  </div>
</template>

<script>
import Vuex from "vuex";

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
    },
    selected: {
      type: String,
      required: false,
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
  methods: {
    ...Vuex.mapActions(['updateCheckbox']),
    onCheckboxUpdate(event) {
      // Update the global state with checkbox's state, this would be sued for navigation to fill out data
      this.updateCheckbox({
        name: this.data.name,
        isChecked: event.target.checked,
        nodeId: this.$route.params.node
      });
    },
    onSelect() {
      // When select's value changes, emit event so parent can update variables in store
      this.$emit('update', this.selectedValue);
    }
  },
  mounted() {
    this.selectedValue = this.selected;
  }

}
</script>

<style scoped>

</style>