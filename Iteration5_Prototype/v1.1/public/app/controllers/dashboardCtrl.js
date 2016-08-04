'use strict';
angular
	.module('App')
	.controller('DashboardCtrl', function ($scope, dashService) {
		
		// this.dashBoard = dashService.loadDashboard();
		self.dashBoard = null;

		dashService
		      .loadDashboard()
		      .then( function( dash ) {
		        self.dashBoard = dash;

		        console.log(self.dashBoard[0].title);
		      });

}); 


