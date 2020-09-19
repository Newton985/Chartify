chartData=[];
chartDetails={};
chartDetails.theme="fusion";
chartDetails.exportEnabled=1;
categoriesArray=[];
datasetArray=[];
dataSource={};
smallDataSource={};

var chartType="mscolumn2d";

var labelsArray=[];
var labelsArrayIndex=0;

var categoriesArrayForInput=[];
var categoryArryForInput=[];
var datasetArrayForInput=[];
var dataArrayForInput=[];

var categoriesObject={};

var seriesControl=0;
var seriesname;
var currentSeriesName;

var chartConfig={type:'column2d',renderAt:'chart-container', width:'100%', height:'450'};


if(sessionStorage.getItem('storedData')){
    chartDetails=JSON.parse(sessionStorage.getItem('storedData')).chartdetails;
    dataSource=JSON.parse(sessionStorage.getItem('storedData')).datasource;

    chartDetails.theme="fusion";
    if(chartType.includes('3',0)){chartType=chartType.replace('3','2');}
}

removedFromDChartData=[];

switchState={onOff:'off'};
var controlInt=2;

var chartTitleInput=document.getElementById("chart-title");
var chartSubtitleInput=document.getElementById("chart-subtitle");
var yAxisNameInput=document.getElementById("y-axis-name");
var xAxisNameInput=document.getElementById("x-axis-name");
var labelInput=document.getElementById("label");
var valueInput=document.getElementById("value");
var undoInput=document.getElementById("unDoButton");
var redoInput=document.getElementById("redoButton");
var switchToggle=document.getElementById("switchToggle");
var switchToggleMode=document.getElementById("switchToggleMode");
var settingsDiv=document.getElementById("settingsDiv");
var uploadExcel=document.getElementById("uploadExcel");
var seriesNameInput=document.getElementById("series-name");

var chartTypes=[{type:'mscolumn2d',renderAt:'column-chart'},
                {type:'stackedcolumn2d',renderAt:'stacked-column'},
                {type:'msbar2d',renderAt:'bar-chart'},
                {type:'stackedbar2d',renderAt:'stacked-bar'}];


var columnChartTypes=['simple','stacked','overlapping','inverted'];
var barChartTypes=['simple','stacked','overlapping'];
var lineChartTypes=['simple','spline','step','inverted'];
var areaChartTypes=['simple','spline','stacked','inverted'];
var pieChartTypes=['simple','doughnut'];
var bubbleChartTypes=['simple','quadrant','scatter'];
var paretoChartTypes=['simple','dual'];
var pyramidChartTypes=['simple','funnel'];
var spiderChartTypes=['simple',];
var candleStickChartTypes=['simple'];

createChart();



seriesNameInput.addEventListener('keypress',function(event){
if(event.keyCode===13){
    dataArrayForInput=[];
        if(seriesControl===0){
        seriesname=seriesNameInput.value;
        currentSeriesName=seriesNameInput.value;

        datasetArrayForInput[seriesControl]={seriesname:seriesname};
        seriesControl+=1;

        labelInput.focus();
    }else{
        seriesname=seriesNameInput.value;
        if(seriesname!=currentSeriesName){
        datasetArrayForInput[seriesControl]={seriesname:seriesname};
        seriesControl+=1;
        
        if(labelsArray.length>0){
            labelInput.value=labelsArray[0];
            labelsArrayIndex+=1;
            valueInput.focus();

        }

        }
    }
}
});

chartTitleInput.addEventListener('keypress', function(e){
if(e.keyCode===13){
    if(chartTitleInput.value!=""){
        chartDetails.caption=chartTitleInput.value;
        chartSubtitleInput.focus();
        createChart();
        
    }
}
});

chartSubtitleInput.addEventListener('keypress',function(e){
    if(e.keyCode===13){
        if(chartSubtitleInput.value!=""){
            chartDetails.subCaption=chartSubtitleInput.value;
            xAxisNameInput.focus();
            createChart();
        }
    }
});

