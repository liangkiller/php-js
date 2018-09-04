// Minimalize menu
$('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

});

//菜单收起
$('#side-menu').metisMenu();

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
    $('#menu_op').text("");
    $('#menu_op').text("展开菜单");
}
function instrument(id_prefix){
		var id_des="#"+id_prefix+"_des";
		var id_tip="#"+id_prefix+"_tips";
		$(id_des).mouseover(function(){
			$(id_tip).show("slow");
		});
		$(id_des).mouseout(function(){
				$(id_tip).hide("slow");
		});
}

// Close ibox function
$('.close-link').click(function () {
    var content = $(this).closest('div.ibox');
    content.remove();
});

// Collapse ibox function
$('.collapse-link').click(function () {
    var ibox = $(this).closest('div.ibox');
    var button = $(this).find('i');
    var content = ibox.find('div.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
        ibox.resize();
        ibox.find('[id^=map-]').resize();
    }, 50);
});

//基本配置
Highcharts.setOptions({
	global: {
		useUTC: false
	}
});

var highcharts_base_options={
		xAxis:{
			labels: {
	            style: {
	                fontSize: '13px',
	                fontFamily: 'Verdana, sans-serif',
	            }
	        },
		    dateTimeLabelFormats: {
		        second: '%Y-%m-%d<br/>%H:%M:%S',
		        minute: '%Y-%m-%d<br/>%H:%M',
		        hour: '%Y-%m-%d<br/>%H:%M',
		        day: '%Y<br/>%m-%d',
		        week: '%Y<br/>%m-%d',
		        month: '%Y-%m',
		        year: '%Y'
		    },
		},
		colors: ['#7cb5ec','#90ed7d', '#f7a35c','#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1','#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce','#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a','#4572A7', '#AA4643', '#89A54E', '#80699B','#3D96AE','#DB843D','#8085e9','#82293B','#92A8CD', '#A47D7C', '#B5CA92'],
		yAxis: {
			title:{text:''},
			min: 0,
			tickAmount:6,
		},
		title: {
			text: '',
		},
		legend: {
			enabled: true,
			align: 'right',
			y:-10,
			verticalAlign: 'top',
			floating: true,
			borderColor: '#CCC',
			borderWidth: 1,
			shadow: false,
		},
		plotOptions:{
		    series:{
		    	turboThreshold:0,
		        events: {
		            legendItemClick: function () {
						if(this.name == '点击反选'){
							for(i in this.chart.series){
								var series = this.chart.series[i];
								if (series.visible) {
									series.hide();
								} else {
									series.show();
								}
							}
							return false;
						}
		            }
		        } ,
		    },
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
				dataLabels: {
			         enabled: true,
			         rotation: 0,
			         color: '#000',
			         align: 'center',
			         format: '{point.y}',
					 y:0,
			         style: {
			             fontSize: '10px',
			             fontFamily: 'Verdana, sans-serif'
			         },
				},
			},
		},
		tooltip: {
		    split: true,
		    distance: 30,
		    padding: 5,
		    xDateFormat:'%Y-%m-%d',
	        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	        //pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y}</b></td></tr>',
			pointFormatter: function(){
				if(this.series.name != '点击反选'){
					return '<tr><td style="color:'+this.series.color+';padding:0">'+this.series.name+': </td><td style="padding:0"><b>'+this.y+'</b></td></tr>';
				}
			},
	        footerFormat: '</table>',
	        shared: true,
	        useHTML: true
		},
};

//柱状图
var column_options={
		chart: {
			type: 'column',
		},
};

//曲线图
var spline_options={
		chart: {
			type: 'spline',
		},
};
//极坐标
var polar_options={
	chart: {
		type: 'line',
		polar: true,
	},
	title: {
			text: '',
	},
    pane: {
        size: '80%'
    },
    xAxis: {
        tickmarkPlacement: 'on',
        lineWidth: 0
    },
    yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
    },
    plotOptions: {
        series: {
            pointPlacement: 'on'
        }
    },
	tooltip: {
	    split: true,
	    distance: 30,
	    padding: 5,
	    xDateFormat:'%Y-%m-%d',
	    pointFormat: '<table><tr><td><span style="color:{series.color};padding:0">{series.name}</span>: </td><td style="padding:0"><b>{point.y}</b></td></tr></table>',
	    shared: true,
	    useHTML: true
	},
	legend: {
		enabled:true,
		align: 'right',
		y:-10,
		verticalAlign: 'top',
		floating: true,
		borderColor: '#CCC',
		borderWidth: 1,
		shadow: false,
	},
};
var pie_options={
    chart: {
        type: 'pie'
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.2f}%</b>'
    },
	title: {
			text: '',
	},
	plotOptions:{
		pie:{
			allowPointSelect:true,
			innerSize:'50%',
			cursor:'pointer',
			dataLabels:{
				enabled:true,
				color:'#000000',
				format:'<b>{point.name}</b>:{point.percentage:.2f}%'
			}
		}
	},
}

var column_base_options=$.extend(true,{},highcharts_base_options,column_options);
var spline_base_options=$.extend(true,{},highcharts_base_options,spline_options);

