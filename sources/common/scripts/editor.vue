<template>
  <p
  @focus='isBlock=true'
  @blur = 'isBlock=false'
  :contenteditable='isEditable'
  v-html='inputText'
  @input='inputChange'></p>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    isEditable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isBlock: false,
      inputText: this.value
    };
  },
  methods: {
    inputChange() {
      this.$emit("input", this.$el.innerHTML);
    }
  },
  watch: {
    value() {
      if (!this.isBlock || !this.innerText) this.innerText = this.value;
    }
  }
};
</script>
<style lang='scss' scoped>
p[contenteditable] {
  display: inline-block;
  min-width: 50px;
  outline: none;
  border: 1px solid red;
  line-height: 35px;
  height: 35px;
  border-radius: 4px;
  word-break: break-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 0;
  padding: 0 5px;
}
</style>
