module.exports = {
	dev: {
		G_SCHEME: 'http',
		G_HOST_PORT: '172.20.4.220',//https://acc.yonyoucloud.com/
		G_PATH_PREFIX: '/ficloud',
	},
	development: {
		G_SCHEME: 'http',
		G_HOST_PORT: 'acctest.yyuap.com:8055',
		G_PATH_PREFIX: '/ficloud',
	},
	daily: {
		G_SCHEME: 'htts',
		G_HOST_PORT: 'acc-daily.yyuap.com',
		G_PATH_PREFIX: '/ficloud',
	},
	production: {
		G_SCHEME: 'https',
		G_HOST_PORT: 'acc.diwork.com',
		G_PATH_PREFIX: '/ficloud',
	},
};
