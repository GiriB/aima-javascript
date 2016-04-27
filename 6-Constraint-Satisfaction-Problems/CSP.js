//TODO: figure out the structure of CSP to make it generalised 
// each node should have keys like id, neigbohours etc


//inputs: a binary CSP with X, D, C
//	X : set of variables 
//	D : domains for each of the vairables 
//	C : set of binary constraints
//local variables: queue 
//		queue : a queue of arcs, initially all arcs in csp 

var Queue = require('./queue.js');



// Neighbour of each state is not required to be out in X. 
// Neigbour info only reqiured during populatin the constraints 

var notEqual = function (A,B){
	return !(A===B);
}

var CSP = {
	//X holds the name of the variables 
	X : ['SA','WA','NT','Q','NSW','V','T'],
	// D holds the domain for variables as key,value pairs
	D : {'SA':['green','red','blue'],
		 'WA':['green','red','blue'],
		 'NT':['green','red','blue'],
		 'Q':['green','red','blue'],
		 'NSW':['green','red','blue'],
		 'V':['green','red','blue'],
		 'T':['green','red','blue']		
		},
	
	//QQ: constraints are more like sets of variables !  
	C : [['SA','WA',notEqual],['NT','WA',notEqual],['SA','Q',notEqual],['SA','NSW',notEqual],['SA','V',notEqual],['NSW','V',notEqual],['NSW','Q',notEqual],['SA','NT',notEqual],['NT','Q',notEqual]],

	//value for each key(variable) is a neighbour of the variable and the constraint that needs to
	// satisfied. The neigbours object can be derived from a C, and need not be provided separately.
	//neigbours property is used in AC-3 algo
	neighbours : { 'SA' : { 'WT' : notEqual, } ,
				   'WT' : { 'SA' : notEqual,  },
	}
};




function AC_3 (csp) {

	queue = Queue();
	console.log("Created queue")

	//fill queue with all the arcs 
	//All the arcs are all pairs of Xi,Xj
	// for all constraints push queue.push([Xi,Xj])
	// populate the queue with all the arc
	for(i=0;i<csp.C.length;i++){
		//the first variable in the constraint
		var A = csp.C[i][0];
		//the second variable in the constraint
		var B = csp.C[i][1];
		queue.push([A,B]); 
	}

	// console.log("Initial queue : " ,queue);

	while(! queue.isEmpty() ){
		// (Xi,Xj) <- REMOVE-FIRST(queue)
		arc = queue.pop();
		Xi = arc[0];
		Xj = arc[1];


		if ( REVISE(csp,Xi,Xj) ){
			
			//if size of Di == 0
			if (csp.D[Xi].length == 0){
				return false;
			}

			//neighbours of Xi
			var neighbours = csp.neigbours[Xi];
			
			for (var Xk in neighbours ) {
				if(Xk != Xj){
					// QQ: Xk,Xi or Xi,Xk 
					// If we add Xk,Xi does that mean that C should have double constraint
					// like an entry for SA,WT and one for WT,SA ?? 
					queue.push([Xk, Xi]);
				}
			}
		}

	}

	return true ;

}



function REVISE(csp, Xi, Xj){
	var revised = false ;

	// QQ : can there be more than one constraints between two vairbles 
 	// should this be constratint or constriants ?  
	

	//  get the constraint between Xi and Xj
	var constraint = getConstraints(csp,Xi,Xj);

	if(!constraint){
		console.error("constraint is false??");
	}
	// E.g it will return notEqual

	// TODO : This should be used if multiple constrians allowed between 
	// two variables.
	
	// // for all constraints between Xi and Xj
	// 		for( var f=0; f < constraints.length ; f++ ){


	// 		}



	//for all possible values in domain of Xi
	for( var i=0; i<csp.D[Xi].length; i++){
		var  satisfied = false ;
		//value for Xi
		x = csp.D[Xi][i];
		for ( var j=0; j< csp.D[Xj].length; j++){
			//value for Xj
			y = csp.D[Xj][j];

			if(constraint(x,y)){
				satisfied = true;
				break;		
			}
			//  if constrained (x,y) satisfied 
			//	 	del csp.D[Xi][i]
			// 		revised = True
			//		break 
		}

		if (! satisfied){
			// the constraint was not satisfied by any value for y 
			
			//find the index of the value 'x' in the domain of 'Xi'  and DELETE it from the list
			var index = csp.D[Xi].indexOf(x);
			if (index > -1) {
				// index can never be -1
    			csp.D[Xi].splice(index, 1);
			}
			console.log("revised istrue");
			revised =true;
		}

		return revised;
	}
}


function getConstraints(csp,Xi,Xj){

	// find the constraint that is between Xi and Xj
	// constraints can be of form Xi,Xj or Xj,Xi
	for (i=0;i<csp.C.length;i++) {
		if( ( (csp.C[i][0] == Xi) && (csp.C[i][1] == Xj) ) || ( (csp.C[i][0] == Xj) && (csp.C[i][1] == Xi) ) ){
			return csp.C[i][2]; 
		}
	}

	return false;

}


console.log(CSP);
val = AC_3(CSP);
console.log(val);
console.log("After ac" ,CSP);

// queue = Queue();
// queue.show();
// console.log(queue.pop());
// console.log(queue.push(114));
// console.log(queue.pop());



