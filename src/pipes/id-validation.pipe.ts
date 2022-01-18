import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from "@nestjs/common";
import { Types } from "mongoose";
import { INCORRECT_ITEM_ID } from "../app.constants";

@Injectable()
export class IdValidationPipe implements PipeTransform {
    transform(value: string, metadata: ArgumentMetadata) {
        if (metadata.type != "param") {
            return value;
        }
        if (!Types.ObjectId.isValid(value)) {
            throw new BadRequestException(INCORRECT_ITEM_ID);
        }
        return value;
    }
}
