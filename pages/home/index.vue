<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <nuxt-link v-if="user" class="nav-link " 
              :class="{ active : tab === 'your_feed' }" 
              :to="{
                name: 'home',
                query: {
                  tab: 'your_feed'
                }
              }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <!-- exact 精确匹配 -->
            <nuxt-link v-if="user" class="nav-link" 
              :class="{ active : tab === 'global_feed' }" 
              exact 
               
              :to="{
                name: 'home',
                query: {
                  tab: 'global_feed'
                }
              }">Global Feed</nuxt-link>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link " :class="{ active : tab === global_feed }"  href="">Global Feed</a>
            </li> -->
            <li v-if="tag" class="nav-item">
              <!-- <a class="nav-link active" href="">#{{tag}}</a> -->
               <nuxt-link v-if="user" class="nav-link" 
              :class="{ active : tab === 'tag' }" 
              :to="{
                name: 'home',
                query: {
                  tab: 'tag',
                  tag: tag
                }
              }">#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>



        <div class="article-preview" v-for="article in articles" 
        :key ="article.slug"   >
          <div class="article-meta">
            <nuxt-link :to="{
                name: 'profile',
                query: {
                  username: article.author.username
                }
              }"
            ><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <!-- <a href="" class="author">Eric Simons</a> -->
              <nuxt-link class="author" :to="{
                name: 'profile',
                query: {
                  username: article.author.username
                }
              }">{{article.author.username}}</nuxt-link>
              <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
            </div>
            <button class="btn btn-outline-primary 
            btn-sm pull-xs-right "
            @click="onFavorite(article)"
              :class="{
                active: article.favorited
              }"
              :disabled = 'article.favDisabled'
            >
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{
            name : 'profile',
              query: {
                slug:article.slug
              }
          }" class="preview-link">
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
      </div>

     


      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            
            <nuxt-link :to="{
              name: 'home',
              query:{
                tab: 'tag',
                tag: item
              }
            }"  v-for="item in tags" :key="item" 
            
             class="tag-pill tag-default">{{ item }}</nuxt-link>
          </div>
        </div>
      </div>

       <nav>
        <ul class="pagination" >
          <li class="page-item">
            <a class = "page-link " href="">1</a>
          </li>
        </ul>
      </nav>

    </div>
  </div>

</div>
</template>

<script>
import { getArticles,getYourFeedArticles,
          addFavorite,deleteFavorite} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
// 放在这个模块下的代码会立即执行 放在methods不会立即执行
export default {

  name: 'homeIndex',

  

  async asyncData({query,store} ) {
    // console.log(store);
    const page = Number.parseInt(query.page || 1)
    const limit = 5
    const { tag } = query
    const tab =   query.tab || 'global_feed'
    const loadArticles = store.state.user && tab === 'your_feed'
    ?  getYourFeedArticles : getArticles


     const [ artRes, tagRes ] = await Promise.all([
       loadArticles({
          limit,
          offset: (page -1 ) * limit,
          tag
        }),
       getTags()
    ])
    // console.log( tagRes);
    // console.log(JSON.stringify(artRes));
    // console.log(Object.prototype.toString.call(artRes))
    const { articles, articlesCount } = artRes.data
    const { tags } = tagRes.data
    articles.forEach(article => {
      article.favDisabled = false
    });
    return  {
      articles,
      articlesCount,
      tags: tags.slice(0,20),
      limit,
      page,
      tag,
      tab 
    }
  },
  watchQuery: ['page','tag','tab'],
  computed: {
    ...mapState(['user']),
      totalPage() {
        return Math.ceil(this.articlesCount / this.limit)
      }
  },
  methods:{
    async onFavorite(article){
      article.favDisabled = true
      if (article.favorited) {
          // await  deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1
      } else {
        // await  addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favDisabled = false
    }
  },
   head() {
        return {
          title: '哈后',
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: 'Home page description'
            }
          ]
        }
      }

    
 
  
  
}



</script>

<style>

</style>