<template>
    <div class='content report'>
        <van-cell-group>
            <van-cell title="张三"  label="描述信息">
                <template #label>
                    <div>这是我家的宠物猫，大家觉得可爱吗</div>
                    <van-image v-for="(item, index) in ImageList"
                    width="100" 
                    height="100" 
                    :src="item.url"
                    :key="index" 
                    @click='handlerImage(index)'
                    />
                    <div><van-icon name="location-o" />广东省深圳市</div>
                </template>    
            </van-cell>
          </van-cell-group>
          <van-cell-group>
            <van-cell title="张三"  label="描述信息">
                <template #label>
                    <div>这是我家的宠物猫，大家觉得可爱吗</div>
                    <van-image v-for="(item, index) in ImageList"
                    width="100" 
                    height="100" 
                    :src="item.url"
                    :key="index" 
                    @click='handlerImage(index)'
                    />
                    <div><van-icon name="location-o" />广东省深圳市</div>
                </template>    
            </van-cell>
          </van-cell-group>
    </div>
</template>

<script>
import { Cell, CellGroup,Image,ImagePreview,Icon } from 'vant';
export default {
    name:'help',
    components:{
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Image.name]: Image,
        [ImagePreview.name]: ImagePreview,
        [Icon.name]: Icon,

    },
    data() {
        return {
            ImageList:[
                {
                    url: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1591977120&di=d196209f89d7081870240216fa7c23c1&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg'
                },
                {
                    url: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1035415831,1465727770&fm=26&gp=0.jpg'
                },
                {
                    url: 'https://img.yzcdn.cn/vant/cat.jpeg'
                },
                {
                    url: 'https://img.yzcdn.cn/vant/cat.jpeg'
                }
            ]
        }
    },
    created() {
        
    },
    methods: {
        handlerImage(index) {
            let imgList = []
            this.ImageList.map(res => {
                imgList.push(res.url)
            })
            ImagePreview(imgList,index)
        }
    },

}
</script>
<style lang="scss">
    .report {
        .van-image{
            margin-left: 10px;
        }
    }
</style>