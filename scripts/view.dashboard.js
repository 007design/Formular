function DashboardCtrl($scope, $http, $filter, DashboardSvc, SubmissionHistorySvc, ViewSvc) {
	$scope.viewSvc = ViewSvc;
	$scope.dashboardSvc = DashboardSvc;
		
	$scope.editSub = {};
	$scope.histSub = {};
	$scope.updateUrl = contextPath+'/partials/view-update';
	
	$scope.historyModalShown = false;
	
	$scope.$watch('viewSvc.view', function(){
		$scope.dashboardView = $scope.viewSvc.view;
	});
	
	/**
	 * Load the view
	 */
	ViewSvc.get({id: viewId});
	
	/**
	 * When the offset, sortBy, sortDir, or userFilters().length changes, 
	 * and when Search is clicked or when an update event is emitted, load new records
	 */
	$scope.$watch('dashboardSvc.offset', function(){ $scope.dashboardSvc.load(); });	
	$scope.$watch('dashboardSvc.sortBy', function(){ $scope.dashboardSvc.load(); });	
	$scope.$watch('dashboardSvc.sortDir', function(){ $scope.dashboardSvc.load(); });
//	$scope.$watch('dashboardSvc.filters.length', function(){ $scope.dashboardSvc.load(); });
	$scope.$on('updateDashboard', function(){ $scope.dashboardSvc.load(); });
	$scope.doSearch = function(){ $scope.dashboardSvc.load(); };

	/**
	 * When a header is clicked, either set the sortBy or
	 * if already sorting by that column, change the sortDir
	 */
	$scope.doSort = function(vf){
		if (!vf)
			vf = {id:''};
		
		if (vf.field.id == $scope.dashboardSvc.sortBy.id)
			$scope.dashboardSvc.sortDir = !$scope.dashboardSvc.sortDir;
		else {
			$scope.dashboardSvc.sortDir = false;
			$scope.dashboardSvc.sortBy = vf.field;
		}
	};

	/**
	 * Pagination links
	 */
	$scope.nextPage = function(){
		if ($scope.dashboardSvc.offset+10<$scope.dashboardSvc.total)
			$scope.dashboardSvc.offset=$scope.dashboardSvc.offset+10;
	};
	$scope.prevPage = function(){
		if ($scope.dashboardSvc.offset-10>=0)
			$scope.dashboardSvc.offset=$scope.dashboardSvc.offset-10;
	};	
	
	/**
	 * ng-class functions for pagination
	 */
	$scope.isFirstPage = function(){ return $scope.dashboardSvc.offset == 0 ? 'disabled' : ''; };
	$scope.isLastPage = function(){ return $scope.dashboardSvc.offset+10>$scope.dashboardSvc.total ? 'disabled' : ''; };
	$scope.activePage = function(o) { return o == $scope.dashboardSvc.offset ? 'active' : ''; };
	
	
	/**
	 * Submission History click handler
	 */
	$scope.showSubmissionHistory = function(sub) {
		$scope.histSub = sub;
		
		// history is a list of valuesets
		SubmissionHistorySvc.query({id: sub.id}, function(data){
			$scope.historyModalHeader = sub.id;
			$scope.subHistory = data;
		});		
	};
	
	/**
	 * Edit Submission click handler
	 */	
	
	$scope.editSubmission = function(sub) {
		$scope.editSub = sub;
		$scope.editModalHeader = $scope.updateUrl;
		
		$scope.$broadcast('setSubmission', {id: sub.id});
	};	
	
	$scope.doFitlers = function(f){
		f.state = !f.state;
		$scope.dashboardSvc.load();
	};
	
	$scope.isActive = function(x){
		return x?'active':'';
	};
	
	$scope.columnWidth = function() {
		if ($scope.dashboardView.viewFields)
			return ((100 / ($scope.dashboardView.viewFields.length+1) )-1) + "%";
	};
	
	$scope.getValue = function(vf,s){
		if (!s)
			s = $scope.editSub;
		
		var val = '';
		for (var a=0; a<s.values.length; a++) {
			var v = s.values[a];
			if (v.field.id == vf.field.id){
				val = v.value;
				break;
			}
		}
		return val;
	};
}