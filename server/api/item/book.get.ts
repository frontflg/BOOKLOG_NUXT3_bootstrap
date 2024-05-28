import { PrismaClient } from '@prisma/client';

type bookType = {
  isbn13: string;
  isbn10: string;
  bookname: string;
  author: string;
  publisher: string;
  genre: string;
  issuedate: date;
  getdate: date;
  readdate: date;
  ownership: boolean;
  purchase: number;
  library: string;
  overview: string;
  impressions: string;
  state: string;
}

type ResType = {
    statusCode: number;
    body: {
        book: bookType | null;
        error: string;
    }
}

export default defineEventHandler(
    async (event): Promise<ResType> => {

        let statusCode;
        let response;

        try {

            // 1秒待つ
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(1000);

            const query: {isbn13: string} = getQuery(event)

            // db
            const prisma = new PrismaClient();
            const dbResp = await prisma.booklog.findUnique({
                    where: { isbn13: query.isbn13 }
                })

            // response
            statusCode = 200
            response = {
                "book": dbResp,
                "error": ""
                }  
        } catch (error: any) {
            statusCode = 500
            response = {
                "book": null,
                "error": error.message
            }
        }

        return {
            statusCode: statusCode,
            body: response
        };
    }
)
