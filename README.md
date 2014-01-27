```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Formulate Docs</title>

<!-- styles -->
<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.0.4/css/bootstrap-combined.min.css">

<style>
	.nav li { border-bottom:1px solid #e6e6e6; padding-left:5px;}
</style>

<!-- scripts -->
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular-resource.min.js"></script>
<script type="text/javascript" src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.0.4/js/bootstrap.min.js"></script>

</head>
<body>

	<div class="container-fluid">
		<div class="row-fluid">
			<!-- Begin TOC Span -->
			<div class="span2">
				<div class="well">
					<ul class="nav">
						<li><a href="#terms">Terms / Concepts</a></li>
						<li><a href="#inputView">Input View</a></li>						
						<li><a href="#dashboardView">Dashboard View</a></li>
						<li><a href="#updateView">Update View</a></li>
						<li>
							<a href="#managerView">Manager View</a>
							<ul class="nav" style="margin-left:15px;">
								<li><a href="#managerView">User Manager View</a></li>
								<li><a href="#adminManagerView">Admin Manager View</a></li>
							</ul>
						</li>
						<li>
							<a href="#editorView">Editor View</a>
							<ul class="nav" style="margin-left:15px;">
								<li><a href="#editorView-toolbar">Toolbar</a></li>
								<li><a href="#editorView-viewOptions">View Options</a></li>
								<li>
									<a href="#editorView-viewFieldsEditor">View Fields Editor</a>
									
									<ul class="nav" style="margin-left:15px;">
										<li><a href="#editorView-viewFieldsEditor-field">Field Properties</a></li>
										<li><a href="#editorView-viewFieldsEditor-options">Options</a></li>
										<li><a href="#editorView-viewFieldsEditor-triggers">Triggers</a></li>
										<li><a href="#editorView-viewFieldsEditor-viscond">Visibility Conditions</a></li>										
										<li><a href="#editorView-viewFieldsEditor-desc">Description / Scripts</a></li>
									</ul>
								</li>
								<li><a href="#editorView-notificationsEditor">Notifications Editor</a></li>
								<li><a href="#editorView-eventsEditor">Events Editor</a></li>
								<li><a href="#editorView-filtersEditor">Filters Editor</a></li>
								<li><a href="#editorView-viewUsersEditor">View Users Editor</a></li>
								<li><a href="#editorView-formEditor">Form Editor</a></li>
							</ul>
						</li>
						<li><a href="#userAccess">User Access</a></li>
						<li><a href="#stylingAndScripting">Styling and Scripting Views</a></li>
						<li><a href="#jsonSubmissions">JSON Submissions [Web Services]</a></li>
						<li><a href="#credits">Credits, Libraries &amp; Licenses</a></li>
					</ul>
				</div>
			</div>
			<!-- End TOC Span -->
			
			<!-- Begin Content Span -->
			<div class="span10">			
				<!-- Terms -->
				<a name="terms"></a>
				<h1>Terms / Concepts</h1>
				<div class="well">
					<dl>
						<dt>INPUT VIEW</dt>
						<dd>A VIEW used for entering new SUBMISSIONs into the system.</dd>
											
						<dt>DASHBOARD VIEW</dt>					
						<dd>A VIEW for displaying the history of submissions to a
							particular form (note, that is submissions to a FORM, not a single
							VIEW).</dd>
						
						<dt>UPDATE VIEW</dt>
						<dd>A VIEW for updating the values of an existing SUBMISSION</dd>
						
						<dt>ACCOUNT</dt>
						<dd>All Users and all Views belong to an ACCOUNT. Primarily
							this is for implementing access restrictions. A USER may only
							access VIEWs which are in their ACCOUNT.</dd>
						
						<dt>ALIAS</dt>
						<dd>ACCOUNTs and VIEWs have a property called Alias which is the
							name of the account or view converted into an alphanumeric, camel
							case string. So, for example, the view "My First View" would have
							an alias of "myFirstView"</dd>
						
						<dt>USER</dt>
						<dd>A simple user definition describing a username and
							password as well as an account. All users are associated with a
							single ACCOUNT and may or may not be ADMINs.</dd>
						
						<dt>ADMIN</dt>
						<dd>ADMIN users have the ability to edit FORMs and create new
							VIEWs</dd>
						
						<dt>FORM</dt>
						<dd>
							A FORM is a collection of FIELDS representing every piece of
							information you may want to collect. <br />Note that FORMs are not
							tied to an account.</dd>
						
						<dt>FIELD</dt>
						<dd>
							A FIELD represents one piece of information. This could be
							directly related to an HTML field like "Product Type" or "Part
							Number but it may also represent other data, for example,
							"Submission Status" or "Currently Assigned To". <br />Note that
							since FORMs are not tied to an ACCOUNT a single FIELD may be part
							of more than one VIEW.</dd>
						
						<dt>OPTION</dt>
						<dd>OPTIONs make up the list of possible values for an HTML
							field. For example, given a &lt;select&gt; (dropdown) control, the
							possible selections would be considered OPTIONs</dd>
							
						<dt>FORM OPTION</dt>
						<dd>A FORM OPTION is an option which cannot be removed or
							altered by a user with EDIT VIEW permission, only ADMIN users can
							modify FORM OPTIONs. The purpose of this is to allow other users
							to configure VIEWs but to ensure that some options are always
							present.</dd>
							
						<dt>VIEW</dt>
						<dd>A VIEW is a subset of FIELDS from one particular FORM.
							Let's say that you have a FORM with these three FIELDs: "Product
							Owner", "Product Type", and "Part Number". Now, say that most of
							your users will be filling out all three fields when submitting a
							request. However, perhaps you have another set of users which is
							only allowed to submit one "Product Type". They would not need to
							see the "Product Type" field as it's not applicable to them. In
							this case you could create two VIEWs one of which would include
							all three fields while the other included only "Product Owner" and
							"Part Number".</dd>
							
						<dt>USER VIEW</dt>
						<dd>A USER VIEW is a database object which indicates that a
							given user has access to a given view. ADMIN users may always
							access every VIEW in their ACCOUNT but non-admin users must have
							each VIEW assigned to them. This assignment creates a USER VIEW.</dd>
							
						<dt>VIEW FIELD</dt>
						<dd>A VIEW FIELD is associated with a particular VIEW and a
							particular FIELD. Using the example in the description of VIEW,
							the first set of users would have 3 VIEW FIELDS while the second
							set would have only 2. VIEW FIELDs have properties which relate to
							an HTML form field like "field label" and "is required". The
							second set of users from the example would have two VIEW FIELDs,
							"Product Owner" and "Part Number". Let's say that these users have
							a different term for "Part Number", they call it "Product ID". You
							can assign the label "Product ID" to the VIEW FIELD representing
							"Part Number" so that the user sees the text "Product ID" but the
							value for this field in their submission will still be tied to the
							"Part Number" FORM FIELD. In this way you can have several VIEW
							FIELDs with different names and properties (one is required,
							another is not, etc) which will all tie their values back to a
							single FORM FIELD so the submissions from multiple VIEWs may be
							viewed together in a common DASHBOARD VIEW.</dd>
						
						<dt>FIELD TYPE</dt>
						<dd>Each VIEW FIELD has a FIELD TYPE which determines the type
							of HTML control that will be displayed in the INPUT VIEW and
							UPDATE VIEW. Examples are "text field", "drop down", "checkbox
							group", etc.</dd>
							
						<dt>VIEW OPTION</dt>
						<dd>A VIEW OPTION is an OPTION which may be modified or
							removed by any user with EDIT VIEW permission.</dd>
						
						<dt>TRIGGER</dt>
						<dd>A TRIGGER represents a client-side event which is fired
							when the user modifies a VIEW FIELD say by selecting an option
							from a drop down or checking a checkbox. TRIGGERs modify the
							values of other VIEW FIELDs on the page.</dd>
						
						<dt>TRIGGER TYPE</dt>
						<dd>There are 3 TRIGGER TYPEs.
							<ol>
								<li>VALUE TRIGGER - sets the value of a field (selects an
									option in a dropdown, marks a checkbox, etc.)</li>
								<li>VALUESET TRIGGER - replaces the OPTIONS of a VIEW FIELD
									with a given set. An example would be selecting Honda in one
									dropdown and having a second dropdown automatically populated
									with Accord, Camry, Civic, etc.</li>
								<li>URL VALUESET - same as a VALUESET but the options,
									rather than being statically defined, are retrieved from a URL</li>
							</ol>
						</dd>
						
						<dt>TRIGGER VALUE</dt>
						<dd>In the case of a VALUE TRIGGER, the value to which the
							target field will be set. In the case of a VALUESET, the options
							which are to replace those of the target field.</dd>
							
						<dt>TRIGGER CONDITION</dt>
						<dd>Conditions which must be met in order for a trigger to be
							applied.</dd>
							
						<dt>VISIBILITY CONDITION</dt>
						<dd>Conditions which must be met for a VIEW FIELD to be shown
							(if it is hidden).</dd>
							
						<dt>EVENT</dt>
						<dd>An event is triggered in response to a submission. Events
							update submission values. An example would be automatically
							changing the "status" of an submission to "updated" when the
							submission is updated.</dd>
							
						<dt>EVENT CONDITION</dt>
						<dd>Conditions which must be met for an event to be triggered.</dd>
						
						<dt>NOTIFICATION</dt>
						<dd>An email which will be sent out when either a form is
							submitted or when a submission is updated.</dd>
						
						<dt>FILTER</dt>
						<dd>Adds a button to the DASHBOARD VIEW which, when selected,
							will filter the submissions displayed.</dd>
						
						<dt>SUBMISSION</dt>
						<dd>A submission to a VIEW</dd>
					</dl>
				</div>
				
				<a name="inputView"></a>
				<div class="pull-right" style="color:#aaa"><h4>URL Format: /formulate/<span style="color:#000">form</span>/[<i>account alias</i>]/[<i>view alias</i>]</h4></div>
				<h1>Input View</h1>
				<div class="well">
					<div class="pull-right">
						<span class="thumbnail" style="background-color:#fff"><img src="docs/fig1-inputView.jpg"/></span>
					</div>

					<p>The INPUT VIEW is what you would most easily think of as a
						"standard web form". It consists of empty field inputs each
						representing a VIEW FIELD in the VIEW configuration.</p>
					<p>The screenshot to the right shows an INPUT VIEW with one
						field of each possible type. Note that the datepicker looks like a
						regular textfield until it is selected.
						<br/>Here is a brief description of each type of field.</p>

					<a name="inputView-textField"></a>
					<blockquote>
						<dl>
							<dt>Text Field</dt>
							<dd>A basic text field</dd>
							
							<dt>Datepicker</dt>
							<dd>A popup datepicker</dd>
							
							<dt>Drop Down</dt>
							<dd>A single-selection, drop-down list</dd>
							
							<dt>Checkbox Group</dt>
							<dd>A set of checkboxes, each with a separate option, which
								can be independently selected. Note that the checkboxes are not
								individual FIELDs but instead the entire group of checkboxes is a
								single VIEW FIELD.</dd>
								
							<dt>Radio Buttons</dt>
							<dd>A group of radio buttons only one of which may be selected.</dd>
							
							<dt>Textarea</dt>
							<dd>A multi-row text area</dd>
							
							<dt>Upload</dt>
							<dd>An asynchronous, multi-file upload control. Unlike the
								standard HTML upload field, files are uploaded asynchronously
								meaning that as soon as the user selects a file it begins to
								upload without the user being required to click submit. The file
								upload progress will be shown while the file uploads and the
								upload action may be canceled at any time. Also note that, unlike
								the standard control, the user is able to upload more than one
								file.</dd>
							
						</dl>
					</blockquote>
					
					MORE STUFF GOES HERE
					
					<div style="clear:both"></div>
				</div>
				
				<a name="dashboardView"></a>
				<div class="pull-right" style="color:#aaa"><h4>URL Format: /formulate/<span style="color:#000">dashboard</span>/[<i>account alias</i>]/[<i>view alias</i>]</h4></div>
				<h1>Dashboard View</h1>
				<div class="well">
					<div class="pull-right">
						<span class="thumbnail" style="background-color:#fff"><img src="docs/fig2-dashboardView.jpg"/></span>
					</div>
					
					<h4>Submission Rows</h4>
					<p>Each row in the table represents a submission object. The values
						displayed are the current submission values. That is, if a
						submission is updated these values will reflect the updated value
						rather than the initial value of the field.</p>
					<p>Clicking on the table header will sort the table by that column.
						Clicking again will sort in the opposite direction. An arrow will
						be displayed indicating the sort column and direction.</p>
					<p>Submission fields may have multiple values in the case of
						checkbox or upload input controls. In this case, the values will
						be displayed in a list. Upload fields values link to the uploaded
						file.</p>

					<h4>Filter Buttons</h4>
					<p>In the top left corner are displayed Filter Toggle buttons.
						These buttons will filter the list of submissions by specific
						criteria. See the editor section for more information about
						filters.</p>

					<h4>Search</h4>
					<p>The search field in the top right corner will filter the
						submissions based upon a search term. The search will be performed
						against all fields in the submission.</p>

					<h4>Pagination</h4>
					<p>By default, 10 records at a time will be displayed. The label below the pagination will display the total number of records.</p>
						
					<div style="clear:both"></div>
					
					<div class="pull-right">
						<span class="thumbnail" style="background-color:#fff"><img src="docs/fig3-dashboardHistory.jpg"/></span>
					</div>
					<h4>History</h4>
					<p>Clicking the History button opens a popup showing the history of
						the selected submission. Each submissions event is displayed as a
						row with the final column containing the user who submitted the
						values and the date the submission was made.</p>
						
					<h4>Edit Button</h4>
					<p>If the form has both the Dashboard View and the Update View
						enabled, the edit button will open an Update View for the selected
						submission in a popup.</p>

					<div style="clear:both"></div>
				</div>
				
				<a name="updateView"></a>
				<div class="pull-right" style="color:#aaa"><h4>URL Format: /formulate/<span style="color:#000">update</span>/[<i>account alias</i>]/[<i>view alias</i>]/[<i>submission id</i>]</h4></div>
				<h1>Update View</h1>
				<div class="well">
					<div class="pull-right">
						<span class="thumbnail" style="background-color:#fff"><img src="docs/fig3-updateView.jpg"/></span>
					</div>
					TEXT HERE
					<div style="clear:both"></div>
				</div>
								
				<a name="managerView"></a>
				<div class="pull-right" style="color:#aaa"><h4>URL Format: /formulate/<span style="color:#000">manager</span>/[<i>account alias</i>]</h4></div>
				<h1>Manager View - User</h1>
				<div class="well">
					<div class="pull-right">
						<span class="thumbnail" style="background-color:#fff"><img src="docs/fig4-managerView.jpg"/></span>
					</div>
										
					<h4>User Account Editor</h4>
					
					<h4>Views List</h4>
				</div>
								
				<a name="adminManagerView"></a>
				<h1>Manager View - Admin</h1>
				<div class="well">
					<div class="pull-right">
						<span class="thumbnail" style="background-color:#fff"><img src="docs/fig5-adminManagerView.jpg"/></span>
					</div>
					
					<h4>Account Users Editor</h4>
					
					<h4>Views List</h4>
					
					<h4>Form Editor</h4>
				</div>
								
				<a name="editorView"></a>
				<div class="pull-right" style="color:#aaa"><h4>URL Format: /formulate/<span style="color:#000">edit</span>/[<i>account alias</i>]/[<i>view alias</i>]</h4></div>
				<h1>Editor View</h1>
				<div class="well">
					<div class="pull-right">
						<span class="thumbnail" style="background-color:#fff"><img src="docs/fig6-editorView.jpg"/></span>
					</div>
					
					<a name="editorView-toolbar"></a>
					<h4>Toolbar Links</h4>
					
					<a name="editorView-viewOptions"></a>
					<h4>View Options</h4>
					
					<a name="editorView-viewFieldsEditor"></a>
					<h4>View Fields Editor</h4>
					
					<div class="margin-left:20px;">
						<a name="editorView-viewFieldsEditor-field"></a>
						<h4>Field Properties</h4>
						<a name="editorView-viewFieldsEditor-options"></a>
						<h4>Options</h4>
						<a name="editorView-viewFieldsEditor-triggers"></a>
						<h4>Triggers</h4>
						<a name="editorView-viewFieldsEditor-viscond"></a>
						<h4>Visibility Conditions</h4>
						<a name="editorView-viewFieldsEditor-desc"></a>
						<h4>Description / Scripts</h4>
					</div>
					
					<a name="editorView-notificationsEditor"></a>
					<h4>Notifications Editor</h4>
					
					<a name="editorView-eventsEditor"></a>
					<h4>Events Editor</h4>
					
					<a name="editorView-filtersEditor"></a>
					<h4>Filters Editor</h4>
					
					<a name="editorView-viewUsersEditor"></a>
					<h4>View Users Editor</h4>
					
					<a name="editorView-formEditor"></a>
					<h4>Form Editor</h4>
				</div>
				
				<a name="userAccess"></a>
				<h1>User Access</h1>
				<div class="well">
					TEXT HERE
				</div>
				
				<a name="stylingAndScripting"></a>
				<h1>Styling and Scripting Views</h1>
				<div class="well">
					TEXT HERE
				</div>
				
				<a name="jsonSubmissions"></a>
				<h1>JSON Submissions [Web Services]</h1>
				<div class="well">
					TEXT HERE
				</div>
				
				<a name="jsonSubmissions"></a>
				<h1>Credits, Libraries &amp; Licenses</h1>
				<div class="well">
					Formulate makes use of the following Java Libraries:
					<ul>
						<li><b>Stripes 1.5.6</b> - <a href="http://stripesframework.org">http://www.stripesframework.com</a></li>
						<li><b>ORM Lite 4.4.0</b> - <a href="http://www.ormlite.com">http://www.ormlite.com</a></li>
						<li><b>Jackson 1.9.5</b> - <a href="http://jackson.codehaus.org/">http://jackson.codehaus.org/</a></li>
						<li><b>GSON</b> - <a href="http://code.google.com/p/google-gson/">http://code.google.com/p/google-gson/</a></li>
						<li><b>Apache Velocity 1.7</b> - <a href="http://velocity.apache.org/">http://velocity.apache.org/</a></li>
						<li><b>Apache log4j 1.2</b> - <a href="http://logging.apache.org/log4j/1.2/">http://logging.apache.org/log4j/1.2/</a></li>						
						<li><b>Apache Commons</b> - beanutils, collections, fileupload, io, lang, logging, validator</li>
					</ul>
					All of the above libraries are available under the Apache 2.0 license - <a href="http://www.apache.org/licenses/LICENSE-2.0">http://www.apache.org/licenses/LICENSE-2.0</a>
					
					<br/><br/>
					
					The browser interface for Formulate is built using the Google Angular JS framework - <a href="http://angularjs.org">http://angularjs.org</a>
					<br/>
					and the Twitter Bootstrap CSS framework - <a href="http://twitter.github.com/bootstrap">http://twitter.github.com/bootstrap</a>
					
					<br/><br/>
					
					Formulate was written by Daniel Hinds-Bond - <a href="http://007design.com">http://007design.com</a>			
				</div>
				
			</div>
			<!-- End Content Span -->
			
		</div>
	</div>

</body>
</html>
```
