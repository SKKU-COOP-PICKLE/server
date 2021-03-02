<template>
  <div>
    <span style="position: absolute">
      Data from SSF SHOP
    </span>
    <div class="head-container">
      <div class="title">
        <span id="PICKLE" style="margin-top: 13px">
          PICKLE
        </span>
        <span id="xIcon" style="margin-top: 15px; margin-left: 23px">
          <font-awesome-icon icon="times" />
        </span>
        <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2653073856249FA511">
      </div>
      <br>
      <span class ="subtitle">
        패션 매치 아이템들을 딥러닝과 통계 기반 방식으로 추천받으세요
      </span>
    </div>
    <div class="setup-container">
      <span class="id-item">
        <span>
          Input your Product Id
        </span>
        <input v-on:keyup.enter="getproperty" class="id-input" v-model="id" placeholder="Product Id">
        <VueLoadingButton class="btn-go" type="button" :loading="isloading01 || isloading02" @click.native="Go_1">SUBMIT</VueLoadingButton>
      </span>
      <span class="inputList-item">
        <span class="random-Input" @click="RandomImgClick(randomImg, key)" v-for="(randomImg, key) in randomList.slice(0, 10)" :key="randomImg">
					<img :id="`randomItem${key}`" :src="randomImg['img_url']" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" :alt="key" width="135px" height="177px" style="margin: 0 5px; cursor: pointer">
      </span>
    </div>
		<div v-if="inputUrl" class="input_display">
      <span style="color: #453005; font-size: larger; font-family: Roboto Slab,serif; font-weight: bold;">
        Your input cloth :
      </span>
      <span class="input_img-btn">
        <span class="input_img_container">
          <img class="input_img" :src="inputUrl" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=135px height=177px>
        </span>
      </span>
      <span>
        <div class="input_pros_container" style="font-size: larger" v-for="(pro, key) in inputInfo" :key="pro">
          <div v-if="pro" style="color: rgb(69, 48, 5); font-size: larger;">
            <span style="font-weight: bold; font-family: 'Roboto Slab', serif;">
              {{ key }}
            </span>
              : {{ pro }}
          </div>
        </div>
      </span>
    </div>
    <hr v-if="showInput">
    <!-- <span v-if="showOutput" class="user_ui"> -->
		<span v-if="deep_graph_top5s" class="user_ui">
      <transition name="fade">
      <span v-if="true" class="result-container paddy">
        <div style="margin-top: 2%; margin-bottom: 1%; color: rgb(69, 48, 5); font-family: 'Roboto Slab', serif;font-weight: bold;font-size:20px">
          <font-awesome-icon icon="braille" />
          Statistics
        </div>
				<span v-if="showSta" class="statistic-container paddy">
          <!-- COMBINATION-STATISTIC -->
          <span v-if="IsInputTop(inputInfo.Category)" class="combination" style="margin: 0 5%">
						<img :src="inputUrl" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
            <img src="../assets/plus.png" width= '30px' height="30px" style="margin: 10px">
            <a :href="outfitSta.detail_url" target="_blank">
              <img :src="outfitSta.item_url" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
            </a>
            <span style="font-size: 14px; font-style: italic">
                <br>
                SSF MALL
            </span>
          </span>
          <span v-if="!IsInputTop(inputInfo.Category)" class="combination" style="margin: 0 5%">
            <a :href="outfitSta.detail_url" target="_blank">
              <img :src="outfitSta.item_url" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
            </a>
            <img src="../assets/plus.png" width= '30px' height="30px" style="margin: 10px">
						<img :src="inputUrl" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
            <span style="font-size: 14px; font-style: italic">
                <br>
                SSF MALL
            </span>
          </span>
          <!-- COMBINATION-STATISTIC -->
          <span class="divier">
            <hr style="height: 100%;border: 1px solid black;margin: 0 30px 0 0; border-left: 0;">
          </span>
          <button class="scrollbtn" @click="moveScroll('left', 'statistics-content')">
            <div class="left-arrow"></div>
          </button>
          <span v-if="false" class="category-column">
            <div style="margin: 6px 0">
              Brand 
            </div>
            <div style="margin: 6px 0">
              Name
            </div>
            <div style="margin: 6px 0">
              Price
            </div>
            <div style="margin: 2px 0">
              Heart 
            </div>
            <div style="margin: 2px 0">
              Style
            </div>
            <span style="margin: 2px 0">
              Reason
            </span>
            <span class="reason-upsidedown">
                <button class="reasonbtn" @click="reasonAppear">
                    <div v-if="showreason" class="up-arrow"></div>
                    <div v-if="!showreason" class="down-arrow"></div>
                </button>
              </span>
          </span>
            <span style="margin-top: 407px">
              Reason
            </span>
            <span class="reason-upsidedown" style="margin-top: 407px">
                <button class="reasonbtn" @click="reasonAppear">
                    <div v-if="!showreason" class="up-arrow"></div>
                    <div v-if="showreason" class="down-arrow"></div>
                </button>
              </span>
          <span id="statistics-content">
            <span class="deepLearning-result-container img-wrapper"  @click="ImgClick(img, `statistics${key}`);ImgClickSta(img)" v-for="(img, key) in statistic_top5s" :key="img" style="cursor : pointer">
              <span class="index">
                {{ key }}
              </span>
              <img class="img_list" :id="`statistics${key}`" :src="img['fashion_url']" @error="$event.target.src=$event.target.src.replace('_2_ORGINL', '_0_ORGINL')" :alt="key" width=226px height=297px>
              <img class="hover-img" :id="`hover-statistics${key}`" :src="img['item_url']" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" :alt="key" width=226px height=297px>
              <span class="detailed_info" style="display: flex; flex-direction: column; align-items: center">
                <div v-if="img['brand']" style=" border-radius: 8px; padding: 2px;">
                  {{ ReturnBrand(img['brand']) }}
                </div>
                <div v-else style="margin: 2px 0">
                  <br>
                </div>
                <div v-if="img['name']" style="font-weight: 500; border-radius: 8px; padding: 2px; white-space: pre-wrap; text-align: center">
                  {{ ReturnName(img['name']).join(' ') }}
                </div>
                <div v-else>
                  <br>
                </div>
                <div v-if="img['price']" style="font-weight: 500; border-radius: 8px; padding: 2px; font-size: 20px; color: sandybrown;">
                  {{ Number(img['price']).toLocaleString() }}\
                </div>
                <div v-else>
                  <br>
                </div>
                <!-- <div v-if="img['attrs']['fit']" style="font-weight: 500; border-radius: 8px; padding: 2px;">
                  {{ img['attrs']['fit'][0]['name'] }}
                </div>
                <div v-else>
                  <br>
                </div>  alternated by below div-->
                <div v-if="img['wish']" style="font-weight: 500; border-radius: 8px; padding: 2px; font-size: 17px;">
                  <span>♡</span>{{ ' ' + img['wish'] }}
                </div>
                <div v-else>
                  <br>
                </div>
                <div v-if="img['style']" style="font-weight: 500; border-radius: 8px; padding: 2px;">
                  {{ img['attrs']['style'][0]['name'] }}
                </div>
                <div v-else style="margin: 2px 0">
                  <br>
                </div>
                
                  <div class="element" v-show="img['attrs']" style="font-weight: 500; border: dotted 3.5px lightgray; border-radius: 8px; padding: 2px; text-align: center; visibility: hidden;">
                    <span v-for="(info, name, index) in img['attrs']" :key="name">
                      <div v-if="index < 3" >
                        {{ info[0].name + ' : ' + Math.floor(Number(info[0].percentage) * 100) + '%' }}
                      </div>
                    </span>
                  </div>
                
              </span>
            </span>
          </span>
          <button class="scrollbtn" @click="moveScroll('right', 'statistics-content')">
            <div class="right-arrow"></div>
          </button>
				</span>
				<span v-if="showSta" class="total_evaluation">
					<span v-for="( percentage, attribute ) in top_attributes" :key="attribute">
						<span class="top_evaluation">
							<span style="color: cornflowerblue; ">
							{{ attribute }}
              </span>
              <span style="color: darkgray; font-weight: bolder">
							{{ Math.floor(Number(percentage) * 100) + '%' }}
              </span>
						</span>
					</span>
					랑 많이 코디됐어요
        </span>
        <!---------------------------------------deepLearning Start-------------------------------------------->
        <div style="margin-top: 2%; margin-bottom: 1%; color: rgb(69, 48, 5); font-family: 'Roboto Slab', serif;font-weight: bold;font-size: 20px">
          <font-awesome-icon icon="brain" />
          DeepLearning
        </div>
        <span class="deepLearning-container paddy">
        <!-- COMBINATION DEEPLEARNING -->
          <span v-if="IsInputTop(inputInfo.Category)" class="combination" style="margin: 0 5%">
            <img :src="inputUrl" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
            <img src="../assets/plus.png" width= '30px' height="30px" style="margin: 10px">
            <a :href="outfitDeep.detail_url" target="_blank">
              <img :src="outfitDeep.item_url" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
            </a>
            <span style="font-size: 14px; font-style: italic">
              <br>
              SSF MALL
            </span>
          </span>
          <span v-if="!IsInputTop(inputInfo.Category)" class="combination" style="margin: 0 5%">
            <a :href="outfitDeep.detail_url" target="_blank">
              <img :src="outfitDeep.item_url" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
            </a>
            <img src="../assets/plus.png" width= '30px' height="30px" style="margin: 10px">
            <img :src="inputUrl" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
            <span style="font-size: 14px; font-style: italic">
              <br>
              SSF MALL
            </span>
          </span>
        <!-- COMBINATION DEEPLEARNING -->
          <span class="divier">
            <hr style="height: 100%;border: 1px solid black;margin: 0 30px 0 0; border-left: 0;">
          </span>
          <button class="scrollbtn" @click="moveScroll('left', 'deepLearning-content')">
            <div class="left-arrow"></div>
          </button>
          <span class="category-column">
            <div style="margin: 6px 0">
              Score
            </div>
            <div style="margin: 6px 0">
              Brand 
            </div>
            <div style="margin: 6px 0">
              Name
            </div>
            <div style="margin: 6px 0">
              Price
            </div>
            <!-- <div style="margin: 2px 0">
              Fit 
            </div>
            <div style="margin: 2px 0">
              Style
            </div> -->
          </span>
          <span id="deepLearning-content">
            <span class="deepLearning-result-container img-wrapper" @click="ImgClick(img, `deepLearning${key}`);ImgClickDeep(img)" v-for="(img, key) in deep_top5s" :key="img" style="cursor : pointer">
              <span class="index">
                {{ key }}
              </span>
              <img class="img_list" :id="`deepLearning${key}`" :src="img['fashion_url']" @error="$event.target.src=$event.target.src.replace('_2_ORGINL', '_0_ORGINL')" v-bind:alt="key" width=226px height=297px>
              <img class="hover-img" :id="`hover-deepLearning${key}`" :src="img['item_url']" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" :alt="key" width=226px height=297px>
              <div style="font-family: 'Roboto Slab', serif">
                {{ Math.floor(Number(img['score']) * 10000) / 100  }}%
              </div>
              <div v-if="img['brand']" style="border-radius: 8px; padding: 2px;">
                  {{ ReturnBrand(img['brand']) }}
              </div>
              <div v-else style="margin: 2px 0">
                <br>  
              </div>
              <div v-if="img['name']" style="font-weight: 500; border-radius: 8px; padding: 2px; white-space: pre-wrap; text-align: center">
                {{ ReturnName(img['name']).join(' ') }}
              </div>
              <div v-else>
                <br>
              </div>
              
              <div v-if="img['price']" style="font-weight: 500; border-radius: 8px; padding: 2px; font-size: 20px; color: sandybrown;">
                {{ Number(img['price']).toLocaleString() }}\
              </div>
              <div v-else>
                <br>
              </div>
              <div v-if="img['wish']" style="font-weight: 500; border-radius: 8px; padding: 2px; font-size: 17px;">
                <span>♡</span>{{ ' ' + img['wish'] }}
              </div>
              <div v-else>
                <br>
              </div>
              <!-- 
              <div v-if="img['attrs']['fit']" style="font-weight: 500; border-radius: 8px; padding: 2px;">
                {{ img['attrs']['fit'][0]['name'] }}
              </div>
              <div v-else>
                <br>
              </div>
              
              <div v-if="img['style']" style="font-weight: 500; border-radius: 8px; padding: 2px;">
                {{ img['attrs']['style'][0]['name'] }}
              </div>
              <div v-else style="margin: 2px 0">
                <br>
              </div> -->
            </span>
          </span>
          <button class="scrollbtn" @click="moveScroll('right', 'deepLearning-content')">
            <div class="right-arrow"></div>
          </button>
        </span>
        <!------------------------------------------deepLearning End---------------------------------------------------->

        <!------------------------------------------deepLearning-Graph Start-------------------------------------------->
        <div style="margin-top: 2%; margin-bottom: 1%; color: rgb(69, 48, 5); font-family: 'Roboto Slab', serif;font-weight: bold;font-size: 20px">
          <font-awesome-icon icon="project-diagram" />
          DeepLearning-Graph
        </div>
          <span class="deepLearning-container paddy">
            <!-- COMBINATION DEEPLEARNING -->
            <span v-if="IsInputTop(inputInfo.Category)" class="combination" style="margin: 0 5%">
              <img :src="inputUrl" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
              <img src="../assets/plus.png" width= '30px' height="30px" style="margin: 10px">
              <a :href="outfitDeepGraph.detail_url" target="_blank">
                <img :src="outfitDeepGraph.item_url" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
              </a>
              <span style="font-size: 14px; font-style: italic">
                <br>
                SSF MALL
              </span>
            </span>
            <span v-if="!IsInputTop(inputInfo.Category)" class="combination" style="margin: 0 5%">
              <a :href="outfitDeepGraph.detail_url" target="_blank">
                <img :src="outfitDeepGraph.item_url" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
              </a>
              <img src="../assets/plus.png" width= '30px' height="30px" style="margin: 10px">
              <img :src="inputUrl" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" width=120px height=160px>
              <span style="font-size: 14px; font-style: italic">
                <br>
                SSF MALL
              </span>
            </span>
            <!-- COMBINATION DEEPLEARNING -->
            <span class="divier">
              <hr style="height: 100%;border: 1px solid black;margin: 0 30px 0 0; border-left: 0;">
            </span>
            <button class="scrollbtn" @click="moveScroll('left', 'deepLearningGraph-content')">
              <div class="left-arrow"></div>
            </button>
            <span class="category-column">
              <div style="margin: 6px 0">
                Score
              </div>
              <div style="margin: 6px 0">
                Brand 
              </div>
              <div style="margin: 6px 0">
                Name
              </div>
              <div style="margin: 6px 0">
                Price
              </div>
            </span>
            <span id="deepLearningGraph-content">
              <span class="deepLearningGraph-result-container img-wrapper" @click="ImgClick(img, `deepLearningGraph${key}`);ImgClickDeepGraph(img)" v-for="(img, key) in deep_graph_top5s" :key="img" style="cursor : pointer">
              <span class="index">
                {{ key }}
              </span>
                <img class="img_list" :id="`deepLearningGraph${key}`" :src="img['fashion_url']" @error="$event.target.src=$event.target.src.replace('_2_ORGINL', '_0_ORGINL')" v-bind:alt="key" width=226px height=297px>
                <img class="hover-img" :id="`hover-deepLearningGraph${key}`" :src="img['item_url']" @error="$event.target.src=$event.target.src.replace('_1_ORGINL', '_0_ORGINL')" :alt="key" width=226px height=297px>
                <!-- onerror="while(this.parentNode.firstChild)this.parentNode.removeChild(this.parentNode.lastChild)" -->
                <div style="font-family: 'Roboto Slab', serif">
                  {{ Math.floor(Number(img['score']) * 10000) / 100  }}%
                </div>
                <div v-if="img['brand']" style="border-radius: 8px; padding: 2px;">
                    {{ ReturnBrand(img['brand']) }}
                </div>
                <div v-else style="margin: 2px 0">
                  <br>  
                </div>
                <div v-if="img['name']" style="font-weight: 500; border-radius: 8px; padding: 2px; white-space:pre-wrap; text-align: center">
                  {{ ReturnName(img['name']).join(' ') }}
                </div>
                <div v-else>
                  <br>
                </div>
                
                <div v-if="img['price']" style="font-weight: 500; border-radius: 8px; padding: 2px; font-size: 20px; color: sandybrown;">
                  {{ Number(img['price']).toLocaleString() }}\
                </div>
                <div v-else>
                  <br>
                </div>
                <div v-if="img['wish']" style="font-weight: 500; border-radius: 8px; padding: 2px; font-size: 17px;">
                  <span>♡</span>{{ ' ' + img['wish'] }}
                </div>
                <div v-else>
                  <br>
                </div>
              </span>
            </span>
            <button class="scrollbtn" @click="moveScroll('right', 'deepLearningGraph-content')">
              <div class="right-arrow"></div>
            </button>
          </span>
			</span>  <!-- result container -->
      </transition>
		</span>  <!-- user ui -->
  </div>  <!-- first div -->
