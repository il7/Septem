import { createTemplate, compose, helper } from 'fragmen';

import helpers from '../../helpers/helpers.js';

import List from '../../modules/list/list.hbs';
import ListItem from '../../modules/list/list-item.hbs';
import Heading from '../../modules/heading/heading.hbs';
import Loader from '../../modules/loader/loader.hbs';
import Link from '../../modules/link/link.hbs';


export default const ArchiveTemplate = createTemplate(props => {
  return compose('div', null, [
    compose(Heading, { level: props.level || 2 }, [
      props.title
    ]),
    compose(ArchiveListTemplate, {
      results: props.results,
      ItemTemplate: props.ItemTemplate
    })
  ]);
});

export const ArchiveListTemplate = createTemplate(props => {
  if (props.results.length > 0) {
    return compose(List, null, [
      helper(helpers.repeat, props.results, props.ItemTemplate, {
        level: props.level
      })
    ]);
  } else {
    return Loader;
  }
});

export const ArchiveItemTemplate = createTemplate(props => compose([
  compose(Heading, { level: props.level || 3 }, [
    compose(Link, { to: props.slug }, [
      props.title 
    ])
  ]),

  helper(helpers.if, props.date, [
    compose('p', null, [
      compose('small', null, [
        props.date
      ])
    ])
  ]),

  helper(helpers.if, props.excerpt, [
    compose('p', { class: 'textblock textblock-2-lines' }, [
      props.excerpt
    ])
  ])
});