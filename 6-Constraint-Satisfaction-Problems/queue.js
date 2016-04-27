module.exports = function FIFOQueue() {
    /**
     *
     */
    // constructor() {
    //     this.queue = [];
    // }

    Queue = {
    	queue : [],
    /**
     *
     * @returns {T}
     */

	    show :function(){
	    	console.log(this.queue +"is the queue");
	    },

		pop :function() {
			// console.log("pop");
			// console.log(queue);
		    return this.queue.shift();
		},

		/**
		 *
		 * @param element
		 */
		push :function(element) {
			// console.log("sdssdhere");
		    return this.queue.push(element);
		},

		/**
		 * Return the size of the queue
		 * @returns {Number}
		 */
		size :function() {
		    return this.queue.length;
		},

		isEmpty:function() {
			// console.log("is Empty");
		    return (this.queue.length == 0);
		},
	};

    return Queue;
}