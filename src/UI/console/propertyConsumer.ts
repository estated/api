import { Domain } from 'hollywood-js';
import { Message } from 'amqplib';
import AMQCLi from 'infra/shared/messaging/client';

const broker = new AMQCLi();

broker.connect().then(
    () => {
        broker.consume('events', 'domain.property.#', (msg: Message) => {
            const domainMessage = <Domain.DomainMessage>(JSON.parse(msg.content.toString()) as any);

            console.log('Revieced: ', domainMessage);
        })
    }
);