function interact_highcharts_spline(dom_id,data,url,interval,option=''){
	//交互曲线图
	var interact_spline_options_default={
		chart: {
			animation: Highcharts.svg,
			marginRight: 10,
			events: {
					load: function () {
						// set up the updating of the chart each interval
						if(this.series.length == 1){
							var series = this.series[0];
							var loadData = function() {
								$.getJSON(url,function(response) {
									if(series.name == response.data[0].name){
										var js_data=response.data[0].data[0];
										series.addPoint(js_data, true, true);
									}
								});
							}
							loadData();
							setInterval(loadData, interval);
						}else{
							var seriesinfo={};
							var arr=[];
							for(var i in this.series){
								var series = this.series[i];
								var seriestitle=series.yAxis.userOptions.title.text;
								var seriesindex=series.index;
								arr[seriesindex]=series;
								seriesinfo[seriestitle]=i;
							}
							for (var key in seriesinfo){
								var loadData = function() {
									$.getJSON(url,function(response) {
										var dataseries='';
										dataseries=response[key]['data'];
										if(dataseries !=''){
											for(var k in dataseries){
												if(arr[k].name == dataseries[k].name){
													arr[k].addPoint(dataseries[k].data[0], true, true);
												}
											}
										}

									});
								}
								loadData();
								setInterval(loadData, interval);
							}
						}
				}
			}
		},
		xAxis:{
				type: 'datetime',
				tickPixelInterval: 150,
		},
		tooltip: {
			pointFormat: '<br/><b>{series.name}</b>: {point.y}'
		},
	};
	if (option){
		interact_spline_options_options=$.extend(true,{},spline_base_options,interact_spline_options_default,option);
	}else{
		interact_spline_options_options=$.extend(true,{},spline_base_options,interact_spline_options_default);
	}
	interact_spline_options_options.series=data;

	return Highcharts.chart(dom_id,interact_spline_options_options);
}

function highcharts_spline(dom_id,title='',data='',option=''){
	//曲线图
	var spline_options_default={
		xAxis:{
			type: 'category',
		},
		plotOptions: {
			column: {
				dataLabels: {
					enabled: true,
					color:'white'
				},
			},
		},
	};

	if (option){
		base_spline_options=$.extend(true,{},spline_base_options,spline_options_default,option);
	}else{
		base_spline_options=$.extend(true,{},spline_base_options,spline_options_default);
	}
	if(data ==''){
		data=[{name:'Default',data:[['2018-01-01',0]]}];
	}
	if(base_spline_options.xAxis.type=='category'){
		base_spline_options.xAxis.categories=title;
	}
	base_spline_options.series=data;
	return Highcharts.chart(dom_id,base_spline_options);
}

function highcharts_pie(dom_id,title='',data='',option=''){
	//饼图
	var pie_options_default={
	    chart: {
	        plotBackgroundColor: null,
	        plotBorderWidth: null,
	        plotShadow: false,
	        type: 'pie'
	    },
	    tooltip: {
	        pointFormat: '<br/><b>{series.name}</b>: {point.y}'
	    },
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '{point.name}:<b>{point.percentage:.2f}%</b>',
	                style: {
	                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                },
	            },
	            showInLegend: true,
	        }
	    },
	};

	if (option){
		base_pie_options=$.extend(true,{},highcharts_base_options,pie_options_default,option);
	}else{
		base_pie_options=$.extend(true,{},highcharts_base_options,pie_options_default);
	}
	if(data ==''){
		data=[{name:'Default',data:[['Default',1]]}];
	}
	base_pie_options.series=data;
	return Highcharts.chart(dom_id,base_pie_options);
}


