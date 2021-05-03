const strHash = (str, max) => {
    let hash = 0;
    if (str.length == 0)
        return hash;
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
    'This page doesn\'t exist. Oh well!'
];
document.getElementById('404-message').innerText = messages[urlHash];
const repositoryFile = async (owner, repo) => {
    // https://stackoverflow.com/questions/25022016/get-all-file-names-from-a-github-repo-through-the-github-api
    const repsonse = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/master?recursive=1`);
    return repsonse.json();
};
// https://stackoverflow.com/a/36566052/13996389
const similarity = (s1, s2) => {
    const [shorter, longer] = [s1, s2].sort((a, b) => a.length - b.length);
    if (longer.length == 0) {
        return 1.0;
    }
    const editDistance = (s1, s2) => {
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
                            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    };
    return (longer.length - editDistance(longer.toLowerCase(), shorter.toLowerCase())) / longer.length;
};
const mostSimilarSitePage = async (pathname) => {
    const pages = (await repositoryFile('Bulmenisaurus', 'bulmenisaurus.github.io')).tree
        .filter(file => file.path.endsWith('.html'))
        .map(file => file.path.split('.').slice(0, -1).join('.'))
        .sort((a, b) => similarity(a, pathname) - similarity(b, pathname))
        .reverse();
    return { pathname: pages[0], similarity: similarity(pages[0], pathname) };
};
const displayReccomenedUrl = async () => {
    const recommendedUrl = await mostSimilarSitePage(window.location.pathname);
    if (recommendedUrl.similarity > 0.6) {
        const textbox = `<p id="recommended-url">Did you mean <code><a href="${recommendedUrl.pathname}">${recommendedUrl.pathname}</a></code>?<p>`;
        document.body.innerHTML += textbox;
    }
};
displayReccomenedUrl();
