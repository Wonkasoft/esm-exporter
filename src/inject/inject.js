chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("ESM Exporter is ready");
		// ----------------------------------------------------------
		var btn_go = document.createElement( 'button' );
		btn_go.append( 'Export Subscribers' );
		btn_go.id = 'export-now';
		document.querySelector( 'body' ).prepend(btn_go);
		btn_set = document.getElementById( 'export-now' );
		btn_set.style.position = 'fixed';
		btn_set.style.right = '0';
		btn_set.style.margin = '15px 45px';
		btn_set.style.zIndex = '9999';
		btn_set.style.opacity = '1';
		btn_set.style.transition = 'all 2s ease-in-out';
		btn_set.onclick = function() {
		btn_set.style.opacity = '.6';
		document.querySelector('#start_search').click();
		setTimeout( function() { return getAllSubs(); }, 5000 );
		};

		function getAllSubs() {
		    var subsCount = document.getElementById('subscribers_info').innerHTML.split(" ")[2].replace(/,/g, "");
		    var selectTag = document.getElementsByTagName('select')[0];

		    // create an option tag with value = total number of subs
		    var optionTag = document.createElement('option');
		    optionTag.value = subsCount;
		    optionTag.innerHTML = subsCount;
		    // prepend tag to select tag
		    selectTag.prepend(optionTag);
		    selectTag.selectedIndex = 0;
		    var event = new Event('change');
		    selectTag.dispatchEvent(event);
		   setTimeout(function(){ return downloadAllSubs(); }, 10000);
		}

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
		    btn_set.style.opacity = '0';
		    setTimeout(function(){ btn_set.remove(); console.log("Your exported data file is ready to be saved"); }, 10000);
		}
    }
    }, 10);
});