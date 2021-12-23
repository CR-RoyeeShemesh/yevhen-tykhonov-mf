import { maybeGetAppAgent } from './agent';
import { ListBuilder } from './list';

class Main {
    public static main(): void {
        let rootElement = document.body;
        const agent = maybeGetAppAgent();
        if (agent)
        {
            function onMessage(message: {action: string, data: any}): void {
                if (message.action === 'render') {
                    const list = new ListBuilder(message.data.title, message.data.list, rootElement).build();
                    console.log('List with data from main app has been rendered', list);
                }
            }

            rootElement = agent.rootElement;
            agent.messageReceiver = onMessage;
            agent.initialized();
            return;
        }

        const list = new ListBuilder('Title', ['Apple', 'Orange', 'Milk', 'Las Vegas'], rootElement).build();
        console.log('List with default data has been rendered', list);
    }
}

Main.main();
