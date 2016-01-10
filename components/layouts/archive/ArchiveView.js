import Narum from 'narum';
import ViewStoreTransform from 'view-store-transform';

import {
  ArchiveTemplate,
  ArchiveListTemplate,
  ArchiveItemTemplate
} from './ArchiveTemplate'


export default const ArchiveView = Narum.createComponent({
  template: ArchiveTemplate
});

export const ArchiveListView = Narum.createComponent({
  template: ArchiveListTemplate
});

export const ArchiveItemView = Narum.createComponent({
  template: ArchiveItemTemplate,
  mixins: [ ViewStoreTransform ],

  storeTransform: {
    date: props => ({
      date: formatDate(props.date)),
    }),
    excerpt: props => ({ props.excerpt.substr(0, 140) })
  },

  constructor: function(opts) {
    super(opts);
  },

  render: function(props) {
    return this.template(props);
  }
});