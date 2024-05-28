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

            const putData = await readBody(event)

            const prisma = new PrismaClient();
            const dbResp = await prisma.booklog.update({
                where: { isbn13: putData.isbn13 },
                data: putData.change,
              });

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
