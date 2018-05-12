import Elastic from "infra/shared/elastic/elastic";
import {log} from "util";

const ElasticSearch = new Elastic();

const indices = ElasticSearch.indices();

const createUserIndex = async () => {

    if (!await indices.exists({index: 'user'})) {

        await indices.create({index: 'user'});
    }
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

    if (!await indices.exists({index: 'property'})) {

        await indices.create({index: 'property'});
    }

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
                    type: "nested",
                    properties: {
                        lat: {"type": "integer"},
                        lon: {"type": "integer"}
                    }
                },
                price: {
                    type: "nested",
                    properties: {
                        amount: {type: "integer"},
                        currency: {type: "keyword"}
                    }
                }
            }
        }
    });

    log('Created index property');


    if (!await indices.exists({index: 'rent'})) {

        await indices.create({index: 'rent'});
    }

    await indices.putMapping({
        index: 'rent',
        type: 'rent',
        body: {
            properties: {
                uuid: { type: "keyword" },
                propertyUuid: { type: "keyword" },
                ownerUuid: { type: "keyword" },
                lesseeUuid: { type: "keyword" },
                currentRentUuid: { type: "keyword" },
                period: {
                    type: "nested",
                    properties: {
                        startAt: { type: "date" },
                        endAt: { type: "date" }
                    }
                },
                price: {
                    type: "nested",
                    properties: {
                        amount: { type: "integer" },
                        currency: { type: "keyword" }
                    }
                }
            }
        }
    });

    log('Created index rent');
};

createUserIndex().then(() => log('DONE!'));