function hightcharts_stack_column(dom_id,title,data,option=''){
	//累积柱状图默认配置
	var stack_column_options_default={
		xAxis:{
			type: 'category',
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				dataLabels: {
					enabled: true,
					color:'white'
				},
			},
		},
	};


	if (option){
		stack_column_options=$.extend(true,{},column_base_options,stack_column_options_default,option);
	}else{
		stack_column_options=$.extend(true,{},column_base_options,stack_column_options_default);
	}
	if(stack_column_options.xAxis.type=='category'){
		stack_column_options.xAxis.categories=title;
	}
	stack_column_options.series=data;
	return Highcharts.chart(dom_id,stack_column_options);

}
//通用highchart,data里要有title
function highchart_general(dom_id,data='',option='',extra="",stock=0){
	if(stock){
		var basic_options_default={
	        navigator: {
	            adaptToUpdatedData: true,
	        },
	        rangeSelector: {
	            enabled: false,
	            inputEnabled:false,
            	selected: 0,
	            buttons: [
	            {
					type: 'week',
					count: 1,
					text: '1w',
				},
	            {
					type: 'month',
					count: 1,
					text: '1m',
				},{
					type: 'year',
					count: 1,
					text: '1y'
				}, {
					type: 'all',
					text: 'All'
				}],
	        },
			xAxis: {
		        type: 'datetime',
		        dateTimeLabelFormats: {
		            second: '%Y-%m-%d<br/>%H:%M:%S',
		            minute: '%Y-%m-%d<br/>%H:%M',
		            hour: '%Y-%m-%d<br/>%H:%M',
		            day: '%Y<br/>%m-%d',
		            week: '%Y<br/>%m-%d',
		            month: '%Y-%m',
		            year: '%Y'
		        }
	    	},
	        yAxis: {
	        	opposite: false
	    	},
			legend:{
				enabled: false,
				align: 'right',
				verticalAlign: 'top',
				width:500,
				y:-10,
				floating: true,
				borderWidth: 1,
				backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
				shadow: true
			},
		    tooltip: {
		        split: true,
		        distance: 30,
		        padding: 5,
		        xDateFormat:'%Y-%m-%d',
		        pointFormat: '<tr><td><span style="color:{series.color};padding:0">{series.name}</span>: </td>' +
	            '<td style="padding:0"><b>{point.y}</b></td></tr>',
		    },
			plotOptions: {
				extra:extra,
			},
		};
	}else{
		var basic_options_default={
			xAxis:{
				type: "category",
			},
			plotOptions: {
				extra:extra,
				column: {
					pointPadding: 0.2,
					borderWidth: 0,
					dataLabels: {
			            enabled: true,
			            rotation: 0,
			            y:0,
			            color: '#000',
			            align: 'center',
			            format: '{point.y}',
			            style: {
			                fontSize: '11px',
			                fontFamily: 'Verdana, sans-serif'
			            },
					},
				},
			},
		};
	}

	if(option){
		basic_options=$.extend(true,{},highcharts_base_options,basic_options_default,option);
	}else{
		basic_options=$.extend(true,{},highcharts_base_options,basic_options_default);
	}
	if(dom_id.indexOf('polar')>0){
		basic_options=$.extend(true,{},option,polar_options);
	}
	if(dom_id.indexOf('pie')>0){
		basic_options=$.extend(true,{},option,pie_options);
	}

	if(data ==''){
		if(basic_options.yAxis instanceof Array){
			data=[{name:'Default',data:[['2018-01-01',0]],yAxis: 0},
				{name:'Default',data:[['2018-01-01',0]],yAxis: 1}];
		}else{
			data=[{name:'Default',data:[['2018-01-01',0]]}];
		}

	}

	basic_options.series=data;
	if(extra === 0){
		var extra_data=[];
		for(var k=0; k<data[0].data.length;k++){
			extra_data[k]=[];
			extra_data[k][0]=data[0].data[k][0];
			extra_data[k][1]=parseInt(extra);
		}
		basic_options.series.unshift(
			{
			        type: 'spline',
			        name: '点击反选',
			        data: extra_data,
			        marker: {
			            lineWidth: 2,
			        },
			        color:'#000',
			        dataLabels:{enabled: false},
			        showInLegend:true,
					dataGrouping: {
		                units: [[
		                    'week', // unit name
		                    [1] // allowed multiples
		                ]]
		            }
			    }
			);
	}

	if(stock){
		return Highcharts.stockChart(dom_id,basic_options);
	}else{
		return Highcharts.chart(dom_id,basic_options);
	}
}

function hightcharts_category_column(dom_id,title='',data='',option='',extra=""){
	//柱状图默认配置
	var basic_column_options_default={
		xAxis:{
			type: 'category',
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
				dataLabels: {
		            enabled: true,
		            rotation: 0,
		            color: '#000',
		            align: 'center',
		            format: '{point.y}',
					y:7,
		            style: {
		                fontSize: '11px',
		                fontFamily: 'Verdana, sans-serif'
		            },
				},
			},
		},
	};

	if(option){
		basic_column_options=$.extend(true,{},column_base_options,basic_column_options_default,option);
	}else{
		basic_column_options=$.extend(true,{},column_base_options,basic_column_options_default);
	}
	if(data ==''){
		data=[{name:'Default',data:[['2018-01-01',0]]}];
	}
	if(basic_column_options.xAxis.type=='category' && title!=''){
		basic_column_options.xAxis.categories=title;
	}
	basic_column_options.series=data;
	if(extra){
		var extra_data=[];
		for(var k in title){
			extra_data[k]=parseInt(extra);
		}
		basic_column_options.series.push(
			{
			        type: 'spline',
			        name: '阈值',
			        data: extra_data,
			        marker: {
			            lineWidth: 2,
			        },
			        color:'#8CBEEE',
			        dataLabels:{enabled: false,},
			    }
			);
	}
	return Highcharts.chart(dom_id,basic_column_options);

}

