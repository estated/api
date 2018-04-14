import Elastic from "infra/shared/elastic/elastic";
import {log} from "util";

const ElasticSearch = new Elastic();

const indices = ElasticSearch.indices();

const createUserIndex = async () => {
    await indices.create({index: 'user'});
    await indices.putMapping({
        index: 'user',
        type: 'user',
        body: {
            properties: {
                uuid: { type: "string" },
                email: { type: "string" }
            }
        }
    });

    log('Created index user');
};

createUserIndex();