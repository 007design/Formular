{
    "id": 4,
    "form": {
        "id": 1
    },
    "account": {
        "id": 3
    },
    "name": "Product Info Form",
    "requireUser": false,
    "requirePassword": false,
    "enableInput": true,
    "enableDashboard": true,
    "enableUpdate": true,
    "submitText": "Submit",
    "viewFields": [{
        "id": 1,
        "field": {
            "id": 1
        },
        "fieldType": {
            "id": 2,
            "name": "drop down"
        },
        "sequence": 1,
        "editable": true,
        "visibility": true,
        "required": true,
        "custom": false,
        "regEx": ".+",
        "label": "Form Type",
        "script": "",
        "value": "New Product",
        "description": "",
        "visibilityConditions": [],
        "triggers": [],
        "viewOptions": [{
            "id": 1,
            "value": "New Product",
            "defaultValue": true,
            "sequence": 1
        }, {
            "id": 2,
            "value": "Updated Info for Existing Product",
            "defaultValue": false,
            "sequence": 2
        }]
    }, {
        "id": 2,
        "field": {
            "id": 2
        },
        "fieldType": {
            "id": 1,
            "name": "text field"
        },
        "sequence": 2,
        "editable": true,
        "visibility": true,
        "required": true,
        "custom": false,
        "regEx": ".+",
        "label": "Part Number",
        "script": "",
        "value": null,
        "description": "",
        "visibilityConditions": [],
        "triggers": [],
        "viewOptions": []
    }, {
        "id": 3,
        "field": {
            "id": 3
        },
        "fieldType": {
            "id": 1,
            "name": "text field"
        },
        "sequence": 3,
        "editable": true,
        "visibility": true,
        "required": true,
        "custom": false,
        "regEx": ".+",
        "label": "Title",
        "script": "",
        "value": null,
        "description": "",
        "visibilityConditions": [],
        "triggers": [],
        "viewOptions": []
    }, {
        "id": 4,
        "field": {
            "id": 4
        },
        "fieldType": {
            "id": 2,
            "name": "drop down"
        },
        "sequence": 4,
        "editable": true,
        "visibility": true,
        "required": false,
        "custom": true,
        "regEx": ".+",
        "label": "Category Level 1",
        "script": "",
        "value": null,
        "description": "",
        "visibilityConditions": [],
        "triggers": [{
            "id": 1,
            "type": {
                "id": 2,
                "name": "valueset"
            },
            "target": {
                "id": 5,
                "fieldType": {
                    "id": 2
                }
            },
            "triggerValues": [{
                "id": 1,
                "value": "Business Cards",
                "sequence": 1
            }, {
                "id": 2,
                "value": "Letterhead",
                "sequence": 2
            }, {
                "id": 3,
                "value": "Envelopes",
                "sequence": 3
            }, {
                "id": 4,
                "value": "Notepads",
                "sequence": 4
            }, {
                "id": 5,
                "value": "Notecards",
                "sequence": 5
            }],
            "triggerConditions": [{
                "id": 1,
                "target": {
                    "id": 4,
                    "fieldType": {
                        "id": 2
                    }
                },
                "comparison": 1,
                "value": "stationery"
            }]
        }, {
            "id": 2,
            "type": {
                "id": 2,
                "name": "valueset"
            },
            "target": {
                "id": 5,
                "fieldType": {
                    "id": 2
                }
            },
            "triggerValues": [{
                "id": 22,
                "value": "Corporate",
                "sequence": 1
            }, {
                "id": 23,
                "value": "Healthcare",
                "sequence": 2
            }, {
                "id": 24,
                "value": "Economics",
                "sequence": 3
            }],
            "triggerConditions": [{
                "id": 4,
                "target": {
                    "id": 4,
                    "fieldType": {
                        "id": 2
                    }
                },
                "comparison": 1,
                "value": "collateral"
            }]
        }],
        "viewOptions": [{
            "id": 3,
            "value": "Stationery",
            "defaultValue": false,
            "sequence": 1
        }, {
            "id": 4,
            "value": "Collateral",
            "defaultValue": false,
            "sequence": 2
        }]
    }, {
        "id": 5,
        "field": {
            "id": 5
        },
        "fieldType": {
            "id": 2,
            "name": "drop down"
        },
        "sequence": 5,
        "editable": true,
        "visibility": false,
        "required": false,
        "custom": true,
        "regEx": ".+",
        "label": "Category Level 2",
        "script": "",
        "value": null,
        "description": "",
        "visibilityConditions": [{
            "id": 1,
            "target": {
                "id": 4,
                "fieldType": {
                    "id": 2
                }
            },
            "comparison": 1,
            "value": "stationery",
            "join": 1
        }, {
            "id": 2,
            "target": {
                "id": 4,
                "fieldType": {
                    "id": 2
                }
            },
            "comparison": 1,
            "value": "collateral",
            "join": 1
        }],
        "triggers": [],
        "viewOptions": []
    }, {
        "id": 6,
        "field": {
            "id": 6
        },
        "fieldType": {
            "id": 2,
            "name": "drop down"
        },
        "sequence": 6,
        "editable": true,
        "visibility": false,
        "required": false,
        "custom": false,
        "regEx": ".+",
        "label": "Description",
        "script": "",
        "value": null,
        "description": "",
        "visibilityConditions": [{
            "id": 3,
            "target": {
                "id": 4,
                "fieldType": {
                    "id": 2
                }
            },
            "comparison": 1,
            "value": "collateral",
            "join": 1
        }],
        "triggers": [],
        "viewOptions": [{
            "id": 5,
            "value": "Printed single sided",
            "defaultValue": false,
            "sequence": 1
        }, {
            "id": 6,
            "value": "Printed double sided",
            "defaultValue": false,
            "sequence": 2
        }]
    }, {
        "id": 7,
        "field": {
            "id": 7
        },
        "fieldType": {
            "id": 2,
            "name": "drop down"
        },
        "sequence": 7,
        "editable": true,
        "visibility": true,
        "required": false,
        "custom": false,
        "regEx": ".+",
        "label": "Product Type",
        "script": "",
        "value": null,
        "description": "",
        "visibilityConditions": [],
        "triggers": [],
        "viewOptions": [{
            "id": 7,
            "value": "Inventory Fulfillment",
            "defaultValue": false,
            "sequence": 1
        }, {
            "id": 8,
            "value": "Print On Demand",
            "defaultValue": false,
            "sequence": 2
        }, {
            "id": 9,
            "value": "Variable Print On Demand",
            "defaultValue": false,
            "sequence": 3
        }]
    }, {
        "id": 8,
        "field": {
            "id": 8
        },
        "fieldType": {
            "id": 6,
            "name": "upload"
        },
        "sequence": 11,
        "editable": true,
        "visibility": true,
        "required": false,
        "custom": false,
        "regEx": ".+",
        "label": "Print Ready Files",
        "script": "",
        "value": null,
        "description": "",
        "visibilityConditions": [],
        "triggers": [],
        "viewOptions": []
    }]
}