function highStockChart_column(dom_id,title,data,option='',extra="",stack=0){
	//动态柱状图默认配置
	var zoom_column_options_default={
        rangeSelector: {
            selected: 0,
            inputEnabled:false,
            buttons: [
            {
				type: 'week',
				count: 1,
				text: '1w',
			},
            {
				type: 'month',
				count: 1,
				text: '1m',
			}, {
				type: 'month',
				count: 6,
				text: '6m'
			},{
				type: 'year',
				count: 1,
				text: '1y'
			}, {
				type: 'all',
				text: 'All'
			}],
        },
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
				dataLabels: {
		            enabled: true,
		            rotation: 0,
		            color: '#000',
		            align: 'center',
		            y:0,
		            format: '{point.y}',
		            style: {
		                fontSize: '11px',
		                fontFamily: 'Verdana, sans-serif'
		            },
				},
			},
		},
		xAxis: {
	        type: 'datetime',
	        dateTimeLabelFormats: {
	            second: '%Y-%m-%d<br/>%H:%M:%S',
	            minute: '%Y-%m-%d<br/>%H:%M',
	            hour: '%Y-%m-%d<br/>%H:%M',
	            day: '%Y<br/>%m-%d',
	            week: '%Y<br/>%m-%d',
	            month: '%Y-%m',
	            year: '%Y'
	        }
    	},
        yAxis:{opposite: false},
    	legend:{enabled: false}
	};

	if (option){
		zoom_column_options=$.extend(true,{},column_base_options,zoom_column_options_default,option);
	}else{
		zoom_column_options=$.extend(true,{},column_base_options,zoom_column_options_default);
	}
	if(stack){
		var stackopt={
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true,
						color:'white'
					},
				},
			},
		}
		zoom_column_options=$.extend(true,{},zoom_column_options,stackopt);
	}
	zoom_column_options.series=data;

	if(extra){
		var extra_data=[];
		for(var k=0; k<data[0].data.length;k++){
			extra_data[k]=[];
			extra_data[k][0]=data[0].data[k][0];
			extra_data[k][1]=parseInt(extra);
		}
		zoom_column_options.series.push(
			{
			        type: 'spline',
			        name: '阈值',
			        data: extra_data,
			        marker: {
			            lineWidth: 2,
			        },
			        color:'#8CBEEE',
			        dataLabels:{enabled: false},
			        showInLegend:false,
					dataGrouping: {
		                units: [[
		                    'week', // unit name
		                    [1] // allowed multiples
		                ]]
		            }
			    }
			);
	}
	return Highcharts.stockChart(dom_id,zoom_column_options);
}

