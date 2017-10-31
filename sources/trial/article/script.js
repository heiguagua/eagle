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
    console.log(this.$store)
    return {
      // currentView: 'ArticleBlank',
    }
  },
  computed: {
    ...mapState('TrialArticleToolbar', {
      currentView: state => state.currentView
    }),
  },
  mounted() {

  }
};
