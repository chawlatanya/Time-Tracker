document.getElementById('myForm').addEventListener('submit',saveTask); 
var n=0;
function saveTask(e)
{
	var activity=document.getElementById("task").value;
	console.log(activity);
	var est_time=document.getElementById("time").value;

	var task={
		name:activity,
		time_e:est_time,
		sec:"00",
		min:"00",
		hrs:"00",
		flag:0
		//time_t
		//diff
	};
	var ar=task.time_e.split(":");
		if(ar[2])
		task.sec=ar[2];
		if(ar[1])
		task.min=ar[1];
		if(ar[0])
		task.hrs=ar[0];
	if(localStorage.getItem("tasks")===null)
	{
		var tasks=[];
		tasks.push(task);
		localStorage.setItem("tasks",JSON.stringify(tasks));
	}
	else{
		var tasks=JSON.parse(localStorage.getItem('tasks'));
		tasks.push(task);
		localStorage.setItem("tasks",JSON.stringify(tasks));
 	}
	e.preventDefault();
	
	//console.log(n)
	fetchTask();
}
//var tasks=JSON.parse(localStorage.getItem('tasks'));
function fetchTask()
{  
	var tasks=JSON.parse(localStorage.getItem('tasks'));
	var res=document.getElementById("results");
	res.innerHTML="";
	console.log("tl is"+tasks.length)
	for(var i=0;i<tasks.length;i++)
	{
		console.log("bhow bhow")
		var task=tasks[i].name;

		var time_e=tasks[i].time_e;
		//var time=tasks[i].time_t;	
		
		var min=tasks[i].min;
		var hr=tasks[i].hrs;
		var sec=tasks[i].sec;
		res.innerHTML+="<div class='card' id='c"+i+"'>"
		+"<div class='card-body'>"+"<h5 class='card-title'>"+task+"</h5>"+
       "<ul class='card-text'><li class='est'>Session Length:   "+time_e+"</li><li class='est' >"+"<div style='font-size:30px;top:-10px;'id='el_time_"+i+"'><time>"+hr+":"+min+":"+sec+"</time></div>"+"</li></ul>"+//"<p>Status:"+status+"</p>"
        "<button class='btn btn-primary mybutton b1' onclick='timer("+i+")'+id='s"+i+"'>Start</button>"+"<button class='btn btn-info mybutton b1' onclick='stop("+i+")'"+"id='p"+i+"'>Pause</button>"+"<button class='btn btn-danger mybutton' onclick='deleteTask("+i+")'"+"id='d"+i+"'>Delete Task</button>"
       "</div>"+"</div>";
       console.log(i,hr,min,sec,"fetch");
	}

	//localStorage.setItem("tasks",JSON.stringify(tasks));

}

var tym=[];
var sec=[];
var hr=[];
var min=[];
var times=[];	

function add(i){

var tasks=JSON.parse(localStorage.getItem("tasks"));
if(hr[i]<=0&&min[i]<=0&&sec[i]<=0){
		alert("You better close that tab!!");
		tasks[i].flag=0;
		return stop(i);
	}

sec[i]--;

if(sec[i]<0){
	sec[i]=59;
	//if(min[i]>0)
	min[i]--;
	if(min[i]<0){
		min[i]=59;
		console.log("hr is"+hr[i],min[i],sec[i]);
		
		hr[i]--;
		
		}		console.log("hr now is"+hr[i]);
	}

console.log(i,hr[i],min[i],sec[i],"add");

	var tasks=JSON.parse(localStorage.getItem("tasks"));
		 tasks[i]["hrs"]=hr[i]?(hr[i]>9?hr[i]:"0"+hr[i]):"00";
		 tasks[i]["min"]=min[i]?(min[i]>9?min[i]:"0"+min[i]):"00"
		 tasks[i]["sec"]=sec[i]>9?sec[i]:"0"+sec[i];
	localStorage.setItem("tasks",JSON.stringify(tasks));
	times[i][0]=sec[i];
	times[i][1]=min[i];
	times[i][2]=hr[i];

	

var etime=document.getElementById("el_time_"+i);
etime.style.position="relative";
etime.style.top="10px";
etime.style.fontSize="35px";
etime.textContent=(hr[i]?(hr[i]>9?hr[i]:"0"+hr[i]):"00+")+":"+(min[i]?(min[i]>9?min[i]:"0"+min[i]):"00")+":"+(sec[i]>9?sec[i]:"0"+sec[i]);


var t=timer_main(i)
}


