function UpdateViewCtrl($scope, $http, ViewSvc, SubmissionDataSvc, SubmissionSvc) {
	$scope.viewSvc = ViewSvc;
	$scope.submissionSvc = SubmissionSvc;
	$scope.submission = SubmissionSvc.submission;
	

	$scope.$watch('viewSvc.view', function(){
		$scope.view = $scope.viewSvc.view;
		$scope.master = angular.copy($scope.view);
	});
	
	/**
	 * On init, load the view
	 */
//	$scope.view = ViewSvc.get({id: viewId}, function(){
//		/**
//		 * Make a copy of the view for dirty checks
//		 */
//		$scope.master = angular.copy($scope.view);
//
//		/**
//		 * Try loading the submission
//		 * This will fail on the dashboard view
//		 */
//		try {
//			$scope.loadSubmission(submissionId);
//		} catch (x) {
//			$scope.onDashboardView = true;
//		}
//	});
	
	$scope.loadSubmission = function(subId){		
		$scope.submission = SubmissionDataSvc.get({id:subId}, function(data){		
						
			console.log(data);
			
			for (var a=0; a<data.values.length; a++) {
				var v = data.values[a];
				
				for (var b=0; b<$scope.view.viewFields.length; b++) {
					var vf = $scope.view.viewFields[b];

					if (v.field.id == vf.field.id){
						$scope.$broadcast('setValue',{field:vf.id, value:v.value});
						break;
					}
				}
			}			
		});		
	};
	
	$scope.$on('setSubmission', function(source, args){
		$scope.loadSubmission(args.id);
	});
	
	$scope.getValue = function(vf){
		var val = '';
		if ($scope.submission.values) {
			for (var a=0; a<$scope.submission.values.length; a++) {
				var v = $scope.submission.values[a];
				if (v.field.id == vf.field.id){
					val = v.value;
					break;
				}
			}
		}
		return val;
	};
	
	/**
	 * Build a new submission object from the viewfields
	 */
	$scope.getNewSubmission = function() {
		var newSubmission = {id:$scope.submission.id, view:{id:viewId}, user:{id:userId}, values:[]};
		angular.forEach($scope.view.viewFields, function(vf,i){
			if (vf.visibility) {
				if (vf.value && vf.value != null) {
					newSubmission.values[i] = {};
					newSubmission.values[i].value = vf.value;
					newSubmission.values[i].viewField = {id:vf.id, fieldType:{id:vf.fieldType.id}};
				}
			} 
		});
		return newSubmission;
	};
	
	/**
	 * Send the submission object to the server
	 */	
	$scope.save = function() {
		$('.save-button').hide();
		
		/**
		 * Don't want to actually send anything to the server in the demo
		 */
		
//		$http.post(contextPath+'/submit/'+viewId, $scope.getNewSubmission()).success(function(data){
			
			if ($scope.onDashboardView)
				$scope.$emit('updateDashboard',{id:data.id});
			
//			if (data.success && !$scope.onDashboardView)			
//				window.location.href = contextPath+'/thankyou/'+accountId+'/'+viewId+'/'+data.id;
//			else 
//				alert(data.message);
//		});
	};
	
	/**
	 * Disable the submit button if the form is invalid or they've not entered anything yet
	 */
	$scope.isSaveDisabled = function() {
		return $scope.theForm.$invalid || $scope.view == $scope.master;
	};
}

function UpdateViewFieldCtrl($scope) {

	$scope.$on('setValue', function(source, args){
		if ($scope.viewField.id == args.field) {
			$scope.viewField.value = args.value;
			
			/**
			 * Dropdown
			 */
			if ($scope.viewField.fieldType.id == 2) {
				
			}
		}
	});
	
	$scope.regex = function(){
		try {
			return eval("/"+$scope.viewField.regEx+"/");
		} catch (x) {
			return /.*/;
		}
	};            
	
}