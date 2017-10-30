import { mapState, mapActions, mapMutations } from 'vuex';
import Http from '../../../common/scripts/http';

export default {
  data() {
    return {

    }
  },
  methods: {
    printState() {
      const vm = this;
      console.log(this.state);
    },
    ...mapActions({
      createAction: 'create/createAction'
    }),
    ...mapMutations({
      createMutation: "create/createMutation"
    })
  },
  computed: {
    ...mapState('create', {
      createState: state => state.createState
    }),
  },
  mounted() {

  }
};
