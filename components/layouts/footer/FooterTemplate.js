import { createTemplate, compose } from 'fragmen';

import Strata from '../../modules/strata/strata.hbs';
import List from '../../modules/list/list.hbs';
import ListItem from '../../modules/list/list-item.hbs';
import Link from '../../modules/link/link.hbs';


export default const ArchiveTemplate = createTemplate(props => {
  return compose(Strata, { tag: 'footer', layout: 'footer' }, [
    compose('nav', { class: 'small' }, [
      compose(List, { class: 'list rhythm-small' }, [
        compose(ListItem, null, [
          compose(Link, { to: '/articles', class: 't-articles' }, [ 'Articles' ])
        ]),

        compose(ListItem, null, [
          compose(Link, { to: '/open-source', class: 't-open-source' }, [ 'Open Source Projects' ])
        ]),

        compose(ListItem, null, [
          compose(Link, { to: '/contribute', class: 't-contribute' }, [ 'Contribute' ])
        ])
      ])
    ])

    compose('div', { class: 'small' }, [ '&copy; Copyright 2015' ])
  ]);
});