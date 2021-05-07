var pointsAll = [];
var myMapPinLayer = { Layer: 0 };
var myMapLineLayer = { Layer: 0 };
var MarkersAll = [];
var defLat = parseFloat((Math.random() * 50).toFixed(1));
var defLen = parseFloat((Math.random() * 50).toFixed(1));

function GeneratePointsData() {
  for (var i = 0; i < 30; i++) {
    var lat = parseFloat(
      defLat + parseFloat((Math.random() / 5).toFixed(4))
    ).toFixed(4); //dodelat
    var lon = parseFloat(
      defLen + parseFloat((Math.random() / 5).toFixed(4))
    ).toFixed(4);
    var point = SMap.Coords.fromWGS84(lat, lon);
    pointsAll.push(point);
  }
}
function onPointClick(pointId) {
    AllTableConfig[0].ActualPageIndex = Math.ceil(pointId / AllTableConfig[0].PageSize - 1) * AllTableConfig[0].PageSize;
    RenderTableRowsLib("table1", 0);
    var rows = document.querySelectorAll("#table1 tbody tr");
    rows[pointId - AllTableConfig[0].ActualPageIndex].style.backgroundColor = "green";
}

function DeletePoint(pointId) {
  pl.removeMarker(MarkersAll[pointId]);
}
function AddPoint(pointId) {
  pl.addMarker(MarkersAll[pointId]);
}



function InitMap(idMap, isControlEn, tableId) {
  var defaultView = SMap.Coords.fromWGS84(defLat, defLen);
  var myMap = new SMap(JAK.gel(idMap), defaultView, 10);
  myMap.addDefaultLayer(SMap.DEF_BASE).enable();
  if (isControlEn) {
    myMap.addDefaultControls();
  }

  MapAddPinLayer(myMap, myMapPinLayer);
  MapAddLineLayer(myMap, myMapLineLayer);
  GeneratePointsData();
  MapRenderPinLayer(pointsAll, myMapPinLayer.Layer);
  MapRenderLineLayer(pointsAll, myMapLineLayer.Layer, 5);

  myMap.getSignals().addListener(this, "marker-click", function (e) {
    var marker = e.target;
    var id = marker.getId();
    if (id.length > 2) {
      onPointClick(parseInt(id[1] + "" + id[2]));
      return;
    }
    onPointClick(id[1]);
  });
}

function MapRenderPinLayer(pointsData, pinLayer) {
  for (var i = 0; i < pointsData.length; i++) {
    MapAddPin(pointsData[i].x, pointsData[i].y, "p" + i, pinLayer);
  }
}

function MapAddPinLayer(map, pinLayer) {
  pinLayer.Layer = new SMap.Layer.Marker();
  map.addLayer(pinLayer.Layer);
  pinLayer.Layer.enable();
}

var marker;
var pl;
function MapAddPin(lat, lon, name, pinLayer) {
  var options = {};
  var pinCoords = SMap.Coords.fromWGS84(lat, lon);
  var marker = new SMap.Marker(pinCoords, name, options);
  pinLayer.addMarker(marker);
  MarkersAll.push(marker);
  pl = pinLayer;
}
function TestaFnc01() {
  pl.removeMarker(marker);
}

function MapAddLineLayer(map, lineLayer) {
  lineLayer.Layer = new SMap.Layer.Geometry();
  map.addLayer(lineLayer.Layer);
  lineLayer.Layer.enable();
}

function MapRenderLineLayer(pointsData, lineLayer, lineWidth) {
  for (var i = 0; i < pointsData.length - 1; i++) {
    MapAddLine(
      pointsData[i],
      pointsData[i + 1],
      GetRandomColor(),
      lineWidth,
      lineLayer
    );
  }
}

function MapAddLine(pointStart, pointEnd, lineColor, lineWidth, lineLayer) {
  var data = [pointStart, pointEnd];
  var options = {
    color: lineColor,
    width: lineWidth,
    outlineWidth: 0,
  };
  var line = new SMap.Geometry(SMap.GEOMETRY_POLYLINE, null, data, options);
  lineLayer.addGeometry(line);
}
function GetRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
