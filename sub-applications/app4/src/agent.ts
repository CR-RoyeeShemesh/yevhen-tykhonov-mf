interface Agent {
    rootElement: HTMLElement;
    messageReceiver: (message: { action: string, data: any }) => void;
    initialized(): void;
}

export function maybeGetAppAgent(): Agent | null {
    const scriptElement = document.currentScript as HTMLElement;
    const agentId = scriptElement.dataset.agentId;
    if (agentId) {
        return (window as any).$$AGENTS_STORE$$[agentId];
    }

    return null;
}
