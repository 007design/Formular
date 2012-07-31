/**
 * Main page controller
 */

function InputViewCtrl($scope, $http, $location, ViewSvc, SubmissionSvc, AliasSvc) {
	/**
	 * Login via ajax
	 * REMOVED FOR TESTING
	 */
//	$scope.doLogin = function(u,p){
//		$scope.$emit('loginRequest', {username: u, password: p});
//	};
	
	/**
	 * Add some service instance bits to the scope
	 */
	$scope.submissionSvc = SubmissionSvc;
	$scope.viewSvc = ViewSvc;
	
	/**
	 * Configure the new submission object
	 */
	$scope.submission = { view: {id: viewId}, values:[], user:{id: userId} };
			
	/**
	 * Watch for changes in the view and update the scope view and master objects
	 */
	$scope.$watch('viewSvc.view', function(){
		$scope.view = ViewSvc.view;
		
		/**
		 * Make a copy of the view for dirty checks
		 */
		$scope.master = angular.copy($scope.view);		
	});
	
	/**
	 * Load the view
	 */	
	ViewSvc.get({id: viewId}, function(){
		/**
		 * Init any date pickers
		 */
		$('.input-datepicker').datepicker();
		
		/**
		 * Prepopulate the form
		 */
		$scope.prepopulate();
	});

	/**
	 * Extract params from query string and set field values
	 */
	$scope.prepopulate = function(){
		for (var l in $location.search()) {
			for (var a=0; a<$scope.view.viewFields.length; a++) {
				if (AliasSvc.get($scope.view.viewFields[a].label) == l) {
					$scope.view.viewFields[a].value = $location.search()[l];
				}
			}
		}
	};
	
	/**
	 * Disable the submit button if the form is invalid or they've not entered anything yet
	 */
	$scope.isSaveDisabled = function() {
		return $scope.theForm.$invalid || $scope.view == $scope.master;
	};
		
	/**
	 * Process events emitted by view field controllers
	 */
	$scope.$on('fireTriggers', function(event,source){
		
		if (!source) return;
		/**
		 * Process each trigger on the field
		 */
		angular.forEach(source.triggers, function(trigger){
			// Apply the trigger unless something fails later
			var applyTrigger = true;
			/**
			 * Process each trigger condition
			 */
			angular.forEach(trigger.triggerConditions, function(condition){
				// Get the target field
				var target = $scope.getViewField(condition.target.id);
				
				/**
				 * If the target field is a checkbox group we need to 
				 * parse the value into an array and check each element
				 */
				if (target.fieldType.id==3) {
					var vals = angular.fromJson(target.value);
					applyTrigger = false;
						
					/**
					 * Compare each checkbox value with the condition value
					 * If a match is found, set apply to true if the comparison 
					 * is EQUALS (1) or false if the comparison is NOT EQUAL
					 */
					for (var val in vals) {
						if (vals[val] == condition.value) {
							applyTrigger=condition.comparison == 1;
							break;
						}						
					}
				} 
								
				/**
				 * Target is something other than a checkbox group
				 */
				else {			
					if (condition.value === '*' && target.value && target.value.length>0)
						applyTrigger=true;
					else {
						try {
							if (condition.comparison == 1) { // EQUAL
								if (target.value.toLowerCase() != condition.value.toLowerCase()) {
									applyTrigger=false;
								}
							} else if (condition.comparison == 2) { // NOT EQUAL
								if (target.value.toLowerCase() == condition.value.toLowerCase()) {
									applyTrigger=false;
								}
							} else if (condition.comparison == 3) { // GREATER
								if (target.value <= condition.value) {
									applyTrigger=false;
								}
							} else if (condition.comparison == 4) { // LESS
								if (target.value >= condition.value) {
									applyTrigger=false;
								}
							}	
						} catch (x) {
							applyTrigger=false;
						}
					}
				}
			});
			
			/**
			 * All the trigger conditions were met, apply the trigger
			 */
			if (applyTrigger) {

				/**
				 * Obtain the target field
				 */
				var targetField = $scope.getViewField(trigger.target.id);				
				if (targetField) {
					/**
					 * Value Trigger
					 */	
					if (trigger.type.id == 1) {
						/**
						 * If the target is a checkbox group we want to parse the trigger values into a json array string
						 */
						if (targetField.type.id==3)
							targetField.value = angular.toJson(trigger.triggerValues);
						else {
							if (trigger.triggerValues[0] === "*")
								targetField.value = source.value;
							else
								targetField.value = trigger.triggerValues[0];
						}
					}
					/** 
					 * ValueSet Trigger
					 */
					else if (trigger.type.id == 2) {						
						/**
						 * Rather than simply setting the field value here we broadcast an event
						 * which tells the element to populate with the supplied values.
						 * If there are no values, it populates with the fields "master" values.
						 */
						if (trigger.triggerValues.length>0)
							$scope.$broadcast('values',{target:trigger.target.id, values:trigger.triggerValues});
						else
							$scope.$broadcast('values',{target:trigger.target.id});						
					}
					/**
					 * URL ValueSet Trigger 
					 */
					else if (trigger.type.id == 3) {
						if (trigger.triggerValues.length>0) {
							(function(trigger){				
								/**
								 * Replace {{val}} in the url string with the selected field value
								 */
								var url = trigger.triggerValues[0].value.replace(/\{\{val\}\}/g, source.value.value);
															
								$http.get(url).success( function(data){
									// Sort the returned data
									data.sort();
																		
									var vals = [];
									angular.forEach(data, function(d){
										vals.push({value: d});
									});

									/**
									 * Add an 'Other' option if the field has the custom flag
									 */
									if (targetField.custom)
										vals.push({id:'other',value:'Other'});

									$scope.$broadcast('values',{target:targetField.id, values:vals});
								}).error(function(data){
									alert("error retrieving values");
								});
							})(trigger);
						} else {
							$scope.$broadcast('values',{target:trigger.target.id});
						}
					}
				}
			}
				
		});
		
		/**
		 * Emit an event to make the viewfields re-evaluate their visibilityConditions
		 */
		$scope.$broadcast('updateVisibility');
		
		/**
		 * Populate the submission object
		 */
		$scope.updateSubmissionObject();		
	});
		
	/**
	 * Build the submission object.
	 * Update submission is called after a trigger event is handled, 
	 * i.e. a viewfield's value has changed.
	 */
	$scope.updateSubmissionObject = function() {	
		angular.forEach($scope.view.viewFields, function(vf,i){
			if (vf.visibility) {
				if (vf.value && vf.value != null) {
					$scope.submission.values[i] = {};
					$scope.submission.values[i].value = vf.value;
					$scope.submission.values[i].viewField = {id:vf.id, fieldType:{id:vf.fieldType.id}};
					$scope.submission.values[i].field = vf.field;
				}
			} 
		});
	};
	
	/**
	 * Helper function
	 * Returns the viewfield object with the specified id
	 */
	$scope.getViewField = function(viewFieldId) {
		for (var a in $scope.view.viewFields)
			if ($scope.view.viewFields[a].id == viewFieldId)
				return $scope.view.viewFields[a];
	};
	
	/**
	 * Send the submission object to the server
	 */	
	$scope.save = function() {
		$('.save-button').hide();
		
		$scope.submissionSvc.save(viewId, $scope.submission, function(data){
			$('.save-button').show();

//			angular.forEach($scope.view.viewFields, function(vf,i){
//				vf.value = '';
//			});
			
			/**
			 * Don't actually post to the server in the demo
			 */
//			if (data.success)			
//				window.location.href = contextPath+'/thankyou/'+accountId+'/'+viewId+'/'+data.id;
//			else 
//				alert(data.message);
		});
	};
	
}

