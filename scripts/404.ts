const strHash = (str: string, max: number) => {

    let hash = 0;

    if (str.length == 0) return hash;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    return Math.abs(hash) % max + 1;
};


const urlHash = strHash(window.location.href, 5);
console.log(urlHash);
const messages = [
    'Well..... this is akward. A 404. Do you perhaps want some tea?',
    'Oh no! What are these weird numbers? Is it a secret code? Are aliens communicating with me? Nope, It\'s just a 404 page!',
    'Oh no! This page doesn\'t seem to exist!\nAnyway..',
    'Ouch, it looks like this page doesn\'t exist.',
    'Sadly, a 404 error occured. I wonder if you can collect the next card in the series, a 405, too.',
    'This page doesn\'t exist. Oh well!'];

document.getElementById('404-message').innerText = messages[urlHash];

/* getting the "did you mean foo" section*/

interface GithubFile {
    path: string,
    mode: string,
    type: string,
    size: number,
    url: string
}

interface GithubTree {
    sha: string,
    url: string,
    tree: GithubFile[],
}


const repositoryFile = async (owner: string, repo: string) => {
    // https://stackoverflow.com/questions/25022016/get-all-file-names-from-a-github-repo-through-the-github-api
    const body = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/commits/master`);
    return <GithubTree>JSON.parse(body.toString());
}

// https://stackoverflow.com/a/36566052/13996389

const similarity = (s1: string, s2: string): number => {

    const [shorter, longer] = [s1, s2].sort((a, b) => a.length - b.length)

    if (longer.length == 0) {
        return 1.0;
    }

    const editDistance = (s1: string, s2: string) => {
        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    }

    return (longer.length - editDistance(longer.toLowerCase(), shorter.toLowerCase())) / longer.length;
}

const mostSimilarSitePage = async (page: string) => {
    const files = await repositoryFile('Bulmenisaurus', 'bulmenisaurus.github.io');

}