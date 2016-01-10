import { createTemplate, compose, helper, helpers } from 'fragmen';

import List from '../../modules/list/list.hbs';
import ListItem from '../../modules/list/list-item.hbs';
import Strata from '../../modules/strata/strata.hbs';
import Link from '../../modules/link/link.hbs';
import Logo from '../../modules/logo/logo.hbs';

import Footer from '../footer/FooterTemplate';


export default const ArchiveTemplate = createTemplate(props => {
  return compose('div', null, [
    compose(Strata, { tag: 'header', layout: 'header' }, [
      compose(Link, { to: '/' }, [ Logo ])
    ]),
    props.children,
    Footer
  ]);
});