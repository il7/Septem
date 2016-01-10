import Narum from 'narum';

import { ArchiveView, ArchiveItemView } from './ArchiveView';
import ArticleStore from '../../pages/articles/ArticlesStore';

var articleArchive = new ArchiveView({
  el: document.querySelector('#articles'),
  store: ArticleStore.select('articles')
});

var articlePost = new ArchiveItemView({
  el: document.querySelector('#article-date-grab'),
  store: ArticleStore.select('articles', { slug: 'date-grab' })
});