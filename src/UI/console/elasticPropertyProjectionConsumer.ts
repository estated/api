import { Domain } from 'hollywood-js';
import { Message } from 'amqplib';
import {log} from "util";
import AMQCLi from 'infra/shared/messaging/client';
import PropertyProjection from "infra/property/query/projection/propertyProjection";
import PropertyRepository from "infra/shared/dependencyInjection/repositories/propertyRepositoryFactory";

const consumer = new PropertyProjection(PropertyRepository);
const broker = new AMQCLi();

broker.connect().then(
    () => {
        broker.consume('events', 'property', (msg: Message) => {
            const domainMessage = <Domain.DomainMessage>(JSON.parse(msg.content.toString()) as any);

            console.log('Revieced: ', domainMessage);

            consumer.generateProjection(domainMessage.uuid).catch(log);
        })
    }
);

