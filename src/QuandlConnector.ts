/**
 * Created by jdunk on 12/06/2016.
 */
import { tableauUtils } from "./tableauUtils";

export module quandlConnector {

    var _apiKey: string;

    export function apiKey(newKey?: string): string {
        if (newKey) {
            _apiKey = newKey;
        }

        return _apiKey;
    } 

    function Database(id:number, name:string, database_code:string, description:string, datasets_count:number, downloads: number, premium: boolean, image: string):any {
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

    export function databases(callback: (error:any, result: any) => void, query?: string, page?: number, per_page?: number) {
        var url: string;
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

    function databaseGet(table:tableau.Table, dataDoneCallback:tableau.DataDoneCallback) {
        tableau.log("Get Data Called for " + table.tableInfo.id + ".");

        quandlConnector.apiKey(tableau.connectionData);

        var callback = (error:any, data:any) => {
            if (error) {
                tableau.abortWithError(JSON.stringify(error));
                return;
            }

            if (data.databases && data.databases.length) {
                table.appendRows(
                    data.databases.map((d: any) => Database(d.id, d.name, d.database_code, d.description, d.datasets_count, d.downloads, d.premium, d.image)));
            }

            if (data.meta.next_page) {
                quandlConnector.databases(callback, null, data.meta.next_page);
            } else {
                dataDoneCallback();
            }
        };

        quandlConnector.databases(callback);
    }

    export function databaseController():tableau.WebDataConnector {
        return tableauUtils.Connector()
            .addTable(
                tableauUtils.Table("databases")
                    .setDefaultAlias('Databases')
                    .setDescription('Set of Quandl Databases')
                    .addColumn(tableauUtils.Column("ID", tableau.dataTypeEnum.int))
                    .addColumn(tableauUtils.Column("Name", tableau.dataTypeEnum.string))
                    .addColumn(tableauUtils.Column("DatabaseCode", tableau.dataTypeEnum.string))
                    .addColumn(tableauUtils.Column("Description", tableau.dataTypeEnum.string))
                    .addColumn(tableauUtils.Column("DatasetsCount", tableau.dataTypeEnum.int))
                    .addColumn(tableauUtils.Column("Premium", tableau.dataTypeEnum.bool))
                    .addColumn(tableauUtils.Column("ImageUrl", tableau.dataTypeEnum.string)))
            .setGetDataFunction(databaseGet)
            .register();
    }

    export function wireUpDatabasesButton(button:d3.Selection<any>):void {
        databaseController();
        button.on("click", () => {
            tableau.connectionName = "Quandl Database List";
            tableau.connectionData = quandlConnector.apiKey();
            tableau.submit();
        });
    }
}