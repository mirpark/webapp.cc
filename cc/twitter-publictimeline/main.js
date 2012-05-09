require.config( {
    paths: {
		'jquery': 					'libs/jquery-1.7.1.amd',
		'jquery.iscroll':			'libs/jquery/jquery.iscroll',
		'underscore': 				'libs/underscore-1.2.2.amd',
		'backbone': 				'libs/backbone-0.5.3.amd',
		'text': 					'libs/text-0.27',
		'order': 					'libs/order-1.0.0',
		'hogan': 					'libs/hogan-1.0.2.amd',
		'bootstrap.buttons':		'libs/bootstrap/js/bootstrap-buttons',
		'bootstrap.modal':			'libs/bootstrap/js/bootstrap-modal',
		'bootstrap.alerts':			'libs/bootstrap/js/bootstrap-alerts'
    },
    baseUrl: ''
} );

require(['require', 'app'], function(require, App) {
	window.app = new App;
});


