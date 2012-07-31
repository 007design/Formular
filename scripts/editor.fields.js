function ViewFieldsListCtrl($scope, EditorSvc, FieldsSvc) {

	$scope.editorSvc = EditorSvc;
	
	$scope.fieldTypes = FIELD_TYPES;

	/**
	 * Load the fields
	 */
	$scope.$watch('editorSvc.view', function(){
		
		if ($scope.editorSvc.view)
			if (!$scope.editorSvc.view.viewFields)
				FieldsSvc.query({id: $scope.editorSvc.view.id}, function(data){			
					$scope.editorSvc.view.viewFields = data;
					$scope.editorSvc.master.view.viewFields = angular.copy(data);
				});
	});
	
	$scope.previewClass = function(){
		return $scope.showPreview ? 'span7' : 'span12';
	};
	
	/**
	 * Add a new viewfield
	 */
	$scope.addField = function() {
		if (!$scope.editorSvc.view.viewFields) $scope.editorSvc.view.viewFields = [];		
		$scope.editorSvc.view.viewFields.push({sequence:$scope.editorSvc.view.viewFields.length+1});
	};
	
	/**
	 * Helper function to determine if there are any unassigned Form Fields
	 * Used to show/hide the "New View Field" button
	 */
	$scope.fieldsRemaining = function(){
		if ($scope.editorSvc.view && $scope.editorSvc.form)
			if ($scope.editorSvc.view.viewFields && $scope.editorSvc.form.fields)
				return $scope.editorSvc.view.viewFields.length < $scope.editorSvc.form.fields.length;
		return true;
	};
	
	/**
	 * Filter that restricts viewfield's master field selection to unselected fields
	 */
//	$scope.remainingFormFields = function(vf){
//		var fields = [];
//		angular.forEach($scope.editorSvc.form.fields, function(f){
//			var add = true;
//			angular.forEach($scope.editorSvc.view.viewFields, function(v){
//				if (v.field)
//					if (v.field.id == f.id && vf.id != v.id)
//						add = false;
//			});
//			if (add)
//				fields.push(f);
//		});
//		return fields;
//	};	
}

