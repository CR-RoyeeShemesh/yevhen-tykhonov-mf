import { maybeGetAppAgent } from './agent';
import { WHITE_FANG_PLOT_SUMMARY } from './text';

class Main {
    public static main(): void {
        let rootElement = document.body;
        const agent = maybeGetAppAgent();
        if (agent)
        {
            rootElement = agent.rootElement;
            agent.initialized();
        }

        rootElement.innerHTML = `
            <div class="tx-wrapper">
                <h1 class="tx-title">White Fang Plot Summary</h1>
                <p class="tx-text">${WHITE_FANG_PLOT_SUMMARY}</p>
            </div>
        `;

        console.log('Text has been displayed', rootElement.firstElementChild);
    }
}

Main.main();
