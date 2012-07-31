[{
    "id": 50,
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
    "options": [{
        "id": 80,
        "value": "New Product",
        "defaultValue": true,
        "sequence": 1
    }, {
        "id": 81,
        "value": "Updated Info for Existing Product",
        "defaultValue": false,
        "sequence": 2
    }]
}, {
    "id": 51,
    "field": {
        "id": 4
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
    "options": []
}, {
    "id": 52,
    "field": {
        "id": 5
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
    "options": []
}, {
    "id": 53,
    "field": {
        "id": 41
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
        "id": 3,
        "type": {
            "id": 2,
            "name": "valueset"
        },
        "target": {
            "id": 54,
            "fieldType": {
                "id": 2
            }
        },
        "triggerValues": [{
            "id": 13,
            "value": "Business Cards",
            "sequence": 1
        }, {
            "id": 14,
            "value": "Letterhead",
            "sequence": 2
        }, {
            "id": 15,
            "value": "Envelopes",
            "sequence": 3
        }, {
            "id": 16,
            "value": "Notepads",
            "sequence": 4
        }, {
            "id": 17,
            "value": "Notecards",
            "sequence": 5
        }, {
            "id": 18,
            "value": "Mailing Labels",
            "sequence": 6
        }, {
            "id": 19,
            "value": "Proposal Covers",
            "sequence": 7
        }, {
            "id": 20,
            "value": "Folders",
            "sequence": 8
        }, {
            "id": 21,
            "value": "Alleviant",
            "sequence": 9
        }],
        "triggerConditions": [{
            "id": 3,
            "target": {
                "id": 53,
                "fieldType": {
                    "id": 2
                }
            },
            "comparison": 1,
            "value": "stationery"
        }]
    }, {
        "id": 4,
        "type": {
            "id": 2,
            "name": "valueset"
        },
        "target": {
            "id": 54,
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
            "value": "Disputes & Investigations",
            "sequence": 2
        }, {
            "id": 24,
            "value": "Global Investigations & Compliance",
            "sequence": 3
        }, {
            "id": 25,
            "value": "Healthcare",
            "sequence": 4
        }, {
            "id": 26,
            "value": "Energy",
            "sequence": 5
        }, {
            "id": 27,
            "value": "Economics",
            "sequence": 6
        }, {
            "id": 28,
            "value": "Construction",
            "sequence": 7
        }, {
            "id": 29,
            "value": "Financial Advisory (NCA)",
            "sequence": 8
        }, {
            "id": 30,
            "value": "Pace",
            "sequence": 9
        }, {
            "id": 31,
            "value": "Healthcare Customizable",
            "sequence": 10
        }],
        "triggerConditions": [{
            "id": 4,
            "target": {
                "id": 53,
                "fieldType": {
                    "id": 2
                }
            },
            "comparison": 1,
            "value": "collateral"
        }]
    }, {
        "id": 5,
        "type": {
            "id": 2,
            "name": "valueset"
        },
        "target": {
            "id": 54,
            "fieldType": {
                "id": 2
            }
        },
        "triggerValues": [{
            "id": 32,
            "value": "Disputes & Investigations",
            "sequence": 1
        }, {
            "id": 33,
            "value": "Global Investigations & Compliance",
            "sequence": 2
        }, {
            "id": 34,
            "value": "Healthcare",
            "sequence": 3
        }, {
            "id": 35,
            "value": "Energy",
            "sequence": 4
        }, {
            "id": 36,
            "value": "Economics",
            "sequence": 5
        }, {
            "id": 37,
            "value": "Construction",
            "sequence": 6
        }, {
            "id": 38,
            "value": "Financial Advisory (NCA)",
            "sequence": 7
        }, {
            "id": 39,
            "value": "Pace",
            "sequence": 8
        }],
        "triggerConditions": [{
            "id": 5,
            "target": {
                "id": 53,
                "fieldType": {
                    "id": 2
                }
            },
            "comparison": 1,
            "value": "thought leadership"
        }]
    }],
    "options": [{
        "id": 93,
        "value": "Stationery",
        "defaultValue": false,
        "sequence": 1
    }, {
        "id": 94,
        "value": "Collateral",
        "defaultValue": false,
        "sequence": 2
    }, {
        "id": 95,
        "value": "Thought Leadership",
        "defaultValue": false,
        "sequence": 3
    }, {
        "id": 96,
        "value": "One-off Orders",
        "defaultValue": false,
        "sequence": 4
    }, {
        "id": "other",
        "value": "Other"
    }]
}, {
    "id": 54,
    "field": {
        "id": 45
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
        "id": 33,
        "target": {
            "id": 53,
            "fieldType": {
                "id": 2
            }
        },
        "comparison": 1,
        "value": "stationery",
        "join": 1
    }, {
        "id": 34,
        "target": {
            "id": 53,
            "fieldType": {
                "id": 2
            }
        },
        "comparison": 1,
        "value": "collateral",
        "join": 1
    }, {
        "id": 35,
        "target": {
            "id": 53,
            "fieldType": {
                "id": 2
            }
        },
        "comparison": 1,
        "value": "thought leadership",
        "join": 1
    }],
    "triggers": [],
    "options": [{
        "id": "other",
        "value": "Other"
    }]
}, {
    "id": 55,
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
        "id": 36,
        "target": {
            "id": 53,
            "fieldType": {
                "id": 2
            }
        },
        "comparison": 1,
        "value": "thought leadership",
        "join": 1
    }],
    "triggers": [],
    "options": [{
        "id": 82,
        "value": "Printed single sided and bound as loose sheets with a corner stitch",
        "defaultValue": false,
        "sequence": 1
    }, {
        "id": 83,
        "value": "Printed double sided, folded and saddle stitched",
        "defaultValue": false,
        "sequence": 2
    }]
}, {
    "id": 56,
    "field": {
        "id": 2
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
    "options": [{
        "id": 84,
        "value": "Inventory Fulfillment",
        "defaultValue": false,
        "sequence": 1
    }, {
        "id": 85,
        "value": "Print On Demand",
        "defaultValue": false,
        "sequence": 2
    }, {
        "id": 86,
        "value": "Variable Print On Demand",
        "defaultValue": false,
        "sequence": 3
    }]
}, {
    "id": 57,
    "field": {
        "id": 7
    },
    "fieldType": {
        "id": 1,
        "name": "text field"
    },
    "sequence": 8,
    "editable": true,
    "visibility": true,
    "required": false,
    "custom": false,
    "regEx": ".+",
    "label": "Number of Pages (sides)",
    "script": "",
    "value": null,
    "description": "",
    "visibilityConditions": [],
    "triggers": [],
    "options": []
}, {
    "id": 58,
    "field": {
        "id": 42
    },
    "fieldType": {
        "id": 2,
        "name": "drop down"
    },
    "sequence": 9,
    "editable": true,
    "visibility": true,
    "required": false,
    "custom": false,
    "regEx": ".+",
    "label": "Imposition",
    "script": "",
    "value": null,
    "description": "",
    "visibilityConditions": [],
    "triggers": [],
    "options": [{
        "id": 87,
        "value": "Printed One Sided",
        "defaultValue": false,
        "sequence": 1
    }, {
        "id": 88,
        "value": "Printed Two Sided",
        "defaultValue": false,
        "sequence": 2
    }]
}, {
    "id": 59,
    "field": {
        "id": 43
    },
    "fieldType": {
        "id": 2,
        "name": "drop down"
    },
    "sequence": 10,
    "editable": true,
    "visibility": true,
    "required": false,
    "custom": false,
    "regEx": ".+",
    "label": "Binding",
    "script": "",
    "value": null,
    "description": "",
    "visibilityConditions": [],
    "triggers": [],
    "options": [{
        "id": 89,
        "value": "NONE - Cut ONLY",
        "defaultValue": false,
        "sequence": 1
    }, {
        "id": 90,
        "value": "Fold ONLY",
        "defaultValue": false,
        "sequence": 2
    }, {
        "id": 91,
        "value": "Saddle Stitch",
        "defaultValue": false,
        "sequence": 3
    }, {
        "id": 92,
        "value": "Corner Stitch",
        "defaultValue": false,
        "sequence": 4
    }]
}, {
    "id": 60,
    "field": {
        "id": 44
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
    "options": []
}]