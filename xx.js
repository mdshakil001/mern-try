// const reviews = [
// 	{
// 		name: 'john',
// 		rating: 4.5,
// 		comment: 'this is good'
// 	},
// 	{
// 		name: 'tim',
// 		rating: 4.3,
// 		comment: 'this is ok.'
// 	},
// 	{
// 		name: 'robin',
// 		rating: 4.0,
// 		comment: 'this is not bad'
// 	}
// ];

// // const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

// const ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
// console.log(ratings.toFixed(2));

// ===================================
// ============= reducer =============
// ===================================
// const arr = [ 2, 4, 6, 8, 9, 12, 45 ];
// const reducee = arr.reduce((acc, item, indx, xtra) => {
// 	console.log(indx);
// 	// console.log(xtra);
// 	console.log("acc = ", acc);
// 	console.log("item = ", item);
// 	return item + acc;
// }, 5);
// console.log(reducee);

// ==============================================================================
// ============= Check if an Object is Empty in JavaScript =================
// =======================================================================
const a = {
	// name: 'shak',
	// age: 25
};
if (a) { 
	console.log("haay");
}
console.log(Object.keys(a).length);

const b = 10
if (b) { 
	console.log('b');
}