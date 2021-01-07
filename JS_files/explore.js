class PageCard {
    constructor(card = PageCard.empty) {
        this.card = card;
    }

    static get empty() {
        return {
            title: {
                link: '',
                label: '',
            },

            body: {
                description: '',
                gitHub: {
                    cssLines: '',
                    htmlLines: '',
                    jsLines: '',
                    lastCommit: '',
                },
            },

            footer: {
                size: '',
                gitHub: {
                    fileName: '',
                },
            },
        };
    }

    toHtml() {
        const { title, body, footer } = this.card;
        const html = `<div class="card">
            <h2 class="title"><a href="${title.link}">${title.label}</a></h2>
            <div class="body">
                <div class="description">
                    ${body.description}
                </div>
                <div class="github-stats">
                    <p><span class="int">${body.gitHub.jsLines}</span> lines of JS</p>
                    <p><span class="int">${body.gitHub.cssLines}</span> lines of CSS</p>
                    <p><span class="int">${body.gitHub.htmlLines}</span> lines of HTML</p>
                </div>
            </div>
            <div class="footer">
                <span class="github-last-updated">${body.gitHub.lastCommit}</span> • <span class="file-name">${footer.gitHub.fileName}</span>
            </div>
        </div>`

    }


}


const pageCard = new PageCard;
pageCard;