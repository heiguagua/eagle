export default {
  data() {
    return {
      menu: {
        isCollapse: false
      },
    }
  },
  methods: {
    collapse() {
      this.menu.isCollapse = !this.menu.isCollapse;
    }
  }
}
