/**
 * Created by jdunk on 02/06/2016
 */
/// <reference path="./tableau.d.ts" />
/// <reference path="../typings/index.d.ts" />
import { currenciesAndCountriesConnector } from "./CurrenciesAndCountriesConnector";
import { quandlConnector } from "./QuandlConnector";

function getUserAgentAndVersion(): void {
    d3.select("#user-agent").text(window["tableauVersionBootstrap"]);

    if (tableau && tableau.versionNumber && tableau.phase) {
        d3.select("#version").text("Tableau Version: " + tableau.versionNumber + " (" + tableau.phase + ")");
    } else {
        d3.select("#version").text("Tableau Not Found!!!!!");
    }
}

window["setupCurrenciesAndCountries"] = () => {
    currenciesAndCountriesConnector.wireUpCurrencyAndIsoButton(d3.select("#submitButton"));
};

window["setupQuandl"] = () => {
    quandlConnector.wireUpDatabasesButton(d3.select("#submitButton"));
    d3.select("#apiKey").on()
};