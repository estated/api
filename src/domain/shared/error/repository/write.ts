import { Domain, EventStore } from 'hollywood-js';

export default class WriteRepository<T extends Domain.EventSourced> implements Domain.IRepository<T> {
    constructor(private eventStore: EventStore.EventStore<T>) {}

    async save(aggregateRoot: T): Promise<void> {
        await this.eventStore.save(aggregateRoot);
    }

    async load(aggregateRootId: string): Promise<T> {
        return await this.eventStore.load(aggregateRootId);
    }
}
