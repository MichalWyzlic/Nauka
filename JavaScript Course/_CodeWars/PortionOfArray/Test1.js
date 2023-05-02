function portion(a,i,n){
	if(Math.abs(i) >= a.length ){
    	return -1
	}

	if( i >= 0){
		if((i+n)>=a.length){
			return -1;
		}
		return a.slice(i, i+n);
	}

	if( i < 0){
		if(n>=a.length + i){
			return -1;
		}
		return a.slice(i-n, i);
	}
}


console.log(portion([1,2,3,4],1,2));
console.log(portion([1,2,3,4],-1,2));
