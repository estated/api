const DEV_HOST = process.env.DEV_HOST || '127.0.0.1';

export default {
    MESSAGE_BROKER: process.env.MESSAGE_BROKER || `amqp://guest:guest@${DEV_HOST}:5672`,
    ELASTIC_HOST: process.env.ELASTIC_HOST || `${DEV_HOST}:9200`,
    ELASTIC_LOGS: process.env.ELASTIC_LOGS || 'info',
    REDIS_HOST: process.env.REDIS_HOST || DEV_HOST,
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    DEV_HOST
}
