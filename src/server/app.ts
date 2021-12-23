// @ts-ignore
import { config } from './package.json';

import fs from 'fs-extra';
import path from 'path';

import { fastify, FastifyInstance } from 'fastify';

const getAppBundle = async (appInfo: string[] | null): Promise<string | null> => {
    if (!appInfo || !appInfo[1])
        return null;

    const applicationName = appInfo[1];
    const applicationVersion = appInfo[2] || '';

    const filepath = path.join(config.FOLDER_SUB_APPLICATIONS, applicationName, 'build', applicationVersion, 'bundle.js');
    try {
        return await fs.readFile(filepath, { encoding: 'utf8' });
    } catch (err) { console.log(err); }

    return null;
}

async function appInitialization(): Promise<FastifyInstance> {
    const app = fastify();

    app.register(require('fastify-static'), {
        root: path.join(__dirname, '../client')
    });

    // routes
    app.get('/ping', async (request, reply) => { reply.send('pong\n'); });
    app.get('/app*', async (request, reply) => {
        const match = request.url.match(/(app\d{1,3})\.bundle\.js(?:\?v=([\.\d]*))?/);
        const appBundleFile = await getAppBundle(match);

        if (!appBundleFile) {
            reply.status(404).send();
            return;
        }

        reply
            .header('Content-Type', 'application/javascript; charset=utf-8')
            .send(appBundleFile);
    });

    app.get('/', async (request, reply) => {
        const file = await fs.readFile(path.join('build', 'client', 'index.html'), { encoding: 'utf8' });

        reply
            .header('Content-Type', 'text/html; charset=utf-8')
            .send(file);
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Reason is', reason);
        console.log('Promise is', promise);
    });

    return app;
}

export default appInitialization;
