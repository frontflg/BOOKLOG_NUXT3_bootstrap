<script setup lang="ts">

const isbn13      = ref("")
const isbn10      = ref("")
const bookname    = ref("")
const author      = ref("")
const publisher   = ref("")
const genre       = ref("")
const issuedate   = ref("")
const getdate     = ref("")
const readdate    = ref("")
const ownership   = ref(false)
const purchase    = ref(0)
const library     = ref("")
const overview    = ref("")
const impressions = ref("")
const state       = ref("")
const coverimg    = ref("")

// 表示関連の初期値
const noBookFlg      = ref(false)
const pending        = ref(false)
const successFlg     = ref(false)
const serverErrorFlg = ref(false)
const errorMsg       = ref("")

type putType = {
  isbn13:        string;
  change: {
    isbn10:      string;
    bookname:    string;
    author:      string;
    publisher:   string;
    genre:       string;
    issuedate:   date;
    getdate:     date;
    readdate:    date;
    ownership:   Boolean;
    purchase:    number;
    library:     string;
    overview:    string;
    impressions: string;
    state:       string;
    status:      string;
    coverimg:    string;
  }
}

const putFunc = async () => {
    if (isbn13.value.trim() !== ''){
        pending.value   = true
        noBookFlg.value = false
        const date_issuedate = new Date(issuedate.value);
        const date_getdate   = new Date(getdate.value);
        const date_readdate  = new Date(readdate.value);

        const putData: putType = {
            isbn13: isbn13.value,
            change: {
                isbn10:      isbn10.value,
                bookname:    bookname.value,
                author:      author.value,
                publisher:   publisher.value,
                genre:       genre.value,
                issuedate:   date_issuedate,
                getdate:     date_getdate,
                readdate:    date_readdate,
                ownership:   ownership.value,
                purchase:    purchase.value,
                library:     library.value,
                overview:    overview.value,
                impressions: impressions.value,
                state:       state.value,
                coverimg:    coverimg.value
            }
        }

        const asyncData = await useLazyFetch(
            `/api/item/book/`,
            {
                key: "key5",
                method: "PUT",
                body: putData
            }
        )

        // asyncDataの取得
        const data = asyncData.data.value
        const asyncStatus = asyncData.status.value
        pending.value = true

        // 表示関連の初期値変更
        switch (asyncStatus) {
            case "success":
                if(data?.statusCode===500){
                    serverErrorFlg.value = true
                    errorMsg.value       = "データベースの処理中にERRORが発生"
                } else {
                    serverErrorFlg.value = false
                    successFlg.value     = true
                }
                break;
            case "error":
                serverErrorFlg.value = true
                errorMsg.value       = "サーバーの処理中にERRORが発生"
                break;
        }

    } else {
        noBookFlg.value = true
        console.log("ISBN13を入力してください！")
    }
    pending.value = false
}

</script>

<template>

    <h3 class="mt-5"> BookLog変更 </h3>

    <form @submit.prevent="putFunc" class="container mt-3">
        <div class="form-group">
          <div class="row">
            <div class="col-3">
              <label for="isbn13">ISBN13:</label>
              <input type="text" class="form-control" v-model="isbn13" />
            </div>
            <div class="col-2">
              <label for="isbn10">ISBN10:</label>
              <input type="text" class="form-control" v-model="isbn10" />
            </div>
            <div class="col">
              <label for="genre">分野:</label>
              <input type="text" class="form-control" v-model="genre" />
            </div>
            <div class="col-2">
              <label for="state" class="form-label">状態:</label>
              <select v-model="state" class="form-select">
                <option value="未読" selected>未読</option>
                <option value="読書中">読書中</option>
                <option value="読了">読了</option>
              </select>
            </div>
            <div class="col-1">
              <div class="form-check">
                <p>　</p>
                <input class="form-check-input" type="checkbox" value="true" v-model="ownership">
                <label class="form-check-label" for="ownership">:所有</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label for="bookname">書名:</label>
              <input type="text" class="form-control" v-model="bookname" />
            </div>
            <div class="col">
              <label for="publisher">出版社:</label>
              <input type="text" class="form-control" v-model="publisher" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="author">著者:</label>
              <input type="text" class="form-control" v-model="author" />
            </div>
            <div class="col">
              <label for="library">取得元(図書館):</label>
              <input type="text" class="form-control" v-model="library" />
            </div>
            <div class="col-2">
              <label for="purchase">金額:</label>
              <input type="number" class="form-control" v-model="purchase" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="issuedate">発行日:</label>
              <input type="date" class="form-control" v-model="issuedate" />
            </div>
            <div class="col">
              <label for="getdate">取得日(貸出日):</label>
              <input type="date" class="form-control" v-model="getdate" />
            </div>
            <div class="col">
              <label for="readdate">読了日:</label>
              <input type="date" class="form-control" v-model="readdate" />
            </div>
            <div class="col">
              <label for="coverimg">表紙:</label>
              <input type="text" class="form-control" v-model="coverimg" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="overview" class="form-label">概要:</label>
              <textarea class="form-control" v-model="overview" rows="4"></textarea>
            </div>
            <div class="col">
              <label for="impressions" class="form-label">感想:</label>
              <textarea class="form-control" v-model="impressions" rows="4"></textarea>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-outline-primary mt-3">変更</button>
    </form>

    <!-- 結果の出力 -->
    <p class="alert alert-danger" v-if="noBookFlg"> ISBN13を入力してください </p>
    <template v-else>

        <p v-if="pending"> データ送信中 </p>

        <template v-else>
            <p class="alert alert-danger" v-if="serverErrorFlg">
                ERROR　Detail: {{ errorMsg }}
            </p>

            <p class="alert alert-primary mt-3" v-else-if="successFlg"> SUCCESS </p>
        </template>

    </template>

</template>