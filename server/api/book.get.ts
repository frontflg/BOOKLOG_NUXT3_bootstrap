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
  coverimg: string;
}

type ResType = {
    statusCode: number;
    body: {
        bookList: bookType[];
        error: string;
    }
}

export default defineEventHandler(
    async (): Promise<ResType> => {

        // throw createError("サーバーの処理中にERROR")

        let statusCode;
        let response;

        try {

            // throw createError("データベースの処理中にERROR")

            // 1秒待つ
            const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(1000);

            // db
            const prisma = new PrismaClient();
            const dbResp = await prisma.booklog.findMany()

            // response
            statusCode = 200
            response = {
                "bookList": dbResp,
                "error": ""
                }  
        } catch (error: any) {
            statusCode = 500
            response = {
                "bookList": [],
                "error": error.message
            }
        }
        
        return {
            statusCode: statusCode,
            body: response
        };
    }
)
