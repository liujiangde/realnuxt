const middleware = {}

middleware['authenticated'] = require('..\\middleware\\authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['Notauthenticated'] = require('..\\middleware\\Notauthenticated.js')
middleware['Notauthenticated'] = middleware['Notauthenticated'].default || middleware['Notauthenticated']

export default middleware
