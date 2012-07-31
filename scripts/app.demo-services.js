angular.module('module.services', ['ngResource'])	
	/**
	 * Editor services
	 */
	.service('EditorSvc', ['$resource', function($resource){
		var scope = this;
		
		scope.master = {};
		scope.resource = $resource('data/data.editor.js');
		
		scope.get = function(params, success){
			scope.resource.get(params, function(data){
				if (success)
					success(data);
			});
		};
		
		return scope;
	}])	
		
	.factory('FieldsSvc', ['$resource', function($resource){
		return $resource('data/data.fields.js');
	}])	

	/**
	 * View Services
	 */
	.service('FormSvc', ['$resource', '$http', function($resource, $http){
		var scope = this;
		scope.resource = $resource('data/data.form.js');
						
		scope.get = function(params, success) {
			scope.resource.get(params, function(data){
				scope.form = data;
				if (success)
					success(scope.form);
			});		
		};
		
		scope.save = function(data, success){
			/**
			 * Not used in demo
			 */
//			$http.post(contextPath+'/save/form/'+accountId, data).success(function(data){
//				if (success)
//					success(data);
//			});
		};
	}])		
	.service('ViewSvc', ['$resource', '$http', 'EditorSvc', function($resource, $http, EditorSvc){
		var scope = this;			
		scope.editorSvc = EditorSvc;
		
		scope.resource = $resource('data/data.view.js');
		
		scope.get = function(params, success){
			scope.resource.get(params,function(data){
				scope.view = data;
				if (success)
					success(scope.view);
			});
		};
		
		scope.save = function(data, success){
			var editorViewCopy = angular.copy(data);
			
			for (var a in editorViewCopy.viewFields) {
				editorViewCopy.viewFields[a].options = angular.copy(editorViewCopy.viewFields[a].viewOptions);
				editorViewCopy.viewFields[a].viewOptions = undefined;
			}
			
			scope.view = editorViewCopy;
			
			/**
			 * We don't actually want to post to the server in the demo
			 * But we DO want to call the success method 
			 */
//			$http.post(contextPath+'/save/view/'+accountId, data).success(function(data){
				if (success)
					success(data);
//			});			
		};
		
		return scope;
	}])		
	.service('SubmissionSvc', ['$resource', '$http', function($resource, $http){
		var scope = this;
		
		scope.total = 0;
		scope.submissions = [];
		scope.resource = $resource('data/data.submissions.js');
		
		scope.save = function(viewId, data, success){

			/**
			 * We don't actually want to post to the server in the demo
			 */
//			$http.post(contextPath+'/submit/'+accountId+'/'+viewId, data).success(function(data){
//				if (success)
//					success(data);
//			});
					
			/**
			 * For demo purposes we're doing this instead
			 * It does, essentially, the same thing that happens on the server
			 * We add a valueset to the submission
			 */
			
			var newSub = angular.copy(data);
			newSub.timestamp = new Date();
			
			// Add the values to the valuesets property to allow updates/history without server
			
			var added = false;
			for (var s in scope.submissions) {
				if (scope.submissions[s].id == newSub.id) {
					scope.submissions[s].valueSets.push( newSub.values );
					added = true;
				}
			}
			if (!added) {
				newSub.id = scope.submissions.length+1;
				newSub.valueSets = [];
				newSub.valueSets.push(newSub.values);
				scope.submissions.push(newSub);
			}			
			
			if (success)
				success(scope.submissions);
		};
		
		/**
		 * Get submissions list
		 */
		scope.get = function(params, success){
			scope.resource.get(params, function(resp){
				scope.submissions = resp.data;
				scope.total = resp.total;
				if (success)
					success();
			});
		};
		
		return scope;
	}])
	
	/**
	 * Dashboard services
	 */		
	.service('DashboardSvc', ['SubmissionSvc', 'FiltersSvc', function(SubmissionSvc, FiltersSvc){
		var scope = this;
		
		scope.submissionSvc = SubmissionSvc;	
				
		scope.filters = [];
		
		scope.offset = 0;
		scope.total = 0;
		scope.search = "";
		scope.count = 10;
		scope.sortBy = {id:''};
		scope.sortDir = false;
			
		FiltersSvc.query({id:viewId}, function(data){
			scope.filters = data;
		});
		
		/**
		 * Creates pagination links
		 * returns an array of offsets [10,20,30,...]
		 */
		scope.pages = function(){
			var p = [];
			for (var a=0; a<scope.total; a+=scope.count) {
				p.push(a);
			}
			return p;
		};
				
		/**
		 * Return a list of active filter ids for appending to the url params
		 */
		scope.userFilters = function(){
			var uf = [];
			for (var a in scope.filters) {
				var f = scope.filters[a];
				if (f.state)
					uf.push(f.id);
			}
			return uf;
		};		
				
		/**
		 * Load records
		 */
		scope.load = function(){
			SubmissionSvc.get(
				{	id:		 viewId,
					offset:  scope.offset,
					search:  scope.search,
					count:   scope.count,
					sortBy:  scope.sortBy.id,
					sortDir: scope.sortDir,
					userFilters:scope.userFilters(),
					account: accountId
				}, function(){
					scope.submissions = scope.submissionSvc.submissions;
					scope.total = scope.submissionSvc.total;					
				}
			);
		};
	}])	
	.service('SubmissionHistorySvc',['$resource', 'SubmissionSvc', function($resource, SubmissionSvc){
		var scope = this;
		scope.submissionSvc = SubmissionSvc;
		
		scope.resource = $resource('data/data.submissionhistory.js');
		
		scope.query = function(params, success){
//			scope.resource.query(params,success);
						
			/**
			 * For the demo we're not getting the submission history from the server
			 * Instead, find the submission object by id and grab its valuesets
			 * Find the submission by id
			 */
			for (var s in scope.submissionSvc.submissions) {
				if (scope.submissionSvc.submissions[s].id == params.id) {
					if (success)
						success(scope.submissionSvc.submissions[s].valueSets);

					return scope.submissionSvc.submissions[s].valueSets;
				}
			}
		};		
		
		return scope;
	}])	
	.factory('SubmissionDataSvc', ['$resource', 'SubmissionSvc', function($resource, SubmissionSvc){
		var scope = this;
		scope.submissionSvc = SubmissionSvc;
		
		
		scope.get = function(params, success){
//			return scope.resource(params,success);
			
			/**
			 * For the demo we're not getting the submission history from the server
			 * Instead, find the submission object by id
			 * Find the submission by id
			 */
			for (var s in scope.submissionSvc.submissions) {
				if (scope.submissionSvc.submissions[s].id == params.id) {
					
					if (success)
						success(scope.submissionSvc.submissions[s]);

					return scope.submissionSvc.submissions[s];
				}
			}			
		};
		
		return scope;
	}])
		
	
	/**
	 * camelCase function
	 */
	.service('AliasSvc', function(){
		this.get = function(name){
			var alias = '';
			var bits = name.toLowerCase().replace(/[^a-z|0-9| ]/g, "").replace(/ +/g," ").split(" ");
			for (var a=0; a<bits.length; a++) {
				if (a==0)
					alias = bits[a];
				else
					alias += bits[a].substr(0,1).toUpperCase() + bits[a].substr(1);
			}
			return alias;
		};	    
		return this;
	})
	
		
	/**
	 * Services not used in demo
	 * Leave ViewUsersSvc declaration to avoid an error in the editor
	 * since i'm using the current source which has more features than this demo
	 */
	.service('ViewUsersSvc', ['$resource', '$http', function($resource, $http){
//		var scope = this;
//		scope.resource = $resource(contextPath+'/data/viewUsers/:id');
//				
//		scope.query = function(params,success){
//			scope.resource.query(params,function(data){
//				if (success)
//					success(data);
//			});
//		};
//		
//		scope.save = function(data, success){
//			$http.post(contextPath+'/save/users/'+accountId+'/'+viewId, data).success(function(data){
//				if (success)
//					success(data);
//			});
//		};
	}])	
		
	/**
	 * Same with these services
	 * The full app does filtering server-side and loads the 
	 * view editor pieces (options, triggers, etc) in bits 
	 * to avoid a long initial loading time on the fields editor
	 */
	.factory('FiltersSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/filters/:id');
		return $resource('data/data.filters.js');
	}])	
				
	/**
	 * Editor services not used in demo
	 */
