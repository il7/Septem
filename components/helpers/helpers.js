import { createHelper, compose } from 'fragmen-template';

export const ifHelper = createHelper('if', (dis, denDat, orDat) => {
  if (dis) {
    return denDat;
  } else {
    return orDat;
  }
});

export const mapHelper = createHelper('map', (list, Template) => {
  return list.map((item, index) => {
    return compose(Template, Object.assign({}, this.props, { 
      '@index': index
      '@value': item
    });
  });
})