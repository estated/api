import { propertyEventStore } from '../eventStore/eventStore';
import WriteRepository from 'domain/shared/error/repository/write';
import Property from 'domain/property/model/property';
import PropertyElasticRepository from "infra/property/query/repository/elasticRepository";
import RentElasticRepository from "infra/property/query/repository/rentElasticRepository";

export default new WriteRepository<Property>(propertyEventStore);

export const getProperty = new PropertyElasticRepository();
export const getRent = new RentElasticRepository();