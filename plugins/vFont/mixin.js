import FontCollection from 'nuxt-speedkit/classes/FontCollection';
import { setIdleExecute } from 'nuxt-speedkit/hydrate';

export default {
  install (Vue) {
    Vue.mixin({
      provide () {
        return {
          criticalParent: typeof this.critical === 'boolean' ? this.critical : this.criticalParent
        };
      },

      inject: {
        criticalParent: { default: () => this.critical || false }
      },

      beforeRouteLeave (to, from, next) {
        setIdleExecute(false);
        next();
      },

      props: {
        critical: {
          type: Boolean,
          default () {
            return null;
          }
        }
      },

      data () {
        return {
          fontActive: false,
          fontCollection: new FontCollection()
        };
      },

      computed: {
        isCritical () {
          return typeof this.critical === 'boolean' ? this.critical : this.criticalParent;
        }
      }

    });
  }
};
