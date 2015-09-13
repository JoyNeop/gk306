// -----------------------
// Config
var hiddenFragmentPlaceholder = '______________';
var hiddenFragmentPlaceholder = '';

// -----------------------
// Reusable
var generateUniqueRandomNumbers = function (total, poolSize) {
    var arr = [];
    while (arr.length < total) {
        var randomnumber = Math.floor(Math.random()*poolSize);
        var found = false;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i]==randomnumber) {
                found=true;
                break;
            };
        };
        if (!found) {
            arr[arr.length] = randomnumber;
        };
    };
    return arr;
};


// -----------------------
// Prase tree
var xhr = new XMLHttpRequest();
xhr.open('GET', './js/source.json', true);
xhr.send();
xhr.onload = function () {
    var source = JSON.parse(this.responseText);

    var selectedNumbers = generateUniqueRandomNumbers(10, source.length);
    var selectedSentences = selectedNumbers.map(function(n){
        return source[n];
    });
    // console.log(selectedSentences);
    var selectedFragments = selectedSentences.map(function(n){
        var rand = Math.floor(Math.random()*n.length);
        // console.log( (n.length-rnd >= 0) ? 'ok' : '!!!!!!' );
        var tmp = '';
        if (rand == 0 && rand == n.length-1) {
            // The first one && the last one
            // The only one
            tmp = n[rand];
        } else if (rand == 0 && rand != n.length-1) {
            // The first one && not the last one
            // The leading one
            tmp = n[rand] + hiddenFragmentPlaceholder;
        } else if (rand != 0 && rand == n.length-1) {
            // Not the first one && the last one
            // The ending one
            tmp = hiddenFragmentPlaceholder + n[rand-1].charAt(n[rand-1].length-1) + n[rand];
        } else {
            // The middle one
            tmp = hiddenFragmentPlaceholder + n[rand-1].charAt(n[rand-1].length-1) + n[rand] + hiddenFragmentPlaceholder;
        };
        console.log(tmp);
        return tmp;
    });

    document.getElementById('cont').innerHTML = selectedFragments.join('<br />');
};
