declare var HOST: string;
declare var PORT: string;

declare global {
    interface Window { $$AGENTS_STORE$$: { [key: string]: any }; }
}

import { AppManager } from './app-manager';

const APP_CONFIG = [{
    id: 'grid',
    version: '2.0.0',
    url: `http://${HOST}:${PORT}/app1.bundle.js`
}, {
    id: 'text',
    version: '1.0.0',
    url: `http://${HOST}:${PORT}/app2.bundle.js`
}, {
    id: 'image',
    version: '1.0.0',
    url: `http://${HOST}:${PORT}/app3.bundle.js`
}, {
    id: 'list',
    version: '1.0.0',
    url: `http://${HOST}:${PORT}/app4.bundle.js`
}];

class Main {
    public static async main(): Promise<void> {
        // Create specific object that will store every sub-application agent
        const agentStore = window.$$AGENTS_STORE$$ = { } as any;

        // Bootstrap all sub-applications from config and store their agents into AgentStore
        await new AppManager(APP_CONFIG, agentStore).bootstrapApplications();

        // Send list of data to 4th sub application
        agentStore['list'].sendMessage({
            action: 'render', data: {
                title: 'The Most Popular Dog Breeds of 2021',
                list: [
                    'Labrador Retriever',
                    'French Bulldog',
                    'Bulldog',
                    'Poodle',
                    'Beagle',
                    'Rottweiler',
                    'Australian Shepherd',
                    'Boxer',
                    'Great Dane',
                    'Siberian Husky',
                    'Doberman Pinscher',
                    'Shih Tzu'
                ]
            }
        });
    }
}

Main.main();
