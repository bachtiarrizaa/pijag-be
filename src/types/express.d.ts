import { JwtPayloadType } from "./jwtType";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadType;
        }
    }
}