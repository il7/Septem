import { createTemplate, compose, helper, helpers } from 'fragmen';

import Strata from '../../modules/strata/strata.hbs';
import Link from '../../modules/link/link.hbs';
import Logo from '../../modules/logo/logo.hbs';
import Heading from '../../modules/heading/heading.hbs';

import Footer from '../footer/FooterTemplate';


export default const ErrorTemplate = createTemplate(props => {
  return compose('div', null, [
    compose(Strata, null, [
      compose(Link, { to: '/' }, [ Logo ])
      compose('header', { class: 'rhythm-small' }, [
        compose(Heading, { level: 1 }, [ 'Move among' ]),
        compose(Heading, { level: 2 }, [ 'Nothing to see here' ])
      ]),

      compose('p', null, [ 
        'Looks like we&#x27;ve made a mistake and sent you to an empty space, ',
        'or maybe you&#x27;re trying to uncover superimportant secrets.'
      ]),

      compose('p', null, [ 
        'However you ended up at this dusty corner of internets, the ',
        compose(Link, { to: '/', class: 't-dark' }, [ 'homepage' ])
        'will probably get you back on track.  Google is also renowned for it&#x27;s ',
        compose('a', { href: 'https://google.com' }, [ 'search tool' ]),
        'if you want to explore the vast expanse of the web.'
      ]),
    ]),

    Footer
  ]);
});