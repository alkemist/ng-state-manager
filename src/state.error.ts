export class UnknownState extends Error {
    constructor(stateKey: string) {
        super(`Unknown state "${ stateKey }"`);
    }
}

export class UnknownAction extends Error {
    constructor(stateKey: string, actionKey: string) {
        super(`Unknown action "${ stateKey }.${ actionKey }"`);
    }
}