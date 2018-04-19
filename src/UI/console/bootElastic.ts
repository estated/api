import Elastic from "infra/shared/elastic/elastic";
import {log} from "util";

const ElasticSearch = new Elastic();

const indices = ElasticSearch.indices();

const createUserIndex = async () => {

    try {
        await indices.delete({index: 'user'});
    } catch (err) {
        // Do nothing
    }
    await indices.create({index: 'user'});
    await indices.putMapping({
        index: 'user',
        type: 'user',
        body: {
            properties: {
                uuid: { type: "keyword" },
                email: { type: "keyword" }
            }
        }
    });

    log('Created index user');

    try {
        await indices.delete({index: 'property'});
    } catch (err) {
        // Do nothing
    }
    await indices.create({index: 'property'});
    await indices.putMapping({
        index: 'property',
        type: 'property',
        body: {
            properties: {
                uuid: { type: "keyword" },
                title: { type: "text" },
                description: { type: "text" },
                type: { type: "integer" },
                createdAt: { type: "date" },
                geo: {
                    "type": "nested",
                    "properties": {
                        "lat": {"type": "integer"},
                        "lon": {"type": "integer"}
                    }
                },
                price: {
                    "type": "nested",
                    "properties": {
                        "amount": {"type": "integer"},
                        "currency": {"type": "keyword"}
                    }
                }
            }
        }
    });

    log('Created index property');
};

createUserIndex().then(() => log('DONE!'));