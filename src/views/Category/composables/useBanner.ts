import { getBannerAPI } from '@/apis/home';
export default function useBanner() {
    interface BannerItem {
        id: number;
        imgUrl: string;
    }
    const bannerList = ref<BannerItem[]>([]);
    const getBanner = async () => {
        const res = await getBannerAPI('2');
        bannerList.value = res.data.result;
    }
    
    onMounted(() => {
        getBanner();
    });
    return {
        bannerList
    };
}