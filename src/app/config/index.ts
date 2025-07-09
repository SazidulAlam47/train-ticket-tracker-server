import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT as string,
    shohoz_base_api: process.env.SHOHOZ_BASE_API as string,
    database_url: process.env.DATABASE_URL as string,
    account_number: process.env.ACCOUNT_NUMBER as string,
    account_pass: process.env.ACCOUNT_PASS as string,
};
