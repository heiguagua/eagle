import Http from '../../common/scripts/http';
import ArticleBlank from './blank';
import ArticleEditor from './editor';
import ArticleToolbar from './toolbar';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    ArticleBlank,
    ArticleToolbar,
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
  computed: {
    ...mapState('TrialArticleToolbar', {
      currentView: state => state.currentView
    }),
  },
  mounted() {

  }
};
