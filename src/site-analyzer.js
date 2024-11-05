import { html, css, LitElement } from 'lit';
import './site-card.js';
import './site-overview.js';

class SiteAnalyzer extends LitElement {
    static styles = css`
        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .input-area {
            margin: 20px;
        }
        .cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            max-width: 1200px;
        }
    `;

    constructor() {
        super();
        this.siteData = null;
        this.items = [];
        this.siteTitle = '';
    }

    render() {
        return html`
            <div class="container">
                <div class="input-area">
                    <label for="siteUrl">Enter site URL:</label>
                    <input type="text" id="siteUrl" required>
                    <button @click="${this.analyzeSite}">Analyze</button>
                </div>
                <site-overview .siteTitle="${this.siteTitle}" .siteData="${this.siteData}"></site-overview>
                <div class="cards">
                    ${this.items.map(item => html`<site-card .item="${item}"></site-card>`)}
                </div>
            </div>
        `;
    }

    async analyzeSite() {
        const input = this.shadowRoot.getElementById('siteUrl').value.trim();
        if (!input) {
            alert("Please enter a valid site URL.");
            return;
        }

        const url = input.endsWith('site.json') ? input : `${input.endsWith('/') ? input : `${input}/`}site.json`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('The network response was not okay.');

            this.siteData = await response.json();
            this.validateData(this.siteData);

            this.siteTitle = this.siteData.title || 'There is no title available.';

            this.items = this.siteData.items || [];
        } catch (error) {
            alert('Failed to fetch site data: ' + error.message);
        }
    }

    validateData(data) {
        if (!data.name || !data.description || !data.logo || !data.theme || !data.created || !data.lastUpdated || !data.hexCode) {
            throw new Error('The site.json is missing required fields.');
        }
    }
}

customElements.define('site-analyzer', SiteAnalyzer);





