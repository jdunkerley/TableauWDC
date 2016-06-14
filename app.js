/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by jdunk on 06/06/2016.
	 */
	/// <reference path="./tableau.d.ts" />
	var tableauUtils_1 = __webpack_require__(2);
	var currenciesAndCountriesConnector;
	(function (currenciesAndCountriesConnector) {
	    function Currency(currencyCode, name, num, e) {
	        return {
	            CurrencyCode: currencyCode,
	            Name: name,
	            Num: num,
	            E: e
	        };
	    }
	    function Country(countryCode, name, year) {
	        return {
	            CountryCode: countryCode,
	            Name: name,
	            Year: year
	        };
	    }
	    function getData(table, dataDoneCallback) {
	        tableau.log("Get Data Called for " + table.tableInfo.id + ".");
	        switch (table.tableInfo.id) {
	            case "currencies":
	                d3.csv("./currencies.csv")
	                    .row(function (d) { return Currency(d.CurrencyCode, d.Name, +d.Num, +d.E); })
	                    .get(function (error, rows) {
	                    table.appendRows(rows);
	                    dataDoneCallback();
	                });
	                break;
	            case "countries":
	                d3.csv("./countries.csv")
	                    .row(function (d) { return Country(d.CountryCode, d.Name, +d.Year); })
	                    .get(function (error, rows) {
	                    table.appendRows(rows);
	                    dataDoneCallback();
	                });
	                break;
	        }
	    }
	    function connector() {
	        return tableauUtils_1.tableauUtils.Connector()
	            .addTable(tableauUtils_1.tableauUtils.Table("currencies")
	            .setDefaultAlias('Currencies')
	            .setDescription('ISO 4217 Currencies Table. See https://en.wikipedia.org/wiki/ISO_4217')
	            .addColumn(tableauUtils_1.tableauUtils.Column("CurrencyCode", tableau.dataTypeEnum.string))
	            .addColumn(tableauUtils_1.tableauUtils.Column("Name", tableau.dataTypeEnum.string))
	            .addColumn(tableauUtils_1.tableauUtils.Column("Num", tableau.dataTypeEnum.int))
	            .addColumn(tableauUtils_1.tableauUtils.Column("E", tableau.dataTypeEnum.int)))
	            .addTable(tableauUtils_1.tableauUtils.Table("countries")
	            .setDefaultAlias('Countries')
	            .setDescription('ISO 3166-A Countries Table. See https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2')
	            .addColumn(tableauUtils_1.tableauUtils.Column("CountryCode", tableau.dataTypeEnum.string).setDescription('ISO 3166-1 alpha-2 code'))
	            .addColumn(tableauUtils_1.tableauUtils.Column("Name", tableau.dataTypeEnum.string).setDescription('English short country name officially used by the ISO 3166 Maintenance Agency (ISO 3166/MA)'))
	            .addColumn(tableauUtils_1.tableauUtils.Column("Year", tableau.dataTypeEnum.int).setDescription('Year when alpha-2 code was first officially assigned (1974, first edition of ISO 3166)')))
	            .setGetDataFunction(getData)
	            .register();
	    }
	    currenciesAndCountriesConnector.connector = connector;
	    function wireUpCurrencyAndIsoButton(button) {
	        var connector = currenciesAndCountriesConnector.connector();
	        tableau.registerConnector(connector);
	        button.on("click", function () {
	            tableau.connectionName = "ISO Currencies and Countries";
	            tableau.submit();
	        });
	    }
	    currenciesAndCountriesConnector.wireUpCurrencyAndIsoButton = wireUpCurrencyAndIsoButton;
	})(currenciesAndCountriesConnector = exports.currenciesAndCountriesConnector || (exports.currenciesAndCountriesConnector = {}));

	//# sourceMappingURL=CurrenciesAndCountriesConnector.js.map


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Created by jdunk on 05/06/2016.
	 */
	/// <reference path="./tableau.d.ts" />
	var tableauUtils;
	(function (tableauUtils) {
	    var TableInfoFluentClass = (function () {
	        function TableInfoFluentClass(id) {
	            this.id = id;
	            this.columns = [];
	        }
	        TableInfoFluentClass.prototype.addColumn = function (column) {
	            this.columns.push(column);
	            return this;
	        };
	        TableInfoFluentClass.prototype.setDefaultAlias = function (alias) {
	            this.defaultAlias = alias;
	            return this;
	        };
	        TableInfoFluentClass.prototype.setDescription = function (description) {
	            this.description = description;
	            return this;
	        };
	        return TableInfoFluentClass;
	    }());
	    var ColumnInfoFluentClass = (function () {
	        function ColumnInfoFluentClass(id, type) {
	            this.id = id;
	            this.dataType = type;
	        }
	        ColumnInfoFluentClass.prototype.setAggType = function (aggType) {
	            this.aggType = aggType;
	            return this;
	        };
	        ColumnInfoFluentClass.prototype.setAlias = function (alias) {
	            this.alias = alias;
	            return this;
	        };
	        ColumnInfoFluentClass.prototype.setDescription = function (description) {
	            this.description = description;
	            return this;
	        };
	        ColumnInfoFluentClass.prototype.setColumnRole = function (columnRole) {
	            this.columnRole = columnRole;
	            return this;
	        };
	        ColumnInfoFluentClass.prototype.setColumnType = function (columnType) {
	            this.columnType = columnType;
	            return this;
	        };
	        ColumnInfoFluentClass.prototype.setGeographicRole = function (geographicRole) {
	            this.geographicRole = geographicRole;
	            return this;
	        };
	        ColumnInfoFluentClass.prototype.setNumberFormat = function (numberFormat) {
	            this.numberFormat = numberFormat;
	            return this;
	        };
	        ColumnInfoFluentClass.prototype.setUnitsFormat = function (unitsFormat) {
	            this.unitsFormat = unitsFormat;
	            return this;
	        };
	        return ColumnInfoFluentClass;
	    }());
	    function Table(id) {
	        return new TableInfoFluentClass(id);
	    }
	    tableauUtils.Table = Table;
	    function Column(id, type) {
	        return new ColumnInfoFluentClass(id, type);
	    }
	    tableauUtils.Column = Column;
	    var WebDataConnectorFluentClass = (function () {
	        function WebDataConnectorFluentClass() {
	            var temp = tableau.makeConnector();
	            this.init = temp.init;
	            this.shutdown = temp.shutdown;
	            this.tables = [];
	        }
	        WebDataConnectorFluentClass.prototype.init = function (initCallBack) { };
	        WebDataConnectorFluentClass.prototype.shutdown = function (shutdownCallback) { };
	        WebDataConnectorFluentClass.prototype.getData = function (table, doneCallback) {
	            doneCallback();
	        };
	        WebDataConnectorFluentClass.prototype.getSchema = function (schemaCallback) {
	            schemaCallback(this.tables);
	        };
	        WebDataConnectorFluentClass.prototype.addTable = function (tableInfo) {
	            this.tables.push(tableInfo);
	            return this;
	        };
	        WebDataConnectorFluentClass.prototype.setGetDataFunction = function (getData) {
	            this.getData = getData;
	            return this;
	        };
	        WebDataConnectorFluentClass.prototype.register = function () {
	            tableau.registerConnector(this);
	            return this;
	        };
	        return WebDataConnectorFluentClass;
	    }());
	    function Connector() {
	        return new WebDataConnectorFluentClass();
	    }
	    tableauUtils.Connector = Connector;
	})(tableauUtils = exports.tableauUtils || (exports.tableauUtils = {}));

	//# sourceMappingURL=tableauUtils.js.map


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by jdunk on 02/06/2016
	 */
	/// <reference path="./tableau.d.ts" />
	/// <reference path="../typings/index.d.ts" />
	var CurrenciesAndCountriesConnector_1 = __webpack_require__(1);
	var QuandlConnector_1 = __webpack_require__(4);
	function getUserAgentAndVersion() {
	    d3.select("#user-agent").text(window["tableauVersionBootstrap"]);
	    if (tableau && tableau.versionNumber && tableau.phase) {
	        d3.select("#version").text("Tableau Version: " + tableau.versionNumber + " (" + tableau.phase + ")");
	    }
	    else {
	        d3.select("#version").text("Tableau Not Found!!!!!");
	    }
	}
	window["setupCurrenciesAndCountries"] = function () {
	    CurrenciesAndCountriesConnector_1.currenciesAndCountriesConnector.wireUpCurrencyAndIsoButton(d3.select("#submitButton"));
	};
	window["setupQuandl"] = function () {
	    QuandlConnector_1.quandlConnector.wireUpDatabasesButton(d3.select("#submitButton"));
	};

	//# sourceMappingURL=index.js.map


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by jdunk on 12/06/2016.
	 */
	var tableauUtils_1 = __webpack_require__(2);
	var quandlConnector;
	(function (quandlConnector) {
	    var _apiKey;
	    function apiKey(newKey) {
	        if (newKey) {
	            _apiKey = newKey;
	        }
	        return _apiKey;
	    }
	    quandlConnector.apiKey = apiKey;
	    function Database(id, name, database_code, description, datasets_count, downloads, premium, image) {
	        return {
	            ID: id,
	            Name: name,
	            DatabaseCode: database_code,
	            Description: description,
	            DatasetsCount: datasets_count,
	            Downloads: downloads,
	            Premium: premium,
	            ImageUrl: image
	        };
	    }
	    function databases(callback, query, page, per_page) {
	        var url;
	        url = "";
	        var key = apiKey();
	        if (key) {
	            url = "api_key=" + key + "&";
	        }
	        if (query) {
	            url = "query=" + query + "&";
	        }
	        if (page) {
	            url = "page=" + page + "&";
	        }
	        if (per_page) {
	            url = "per_page=" + per_page + "&";
	        }
	        url = "https://www.quandl.com/api/v3/databases.json" + (url == "" ? "" : "?" + url.slice(0, -1));
	        d3.json(url, callback);
	    }
	    quandlConnector.databases = databases;
	    function databaseGet(table, dataDoneCallback) {
	        tableau.log("Get Data Called for " + table.tableInfo.id + ".");
	        quandlConnector.apiKey(tableau.connectionData);
	        var callback = function (error, data) {
	            if (error) {
	                tableau.abortWithError(JSON.stringify(error));
	                return;
	            }
	            if (data.databases && data.databases.length) {
	                table.appendRows(data.databases.map(function (d) { return Database(d.id, d.name, d.database_code, d.description, d.datasets_count, d.downloads, d.premium, d.image); }));
	            }
	            if (data.meta.next_page) {
	                quandlConnector.databases(callback, null, data.meta.next_page);
	            }
	            else {
	                dataDoneCallback();
	            }
	        };
	        quandlConnector.databases(callback);
	    }
	    function databaseController() {
	        return tableauUtils_1.tableauUtils.Connector()
	            .addTable(tableauUtils_1.tableauUtils.Table("databases")
	            .setDefaultAlias('Databases')
	            .setDescription('Set of Quandl Databases')
	            .addColumn(tableauUtils_1.tableauUtils.Column("ID", tableau.dataTypeEnum.int))
	            .addColumn(tableauUtils_1.tableauUtils.Column("Name", tableau.dataTypeEnum.string))
	            .addColumn(tableauUtils_1.tableauUtils.Column("DatabaseCode", tableau.dataTypeEnum.string))
	            .addColumn(tableauUtils_1.tableauUtils.Column("Description", tableau.dataTypeEnum.string))
	            .addColumn(tableauUtils_1.tableauUtils.Column("DatasetsCount", tableau.dataTypeEnum.int))
	            .addColumn(tableauUtils_1.tableauUtils.Column("Premium", tableau.dataTypeEnum.bool))
	            .addColumn(tableauUtils_1.tableauUtils.Column("ImageUrl", tableau.dataTypeEnum.string)))
	            .setGetDataFunction(databaseGet)
	            .register();
	    }
	    quandlConnector.databaseController = databaseController;
	    function wireUpDatabasesButton(button) {
	        databaseController();
	        button.on("click", function () {
	            tableau.connectionName = "Quandl Database List";
	            tableau.connectionData = quandlConnector.apiKey();
	            tableau.submit();
	        });
	    }
	    quandlConnector.wireUpDatabasesButton = wireUpDatabasesButton;
	})(quandlConnector = exports.quandlConnector || (exports.quandlConnector = {}));

	//# sourceMappingURL=QuandlConnector.js.map


/***/ }
/******/ ]);