/**
 * Controller for individual view fields
 */
function ViewFieldCtrl($scope, AliasSvc) {
	
	$scope.masterOptions = [];
	$scope.checkboxValues = {};
	$scope.customSelectValue = {};
	
	/**
	 * On init
	 */
	$scope.$watch('viewField', function(){	
		$scope.alias = AliasSvc.get($scope.viewField.label);
				
		
		/**
		 * Examine each viewField option for the url pattern
		 * If any options are formatted like {url:xxx} attempt to get an options array from the url
		 */
		for (var a=0; a<$scope.viewField.options.length; a++) {
			var urlMatch = $scope.viewField.options[a].value.match(/{url:.+}/);
			if (urlMatch) {
				var url = urlMatch[0].substring(5,urlMatch[0].length-1);
				
				/**
				 * Try getting options from the url
				 */
				try {
					(function(a) {$.getJSON(url, function(data){
						// Remove the url value
						$scope.viewField.options.splice(a,1);
						
						// Add the new options
						for (var b in data) {
							$scope.viewField.options.push({value: data[b]});
							$scope.$apply();
						}
					});})(a);
				} catch (x) {
					console.log(x);
				}
			}
				
		}
		
		
		/**
		 * Make a copy of the field for checks
		 */
		$scope.masterOptions = angular.copy($scope.viewField.options);
		
		/**
		 * Evaluate the viewfields script property
		 * This is almost certainly broken
		 *
		if ($scope.viewField.script) {
			$(document).ready(function(){
				var funcString = function() {
					eval("var element = $('#inputElement-"+AliasSvc.get($scope.viewField.label)+"');"+
					$scope.viewField.script);
				};
				
				setTimeout(funcString, 2000);
			});			
		}
		*/
			
	});    

	/**
	 * Returns true if the field is both required and visible
	 */
	$scope.isRequired = function(){
		return $scope.viewField.required && $scope.viewField.visibility;
	};

	/**
	 * Fired when any field's value changes
	 * Reevaluate the visibility conditions of the field
	 */
	$scope.$on('updateVisibility', function(){
		var visibility;

		/**
		 * Process each condition
		 */ 
		for (var a=0; a<$scope.viewField.visibilityConditions.length; a++) {
			var condition = $scope.viewField.visibilityConditions[a];
			
			/**
			 * If visibility has already been assigned a value
			 * Evaluate the join type of the condition
			 */
			if (visibility) {
				/**
				 * If the join type is 1 (OR) check the visibility var
				 */
				if (condition.join == 1) {
					/**
					 * If the visibility var is 'visible' we've met all the conditions
					 * for the previous round of conditions
					 * Break out of the loop
					 */
					if (visibility == 'visible') {
						break;
					}
				} 

				/**
				 * If the join type is 0 (AND) and the visibility is 'hidden', skip to the next condition 
				 */
				else if (condition.join == 0) {
					if (visibility == 'hidden') {
						continue;
					}
				}
			}

			/**
			 * Visibility has not been assigned a value yet (i.e. on the first array element)
			 * Or visibility is 'hidden' and the next condition is joined with OR
			 */

			var target = $scope.$parent.getViewField(condition.target.id);

			/**
			 * If the target field is visible
			 */
			if (target.visibility) {   		 
				/**
				 * If the target field is a checkbox group we need to 
				 * parse the value into an array and check each element
				 */
				if (target.fieldType.id==3) {
					var vals = angular.fromJson(target.value);

					/**
					 * Compare each checkbox value with the condition value
					 * If a match is found, set apply to true if the comparison 
					 * is EQUALS (1) or false if the comparison is NOT EQUAL
					 */
					if (vals)
						for (var v=0; v<vals.length; v++) {
							var val = vals[v];
							if (val.toLowerCase() == condition.value.toLowerCase()) {
								visibility = condition.comparison == 1 ? 'visible' : 'hidden';
								break;
							}						
						}
				} 

				/**
				 * Target is something other than a checkbox group
				 */
				else {			
					if (condition.value === '*' && target.value && target.value.length>0)
						visibility = 'visible';
					else {
						if (condition.value && target.value) {
							try {
								if (condition.comparison == 1) { // EQUAL
									visibility = target.value.toLowerCase() == condition.value.toLowerCase() ? 'visible' : 'hidden';    						 
								} else if (condition.comparison == 2) { // NOT EQUAL
									visibility = target.value.toLowerCase() == condition.value.toLowerCase() ? 'hidden' : 'visible';
								}
							} catch (x) {
								visibility = 'hidden';
							}
						} else {
							visibility = 'hidden';
						}
					}
				}    
			}
		}

		/**
		 * Set the visibility
		 */
		if ($scope.viewField.visibilityConditions.length>0)
			$scope.viewField.visibility = visibility == 'visible';
	});

	/**
	 * Value Set event listener
	 */
	$scope.$on('values', function(event, args){
		/**
		 * If this field is the target of the trigger
		 */
		if ($scope.viewField.id == args.target) {
			
			/**
			 * Populate with supplied vals
			 */
			if (args.values) {
				$scope.viewField.options = angular.copy(args.values);
			} 
			
			/**
			 * Populate with "original" vals
			 */
			else {
				$scope.viewField.options = angular.copy($scope.masterOptions);
			}

			/**
			 * If the field has the custom flag, add an "Other" option
			 */
			if ($scope.viewField.custom)
				$scope.viewField.options.push({id:'other',value:'Other'});
		}
	});	
}