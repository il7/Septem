import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, browserHistory, match, RouterContext } from 'react-router';

import { Routes } from '../components/router';


export default function(req, res) {
  return match({ Routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send('error! ' + error.message)
    } else {
      res.status(200);
      res.render('index.mustache', {});
    }
  });
}

