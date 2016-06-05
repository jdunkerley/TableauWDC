/**
 * Created by jdunk on 05/06/2016.
 */

/// <reference path="./tableau.d.ts" />
export module tableauUtils
{
    export function createTableInfo(id: string): tableau.TableInfo {
        return {
            id: id,
            columns: []
        };
    }

    export function addColumn(tableInfo: tableau.TableInfo, id: string, type: tableau.tDataType): tableau.TableInfo {
        var newColumn: tableau.ColumnInfo = createColumnInfo(id, type);
        tableInfo.columns.push(newColumn);
        return tableInfo;
    }

    export function createColumnInfo(id: string, type: tableau.tDataType): tableau.ColumnInfo {
        return {
            id: id,
            dataType: type
        };
    }
}