</template>

<script>
import axios from "axios";
import VueLoadingButton from "vue-loading-button";
// import { delete } from 'vue/types/umd';
export default {
	name: "Home",
	components: {
		VueLoadingButton,
	},
	data() {
		return {
			id: "",
			pizza: "",

			inputUrl: "",
			inputInfo: {
        Name: "",
				Brand: "", 			Category: "",
				Fit: "", 				Style: "",
				Materials: "", 	TPO: "",
			},
			// topUrl: '',
			// bottomUrl: '',
			// istop: '',
			isloading01: false,
			isloading02: false,

			showInput: false,
			showOutput: false,
			showSta: true,
      showreason: false,

      outfitSta: '',
      outfitDeep: '',
      outfitDeepGraph: '',
			outfit: {
				brand:"", name:"", style:"", category:"",
			},
			randomList: "",
			deep_top5s: "",
			statistic_top5s: [],
      deep_graph_top5s: "",
			top_attributes: "",

      ngroups_max : 5,
      nitems_max : 5,
      nDeepItem : 20,

      tmpData : [
        { id : "GM0018101874055", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/ECBR/18/10/18/GM0018101874055_1_ORGINL.jpg'},
        { id : "GM0019010211456", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/8SBR/19/01/02/GM0019010211456_1_ORGINL.jpg'},
        { id : "GM0018120500928", 
          img_url :' https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/8SBR/18/12/05/GM0018120500928_1_ORGINL.jpg'},
        {id : "GM0018122609158", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/8SBR/18/12/26/GM0018122609158_1_ORGINL.jpg'},
        { id : "GM0019010412386", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/8SBR/19/01/04/GM0019010412386_1_ORGINL.jpg'},

        { id : "GM0019010915853", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/ECBR/19/01/09/GM0019010915853_1_ORGINL.jpg'},
        { id : "GM0019011622398", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/MCBR/19/01/16/GM0019011622398_1_ORGINL.jpg'},
        { id : "GM0018122710308", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/8SBR/18/12/27/GM0018122710308_1_ORGINL.jpg'},
        { id : "GM0019011824667", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/MCBR/19/01/18/GM0019011824667_1_ORGINL.jpg'},
        { id : "GM0019012828818", 
          img_url : 'https://img.ssfshop.com/cmd/LB_500x660/src/https://img.ssfshop.com/goods/8SBR/19/01/28/GM0019012828818_1_ORGINL.jpg'}
      ]
		};
	},
	methods: {
    Go_1() //statistics prediction data receive
    {
      this.initial();
			if(!this.id) { alert("값을 입력해주세요"); return 0}

			this.isloading01 = true;
      axios.get("http://115.145.212.100:51122/api/call2/" + this.id + '/' + this.ngroups_max + '/' + this.nitems_max)
      .then((res) => {
        console.log('Statistics : ',res.data)
        if(typeof(res.data) == typeof("item dosen't exists"))  { alert("id를 확인해 주세요"); this.isloading01 = false; return 0;}
				else
				{
					// console.log("res.data sta : ", res.data)
					try{ this.inputInfo[ "Brand" ] = this.ReturnBrand(res.data[ "input_info" ][ 'brand' ]) }
					catch{ this.inputInfo[ "Brand" ] = res.data[ "input_info" ][ 'brand' ] }

          this.inputInfo[ "Name" ] = res.data[ "input_info" ][ 'name' ]
					this.inputInfo[ "Category" ] = res.data[ "input_info" ][ 'category' ]
					this.inputInfo[ 'Fit' ] = res.data[ "input_info" ][ 'fit' ]
					try{this.inputInfo[ 'Style' ] = res.data[ "input_info" ][ 'style' ][0]['name']}catch{console.log("input style is null")}
					try{this.inputInfo[ 'Materials' ] = res.data[ "input_info" ][ 'materials' ][0]['name']}catch{console.log("input materials is null")}
					this.inputInfo[ 'TPO' ] = res.data[ "input_info" ][ 'tpo' ]
					this.inputUrl = res.data[ 'input_info' ][ 'item_url' ]
					this.showInput = true
					// this.statistic_top5s = res.data.predictions_info
          var nItems = []
          var sameAttrs = [] // array of attrs

          for(var obj of res.data.predictions_info) {
            nItems.push(obj['items'].length)
            sameAttrs.push(obj['attrs'])
            for(var k = 0; k < obj['items'].length; k++ ) {
              this.statistic_top5s.push(obj['items'][k])
            }
          }
          // this.statistic_top5s = res.data.predictions_info

          // attrs 전처리 부분 수정 필요 --> sameAttrs 완성
          var keys = ['category', 'color', 'fit', 'length', 'materials', 'neckline', 'pattern', 'sex', 'sleeve_length', 'style']
          for(var i = 0; i < sameAttrs.length; i++) {
            for(var j = 0; j < keys.length; j++) {
              if(sameAttrs[i][keys[j]] == null || sameAttrs[i][keys[j]][0]['percentage'] < 0.3)
                delete sameAttrs[i][keys[j]]
            }
          }
          var milestone = 0;
          console.log('nItmes : ', nItems)
          console.log('statistics_top5s : ', this.statistic_top5s)
          for(var m = 0; m < nItems.length; m++) {
            for(var n = 0; n < nItems[m]; n++){
              // console.log('statistics_top5 : ', n)
              this.statistic_top5s[milestone]['attrs'] = sameAttrs[m]
              milestone++;
            }
          }

          // var keys = ['category', 'color', 'fit', 'length', 'materials', 'neckline', 'pattern', 'sex', 'sleeve_length', 'style']
          //   for(var j = 0; j < this.statistic_top5s.length; j++){
          //     for(var i = 0; i < keys.length; i++) {
          //       if(this.statistic_top5s[j]['attrs'][keys[i]] == null || this.statistic_top5s[j]['attrs'][keys[i]][0]['percentage'] < 0.3 )
          //         delete this.statistic_top5s[j]['attrs'][keys[i]]
          //   } 
          // }
          // attrs 전처리 부분 수정 필요

          this.outfit = res.data.predictions_info[0]
          this.outfitSta = res.data.predictions_info[0]['items'][0]

          this.top_attributes = res.data.top_attributes
          if(this.top_attributes.category) {
            this.top_attributes.category.name = this.ReturnCategory(this.top_attributes.category.name)
          }
          var sortSpace = []

          for (var attribute in this.top_attributes) {
            sortSpace.push( [ this.top_attributes[attribute]['name'], this.top_attributes[attribute]['percentage'] ] )
          }
          sortSpace.sort((a,b) => b - a) // descending sort
          var objSorted = {}
          objSorted[ sortSpace[0][0] ]= sortSpace[0][1]
          objSorted[ sortSpace[1][0] ]= sortSpace[1][1]
          objSorted[ sortSpace[2][0] ]= sortSpace[2][1]
          this.top_attributes = objSorted
					console.log('top_attributes: ',this.top_attributes)
          this.isloading01 = false;
				}
			})
    
		// try{if(this.Go_2()) this.isloading01 = false;}catch(error){console.log(error)}
      // axios.get("http://115.145.212.100:51122/api/test/" + this.id + "/" + this.nDeepItem)
      // .then((res) => {
      //   console.log('test : ', res.data)
      // })
      this.Go_2()
      this.Go_3()
      
    },
    Go_2()
    {
			if(!this.id) { alert("값을 입력해주세요"); return 0 }
			this.isloading02 = true;
			axios.get("http://115.145.212.100:51122/api/call/" + this.id + "/" + this.nDeepItem)
      .then((res) => {
				// res.data = res.data.replaceAll("None", '"None"');
        // res.data = res.data.replaceAll("'", '"')
				console.log("deepLearning prediction : ")
        console.log(res.data)

        this.deep_top5s = res.data.predictions_info
        this.outfitDeep = res.data.predictions_info[0]

				// this.isloading01 = false
				this.showOutput = true
        return true
			})
    },
    Go_3() {
			if(!this.id) { alert("값을 입력해주세요"); return 0 }
			axios.get("http://115.145.212.100:51122/api/call3/" + this.id + "/" + this.nDeepItem + "/" + 3)
      .then((res) => {
				console.log("deepLearningGraph prediction : ")
        console.log(res.data)

        this.deep_graph_top5s = res.data.topk
        console.log('deepGraphTop5 : ', this.deep_graph_top5s)
        this.outfitDeepGraph = res.data.topk[0]
        this.isloading02 = false
      })
      return true
    },
    ImgClickSta(_outfit) {
      this.outfitSta = _outfit;
      // console.log('this.outfitSta : ', this.outfitSta);
    },
    ImgClickDeep(_outfit) {
      this.outfitDeep = _outfit;
      // console.log('this.outfitDeep : ', this.outfitDeep);
    },
    ImgClickDeepGraph(_outfit) {
      this.outfitDeepGraph = _outfit;
      console.log('this.outfitDeepGraph : ', this.outfitDeep);
    },
		ImgClick(_outfit, _id) {
			this.outfit = _outfit;
      /* selction shadow box initial */
      if(_id.includes('statistics')) {
        for( var i = 0; i < this.statistic_top5s.length; i++ ) {
          var e1 = document.querySelector('#statistics' + i)
          e1.style.filter = 'none';
          e1.style[`border-radius`] = 0;
        }
      }
      else if(_id.includes('Graph')) {
        for( var p = 0; p < this.deep_graph_top5s.length; p++ ) {
          var e2 = document.querySelector('#deepLearningGraph' + p)
          e2.style.filter = 'none';
          e2.style[`border-radius`] = 0;
        }
      }
      else {
        for( var j = 0; j < this.deep_top5s.length; j++ ) {
          var e3 = document.querySelector('#deepLearning' + j)
          e3.style.filter = 'none';
          e3.style[`border-radius`] = 0;
        }
      }
      /* selction shadow box initial */

      var borderContent = document.querySelector('#'+_id)
      var hoverContent = document.querySelector(`#hover-${_id}`)
      console.log('hoverContent : ', hoverContent)
      // borderContent.style['box-shadow'] = '0 5px 0 #5b1eaa inset'
      borderContent.style.filter = 'drop-shadow(black 1px 2px 3px)'
      borderContent.style[`border-radius`] = `1rem`
      hoverContent.style[`border-radius`] = `1rem`
		},
		RandomImgClick(_randomImg, _key) {
			this.id = _randomImg['id']
      var randomItemImg = document.querySelector("#randomItem" + _key)
      /* initial outline and border-radius */
      var element = null
      
      for(var k = 0; k < 10; k++) {
        element = document.querySelector("#randomItem" + k)
        element.style.outline = `none`
      }
        // element.style[`border-radius`] = `0`
      /* initial outline and border-radius */
      setTimeout(function(){randomItemImg.style.outline = `10px double palegoldenrod`;},10)
      // randomItemImg.style[`border-radius`] = `2rem`;
		},
		ShowSta() {
			this.showSta = true;
		},
		ShowDeep() {
			this.showSta = false;
		},
		getRandomInput() {
			axios.get("http://115.145.212.100:51122/api/dataCall").then((res) => {
      // res.data.forEach(element => element['img_url'].replace('_0_ORGINL', '_1_ORGINL'))
      this.randomList = res.data
      for(var i = 0; i < this.randomList.length; i++) {
        this.randomList[i]['img_url'] = this.randomList[i]['img_url'].replace('_0_ORGINL', '_1_ORGINL')
      }
      console.log('data : ', this.randomList)
		});
    },
    getDataSet(){
      this.randomList = this.tmpData
    },
    IsInputTop(_category) {
      try {
      if(_category.includes('상의')) {
        // console.log('상의')
        return true
      }
      else {
        // console.log('하의')
        return false
      }
      }catch{console.log('hi')}
    },
    ReturnBrand(_brand) {
      try{
        var Brand = _brand.split('/')
        Brand = Brand[Brand.length - 2]
      }catch{return _brand}
      return Brand
    },
    ReturnName(_name) {
      var first, second, third, fourth, fifth, res;
      try{
        var Name = _name.split(' ')
        var tmp = tmp
        if(Name.length > 6) {[first, second, third, ...res] = Name; return res;}
        [first, ...res ] = Name
        tmp = first + second + third + fourth + fifth
        if(Name.length > 9) {[tmp, first, second, third, ...res] = Name; return res}
        return res
      }catch{return _name}
    },
    ReturnCategory(_category) {
      var arr = _category.split('>')
      return arr[arr.length - 1]
    },
    getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key]['percentage'] === value);
    },
    moveScroll(_direction, _id) {
      var conent = document.querySelector('#' + _id)
      if(_direction == 'left') conent.scrollLeft -= 100;
      if(_direction == 'right') conent.scrollLeft += 100;
      // event.preventDefault();
    },
    reasonAppear(){
      const element = document.querySelectorAll('.element')
      if(this.showreason) for(var i = 0; i < element.length; i++)  element[i].style.visibility = 'hidden';
      else for(var j = 0; j < element.length; j++)  element[j].style.visibility = 'visible';
      this.showreason = !this.showreason
    },
    initial(){
      // this.id= ""
			// this.pizza= ""

			// this.inputUrl= ""
			// this.inputInfo= {
      //   Name: "",
			// 	Brand: "", 			Category: "",
			// 	Fit: "", 				Style: "",
			// 	Materials: "", 	TPO: "",
			// }
			// this.isloading01= false
			// this.isloading02= false

			// this.showInput= false
			// this.showOutput= false
			// this.showSta= true

      // this.outfitSta= ''
      // this.outfitDeep= ''
			// this.outfit= {
			// 	brand:"", name:"", style:"", category:""
			// }
			// this.randomList= ""
			this.deep_top5s= ""
      this.deep_graph_top5s = ""
			this.statistic_top5s= []
			this.top_attributes= ""

      // this.ngroups_max = 5
      // this.nitems_max = 5
      // this.nDeepItem = 20
    },
	},
	created() { // get random items from DB
		document.title = 'PICKLE';
		// this.getRandomInput()
    this.getDataSet();
    // axios.get("http://115.145.212.100:51122/api/test/GM0019011622398").then((res) => {
    //   console.log('test : ', res.data)
		// });
    axios.post("http://115.145.212.100:51122/api/test", {title : 'hello world!'})
    
  },
  accessElemnt: function(e) {
    console.log(e.target)
  }

};
</script>

<style scoped src="../assets/home.css">
</style>