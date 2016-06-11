/**
 * Created by jdunk on 05/06/2016.
 */
/// <reference path="./tableau.d.ts" />
export module tableauUtils
{
    export interface TableInfoFluent extends tableau.TableInfo {
        addColumn(column: tableau.ColumnInfo): TableInfoFluent;
        setDefaultAlias(alias: string): TableInfoFluent;
        setDescription(description: string): TableInfoFluent;
    }

    class TableInfoFluentClass implements  TableInfoFluent {
        id: string;
        columns: tableau.ColumnInfo[];
        defaultAlias: string;
        description: string;

        constructor(id: string) {
            this.id = id;
            this.columns = [];
        }

        addColumn(column:tableau.ColumnInfo):TableInfoFluent {
            this.columns.push(column);
            return this;
        }

        setDefaultAlias(alias:string):TableInfoFluent {
            this.defaultAlias = alias;
            return this;
        }

        setDescription(description:string):TableInfoFluent {
            this.description = description;
            return this;
        }
    }

    export interface ColumnInfoFluent extends tableau.ColumnInfo {
        setAggType(aggType: tableau.tAggType):  ColumnInfoFluent;
        setAlias(alias: string): ColumnInfoFluent;
        setDescription(description: string): ColumnInfoFluent;
        setColumnRole(columnRole: tableau.tColumnRole): ColumnInfoFluent;
        setColumnType(columnType: tableau.tColumnType): ColumnInfoFluent;
        setGeographicRole(geographicRole: tableau.tGeographicRole): ColumnInfoFluent;
        setNumberFormat(numberFormat: tableau.tNumberFormat): ColumnInfoFluent;
        setUnitsFormat(unitsFormat: tableau.tUnitsFormat): ColumnInfoFluent;
    }

    class ColumnInfoFluentClass implements ColumnInfoFluent {
        id:string;
        dataType:tableau.tDataType;
        aggType:tableau.tAggType;
        alias:string;
        description:string;
        columnRole:tableau.tColumnRole;
        columnType:tableau.tColumnType;
        geographicRole:tableau.tGeographicRole;
        numberFormat:tableau.tNumberFormat;
        unitsFormat:tableau.tUnitsFormat;

        constructor(id:string, type:tableau.tDataType) {
            this.id = id;
            this.dataType = type;
        }

        setAggType(aggType:tableau.tAggType) {
            this.aggType = aggType;
            return this;
        }

        setAlias(alias:string) {
            this.alias = alias;
            return this;
        }

        setDescription(description:string) {
            this.description = description;
            return this;
        }

        setColumnRole(columnRole:tableau.tColumnRole) {
            this.columnRole = columnRole;
            return this;
        }

        setColumnType(columnType:tableau.tColumnType) {
            this.columnType = columnType;
            return this;
        }

        setGeographicRole(geographicRole:tableau.tGeographicRole) {
            this.geographicRole = geographicRole;
            return this;
        }

        setNumberFormat(numberFormat:tableau.tNumberFormat) {
            this.numberFormat = numberFormat;
            return this;
        }

        setUnitsFormat(unitsFormat:tableau.tUnitsFormat) {
            this.unitsFormat = unitsFormat;
            return this;
        }
    }

    export function Table(id: string): TableInfoFluent {
        return new TableInfoFluentClass(id);
    }

    export function Column(id: string, type: tableau.tDataType): ColumnInfoFluent {
        return new ColumnInfoFluentClass(id, type);
    }
}