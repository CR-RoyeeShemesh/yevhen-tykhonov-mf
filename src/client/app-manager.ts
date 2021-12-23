import { AgentFactory } from './agent-factory';

interface AppConfig {
    id: string;
    version: string;
    url: string;
}

export class AppManager {
    private readonly appConfigs: AppConfig[];
    private readonly agentsStore: any;
    private readonly placeholders: NodeListOf<HTMLElement>;

    public constructor(appConfigs: AppConfig[], agentsStore: any) {
        this.appConfigs = appConfigs;
        this.agentsStore = agentsStore;
        this.placeholders = document.querySelectorAll('.mf-app-placeholder') as NodeListOf<HTMLElement>;
    }

    private createLoaderPlaceholder(): HTMLElement {
        const loaderElement = document.createElement('div');
        loaderElement.className = 'mf-loader__wrapper';
        loaderElement.innerHTML = `<div class="mf-loader"><div></div><div></div><div></div></div>`;
        return loaderElement;
    }

    private createErrorPlaceholder(): HTMLElement {
        const errorPlaceholderElement = document.createElement('div');
        errorPlaceholderElement.className = 'mf-error-placeholder';
        errorPlaceholderElement.innerText = `Sorry but we couldn't load this sub-application`;
        return errorPlaceholderElement;
    }

    async bootstrapApplications(): Promise<void> {
        for (let i = 0; i < this.appConfigs.length; i += 1) {
            const config = this.appConfigs[i];
            const placeholder = this.placeholders[i] as HTMLElement;
            placeholder.id = config.id;

            // Init sub-application agent
            const agent = this.agentsStore[config.id] = new AgentFactory(config.id, placeholder);

            //
            const scriptElement = document.createElement('script');
            scriptElement.setAttribute('data-agent-id', config.id);
            scriptElement.src = config.url + `?v=${config.version}`;
            scriptElement.onerror = () => {
                agent.errorLoad();
                placeholder.innerHTML = '';
                placeholder.appendChild(this.createErrorPlaceholder());
            }

            placeholder.appendChild(scriptElement);
            placeholder.appendChild(this.createLoaderPlaceholder());
        }
    }
}
