
var AllTableConfig = [];
var TotalTableCount = 0;
var TableConfigTemplate = {
    Id: 0,
    RowCount: 0,
    ActualPageIndex: 0,
    PageSize: 0,
    TableData: [],
    TableFiltredData: [],
    ColorColId: [],
    IconsColId: []
}

function CreateTable(rowCount, tableIdName, tableIdent, tableData, options) {
    TotalTableCount++;
    var tableConfig = JSON.parse(JSON.stringify(TableConfigTemplate));
    tableConfig.Id = TotalTableCount;
    tableConfig.RowCount = rowCount;
    tableConfig.ActualPageIndex = 0;
    tableConfig.PageSize = 10;
    tableConfig.ColorColId = options.colors || [-1];
    tableConfig.IconsColId = options.icons || [-1];
    AllTableConfig.push(tableConfig);
    InsertTableData(tableIdent, tableData);
    AllTableConfig[tableIdent].TableFiltredData = JSON.parse(JSON.stringify(AllTableConfig[tableIdent].TableData));
    RenderTableRowsLib(tableIdName, tableIdent);
}

function InsertTableData(tableIdent, tableData) {
    for (var i = 0; i < tableData.length; i++) {
        AllTableConfig[tableIdent].TableData.push(tableData[i]);
    }
}

function AddTableData(tableId, tableIdent, tableData) {
    AllTableConfig[tableIdent].TableData.Col1.push(col1);
    AllTableConfig[tableIdent].TableData.Col2.push(col2);
    AllTableConfig[tableIdent].RowCount++;
    RenderTableRowsLib(tableId, tableIdent);
}

function RenderTableRowsLib(tableId, tableIdent) {
    document.getElementById(tableId + "Body").innerHTML = "";
    for (var i = AllTableConfig[tableIdent].ActualPageIndex; i < AllTableConfig[tableIdent].ActualPageIndex + AllTableConfig[tableIdent].PageSize; i++) {
        if (AllTableConfig[tableIdent].TableFiltredData[0][i] != undefined) {
            var rowData = '<tr class="clickable-row">';
            for (var j = 0; j < AllTableConfig[tableIdent].TableFiltredData.length; j++) {
                rowData += '<td>';
                var colType = 0; // 0 -> text data; 1 -> color; 2 -> ikona
                AllTableConfig[tableIdent].ColorColId.forEach(function (colorColId) {
                    if (colorColId == j) {
                        colType = 1;
                    }
                });
                AllTableConfig[tableIdent].IconsColId.forEach(function (iconColId) {
                    if (iconColId == j) {
                        colType = 2;
                    }
                });
                switch (colType) {
                    case 0:
                        rowData += AllTableConfig[tableIdent].TableFiltredData[j][i];
                        break;
                    case 1:
                        rowData += ' <div style="height:20px; width:20px; background-color:';
                        rowData += AllTableConfig[tableIdent].TableFiltredData[j][i] + '"></div>';
                        break;
                    case 2:
                        if (colType == 2) {
                            if (AllTableConfig[tableIdent].TableFiltredData[j][i] == 1) {
                                rowData += '<div>Ok</div>';
                            }
                            else {
                                rowData += '<div>NonOk</div>';
                            }
                        }
                        break;
                    default:
                        rowData += AllTableConfig[tableIdent].TableFiltredData[j][i];
                }
                rowData += "</td>";
            }
            rowData += "</tr>";
            $('#' + tableId).append(rowData);
        }
    }

    if (TestIfExistElement(tableId + "ActPageBt")) {
        document.getElementById(tableId + "ActPageBt").innerHTML = GetActualPageNumber(tableIdent);
    }
}

function SetPageSize(pageSize, dropMenuId, tableIdent) {
    AllTableConfig[tableIdent].PageSize = pageSize;
    document.getElementById(dropMenuId).innerText = pageSize;
}

function SetTabPage(tableId, pageId, tableIdent) {
    AllTableConfig[tableIdent].ActualPageIndex = (pageId - 1) * AllTableConfig[tableIdent].PageSize;
    RenderTableRowsLib(tableId, tableIdent);
}

function GetTabPage(tableId, cmd, tableIdent) {
    var CanPagingTable = false;

    if (cmd == "next") {
        if (AllTableConfig[tableIdent].ActualPageIndex < AllTableConfig[tableIdent].RowCount - AllTableConfig[tableIdent].PageSize) {
            CanPagingTable = true;
            AllTableConfig[tableIdent].ActualPageIndex = AllTableConfig[tableIdent].ActualPageIndex + AllTableConfig[tableIdent].PageSize;
        }
        else {
            //window.alert("Konec tabulky");
        }
    }

    if (cmd == "prev") {
        if (AllTableConfig[tableIdent].ActualPageIndex > 0) {
            CanPagingTable = true;
            AllTableConfig[tableIdent].ActualPageIndex = AllTableConfig[tableIdent].ActualPageIndex - AllTableConfig[tableIdent].PageSize;
        }
        else {
            //window.alert("Zacatek tabulky");
        }
    }
    if (CanPagingTable) {
        RenderTableRowsLib(tableId, tableIdent);
    }
}


function GetPageTotalCnt(tableIdent) {
    return Math.ceil(AllTableConfig[tableIdent].RowCount / AllTableConfig[tableIdent].PageSize);
}

function GetActualPageNumber(tableIdent) {
    return (AllTableConfig[tableIdent].ActualPageIndex / 10) + 1;
}
function TestIfExistElement(elementId) {
    if (document.getElementById(elementId) != null) {
        return true;
    }
    return false;
}