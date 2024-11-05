import { html, css, LitElement } from 'lit';

class SiteCard extends LitElement {
    static styles = css`
        .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 16px;
            margin: 16px;
            width: 200px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
            cursor: pointer;
        }
        .card:hover {
            transform: scale(1.05);
        }
        .card img {
            max-width: 100%;
            border-radius: 4px;
        }
        .card-title {
            font-weight: bold;
            font-size: 1.2em;
        }
        .card-description {
            margin: 8px 0;
            font-size: 0.9em;
        }
        .card-link {
            color: blue;
            text-decoration: underline;
            cursor: pointer;
        }
    `;

    static properties = {
        item: { type: Object },
    };

    render() {
        const { title, description, lastUpdated, url } = this.item;

        return html`
            <div class="card" @click="${() => this.openLink(url)}"> 
                <div class="card-title">${title}</div>
                <div class="card-description">${description}</div>
                <div class="card-last-updated">Last updated: ${lastUpdated}</div>
            </div>
        `;
    }

    openLink(url) {
        window.open(url, '_blank'); 
    }
}

customElements.define('site-card', SiteCard);





