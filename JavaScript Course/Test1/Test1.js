'use strict'

class PaginationHelper {
	#pCount = 0;
	constructor(collection, itemsPerPage) {
	// The constructor takes in an array of items and a integer indicating how many
	// items fit within a single page
	this.arrayRef = collection;
	this.itemsPerPage = itemsPerPage;
	if(this.arrayRef.length > 0){
		this.#pCount = Math.floor((this.arrayRef.length-1)/this.itemsPerPage) + 1;
	}
	}

	itemCount() {
	// returns the number of items within the entire collection
		return this.arrayRef.length;
	}

	pageCount() {
	// returns the number of pages
		return this.#pCount;
	}

	pageItemCount(pageIndex) {
	// returns the number of items on the current page. page_index is zero based.
	// this method should return -1 for pageIndex values that are out of range
		if(pageIndex > (this.#pCount - 1) || pageIndex < 0){
			return -1;
		} else if(pageIndex === (this.#pCount - 1) ){
			let count = this.itemCount() % this.itemsPerPage;
			if (count === 0){
				return this.itemsPerPage;
			} else {
				return count;
			}

		};
		return this.itemsPerPage;
	}

	pageIndex(itemIndex) {
	// determines what page an item is on. Zero based indexes
	// this method should return -1 for itemIndex values that are out of range
		if(itemIndex < 0 || itemIndex >= this.itemCount() ){
			return -1;
		}
		return Math.floor(itemIndex/this.itemsPerPage);	
	}
}

const collection = [1, 2, 3, 4, 
	5, 6, 7, 8, 
	9, 10, 11, 12, 
	13, 14, 15, 16, 
	17, 18, 19, 20, 
	21, 22, 23, 24];
const helper = new PaginationHelper(collection, 4);

console.log(helper.pageCount());
console.log(helper.itemCount());

console.log(helper.pageItemCount(5));
console.log(helper.pageItemCount(2));
console.log(helper.pageItemCount(3));
console.log(helper.pageIndex(40));
console.log(helper.pageIndex(22));
console.log(helper.pageIndex(3));
console.log(helper.pageIndex(0));