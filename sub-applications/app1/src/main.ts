import { maybeGetAppAgent } from './agent';
import { UserTableBuilder, User } from './table';

class Main {
    public static async main(): Promise<void> {
        let rootElement = document.body;
        const agent = maybeGetAppAgent();
        if (agent)
        {
            rootElement = agent.rootElement;
            agent.initialized();
        }

        try {
            const users: User[] = await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
            const table = new UserTableBuilder(users, rootElement).build();

            console.log('Table has been built', table);
        }
        catch (err) { /* Handle fetch error */ }
    }
}

Main.main();
