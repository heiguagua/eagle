<template>
  <p
  class='editor'
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
@import "../styles/color";
p[contenteditable].editor {
  display: inline-block;
  min-width: 50px;
  outline: none;
  border: 1px solid $color-border-base;
  line-height: 20px;
  font-size: 14px;
  border-radius: 4px;
  word-break: break-all;
  word-wrap: break-word;
  overflow-wrap: break-word;
  margin: 0;
  padding: 6px 5px;
}
</style>