function datatable_create(dom_id,title="",data="",option=''){
	var table_base_options={
				dom: '<"html5buttons"B>lTfgitp',
				order:[[ 0, 'desc' ]],
				lengthMenu: [ 10, 25, 50, 100 ],
                buttons: [
                    {extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},
                    {extend: 'print',
                     customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');
                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
						}
                    }],
		};

	if (option){
		table_options=$.extend(true,{},table_base_options,option);
	}else{
		table_options=$.extend(true,{},table_base_options);
	}
	if(title==''){
		table_options.columns=[{ title: "Default" }];
		table_options.data=[['NULL']];
	}
	if(title !='' && data == ""){
		tmpdata=[];
		for(var i in title){
			tmpdata[i]='NULL';
		}
		table_options.columns=title;
		table_options.data=[tmpdata];
	}

	if(data !=""){
		table_options.columns=title;
		table_options.data=data;
	}

	return $("#"+dom_id).DataTable(table_options);
}
//单个datatables对象搜索
function search_datatable_create(dom_pre,table_obj,url){
		var search_options = {
			url:url,
			beforeSubmit:  check,  //提交前处理
			success: res, //提交成功后的回调函数
			resetForm: false,
			dataType:  'json'
		};
		var ori_data=table_obj.data().toArray();
		$('#'+dom_pre+'_form').bind('input propertychange', function() {
			$(this).ajaxSubmit(search_options);
			return false;
		});
		function check(formData, jqForm, options) {
				var search = $("#"+dom_pre+"_name").val();
				if(search.length == 0){
					$("#"+dom_pre+"_msg").html("初始值");
					table_obj.clear().draw();
					table_obj.rows.add(ori_data).draw();
					return false;
				}else{
					table_obj.clear().draw();
					$("#"+dom_pre+"_msg").html("正在搜索："+search);
					return true;
				}
		}
		function res(responseText, statusText)  {
			if(responseText){
				$("#"+dom_pre+"_msg").html("搜索成功");
				var tmp_data=[];
				var tmp_arr=responseText.split("#");
				for(var i in tmp_arr){
					tmp_data[i]=tmp_arr[i].split(',');
				}
				table_obj.clear().draw();
				table_obj=table_obj.rows.add(tmp_data).draw();
			}else{
				$("#"+dom_pre+"_msg").html("没有结果");
			}
		}
}
//通用搜索，可以取代search_datatable_create
function general_search(dom_pre,obj_arr,url,type="propertychange",trigger='',dataopt=''){
		var search_options = {
			url:url,
			beforeSubmit:  check,  //提交前处理
			success: res, //提交成功后的回调函数
			resetForm: false,
			dataType:  'json'
		};
		var search='';
		var combo_opt=['column','spline'];
		var old_data={};
		var upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if(trigger){
			if(type == "change"){
				$('#'+trigger).change(function() {
					$('#'+dom_pre+'_form').ajaxSubmit(search_options);
					return false;
				});
			}
		}else{
			if(type == "propertychange"){
				$('#'+dom_pre+'_form').bind('input propertychange', function() {
					$(this).ajaxSubmit(search_options);
					return false;
				});
			}
			if(type == "change"){
				$('#'+dom_pre+'_form').change(function() {
					$(this).ajaxSubmit(search_options);
					return false;
				});
			}
			if(type == "submit"){
				$('#'+dom_pre+'_form').submit(function() {
					$(this).ajaxSubmit(search_options);
					return false;
				});
			}
			if(type == "all"){
				$('#'+dom_pre+'_form').ajaxSubmit(search_options);
				return false;
			}
		}
		for(var key in obj_arr){
			if(key.indexOf('table') >= 0){
				old_data[key]=obj_arr[key].data();
			}
		}
		function check(formData, jqForm, options) {
			search = $("#"+dom_pre+"_name").val();
			if(!search){
				search = $("#"+dom_pre).val();
			}
			if(!search){
				//checkbox
				var chk_value =[];
	            $('input[name="'+dom_pre+'[]"]:checked').each(function(){
	            	chk_value.push($(this).val());
	            });
	            search=chk_value.join(',');
			}
			if(!search){
				//radio
				search = $("input[name='"+dom_pre+"_name']:checked").val();
			}
			if(!search){
				for(i in upper){
					search = $("#"+dom_pre+"_name"+upper[i]).val();
					if(search){
						break;
					}
				}
			}
			if(search=== undefined || search.length == 0){
				$("#"+dom_pre+"_msg").html("清空图形，请输入查询项");
				for(var key in obj_arr){
					if(key.indexOf('table') >= 0){
						obj_arr[key].clear().draw();
						if(old_data[key]){
							obj_arr[key]=obj_arr[key].rows.add(old_data[key]).draw();
						}
					}else{
						highchart_remove(obj_arr[key]);
						obj_arr[key].addSeries({name:"Default",data:[['2018-01-01',0]]});
					}
				}
				return false;
			}else{
				$("#"+dom_pre+"_msg").html("正在搜索："+search);
				return true;
			}
		}
		function res(responseText, statusText)  {
			var res_success=0;
			var res_fault=0;
			for(var key in obj_arr){
				if(key.indexOf('table') >= 0){
					if(responseText[key]){
						res_success +=1;
					}else{
						res_fault +=1;
					}
				}else{
					if(responseText[key] ){
						if(responseText[key].data && responseText[key].data.length>0){
							res_success +=1;
						}else if(responseText[key].length>0){
							res_success +=1;
						}
					}else{
						res_fault +=1;
					}
				}
			}
			$("#"+dom_pre+"_msg").html(res_success+'项搜索成功'+'；'+res_fault+"项没有结果");
			for(var key in obj_arr){
				//清初旧数据
				if(key.indexOf('table') >= 0){
					if(obj_arr[key] instanceof Object){
						obj_arr[key].clear().draw();
					}
				}else if(key.indexOf('text') >= 0){
					$("#"+key).html('x');
				}else{
					highchart_remove(obj_arr[key]);
				}

				if(key.indexOf('text') >= 0){
					if(responseText[key]){
						$("#"+key).html(responseText[key]);
					}
				}
				if(key.indexOf('combo') >= 0){
					if(responseText[key]){
						for(var i in responseText[key].data){
							obj_arr[key].addSeries(responseText[key].data[i]);
						}
					}
				}
				if(key.indexOf('pie') >= 0){
					if(responseText[key]){
						var pieOpt={
							series:{data:responseText[key].data.data},
						};
						obj_arr[key].update(pieOpt,1,1);
					}
				}
				if(key.indexOf('polar') >= 0){
					if(responseText[key]){
						if(responseText[key].data.category){
							var polarOpt={
								xAxis:{categories:responseText[key].data.category},
								series:{data:responseText[key].data.data},
							};
						}else{
							var polarOpt={
								series:[],
							};
							for(var i in responseText[key].data){
								polarOpt.series[i]={
									name:responseText[key].data[i].name,
									data:responseText[key].data[i].data,
								};
							}
						}
						obj_arr[key].update(polarOpt,1,1);
					}
				}
				if(key.indexOf('spline') >= 0 || key.indexOf('column') >= 0){
					if(responseText[key]){
						for(var i in responseText[key].data){
							obj_arr[key].addSeries(responseText[key].data[i]);
						}
						if(responseText[key].title){
							for(var k in responseText[key].title){
								var v = responseText[key].title[k];
								$("#"+key+"_title").append("<option value=" + v + ">" + v + "</option>");
							}
						}
						if(obj_arr[key].userOptions.plotOptions.extra===0){

							obj_arr[key].addSeries({'name':'点击反选','data':0, 'color':'#000'});
						}
					}
				}
				if(key.indexOf('table') >= 0){
					if(responseText && responseText[key] && responseText[key].title){
						obj_arr[key].destroy();
						$('#'+key).empty(); // empty in case the columns change
						var opt={
							dom: '<"html5buttons"B>lTfgitp',
							order:[[ 0, 'desc' ]],
							lengthMenu: [ 10, 25, 50, 100 ],
			                buttons: [
			                    {extend: 'copy'},
			                    {extend: 'csv'},
			                    {extend: 'excel', title: 'ExampleFile'},
			                    {extend: 'pdf', title: 'ExampleFile'},
			                    {extend: 'print',
			                     customize: function (win){
			                            $(win.document.body).addClass('white-bg');
			                            $(win.document.body).css('font-size', '10px');
			                            $(win.document.body).find('table')
			                                    .addClass('compact')
			                                    .css('font-size', 'inherit');
									}
			                    }],
            				columns: responseText[key].title,
            				data:    responseText[key].data
						};
						if(dataopt){
							opt=$.extend(true,{},dataopt,opt);
						}
						obj_arr[key] = $('#'+key).DataTable(opt);
					}else if(responseText[key]){
							var tmp_data=[];
							var tmp_arr=responseText[key].split("#");
							for(var i in tmp_arr){
								tmp_data[i]=tmp_arr[i].split(',');
							}
							obj_arr[key]=obj_arr[key].rows.add(tmp_data).draw();
					}
				}
			}
		}
}

