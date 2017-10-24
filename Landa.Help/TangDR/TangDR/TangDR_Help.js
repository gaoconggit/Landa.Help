/*
 * @function：getMax 得到数组最大数 
 * @function：getMin 得到数组最小数
 * 
 *
 *
 *
 * 
 * */

(function(){
	$.extend({
		getMax: function(obj){
			var max = obj[0];
			$(obj).each(function(i){
				if( max < obj[i])
				{
					max = obj[i];
				}		
			})
			return max;
		},
		getMin: function(obj){
			var min = obj[0];
			$(obj).each(function(i){
				if( min > obj[i])
				{
					min = obj[i];
				}		
			})
			return min;
		}	
		
		
	
	})
}($))
