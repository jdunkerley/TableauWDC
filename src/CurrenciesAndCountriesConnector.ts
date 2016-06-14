/**
 * Created by jdunk on 06/06/2016.
 */
/// <reference path="./tableau.d.ts" />
import { tableauUtils } from "./tableauUtils";

export module currenciesAndCountriesConnector {
    function Currency(currencyCode:string, name:string, num:number, e:number):any {
        return {
            CurrencyCode: currencyCode,
            Name: name,
            Num: num,
            E: e
        };
    }

    function Country(countryCode:string, name:string, year:number):any {
        return {
            CountryCode: countryCode,
            Name: name,
            Year: year
        };
    }
    
    function getData(table:tableau.Table, dataDoneCallback:tableau.DataDoneCallback) {
        tableau.log("Get Data Called for " + table.tableInfo.id + ".");

        switch (table.tableInfo.id) {
            case "currencies":
                d3.csv("./currencies.csv")
                    .row((d:any) => Currency(d.CurrencyCode, d.Name, +d.Num, +d.E))
                    .get((error, rows) => {
                        table.appendRows(rows);
                        dataDoneCallback();
                    });
                break;
            case "countries":
                d3.csv("./countries.csv")
                    .row((d:any) => Country(d.CountryCode, d.Name, +d.Year))
                    .get((error, rows) => {
                        table.appendRows(rows);
                        dataDoneCallback();
                    });
                break;
        }
    }

    export function connector(): tableau.WebDataConnector {
        return tableauUtils.Connector()
            .addTable(
                tableauUtils.Table("currencies")
                    .setDefaultAlias('Currencies')
                    .setDescription('ISO 4217 Currencies Table. See https://en.wikipedia.org/wiki/ISO_4217')
                    .addColumn(tableauUtils.Column("CurrencyCode", tableau.dataTypeEnum.string))
                    .addColumn(tableauUtils.Column("Name", tableau.dataTypeEnum.string))
                    .addColumn(tableauUtils.Column("Num", tableau.dataTypeEnum.int))
                    .addColumn(tableauUtils.Column("E", tableau.dataTypeEnum.int)))
            .addTable(
                tableauUtils.Table("countries")
                    .setDefaultAlias('Countries')
                    .setDescription('ISO 3166-A Countries Table. See https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2')
                    .addColumn(tableauUtils.Column("CountryCode", tableau.dataTypeEnum.string).setDescription('ISO 3166-1 alpha-2 code'))
                    .addColumn(tableauUtils.Column("Name", tableau.dataTypeEnum.string).setDescription('English short country name officially used by the ISO 3166 Maintenance Agency (ISO 3166/MA)'))
                    .addColumn(tableauUtils.Column("Year", tableau.dataTypeEnum.int).setDescription('Year when alpha-2 code was first officially assigned (1974, first edition of ISO 3166)')))
            .setGetDataFunction(getData)
            .register();
    }

    export function wireUpCurrencyAndIsoButton(button:d3.Selection<any>):void {
        var connector:tableau.WebDataConnector = currenciesAndCountriesConnector.connector();
        tableau.registerConnector(connector);

        button.on("click", () => {
            tableau.connectionName = "ISO Currencies and Countries";
            tableau.submit();
        });
    }
}