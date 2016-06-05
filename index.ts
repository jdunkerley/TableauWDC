/**
 * Created by jdunk on 02/06/2016
 */

/// <reference path="./tableau.d.ts" />
import { tableauUtils } from "./tableauUtils.ts";

var connector: tableau.WebDataConnector = tableau.makeConnector();

connector.init = (initCallback: tableau.InitCallback) => {
    tableau.log("Init Called.");
    initCallback();
};

connector.shutdown = (shutdownCallback: tableau.ShutdownCallback) => {
    tableau.log("Shut Down Called.");
    shutdownCallback();
};

var currencyTableInfo: tableau.TableInfo = tableauUtils.createTableInfo("currencies");
tableauUtils.addColumn(currencyTableInfo, "ISOCode", tableau.dataTypeEnum.string);
tableauUtils.addColumn(currencyTableInfo, "Name", tableau.dataTypeEnum.string);
tableauUtils.addColumn(currencyTableInfo, "Num", tableau.dataTypeEnum.int);
tableauUtils.addColumn(currencyTableInfo, "E", tableau.dataTypeEnum.int);

var countryTableInfo: tableau.TableInfo = tableauUtils.createTableInfo("currencies");
tableauUtils.addColumn(countryTableInfo, "ISOCode", tableau.dataTypeEnum.string);
tableauUtils.addColumn(countryTableInfo, "Name", tableau.dataTypeEnum.string);
tableauUtils.addColumn(countryTableInfo, "Alpha3Code", tableau.dataTypeEnum.string);
tableauUtils.addColumn(countryTableInfo, "Num", tableau.dataTypeEnum.int);

connector.getSchema = (schemaCallback: tableau.SchemaCallback) => {
    tableau.log("Get Schema Called.");
    schemaCallback([currencyTableInfo, countryTableInfo]);
};

connector.getData = (table: tableau.Table, dataDoneCallback: tableau.DataDoneCallback) => {
    tableau.log("Get Data Called for " + table.tableInfo.id + ".");

    switch (table.tableInfo.id) {
        case "currencies":
            table.appendRows([["GBP", "Pound Sterling", 826, 2]]);
            break;
        case "countries":
            table.appendRows([["GB", "United Kingdom of Great Britain and Northern Ireland", "GBR", 826]]);
            break;
    }

    dataDoneCallback();
};

tableau.registerConnector(connector);