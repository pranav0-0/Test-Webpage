if(document.readyState=="complete"){
    textReplace();
}

var count = 0;
var countFlag = false;
var linkFlag = false;
var conContent = chrome.runtime.connect({name: "connected-content"});

function textReplace(){
    let aWord = /shit|fuck|piss|bitch|dick|cock|pussy|suck|anus|anul|asshole|bastard|blowjob|blow job|boob/i;
    let bWord = /rape|handjob|hand job|incest|jerk off|jerk|masturbate|nigger|nude|slut|tits|titties|twat| cum/i;
    var content = document.getElementsByTagName("span");

    if(window.location.href.includes('google.com/search?'))
    googleSearchLink(aWord,bWord,content);
    else {
        for (let i = 0; i < content.length; i++) {
            content[i].innerHTML = content[i].innerText.replace(aWord,function(x){count+=1;return " **** "});
            content[i].innerHTML = content[i].innerText.replace(bWord,function(x){count+=1;return " **** "});
        }
    }
    console.clear();
    console.log("Text replaced: ");
    console.log(count);
    conContent.postMessage({count: count});
    if(count>100 && countFlag == false){
        countFlag = true;
        alert("This webpage contains sensitive content. It is recommended to leave this site.");
    }
}

function googleSearchLink(aWord,bWord,content) {
    for (let i = 0; i < content.length; i++) {
        content[i].innerHTML = content[i].innerHTML.replace(aWord,function(x){count+=1;return " **** "});
        content[i].innerHTML = content[i].innerHTML.replace(bWord,function(x){count+=1;return " **** "});
    }
}

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.addedNodes.length || mutation.removedNodes.length) {
            textReplace();
        }
    })
})
if(document.readyState=="complete"){
observer.disconnect();
}
else
observer.observe(document.body, {
    childList: true,
    // subtree: true,
});