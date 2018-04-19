import {Client, PingParams, CreateDocumentParams, CreateDocumentResponse, SearchParams, Indices} from 'elasticsearch'
import { Domain } from 'hollywood-js';
import config from '../config'

const { ELASTIC_HOST, ELASTIC_LOGS } = config;

export default class Elastic {
    private client: Client | null;
    
    constructor() {
        this.connect()
    }
    
    private connect() {
        this.client = new Client({
            host: ELASTIC_HOST,
            log: ELASTIC_LOGS
        })
    }

    async create(index: string, event: Domain.DomainMessage): Promise<CreateDocumentResponse> {
        return await this.client.index({
            index: index,
            type: index,
            id: event.uuid,
            body: event
        });
    }

    async add(index: string, uuid: string, doc: any): Promise<CreateDocumentResponse> {
        return await this.client.index({
            index: index,
            type: index,
            id: uuid,
            body: doc
        });
    }

    async find(index: string, query, size: number, from: number = 0, sort = {}): Promise<any> {
        return await this.client.search(
            {
                index: index,
                type: index,
                body: {
                    size,
                    from,
                    sort,
                    query
                }
            }
        )
    }

    indices(): Indices {
        return this.client.indices
    }

    async healthz(): Promise<any> {
        return await this.client.ping(<PingParams>{});
    }
}
