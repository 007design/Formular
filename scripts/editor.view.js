// Field Type Constants
var FIELD_TYPES = [{id:1,name:'Text Field'},
                   {id:2,name:'Drop Down'},
                   {id:3,name:'Checkbox Group'},
                   {id:4,name:'Radio Buttons'},
                   {id:5,name:'Text Area'},
                   {id:6,name:'Upload'},
                   {id:7,name:'Date Picker'}];

var TRIGGER_TYPES = [{id:1,name:'value'},
                     {id:2,name:'valueset'},
                     {id:3,name:'url valueset'}];

var COMPARISON_TYPES = [{id:1,name:'Equal To'},
                        {id:2,name:'Not Equal To'},
                        {id:3,name:'Greater Than'},
                        {id:4,name:'Less Than'}];

/**
 * View Editor Controller
 */

function ViewEditorCtrl($scope, $location, $http, EditorSvc, ViewSvc, FormSvc, ViewUsersSvc){
	$scope.editorSvc = EditorSvc;
			
	$scope.contextPath = contextPath;
	$scope.viewNames = [];
	
	$scope.$on('openModal', function(){
		$scope.loginModalShown = true;
	});
	$scope.$on('closeModal', function(){
		$scope.loginModalShown = false;
	});
	
	/**
	 * On load, get the view
	 */
	EditorSvc.get({id: viewId}, function(data){
//		console.log('Editor view loaded');	
//		console.log(data);
		
		$scope.editorSvc.view = data;
		console.log($scope.editorSvc.view);
		
		/**
		 * Make a copy for dirty checks
		 */
		$scope.editorSvc.master.view = angular.copy(data);

		/**
		 * When the view is loaded, get the form id and load the form
		 */
		FormSvc.get({id: $scope.editorSvc.view.form.id}, function(data){			
			$scope.editorSvc.form = data;
			
			/**
			 * Make a copy for dirty checks
			 */
			$scope.editorSvc.master.form = angular.copy(data);
			
			/**
			 * Now init the bootstrap plugin elements
			 */
			$('.btn-group').button();
			$('.dropdown-toggle').dropdown();
		});
		
		/**
		 * Load the list of other views associated with this form
		 * Also, get the user
		 */
//		$scope.otherViews = ViewsListSvc.query({id: $scope.editorSvc.view.id});
//		$scope.user = UserSvc.get({event: 'data', id: userId});
	});
	
	/**
	 * Login via ajax
	 */
	$scope.doLogin = function(u,p){
		$scope.$emit('loginRequest', {username: u, password: p});
	};
	
	/**
	 * Call the save service and pass the view
	 */
	$scope.save = function() {
		
		if ($location.path() == "/form") {
			FormSvc.save($scope.editorSvc.form, function(){
				$scope.editorSvc.master.form = angular.copy($scope.editorSvc.form);
//				$scope.thinking = false;
			});
		
		} else if ($location.path() == "/users") {
			var viewUsers = [];
		
			angular.forEach($scope.editorSvc.users, function(u){
				if (u.hasView)
					viewUsers.push(u);
			});
			
			ViewUsersSvc.save(viewUsers, function(){
				$scope.editorSvc.master.viewUsers = angular.copy($scope.editorSvc.viewUsers);
			});
		
		} else {					
			ViewSvc.save($scope.editorSvc.view, function(){
				$scope.editorSvc.master.view = angular.copy($scope.editorSvc.view);
			});		
		}
	};

	/**
	 * Copy the master over the current view
	 */
	$scope.cancel = function() {
		if (confirm("Are you sure you wish to undo all your changes?")) {
			$scope.editorSvc.view = angular.copy($scope.editorSvc.master.view);
			$scope.editorSvc.viewUsers = angular.copy($scope.editorSvc.master.viewUsers);
			$scope.editorSvc.form = angular.copy($scope.editorSvc.master.form);
		}
	};
	
	$scope.isSaveDisabled = function() {		
		if (angular.equals($scope.editorSvc.master.view, $scope.editorSvc.view)) {
			if (angular.equals($scope.editorSvc.master.form, $scope.editorSvc.form)) {
				if (angular.equals($scope.editorSvc.master.users, $scope.editorSvc.users)) {
					return true;
				} else {
					console.log("users don't match");
				}
			} else {
				console.log("forms don't match");
			}
		} else {
			console.log("views don't match");
		}
		
		console.log('ok: '+$scope.viewEditor_form.$invalid);
		
		return $scope.viewEditor_form.$invalid;
	};	
	$scope.isCancelDisabled = function() {
		if (angular.equals($scope.editorSvc.master.view, $scope.editorSvc.view)) {
			if (angular.equals($scope.editorSvc.master.form, $scope.editorSvc.form)) {
				if (angular.equals($scope.editorSvc.master.viewUsers, $scope.editorSvc.viewUsers)) {
					return true;
				}
			}
		}
		return false;		
	};
	
	/**
	 * These should probably just be links rather than methods
	 */

	$scope.showView = function(v){
		window.open(contextPath+'/edit/'+accountAlias+'/'+v.alias, "_self");
	};
	$scope.showForm = function(){
		window.open(contextPath+"/form/"+accountAlias+"/"+$scope.editorSvc.view.alias);
	};
	$scope.showDashboard = function(){
		window.open(contextPath+"/dashboard/"+accountAlias+"/"+$scope.editorSvc.view.alias);
	};
	$scope.showManager = function(){
		window.open(contextPath+'/manager/'+accountAlias, "_self");
	};
	$scope.logout = function(){
		window.open(contextPath+'/do/logout', "_self");
	};
	
}