// function start(btn) {
//     btn.style.display = "none";
//     document.getElementById("result").style.display = "block";

// }

$(document).ready(function(){
  $("#table2").on("click", '.clickable-row', function (value) {
    var clickedRow = $(this)[0];
    pointId = clickedRow.cells[1].innerText.replace("p", ""); 
    onPointClick(pointId); 
});
});

var x = [];
var y = [];
var points = [];

function table1(id) {
  var tableData = [];
  for (var i = 0; i < MarkersAll.length; i++) {
    points.push(MarkersAll[i].getId());
    x.push(MarkersAll[i].getCoords().x);
    y.push(MarkersAll[i].getCoords().y);
  }
  tableData.push(points);
  tableData.push(x);
  tableData.push(y);
  CreateTable(points.length, id, 0, tableData, { colors: [-1], icons: [-1] });
}
function table2(tableId) {
  var tableData = [];
  var pointsData = [];
  var okList = []; 
  var colors = []; 
  var id = [];
  var addButtons = [];
  var delButtons = [];
  var j = 0;
  console.log(MarkersAll);
  for (var i = 0; i < MarkersAll.length; i++) {
    if(j > 6){
      break; 
    }
    if (Math.random() > 0.7) {
      id.push(j);
      pointsData.push(MarkersAll[i].getId());
      okList.push(Math.floor(Math.random() + 0.5));
      colors.push(GetRandomColor());
      addButtons.push(`<button class="btn btn-success" onclick="AddPoint(${i})">Add p${i}</button`)
      delButtons.push(`<button class="btn btn-danger" onclick="DeletePoint(${i})">Remove p${i}</button`)
      j++;
    }
  }
  tableData.push(id);
  tableData.push(pointsData);
  tableData.push(colors);
  tableData.push(okList);
  tableData.push(addButtons);
  tableData.push(delButtons);

  console.log(tableData);
  CreateTable(pointsData.length, tableId, 1, tableData, {
    colors: [2],
    icons: [3],
  });
}
function graf() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: points,
      datasets: [
        {
          label: "šířka x",
          backgroundColor: "rgb(67, 147, 179, 0.5)",
          borderColor: "blue",
          data: x,
        },
        {
          label: "výška y",
          backgroundColor: "rgb(144, 230, 95, 0.5)",
          borderColor: "blue",
          data: y,
        },
      ],
    },
  });
}