function ViewFieldEditorCtrl($scope, $filter, EditorSvc, OptionsSvc, TriggersSvc, VisibilityConditionsSvc) {
	$scope.editorSvc = EditorSvc;
	
	/**
	 * This is set when the constructor is initialized by the repeater
	 * It sets this property to the repeat instance
	 * Doesn't need to be declared like this but i'm doing it so i remember it exists
	*/
	$scope.viewField = {};	
		
	$scope.triggerTypes = TRIGGER_TYPES;
	$scope.comparisonTypes = COMPARISON_TYPES;
	
	$scope.newTriggerValue = {};
	
	/**
	 * Watch for changes to the viewfields 'form field property'
	 */
	$scope.$watch('viewField.field', function(){
		// Auto-populate the label if it's empty
		if ($scope.viewField.field && !$scope.viewField.label) {
			for (var a=0; a<$scope.editorSvc.form.fields.length; a++) {
				if ($scope.editorSvc.form.fields[a].id == $scope.viewField.field.id) {
					$scope.viewField.label = $scope.editorSvc.form.fields[a].name;
					break;
				}
			}
		}
		// Unselect any other vf's with this master field
		angular.forEach($scope.editorSvc.view.viewFields, function(vf){
			if (!angular.equals(vf, $scope.viewField))
				if (angular.equals(vf.field, $scope.viewField.field))
					vf.field = null;
		});
	});
	
	$scope.moveDown = function(i) {
		var sortedViewFilters = $filter('orderBy')($scope.editorSvc.view.viewFields, 'sequence');
		sortedViewFilters[i].sequence = sortedViewFilters[i].sequence + 1;

		if (sortedViewFilters[i+1])
			sortedViewFilters[i+1].sequence = sortedViewFilters[i+1].sequence - 1;  
	};
	
	$scope.moveUp = function(i) {
		var sortedViewFilters = $filter('orderBy')($scope.editorSvc.view.viewFields, 'sequence');
		sortedViewFilters[i].sequence = sortedViewFilters[i].sequence - 1;

		if (sortedViewFilters[i-1])
			sortedViewFilters[i-1].sequence = sortedViewFilters[i-1].sequence + 1;		
	};
	
	$scope.isActive = function(b) {
		return b ? "active" : '';
	};
	
	/**
	 * Get the form-level options for this viewfield
	 */
	$scope.formOptions = function() {
		var o = [];
		if ($scope.editorSvc.form)
			angular.forEach($scope.editorSvc.form.fields, function(v,k){
				if ($scope.viewField.field)
					if (v.id == $scope.viewField.field.id)
						angular.forEach(v.fieldOptions, function(v2,k2){
							o.push( v2 );
						});
			});
		return o;
	};
		
	/**
	 * Show the options editor and load the options for this viewfield
	 * Only load options for viewfields that have an id
	 */
	$scope.$watch('showOptions', function(){
		if ($scope.showOptions)
			if (!$scope.viewField.viewOptions) 
				OptionsSvc.query({id: $scope.viewField.id}, function(data){		
					$scope.viewField.viewOptions = data;
					
					for (var a=0; a<$scope.editorSvc.master.view.viewFields.length; a++) {
						if ($scope.editorSvc.master.view.viewFields[a].id)
							if ($scope.editorSvc.master.view.viewFields[a].id == $scope.viewField.id)
								$scope.editorSvc.master.view.viewFields[a].viewOptions = angular.copy(data);
					}
				});
	});
	
	/**
	 * Show the triggers editor and load the triggers for this viewfield
	 * Only load triggers for viewfields that have an id
	 */
	$scope.$watch('showTriggers', function() {
		if ($scope.showTriggers)
			if (!$scope.viewField.triggers && $scope.viewField.id)
				TriggersSvc.query({id: $scope.viewField.id}, function(data){
					$scope.viewField.triggers = data;
					
					for (var a=0; a<$scope.editorSvc.master.view.viewFields.length; a++) {
						if ($scope.editorSvc.master.view.viewFields[a].id)
							if ($scope.editorSvc.master.view.viewFields[a].id == $scope.viewField.id)
								$scope.editorSvc.master.view.viewFields[a].triggers = angular.copy(data);
					}
				});
	});
	
	/**
	 * Show the visibility conditions editor and load the conditions
	 */
	$scope.$watch('showVisCond', function() {
		if ($scope.showVisCond)
			if (!$scope.viewField.visibilityConditions && $scope.viewField.id)
				VisibilityConditionsSvc.query({id: $scope.viewField.id}, function(data){
					$scope.viewField.visibilityConditions = data;
					
					for (var a=0; a<$scope.editorSvc.master.view.viewFields.length; a++) {
						if ($scope.editorSvc.master.view.viewFields[a].id)
							if ($scope.editorSvc.master.view.viewFields[a].id == $scope.viewField.id)
								$scope.editorSvc.master.view.viewFields[a].visibilityConditions = angular.copy(data);
					}
				});
	});
	
	/**
	 * Add an option
	 */
	$scope.addOption = function() {	
		if (!$scope.viewField.viewOptions)
			$scope.viewField.viewOtions = [];
		
		$scope.viewField.viewOptions.push(angular.copy($scope.newOption));
		$scope.newOption = "";
	};
	
	/**
	 * Set the "default" property of all other options to false when an option is spec'd as default 
	 */
	$scope.setDefault = function(option) {
		angular.forEach($scope.viewField.options, function(v,i){
			if (!angular.equals(v, option))
				v.defaultValue = false;
		});
	};
		
	/**
	 * Add a trigger
	 */
	$scope.addTrigger = function() {
		if (!$scope.viewField.triggers)
			$scope.viewField.triggers = [];
			
		$scope.viewField.triggers.push({triggerConditions:[{
			target: { id: $scope.viewField.id },
		}], triggerValues:[]});
	};
	
	/**
	 * Add a trigger value
	 */
	$scope.addTriggerValue = function(trigger) {
		if (!trigger.triggerValues)
			trigger.triggerValues = [];
		
		trigger.triggerValues.push(angular.copy($scope.newTriggerValue));
		$scope.newTriggerValue = {};
	};

	/**
	 * Add a trigger condition
	 */
	$scope.addCondition = function(trigger) {
		if (!trigger.triggerConditions)
			trigger.triggerConditions = [];
		
		trigger.triggerConditions.push({});
	};
	
	/**
	 * Add visibility condition
	 */
	$scope.addVisCondition = function() {
		if (!$scope.viewField.visibilityConditions)
			$scope.viewField.visibilityConditions = [];
		$scope.viewField.visibilityConditions.push({target:{}});
	};
}