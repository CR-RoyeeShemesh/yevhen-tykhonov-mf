// @ts-ignore
import { config } from './package.json';
import appInitialization from './app';

const bootstrap = async function () {
    try {
        const port = config.PORT;
        const host = config.HOST;

        const app = await appInitialization();
        const address = await app.listen(port, host);
        console.log(`Server listening at ${address} 🤘`);
    } catch (error) {
        console.error(`Program terminated unexpectedly`, error);
        process.exit(1);
    }
};

const handleShutdown = function () {
    process.stdout.write('Termination signal received. Shutting down.');
    process.exit();
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

if (require.main === module) {
    bootstrap();
} else {
    module.exports = bootstrap;
}


