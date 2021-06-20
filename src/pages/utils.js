const BASE_URL = 'https://api.github.com';

function httpGet(theUrl, returnHeaders) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    if (returnHeaders) {
        return xmlHttp
    }
    return xmlHttp.responseText;
}

// https://gist.github.com/yershalom/a7c08f9441d1aadb13777bce4c7cdc3b
function getFirstCommit(owner, repo) {
    let url = `${BASE_URL}/repos/${owner}/${repo}/commits`;
    let req = httpGet(url, true);
    let firstCommitHash = '';
    if (req.getResponseHeader('Link')) {
        let pageUrl = req.getResponseHeader('Link').split(',')[1].split(';')[0].split('<')[1].split('>')[0];
        let reqLastCommit = httpGet(pageUrl);
        let firstCommit = JSON.parse(reqLastCommit);
        firstCommitHash = firstCommit[firstCommit.length - 1]['sha']
    } else {
        let firstCommit = JSON.parse(req.responseText);
        firstCommitHash = firstCommit[firstCommit.length - 1]['sha'];
    }
    return firstCommitHash;
}

export function getAllCommitsCount(owner, repo, sha) {
    let firstCommit = getFirstCommit(owner, repo);
    let compareUrl = `${BASE_URL}/repos/${owner}/${repo}/compare/${firstCommit}...${sha}`;
    let commitReq = httpGet(compareUrl);
    let commitCount = JSON.parse(commitReq)['total_commits'] + 1;
    // console.log('Commit Count: ', commitCount);
    return commitCount
}

