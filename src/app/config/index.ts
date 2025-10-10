import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT as string,
    shohoz_base_api: process.env.SHOHOZ_BASE_API as string,
    client_url: process.env.CLIENT_URL as string,
};