function highchart_remove(chart){
	if(chart && chart.series){
		if(inseries(chart,'Navigator 1')){
			l=chart.series.length-1;
		}else{
			l=chart.series.length;
		}
		for(var i=0;i<l;i++){
			chart.series[0].remove();
		}
	}
}

function inseries(chart,search_name){
	var isfind=0;
	for(var i in chart.series){
		if(chart.series[i].name==search_name){
			isfind=1;
			break;
		}else{
			isfind=0;
		}
	}
	return isfind;
}
//总览搜索
function search_summary(dom_pre,tbody_id,url,type="propertychange"){
		var search_options = {
			url:url,
			beforeSubmit:  check,  //提交前处理
			success: res, //提交成功后的回调函数
			resetForm: false,
			dataType:  'json'
		};
		if(type == "propertychange"){
			$('#'+dom_pre+'_form').bind('input propertychange', function() {
				$(this).ajaxSubmit(search_options);
				return false;
			});
		}
		if(type == "change"){
			$('#'+dom_pre+'_form').change(function() {
				$(this).ajaxSubmit(search_options);
				return false;
			});
		}
		function check(formData, jqForm, options) {
				var search = $("#"+dom_pre+"_name").val();
				$("#"+tbody_id).html("");
				if(search.length == 0){
					return false;
				}else{
					return true;
				}
		}
		function res(responseText, statusText)  {
			if(responseText[tbody_id]){
				var html='';
				if(responseText[tbody_id].length==1){
	 				$.each(responseText[tbody_id][0], function( key,val) {
			 			var td_circle='<td  class="no-borders">'+key+'<span class="label label-info pull-right">'+val+'</span></td>';
			 			html += '<tr><td class="no-borders"><i class="fa fa-circle text-navy"></i></td>'+td_circle+'</tr>';
	 				});
 				}else{
 					var data=[];
	 				$.each(responseText[tbody_id], function( i, data_varr ) {
		 				var thead=[];
		 				var tmp_data=[];
		 				$.each(data_varr,function(key,val){
		 						thead.push(key);
		 						tmp_data.push(val)
		 				});
		 				data.push(thead);
		 				data.push(tmp_data);
	 				});
	 				for(var i=1;i<data.length;i++){
	 					if(data[i].toString() == data[0].toString()){
	 						delete data[i];
	 					}
	 				}
					for (var i in data){
						html += '<tr>';
						for(var k in data[i]){
							html +='<td>'+data[i][k]+'</td>';
						}
						html += '</tr>';
					}
	 			}
 				$("#"+tbody_id).append(html);
			}
		}
}

function search_summary_change(dom_pre,tbody_obj,url){
		var search_options = {
			url:url,
			beforeSubmit:  check,  //提交前处理
			success: res, //提交成功后的回调函数
			resetForm: false,
			dataType:  'json'
		};
		$('#'+dom_pre+'_form').change(function() {
			$(this).ajaxSubmit(search_options);
			return false;
		});
		function check(formData, jqForm, options) {
				var search = $("#"+dom_pre).val();
				for(var i in tbody_obj ){
					var tbody_id=tbody_obj[i];
					$("#"+tbody_id).html("");
				}
				if(search.length == 0){
					return false;
				}else{
					$('#'+dom_pre+'_msg').html("正在处理");
					return true;
				}
		}
		function res(responseText, statusText)  {
			for(var i in tbody_obj ){
				var tbody_id=tbody_obj[i];
				if(responseText[tbody_id]){
					var html='';
					$('#'+dom_pre+'_msg').html("处理成功");
					if(typeof(responseText[tbody_id].length)=='undefined'){
				 			html = '<tr><td class="no-borders"><i class="fa fa-circle text-navy"></i></td>NULL</tr>';
					}
					if(responseText[tbody_id].length==1){
		 				$.each(responseText[tbody_id][0], function( key,val) {
				 			var td_circle='<td  class="no-borders">'+key+'<span class="label label-info pull-right">'+val+'</span></td>';
				 			html += '<tr><td class="no-borders"><i class="fa fa-circle text-navy"></i></td>'+td_circle+'</tr>';
		 				});
	 				}else if(responseText[tbody_id].length >1){
	 					var data=[];
		 				$.each(responseText[tbody_id], function( i, data_varr ) {
			 				var thead=[];
			 				var tmp_data=[];
			 				$.each(data_varr,function(key,val){
			 						thead.push(key);
			 						tmp_data.push(val)
			 				});
			 				data.push(thead);
			 				data.push(tmp_data);
		 				});
		 				for(var i=1;i<data.length;i++){
		 					if(data[i].toString() == data[0].toString()){
		 						delete data[i];
		 					}
		 				}
						for (var i in data){
							html += '<tr>';
							for(var k in data[i]){
								html +='<td>'+data[i][k]+'</td>';
							}
							html += '</tr>';
						}
		 			}
				}else{
					$('#'+dom_pre+'_msg').html("没有数据");
				 	html = 'NULL';
				}
				$("#"+tbody_id).append(html);
			}
		}
}

