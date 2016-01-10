import { createTemplate, compose, helper } from 'fragmen-template';

import Strata from '../../modules/strata/strata.hbs';
import Link from '../../modules/link/link.hbs';
import Logo from '../../modules/logo/logo.hbs';
import Heading from '../../modules/heading/heading.hbs';

import ArchiveList from '../../layouts/archive-list/archive-list';

export default const HomeTemplate = createTemplate(props => {
  var ArticlesHeader = compose(Heading, { to: '/articles' }, [ 'Articles' ]);
  var OpenSourceHeader = compose(Heading, { to: '/open-source' }, [ 'Open Source Projects' ]);
  var ContributeHeader = compose(Heading, { to: '/contribute' }, [ 'Contribute' ])

  return compose('div', { class: 'l-home' }, [
    compose(Strata, { layout: 'home-header' }, [
      compose(Link, { to: '/' }, [ Logo ]),
      compose('p', null, [
        'What is IL7? sit amet adipiscing, ', ArticlesLink, ' and ', 
        OpenSourceLink, ' or elit, ', ContributeLink, ' tempor incididunt ut labore.'
      ]),
      compose('p', null, [
        'What is your position? Amet lacus hendrerit tempus non eget quam. Maecenas ',
        'in maximus justo. Morbi rhoncus malesuada nisi, eu scelerisque lorem placerat id.'
      ])
    ]),

    compose(Strata, { layout: 'home-articles' }, [
      compose(Heading, { level: 2 }, [ ArticlesLink ]),
      compose(ArchiveList, { type: 'articles', limit: 3 })
    ]),

    compose(Strata, { layout: 'home-open-source' }, [
      compose(Heading, { level: 2 }, [ OpenSourceLink ]),
      compose(ArchiveList, { type: 'open-source', limit: 5, dates: false })
    ]),

    compose(Strata, { layout: 'home-contribute' }, [
      compose(Heading, { level: 2 }, [ ContributeLink ]),
      compose('p', null, [
        'How can others contribute? Amet adipiscing, Articles and Open Source Projects or elit.'
      ])
    ]),
  ]);
});