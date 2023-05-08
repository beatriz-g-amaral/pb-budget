<template>
  <q-input
  ref="input"
  v-model="localValue"
  class="input-base"
  no-error-icon
    :label="label"
    :placeholder="placeholder"
    :name="name"
    :type="type"
    @input="inputHandler"
    @click="clickHandler"
>

</q-input>
</template>
<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: undefined
    },

    placeholder: {
      type: String,
      default: undefined
    },

    name: {
      type: String,
      default: undefined
    },

    type: {
      type: String,
      default: undefined
    },
  },
data() {
    return {
      localValue: this.value,
      localLength: this.value ? this.value.toString().length : 0,
    };
  },
computed: {},
watch: {},
methods: {
  inputHandler() {
      this.$emit('input', this.localValue);
    },

    clickHandler() {
      this.$emit('onClick', this.localValue);
    },
  },
};  
</script>