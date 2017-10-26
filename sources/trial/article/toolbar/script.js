import { mapState, mapActions } from 'vuex';
import Http from '../../../common/scripts/http';

export default {
  data() {
    return {

    }
  },
  methods: {
    ...mapActions([
      'create'
    ])
  },
  computed: {
    // ...mapState([
    //   'create'
    // ]),
  },
  mounted() {

  }
};
