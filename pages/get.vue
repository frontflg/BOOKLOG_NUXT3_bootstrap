<script setup lang="ts">

type bookType = {
  isbn13:      string;
  isbn10:      string;
  bookname:    string;
  author:      string;
  publisher:   string;
  genre:       string;
  issuedate:   date;
  getdate:     date;
  readdate:    date;
  ownership:   boolean;
  purchase:    number;
  library:     string;
  overview:    string;
  impressions: string;
  state:       string;
  coverimg:    string;
}

const isbn13 = ref("")
const data = ref()

// 表示関連の初期値
const noIsbnFlg      = ref(true)
const pending        = ref(false)
const successFlg     = ref(false)
const serverErrorFlg = ref(false)
const errorMsg       = ref("")

const getFunc = async () => {
    if (isbn13.value.trim() !== ''){
        const query = {
            isbn13: isbn13.value
        }

        const asyncData = await useLazyFetch(
            `/api/item/book/`,
            {
                key: "key4",
                method: "GET",
                query: query
            }
        )

        // asyncDataの取得
        data.value = asyncData.data.value
        const asyncStatus = asyncData.status.value
        noIsbnFlg.value = false
        successFlg.value = true

    } else {
        noIsbnFlg.value = true
        console.log("ISBN13を入力してください！")
    }
    pending.value = false
    isbn13.value = ""
}

</script>

<template>

    <h3 class="mt-5"> BookLog検索 </h3>

    <form @submit.prevent="getFunc" class="container mt-3">
        <div class="form-group">
            <label for="isbn13">ISBN13:</label>
            <input type="text" class="form-control w-25"
                   v-model="isbn13" maxlength="13" />
        </div>

        <button type="submit" class="btn btn-outline-primary mt-3">検索</button>
        <p>　</p>
    </form>

    <!-- 結果の出力 -->
    <template  v-if="noIsbnFlg">
        <p> ISBN13を入力してください </p>
    </template>
    <template v-else>

        <p v-if="pending"> データ送信中 {{data}} </p>

        <template v-else>
            <p class="alert alert-danger" v-if="serverErrorFlg">
                ERROR　Detail: {{ errorMsg }}
            </p>

            <p class="alert alert-primary mt-3" v-else-if="successFlg"> SUCCESS </p>

            <div v-if="data?.body?.book?.isbn13">
              <table>
                <tr>
                  <th> ISBN13: </th><td> {{ data?.body?.book?.isbn13 }}　</td>
                  <th width="55"> ISBN10: </th><td> {{ data?.body?.book?.isbn10 }}　</td>
                  <th width="55"> 分　類: </th><td> {{ data?.body?.book?.genre }}　</td>
                  <th width="40"> 状態: </th><td> {{ data?.body?.book?.state }}　</td>
                  <td rowspan="6">
                    <img width="150" event="" :src="`/${data?.body?.book?.coverimg}`" alt="表紙画像" />
                  </td>
                </tr>
                <tr>
                  <th> 書　名: </th><td colspan="3"> {{ data?.body?.book?.bookname }}　</td>
                  <th> 出版社: </th><td colspan="3"> {{ data?.body?.book?.publisher }}　</td>
                </tr>
                <tr>
                  <th> 著　者: </th><td colspan="3"> {{ data?.body?.book?.author }}　</td>
                  <th> 取得元: </th><td> {{ data?.body?.book?.library }}　</td>
                  <th> 価格: </th><td>￥{{ data?.body?.book?.purchase }}－　</td>
                </tr>
                <tr>
                  <th> 発行日: </th><td> {{ data?.body?.book?.issuedate.slice(0,10) }}　</td>
                  <th> 取得日: </th><td> {{ data?.body?.book?.getdate.slice(0,10) }}　</td>
                  <th> 読了日: </th><td> {{ data?.body?.book?.readdate.slice(0,10) }}　</td>
                  <th> 所有: </th>
                  <td>
                    <template v-if="data?.body?.book?.ownership">あり　</template>
                    <template v-else>なし　</template>
                  </td>
                </tr>
                <tr>
                  <th> 概　要: </th><td colspan="7"> {{ data?.body?.book?.overview }} </td>
                </tr>
                <tr>
                  <th> 感　想: </th><td colspan="7"> {{ data?.body?.book?.impressions }} </td>
                </tr>
              </table>
            </div>
            <div v-else>
              <div class="row">
                <div class="col">
                  ISBN13: 該当なし、再入力!
                </div>
              </div>
            </div>
        </template>

    </template>

</template>