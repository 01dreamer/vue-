import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from "@/apis/layout";
import { AxiosResponse } from 'axios';

export const useCategoryStore = defineStore('category',() => {
const categoryList = ref([]);

const getCategory = async () => {
    const res: AxiosResponse<any> = await getCategoryAPI() ;
    categoryList.value = res.data.result;
};

onMounted(() => {
    getCategory();
});
return {categoryList,getCategory}
})
