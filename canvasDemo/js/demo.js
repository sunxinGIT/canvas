		/**
		 * [circularProgress canvas扇形渐变进度条]
		 * @param  {[type]} canvasId   [canvas标签的id，默认宽高300*300]
		 * @param  {Number} percentage [当前进度的百分比 默认50]
		 * @param  {Number} endData    [当前进度的百分比 默认50]
		 * @param  {[type]} times      [当前进度的速度时间，默认1000/60 单位 毫秒]
		 * @param  {Number} r          [扇形进度圆环的半径 默认100]
		 * @return {[type]}            [description]
		 */
		var circularProgress = (canvasId,percentage=50,endData=50,times=1000/60,r=100) =>{
			var canvas = document.getElementById('canvasTest');
			var ctx = canvas.getContext('2d');
			const PI = Math.PI;
			var w = canvas.width || 300; 		//获取画布的宽度
			var h = canvas.height || 300;		//获取画布的高度	
			var initialData = 0;	
			
			var initialX = coordinate(w/2,h/2,PI*3/4,r,'x'); 		//初始位置x轴的坐标
			var initialY = coordinate(w/2,h/2,PI*3/4,r,'y');		//初始位置y轴的坐标
			var initialAngle = 0.75;	//初始位置的角度，即3/4
			var endAngle = percentage*1.5/100+0.75;

			var time = setInterval(function(){
				initialAngle = initialAngle+0.01;
				initialData = initialData + endData/(percentage*1.5);
				drawing(coordinate(w/2,h/2,PI*initialAngle,r,'x'),coordinate(w/2,h/2,PI*initialAngle,r,'x'),initialAngle,initialData);
				if (initialAngle>=endAngle) {
					clearInterval(time);
				}
				if (initialAngle>=2.25) {
					clearInterval(time);
				}
			},times);

			/**
			 * [drawing canvas画图部分]
			 * @param  {[type]} endX         [渐变结束位置x轴的坐标]
			 * @param  {[type]} endY         [渐变结束位置y轴的坐标]
			 * @param  {[type]} initialAngle [渐变初始角度]
			 * @param  {[type]} initialData  [渐变数值]
			 * @return {[type]}              [description]
			 */
			function drawing(endX,endY,initialAngle,initialData) {
				ctx.clearRect(0,0,w,h);		//清除上次画布的残留
				//渐变
				var grd=ctx.createLinearGradient(initialX,initialY,endX,endY);
				grd.addColorStop(0,"green");
				grd.addColorStop(1,"red");

				// 底部背景圆
				ctx.strokeStyle='#ddd';
				ctx.lineWidth = 5;
				ctx.beginPath();
				ctx.arc(w/2,h/2,r,0,2*PI);
				ctx.closePath();
				ctx.stroke();

				// 百分比值
				ctx.fillStyle='#333';	
				ctx.font="bold "+r*4/10+"px Arial";
				ctx.textAlign="center";
				ctx.fillText(initialData.toFixed(1),w/2,h/2);

				ctx.fillStyle="#666";	
				ctx.font=r*2/10+"px Arial";
				ctx.textAlign="center";
				ctx.fillText('数值',w/2,h/2+r*4/10);

				//圆形进度条
				ctx.strokeStyle = grd;
				ctx.lineWidth = 10;
				ctx.beginPath();
				ctx.lineCap='round';
				ctx.arc(w/2,h/2,r,PI*3/4,PI*initialAngle);
				ctx.stroke();
			}

			/**
			 * 获取以(0,0)为原点的canvas，以(a,b)为圆心r为半径圆的坐标
			 * @param  {[type]} a     [圆心x轴坐标]
			 * @param  {[type]} b     [圆心x轴坐标]
			 * @param  {[type]} angle [角度，例：PI*3/4]
			 * @param  {[type]} r     [圆的半径]
			 * @param  {[type]} type  [获取坐标的类型 x x轴，y y轴]
			 * 圆上每个点的:
			 * 		X坐标=a + Math.sin(2*Math.PI / 360) * r ；
			 *  	Y坐标=b + Math.cos(2*Math.PI / 360) * r ；
			 */
			function coordinate(a, b, angle, r, type) {   
		        var X = a + Math.sin(angle+PI/2) * r;
		       	var Y = b - Math.cos(angle+PI/2) * r;
		       	if (type == 'x') {
					return X
		       	}else{
		       		return Y
		       	}  	
			}
		}