function timer(i){
	console.log("start click");

var tasks=JSON.parse(localStorage.getItem('tasks'));
	
	if(typeof times[i]==="undefined")
	{	console.log("well hello");
		var t=[tasks[i].sec,tasks[i].min,tasks[i].hrs];
		times[i]=t;
		sec[i]=times[i][0];min[i]=times[i][1];hr[i]=times[i][2];
		if(hr[i]<=9)hr[i]=hr[i].split('')[1];
		console.log("hours is"+hr[i]);
		//if(hr[i]=="00")hr[i]=0;
		if(min[i]<=9)min[i]=min[i].split('')[1];
		console.log("min is"+min[i]);
		if(sec[i]<=9)sec[i]=sec[i].split('')[1]	;
		console.log("sec is"+sec[i]);
		

	}
	
	else{
		 sec[i]=times[i][0];
		 min[i]=times[i][1];
		 hr[i]=times[i][2];
		 console.log(hr[i],min[i],sec[i],"timer");
		/* if(hr[i]<=9)hr[i]=hr[i].split('')[1];
		console.log("hours is"+hr[i]);
		//if(hr[i]=="00")hr[i]=0;
		if(min[i]<=9)min[i]=min[i].split('')[1];
		console.log("min is"+min[i]);
		if(sec[i]<=9)sec[i]=sec[i].split('')[1];
		console.log("sec is"+sec[i]);*/
		 
	}
	tasks[i].flag=1;
	localStorage.setItem("tasks",JSON.stringify(tasks));
	timer_main(i);//,sec[i],min[i],hr[i]);
	
}
function timer_main(i){
	
	tym[i] = setTimeout(add,1000,i)
}		

function stop(i){
		
		 
		 clearTimeout(tym[i]);
		 
		 times[i][0]=sec[i];
		 times[i][1]=min[i];
		 times[i][2]=hr[i];
		 var tasks=JSON.parse(localStorage.getItem("tasks"));
		 tasks[i]["hrs"]=hr[i]?(hr[i]>9?hr[i]:"0"+hr[i]):"00";
		 tasks[i]["min"]=min[i]?(min[i]>9?min[i]:"0"+min[i]):"00"
		 tasks[i]["sec"]=sec[i]>9?sec[i]:"0"+sec[i];
		 tasks[i].flag=0;
		 localStorage.setItem("tasks",JSON.stringify(tasks));

}

function deleteTask(i){
	var tasks=JSON.parse(localStorage.getItem("tasks"));
			//	delete tym[i];
		tasks.splice(i,1);
	localStorage.setItem("tasks",JSON.stringify(tasks))
		sec.splice(i,1);
		min.splice(i,1);
		hr.splice(i,1);
		times.splice(i,1);
		/*delete sec[i];
		delete min[i];
		delete hr[i];
		delete times[i];*/
		clearTimeout(tym[i]);
		tym.splice(i,1);

		for(var j=i;j<tasks.length;j++)
		{
			console.log("ding ding"+j);
			if(times[j]&&tasks[j].flag==1)
			timer(j);
		}

		//timer(i);
		//var t=document.getElementById("c"+i)
	//	var tasks=JSON.parse(localStorage.getItem("tasks"));
		//t.style.display="none";
		console.log("delete challa, task len is:"+ tasks.length);
		//n--;
	fetchTask();
} 