yAxisNameInput.addEventListener('keypress',function(e){
    if(e.keyCode===13){
        if(yAxisNameInput.value!=""){
            chartDetails.yAxisName=yAxisNameInput.value;
            seriesNameInput.focus();
            createChart();
        }
    }
});

xAxisNameInput.addEventListener('keypress',function(e){
    if(e.keyCode===13){
        if(xAxisNameInput.value!=""){
            chartDetails.xAxisName=xAxisNameInput.value;
            yAxisNameInput.focus();
            createChart();
        }
    }
});


labelInput.addEventListener('keypress',function(e){
    if(e.keyCode===13){
        if(labelInput.value!=""){

           valueInput.focus();
        }
    }
});

valueInput.addEventListener('keypress',function(e){
    if(e.keyCode===13){
        if(labelInput.value&&valueInput.value){

            //add value
            dataEntry={value:valueInput.value};
            dataArrayForInput.push(dataEntry);
            datasetArrayForInput[seriesControl-1].data=dataArrayForInput;

           //if its first entry
            if(seriesControl===1){
               //add category
               category_entry={label:labelInput.value};
               categoryArryForInput.push(category_entry);
               categoriesArrayForInput.push({category:categoryArryForInput});

                labelsArray.push(labelInput.value);
                labelInput.value="";
                valueInput.value="";
                labelInput.focus();
            }else{

                labelInput.value=labelsArray[labelsArrayIndex];
                valueInput.value="";
                valueInput.focus();
                labelsArrayIndex+=1;

                if(labelsArrayIndex===labelsArray.length+1){
                    labelsArrayIndex=0;
                    seriesNameInput.value="";
                    valueInput.value="";
                    seriesNameInput.focus();
                    labelInput.value="";
                  }
          
            }

            dataSource.categories=categoriesArrayForInput;
            dataSource.dataset=datasetArrayForInput;
              createChart();

                 //create small charts
                 chartTypes.forEach(chartTypeObject=>{createSmallChart(chartTypeObject.renderAt,chartTypeObject.type)});
            
        }
    }
});


undoInput.addEventListener('click',function(e){
    if(chartData.length>0){
   removedFromDChartData.push(chartData.pop());
    createChart();
            //create small charts
            //chartTypes.forEach(chartTypeObject=>{createSmallChart(chartTypeObject.renderAt,chartTypeObject.type)});
    labelInput.focus();
    }
});

redoInput.addEventListener('click',function(e){
    if(removedFromDChartData.length>0){
        chartData.push(removedFromDChartData.pop());
        createChart();
        labelInput.focus();
    }
});


switchToggle.addEventListener('click',function(e){
    controlInt+=1;
    if(controlInt%2!=0){
        return;
    }else{

        if(chartType==='mscolumn2d'||chartType==='mscolumn3d'){

        if(switchState.onOff==='off'){
            chartType='mscolumn3d';
            switchState.onOff='on';
        }
       else{
            chartType='mscolumn2d';
            switchState.onOff='off';
        }

    }else if(chartType==='stackedcolumn2d'||chartType==='stackedcolumn3d'){
        if(switchState.onOff==='off'){
            chartType='stackedcolumn3d';
            switchState.onOff='on';
        }
       else{
            chartType='stackedcolumn2d';
            switchState.onOff='off';
        }

    }else if(chartType==='msbar2d'||chartType==='msbar3d'){

        if(switchState.onOff==='off'){
            chartType='msbar3d';
            switchState.onOff='on';
        }
       else{
            chartType='msbar2d';
            switchState.onOff='off';
        }

    }else if(chartType==='stackedbar2d'||chartType==='stackedbar3d'){
        if(switchState.onOff==='off'){
            chartType='stackedbar3d';
            switchState.onOff='on';
        }
       else{
            chartType='stackedbar2d';
            switchState.onOff='off';
        }
    }

        controlInt=2;
    createChart();

}

});

