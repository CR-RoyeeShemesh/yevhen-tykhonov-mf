/**
 * Agent helps to control and send messages to all sub applications.
 */

interface AgentMessage {
    action: string;
    data: any;
}

class AgentState {
    public static readonly LOADING: number = 0;
    public static readonly READY: number = 1;
    public static readonly LOAD_ERROR: number = 2;
}

export class AgentFactory {
    public readonly id: string;
    public readonly rootElement: HTMLElement;

    public state: number;
    public messageReceiver: ((message: AgentMessage) => {}) | undefined;

    private readonly messageQueue: AgentMessage[];

    public constructor(id: string, rootElement: HTMLElement) {
        this.id = id;
        this.rootElement = rootElement;
        this.state = AgentState.LOADING;
        this.messageQueue = [];
    }

    public initialized(): void {
        this.state = AgentState.READY;
        this.sendMessagesFromQueue();
    }

    public errorLoad(): void {
        this.state = AgentState.LOAD_ERROR;
        this.messageQueue.length = 0;
        console.log(`Sorry but we couldn't load the '${this.id}' sub-application`);
    }

    public sendMessage(message: AgentMessage): void {
        if (this.state === AgentState.READY && this.messageReceiver) {
            this.messageReceiver(message);
            return;
        }

        if (this.state === AgentState.LOADING) {
            this.messageQueue.push(message);
            return;
        }

        if (this.state === AgentState.LOAD_ERROR) {
            console.error(`The '${this.id}' sub-application could not load`);
        } else if (!this.messageReceiver) {
            console.error(`The '${this.id}' sub-application has not message receiver`);
        }
    }

    private sendMessagesFromQueue(): void {
        for (let i = 0; i < this.messageQueue.length; i += 1) {
            this.sendMessage(this.messageQueue[i]);
        }
    }
}
