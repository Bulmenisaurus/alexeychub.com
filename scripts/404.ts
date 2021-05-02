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

interface GithubApiFile {
    path: string,
    mode: string,
    type: string,
    size: number,
    url: string
}

interface GithubApiTree {
    sha: string,
    url: string,
    tree: GithubApiFile[],
}


const fileExtension = (file: string) => {
    return file.split('.').pop();
}

const getAllRepoFiles = async (owner: string, repo: string) => {
    // https://stackoverflow.com/questions/25022016/get-all-file-names-from-a-github-repo-through-the-github-api
    const body = await fetch(`api.github.com/repos/${owner}/${repo}/git/commits/master`);
    return <GithubApiTree>JSON.parse(body.toString());
}

const repoFiles = async (owner: string, repo: string, fileTypes: string[]) => {
    const files = (await getAllRepoFiles(owner, repo)).tree

    return files.filter(i => fileTypes.includes(fileExtension(i.path)));
}

// https://stackoverflow.com/a/36566052/13996389

const similarity = (s1: string, s2: string): number => {

    const [shorter, longer] = [s1, s2].sort((a, b) => a.length - b.length)

    if (longer.length == 0) {
        return 1.0;
    }

    return (longer.length - editDistance(longer, shorter)) / longer.length;
}

const editDistance = (s1: string, s2: string) => {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

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


const mostSimilarSitePage = async (page: string) => {
    const files = await repoFiles('Bulmenisaurus', 'bulmenisaurus.github.io', ['html']);

}