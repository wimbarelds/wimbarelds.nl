import { createApp } from './main';
import content from './content';

function createServerApp(context) {
    const app = createApp(content[context.lng]);
    return app;
};

export { content, createServerApp };