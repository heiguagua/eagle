export default {
  data() {
    return {
      menu: {
        isCollapse: true
      },
    }
  },
  methods: {
    collapse() {
      this.menu.isCollapse = !this.menu.isCollapse;
    }
  }
}
