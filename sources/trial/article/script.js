import Http from '../../common/scripts/http';
import ArticleBlank from './blank';
import ArticleEditor from './editor';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    ArticleBlank,
    ArticleEditor
  },
  data() {
    return {}
  },
  methods: {
    create() {
      this.$router.push('/layout/trial/editor');
    },
    back() {
      this.$router.push('/layout/trial/blank')
    },
  },
  computed: {},
  mounted() {}
};