//	.factory('AccountUsersSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/accountUsers/:id');
//	}])	
	.factory('OptionsSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/options/:id');
	}])	
	.factory('VisibilityConditionsSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/visibility/:id');
	}])	
	.factory('TriggersSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/triggers/:id');
	}])			
//	.factory('EventsSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/events/:id');
//	}])	
//	.factory('NotificationsSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/notifications/:id');
//	}])	
			
	/**
	 * User Manager Services
	 * Not used in demo
	 */
//	.factory('UserSvc', ['$resource', '$http', function($resource, $http){
//		var scope = this;
//		scope.resource = $resource(contextPath+'/data/user/:id');
//		
//		scope.user = {};
//		
//		scope.get = function(params, success){
//			scope.resource.get(params,function(data){
//				scope.user = data;
//				if (success)
//					success();
//			});
//			
//			return scope.user;
//		};
//		
//		scope.save = function(user, success){
//			if (user)
//				$http.post(contextPath+'/save/user/'+accountId, user).success(function(data){
//					if (success)
//						success(data);
//				});
//		};
//		
//		return scope;
//	}])
//	.factory('FormsSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/forms/:id');
//	}])
//	.factory('UserViewsSvc', ['$resource', function($resource){
//		return $resource(contextPath+'/data/userViews/:id');
//	}])	
	;