switchToggleMode.addEventListener('click',function(e){
    controlInt+=1;

    if(controlInt%2!=0){
        return;
    }else{

    if(chartDetails.theme==="fusion"){
        chartDetails.theme="candy";
    }
   else{
        chartDetails.theme="fusion";
    }

    controlInt=2;
    createChart();
   
}

});



//upload excel 
uploadExcel.addEventListener('change',function(e){

    //remove items from datasource,categories array and dataset array if any
    dataSource={};
    categoriesArray=[];
    datasetArray=[];

var selectedFile=e.target.files[0];
var fileReader=new FileReader();

fileReader.onload=function(event){
    var data=event.target.result;
    var workbook=XLSX.read(data,{type:'binary'});

    workbook.SheetNames.forEach(sheet => {
        let rowObject=XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
        //let jsonObject=JSON.stringify(rowObject);


        //get the object keys and remove the first one, its the title
        myKeys=Object.keys(rowObject[0]);
        myKeys.shift();

        //add the remaining keys to category array
        categoryArray=[];
        myKeys.forEach(key=>{
           categoryArray.push({label:key});
        });

        //add the category array to categories array
        categoriesArray.push({category:categoryArray});

        //for each rowObject get data and create the dataset

        rowObject.forEach(object=>{
            keys=Object.keys(object);
            datasetObject={};
            datasetObject.seriesname=object[keys[0]];
            keys.shift();

            dataArray=[];
            keys.forEach(key=>{
                dataValue=object[key];
                dataArray.push({value:dataValue});
            });
            datasetObject.data=dataArray;
            datasetArray.push(datasetObject);
        });
        
     
    });

    dataSource.dataset=datasetArray;
    dataSource.categories=categoriesArray;

    createChart();
          //create small charts
   chartTypes.forEach(chartType=>{createSmallChart(chartType.renderAt,chartType.type)});
}

fileReader.readAsBinaryString(selectedFile);

});





function createChart(){
     
    if(dataSource&&chartDetails){

    sessionStorage.setItem('storedData',JSON.stringify({datasource:dataSource,chartdetails:chartDetails}));}

    dataSource.chart=chartDetails;

    FusionCharts.ready(function(){
      new FusionCharts({
      type:chartType,
      renderAt:"chart-container",
      width: "100%",
      height: "450",
      dataSource}).render();
    });
}



function createSmallChart(renderAt,chartType1){
    smallChartDetails={theme:"fusion"};
    smallDataSource.chart=smallChartDetails;
    smallDataSource.categories=[];
    smallDataSource.dataset=[];

     smallDataSource.categories.push({category:dataSource.categories[0].category.slice(0,2)});
     smallDataSource.dataset=dataSource.dataset.slice(0,2);
    FusionCharts.ready(function(){
      new FusionCharts({
      type:chartType1,
      renderAt: renderAt,
      width: "100%",
      height: "150",
      dataSource:smallDataSource}).render();
    });
}




var viewColumn=document.getElementById("view-column");
var viewStackedColumn=document.getElementById("view-stacked-column");
var viewBar=document.getElementById("view-bar");
var viewStackedBar=document.getElementById("view-stacked-bar");

viewColumn.addEventListener('click',function(e){
     if(chartType.includes("2d")){
          chartType='mscolumn2d';
     }else{
         chartType='mscolumn3d';
     }
     
     createChart();
});

viewStackedColumn.addEventListener('click',function(e){

    if(chartType.includes("2d")){
        chartType='stackedcolumn2d';
   }else{
       chartType='stackedcolumn3d';
   }
   createChart();
});

viewBar.addEventListener('click',function(e){
    if(chartType.includes("2d")){
        chartType='msbar2d';
   }else{
       chartType='msbar3d';
   }
   createChart();
});

viewStackedBar.addEventListener('click',function(e){
    if(chartType.includes("2d")){
        chartType='stackedbar2d';
   }else{
       chartType='stackedbar3d';
   }
   createChart();
});


  
  











