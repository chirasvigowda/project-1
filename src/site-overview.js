import { html, css, LitElement } from 'lit';

class SiteOverview extends LitElement {
    static styles = css`
        .overview {
            margin: 20px;
            padding: 10px;
            border: 1px solid #2a4adc;
            border-radius: 5px;
        }
    `;

    static get properties() {
        return {
            siteData: { type: Object }
        };
    }

    render() {
        if (!this.siteData) return html``;

        return html`
            <div class="overview">
                <h3>${this.siteData.name}</h3>
                <p>${this.siteData.description}</p>
                <img src="${this.siteData.logo}" alt="${this.siteData.name} Logo">
                <p>Theme: ${this.siteData.theme}</p>
                <p>Created: ${this.siteData.created}</p>
                <p>Last Updated: ${this.siteData.lastUpdated}</p>
                <p>Color Code: ${this.siteData.hexCode}</p>
            </div>
        `;
    }
}

customElements.define('site-overview', SiteOverview);
