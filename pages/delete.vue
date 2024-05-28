<script setup lang="ts">

const isbn13 = ref("")
const successFlg = ref(false)
const data = ref()

const deleteFunc = async () => {
    if (isbn13.value.trim() !== ''){
        const query = {
            isbn13: isbn13.value
        }

        const asyncData = await useLazyFetch(
            `/api/item/book/`,
            {
                key: "key7",
                method: "DELETE",
                query: query
            }
        )
        data.value = asyncData.data.value?.body
        const asyncStatus = asyncData.status.value
        pending.value = false
        successFlg.value = true
    } else {
        console.log("ISBN13を入力してください！")
    }
    isbn13.value = ""
}

</script>

<template>

    <h3 class="mt-5"> BookLog削除 </h3>

    <form @submit.prevent="deleteFunc" class="container mt-3">
        <div class="form-group">
            <label for="isbn13">ISBN13:</label>
            <input type="text" class="form-control w-25"
                   v-model="isbn13" maxlength="13" />
        </div>

        <button type="submit" class="btn btn-outline-danger mt-3">削除</button>
    </form>
    <p class="alert alert-primary mt-3" v-if="successFlg"> SUCCESS </p>
    <p class="mt-3" v-else> {{data}} </p>

</template>