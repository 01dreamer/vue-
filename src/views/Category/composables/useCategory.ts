import {getTopCategoryAPI} from "@/apis/category";
export default function useCategory() {
  const categoryData = ref({});
  const route = useRoute();
  const getCategory = async (id: any) => {
    // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
    const res = await getTopCategoryAPI(id);
    categoryData.value = res.data.result;
  };
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id);
  });
  onMounted(() => {
    getCategory(route.params.id)
  });
  return {
    categoryData
  }
}
