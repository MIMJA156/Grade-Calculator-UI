import gradeData from "./data.json" assert { type: "json" };
import { Table } from "./classes/Table.js";

let table = new Table(gradeData[2]);
table.appendCells($("#assignment-table-container"));
