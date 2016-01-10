import Narum from 'narum';

export default Narum.createModel({
  fetch: function(url, params) {
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.status === 200) 
          return this.onSuccess(res);
        return this.onStatusCodeError(res);
      })
      .catch(err => this.onServerError(err));
  },

  onSuccess: function(res) {
    this.set({ 
      results: res.results.map(this.transform, this),
      errorCode: undefined,
      errorMessage: undefined
    });
  },

  onStatusCodeError: function(res) {
    this.set({
      results: [],
      errorCode: res.status,
      errorMessage: res.errorMessage
    })
  },

  onServerError: function(err) {
    this.set({
      results: [],
      errorCode: 500,
      errorMessage: 'Server Error'
    })
  },

  transforms: [
    Narum.createTransform(props => { date: formatDate(props.date) }),
    Narum.createTransform(props => { excerpt: props.excerpt.substr(0, 140) })
  ]
})