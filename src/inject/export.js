/**
* [Main function / wraper]
* @return {[CSV]} [export.js will parse all subscribers then export them into a csv file]
* @since 1.0.0
*/
(function() {
// Fire click event for Get Results to display first set of subscribers
document.querySelector('#start_search').click();
// Set timeout for 4 seconds then load all subscribers
setTimeout( function() { getAllSubs(); }, 4000 );
/**
* [getAllSubs Load all records into the DOM]
* @return {[Data]} [Show all records on the screen]
*/
function getAllSubs() {
	// Load hack to load all records into the DOM
	var subsCount = document.getElementById('subscribers_info').innerHTML.split(" ")[2].replace(/,/g, "");
	var selectTag = document.getElementsByTagName('select')[0];
	// Create an option tag with value = total number of subs
	var optionTag = document.createElement('option');
	optionTag.value = subsCount;
	optionTag.innerHTML = subsCount;
	// Prepend tag to select tag
	selectTag.insertBefore(optionTag, selectTag.firstChild);
	selectTag.selectedIndex = 0;
	var event = new Event('change');
	selectTag.dispatchEvent(event);
	// Set timeout for 11 seconds then load function to download all data
	setTimeout(function(){ downloadAllSubs(); }, 11000);
}
/**
* [downloadAllSubs Collect all of the requested data and download into a CSV file]
* @return {[CSV]} [CSV file]
*/
function downloadAllSubs() {
	var subscriberTable = document.getElementById("subscribers");
	var subscribers = subscriberTable.children[1].children;
	var header = "ID,First Name,Last Name,Mobile #,Subscriptions,Last Activity,Username";
	var rows = [...subscribers].map((row) => {
		return row.children[0].innerHTML + "," +
		row.children[1].innerHTML + "," +
		row.children[2].innerHTML + "," +
		row.children[3].outerHTML.match(/\d{3}-\d{3}-\d{4}/) + "," +
		row.children[4].innerHTML + "," +
		row.children[5].innerHTML + "," +
		row.children[6].innerHTML;
	});
	/**
	 * [Export data in a CSV file]
	 * @type {[CSV Export]}
	 */
	var csvString = header + "\n" + rows.join("\n");
	var blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
	var csvLink = document.createElement("a");
	var url = URL.createObjectURL(blob);
	csvLink.setAttribute("href", url);
	csvLink.setAttribute("download", "subscriber_data.csv");
	csvLink.style.visibility = 'hidden';
	document.body.appendChild(csvLink);
	csvLink.click();
	document.body.removeChild(csvLink);
}
})();