function form_submit(pre,url,check_func='',res_func='',type='submit'){
		var search_options = {
			url:url,
			beforeSubmit:  check_func?check_func:check,  //提交前处理
			success: res_func?res_func:res, //提交成功后的回调函数
			resetForm: false,
			dataType:  'json',
			type:'post'
		};
		var search ='';
		if(type=='submit'){
			$('#'+pre+'_form').submit(function() {
				$(this).ajaxSubmit(search_options);
				return false;
			});
		}
		if(type=='change'){
			$('#'+pre+'_form').change(function() {
				$(this).ajaxSubmit(search_options);
				return false;
			});
		}
		if(type == "all"){
			$('#'+pre+'_form').ajaxSubmit(search_options);
			return false;
		}
		function check(formData, jqForm, options) {
			search = $('#'+pre+'_name').val();
			if(!search){
				search = $("#"+dom_pre).val();
			}
			if(search=== undefined || search.length == 0){
				return false;
			}else{
				$('#'+pre+'_msg').html("正在处理："+search);
				return true;
			}
		}
		function res(responseText, statusText)  {
			if(responseText.success){
				$('#'+pre+'_msg').html(responseText.success);
				return true;
			}else{
				$('#'+pre+'_msg').html(responseText.error);
				return false;
			}
		}
}

function datatable_form(pre,url,table_obj,dom_id,html){
	var search;
	function check_func(formData, jqForm, options) {
			search = $('#'+pre+'_name').val();
			if(search.length == 0){
				return false;
			}else{
				$('#'+pre+'_msg').html("正在添加："+search);
				return true;
			}
	}

	function res_func(responseText, statusText)  {
		if(responseText.data){
			$("#"+pre+"_msg").html("新增成功");
			//新增html
            html_re=html.replace(/REPLACE/g, search);
            add_new_row(dom_id,html_re);
            //数据写入表
			var tmp_data=[];
			var tmp_arr=responseText.data.split("#");
			for(var i in tmp_arr){
				tmp_data[i]=tmp_arr[i].split(',');
			}
			table_obj.clear().draw();
			table_obj=table_obj.rows.add(tmp_data).draw();
		}else{
			$("#"+pre+"_msg").html("没有返回值，新增失败");
			return false;
		}
		if(responseText.picture.data){
			var opt={
				colors:['#64E572', '#FF9655'],
				yAxis:{
					title: {
						text: search,
					},
				},
			};
			interact_highcharts_spline(search,responseText.picture.data,'getNewPoint?name='+search,60000,opt);
		}
	}

	form_submit(pre,url,check_func,res_func);
}



function add_new_row(dom_id,html){
	$('#'+dom_id).append(html);
}

function interact_datatable(table_obj,url,interval){
	interval_ms=interval*1000;
	var loadData = function() {
		$.getJSON(url,function(response) {
			if(response !=''){
				var tmp_data=[];
				var tmp_arr=response.split("#");
				for(var i in tmp_arr){
					tmp_data[i]=tmp_arr[i].split(',');
				}
				table_obj.clear().draw();
				table_obj.rows.add(tmp_data).draw();
			}
		});
	}
	loadData();
	setInterval(loadData, interval_ms);
}
//设置value
function setHiddenValue(id1,id2){
	var v1=$("#"+id1).val();
	if(v1){
		$("#"+id2).val(v1);
	}
};
//设置text
function setText(id1,id2,type="text"){
	var v1=getVal(id1);
	if(v1){
		if(type=="text"){
			$("#"+id2).text(v1);
		}
		if(type=="value"){
			$("#"+id2).val(v1);
		}
	}
}
function setClassText(id1,id2,type="text"){
	var v1=getVal(id1);
	if(v1){
		if(type=="text"){
			$("."+id2).text(v1);
		}
		if(type=="value"){
			$("."+id2).val(v1);
		}
	}
};
function getVal(id){
	var v1=$("#"+id).val();
	return v1;
}

//地图
function highchart_map(dom_id,mapData,joinName,response,userOptions=""){
	var options={
		"chart": {
			"borderWidth": 1
		},
		"colors": ['rgba(196,4,1,0.1)', 'rgba(196,4,1,0.5)', 'rgba(196,4,1,1)'],
		"title": {
			"text": ''
		},
		"legend": {
			"enabled": true,
            "layout": 'vertical',
            "align": 'right',
            "verticalAlign": 'middle'
		},
		"tooltip": {
			"useHTML": true
		},
		"series": [{
			"mapData": mapData,
			"joinBy": [joinName, "id"],
			"name": '中国',
            "dataLabels": {
                "enabled": true,
                format: "{point.id}"
            },
		}]
	};
	if(response){
		options.series[0].keys=response.keys;
		//判断返回值是否为空,用's'标识
		if(response.data[0][1]!='s'){
			options.series[0].data=response.data;
		}else{
			options.series[0].data="";
		}
		options.series[0].tooltip={
				"headerFormat": '',
				"pointFormatter": function () {
					var tooltips=[];
					for(var i=1;i<response.tooltips.length;i++){
						if(response.tooltips[i]=="sort"){
							continue;
						}
						tooltips.push([response.tooltips[i],eval("this."+response.keys[i])]);
					}
					return '<b>' + this.id + '</b><br/>' +
						Highcharts.map(tooltips, function (line) {
							return '<span style="color:' + line[2] +
								// Colorized bullet
								'">\u25CF</span> ' +
								line[0] + ': ' +
								Highcharts.numberFormat(line[1], 0)+
								'<br/>';
						}).join('');
				}
			}
	}
	if (userOptions){
		options=$.extend(true,{},options,userOptions);
	}
	return Highcharts.mapChart(dom_id, options);
}

