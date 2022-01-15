import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const mongoConfig = async (
    configService: ConfigService
): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoURI(configService),
        ...getMongoOptions(),
    };
};

const getMongoURI = (configService: ConfigService) => {
    return configService.get("DATABASE_URI");
};

const getMongoOptions = () => ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
