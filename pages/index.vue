<script setup lang="ts">

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

const asyncData = await useLazyFetch(
    `/api/book/`,
    {
        key: "key1",
        method: "GET"
    }
)

// asyncDataの取得
const data = asyncData.data
const pending = asyncData.pending
const asyncStatus = asyncData.status

// bookListとserverErrorObj
const bookList = computed(
    (): bookType[] | undefined => {
        let returnList;
        if(data.value !== null){
            returnList = data.value.body.bookList
        }
        return returnList
    }
)
const serverErrorObj = computed(
    () => {

        let flg = false
        let msg = ""

        switch (asyncStatus.value) {
            case "success":
                if(data.value?.statusCode===500){
                    flg = true
                    msg = "データベースの処理中にERRORが発生"    
                }
                break;
            case "error":
                flg = true
                msg = "サーバーの処理中にERRORが発生"
                break;
        }

        return {
            "flg": flg,
            "msg": msg
        }
    }
)

</script>

<template>
    <h3 class="mt-5"> BookLog一覧 </h3>
    <p v-if="pending"> データ読み込み中 </p>
    <template v-else>

        <!-- p>{{ asyncData }}</p -->

        <p class="alert alert-danger" v-if="serverErrorObj.flg">
            サーバーの処理中にERRORが出ました。Detail: {{ serverErrorObj.msg }}
        </p>

        <p v-else-if="bookList?.length===0"> 表示できるデータがありません </p>

        <table class="table" v-else>
            <thead>
              <tr>
                <th>ISBN13</th>
                <th>ISBN10</th>
                <th>書　名</th>
                <th>著　者</th>
                <th>出版社</th>
                <th>分　野</th>
                <th>発行日</th>
                <th>価　格</th>
                <th>取得元</th>
                <th>状　態</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="book in data?.body.bookList" :key="book.isbn13">
                <td>{{ book.isbn13 }}</td>
                <td>{{ book.isbn10 }}</td>
                <td>{{ book.bookname }}</td>
                <td>{{ book.author }}</td>
                <td>{{ book.publisher }}</td>
                <td>{{ book.genre }}</td>
                <td>{{ book.issuedate.slice(0,10) }}</td>
                <td>￥{{ book.purchase }}－</td>
                <td>{{ book.library }}</td>
                <td>{{ book.state }}</td>
              </tr>
            </tbody>
        </table>

    </template>

</template>