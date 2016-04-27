A = {  'B' :  {'C':'c','D':'d'},
       'C' : {'D':'d','E':'e'}       
    }

for(var i in A['B']){
	console.log(i + A['B'][i]);
}
console.log(A);

delete A['B']['D']

console.log(A);
console.log(A.length);
