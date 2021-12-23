import { maybeGetAppAgent } from './agent';
import goldenImg from './golden.jpeg';

class Main {
    public static main(): void {
        let rootElement = document.body;
        const agent = maybeGetAppAgent();
        if (agent)
        {
            rootElement = agent.rootElement;
            agent.initialized();
        }
        
        const imageElement = `<img class="im-picture" src="${goldenImg}">`;
        rootElement.innerHTML = imageElement;

        console.log('Image has been displayed', rootElement.firstElementChild);
    }
}

Main.main();