function search_map(pre,obj,url){
		var search_options = {
			url:url,
			beforeSubmit:  check,  //提交前处理
			success: res, //提交成功后的回调函数
			error:function() {
        		$('#'+pre+'_msg').html("查询超时");
				$('#'+pre+'_submit').removeAttr("disabled");
    		},
			resetForm: false,
			dataType:  'json',
			timeout:   30000,
		};
		$('#'+pre+'_form').submit(function() {
			$(this).ajaxSubmit(search_options);
			return false;
		});
		function check(formData, jqForm, options) {
			var search = $("input[name='"+pre+"_name']:checked").val();
			if(search.length == 0){
				return false;
			}else{
				$('#'+pre+'_msg').html("正在处理："+search);
				obj.update({series:[{data:""}]});
				$('#'+pre+'_submit').attr({"disabled":"disabled"});
				return true;
			}
		}
		function res(responseText, statusText)  {
			$('#'+pre+'_submit').removeAttr("disabled");
			if(responseText){
				$('#'+pre+'_msg').html("查询成功");
				obj.update({series:[{"data":responseText.data}]});
				if(responseText.keys.length<2){
					$('#'+pre+'_msg').html("查询成功，返回数据为空");
				}
				return true;
			}else{
				$('#'+pre+'_msg').html("查询失败");
				return false;
			}
		}
}
//select联动，提交;1的结果赋给2
function select_change(selec1,url,selec2='',type="submit"){
		var search_options = {
			url:url,
			beforeSubmit:  check,  //提交前处理
			success: res, //提交成功后的回调函数
			resetForm: false,
			dataType:  'json'
		};
		var select1text=$("#"+selec1+" .disabled").text();
		var select2text=$("#"+selec2+" .disabled").text();
		if(type == "submit"){
			$('#'+selec1+'_form').submit(function() {
					$(this).ajaxSubmit(search_options);
					return false;
			});
		}
		if(type == "all"){
			$('#'+selec1+'_form').ajaxSubmit(search_options);
			return false;
		}
		function check(formData, jqForm, options) {
			$("#"+selec2).empty();
			$("#"+selec2).append("<option value='' disabled selected>"+select2text+"</option>");
		}
		function res(responseText, statusText)  {
			if(selec2){
				if(responseText){
					for(var i in responseText){
						for(var j in responseText[i]){
							$("#"+selec2).append("<option value=" + responseText[i][j]['domain'] + ">" + responseText[i][j]['domain'] + "</option>");
						}
					}
					setHiddenValue(selec1,"selected"+selec1);
				}else{
						$("#"+selec2).empty();
						$("#"+selec2).append("<option value='' disabled selected>"+select2text+"</option>");
				}
			}
		}
}

function waterbubble(id,value,userOptions=""){
    var	options={
	    radius: 60,
	    lineWidth: 5,
	    waterColor: '#198BC9',
	    textColor: '#065580',
	    font: 'bold 30px "Microsoft YaHei"',
	    wave: true,
	    animation: true
	}
	if (userOptions){
		options=$.extend(true,{},options,userOptions);
	}
	options.txt=value+"%";
	if(value >= 100){
		options.waterColor='#FF0000';
		options.data=1;
	}else{
		options.data=value/100;
	}
	return $('#'+id).waterbubble(options);
}
//typeahead搜索
function typeahead_search(souid,desid,url,index,type="typeahead",all=0,selected=1){
		$.post(url,{param:$('#'+souid).val(),index:index},function(response){
			if(response){
				if(type=="typeahead"){
					desid.source.data=response;
					$.typeahead(desid);
				}
				if(type=="select"){
					if(all){
						var alltext=$("#"+desid+" option[value='all']").text();
					}
					$("#"+desid).empty();
					if(all){
						if(selected){
							$("#"+desid).append("<option value='all'>" +alltext + "</option>");
						}else{
							$("#"+desid).append("<option value='all' selected=true>" +alltext + "</option>");
						}
					}
					for(var i in response){
						if(selected){
							if( i == 0){
								$("#"+desid).append("<option value='" + response[i] + "' selected='selected'>" + response[i] + "</option>");
								$("."+index+"_text").text(response[i]);
							}else{
								$("#"+desid).append("<option value='" + response[i] + "'>" + response[i] + "</option>");
							}
						}else{
								$("#"+desid).append("<option value='" + response[i] + "'>" + response[i] + "</option>");
						}
					}
				}
			}
		});
}
//select option设置
function set_select_option(dom_id,data){
	for(var i in data){
		$("#"+dom_id).append("<option value=" + data[i] + ">" + data[i] + "</option>");
	}
}
