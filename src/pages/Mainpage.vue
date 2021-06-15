<template>

  <v-app id="mainpage" style="
  background: #0F0F0F;
  background: -webkit-linear-gradient(to right, #0F0F0F, #1F2621, #0F0F0F);
  background: linear-gradient(to right, #0F0F0F, #0F1611, #0F0F0F);
   ">

   <router-view/>
   
    <vue-metamask
            @onComplete="onComplete"
            userMessage="metamask_status"
    ></vue-metamask>
 <!--  
 <v-toolbar color=rgba(0,107,57,1) max-height="60" dark tabs >
-->
 <v-toolbar flat color="transparent" max-height="60" dark tabs >

      <v-toolbar-title class="pa-5" style="margin-left: -20px;margin-top: 5px;"> 
      <v-flex xs12 sm4 align-center>	
      <v-btn icon @click="click_footer_item('artem')" width="32" height="32" style="margin-right: 8px;margin-bottom: 8px;"> <v-img src="/static/artdeco.png"  width="32" height="32" /> </v-btn>
        <span style="margin-left: -15px;">ArtDeco </span>
       </v-flex>	
      </v-toolbar-title>
      <v-layout align-end justify-end wrap >

      	<v-flex  sm4 align-center>
	      	<v-row style="margin-top: 1px;">
	      		<font style="color:#cccccc"><h5>{{$t("Holders")}}: {{nftTotalSupply}}<br/>
	      		 {{$t("Exhibitors")}}: {{nftrw_stakeCount+nftrw2_stakeCount}}</h5></font>
	      	</v-row>	
      	</v-flex> 			      
         <div style="text-align:center;margin-right:20px;" v-if="ethwallet_ready">
              <div style="text-align:center;" v-if="metamasklogin_ready">
              	  <h6>{{$t("Network")}} : {{ blockchain_name }}</h6>
                             <div style="margin-left: auto;" v-if="link_ready">
                                    <v-btn style="margin: 0;min-width: 60px" small color="#" @click="">
                                      <div v-ellipsis.middle style="width: 100px">{{metaMaskAddress}}</div>
                                    </v-btn>
                            </div>  
                            <div v-else>
                                     <v-btn style="margin: 0;min-width: 60px" small color="#888888" @click="reload_page()">{{$t("Reconnect wallet")}}</v-btn>
                            </div>          
                </div> 
                <div v-else> 
                        <v-btn style="margin: 0;min-width: 60px"  small color="#8888888" @click="reload_page()">{{$t("Reconnect wallet")}}</v-btn>
                </div>                
          </div>
          <div v-else> 
                  <v-btn style="margin: 0;min-width: 50px" small color="#88888888" @click="reload_page()"><font style="color:#F17071">Metamask ! </font></v-btn>
          </div>

          
           <div style="text-align:center;">
            <h6>{{langsel.title}}</h6>
            <v-menu bottom left dark>
	            <template v-slot:activator="{ on, attrs }">
	              <v-btn
	                small
	                icon
	                v-bind="attrs"
	                v-on="on"
	              >
	                <v-icon>language</v-icon>
	              </v-btn>
	            </template>

	            <v-list>
	              <v-list-item
	                v-for="(item, i) in lang_items"
	                :key="i"
	                @click="lang_select(i)"
	              >
	                <v-list-item-title>{{ item.title }}</v-list-item-title>
	              </v-list-item>
	            </v-list>
            </v-menu>
	       </div> 
		 

      </v-layout>
    </v-toolbar>

    <v-tabs color=rgba(240,240,240,1)  centered dark slider-color="yellow" v-model="tabs_active">
      
      <v-tab ripple @click="reopen(1)">{{$t("Mold Artwork")}}</v-tab>
      <v-tab ripple @click="reopen(2)"> 
      	<v-badge
          color="pink"
          dot
        >{{$t("Collection")}} </v-badge>
       </v-tab>
      <v-tab ripple @click="reopen(3)">{{$t("Exhibition")}}</v-tab>
      <v-tab ripple @click="reopen(4)">{{$t("EarlyBird")}}</v-tab>   

	<!-- ******************* Tab Item-1  : NFT ************* -->
    <v-tab-item style="background-color:#151515;" >
    		

    		      <v-row class="justify-center align-center">


			        <v-col cols="12" sm="4">

			        	        <v-col cols="12" class="py-2">
							      <v-btn-toggle
							        v-model="nft_btn_toggle" 
							        tile
							        color="yellow"
							        group
							        dark >
							        <v-btn  @click="reload_mynft=false;open_MintNFT()" > {{$t("Mold Artwork")}} </v-btn>
							        <v-btn  @click="reload_mynft=true;open_MyNFT_direct();"> {{$t("My collections")}} </v-btn>
							        <v-btn  @click="reload_mynft=false;open_Grade()"> {{$t("Art era")}} </v-btn>
							      </v-btn-toggle>
							    </v-col>
				    </v-col>
				</v-row>

			<div v-if="mint_active==0" >

				  <v-card
				    dark
				    max-width="360"
				    class="mx-auto" >

				 	 <v-container>
					      <v-row dense>
					        
					        <v-col
					          v-for="(item, i) in NFT_template_items"
					          :key="i"
					          cols="12"
					        >
					          <v-card
					            :color="item.color"
					            dark
					          >
					            <div class="d-flex flex-no-wrap justify-space-between">
					              <div style="text-align:left">
					                <v-card-title
					                  class="headline"   
					                >{{item.title}}</v-card-title>
					               
					                <v-card-subtitle>{{item.artist}}<br/>{{item.use1}} {{item.use2}}</v-card-subtitle>	
					            	

					                <v-card-actions>
					                  <div v-if="i=='3'">	
						                  		<v-btn
									                text
									                 @click="" >
									                {{$t("Opening soon")}}
									            </v-btn>
									            <span v-if="i=='3'">       

										    	</span>	 
					              	  </div>
					              	  <div v-else-if="i=='4'">	
					              	  		<!--
					              	  	    	<v-btn
									                text
									                 @click="" >
									                {{$t("Opening soon")}}
									            </v-btn>
									             <v-icon 
							                	     small color="#F8E2CE" 
											         @click="Metamask_add_token('ARTD')" >
											         info 
											    </v-icon> 
					              	  	    -->
					              	  	
						                  		<v-btn
									                class="ml-2 mt-5"
								                    outlined
								                    rounded
								                    small
								                    style="margin-bottom: 20px;"
									                 @click="NFT_storeARTD()" >
									                {{$t("Go")}}
									            </v-btn> 
									            <v-icon 
							                	     small color="#F3F3F3" 
											         @click="Metamask_add_token('ARTD')" >
											         info 
											    </v-icon> 
											    
					              	  </div>	
					                  <div v-else-if="i=='2'" >
					                  		<!--
					                  	 	<div style="margin-left: 10px;text-align:center;color:red;" v-if="countdown>0">
						                  					<countdown :time="countdown" @end="countdown_end" >
													  			<template slot-scope="props">
													  				<h5> <font style="color:#EEEEEE">
														               {{ props.days }} Days, {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}
														            </font>
														            </h5>   
													  			</template> 
												  		    </countdown>
						                  	</div>
						                  	<div v-else>
						                  	-->	
					                  			<v-btn
								                    outlined
								                    rounded
								                    small
								                    style="margin-bottom: 20px;margin-left: 10px;"
								                    @click="upgradeDialog()"
								                  >
								                    {{$t("Go")}}
								                  </v-btn>  
								            
								            
								        </div>   	
					                    <div v-else-if="!basenft_minted && i=='0'" >
					                  		<!--
					                  	 	<div style="margin-left: 10px;text-align:center;color:red;" v-if="countdown>0">
						                  					<countdown :time="countdown" @end="countdown_end" >
													  			<template slot-scope="props">
													  				<h5> <font style="color:#EEEEEE">
														               {{ props.days }} Days, {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}
														            </font>
														            </h5>   
													  			</template> 
												  		    </countdown>
						                  	</div>
						                  	<div v-else>
						                  	-->	
					                  			<v-btn
								                    outlined
								                    rounded
								                    small
								                    style="margin-bottom: 20px;margin-left: 10px;"
								                    @click="NFT_FactoryClaim()"
								                  >
								                    {{$t("Go")}}
								                  </v-btn>  
								            
								            <!--
								            <div v-else>      
								                  
								                  <h4 style="margin-left: 5px;">{{$t("First generation NFT limited, the Second gen. will be announced")}} <p/>
								                  	<v-btn
								                    outlined
								                    rounded
								                    small
								                    style="margin-bottom: 20px;margin-left: 10px;"
								                    @click="go_opensea(0)">
								                  
								                    {{$t("Buy first generation collectibles")}}
								                  </v-btn> 
								                  </h4>
								            </div>      
											-->			
								                  <!--
								                  <br/>
								                   <span style="margin-left: 20px;color:#ffffff;"> {{$t("Lucky")}} : {{lucky_num}}</span>
								                  -->

					              	  </div>
									  <div v-else-if="i=='1'" >
					                  		
					                  			<!--
						                  			<div style="margin-left: 15px;text-align:center;color:red;" v-if="countdown2>0">
						                  					<countdown :time="countdown2" @end="countdown_end2" >
													  			<template slot-scope="props">
													  				<h5> <font style="color:#EEEEEE">
														               {{ props.days }} Days, {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}
														            </font>
														            </h5>   
													  			</template> 
												  		    </countdown>
						                  			</div>
						                  			
					                  				<div v-else>
												-->	
														<div v-if="balance_artt >=1" style="margin-left:10px;">
															    <div v-if="Relaystock>0">
											                  			<v-btn
														                    outlined
														                    rounded
														                    small
														                    @click="collectNftbyArttDialog()"
														                 >
														                    {{$t("Go")}}
														                 </v-btn>  
													            </div>
												                <div v-else>
												             	
													             	<h4 style="margin-left: 5px;">{{$t("Wait patiently for new NFT stock")}}</h4>   
													             <!--	<h4 style="margin-left: 5px;">{{$t("Gen 1. NFT was collected and zero stock")}}</h4> -->

												                </div>  
												                <br/>   
												                <h5 style="margin-left: 5px;">{{$t("Reserve")}} : {{Relaystock}}</h5>	
											            </div>
								              	 		<div v-else>
									              	 			  <v-btn
												                    outlined
												                    rounded
												                    small
												                    style="margin-bottom: 20px;margin-left: 10px;"
												                    @click="go_artem_app()"
												                  >
												                    {{$t("Earn ARTT")}}
												                  </v-btn>
												                  <br/>
												                  <h5 style="margin-left: 10px;">{{$t("Cost: 1 ARTT start")}}</h5>
								              	 		</div>	


											        
											            
					              	 	
					              	  </div>					              	 
					              	  <div v-else-if="basenft_minted && i=='0'">

					              	  		<v-col>
									                {{$t("Molding done")}}
									              	<v-icon small color="#E6BA90" 
													         @click="Metamask_add_token('ARTNFT')" >
													         info 
													</v-icon>
											</v-col>		
												<v-btn
									                    outlined
									                    rounded
									                    small
									                    style="margin-left: 10px;"
									                    @click="reopen(3)"
									                  >
									                    {{$t("Go exhibition earn")}}
									            </v-btn>

					              	  </div>

					              	  <!--	
					              	  <div v-else-if="IsClaimed_Relay && i=='1'">
					              	  	    <v-col>
									                {{$t("Collected done")}}
							              	  	  <v-icon small color="#E6BA90" 
											         @click="Metamask_add_token('ARTNFT')" >
											         info </v-icon>
											</v-col>	         
												<v-btn
									                    outlined
									                    rounded
									                    small
									                    style="margin-left: 10px;"
									                    @click="reopen(3)"
									                  >
									                    {{$t("Go exhibition earn")}}
									            </v-btn>											
					              	  </div>
					              	  -->	
					              	  <div v-else-if="i=='5'">
					              	  	<!--
											    <v-btn
									                text
									                 @click="" >
									                {{$t("Opening soon")}}
									            </v-btn>
									             <v-icon 
							                	     small color="#F8E2CE" 
											         @click="Metamask_add_token('ArtPower')" >
											         info 
											    </v-icon> 
									    -->  
									           
					              	  		    <v-btn
									                class="ml-2 mt-5"
								                    outlined
								                    rounded
								                    small
								                    style="margin-bottom: 20px;"
									                 @click="NFT_storeAPWR()" >
									                {{$t("Go")}}
									            </v-btn> 
									            <v-icon 
							                	     small color="#F8E2CE" 
											         @click="Metamask_add_token('ArtPower')" >
											         info 
											    </v-icon> 
										 	    
					              	  </div>
					              	  <div v-else-if="i=='6'">
					              	  	<!--
					              	  			 <v-btn
									                text
									                 @click="" >
									                {{$t("Opening soon")}}
									            </v-btn>
									            <v-icon 
							                	     small color="#83BED9" 
											         @click="Metamask_add_token('ARTT')" >
											         info 
											    </v-icon> 
					              	  	 -->
					              	  	
					              	  		<v-btn
									                class="ml-2 mt-5"
								                    outlined
								                    rounded
								                    small
								                    style="margin-bottom: 20px;"
									                 @click="NFT_buySkill()" >
									                {{$t("Go")}}
									          </v-btn> 
									            <v-icon 
							                	     small color="#83BED9" 
											         @click="Metamask_add_token('ARTT')" >
											         info 
											    </v-icon> 
									         
					              	  </div>
					                </v-card-actions>
					              </div>

					              <v-avatar
					                class="ma-3"
					                size="125"
					                tile
					              >
					                <v-img :src="item.src"></v-img>
					              </v-avatar>
					            </div>
					          </v-card>
					        </v-col>
					      </v-row>
					  </v-container>
				  </v-card>
			</div>	

			<!-- =======================   My Collections =======================  -->
		    <div v-else-if="mint_active==1" >

				  <v-card
				    dark
				    class="mx-auto"
				    max-width="360"
				  >
				  <v-container fluid>
				      <v-row dense>
				      	<div v-if="mynfts_sum==0">

				      		<v-card text dark class="mx-auto">
				      			<div class="text-center">
				  	    			<v-card-title primary-title class="justify-center">
				  	    				{{$t("No object or showing off")}}
									</v-card-title>
									<v-card-actions class="justify-center">
								 		{{$t("Tip: Start from molding")}}
									</v-card-actions>

									<v-btn text color="#2793E2" @click="go_opensea(0)" >{{$t("ArtNFT in OpenSea market")}}</v-btn>
									<v-card-actions class="justify-center">
										<v-img
							              src="https://storage.googleapis.com/opensea-static/opensea-brand/listed-button-blue.png"
							              class="white--text align-end"
							              height="110px"
							              @click="go_opensea(0)"
							            >
								 		 
								 		</v-img> 
									</v-card-actions>
								</div>	
				  	        </v-card>

				      	</div>	
				      	
				        <v-col
				          v-for="card in cards"
				          :key="card.title"
				          :cols="card.flex"
				        >
				        	<div v-if="mynft_loading" >
					      		    <v-progress-circular
									      indeterminate
									      color="purple"
									></v-progress-circular>
 							</div>

				          <v-card style="margin-top: 15px;">

				          	<v-tooltip top>
     							 <template v-slot:activator="{ on, attrs }">  
						          	<v-btn
							          absolute
							          color="#57649D"
							          class="white--text"
							          fab
							          small
							          left
							          top
							          v-bind="attrs"
          							  v-on="on"
          							  @click="go_transferNFT(card.id)"
							        >
							          <v-icon>arrow_upward</v-icon>
							        </v-btn>  
							     </template>
						      <span>{{$t("Transfer NFT to")}}</span>
						    </v-tooltip>  

				          	<v-tooltip top>
     							 <template v-slot:activator="{ on, attrs }">  
						          	<v-btn
							          absolute
							          color="#57649D"
							          class="white--text"
							          fab
							          small
							          top
							          v-bind="attrs"
          							  v-on="on"
          							  @click="go_withdrawARTD(card.id, card.serial)"
							        >
							          <v-icon>remove_from_queue</v-icon>
							        </v-btn>  
							     </template>
						      <span>{{$t("Withdraw ARTD")}}</span>
						    </v-tooltip> 

				          	<v-tooltip top>
     							 <template v-slot:activator="{ on, attrs }">  
						          	<v-btn
							          absolute
							          color="#57649D"
							          class="white--text"
							          fab
							          small
							          right
							          top
							          v-bind="attrs"
          							  v-on="on"
          							  @click="go_opensea(card.id)"
							        >
							          <v-icon>store</v-icon>
							        </v-btn>  
							     </template>
						      <span>{{$t("Set Price")}}</span>
						    </v-tooltip>   

				            <v-img
				              :src="card.src"
				              class="white--text align-end"
				              height="480px"
				            >
				              <v-card-title><span style="background-color:#22222255">{{card.title}}</span></v-card-title>
				              <span style="margin-left: 16px;background-color:#22222255"> ID: {{card.id}} ( {{$t("Grade")}}: {{card.grade}} )</span><br/>
				              <span style="margin-left: 16px;background-color:#22222255">{{$t("Promote")}}: {{card.promote}} / {{$t("Skill")}}:{{card.skill}}  / {{$t("Strength")}}:{{card.apwramount}}</span><br/>
				              <span style="margin-left: 16px;background-color:#22222255"> {{$t("Internal value")}}: {{formatToPrice1(card.artdamount)}}<font style="color:#EEEEEE"> ARTD </font></span>

				            </v-img>
				          </v-card>
				        </v-col>
				      </v-row>
				    </v-container>
				  </v-card>

    		</div>
		    <div v-else-if="mint_active==2" >
				  <v-card
				    dark
				    class="mx-auto"
				    max-width="500"
				  >
				  	<v-card-text>
				  		   <div class="text-center">
				  		   	{{$t("History of era list")}}
				  		   	<br/>
							    <v-pagination
							      v-model="now_genpage"
							      :length="10"
							      @input="gen_selection"
							    ></v-pagination>
						   </div>

				  		  ERA. 1 ( Nov. @2020 )
					      <v-row align="center">
					        <v-col
					          v-for="index in 6" :key="index"
					          cols="2"
					          
					        ><div class="text-center">
						          <img
						            :src="Mold_Gen_URI+index+thumb_link"
						            width="48"
						            border="3"
						            style="border-width: 5px;border-color:white;"
						          ></img>
						          G: {{index}}
						         </div>  
					        </v-col>
					      </v-row>

					      <br/>
				  		  
				  		  ERA. 2 ( Dec. @2020 )
					      <v-row align="center">
					        <v-col
					          v-for="index in 6" :key="index"
					          cols="2"
					          
					        ><div class="text-center">
						          <img
						            :src="Mold_Gen_URI+(10+index)+thumb_link"
						            width="48"
						            border="3"
						            style="border-width: 5px;border-color:white;"
						          ></img>
						          G: {{index}}
						         </div>  
					        </v-col>
					      </v-row>

					    </v-card-text>
				  </v-card>

    		</div>		    	

  	</v-tab-item>     
    <!-- ******************* Tab Item-2  : Farming ************* -->
    <v-tab-item style="background-color:#151515;" >
    	
    	<v-card
		    
		    class="mx-auto my-12"
		    max-width="500"
		    dark
		  >

		<v-card-text>

			     	
				    <v-col
				      cols="12"
				      class="py-2"
				    >
				      <v-chip-group
				        v-model="selection"
				        active-class="blue accent-4 white--text"
				        column
				      >
				        <div v-if="farming_mode==0"	>
					        <v-chip @click="farming_page()"> {{$t("Mining")}} </v-chip>
					        <v-chip @click="uniswap_page()"> DeFi {{$t("Market")}}</v-chip>
					    </div>
					    <div v-else-if="farming_mode==1" >
					    		<v-flex class="text-center">
					    	    <v-btn icon color="#FFFFFF" @click="farming_mode=0"> <v-icon>keyboard_backspace</v-icon> </v-btn>
					    	    
					        		<v-chip style="margin-left:100px;" color="#5a8bf8" > {{$t("Farm Pool-1")}} </v-chip>  
					        	</v-flex>	
					    </div>
					    <div v-else-if="farming_mode==2" >
					    	  <!--
					    	   <v-btn style="margin: 0;min-width: 20px" color="#111111" @click="farming_mode=0"> <-- </v-btn>
					       	   <v-chip color="#5a8bf8"> 2號採集場 </v-chip>  -->
					       	   	<v-flex class="text-center">
					    	    	<v-btn icon color="#FFFFFF" @click="farming_mode=0"> <v-icon>keyboard_backspace</v-icon> </v-btn>
					        		<v-chip style="margin-left:100px;" color="#5a8bf8" > {{$t("Farm Pool-2")}} </v-chip>  
					        	</v-flex>	
					    </div>					           
					   
					   	
				      </v-chip-group>
				    </v-col>

				  
				      
	   </v-card-text>
		     
		    <v-divider class="mx-4"></v-divider>

		     	<div v-if="farming_mode==0" >

					    <div v-if="farming_state==0" >

						    <v-card-title>{{$t("LP_title")}}</v-card-title>
						    <div style="margin-left:10px;margin-right:10px;">
						    	{{$t("LP_intro")}}
						    </div>

						    <br/>
							    <v-row>	
							    	
									    <v-card-actions class="justify-center">
										  <v-btn  color="#0091F5" style="margin-left:20px;margin-right:10px;" @click="go_artem_app()">{{$t("Earn ARTT")}}</v-btn>
										  <v-icon small color="yellow darken-2" 
									            	@click="click_footer_item('about')" >
									            	info 
									      </v-icon>
										</v-card-actions>

									    <v-card-actions class="justify-center">
										  <v-btn  color="#ff007a" style="margin-left:10px" @click="go_uniswap('artt')">
🦄{{$t("Go UNISWAP")}}</v-btn>
										</v-card-actions>

									    <v-card-actions class="justify-center">
										  <v-btn  color="#ff007a" style="margin-left:10px" @click="go_uniswap('apwr')">
🦄APWR {{$t("Market")}}</v-btn>
										</v-card-actions>

								</v-row>
						</div>
						<div v-else >
							<v-card-title>{{$t("MINING_title")}}</v-card-title>
						    <div style="margin-left:10px;margin-right:10px;">
						    	{{$t("MINING_intro1")}} <br/> 
						    	{{$t("MINING_intro2")}}
						    </div>

						    <v-chip-group
						    		v-model="selection"
							        active-class="green accent-4 black--text"
							        column >
							    
							    <div> 
							      <v-card
									    class="cardColor"
									    style="margin: 20px;"
									    max-width="200"
									    dark > 
									    <v-card-title> {{$t("Farm Pool-1")}} </v-card-title>

									    
									    			<div style="margin-left: 15px;text-align:center;color:red;" v-if="countdown2>0">
						                  					<countdown :time="countdown2" @end="countdown_end2" >
													  			<template slot-scope="props">
													  				<h5> <font style="color:#FA447E">
														               {{ props.days }} Days, {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}
														            </font>
														            </h5>   
													  			</template> 
												  		    </countdown>
						                  			</div>
						                 			
									    
									    <v-card-text>{{$t("Reward APWR-ETH")}}<br/>{{$t("To be distributed")}}: 300 ARTD</v-card-text>
									    <v-card-actions class="justify-center">
										  <v-btn style="margin: 0;min-width: 60px" color="#33aa44" @click="select_farming_mode(1)">{{$t("SELECT")}}</v-btn>
										</v-card-actions>

									    

							      </v-card>
							    </div>	
							   
							    <v-card
									    class="cardColor"
									    style="margin: 20px;"
									    max-width="200"
									    dark > 
									     <v-card-title> {{$t("Farm Pool-2")}} </v-card-title>
							   			 <v-card-text>{{$t("Use ARTD LP token")}}</v-card-text>
									     <v-card-actions class="justify-center">
										  <v-btn style="margin: 0;min-width: 60px" color="#8D9293" @click="select_farming_mode(2)">{{$t("Funding...")}}</v-btn>
										</v-card-actions>
							   	 </v-card>
							   	 		 
						    </v-chip-group>

						</div>

				</div>
				
				<div v-else-if="farming_mode==1" >

									    <v-list three-line>
									    	
									    	 <v-list-item  @click="Pool_tool_click(1)"　>	
									          <v-list-item-avatar>
									           <v-icon left large color="#68829B">build</v-icon> 
									          </v-list-item-avatar>

									          <v-list-item-content>
									            <v-list-item-title >{{$t("Use token to mining")}} 
									           		<v-chip
												      class="ma-2"
												      @click="Pool_tool_click(1)" 
												      small
												      color="teal"
												    >
												      {{$t("Use")}}
												    </v-chip> 	
									            </v-list-item-title>
									            <v-list-item-subtitle >{{$t("Collect tokens to mint NFT")}}</v-list-item-subtitle>
									          </v-list-item-content>
									        </v-list-item>
									        
									        <v-divider></v-divider>
									        
									        <v-list-item >
									          <v-list-item-avatar>
									           <v-icon left large color="#68829B">add_box</v-icon> 
									          </v-list-item-avatar>

									          <v-list-item-content>
									            <v-list-item-title > {{$t("LP tokens you supply(UNI-V2)")}} 
									            	
									            	<v-icon small color="blue darken-2" 
									            	@click="Metamask_add_token('ARTT_ETH')" >
									            	info </v-icon>

									            </v-list-item-title>
									            <v-list-item-subtitle >{{pool1_staked_str}}
									            	  	<v-btn
									            	  	  v-if="pool1_staked!=0"
												          color="red lighten-2"
												          dark
												          small
												          style="margin-left: 30px;"
												          @click="ExitLPStake_submit()"
												        >
												          {{$t("Now quit")}}
												        </v-btn>
									            </v-list-item-subtitle>
									          </v-list-item-content>

									        </v-list-item>
									        
									        <v-divider></v-divider>

									        <v-list-item >
									        	
									          <v-list-item-avatar>
									           <v-icon left large color="#68829B">save_alt</v-icon> 
									          </v-list-item-avatar>

									          <v-list-item-content>
									            <v-list-item-title >
									            		 {{$t("Pending income")}} 
									            	<v-chip
												      class="ma-2"
												      @click="Getreward_page(101)" 
												      small
												      color="teal"
												      v-if="pool1_earned_str!=0"
												    >
												      {{$t("Take out")}}
												    </v-chip>

									            	
									            </v-list-item-title>
									            
									             

									            <v-list-item-subtitle >
									            	+<animated-number
													:value="pool1_earned"
													:formatValue="formatToPrice"
													 :duration="1000"
													 />
									            	ARTD 
									            	<v-icon small color="blue darken-2" 
									            	@click="Metamask_add_token('ARTD')" >
									            	info </v-icon>
									            </v-list-item-subtitle>
									          </v-list-item-content>

									        </v-list-item>

									        
											<v-divider></v-divider>

									        <v-list-item v-if="pool1_earned>0">
									        	
									          <v-list-item-avatar>
									           <v-icon left large color="#68829B">group</v-icon> 
									          </v-list-item-avatar>

									          <v-list-item-content>
									            <v-list-item-title >
									            		 {{$t("Farm pool accounts")}}: {{lprw_stakeCount}}
									            	<!--
									            	<v-chip
												      class="ma-2"
												      @click="" 
												      small
												      color="teal"
												    >
												      View
												    </v-chip>
													-->	
									            	
									            </v-list-item-title>
									            
									             

									            <v-list-item-subtitle >

									            </v-list-item-subtitle>
									          </v-list-item-content>

									        </v-list-item>
											

									    </v-list>

				</div>
				<div v-else-if="farming_mode==2" >
						<v-row class="justify-center align-center">
				  	    	<v-card text dark class="ma-3 text-xs-center">

				  	    		    <v-card-title class="justify-center">
				  	    		    	{{$t("Liquidity farm pool")}}
				  	    		    </v-card-title>
				  	    			<v-card-text class="justify-center">
				  	    				
					  	    				{{$t("LP_Pool2_note1")}}
					  	    				<br/>
					  	    				{{$t("LP_Pool2_note2")}}
					  	    				<br/>
					  	    				{{$t("LP_Pool2_note3")}}
				  	    				
									</v-card-text
									<v-card-actions class="justify-center">
								 		 <v-btn text color="orange">{{$t("Be open after funding")}}</v-btn>
									</v-card-actions>
				  	        </v-card>	
				  	    </v-row>

				</div>	

		  </v-card>



  	</v-tab-item>   	
    
    
	<!-- ******************* Tab Item-3  : Galley stake  ************* -->
  	<v-tab-item style="background-color:#111111;" >
         <v-row class="justify-center align-center">


			        <v-col cols="12" sm="4">

			        	        <v-col cols="12" class="py-2">
							      <v-btn-toggle
							        v-model="gallery_btn_toggle" 
							        tile
							        color="yellow"
							        group
							        dark >
							        <v-btn  @click="open_ListGallery()" > {{$t("Art gallery venues")}} </v-btn>
							        <v-btn  @click="open_stack_result()"> {{$t("Benefit")}} </v-btn>
							        <v-btn  @click="open_challenge()"> {{$t("Challenge")}} </v-btn>
							      </v-btn-toggle>
							    </v-col>
				    </v-col>
				</v-row>

			<div v-if="gallery_active==0" >

				<div v-if="stake_layer==0">
					  <v-card
					    dark
					    max-width="360"
					    class="mx-auto" >

					 	 <v-container>
						      <v-row dense>
						        
						        <v-col
						          v-for="(item, i) in Gallery_template_items"
						          :key="i"
						          cols="12"
						        >
						          <v-card
						            :color="item.color"
						            dark
						          >
						            <div class="d-flex flex-no-wrap justify-space-between">
						              <div>
						                <v-card-title
						                  class="headline"
						                  v-text="item.title"
						                ></v-card-title>
						                <!--
						                <div v-if="i=='0'">
						                			<div style="text-align:center;color:#FFA441" v-if="countdown>0">
						                  					<countdown :time="countdown" @end="countdown_end" >
													  			<template slot-scope="props">
													  				<h5> 
														               {{ props.days }} Days, {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}
														            </h5>   
													  			</template> 
												  		    </countdown>
						                  			</div>	
						                </div>	
						            -->
						               	<!-- <v-card-subtitle v-text="item.artist"></v-card-subtitle> -->
						                <v-card-subtitle style="margin-left:-5px">{{$t("To be distributed")}}: {{formatToPrice1(balanceRW_artd[i])}} ARTD</v-card-subtitle>
						                <div v-if="i=='0'">  				
						                   {{$t("Exhibitors")}}: <font style="color:#FFF06B"><h3>{{nftrw_stakeCount}}</h3></font>
						                </div>
						            	<div v-if="i=='1'">
						            		{{$t("Exhibitors")}}: <font style="color:#FFF06B"><h3>{{nftrw2_stakeCount}}</h3></font>
						            	</div>	
						                <div v-else>
						                	
						                </div>	 
						                
						                	
						                <v-card-actions>
						                			
						                	<div v-if="i=='1'">

						                		    	<div style="margin-left: 15px;text-align:center;color:red;" v-if="countdown>0">
						                  					<countdown :time="countdown" @end="countdown_end" >
													  			<template slot-scope="props">
													  				<h5> <font style="color:#f39494">
													  					{{$t("Start reward")}}<br/>
														               {{ props.days }} Days, {{ props.hours }} : {{ props.minutes }} : {{ props.seconds }}
														            </font>
														            </h5>   
													  			</template> 
												  		    </countdown>
												        </div>		
											            <div v-else>
						                                </div>
						                                <v-btn
									                    class="ml-2 mt-5"
									                    outlined
									                    rounded
									                    small
									                    @click="stakepoolSelect(i)"
									                  >
									                    {{$t("JOIN")}}
									                  </v-btn>
									                 
									                  <v-btn
									                    class="ml-2 mt-5"
									                    outlined
									                    rounded
									                    small
									                    @click="ListNftReward(i)"
									                  >
									                   {{$t("Exhibitor list")}}
									                  </v-btn>
									                   <!--
						                                <v-btn style="margin: 0;min-width: 10px" color="#708515" small text @click="stakepoolSelect(i)">.</v-btn>
						                                <v-btn style="margin: 0;min-width: 10px" color="#708515" small text @click="ListNftReward(i)">.</v-btn>
						                               	
									                  <v-btn
									                    class="ml-2 mt-5"
									                    text
									                    @click=""
									                  >
									                    {{$t("Opening soon")}}
									                  </v-btn>
									                -->  
						              	    </div>
						              	    <div v-else>

						              	    		<v-btn
									                    class="ml-2 mt-5"
									                    outlined
									                    rounded
									                    small
									                    @click="stakepoolSelect(i)"
									                  >
									                    {{$t("JOIN")}}
									                  </v-btn>
									                 
									                  <v-btn
									                    class="ml-2 mt-5"
									                    outlined
									                    rounded
									                    small
									                    @click="ListNftReward(i)"
									                  >
									                   {{$t("Exhibitor list")}}
									                  </v-btn>

									        </div>          
						                </v-card-actions>
						              </div>

						              <v-avatar
						                class="ma-3"
						                size="125"
						                tile
						              >
						                <v-img :src="item.src"></v-img>
						              </v-avatar>
						            </div>
						          </v-card>
						        </v-col>
						      </v-row>
						  </v-container>
					  </v-card>
				
				</div>
				<div v-else-if="stake_layer > 0">
					  <v-row justify="space-around">
					      <v-card width="400" color="#223344">
					        <v-img
					          height="200px"
					          :src="getGalleysrc(stakepool_sel-1)"
					          gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.8)"
					          
					        >
					          <v-app-bar
					            flat
					            color="rgba(0, 0, 0, 0)"
					          >
					            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
					           
					            <v-flex>
					    	        <v-btn icon color="#FFFFFF" @click="stake_layer=0"> <v-icon>keyboard_backspace</v-icon> </v-btn>
					        	</v-flex>

					            <v-toolbar-title class="title white--text pl-0">
					            	<v-card-title>
					            		<span style="background-color:#22222244">{{Gallery_template_items[stakepool_sel-1].title}}</span>
					            	</v-card-title>
					              
					            </v-toolbar-title>

					            <v-spacer></v-spacer>

					            <v-btn
					              color="white"
					              icon
					            >
					              <v-icon>mdi-dots-vertical</v-icon>
					            </v-btn>
					          </v-app-bar>


					          <v-card-title class="white--text mt-8" v-if="cards_sum>0">
					          	
					          	 <v-row>
					          	    <v-icon large color="yellow" 
									  @click="stakeIDSelect()" >
									  skip_next 
									</v-icon>

					              	<img
					              	     style="margin-left: 20px;"
					               		 height="150px"
					               		 :src="cards[id_forstake].src"
					              	> 
					            	<span v-if="stakepool_sel==1" style="margin-left: 10px;margin-bottom: 50px;background-color:#22222244">
						            	<h5>
										  ID:{{cards[id_forstake].id}} ( {{$t("Skill")}}: {{cards[id_forstake].skill}} ARTT) <br/>
						            	  {{$t("Contains")}}: {{formatToPrice1(cards[id_forstake].artdamount)}}
						            	  <font style="color:#94ABB4"> ARTD</font><br/>
						            	  {{$t("Strength")}}: {{formatToPrice4(cards[id_forstake].apwramount)}}
						            	  <font style="color:#94ABB4"> APWR </font>
						            	</h5>
						            </span>
						            <span v-else-if="stakepool_sel==2" style="margin-left: 10px;margin-bottom: 50px;background-color:#22222244">
						            	<h5>
										  ID:{{cards[id_forstake].id}} ( {{$t("Grade")}}: {{cards[id_forstake].grade}} ) <br/>
						            	  {{$t("Promote")}}: {{cards[id_forstake].promote}}
						            	  <font style="color:#94ABB4"></font><br/>
						            	  {{$t("Strength")}}: {{formatToPrice3(cards[id_forstake].apwramount)}}
						            	  <font style="color:#94ABB4"> APWR </font>
						            	</h5>
						            </span>
					           			

					          	   	</img>


								</v-row>
									
					          </v-card-title>
					        </v-img>
					        <div v-if="mynfts.length>0" >
							        <v-card-actions >	
							        	
								     		<v-col class="text-center"  >	
								     			<font color="#DDDDDD"> {{$t("Art exhibition")}} <br/>
								     			( NFT stake pool - {{stakepool_sel}} ) </font>
								     			<!--
										    	 <v-btn dark style="margin-right:20px;min-width: 60px;" :color="stake_btn1color"  @click="stakeMode(1)">展出(Stake)</v-btn>
										     	 <v-btn dark style="margin: 0;min-width: 60px;" :color="stake_btn2color"  @click="stakeMode(2)">取回(Unstake)</v-btn>
										     	 --> 
										    </v-col>
										   
									</v-card-actions>

			 						<v-divider></v-divider>
			 						 <v-card-text> 
								        	    <span v-if="stakepool_sel==1" style="color:#ffffff">{{$t("Exhib_pool1_note1")}}<br/> </span>
								        	    <span v-else-if="stakepool_sel==2" style="color:#ffffff">{{$t("Exhib_pool2_note1")}}<br/> </span>
								     </v-card-text>

								     		<v-card-actions class="justify-center">
								     					 <v-col justify="center" class="text-center" >
							              	    		    <div v-if="nftid_reward_weight >=1" >
							              	    		       <span style="color:#f0f0f0">
							              	    		          {{$t("Weight")}} : {{nftid_reward_weight}}
							              	    		       </span> 
														   	</div>
														   	<div v-else-if="nftid_reward_weight < 0" >
														   		<span style="color:#EDA3A1"> {{$t("Weight is zero")}} </span>
														   	</div>	
														   	<div v-else >
														   		<span style="color:#f0f0f0">	
														   				{{$t("Weight")}} : {{nftid_reward_weight}}	
														   		</span>		
														   	</div>	
												   		</v-col>	
											</v-card-actions>
												   		
									<v-card-actions class="justify-center">			

								        <div v-if="stakeNFTApprove_pass==true" >
														
														<span v-if="laffname==''">
						              	    				<v-form>
															    <v-container>
																	<v-row align="center" justify="center" >
																	    {{$t("Leader-code if you got")}}
																	<v-col cols="12" sm="10" md="10" >
													          		<v-text-field
															            style="margin-left:10px;"
															          	class="centered-input text-center mx-2" 
															          	dense
															          	color="white"
															          	dark  
															            value=""
															            v-model="refcode_value"
															            @input="input_refcode"
															            :label="leader_tip"
															            outlined
															          ></v-text-field>
															        </v-col>	
															      </v-row>
															    </v-container>
															</v-form>
															
						              	    		    </span>

						              	    		<div v-if="nftid_reward_weight >=1" >
							              	    		       
																	<v-btn color="#33aa44" @click="exec_NFT_stake()" style="margin-bottom:10px;" >
															   				<span style="color:#f0f0f0"> {{$t("Join")}}(Stake) </span>
															   		</v-btn>
													</div>	    
	
										</div>
										<div  v-else >
												   			<v-btn color="#ee2222" @click="enableApprove_NFTReward()" style="margin-bottom:10px;" >
												   				<span style="color:#f0f0f0"> {{$t("Permit")}}(Approve) </span>
												   		    </v-btn>
												   		    <p><p/>
										</div>
							        </v-card-actions>
							</div>
							<div v-else>
								 <p> </p>
								 <v-col class="text-center"  >
								 		<span style="color:#ffffff "> {{$t("No extra NFT")}} </span> 
								 		   <br/>
								 	        <v-chip
												class="ma-2"
												@click="ExitStakeDialog_seen=true" 
												small
												color="teal"
												v-if="staking_count!=0"
												>
												{{$t("Quit exhibition")}}
											 </v-chip> 

											 <v-chip
												class="ma-2"
												@click="stakepool_sel=0;reopen(1)" 
												small
												color="blue"
												>
												{{$t("Go to NFT molding")}}
											 </v-chip>

								 </v-col>
								 <p> </p>
							</div>        
					      </v-card>
					</v-row>

				</div>	

			</div>	


		    <div v-else-if="gallery_active==1" >
		    		 <v-card
					    class="mx-auto my-12"
					    max-width="500"
					    dark
					  >

					  	<v-card-title class="white--text mt-8">
					            
							  <v-row v-for="(item, i) in staked_cards"
								          :key="i"
								          justify="space-around">

								    <div class="container">
									      <img v-bind:src="item.src" height="100px" @click="exit_stake(item.id)">
									      <span class="bottom-centered" style="margin-left:25px;background-color:#22222277"><font style="color:#EEEEEE"><h4>{{item.id}}</h4></font></span>
									</div>      
   
							  </v-row>
					             
					    </v-card-title>
	
						<v-card-text>
		    						
		    						<v-list three-line>
		    							   <span style="margin-left: 0px;"><h3>{{$t("Exhibition benefits")}}</h3>
		    							   </span>
		    								<span v-if="my_ToRefername!=''" style="text-align:right;margin-right: 10px;color:#c5bed0">{{$t("Following to")}}: {{my_ToRefername}}
		    							    	  </span>
									        <v-divider></v-divider>
									       
									       <v-col
									          v-for="(item, i) in Gallery_template_items"
									          :key="i"
									          cols="12"
									        >
											        <v-list-item >
											        	 
											          <v-list-item-avatar>
											           <v-icon left large color="#68829B">save_alt</v-icon> 
											          </v-list-item-avatar>

											          <v-list-item-content>
											            <v-list-item-title >
											            		 {{$t("Pending income")}}
											            		 <v-chip
															      class="ma-2"
															      @click="PoolgettingReward=201;GetrewardDialog_seen=true" 
															      small
															      color="teal"
															      v-if="NFTpoolx_earned_str[i]!=0"
															    >
															      {{$t("Take out")}}
															    </v-chip> 
											            		 <v-chip
															      class="ma-2"
															      @click="ExitStakeDialog_seen=true" 
															      small
															      color="teal"
															      v-if="staking_count!=0"
															    >
															      {{$t("Quit")}}
															    </v-chip> 
											            </v-list-item-title>
											            <v-list-item-subtitle >
											            	<font style="color:#e69b7d"><h5> {{Gallery_template_items[i].title}} ( Pool-{{i+1}} )
											            	</h5></font>
											            </v-list-item-subtitle>
											            <v-list-item-subtitle >
											            	+<animated-number
															:value="NFTpoolx_earned[i]"
															:formatValue="formatToPrice"
															 :duration="1000"
															 />
															 ARTD 
											            	<v-icon small color="blue darken-2" 
											            	@click="Metamask_add_token('ARTD')" >
											            	info </v-icon>
											            </v-list-item-subtitle>
											          </v-list-item-content>

											        </v-list-item>

											  </v-col>     

									    </v-list>

										<v-list three-line>
		    							   <span style="margin-left: 0px;"><h3>{{$t("Leader benefits")}}</h3>
		    							   </span>
		    								  <span v-if="laffname!=''" style="text-align:right;margin-right: 10px;color:#c5bed0">{{$t("My Leader code")}} : {{laffname}}	</span>
									        <v-divider></v-divider>

		    							  
									        <v-list-item >
									           								        	
									          <v-list-item-avatar>
									           <v-icon left large color="#68829B">save_alt</v-icon> 
									          </v-list-item-avatar>

									          <v-list-item-content>
									            <v-list-item-title >
									            		 {{$t("Followers count")}} : {{my_followersCount}}

									            </v-list-item-title>
									            <v-list-item-subtitle >
									            	+<animated-number
													:value="my_rreward"
													:formatValue="formatToPrice"
													 :duration="1000"
													 />
													 ARTD 
									            	<v-icon small color="blue darken-2" 
									            	@click="Metamask_add_token('ARTD')" >
									            	info </v-icon>
									            </v-list-item-subtitle>
									          </v-list-item-content>

									        </v-list-item>

									    </v-list>


						</v-card-text>
					</v-card>

		    	<!--
				  <v-card
				    class="mx-auto"
				    max-width="360"
				  >
				  <v-container fluid>
				      <v-row dense>
				      	<div v-if="mynfts_sum==0">

				      		<v-card flat dark class="ma-3 text-xs-center">
				  	    			<v-card-title primary-title class="justify-center">
				  	    				還沒有參展
									</v-card-title>
									<v-card-actions class="justify-center">
								 		提示: 選擇展館並開始
									</v-card-actions>
				  	        </v-card>

				      	</div>	
				      	
				        <v-col
				          v-for="card in cards"
				          :key="card.title"
				          :cols="card.flex"
				        >
				        	
				        </v-col>
				      </v-row>
				    </v-container>
				  </v-card>
				-->


    		</div>
    		<div v-else-if="gallery_active==2" >

    			<v-card class="mx-auto my-12" width="400" dark>

    				<v-card-title class="white--text mt-8" >
    					{{$t("Grade UP challenge")}}
    				</v-card-title>	
				    	<v-card-text class="white--text mt-8">
				     		<v-col class="text-center"  >
					    		  {{$t("Grade UP memo")}}
						    </v-col>
						</v-card-text>
					<v-card-actions class="justify-center">


							<v-btn text color="blue">{{$t("Be open after funding")}}</v-btn> 
					</v-card-actions>
				</v-card>
    		</div>

    </v-tab-item>  
  	<!-- ******************* Tab Item-4  : Auction & Loan ************* 
  	<v-tab-item style="background-color:#111111;" >
      <v-row class="justify-center align-center">
        <v-col cols="12" sm="4">
        	        <v-col cols="12" class="py-2">
				      <v-btn-toggle
				        tile
				        color="yellow"
				        group
				        dark >
				        <v-btn value="center" > 競價拍賣 </v-btn>
				        <v-btn value="justify"> 貸主評鑑收藏品 </v-btn>
				      </v-btn-toggle>
				    </v-col>
           			<div  style="margin-left:100px;color:gray" > . </div>
          		 
          		<v-card text dark class="ma-3 text-xs-center">
				<v-container fluid grid-list-md pa-0>
                <v-container grid-list-sd> 
	                   
	                    
            </v-container>
            </v-container>

					<v-card-title primary-title class="justify-center">
					</v-card-title>
					<v-card-actions class="justify-center">
				 		 <v-btn text color="orange">準備中...</v-btn>
					</v-card-actions>
			</v-card>	
        </v-col>
      </v-row>
    </v-tab-item>  
	-->
  	<!-- ******************* Tab Item-4  : INIT-FUND  ************* -->
  	<v-tab-item style="background-color:#111111;" >

         	<v-row class="justify-center align-center">

			        <v-col cols="12" sm="4">

			        	        <v-col cols="12" class="py-2">
							      <v-btn-toggle
							        v-model="fund_btn_toggle" 
							        tile
							        color="yellow"
							        group
							        dark >
							        <v-btn  @click="open_InitFund()" > {{$t("Fund")}} </v-btn>
							        <v-btn  @click="open_LeadProgram()"> {{$t("Leadership")}} </v-btn>
							      </v-btn-toggle>
							    </v-col>
				    </v-col>
			</v-row>

	<div v-if="fund_active==0" >
  	
  		<v-row justify="space-around">
		      <v-card width="500" dark>
		        <v-img
		          height="200px"
		          src="https://e7.pngegg.com/pngimages/136/846/png-clipart-world-map-treasure-map-old-world-map-food-stone-carving.png"
		          gradient="to bottom, rgba(0,0,0,.7), rgba(0,0,0,.2), rgba(0,0,0,.6)"
		        >
		          <v-app-bar
		            flat
		            color="rgba(0, 0, 0, 0)"
		          >
		            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

		            <v-toolbar-title class="title white--text pl-0">
		              {{$t("Project Initial funding")}}
		            </v-toolbar-title>

		            <v-spacer></v-spacer>

		              <v-btn
		                color="white"
		                icon
		              >
		              <v-icon>mdi-dots-vertical</v-icon>
		            </v-btn>

		          </v-app-bar>

		          	   <br/> 
		          	   <div style="margin-left:40px;margin-right:60px;">
		          	   	    {{$t("Starting cap")}}
						    <v-progress-linear
						      height="10"
						      :value="ethbalance_fund*100/760"
						      striped
						      color="light-blue"
						    ></v-progress-linear>
					    </div>
		          		<br/>
		          		<v-col>

			          		<div style="display:flex; justify-content: flex-end">
			          		<font color="#C7A863"> $0.29  ➔  $0.58  ➔  $1.05  ➔  SWAP </font>
									 <v-btn style="margin-left:40px;margin-right:10px;" color="#196EAB" @click="Join_funding()">{{$t("How to join")}}</v-btn>
						    </div>
						</v-col>
		        </v-img>

		        <v-card-text>
		          <div class="font-weight-bold ml-8 mb-2">
		            {{$t("Roadmap")}}
		          </div>

		          <v-timeline
		            align-top
		            dense
		          >
		            <v-timeline-item
		              v-for="message in roadmaps"
		              :key="message.time"
		              :color="message.color"
		              small
		            >
		              <div>
		                <div class="font-weight-normal">
		                  <strong>{{ message.from }}</strong> @{{ message.time }}
		                </div>
		                <div>{{ message.message }}</div>
		              </div>
		            </v-timeline-item>
		          </v-timeline>
		        </v-card-text>
		      </v-card>
		</v-row>
	</div>
	<div v-else >
		<v-row justify="space-around">
		    <v-card
			    max-width="520"
			    dark
			>
			
		   		<v-card-title style="color:#89ddff">{{$t("Leaderpage title")}}</v-card-title>
				    <div style="margin-left:20px;margin-right:10px;">
						    	<font color="#F07178">A.</font> {{$t("Leaderpage note1")}}<br/>
						    	<font color="#F07178">B.</font> {{$t("Leaderpage note2")}}<br/>
								<font color="#F07178">C.</font> {{$t("Leaderpage note3")}}<br/>
								<font color="#F07178">D.</font> {{$t("Leaderpage note4")}}<br/>
								<font color="#F07178">E.</font> {{$t("Leaderpage note5")}}<br/>
				    </div>

					<br/>
				<v-divider class="mx-4"></v-divider>	
				<v-col> {{$t("Fee")}} : 0.1 ETH   
						<v-card-actions class="justify-center">
										<div v-if="!isRegisted">
								 		 	<v-btn style="margin: 0;min-width: 60px" color="#33aa44" @click="ref_buy_page()">{{$t("Register now")}}</v-btn>
								 		 	<!-- <v-btn style="margin: 0;min-width: 60px" color="#33aa44" @click="upgradeDialog()"> </v-btn>  -->
								 		 	<!--<v-btn style="margin: 0;min-width: 60px" color="#33aa44" @click="collectNftbyArttDialog()"></v-btn> -->
								 			
								 		</div>
								 		<div v-else>
								 			  <p></p>
								 			  {{$t("You have registered code!")}} <br/>
								 			  <font color="#FFC95F"><h2>{{myRefCode}}</h2></font>
								 			  <p></p>
								 		</div>	
						</v-card-actions>
				</v-col>	
			<v-card-text> </v-card-text>	
			
			</v-card>	
		</v-row>	

    </div>

  	</v-tab-item>    	
  </v-tabs>



    <div style="background-color:#151515;">

		    <v-card
		    :loading="loading"
		    class="mx-auto my-12"
		    max-width="374"
		    v-if = "card_main==true"
		  >

   <!--
		  <v-container fluid>
		    <v-row>
		      <v-col
		        cols="12"
		        sm="6"
		        class="py-2"
		      >

		       		     <v-btn-toggle
				          v-model="icon"
				          borderless
				        >
				          <v-btn value="left">
				            <span class="hidden-sm-and-down">SWAP</span>
				            <v-icon right>mdi-format-align-center</v-icon>
				          </v-btn>
				          <v-btn value="center">
				            <span class="hidden-sm-and-down">Liquity Provide</span>
				            <v-icon right>mdi-format-align-center</v-icon>
				          </v-btn>

				        </v-btn-toggle>
		      </v-col>
		  </v-row> 
        </v-container>
		-->     	
	

			<v-card-text>

			     	<div class="text-center">
				    
				      <v-chip-group
				        v-model="selection"
				        active-class="deep-purple accent-4 white--text"
				        column
				      >
				        
				       <v-chip>SWAP</v-chip>

				        <v-chip>Liquity Provide</v-chip>


				      </v-chip-group>
				  
				  </div>
				      
			    </v-card-text>
		     

		    <v-card-text>

		    </v-card-text>

		    <v-divider class="mx-4"></v-divider>

		    <v-card-title>Your Liquidity</v-card-title>



		    <v-card-actions>
		      <v-btn
		        color="deep-purple lighten-2"
		        text
		        @click="createNewPool"
		      >
		        Don't see a pool you joined? <span style="color:red;"> Create it.</span>
		      </v-btn>
		    </v-card-actions>
		  </v-card>


		  <v-card
		    :loading="loading"
		    class="mx-auto my-12"
		    max-width="600"
		    min-width="400"
		    v-if = "card_newpool==true"
		  >
			<v-card-title>New Pool</v-card-title>

			<v-divider class="mx-4"></v-divider>
			    <v-chip
			      class="ma-2"
			      color="success"
			      outlined
			      @click="pasteNewAddress"
			    >
			     
			      Select a Token
			       <v-icon left>mdi-server-plus</v-icon>
			    </v-chip>

		  </v-card>


		  <v-card
		    :loading="loading"
		    class="mx-auto my-12"
		    max-width="600"
		    min-width="400"
		    v-if = "card_pasteaddress==true"
		  >
			<v-card-title>Select a Token</v-card-title>

			<v-divider class="mx-4"></v-divider>

			<v-form>
		    <v-container>			  
				<v-row>
			      <v-col cols="12" sm="12">
		          <v-text-field
		            value=""
		            v-model="addr_input"
		            @input="pasteaddr"
		            label="Paste contract address here"
		            outlined
		          ></v-text-field>
		        </v-col>
		      </v-row>
		    </v-container>
		  	</v-form>

		  	

		  	  <div class="text-center">
			    
			    <v-btn class="ma-2" tile outlined color="success"  v-if="erc20_found" >
			      <v-icon left color="blue darken-2">request_page</v-icon> {{symbol_found}}
			    <br/>  
			    </v-btn>
			    
			  </div>

		  </v-card>

	</div>

     <!-- ********************************************************************* -->
		<v-dialog
	        v-model="TxPendingDialog_seen"
	        max-width="300"
	      >
	        <v-card color="#2A372D" >

				 <v-app-bar
      				dark
				    color="#1E2745"
				 >
				 <v-toolbar-title>{{$t("Transaction Pending")}}</v-toolbar-title>
			      <v-spacer></v-spacer>
			     <v-btn  icon @click="TxPendingDialog_seen = false">
				 <v-icon>close</v-icon></v-btn>	

			   </v-app-bar>

			     <br/>
				   <v-flex class="text-center">

				   	<div v-if="txpending" >
					    <v-progress-circular
					      :width="3"
					      color="green"
					      indeterminate
					    ></v-progress-circular>
				    </div>

				   	<div v-if="!txpending" >
					    <v-icon large color="green light-2" >done_outline</v-icon>
				    </div>

				    <br/>
					    <div v-if="txpending" style="color:white;">
					   	    {{$t("Waiting for confirm by blockchain")}}
					    </div>
					   	<div v-if="!txpending" style="color:white;" >
						    
					        {{$t("Transaction confirmed")}}
					    </div>

				    <br/>

				    <v-btn @click="open_etherscan()"  dark style="margin-right:4px;margin-bottom: 8px;">   <div style="color:#5599ee;">  {{$t("View information on Etherscan")}}</div>
				    </v-btn>

				 </v-flex>
				    

			</v-card>
				
		</v-dialog> 		

        <!-- ---------------------------------------- -->
        <v-dialog
	        v-model="StakeDialog_seen"
	        max-width="500"
	      >

	        <v-card class="mx-auto my-12"
		    max-width="500"
		    dark >
			     <v-card-actions >
			     		<v-col class="text-center"  >
			     			<font color="#DDDDDD"> {{$t("Yield Farming")}} ( APWR-ETH ) </font>
							<div class="text-right"  >
						     <v-btn  icon @click="StakeDialog_seen = false">
								<v-icon>close</v-icon></v-btn>
					    			
							</div>	
							<!--
					    	 <v-btn dark style="margin-right:20px;min-width: 60px;" :color="stake_btn1color"  @click="stakeMode(1)">{{$t("Store")}}(Stake)</v-btn>
					    	-->
					    </v-col>
				</v-card-actions>

	 			<v-divider></v-divider>
			    <v-container text-xs-center>
			    	<v-flex class="text-center">
			    			<div style="color:#44aaee;"><h3>
			    				{{$t("Use APWR-ETH note1")}}
			    					<v-icon small color="yellow darken-2" 
									   @click="Metamask_add_token('APWR_ETH')" >
									info </v-icon>
			    			</h3></div>

						<br/>

						<div v-if="stakeApprove_pass==true" >
								<div style="padding-left: 30px;"　>	
				 					<v-flex class="text-right" style="padding-right:20px;">
							    		 <v-btn text @click="Stake_inputmax()">{{$t("Max.")}}</v-btn>	  	
							    	</v-flex>
						    	</div>	
					    		<v-flex class="text-center" >
											<v-layout align-baseline >
						                    <v-row justify="center" >
						                    <v-form ref="form1" > 
						                    <h2>
						                    <v-text-field 
						                      class="centered-input text-center text--darken-3 mt-3" 
		  									  color="white lighten-43"  
						                      v-model="input_stake"
						                      placeholder="0.0"
						                      autofocus
						                      style="width: 120px; display: inline-block;"
						                      :rules="[() => !err01_token2_input|| $t('Amount must more than 0')]"
						                    ></v-text-field>
						                	</h2>
						                    </v-form> 
						                   <div style="color:gray;"><h1> UNI-V2</h1></div>
						                   </v-row>
						                    </v-layout>
						        </v-flex>
				        </div>
				        <p><p/>
				 			<!--	
				 				<v-btn dark color="#606060" @click="" style="margin-bottom:10px;" >
					   					{{$t("Opening soon")}}
					   			</v-btn>	
				 		    -->
						<div v-if="stakeApprove_pass==true" >
							    <v-btn dark color="#005522" @click="exec_stake()" style="margin-bottom:10px;" >
					   					{{$t("Store in")}}
					   			</v-btn>	
					   	</div>
					   	<div  v-else >
					   			<v-btn dark color="#ee2222" @click="enableApprove_uniReward()" style="margin-bottom:10px;" >
					   				    {{$t("Permit")}}(Approve)
					   		    </v-btn>
					   		    <p><p/>
					   		    <p><p/>
					   	</div>
					   
					</v-flex>	   	
			    </v-container>

	        </v-card>
        </v-dialog> 
        <!-- ---------------------------------------- -->
        <div class="text-center">
		    <v-dialog
		      v-model="GetrewardDialog_seen"
		      width="500"
		    >
		      <v-card color="#64503F" >
		        <v-card-title >
		          <h3 style="color:#cccccc" >{{$t("Get Reward title")}}</h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="GetrewardDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h4 style="color:#cccccc" >{{$t("Get Reward note1")}}</h4>
		        </v-card-text>

		        <v-divider></v-divider>

		        <v-card-actions>
		         
			        <v-btn
			          color="red lighten-2"
			          dark
			          
			          @click="getReward_submit()"
			        >
			          {{$t("Take out now")}}
			        </v-btn>
			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="GetrewardDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>
        <!-- ---------------------------------------- -->
        <div class="text-center">
		    <v-dialog
		      v-model="ExitStakeDialog_seen"
		      width="500"
		    >
		      <v-card color="#64503F" >
		        <v-card-title >
		          <h3 style="color:#cccccc" >{{$t("Quit exhibition")}}</h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="ExitStakeDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h4 style="color:#cccccc" >{{$t("Quit NFT staking note1")}}</h4> <p></p>
		          <h4 style="color:#cccccc" >{{$t("Quit NFT staking note2")}}</h4>
		        </v-card-text>

		        <v-divider></v-divider>

		        <v-card-actions>
		         
			        <v-btn
			          color="red lighten-2"
			          dark
			          
			          @click="ExitStake_submit()"
			        >
			          {{$t("Now quit")}}
			        </v-btn>
			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="ExitStakeDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>        
        <!-- ---------------------------------------- -->
        <v-dialog
	        v-model="FundingDialog_seen"
	        max-width="540"
	      >

	        <v-card class="mx-auto my-12"
		    max-width="480"
		    dark
		     >
			     <v-card-actions >
			     		<v-col class="text-center"  >
							<div class="text-right"  >
						     <v-btn  icon @click="Funding_close()">
								<v-icon>close</v-icon></v-btn>
					    			
							</div>	
					    	 {{$t("FundPage title")}}
					    </v-col>
				</v-card-actions>

	 			<v-divider></v-divider>
	 				<div v-if="funding_page==1">
	 					

						    <v-stepper v-model="e1">
						      <v-stepper-header style="background: #181818;">
						        <template v-for="n in ico_steps">

						          <v-stepper-step
						            v-if="n>=2"
						            :key="`${n}-step`"
						            :complete="e1 > n"
						            :step="n"
						            color="green"
						            editable
						          >
						            Round-{{ n-1 }}
						          </v-stepper-step>

						          <v-stepper-step
						            v-if="n<=1"
						            :key="`${n}-step`"
						            :complete="e1 > n"
						            :step="n"
						            color="green"
						            editable
						          >
						            PreSale Round
						          </v-stepper-step>

						          <v-divider
						            v-if="n !== ico_steps"
						            :key="n"
						          ></v-divider>
						        </template>
						      </v-stepper-header>

						      <v-stepper-items style="background: #101010;">
						        <v-stepper-content
						          v-for="n in ico_steps"
						          :key="`${n}-content`"
						          :step="n"
						        >

						          
						          <div v-if="n==1" >

						            <v-card
						             class="mb-12"
						             
						             style="
										  background: #01041b;
										  background: -webkit-linear-gradient(to right, #01041b, #222c4b);
										  background: linear-gradient(to right, #01041b, #222c4b);
										   "
						             height="240px"
						            > 
						            <div style="margin-left:20px;" >
							          	<font color="#FFcd4f;"><h3>{{$t("Round 1")}}</h3></font>
							          	<p></p>
							          	<h4>
							            {{$t("Round 1")}} {{$t("Account")}}:
							            <font color="#FFcd4f;"> 0x3bfcA8c915316103438D4f364293844657570c97</font><br/>
										{{$t("Round 1 note1")}}<p></p>
										</h4>
										<h3>
										{{$t("Total")}}: 200000 ARTD, <br/>
										<font color="#FFcd4f;"> 1 ETH = 2000 ARTD </font> ( ~$0.29 ) 
										</h3>
										<p></p>
										<h4><font color="#D96970"> {{$t("First registered first served")}}</font></h4>
									</div>
										
								    </v-card> 
						          </div  >
						          <div v-else-if="n==2" style="margin-left:20px;" >
						            <v-card
						             class="mb-12"
						             style="
										  background: #01041b;
										  background: -webkit-linear-gradient(to right, #011002, #132814);
										  background: linear-gradient(to right, #011002, #132814);
										   "
						             height="240px"
						            > 
							            <div style="margin-left:20px;" >
								          	<font color="#FFcd4f;"><h3>{{$t("Round 2")}}</h3></font>
								          	<p></p>
								          	<h4>
								          	{{$t("No Time limit.")}}<br/>
											{{$t("Round 2 note1")}}<p></p>
											</h4>
											<h3>
											{{$t("Total")}}: 400000 ARTD , <br/>
											<font color="#FFcd4f;"> 1 ETH = 1000 ARTD </font> ( ~$0.58 ) 
											</h3>
											<p></p>
											<h4><font color="#D96970"> {{$t("Round x note2")}}</font></h4>
										</div>

									 </v-card>
						          </div>

						          <div v-else-if="n==3" style="margin-left:20px;" >
						            <v-card
						             class="mb-12"
						             style="
										  background: #180104;
										  background: -webkit-linear-gradient(to right, #180104, #381218);
										  background: linear-gradient(to right, #180104, #381218);
										   "
						             height="240px"
						            > 
						            	<div style="margin-left:20px;" >
								          	<font color="#FFcd4f;"><h3>{{$t("Round 3")}}</h3></font>
								          	<h4>
								          	 <br/>
											{{$t("Round 3 note1")}}<p></p>
											</h4>
											<h3>
											{{$t("Total")}}: 600000 ARTD <br/>
											<font color="#FFcd4f;"> 1 ETH = 550 ARTD </font> ( ~$1.05 ) 
											</h3>
											<p></p>
											<h4><font color="#D96970"> {{$t("Round x note2")}}</font></h4>
										</div>

						          	 </v-card>
						          </div>

						          

						          	<div class="left-btn">
								          <v-btn 
								            text
								            @click="nextStep(n)"
								          >
								            {{$t("Next")}}
								          </v-btn>
								    </div>      

								    <div v-if="fund_enable" >
								    	  
								    	   <div v-if="fund_stage>=1" >
									          	<div class="right-btn">
										           <v-btn color="blue" 
										           @click="ico_more()"> {{$t("Join")}} Round-{{fund_stage-1}}</v-btn> 
										       	</div>
										   </div>
										   <div v-else>
										   	  	<div class="right-btn">
										           <v-btn color="blue" 
										           @click=""> {{$t("Reconnect wallet")}}</v-btn> 
										       	</div>
										   </div>    	
								    </div>
								    <div v-else>
								    		<div class="right-btn">
									           <v-btn color="blue" 
									           @click="go_Twitter()"> {{$t("Wait for Fund enable")}}</v-btn> 
									       	</div>
								    </div>   	
							           
							      
							            	
						        </v-stepper-content>
						      </v-stepper-items>
						    </v-stepper>
						  
	 				</div>	
	 			    <div v-else-if="funding_page==2">
			 				<v-col class="text-center"  >
			 					{{$t("Fund_P2_title1")}}

			 					<br/>
							    	{{$t("Fund_P2_title2")}}:
							    <p> 
							    <span style="color:#FFFFFF" >

								    <input type="text" style="color:#FFFFFF;width:400px" value="0xe6A58bd320dc339E51C4f832318073b596E1637a" id="myInput">
								    <div class="tooltip">
									  <button v-on:click="copyTextFunction()" v-on:mouseover="mouseoutFunc()">
									    <span class="tooltiptext" id="myTooltip"></span>
									       <font color="#89FFDD;">{{$t("Copy")}}</font>
									    </button>
									</div>
								</span>
							    </p>
							       ,{{$t("Fund_P2_title3")}} ARTD
							    <br/>
							    	<v-container fluid >
							    	   <v-btn color="blue" 
							               @click="fundETHDialog_seen=true;getBalance_ETH()"> {{$t("Get now")}} </v-btn> 
							           	<v-icon 
							                small color="#C3ECC9" 
											 @click="Metamask_add_token('ARTD')" >
											 info 
										</v-icon>     
							    	</v-container>		
							    <p></p>
							    <h4 style="color:#F07178" >
								      {{$t("Fund_P2_note1")}} 
								      <br/>
								      {{$t("Fund_P2_note2")}} 
								</h4>
							</v-col>
					</div>		    
					    　
	 		</v-card>
	 	</v-dialog>	
	 			
        <!-- ---------------------------------------- -->
        <div class="text-center">
		    <v-dialog
		      v-model="TxInputdDialog_seen"
		      width="500"
		    >
		      <v-card style="
				  background: #380E06;
				  background: -webkit-linear-gradient(to right, #380E06, #89533A, #380E06);
				  background: linear-gradient(to right, #380E06, #89533A, #380E06);
				   " >
		        <v-card-title >
		          <h3 style="color:#cccccc" >{{$t("NFT Transfer")}} </h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="TxInputdDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h4 style="color:#bbbbbb" >{{$t("NFT Tx note1")}}</h4>
		        </v-card-text>
		        
		        <v-divider></v-divider>
		        <v-card-text>
		          <h4 style="color:#dddddd" >{{$t("NFT Tx note2")}} NFT ID:{{transferNFT_id}}</h4>
		        </v-card-text>
		        <v-divider></v-divider>		        
		        			<v-flex class="text-center" >
              	    				<v-form>
									    <v-container>
											<v-row align="center" justify="center" >
											<v-col cols="12" sm="12" md="12" >
							          		<v-text-field
									            style="margin-left:10px;"
									          	class="centered-input text-center mx-2" 
									          	dense
									          	color="white"
									          	dark  
									            value=""
									            v-model="transferNFT_to"
									            @input="input_txNFT_addr"
									            :label="paste_tip"
									            outlined
									          ></v-text-field>
									        </v-col>	
									      </v-row>
									    </v-container>
									</v-form>
						     </v-flex>

		        <v-card-actions>
		         
			        <v-btn
			          color="blue darken-2"
			          dark
			          
			          @click="sendNFT_submit()"
			        >
			          {{$t("Transfer now")}}
			        </v-btn>
			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="TxInputdDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>
	      <!-- ---------------------------------------- -->	  
          <div class="text-center">
		    <v-dialog
		      v-model="StoreArtdDialog_seen"
		      width="500"
		    >
		      <v-card style="
				  background: #8D8D8D;
				  background: -webkit-linear-gradient(to right, #303030, #8D8D8D, #303030);
				  background: linear-gradient(to right, #303030, #8D8D8D, #303030);
				   " >
		        <v-card-title >
		          <h3 style="color:#cccccc" >{{$t("Store ARTD into NFT")}}</h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="StoreArtdDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h4 style="color:#bbbbbb" >{{$t("Store ARTD note1")}} <br/>
		          {{$t("Store ARTD note2")}}</h4>
		        </v-card-text>
		        
		        <v-divider></v-divider>

		        <v-card-title class="white--text mt-8">
					   <div class="text-left">
					          	 <v-row v-if="cards_sum>0">

					              	<img
					              	     style="margin-left: 80px;"
					               		 height="80px"
					               		 :src="cards[id_storeartd].src"
					              	> 
					            	<span style="margin-left: 20px;margin-bottom: 20px;"><h5>
									  ID : {{cards[id_storeartd].id}} <br/>
									  {{$t("Grade")}} : {{cards[id_storeartd].grade}} <br/>
					            	  {{$t("Contains")}} : {{formatToPrice1(cards[id_storeartd].artdamount)}}
					            	  <font style="color:#94ABB4"> ARTD</font>
					            	</h5></span>
					           		<v-icon large color="yellow" style="margin-left: 50px;"
									  @click="storeARTD_IDSelect()" >
									  skip_next 
									</v-icon>	
					          	   	</img>
								</v-row> 
						</div>			
				</v-card-title>
		        <v-card-text  >
		        	 <div class="text-center" v-if="cards_sum>0" >
		         			<h4 style="color:#dddddd" > {{$t("Specify")}} NFT ID: {{cards[id_storeartd].id}}</h4>
		         	 </div>		
		        </v-card-text>
		        <v-divider></v-divider>		        
		        			<v-flex class="text-center" >
              	    				<v-form>
									    <v-container>
											<v-row align="center" justify="center" >
											<v-col cols="8" sm="8" md="8" >
												<font style="color:#eeeeee">{{$t("Balance")}}: {{formatToPrice4(balance_artd) }}</font>
							          		<v-text-field
									            style="margin-left:10px;"
									          	class="centered-input text-center mx-2" 
									          	dense
									          	color="white"
									          	dark
									          	autofocus  
									            value=""
									            v-model="storeARTD_num"
									            @input="input_ARTD_num"
									            label="ARTD"
									            outlined
									          >
									          </v-text-field>
									        </v-col>
									      </v-row>
									    </v-container>
									</v-form>									
						     </v-flex>

		        <v-card-actions>
		         
		        	<div v-if="artdNftFactoryApprove_pass==true" >
		        				<div v-if="storeARTD_noenough">
								    <v-btn dark color="#cc3010" @click="" style="margin-bottom:10px;margin-left:40px;" >
						   					{{$t("Insufficient balance")}}
						   			</v-btn>			        				
		        				</div>
		        				<div v-else>	
								    <v-btn dark color="#005522" @click="store_ARTD_process()" style="margin-bottom:10px;margin-left:40px;" >
						   					{{$t("Process")}}
						   			</v-btn>
						   		</div>		
					</div>
					<div  v-else >
					   			<v-btn dark color="#ee2222" @click="enableApprove_Artd_NftFactory()" style="margin-bottom:10px;" >
					   				    {{$t("Permit")}}(Approve)
					   		    </v-btn>
					   		    <p><p/>
					   		    <p><p/>
					</div>

			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="StoreArtdDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>
	      <!-- ---------------------------------------- -->	  
          <div class="text-center">
		    <v-dialog
		      v-model="StoreApwrDialog_seen"
		      width="500"
		    >
		      <v-card style="
				  background: #8D8D8D;
				  background: -webkit-linear-gradient(to right, #303030, #8D8D8D, #303030);
				  background: linear-gradient(to right, #303030, #8D8D8D, #303030);
				   " >
		        <v-card-title >
		          <h3 style="color:#cccccc" > {{$t("Send APWR into NFT")}}</h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="StoreApwrDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h4 style="color:#bbbbbb" >{{$t("Send APWR note1")}} <br/>
		          {{$t("Send APWR note2")}}</h4>
		        </v-card-text>
		        
		        <v-divider></v-divider>

		        <v-card-title class="white--text mt-8">
					   <div class="text-left">
					          	 <v-row v-if="cards_sum>0">

					              	<img
					              	     style="margin-left: 80px;"
					               		 height="80px"
					               		 :src="cards[id_storeartd].src"
					              	> 
					            	<span style="margin-left: 20px;margin-bottom: 20px;"><h5>
									  ID : {{cards[id_storeartd].id}} <br/>
									  {{$t("Grade")}} : {{cards[id_storeartd].grade}} <br/>
					            	  {{$t("Strength")}} : {{formatToPrice4(cards[id_storeartd].apwramount)}}
					            	  <font style="color:#94ABB4"> APWR</font>
					            	</h5></span>
					           		<v-icon large color="yellow" style="margin-left: 50px;"
									  @click="storeARTD_IDSelect()" >
									  skip_next 
									</v-icon>	
					          	   	</img>
								</v-row> 
						</div>			
				</v-card-title>
		        <v-card-text  >
		        	 <div class="text-center" v-if="cards_sum>0" >
		         			<h4 style="color:#dddddd" > {{$t("Specify")}} NFT ID: {{cards[id_storeartd].id}}</h4>
		         	 </div>		
		        </v-card-text>
		        <v-divider></v-divider>		        
		        			<v-flex class="text-center" >
              	    				<v-form>
									    <v-container>
											<v-row align="center" justify="center" >
											<v-col cols="8" sm="8" md="8" >
											<font style="color:#eeeeee">{{$t("Balance")}}: {{formatToPrice4(balance_apwr) }}</font>		
							          		<v-text-field
									            style="margin-left:10px;"
									          	class="centered-input text-center mx-2" 
									          	dense
									          	color="white"
									          	dark  
									            value=""
									            v-model="storeAPWR_num"
									            @input="input_APWR_num"
									            label="APWR"
									            outlined
									          ></v-text-field>
									        </v-col>	
									      </v-row>
									    </v-container>
									</v-form>
						     </v-flex>

		        <v-card-actions>
		         
		        	<div v-if="apwrNftFactoryApprove_pass==true" >
		        		        <div v-if="storeAPWR_noenough">
								    <v-btn dark color="#cc3010" @click="" style="margin-bottom:10px;margin-left:40px;" >
						   					{{$t("Insufficient balance")}}
						   			</v-btn>			        				
		        				</div>
		        				<div v-else>	
							    	<v-btn dark color="#005522" @click="store_APWR_process()" style="margin-bottom:10px;margin-left:40px;" >
					   					{{$t("Process")}}
					   				</v-btn>
					   			</div>	
					 </div>
					 <div  v-else >
					   			<v-btn dark color="#ee2222" @click="enableApprove_Apwr_NftFactory()" style="margin-bottom:10px;" >
					   				    {{$t("Permit")}}(Approve)
					   		    </v-btn>
					   		    <p><p/>
					   		    <p><p/>
					</div>

			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="StoreApwrDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>

	      <!-- ---------------------------------------- -->	  
          <div class="text-center">
		    <v-dialog
		      v-model="spentArttDialog_seen"
		      width="500"
		    >
		      <v-card style="
				  background: #8D8D8D;
				  background: -webkit-linear-gradient(to right, #303030, #8D8D8D, #303030);
				  background: linear-gradient(to right, #303030, #8D8D8D, #303030);
				   " >
		        <v-card-title >
		          <h3 style="color:#cccccc" >{{$t("Spent ARTT into NFT")}}</h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="spentArttDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h4 style="color:#bbbbbb" >{{$t("Spent ARTT note1")}} 1 ARTT => 1 Skill<br/>
		          	{{$t("Spent ARTT note2")}}
		          </h4>
		        </v-card-text>
		        
		        <v-divider></v-divider>

		        <v-card-title class="white--text mt-8">
					   <div class="text-left">
					          	 <v-row v-if="cards_sum>0">

					              	<img
					              	     style="margin-left: 80px;"
					               		 height="80px"
					               		 :src="cards[id_storeartd].src"
					              	> 
					            	<span style="margin-left: 20px;margin-bottom: 20px;"><h5>
									  ID : {{cards[id_storeartd].id}} <br/>
									  {{$t("Grade")}} : {{cards[id_storeartd].grade}} <br/>
					            	  {{$t("Skill")}} : {{formatToPrice1(cards[id_storeartd].skill)}}
					            	  <font style="color:#94ABB4"> (ARTT)</font>
					            	</h5></span>
					           		<v-icon large color="yellow" style="margin-left: 50px;"
									  @click="storeARTD_IDSelect()" >
									  skip_next 
									</v-icon>	
					          	   	</img>
								</v-row> 
						</div>			
				</v-card-title>
		        <v-card-text  >
		        	 <div class="text-center" v-if="cards_sum>0" >
		         			<h4 style="color:#dddddd" > {{$t("Specify")}} NFT ID: {{cards[id_storeartd].id}}</h4>
		         	 </div>		
		        </v-card-text>
		        <v-divider></v-divider>		        
		        			<v-flex class="text-center" >
              	    				<v-form>
									    <v-container>
											<v-row align="center" justify="center" >
											<v-col cols="8" sm="8" md="8" >
											<font style="color:#eeeeee">{{$t("Balance")}}: {{formatToPrice4(balance_artt) }}</font>	
							          		<v-text-field
									            style="margin-left:10px;"
									          	class="centered-input text-center mx-2" 
									          	dense
									          	color="white"
									          	dark  
									            value=""
									            v-model="spentARTT_num"
									            @input="input_ARTT_num"
									            label="ARTT"
									            outlined
									          ></v-text-field>
									        </v-col>	
									      </v-row>
									    </v-container>
									</v-form>
						     </v-flex>

		        <v-card-actions>
		         
		        	<div v-if="arttNftFactoryApprove_pass==true" >
		        		     	<div v-if="storeARTT_noenough">
								    <v-btn dark color="#cc3010" @click="" style="margin-bottom:10px;margin-left:40px;" >
						   					{{$t("Insufficient balance")}}
						   			</v-btn>			        				
		        				</div>
		        				<div v-else>	
								    <v-btn dark color="#005522" @click="spent_ARTT_process()" style="margin-bottom:10px;margin-left:40px;" >
						   					{{$t("Process")}}
						   			</v-btn>
						   		</div>		
					   	</div>
					   	<div  v-else >
					   			<v-btn dark color="#ee2222" @click="enableApprove_Artt_NftFactory()" style="margin-bottom:10px;margin-left:40px;" >
					   				    {{$t("Permit")}}(Approve)
					   		    </v-btn>
					   		    <p><p/>
					   		    <p><p/>
					</div>

			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="spentArttDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>
	      <!-- ---------------------------------------- -->	  
          <div class="text-center">
		    <v-dialog
		      v-model="withdrawARTDDialog_seen"
		      width="500"
		    >
		      <v-card style="
				  background: #426C70;
				  background: -webkit-linear-gradient(to right, #1B3F47, #426C70, #1B3F47);
				  background: linear-gradient(to right, #1B3F47, #426C70, #1B3F47);
				   " >
		        <v-card-title >
		          <h3 style="color:#cccccc" >{{$t("Withdraw ARTD to wallet")}}</h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="withdrawARTDDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h4 style="color:#bbbbbb" >{{$t("Withdraw ARTD note1")}} <br/>
		          {{$t("Withdraw ARTD note2")}} <br/>
		           NFT ID: {{ withdrawARTD_id }} <br/>
		           	<span v-if="cards_sum >0">
		           		{{$t("Contains")}}: {{cards[withdrawARTD_serial].artdamount}} ARTD
		       		</span>
		           </h4>
		        </v-card-text>
		       
		        <v-divider></v-divider>		        
		        			<v-flex class="text-center" >
              	    				<v-form>
									    <v-container>
											<v-row align="center" justify="center" >
											<v-col cols="8" sm="8" md="8" >
							          		<v-text-field
									            style="margin-left:10px;"
									          	class="centered-input text-center mx-2" 
									          	dense
									          	color="white"
									          	dark  
									            value=""
									            v-model="storeARTD_num"
									            @input="input_ARTD_num"
									            label="ARTD"
									            outlined
									          ></v-text-field>
									        </v-col>	
									      </v-row>
									    </v-container>
									</v-form>
						     </v-flex>

		        <v-card-actions>
		         <!--
		            	<v-btn dark color="#606060" @click="" style="margin-bottom:10px;margin-left:40px;" >
					   					{{$t("Opening soon")}}
					   	</v-btn>	
				 -->
		            
		        	<div v-if="withdrawFundApprove_pass==true" >
									<v-btn dark color="red" @click="withdraw_ARTD_process()" style="margin-bottom:10px;margin-left:40px;" >
					   					{{$t("Process")}}
					   				</v-btn>		    	
					</div>
					<div  v-else >
					   			<v-btn dark color="#ee2222" @click="enableApprove_Fundpool()" style="margin-bottom:10px;margin-left:40px;" >
					   				    {{$t("Permit")}}(Approve)
					   		    </v-btn>
					   		    <p><p/>
					   		    <p><p/>
					</div>
					
			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="withdrawARTDDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>
	      <!-- ---------------------------------------- -->	  
		    <v-dialog
		      v-model="nftrw_PartnerDialog_seens"
		      width="500"
		    >
		    	<v-card
				    max-width="450"
				    class="mx-auto"
				    dark
				  >
				    <v-toolbar
				      color="gray"
				      dark
				    >
				      <v-app-bar-nav-icon></v-app-bar-nav-icon>

				      <v-toolbar-title>{{$t("Exhibitor list")}}</v-toolbar-title>

				      <v-spacer></v-spacer>
				        <div class="text-right">
						     <v-btn dark icon @click="nftrw_PartnerDialog_seens = false">
								<v-icon>close</v-icon></v-btn>		
					    </div>	

				    </v-toolbar>

				    <span style="color:#FFFFFF" >
								<v-text-field 
									label="Search address" 
									v-model="search_addr"
									@input="input_search" 
									style="margin-left:20px;margin-right:20px"
								>
							    <v-icon
							      slot="append"
							      color="white"
							    >
							      account_circle
							    </v-icon>
							    
								    <v-icon
								      slot="prepend"
								      color="blue"
								    >
								      search
								    </v-icon>
								    
							  </v-text-field>
									
					</span>
					<!--
					<div class="text-center" style="color:#EB8C8C" >
						{{$t("Reward has not start, active soon")}}
					</div>	 -->
					      <div class="text-center">
						    <v-pagination
						      v-model="stakerw_page"
						      :length="pagination_len"
						      @input="rwpage_selection"
      							circle
						    ></v-pagination>
						  </div>

				    <v-list three-line>
				      <template v-for="(item, index) in nftrw_user">
				      	<!--
				        <v-subheader
				          v-if="item.header"
				          :key="item.header"
				          v-text="item.header"
				        ></v-subheader>

				        <v-divider
				          v-else-if="item.divider"
				          :key="index"
				          :inset="item.inset"
				        ></v-divider>
						-->
				        <v-list-item
				          :key="item.id"
				        >
				         <v-row>
				         	<div class="text-center" style="margin-left:20px;margin-top:30px">  
				             <h2>{{item.id}} </h2>
				            </div>

				          <v-col>
				          	<div class="text-left" style="margin-left:30px;" >
				          		<font color="#cccccc">
					          	 <h5>{{item.staker}}</h5>
					         	 {{$t("Weight")}} : <font color="#F89494"> {{item.weight}} </font> <br/>
					         	 {{$t("Earned")}} : <font color="#F89494"> {{item.earned}} </font> <font color="#0191f0"> ARTD</font> <br/>
					         	</font> 
					        </div> 	 
				         	</v-col> 
				         </v-row>

				        </v-list-item>
				        
				        <v-divider></v-divider>

				      </template>
				    </v-list>
				  </v-card>

		    </v-dialog>
	      <!-- ---------------------------------------- -->	   
          <div class="text-center">
		    <v-dialog
		      v-model="fundETHDialog_seen"
		      width="500"
		    >
		      <v-card style="
				  background: #426C70;
				  background: -webkit-linear-gradient(to right, #1B3F47, #426C70, #1B3F47);
				  background: linear-gradient(to right, #1B3F47, #426C70, #1B3F47);
				   " >
		        <v-card-title >
		          <h3 style="color:#cccccc" >{{$t("Exchange ETH for ARTD")}}</h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="fundETHDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <div v-if="fund_stage==1">	
		          	  <h4 style="color:#bbbbbb" > {{$t("Swap rate")}}: 1 ETH = 2000 ARTD <br/></h4>
		          </div>
		          <div v-else-if="fund_stage==2">	
		          	  <h4 style="color:#bbbbbb" > {{$t("Swap rate")}}: 1 ETH = 1000 ARTD <br/></h4>
		          </div>		          	
		          <div v-else-if="fund_stage==3">	
		          	  <h4 style="color:#bbbbbb" > {{$t("Swap rate")}}: 1 ETH = 550 ARTD <br/></h4>
		          </div>
		        </v-card-text>
		        <v-divider></v-divider>		        
		        			<v-flex class="text-center" >
              	    				<v-form>
									    <v-container>
											<v-row align="center" justify="center" >
											<v-col cols="8" sm="8" md="8" >
												<font style="color:#eeeeee">{{$t("Balance")}}: {{formatToPrice4(balance_eth) }} ETH</font>
							          		<v-text-field
									            style="margin-left:10px;"
									          	class="centered-input text-center mx-2" 
									          	dense
									          	color="white"
									          	dark  
									            value=""
									            v-model="spentETH_num"
									            @input="input_ETH_num"
									            label="ETH"
									            outlined
									          ></v-text-field>
									        </v-col>	
									      </v-row>
									    </v-container>
									</v-form>
						     </v-flex>

		        <v-card-actions>
		         
		        				<div v-if="storeETH_noenough">
								    <v-btn dark color="#cc3010" @click="" style="margin-bottom:10px;margin-left:40px;" >
						   					{{$t("Insufficient balance")}}
						   			</v-btn>			        				
		        				</div>
		        				<div v-else>	
									    <v-btn dark color="red" @click="SendETH_toFund()" style="margin-bottom:10px;margin-left:20px;" >
							   					{{$t("Get ARTD now")}}
							   			</v-btn>
							   	</div>		
					   			<v-icon 
							                small color="#C3ECC9" 
											 @click="Metamask_add_token('ARTD')" >
											 info 
								</v-icon>     	
					   		    <p><p/>

			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="fundETHDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>
		  <!-- ---------------------------------------- -->	
        	<v-dialog
	       		 v-model="rerbuy_Dialog_seen"
	        	 max-width="500"
	      	>

	      	<v-card class="mx-auto my-12"
		    max-width="480"
		    dark >
			     		<v-col class="text-center"  >
							<div class="text-right"  >
						     <v-btn  icon @click="rerbuy_Dialog_seen = false">
								<v-icon>close</v-icon></v-btn>
							</div>	
					    </v-col>
		    	<v-card-title style="color:#e56d74">{{$t("Regcode title")}}</v-card-title>
						    <div style="margin-left:10px;">
						    	1. {{$t("Regcode note1")}}<br/>
								2. {{$t("Regcode note2")}}<br/>
								3. {{$t("Regcode note3")}}<br/>
								4. {{$t("Regcode note4")}}<br/>
								5. {{$t("Regcode note5")}}<br/>
								6. {{$t("Regcode note6")}}<br/>
								7. {{$t("Regcode note7")}}<br/>
								8. {{$t("Regcode note8")}}<br/>
						    </div>
				

				<v-flex class="text-center" >
						<v-layout align-baseline >
	                    <v-row justify="center" >
	                    <v-form ref="form1" > 
	                    <h2>
	                    <v-text-field 
	                      class="centered-input text-center text--darken-3 mt-3" 
							  color="white lighten-43"  
	                      v-model="custom_refcode"
	                      placeholder="Ex: John"
	                      autofocus
	                      style="width: 120px; display: inline-block;"
	                    ></v-text-field>
	                	</h2>
	                    </v-form> 
	                   
	                   </v-row>
	                    </v-layout>		                   
			    </v-flex>

			    <font color="#467EB1"> {{$t("Fee")}}: 0.1 ETH </font>
			    <v-col class="text-right">
					<v-btn
					   color="blue"
					   @click="pay_refcode()"
					>
					    {{$t("Confirm")}}
					</v-btn>
					<p>
						<v-progress-circular
					      :width="3"
					      color="green"
					      indeterminate
					      v-if="check_loading"
					    ></v-progress-circular>
					</p>
				</v-col>

			</v-card>
		</v-dialog>	
        <!-- ======================================================= -->		
			<v-row justify="center">
			    <v-dialog
			      v-model="codecheck_dialog"
			      persistent
			      max-width="380"
			      dark
			    >
			      <v-card>
			        <v-card-title class="headline">
			          {{$t("Stop process")}}
			        </v-card-title>
			        <v-card-text style="color:#f03645;">{{$t("Code be used for someone or invalid.")}}</v-card-text>
			        <p></p>
			        <v-card-text>{{$t("It cannot be only numbers.")}}</v-card-text>
			        <v-card-actions>
			          <v-spacer></v-spacer>
			          <v-btn
			            color="green darken-1"
			            text
			            @click="codecheck_dialog = false"
			          >
			           {{$t("OK")}}
			          </v-btn>
			        </v-card-actions>
			      </v-card>
			    </v-dialog>
			  </v-row>
           <!-- ======================================================= -->			
		<!-- ---------------------------------------- -->	  
          <div class="text-center">
		    <v-dialog
		      v-model="upgradeNFTDialog_seen"
		      width="500"
		    >
		      <v-card style="
				  background: #8D8D8D;
				  background: -webkit-linear-gradient(to right, #303030, #8D8D8D, #303030);
				  background: linear-gradient(to right, #303030, #8D8D8D, #303030);
				   " >
		        <v-card-title >
		          <h3 style="color:#cccccc" > {{$t("Upgrade NFT")}} </h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="upgradeNFTDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h4 style="color:#bbbbbb" > {{$t("UpgradeNFT note1")}} <br/>
		          {{$t("Upgrade target")}} : ERA - {{UPGRADE_NEW_ERA}}	
		          </h4>	
		        </v-card-text>
		        
		        <v-divider></v-divider>

		        <v-card-title class="white--text mt-8">
					   <div class="text-left">
					          	 <v-row v-if="cards_sum>0">

					              	<img
					              	     style="margin-left: 80px;"
					               		 height="80px"
					               		 :src="cards[id_upgradenft].src"
					              	> 
					            	<span style="margin-left: 20px;margin-bottom: 20px;"><h5>
									  ID : {{cards[id_upgradenft].id}} <br/>
									  {{$t("Era")}} : {{cards[id_upgradenft].era}} <br/>
									  {{$t("Grade")}} : {{cards[id_upgradenft].grade}} 
					            	</h5></span>
					           		<v-icon large color="yellow" style="margin-left: 50px;"
									  @click="upgradeNFT_IDSelect()" >
									  skip_next 
									</v-icon>	
					          	   	</img>
								</v-row>
								<v-row v-else >
									 <div class="text-center" justify="center" style="margin-left: 30px;">
										{{$t("No object or showing off")}}
									 </div>	
								</v-row> 
						</div>			
				</v-card-title>
		        <v-card-text  >
		        	 <div class="text-center" v-if="cards_sum>0" >
		         			<h4 style="color:#dddddd" > {{$t("Specify")}} NFT ID: {{cards[id_upgradenft].id}}</h4>
		         	 </div>		
		        </v-card-text>
		        <v-divider></v-divider>		        


		        <v-card-actions>
		            <div v-if="cards_sum>0 && (cards[id_upgradenft].era < UPGRADE_NEW_ERA)">
		            	
			        	<div v-if="yournftFactoryApprove_pass==true" >
								    	<v-btn dark color="#005522" @click="upgrade_NFT_process()" style="margin-bottom:10px;margin-left:40px;" >
						   					{{$t("Process")}}
						   				</v-btn>

						</div>
						<div  v-else >
						
						   			<v-btn dark color="#ee2222" @click="enableApprove_your_NftFactory()" style="margin-bottom:10px;margin-left:40px;" >
						   				    {{$t("Permit")}}(Approve)
						   		    </v-btn>
						   		    <p><p/>
						   		    <p><p/>
						</div>

					</div>	
			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="upgradeNFTDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>  

		 <!-- ---------------------------------------- -->	  
          <div class="text-center">
		    <v-dialog
		      v-model="claimNftbyArttDialog_seen"
		      width="500"
		    >
		      <v-card style="
				  background: #8D8D8D;
				  background: -webkit-linear-gradient(to right, #303030, #8D8D8D, #303030);
				  background: linear-gradient(to right, #303030, #8D8D8D, #303030);
				   " >
		        <v-card-title >
		          <h3 style="color:#cccccc" >{{$t("Collect")}} NFT</h3>
		          <v-spacer></v-spacer>
		          	<div class="text-right">
						     <v-btn dark icon @click="claimNftbyArttDialog_seen = false">
								<v-icon>close</v-icon></v-btn>		
					</div>	
		        </v-card-title>
		        <p></p>
		        <v-card-text>
		          <h5 style="color:#cccccc" >{{$t("Expense")}} : 1 ARTT <br/>
		          	{{$t("Collect target")}} : ERA - {{UPGRADE_NEW_ERA}}	
		          </h5>
		        </v-card-text>
		        
		        <v-divider></v-divider>

		        <v-card-title class="white--text mt-8">
		        		<div class="text-left">
		        	    <h5>  {{$t("Reserve")}} : {{Relaystock}} </h5>
		        	   </div>
					   <div class="text-center">
					   <h5 style="color:#c0c7dd" >	{{$t("Relay collect NFT note1")}} </h5>
					   </div>			
				</v-card-title>      
		        			<v-flex class="text-center" >
              	    				<v-form>
									    <v-container>
											<v-row align="center" justify="center" >
											<v-col cols="8" sm="8" md="8" >
											<font style="color:#eeeeee">{{$t("Balance")}}: {{formatToPrice4(balance_artt) }}</font>	
							          		<v-text-field label="ARTT" :readonly="true"
							          			class="centered-input text-center mx-2" 
									          	dense
									          	color="white"
									          	dark 
									          	outlined 
									            value="1.0"
									            > </v-text-field>
								          		<div v-if="balance_artt<1" style="color:#FFFC71" >
								          			{{$t("You need own 1 ARTT minmum")}}
								          		</div>	
									        </v-col>	
									      </v-row>
									    </v-container>
									</v-form>
						     </v-flex>

		        <v-card-actions>
		            <div v-if="balance_artt < 1">
		            				<v-btn dark color="#cc3010" @click="" style="margin-bottom:10px;margin-left:40px;" >
						   					{{$t("Insufficient balance")}}
						   			</v-btn>	
					</div>
					<div v-else>	   			
			        	<div v-if="arttRelayApprove_pass==true" >
									    <v-btn dark color="#005522" @click="Relay_paidARTT_process()" style="margin-bottom:10px;margin-left:40px;" >
							   					{{$t("Process")}}
							   			</v-btn>

						</div>
						<div v-else >
						   			<v-btn dark color="#ee2222" @click="enableApprove_Artt_Relay()" style="margin-bottom:10px;margin-left:40px;" >
						   				    {{$t("Permit")}}(Approve)
						   		    </v-btn>
						   		    <p><p/>
						   		    <p><p/>
						</div>
					</div>	

			      
		          <v-spacer></v-spacer>
		          <v-btn
		            color="white"
		            text
		            @click="claimNftbyArttDialog_seen = false"
		          >
		            {{$t("Close")}}
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		  </div>
		  <!-- ---------------------------------------- -->	


     </v-layout>

</v-app> 
</template>


<script>
import VueMetamask from 'vue-metamask';
import '@metamask/legacy-web3'
import AnimatedNumber from "animated-number-vue";

const OPENING_TIME =  1608004800
const OPENING_TIME2 =  1608177600

const contract_ANFT = '0x99a7e1188CE9a0b7514d084878DFb8A405D8529F'
const contract_APWR = '0xb60F072494c7f1b5a8ba46bc735C71A83D940D1A'
const contract_ARTD = '0xA23F8462d90dbc60a06B9226206bFACdEAD2A26F'
const contract_nftfactory = '0x448364834cb97e6dddF153b8a40CC7bb8D3bB82D'
const contract_PlayerBook = '0x4eD7A3721F203Cf108b4279061B36CC20b14E57A'
const contract_FundPool = '0x37C8fC383e037f92f501E5884B8B5E37e3f5170E'
const contract_OpenSwap = '0xe6A58bd320dc339E51C4f832318073b596E1637a'   //main-net

const contract_LPAPWRReward = '0x91D4035133d37119A701258CF689fB3F7804Bead'
const contract_UniPair_1 = '0xa7db6B6B38224AeDbae425E1D3D5948aa2dF08B6'  //UNI-V2 ( APWR-ETH )
const contract_NFTReward = '0xe8F587D95d1fB596bE3088d5a788859ED3b21FE5'
const contract_NFTReward2 = '0xb794FA29F9cE65fB6050f7Cd7462B815D2736a29'

const contract_ARTT = '0x77dF79539083DCd4a8898dbA296d899aFef20067'
const contract_NftRelay = '0x723E2378626636F152412F9D2f052EfD6BC7697e'

//18.179.223.118
//const _GETTOPIC = "https://beanfunapi.chainbacon.com/vote/get_topic"
const _StakeCount = 'https://apinft.artem.finance/artdeco/stakecount/?network=ethereum&pool='
const _StakeInfo =  'https://apinft.artem.finance/artdeco/stakeinfo/?network=ethereum&pool='
const _NftSupply =  'https://apinft.artem.finance/artdeco/nftTotalSupply/?network=ethereum'

const abi_ARTT = [{"inputs":[{"internalType":"address","name":"account","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint96","name":"votes","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint96","name":"","type":"uint96"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"src","type":"address"},{"internalType":"address","name":"dst","type":"address"},{"internalType":"uint256","name":"rawAmount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const abi_UniPair = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]


const abi_LPReward = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_artd","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_baseRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_hasStart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_initReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_lastStakedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_lpToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_playerLink","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_poolRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_punishTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_stakeLevel","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"seize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"poolRewardRate","type":"uint256"}],"name":"setPoolRewardRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"contractaddr","type":"address"}],"name":"setStakeLevel","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"teamRewardRate","type":"uint256"}],"name":"setTeamRewardRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"punishTime","type":"uint256"}],"name":"setWithDrawPunishTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"affCode","type":"string"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"stakeInfo","outputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"stakeraddr","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"stakerid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"startTime","type":"uint256"}],"name":"startReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawall","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const abi_nftfactory = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"nftId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newId","type":"uint256"}],"name":"reNewNft","type":"event"},{"constant":false,"inputs":[{"internalType":"uint256","name":"ARTTamount","type":"uint256"},{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"AddSkill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"NftId","type":"uint256"}],"name":"Isrenewable","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_allfactorylist","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_anft","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_apwr","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_artd","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_artt","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_burnPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_burnRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_claimdays","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_eraNFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_factorycount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_factorylimit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_fundpool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_lastStoreTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rateBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_relay","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_storestartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_validchecker","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"mynftId","type":"uint256"},{"internalType":"uint256","name":"targetId","type":"uint256"}],"name":"challenge","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"key","type":"uint256"}],"name":"challengeSwitch","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"claimbynum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimbyrelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"currentStore","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId1","type":"uint256"},{"internalType":"uint256","name":"nftId2","type":"uint256"}],"name":"fusion","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getAuthor","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getEra","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getGrade","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getLock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getMeta","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getMeta2","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getPormote","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getPower","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getSkill","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"getcreatedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getfactoryCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"isAllowChallenge","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"lockNft","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"APWRamount","type":"uint256"},{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"raisePower","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"renewAPWR","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"renewAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"renewERA","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"renewLocktime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"NftId","type":"uint256"}],"name":"renewNFT","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"renewPromote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"renewSKILL","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"anft","type":"address"}],"name":"setAnft","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"apwr","type":"address"}],"name":"setApwr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"artd","type":"address"}],"name":"setArtd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"artt","type":"address"}],"name":"setArtt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"fundpool","type":"address"}],"name":"setFundPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newpwrdist","type":"uint256"}],"name":"setMintPower","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"burn_rate","type":"uint256"},{"internalType":"uint256","name":"reward_rate","type":"uint256"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"relay","type":"address"}],"name":"setRelay","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newpwr","type":"uint256"}],"name":"setRelayPower","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"newpwrupg","type":"uint256"}],"name":"setUpgradePower","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"claimdays","type":"uint256"}],"name":"setclaimDays","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"era","type":"uint256"}],"name":"seteraNFT","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"limitamount","type":"uint256"}],"name":"setfactoryLimit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_factorylist","type":"address[]"}],"name":"setlinkFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"ranseed","type":"address"}],"name":"setranseed","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"starttime","type":"uint256"}],"name":"setstoreStart","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"checker","type":"address"}],"name":"setvalidchecker","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"store","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]


const abi_anft = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"_governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_minters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"removeMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeMint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"tokensOfOwner","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]


const abi_NFTReward_B =[{"inputs":[{"internalType":"address","name":"artd","type":"address"},{"internalType":"address","name":"anft","type":"address"},{"internalType":"address","name":"anftFactory","type":"address"},{"internalType":"address","name":"playerBook","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"NFTReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"res","type":"uint256"}],"name":"Result","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"StakedANFT","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"WithdrawnAnft","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"GradePower","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_anftFactory","outputs":[{"internalType":"contract IAnftFactory","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_anftMapIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_anftToken","outputs":[{"internalType":"contract IAnftToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_artd","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_artdBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_baseRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_fixRateBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_hasStart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_initReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_lastStakedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_maxStakedArtd","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_playerAnft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_playerBook","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_poolRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_punishTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_stakeBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_stakeWeightes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_weightBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfPower","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"era","type":"uint256"},{"internalType":"uint256","name":"grade","type":"uint256"},{"internalType":"uint256","name":"promote","type":"uint256"},{"internalType":"uint256","name":"artdAmount","type":"uint256"}],"name":"getFixRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"grade","type":"uint256"},{"internalType":"uint256","name":"quality","type":"uint256"}],"name":"getFixRate_old","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getPlayerIds","outputs":[{"internalType":"uint256[]","name":"anftId","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"getStakeInfo","outputs":[{"internalType":"uint256","name":"stakeRate","type":"uint256"},{"internalType":"uint256","name":"artdAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyMintAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"seize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC721","name":"token","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"seizeErc721","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"setMaxStakedArtd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"poolRewardRate","type":"uint256"}],"name":"setPoolRewardRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"teamRewardRate","type":"uint256"}],"name":"setTeamRewardRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"punishTime","type":"uint256"}],"name":"setWithDrawPunishTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"anftId","type":"uint256"},{"internalType":"string","name":"affCode","type":"string"}],"name":"stakeAnft","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"anftId","type":"uint256"},{"internalType":"string","name":"affCode","type":"string"}],"name":"stakeAnft_byAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"startTime","type":"uint256"}],"name":"startNFTReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalPower","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"withdrawAnft","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"withdrawAnft_byAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const abi_PlayerBook = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"}],"name":"eveAddPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pID","type":"uint256"},{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"affID","type":"uint256"},{"indexed":false,"internalType":"address","name":"affAddr","type":"address"},{"indexed":false,"internalType":"bytes32","name":"affName","type":"bytes32"}],"name":"eveBindRefer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pID","type":"uint256"},{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"eveClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pID","type":"uint256"},{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"bytes32","name":"name","type":"bytes32"}],"name":"eveDefaultPlayer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pID","type":"uint256"},{"indexed":false,"internalType":"address","name":"addr","type":"address"},{"indexed":false,"internalType":"bytes32","name":"name","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"affID","type":"uint256"},{"indexed":false,"internalType":"address","name":"affAddr","type":"address"},{"indexed":false,"internalType":"bytes32","name":"affName","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"balance","type":"uint256"}],"name":"eveNewName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"addr","type":"address"}],"name":"eveRemovePool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"pID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"affID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aff_affID","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"affReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aff_affReward","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"eveSettle","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"_baseRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_defaulRefer","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_dego","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_pID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_pIDxAddr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"_pIDxName","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_plyr","outputs":[{"internalType":"address","name":"addr","type":"address"},{"internalType":"bytes32","name":"name","type":"bytes32"},{"internalType":"uint8","name":"nameCount","type":"uint8"},{"internalType":"uint256","name":"laff","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rreward","type":"uint256"},{"internalType":"uint256","name":"allReward","type":"uint256"},{"internalType":"uint256","name":"lv1Count","type":"uint256"},{"internalType":"uint256","name":"lv2Count","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"_plyrNames","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_pools","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_refer1RewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_refer2RewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_registrationBaseFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_registrationStep","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_stepFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalReferReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalRegisterCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"poolAddr","type":"address"}],"name":"addPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"string","name":"affCode","type":"string"}],"name":"bindRefer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"string","name":"nameStr","type":"string"}],"name":"checkIfNameValid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"getPlayerInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"getPlayerLaffName","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"getPlayerName","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRegistrationFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTotalReferReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"hasRefer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"nameString","type":"string"},{"internalType":"string","name":"affCode","type":"string"}],"name":"registerNameXName","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"poolAddr","type":"address"}],"name":"removePool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"asset","type":"address"}],"name":"seize","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"seizeEth","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"dego","type":"address"}],"name":"setDegoContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"refer1Rate","type":"uint256"},{"internalType":"uint256","name":"refer2Rate","type":"uint256"}],"name":"setReferRewardRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"registrationStep","type":"uint256"}],"name":"setRegistrationStep","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"settleReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const abi_NFTReward = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"NFTReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"anftId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"index","type":"uint256"},{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"NewJoinId","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"ReadyStake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"StakedANft","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"WithdrawnANft","type":"event"},{"constant":true,"inputs":[],"name":"DURATION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"NFTownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"UserRecord","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_anftFactory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_anftMapIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_anftToken","outputs":[{"internalType":"contract IAnftToken","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_artd","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_artdBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_baseRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_fixRateBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_hasRewardStart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_hasStart","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_initReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_lastStakedTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"_playerAnft","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_playerBook","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_poolRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_punishTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_startTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamRewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_weightBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"getNftWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getPlayerIds","outputs":[{"internalType":"uint256[]","name":"anftId","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_nftid","type":"uint256"}],"name":"getStaker","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyMintAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"readyNFTStake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"seize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"anftfactory","type":"address"}],"name":"setNftFactoy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"poolRewardRate","type":"uint256"}],"name":"setPoolRewardRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"teamRewardRate","type":"uint256"}],"name":"setTeamRewardRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"punishTime","type":"uint256"}],"name":"setWithDrawPunishTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"anftId","type":"uint256"},{"internalType":"string","name":"affCode","type":"string"}],"name":"stakeAnft","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stakeCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"number","type":"uint256"}],"name":"stakeInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"startTime","type":"uint256"}],"name":"startNFTReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalWeight","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"anftId","type":"uint256"}],"name":"withdrawAnft","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdrawall","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const abi_ARTD = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"rewardPool","type":"address"}],"name":"eveRewardPool","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"burn_rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward_rate","type":"uint256"}],"name":"eveSetRate","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"_allowances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_burnPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_burnRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_maxGovernValueRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_maxSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_minGovernValueRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_minters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_openTransfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rateBase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalBurnToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalRewardToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_minter","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enableOpenTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_minter","type":"address"}],"name":"removeMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"burn_rate","type":"uint256"},{"internalType":"uint256","name":"reward_rate","type":"uint256"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"rewardPool","type":"address"}],"name":"setRewardPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]


const abi_FundPool = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newfactory","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Approve","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newfactory","type":"address"}],"name":"Newfactory","type":"event"},{"constant":true,"inputs":[],"name":"ARTDaddress","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"factory","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"factory","type":"address"}],"name":"newfactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"nftId","type":"uint256"}],"name":"storeOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"valider","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]

const abi_APWR = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"burner","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"_allowances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_minters","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"addMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"removeMinter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const abi_OpenSwap = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"destAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"ethCost","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"gotTokens","type":"uint256"}],"name":"NewSwap","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"wallet","type":"address"}],"name":"TeamWallet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"_artd","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"}],"name":"_fullWhiteList","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"_stageCondition","outputs":[{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"limitFund","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"maxSwapAmount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"","type":"uint8"},{"internalType":"address","name":"","type":"address"}],"name":"_stageFund","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"_stageSwapAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_whiteListStage4","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_whiteListStage5","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint8","name":"stage","type":"uint8"},{"internalType":"address","name":"user","type":"address"},{"internalType":"bool","name":"openTag","type":"bool"}],"name":"addWhiteList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getStage","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isPauser","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"seizeEth","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint8","name":"stage","type":"uint8"},{"internalType":"uint256","name":"startTime","type":"uint256"}],"name":"setStartTime","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address payable","name":"wallet","type":"address"}],"name":"setTeamWallet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint8","name":"stage","type":"uint8"},{"internalType":"address[]","name":"users","type":"address[]"},{"internalType":"bool","name":"openTag","type":"bool"}],"name":"setWhiteList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint8","name":"stage","type":"uint8"},{"internalType":"uint256","name":"maxSwapAmount","type":"uint256"}],"name":"setmaxSwapAmount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

const abi_NftRelay = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"GovernanceTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"NFTReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"count","type":"uint256"}],"name":"TransferNFT","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"IsClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"MigrateNFT","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_anft","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_apwr","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_burnPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_claimdays","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_claimrate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_governance","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_nextRelayPool","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_nftfactory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_teamWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_token","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimNFTbytokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getclaimRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"hasClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"mintNft","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"nftByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"address","name":"from","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"onERC721Received","outputs":[{"internalType":"bytes4","name":"","type":"bytes4"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"seizeAtoken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"governance","type":"address"}],"name":"setGovernance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newfactory","type":"address"}],"name":"setNftFactory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"claimdays","type":"uint256"}],"name":"setclaimDays","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"claimrate","type":"uint256"}],"name":"setclaimRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newrelaypool","type":"address"}],"name":"setnextRelayPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"setuseToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalAPWR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalNFTs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]



export default  {
  name: 'mainpage',
  components: {
            VueMetamask,
            AnimatedNumber
  },
  beforeMount (){

  	  this.language = navigator.language
	  console.log("language="+this.language)
	  this.$i18n.locale = this.language
	  this.web_default_lang_select()

      //this.net_value = 'rinkeby'
      //this.load_list()
     // this.load_list();
      var self0 = this
      window.ethereum.on('accountsChanged', function (accounts) {
 	 		// Time to reload your interface with accounts[0]!
 	 		console.log("---- Switch Account ----");
 	 		self0.metaMaskAddress = accounts[0]
			self0.default_account = accounts[0]
            //console.log(accounts[0])
            self0.reset_account_init();
            setTimeout(self0.reset_account_init, 4000);

            self0.reload_mynft = true
            //console.log("---- reload get_MyNFT() ----");
            setTimeout( this.get_MyNFT,1500 );
            /*
            if( self0.tabs_active ==0 && self0.mint_active == 1)
            {
            	console.log("---- reload get_MyNFT() ----");
            	self0.get_MyNFT();
            }
            */

	  });
    
  },
  mounted () {
  	 /*
	  setTimeout( this.calc_interest, 12000);
	  setInterval(this.calc_interest, 30000);
	  setTimeout( this.TEST_PROXY,3000 );
	 */
	  setTimeout( this.getStock_in_NftRelay, 2200 );
	  setInterval( this.getStock_in_NftRelay, 30000 );

	  setTimeout( this.getBalance_ARTT,2000);

	  setTimeout( this.checkAllowance_uniPair,1500 );
	  setInterval( this.checkAllowance_uniPair,5000 );

	  setTimeout( this.checkBalance_uniPair,2500 );
	  setInterval( this.checkBalance_uniPair,7000 );

	  setTimeout( this.getEarned_uniReward,2300 );
	  setInterval( this.getEarned_uniReward,15000 );

	  setTimeout( this.getStaked_uniReward,2900 );
	  setInterval( this.getStaked_uniReward,17000 );

	// setTimeout( this.load_cards,2800 );
	 setTimeout( this.check_IsClaimed,2500 );
	 setInterval( this.check_IsClaimed,70000 );

	 setTimeout( this.get_MyNFT,1500 );

	 setInterval( this.genRandom,3000 );

	 setTimeout( this.getEarned_NFTReward,5400 );
	 setTimeout( this.getStaking_NFTReward,5200 );

	 setInterval( this.getEarned_NFTReward,16000 );
	 setInterval( this.getStaking_NFTReward,15000 );
	 setInterval( this.open_MyNFT_direct, 3500 );

	 setTimeout( this.getStage_Fund,3000 );
	 setInterval( this.getStage_Fund, 20000 );

	 this.loading_new_Language();

	 const borrowBalance = ( 47000000000 / Math.pow(10,18)).toFixed(8);
	 var digit = borrowBalance/ Math.pow(10,0);
	 this.test_val = digit.toFixed(8);

	setTimeout( this.getIsRegistered, 2900);
  	setInterval( this.getIsRegistered, 7800);

  	setTimeout( this.get_NftReward_count, 3500);
  	setInterval( this.get_NftReward_count, 60000);

  	setTimeout( this.getEnable_Fund, 4000);
  	setInterval( this.getEnable_Fund, 65000);

  	setTimeout( this.get_NftTotalsupply, 2700);
  	setInterval( this.get_NftTotalsupply, 65000);

  	setTimeout( this.preload_reward_count, 2800);
  	setInterval( this.preload_reward_count, 68000);

  	 this.countdown = ( OPENING_TIME*1000 -  Math.floor(Date.now()) );
  	 this.countdown2 = ( OPENING_TIME2*1000 -  Math.floor(Date.now()) );

  	 setTimeout( this.check_IsClaimed,3000 );
     setTimeout( this.check_IsClaimed_Relay,3300 );
     setInterval( this.check_IsClaimed, 51000);
     setInterval( this.check_IsClaimed_Relay, 52000);

     setInterval( this.getPlayerLinkID, 35000 );

     setTimeout( this.getBalanceRewardPool_ARTD, 3600 );
     setInterval( this.getBalanceRewardPool_ARTD, 91000 );
  },
  watch:{
        web3(){
        	console.log("************** web3() ********************")
		    //this.web3.eth.getAccounts((err, accounts) =>  this.MetaMaskAddress = accounts[0]);
		    /*
		    var self0 = this;
		    this.web3.eth.getBlockNumber( function(error, result){ 
				 			if (error) {
				               console.log(error);
				               return false;
				          } else {
						    self0.MetaMaskAddress = accounts[0]
					    	console.log("************** X ********************")
					    	console.log(accounts)
							}
			});
		    */
        }
  },  
  computed:{

  	    input_stake: {
            get: function() {
            	if( this.stake_value == 0 )
            		return ''
            	else {
                     return this.stake_value
                }
            },
            set: function(newValue) {
                        this.stake_value = newValue;   

            }
        },
        custom_refcode: {
            get: function() {
                    return this.customrefcode_value
            },
            set: function(newValue) { 
                     this.customrefcode_value = newValue;   

            }
        },        



  },
  data () {
      this.metamasklogin_ready=false
      this.ethwallet_ready = false
      this.blockchain_name = ""
      this.metaMaskAddress = ""
      this.link_ready=false
      this.ethprice = 0
      /*
      this.oracleprice_bak = 0
      this.cTokenBalance_bak = 0
      this.borrowBalance_bak = 0
      this.exchangeRate_bak = 0
      this.exchangeRate2_bak = 0
	  */
      this.oracleprice_LIST = [ 0, 0, 0, 0, 0, 0 ]
      this.cTokenBalance_LIST = [ 0, 0, 0, 0, 0, 0 ]
      this.borrowBalance_LIST = [ 0, 0, 0, 0, 0, 0 ]
      this.exchangeRate_LIST = [ 0, 0, 0, 0, 0, 0 ]
      this.exchangeRate2_LIST = [ 0, 0, 0, 0, 0, 0 ]
    
      this.lang_Table  = [ 'en-US','zh-TW'  ]
      this.lang_Table2 = [ 'en-us','zh-tw' ]
      this.lang_Table3 = [ 'en','zh'  ]
      this.lang_items = [ 
                              { title: 'English' },
                              { title: '中文' },                          
                         ]      
      /*
      this.lang_Table  = [ 'en-US','es-ES','fr-FR','zh-TW','zh-CN','ru-RU','ja-JP'  ]
      this.lang_Table2 = [ 'en-us','es-es','fr-fr','zh-tw','zh-cn','ru-ru','ja-jp'  ]
      this.lang_Table3 = [ 'en','es','fr','zh','cn','ru','ja'  ]
      this.lang_items = [ 
                              { title: 'English' },
                              { title: 'Español' },
                              { title: 'Français' },
                              { title: '繁體中文' },
                              { title: '简体中文' }, 
                              { title: 'Русский' }, 
                              { title: '日本語' } 
                           
                         ]
      */
                         
      this.language = ""
      this.lang_str = ""
      this.lang_item_select = 0
      this.langsel = this.lang_items[0]
      
      this.ophash = ''
      this.timeIntev = 0
      this.TxPendingDialog_seen = false
      this.txpending = false


      this.card_main = false
      this.card_newpool = false      
      this.card_pasteaddress = false
      this.erc20_found = false
      this.symbol_found = ""
      this.tabs_active = 0
      this.farming_state = 1
      this.farming_mode = 0
      this.StakeDialog_seen = false
	  this.stake_btn1color = "#33aa44"
	  this.stake_btn2color = "#111111"
	  this.stake_mode = 1
	  this.stake_value = 0
	  this.stakeApprove_pass = false
	  this.stakeNFTApprove_pass = false
	  this.univ2_balance = 0
	  this.univ2_balance_str = "0"
	  this.pool1_earned = 0
	  this.pool1_earned_str = "0"
	  this.pool1_staked = 0
	  this.pool1_staked_str = "0"
	  this.NFTpoolx_earned = [ 0, 0 ]
	  this.NFTpoolx_earned_str = [ "0", "0" ]

	  this.cards_sum = 0
	  this.cards =[]
	  this.mynfts =[]
	  this.mynfts_sum = 0
      this.mint_active = 0
      this.mynft_loading = false
      this.basenft_minted = false
      this.GetrewardDialog_seen = false
      this.UnstakeDialog_seen = false
      this.gallery_active = 0
      this.stakepool_sel = 1
      this.stake_layer = 0
      this.Gallery_template_items = [
		        {
		          color: '#106AAC',
		          src: 'https://i.imgur.com/mEEqoYb.png',
		          title: this.$t('Gallery 1 title'),
		          artist: this.$t('Gallery 1 memo'),
		        },
		        {
		          color: '#708515',
		          src: 'https://i.imgur.com/MxSRCw8.png',
		          title: this.$t('Gallery 2 title'),
		          artist: this.$t('Gallery 2 memo'),
		        }
	        ]
	  this.NFT_template_items= [
		        {
		          color: '#A06146',
		          src: 'https://images.squarespace-cdn.com/content/v1/5a5f82c4d74cff3001807e55/1521955768475-M6C67ADQ3RTV0W352GZT/ke17ZwdGBToddI8pDm48kAf-OpKpNsh_OjjU8JOdDKBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwkCFOLgzJj4yIx-vIIEbyWWRd0QUGL6lY_wBICnBy59Ye9GKQq6_hlXZJyaybXpCc/ringshapes.png',
		          title: this.$t('Mold Artwork'),
		          artist: this.$t('Create Art and Faith'),
		          use1: this.$t('Create'),
		          use2: 'ERA-2 ArtNFT',
		        },
	  		    {
		          color: '#75839E',
		          src: 'https://artem.finance/images/pic01.png',
		          title: this.$t('Collect'),
		          artist: this.$t('Get a taste of ArtNFT'),
		          use1: this.$t('Pay'),
		          use2: 'ARTT',
		        },
	  		    {
		          color: '#82376d',
		          src: 'https://cdn.shopify.com/s/files/1/0264/6605/8287/t/7/assets/description_image_classics_art_deco_lifestyle.png?v=1590504342',
		          title: this.$t('Up of generations'),
		          artist: this.$t('Choice classic or modern'),
		          use1: this.$t('Upgrade'),
		          use2: 'ArtNFT',
		        },
		        {
		          color: '#2D6B6A',
		          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Dual_compound_6-8_max.png/590px-Dual_compound_6-8_max.png',
		          title: this.$t('Complex'),
		          artist: this.$t('Artwork synthesis process'),
		          use1: '',
		          use2: '',
		        },
		        {
		          color: '#616769',
		          src: 'https://www.itmtrading.com/blog/wp-content/uploads/2014/03/0000838_1_gold_coins_type_1_xf.png',
		          title: this.$t('Value-added'),
		          artist: this.$t('Store value in Art'),
		          use1: this.$t('Use'),
		          use2: 'ARTD',
		        },
		        {
		          color: '#AF773F',
		          src: 'https://pngimg.com/uploads/light/light_PNG14437.png',
		          title: this.$t('Strength'),
		          artist: this.$t('Thinking ability'),
		          use1: this.$t('Use'),
		          use2: 'APWR',
		        },
		        {
		          color: '#4E6699',
		          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDYB-txLOkeVLiqseR0ywnew8jDRo3dZ29PQ&usqp=CAU',
		          title: this.$t('Skill'),
		          artist: this.$t('Superb performance'),
		          use1: this.$t('Use'),
		          use2: 'ARTT',
		        },

		   ],     
	  this.PoolgettingReward = 0
	  this.Poolunstake = 0
	  this.lucky_num = 0
	  this.staked_cards =[]
	  this.stakednfts =[]
	  this.FundingDialog_seen = false
	  this.now_genpage = 1
	  this.funding_page = 1
	  this.playername = ''
	  this.laffname = ''
	  this.refcode_value = ''
	  this.ExitStakeDialog_seen = false
	  this.ExitStakeid = 0
	  this.lucky_running = true
	  this.reload_mynft = false
	  this.TxInputdDialog_seen = false
	  this.transferNFT_to = ''
	  this.transferNFT_id = 0
	  this.id_forstake = 0
	  this.id_storeartd = 0
	  this.id_storeapwr = 0
	  this.id_storeskill = 0
	  this.staking_count = 0
	  this.StoreArtdDialog_seen = false
	  this.StoreApwrDialog_seen = false
	  this.storeARTD_num = ''
	  this.storeAPWR_num = ''	  
	  this.spentARTT_num = ''
	  this.spentETH_num = ''
	  this.artdNftFactoryApprove_pass = false
	  this.arttNftFactoryApprove_pass = false
	  this.apwrNftFactoryApprove_pass = false
	  this.artdNftRwApprove_pass = false
	  
	  this.nftrw_stakeCount = 0
	  this.nftrw2_stakeCount = 0
	  this.nftRW_stakeCount = [ 0, 0 ]
	  this.lprw_stakeCount = 0
	  this.lprw2_stakeCount = 0
	  this.lpRW_stakeCount = [ 0, 0 ]
	  
	  this.nftrw_user = []
	  this.nftrw2_user = []
	  this.nftRW_users = [ this.nftrw_user, this.nftrw2_user ]
	  this.lprw_user = []
	  this.lprw2_user = []
	  this.lpRW_users = [ this.lprw_user, this.lprw2_user ]
	  
	  this.nftrw_PartnerDialog_seens = false
	  this.withdrawARTD_id = 0
      this.withdrawARTD_serial = 0	  
	  this.withdrawARTDDialog_seen = false
	  this.withdrawFundApprove_pass = false
	  this.spentArttDialog_seen = false
	  this.fundETHDialog_seen = false
	  this.balance_artd = 0
	  this.balanceRW_artd = [ 0, 0 ]
	  this.balance_apwr = 0
	  this.balance_artt = 0	  
	  this.balance_eth = 0	
	  this.ethbalance_fund = 0
	  this.storeARTD_noenough = false
	  this.storeAPWR_noenough = false
	  this.storeARTT_noenough = false
	  this.storeETH_noenough = false
	  this.fund_stage = 0
	  this.fund_enable = false
	  this.paste_tip = this.$t('Paste target address')
      this.fund_active = 0
      this.isRegisted = false
      this.myRefCode = ''   
      this.rerbuy_Dialog_seen = false
      this.customrefcode_value = ''
      this.codecheck_dialog = false
      this.codecheck_result = false
      this.check_loading = false
      this.leader_tip = this.$t('Leader who I follow')
      this.stakerw_page = 1
      this.stakerw_psize = 10
      this.pagination_len = 1
      this.search_addr = ''
      this.nftTotalSupply = 0
      this.countdown = 0
      this.countdown2 = 0
      this.Relaystock = 0
      this.nftid_reward_weight = 0
      this.IsClaimed_Relay = false
      this.id_playerLink = 0
      this.my_rreward = 0
      this.my_followersCount = 0
      this.my_ToRefername = ''
      this.upgradeNFTDialog_seen = false
      this.yournftFactoryApprove_pass = false
      this.id_upgradenft = 0
      this.claimNftbyArttDialog_seen = false
      this.arttRelayApprove_pass = false

     return {
     	  selection: 0,
     	  
          lang_items:this.lang_items,
          lang_item_select:this.lang_item_select,
          lang_str:this.lang_str,
          langsel:this.langsel,
          usd_interestsum_Year:this.usd_interestsum_Year,
          usd_interestsum_Month:this.usd_interestsum_Month,
          TxPendingDialog_seen:this.TxPendingDialog_seen,
          txpending:this.txpending,

          tabs_active: this.tabs_active,
          farming_state:this.farming_state,
          farming_mode:this.farming_mode,
          StakeDialog_seen:this.StakeDialog_seen,
          stake_btn1color:this.stake_btn1color,
          stake_btn2color:this.stake_btn2color,
          stake_mode:this.stake_mode,
          stakeApprove_pass:this.stakeApprove_pass,
          stakeNFTApprove_pass:this.stakeNFTApprove_pass,
          univ2_balance:this.univ2_balance,
          univ2_balance_str:this.univ2_balance_str,
          stake_value:this.stake_value,
          pool1_earned:this.pool1_earned,
          pool1_earned_str:this.pool1_earned_str,
          pool1_staked:this.pool1_staked,
          pool1_staked_str:this.pool1_staked_str,
          NFTpoolx_earned:this.NFTpoolx_earned,
          NFTpoolx_earned_str:this.NFTpoolx_earned_str,


          cards_sum:this.cards_sum,
          cards:this.cards,
          mynfts:this.mynfts,
          mynfts_sum:this.mynfts_sum,
          NFT_template_items:this.NFT_template_items,
		  roadmaps: [
		        {
		          from: 'Open',
		          message: 'Funding for 🦄 UNISWAP pool of ARTD',
		          time: 'Nov. 2020',
		          color: 'red',
		        },
		        {
		          from: 'Dev',
		          message: 'Add liquidity ARTD-ETH in 🦄 UNISWAP.',
		          time: 'Dec. 2020',
		          color: 'green draken-1',
		        },
		        {
		          from: 'Dev',
		          message: 'Starting ARTD mining, Enable Complex',
		          time: 'Dec. 2020',
		          color: 'green lighten-1',
		        },
		        {
		          from: 'Dev',
		          message: 'Enable APWR value-added functions.',
		          time: 'Dec. 2020',
		          color: 'green lighten-1',
		        },
		        {
		          from: 'Gov',
		          message: 'Vote and donate the super Artist',
		          time: 'Jan. 2021',
		          color: 'green lighten-1',
		        },
		        {
		          from: 'Dev',
		          message: 'Challenge game starting',
		          time: 'Jan. 2021',
		          color: 'green lighten-1',
		        },
		        {
		          from: 'Finance',
		          message: 'Auction for ERA-1 high grade',
		          time: 'Feb. 2021',
		          color: 'green lighten-1',
		        },
		        {
		          from: 'Finance',
		          message: 'Loan ETH by ArtNFT, earn interest',
		          time: 'Mar. 2021',
		          color: 'green lighten-1',
		        },
		    ], 

		  Mold_Gen_URI:"https://imgnft.chainbacon.com/img/nftview/",  
		  
		  Gallery_template_items:this.Gallery_template_items,
		  mint_active:this.mint_active,
		  mynft_loading:this.mynft_loading,
		  basenft_minted:this.basenft_minted,
		  GetrewardDialog_seen:this.GetrewardDialog_seen,
		  UnstakeDialog_seen:this.UnstakeDialog_seen,
		  nft_btn_toggle: 0,
		  gallery_btn_toggle: 0,
		  fund_btn_toggle: 0,
		  gallery_active:this.gallery_active,
          stakepool_sel:this.stakepool_sel,
          stake_layer:this.stake_layer,
          PoolgettingReward:this.PoolgettingReward,
          Poolunstake:this.Poolunstake,
          lucky_num:this.lucky_num,
          staked_cards:this.staked_cards,
          stakednfts:this.stakednfts,
          FundingDialog_seen:this.FundingDialog_seen,
          now_genpage:this.now_genpage,
          funding_page:this.funding_page,
          e1: 1,
          ico_steps: 3,
          thumb_link:"/?t",
          ExitStakeDialog_seen:this.ExitStakeDialog_seen,
          reload_mynft:this.reload_mynft,
          TxInputdDialog_seen:this.TxInputdDialog_seen,
          transferNFT_id:this.transferNFT_id,
          id_forstake:this.id_forstake,
          id_storeartd:this.id_storeartd,
          id_storeapwr:this.id_storeapwr,
          id_storeskill:this.id_storeskill,
          staking_count:this.staking_count,
          StoreArtdDialog_seen:this.StoreArtdDialog_seen,
          StoreApwrDialog_seen:this.StoreApwrDialog_seen,
          artdNftFactoryApprove_pass:this.artdNftFactoryApprove_pass,
          arttNftFactoryApprove_pass:this.arttNftFactoryApprove_pass,
          apwrNftFactoryApprove_pass:this.apwrNftFactoryApprove_pass,
          artdNftRwApprove_pass:this.artdNftRwApprove_pass,      
          withdrawARTD_id:this.withdrawARTD_id,
          withdrawARTD_serial:this.withdrawARTD_serial,
          withdrawARTDDialog_seen:this.withdrawARTDDialog_seen,
          withdrawFundApprove_pass:this.withdrawFundApprove_pass,
          spentArttDialog_seen:this.spentArttDialog_seen,
          spentARTT_num:this.spentARTT_num,
          fundETHDialog_seen:this.fundETHDialog_seen,
          balance_artd:this.balance_artd,
          balanceRW_artd:this.balanceRW_artd,          
          balance_apwr:this.balance_apwr,
          balance_artt:this.balance_artt,
          balance_eth:this.balance_artt,
          rules1: {
          		required: value => { return (this.balance_artd >= this.storeARTD_num) },
          		notify: value => { return "Error" },
          },
          storeARTD_noenough:this.storeARTD_noenough,
          storeAPWR_noenough:this.storeAPWR_noenough,
          storeARTT_noenough:this.storeARTT_noenough,
          storeETH_noenough:this.storeETH_noenough,
          fund_stage:this.fund_stage,
          fund_enable:this.fund_enable,
          ethbalance_fund:this.ethbalance_fund,
          paste_tip:this.paste_tip,
          fund_active:this.fund_active,
          isRegisted:this.isRegisted,
          myRefCode:this.myRefCode,
          rerbuy_Dialog_seen:this.rerbuy_Dialog_seen,
          customrefcode_value:this.customrefcode_value,
          leader_tip:this.leader_tip,
          codecheck_dialog:this.codecheck_dialog,

          nftrw_stakeCount:this.nftrw_stakeCount,
          nftrw2_stakeCount:this.nftrw2_stakeCount,
          nftRW_stakeCount:this.nftRW_stakeCount,
          lprw_stakeCount:this.lprw_stakeCount,
          lprw2_stakeCount:this.lprw2_stakeCount,
          lpRW_stakeCount:this.lpRW_stakeCount,

          nftrw_user:this.nftrw_user,
          nftrw2_user:this.nftrw2_user,
          nftRW_users:this.nftRW_users,
          lprw_user:this.lprw_user,
          lprw2_user:this.lprw2_user,
          lpRW_users:this.lpRW_users,

          nftrw_PartnerDialog_seens:this.nftrw_PartnerDialog_seens,
          stakerw_page:this.stakerw_page,  
          stakerw_psize:this.stakerw_psize,
          pagination_len:this.pagination_len,
          search_addr:this.search_addr,
          nftTotalSupply:this.nftTotalSupply,
          countdown:this.countdown,
          countdown2:this.countdown2,
          Relaystock:this.Relaystock,
          nftid_reward_weight:this.nftid_reward_weight,
          IsClaimed_Relay:this.IsClaimed_Relay,
          id_playerLink:this.id_playerLink,
          my_rreward:this.my_rreward,
          my_followersCount:this.my_followersCount,
          my_ToRefername:this.my_ToRefername,
          upgradeNFTDialog_seen:this.upgradeNFTDialog_seen,
          yournftFactoryApprove_pass:this.yournftFactoryApprove_pass,
          id_upgradenft:this.id_upgradenft,
          UPGRADE_NEW_ERA: 2,
          claimNftbyArttDialog_seen:this.claimNftbyArttDialog_seen,
          arttRelayApprove_pass:this.arttRelayApprove_pass


     } 	
  },
  methods:{ 
  	     formatToPrice(value) {
		      return `${value.toFixed(8)}`;
		 },
  	     formatToPrice16(value) {
		      return `${value.toFixed(18)}`;
		 },
  	     formatToPrice1(value) {
		      return `${value.toFixed(1)}`;
		 },
  	     formatToPrice4(value) {
		      return `${value.toFixed(4)}`;
		 },
  	     formatToPrice3(value) {
		      return `${value.toFixed(3)}`;
		 },
		 reset_account_init(){

		 	  this.mint_active=0;
		 	  this.nft_btn_toggle = 0;
		 	  this.reload_mynft=false;	
		 	  this.my_ToRefername = ''
		 	  setTimeout( this.getNFT_balance,2500 );
		 	  setTimeout( this.check_IsClaimed,2300 );
		 	  setTimeout( this.check_IsClaimed_Relay,2700 );
		 	  setTimeout( this.get_MyNFT,2000 );
		 	  setTimeout( this.getBalance_ARTT, 1000 );
		 	  setTimeout( this.getPlayerLinkID, 3000 );
		 	  /*
		 	  this.supplyBalance_LIST = [ 0 , 0, 0, 0, 0, 0 ]
		 	  this.borrowBalance_LIST = [ 0 , 0, 0, 0, 0, 0 ]
		 	  this.usd_supply_LIST = [ 0 , 0, 0, 0, 0, 0 ]
		 	  this.usd_borrow_LIST= [ 0 , 0, 0, 0, 0, 0 ]
		 	  this.usd_borrow_runadd_LIST= [ 0 , 0, 0, 0, 0, 0 ]

		 	  this.usd_supply_sum = 0
		 	  this.usd_borrow_sum = 0
		 	  this.usd_supply8_sum = 0
 		 	  this.usd_borrow8_sum = 0
		 	  this.borrow_limit_rate_sum = 0
		 	  this.govTokenBalance = 0
		      this.govTokenBalance_str = ""
		      this.govDelta_total = 0
		      this.govDelta_total_str = ""
		      this.usd_interestsum_Year = 0
	          this.usd_interestsum_Month = 0
	          */
		 }, 
         onComplete(data){
          console.log( "data="+data.type )
          console.log(" onComplete()...." )
            
            this.web3 = data.web3;
            this.metaMaskAddress = data.metaMaskAddress;
            this.network_type = data.type;
            this.isTextLoading = true;
            this.ethwallet_ready = true
            this.metamasklogin_ready=true
            switch (data.type) {
                case 'NO_INSTALL_METAMASK':
                       // this.language = navigator.language
                       // this.$i18n.locale = this.language
                        this.network_type= 'The MetaMask or Web wallet not found!' 
                        alert(this.$t("Please install MetaMask, enable it"))
                        this.ethwallet_ready = false
                        this.metamasklogin_ready=false
                        this.link_ready = false
                    return ;
                case 'NO_LOGIN':
                     this.network_type= 'Error:Login your MetaMask or wallet firstly!' 
                     alert(this.$t("Please select an account to connect"))
                     this.ethwallet_ready = true
                     this.metamasklogin_ready = false
                     this.link_ready = false
                     this.metaMaskLogin();
                    return ;
                case 'USER_DENIED_ACCOUNT_AUTHORIZATION':
                     alert(this.$t("Use MetaMask to select an account and connect"))
                     this.blockchain_name = ""
                     this.link_ready = false
                     return ;
                case 'MAINNET':
					 this.blockchain_name = data.type 
                     this.link_ready = true     
                     return ;                
                case 'RINKEBY':
                   this.blockchain_name = data.type
                   this.link_ready = false   
                   return ;     
                case 'ETHEREUM':
                   alert("Switch network to 'Rinkeby' for test")
                   this.blockchain_name = data.type 
                   this.link_ready = true
                   return ; 
            }
        },
        async metaMaskLogin() {
           // console.log("metaMaskLogin");
            try {
              const ethereum = window.ethereum;
              await ethereum.enable().then((account) => {
                  const defaultAccount = account[0]
                  this.default_account = defaultAccount
                  this.metamasklogin_ready=true
                  console.log(defaultAccount);
                })
              } catch (error) {
                  // User denied account access...
                  console.log(error);
                  this.metamasklogin_ready=false
              }
        },
        //---------------------------------------------     
		reload_page(){
                   window.location.reload();
                  // this.getBalance();
        },
        //---------------------------------------------
    	login_by_ETHsign()
    	{   
    		  
    		},
       //---------------------------------------------
       
       //---------------------------------------------
       web_default_lang_select()
   	   {
	        var lang_found = false
	        for( var n in this.lang_Table ){
	          //console.log(" langx1 = "+this.lang_Table[n] )
	              if( this.lang_Table[n] == this.language )
	              {
	                  lang_found = true
	                  this.lang_item_select = n
	                  break
	              }
	        }
	        for( var n in this.lang_Table2 ){
	          //console.log(" langx2 = "+this.lang_Table2[n] )
	              if( this.lang_Table2[n] == this.language )
	              {
	                  lang_found = true
	                  this.lang_item_select = n
	                  break
	              }
	        }
	        for( var n in this.lang_Table3 ){
	          //console.log(" langx3 = "+this.lang_Table3[n] )
	              if( this.lang_Table3[n] == this.language )
	              {
	                  lang_found = true
	                  this.lang_item_select = n
	                  break
	              }
	        }
	        if(lang_found == false) 
	            this.lang_item_select = 0

	        this.lang_str = this.lang_items[this.lang_item_select].title
	        //this.langsel = this.lang_items[this.lang_item_select]
	        console.log( "Default language num = "+ this.lang_item_select )
	        this.lang_select( this.lang_item_select ); 
  	   },
       //---------------------------------------------
  	   lang_select( num ){
            console.log( "Language select = "+num)
            this.lang_item_select = num
            this.language = this.lang_Table[ this.lang_item_select ]
            this.$i18n.locale = this.language
            this.langsel = this.lang_items[num] 
            this.loading_new_Language()
  		},
       //---------------------------------------------
      
       //---------------------------------------------
       check_TxReceipt(){

			if( this.ophash != '')
			{
				 var self0 = this; 
				 web3.eth.getTransactionReceipt( this.ophash, function(err, receipt) {
			         
			        if(!err) {
			             // Send notification to the user receipt
			             if( receipt != null )
			             {
			             	clearInterval(self0.timeIntev)
			             	self0.txpending = false
			             	//console.log(receipt);
			             	var jsonObj = receipt; 
			             	//console.log("* status= "+ jsonObj["status"] );
			             	const status_num = parseInt(jsonObj["status"], 16);
			             	console.log("# status= "+ status_num );
			             	if( status_num == 1 )
			             	{
			             		const txhash = 	jsonObj["transactionHash"]
			             		const LINK_HEAD = "https://etherscan.io/tx/"
			             		console.log("Link = "+ LINK_HEAD + txhash );
			             	}
			             	self0.lucky_running = true
			             	setTimeout(() => {  self0.get_MyNFT(); }, 3000 );

			             	self0.StoreArtdDialog_seen = false
			             	setTimeout(() => {  self0.checkNFTapproved(); }, 2500 ); // NFTReward-1
			             	setTimeout(() => {  self0.checkAllowance_Artd_NftFactory(); }, 2600 );
			             	setTimeout(() => {  self0.checkAllowance_your_NftFactory(); }, 2700 );
			             	

			             	self0.withdrawARTDDialog_seen = false;
			             	
							setTimeout(() => {  self0.checkAllowance_Artd_nftReward(); }, 3200 );
							setTimeout(() => {  self0.checkAllowance_Fundpool(); }, 5500 );
							setTimeout(() => {  self0.check_IsClaimed(); }, 3100 );
							setTimeout(() => {  self0.check_IsClaimed_Relay(); }, 3500 );
							setTimeout(() => {  self0.checkAllowance_Artt_NftFactory(); }, 3400 );
							setTimeout(() => {  self0.checkAllowance_Apwr_NftFactory; }, 3600 );
							setTimeout(() => {  self0.checkAllowance_uniPair(); }, 3100 );
							setTimeout(() => {  self0.getStaked_uniReward(); }, 3300 );
							setTimeout(() => {  self0.checkAllowance_Artt_Relay(); }, 3700 );
							
			             }
			        }
			     })
			}

       },
       //---------------------------------------------
       open_etherscan(){

       		const LINK_HEAD = "https://etherscan.io/tx/"
       		const link = LINK_HEAD + this.ophash
       		window.open( link, '_blank');
       },
       //---------------------------------------------
       createNewPool(){
       		    this.card_main = false
		        this.card_newpool = true
		        this.card_pasteaddress = false
       },
       //---------------------------------------------
       pasteNewAddress(){
       		    this.card_main=false
		        this.card_newpool=false
		        this.card_pasteaddress = true
       },
       //--------------------------------------------- 
       pasteaddr(){
       			console.log("Addr="+this.addr_input)
       			 const address = this.addr_input
				 var myContract =  web3.eth.contract(abi_ERC20_BAK);
	             var myInstance = myContract.at(address);

			     var self0 = this;        
			     myInstance.symbol(  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				          	    self0.erc20_found = true
				          	    self0.symbol_found = result
				          		console.log("Symbol="+result);
				          }
				})          
       },
	   reopen( value ){
	   		//console.log("reopen="+value);
			this.tabs_active = value-1
			if( value == 1){
				this.nft_btn_toggle = 0
				this.open_MintNFT();
			}   
			else if( value == 3){
				this.open_ListGallery();
			} 
			else if( value == 4){
				this.getETHbalance_Fund();
			}
	   },    
       go_uniswap( token_name ){
       	    if( token_name == 'artt')
       	    {
       			const LINK_HEAD = "https://info.uniswap.org/token/0x77df79539083dcd4a8898dba296d899afef20067"
       			window.open( LINK_HEAD, '_blank');
       		}
       		else if( token_name == 'apwr')
       	    {
       			//const LINK_HEAD = "https://info.uniswap.org/pair/0xa7db6b6b38224aedbae425e1d3d5948aa2df08b6"
       			const LINK_HEAD = "https://info.uniswap.org/token/0xb60f072494c7f1b5a8ba46bc735c71a83d940d1a"
       			window.open( LINK_HEAD, '_blank');
       		}
       },
       go_artem_app(){
       		const LINK_HEAD = "https://app.artem.finance"
       		window.open( LINK_HEAD, '_blank');
       },
       uniswap_page(){
       		this.farming_state = 0
       },
       farming_page(){
       		this.farming_state = 1
       },
       select_farming_mode(value){
       		this.farming_mode = value
       },
       Pool_tool_click(value){
       		this.StakeDialog_seen = true
       		console.log("Pool= "+value);
       },
       stakeMode(value){
       		this.stake_mode = value
       		if(this.stake_mode == 1 ){ 
       			this.stake_btn1color = "#33aa44"
       			this.stake_btn2color = "#111111"
       		}
       		else if(this.stake_mode == 2 ){ 
       			this.stake_btn1color = "#111111"
       			this.stake_btn2color = "#33aa44"
       		}
       },
	   Stake_inputmax(){
	   	        //console.log("-------------------");
				//console.log("UNI-V2 balance="+this.univ2_balance);
	   			//this.input_stake = this.univ2_balance.toFixed(8)
	   			this.input_stake = Math.floor(this.univ2_balance * 100000000) / 100000000
	   },       
       //---------------------------------------------
        checkAllowance_uniPair(){   //查詢 UniSwap pair, 目前帳戶是否已有 Approve 給 UniswapReward合約　

        		 var myContract =  web3.eth.contract(abi_UniPair);
		         const myInstance = myContract.at( contract_UniPair_1);
			     var self0 = this;          
			     myInstance.allowance( this.metaMaskAddress, contract_LPAPWRReward, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             //console.log("UNISWAP pair allowance="+allow);
				             if( allow == 0 ){
				             	self0.stakeApprove_pass = false
				             }
				             else{
				             	self0.stakeApprove_pass = true
				             }
				         }
				  })       

       },
       //---------------------------------------------
        checkBalance_uniPair(){   //查詢 UniSwap pair, 目前帳戶有多少餘額　

        		 var myContract =  web3.eth.contract(abi_UniPair);
		         const myInstance = myContract.at( contract_UniPair_1 );
			     var self0 = this;          
			     myInstance.balanceOf( this.metaMaskAddress, function (error, balance) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             //console.log("UNI-V2 balance="+balance);
				             self0.univ2_balance = balance /Math.pow(10,18)
				             self0.univ2_balance_str = self0.univ2_balance.toFixed(8)
				         }
				  })       

       },       
       //---------------------------------------------        	
       enableApprove_uniReward(){  // 讓目前帳戶通過 uniswapReward 的 Approve

		         
		         var myContract =  web3.eth.contract(abi_UniPair);
		         const myInstance = myContract.at( contract_UniPair_1 );

			     var self0 = this;          
				 myInstance.approve( contract_LPAPWRReward, 0xfffffffffffffffffffffff, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
        },       
       //---------------------------------------------        	
       getEarned_uniReward(){  // 查詢 目前帳戶在 uniswapReward 挖到(earned)的數量
		       	 var myContract =  web3.eth.contract(abi_LPReward);
		         const myInstance = myContract.at(contract_LPAPWRReward);
			     var self0 = this;          
			     myInstance.earned( this.metaMaskAddress, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else {
				             //console.log("earned result="+result); 
				             self0.pool1_earned =  result/Math.pow(10,18)
				             self0.pool1_earned_str = self0.pool1_earned.toFixed(8)
				          }
			      });   
        },
       //---------------------------------------------        	
       getStaked_uniReward(){  // 查詢 目前帳戶在 uniswapReward 之前存入(staked)的數量
		       	 var myContract =  web3.eth.contract(abi_LPReward);
		         const myInstance = myContract.at(contract_LPAPWRReward);
			     var self0 = this;          
			     myInstance.balanceOf( this.metaMaskAddress, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             self0.pool1_staked =  result/Math.pow(10,18)
				             //self0.pool1_staked_str = self0.pool1_staked.toFixed(4)
				             self0.pool1_staked_str = Math.floor(self0.pool1_staked * 10000) / 10000
				          }
			      });   
        },
       //---------------------------------------------	
       exec_stake(){
       			 
       			 var myContract;
       			 myContract =  web3.eth.contract( abi_LPReward );		
		         const myInstance = myContract.at( contract_LPAPWRReward );
			     //console.log(" stake -->"+this.stake_value );
			     var self0 = this;  
			         
      			 const amount = this.stake_value * Math.pow(10,18)
				 myInstance.stake( amount, 0x0, function (error, result) {
			          if (error) {
			               console.log(error);
			               return false;
			          } else {
			             //console.log("Pool-1 stake="+result);
			             self0.StakeDialog_seen = false

			             self0.TxPendingDialog_seen = true
			             self0.ophash = result	
			             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
			             self0.txpending = true
						          
			          }
		          })
				      
		},
		//======================================================     
     	OnTimesFun(timesData) {
                  //var dateBegin = new Date(timesData.replace(/-/g, "/"));//new Date
                  var dateEnd = new Date();
                  //var dateDiff = dateEnd.getTime() - dateBegin.getTime();
                  var dateDiff = dateEnd.getTime() - timesData*1000
                  var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                  var leave1 = dateDiff % (24 * 3600 * 1000)    
                  var hours = Math.floor(leave1 / (3600 * 1000))
                  var leave2 = leave1 % (3600 * 1000)   
                  var minutes = Math.floor(leave2 / (60 * 1000))
                  var leave3 = leave2 % (60 * 1000)      
                  var seconds = Math.round(leave3 / 1000);
                  var timesString = '';
                  if (dayDiff != 0) {
                      timesString = dayDiff + 'd ago';
                  } else if (dayDiff == 0 && hours != 0) {
                      timesString = hours + 'h ago';
                  } else if (dayDiff == 0 && hours == 0) {
                      timesString = minutes + 'm ago';
                  }
                  return timesString
    	},				      
 		//======================================================
 		/*
     	load_cards(){

	          axios.get( _GETTOPIC ).then(response => {

	          let sum = response.data.length
	          var issuer;
	          var j;
	          var image;
	          var datatime;
	          var agostring;
	          var catalog;
	          var subject;

	          for( var i in response.data){
	            j = sum-1-i

	            let status = response.data[j].status

	                   datatime = response.data[j].time
	                   agostring = this.OnTimesFun(datatime)

	                   issuer = response.data[j].issuer
	         
	                   image = response.data[j].image


	                    catalog = response.data[j].catalog

	                      this.cards.push({
	                        link: response.data[j].source,
	                        title: response.data[j].subject,
	                        issuer: issuer,
	                        src: image,
	                        ago:agostring,
	                        snap_type:catalog,
	                        contract_id:response.data[j].tid,
	                      });
	                      this.cards_sum = this.cards_sum + 1;
	             } // for

	             console.log(this.cards)
	           }); //axios.get(

     	},
     	*/
       //---------------------------------------------
        getStock_in_NftRelay(){

       			 var myContract;
       			 myContract =  web3.eth.contract( abi_NftRelay );		
		         const myInstance = myContract.at( contract_NftRelay );
			     var self0 = this;  
				 myInstance.totalNFTs(  function (error, result) {
			          if (error) {
			               console.log(error);
			               return false;
			          } else {
			          	  self0.Relaystock = result;
			          	 // console.log("Relaystock="+self0.Relaystock);
			          }
		          })

       },
       //---------------------------------------------
        NFT_Relaycollect(){

       			 this.lucky_running = false
       			 var myContract;
       			 myContract =  web3.eth.contract( abi_NftRelay );		
		         const myInstance = myContract.at( contract_NftRelay );
			     var self0 = this;  
				 myInstance.claim(  function (error, result) {
			          if (error) {
			               console.log(error);
			               return false;
			          } else {
			            		 //console.log("claim result="+result);
			             		 self0.TxPendingDialog_seen = true
							     self0.ophash = result	
							     self0.timeIntev = setInterval( self0.check_TxReceipt, 4000 );  	
							     self0.txpending = true
			          }
		          })

       },
       NFT_FactoryClaim(){

       			 this.lucky_running = false
       			 var myContract;
       			 myContract =  web3.eth.contract( abi_nftfactory );		
		         const myInstance = myContract.at( contract_nftfactory );
			     var self0 = this;  
				 myInstance.claimbynum( this.lucky_num, function (error, result) {
			          if (error) {
			               console.log(error);
			               return false;
			          } else {
			            		// console.log("claimbynum result="+result);
			             		 self0.TxPendingDialog_seen = true
							     self0.ophash = result	
							     self0.timeIntev = setInterval( self0.check_TxReceipt, 4000 );  	
							     self0.txpending = true
			          }
		          })

       },
       //---------------------------------------------            
       check_IsClaimed(){    // 檢查 Factory 合約, 是否已經有領取過
		         var myContract =  web3.eth.contract(abi_nftfactory);
		         const myInstance = myContract.at( contract_nftfactory );
			     var self0 = this;         
				 myInstance.hasClaimed( this.metaMaskAddress,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				          	  //console.log("hasClaimed ="+result);
				          	   self0.basenft_minted = result;
				          }
			      });   
        }, 
       //---------------------------------------------            
       check_IsClaimed_Relay(){    // 檢查 NFT-Relay 合約, 是否已經有領取過
		         var myContract =  web3.eth.contract(abi_NftRelay);
		         const myInstance = myContract.at( contract_NftRelay );
			     var self0 = this;       
				 myInstance.IsClaimed( this.metaMaskAddress,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				          	  // console.log("IsClaimed_Relay="+result);
				          	   self0.IsClaimed_Relay = result;
				          }
			      });   
        }, 
       //---------------------------------------------
       get_MyNFT(){

       	        this.mynfts = []
       	        this.mynfts_sum = 0
       	        this.cards = []
       		    this.cards_sum = 0

       			var myContract;
       			myContract =  web3.eth.contract( abi_anft );		
		        const myInstance = myContract.at( contract_ANFT );
			    var self0 = this;  
				myInstance.tokensOfOwner( this.metaMaskAddress, function (error, resarray) {
			          if (error) {
			               console.log(error);
			               return false;
			          } else {
			             //self0.mynfts_sum = resarray.length
			             	
			             for( var j in resarray)
				         {
				         	    self0.mynfts_sum = self0.mynfts_sum + 1; 
				         		var self1 = self0;
				         		var id = resarray[j]
				         		//self0.nft_id = resarray[j]
				         		self0.basenft_minted = true
				         		console.log( j+": * MY_NFT="+resarray[j])
				         		setTimeout(() => {
								    myInstance.tokenURI( resarray[j], function (error, httplink) {
								          if (error) {
								               console.log(error);
								               return false;
								          } else {
								          	       var num = self1.mynfts.length
     
								          	       if( resarray[num] )
								          	       {
								          	       	    console.log(num+" # MY_NFT="+resarray[num])
									             		var Obj1 = {
										              	    sid: num,
									                        id: resarray[num],
									                        link: httplink,
									                        image: ''
								                        };
									             		self1.mynfts.push(Obj1);
									             		
								             		}	
								          }
						          	})
								}, j*1000 );
				         }
				         //console.log("MY_NFT="+self1.mynfts)	
				         
			          }
		         })
       },
       //---------------------------------------------
       open_MyNFT_internal(){

       				 this.cards = []
	       		     this.cards_sum = 0
       			     var myContract;
	       			 myContract =  web3.eth.contract( abi_nftfactory );		
			         const myInstance = myContract.at( contract_nftfactory );

			        //onsole.log("MY_NFT="+this.mynfts)

			        var jj = 0;
	       		    for(var j in this.mynfts){

	       		    	 //console.log( j+"->mynfts_ID="+this.mynfts[j].id) 	
	       			     var self0 = this;
	       			     setTimeout(() => {

	       			     		 //console.log( jj+" :mynfts_ID="+this.mynfts[jj].id)  
							     myInstance.getMeta( this.mynfts[jj].id, function (error, resarray) {

							     		if (error) {
										          console.log(error);
										               return false;
										} else {
											    /*
							             		console.log("Array 0="+resarray[0])	
							             		console.log("Array 1="+resarray[1])
							             		console.log("Array 2="+resarray[2])						             	
							             		console.log("Array 3="+resarray[3])	
							             		console.log("Array 4="+resarray[4])
							             		console.log("Array 5="+resarray[5])	
							             		console.log("Array 6="+resarray[6])	
												*/
												self0.reload_mynft = false
												var num = self0.cards.length;
												if( self0.mynfts[num] )
												{
													//console.log( " num= "+num);
													var _id = self0.mynfts[num].id;
													var g2 = parseInt(resarray[1]);
													var image_pos = (resarray[0]-1)*10+g2;
													var obj = {
														    serial:num,
								             			    id: _id,
									                        link: "",
									                        nftname: self0.get_NFT_name(resarray[1]),
									                        issuer: 0,
									                        src: 'https://imgnft.chainbacon.com/img/nftview/'+image_pos,
									                        era: parseInt(resarray[0]),
									                        grade: resarray[1],
									                        promote:  resarray[2],
									                        artdamount: resarray[3]/Math.pow(10,18),
									                        apwramount: resarray[4]/Math.pow(10,18),
									                        skill:resarray[5],
									                        contract_id:"",
								                    	};

								             		self0.cards.push(obj);
				                      		
				                      			//console.log( num+" :cards[].id="+self0.mynfts[num].id);
				                      		 	// console.log( num+" :cards[].id="+self0.cards[num].id);

								                   self0.cards_sum = self0.cards_sum + 1;
								                   setTimeout(() => {  self0.mynft_loading = false; }, 3000 );
								                }
										}
							     })
							     
							     jj = jj + 1;

						  }, 2500*j );
						  
	       			}

       },       
       //---------------------------------------------
       open_MyNFT_direct(){

       		if( this.reload_mynft )
       		{
	       		this.mynft_loading = true
	       		this.mint_active = 1
	       		this.cards_sum = 0
	       		this.open_MyNFT_internal()
       		}

       },
	   //---------------------------------------------
       open_Grade(){

       		this.mint_active = 2
       },       
	   //---------------------------------------------
       get_NFT_name ( grade )
       {
       		if( grade == 1) return "Genesis"
       		else if( grade == 2) return "Slient"
       		else if( grade == 3) return "Boggle"
       		else if( grade == 4) return "SkyRipple"	
       		else if( grade == 5) return "Gesture"
       		else if( grade == 6) return "Thinker"	
       },
       //---------------------------------------------
       open_MyNFT_API(){

       		this.mynft_loading = true
       		this.mint_active = 1
       		this.cards = []
       		for(var j in this.mynfts){

       			    //console.log("mynfts_link="+this.mynfts[j].link)
       				axios.get( this.mynfts[j].link ).then(response => {
       					var j;
				        let sum = response.data.length
				        
				        //console.log("nft_resp_status="+response.data.status)
				        //console.log("nft_resp_image="+response.data.result.data.big_image)

				        this.cards.push({
				        	    id:0,
		                        link: "",
		                        title: '',
		                        issuer: 0,
		                        src: response.data.result.data.big_image,
		                        grade: 0,
		                        quality: 0,
		                        amount: 0,
		                        contract_id:"",
	                      	});
	                      	
	                   this.cards_sum = this.cards_sum + 1;
	                   setTimeout(() => {  this.mynft_loading = false; }, 3000 );

	          		})	

       		}


       },
       //---------------------------------------------
       open_MintNFT(){
       	
       		this.mint_active = 0
       		this.getNFT_balance();
       	},
       //---------------------------------------------
       open_ListGallery(){
       	
       		this.gallery_active = 0
       	},
       //---------------------------------------------        	
       getNFT_balance(){  // 查詢 目前帳戶的NFT存量
       			 var myContract;
       			 myContract =  web3.eth.contract( abi_anft );		
		         const myInstance = myContract.at( contract_ANFT );
			     var self0 = this;          
			     myInstance.balanceOf( this.metaMaskAddress, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				          	 if( result != 0)
				          	 {
				          	 	self0.basenft_minted = true
				          	 }
				          	 else{
				          	 	self0.basenft_minted = false
				          	 } 
				          }
			      });   
        },
       //---------------------------------------------	
       Getreward_page( pool ){

       			this.PoolgettingReward = pool
       			this.GetrewardDialog_seen = true
       },
       //---------------------------------------------
       ExitStake_submit(){  // 退出stake,不取回收益

       			var myContract;
	       		myContract =  web3.eth.contract( abi_NFTReward );		
			    if( this.stakepool_sel == 1){
		        	var myInstance = myContract.at(contract_NFTReward);
		    	}
		    	else if( this.stakepool_sel == 2){
		        	var myInstance = myContract.at(contract_NFTReward2);
		    	}
				var self0 = this;          
				myInstance.withdrawall(  function (error, result) {
					          if (error) {
					               console.log(error);
					               return false;
					          } else { 
					          	 if( result != 0)
					          	 {
					          	 	     self0.taking_count = 0
					          	 		 self0.ExitStakeDialog_seen = false
							             self0.TxPendingDialog_seen = true
							             self0.ophash = result	
							             self0.timeIntev = setInterval( self0.check_TxReceipt, 4000 );  	
							             self0.txpending = true

							             self0.getEarned_NFTReward()
					          	 } 
					          }
				});   

		},
       //---------------------------------------------
       ExitLPStake_submit(){  // 退出 LP stake,不取回收益

       			var myContract;
	       		myContract =  web3.eth.contract( abi_LPReward );		
			    const myInstance = myContract.at( contract_LPAPWRReward );
				var self0 = this;          
				myInstance.withdrawall(  function (error, result) {
					          if (error) {
					               console.log(error);
					               return false;
					          } else { 
					          	 if( result != 0)
					          	 {
							             self0.TxPendingDialog_seen = true
							             self0.ophash = result	
							             self0.timeIntev = setInterval( self0.check_TxReceipt, 4000 );  	
							             self0.txpending = true
					          	 } 
					          }
				});   

		},							        
       //---------------------------------------------
		getReward_submit(){  // 將收益取回到錢包

       			var myContract;
       			if( this.PoolgettingReward < 200 )  // 101, 102 是 LP 礦池的收益
       			{
	       			 myContract =  web3.eth.contract( abi_LPReward );		
			         const myInstance = myContract.at( contract_UniswapReward );
				     var self0 = this;          
				     myInstance.getReward( function (error, result) {
					          if (error) {
					               console.log(error);
					               return false;
					          } else { 
					          	 if( result != 0)
					          	 {
					          	 		 self0.GetrewardDialog_seen = false
							             self0.TxPendingDialog_seen = true
							             self0.ophash = result	
							             self0.timeIntev = setInterval( self0.check_TxReceipt, 4000 );  	
							             self0.txpending = true
					          	 } 
					          }
				      });   
				}
				else if( this.PoolgettingReward < 300 )  // 201, 202 是 ARTD 礦池的收益
       			{
	       			 myContract =  web3.eth.contract( abi_NFTReward );		
			         if( this.stakepool_sel == 1){
			        	var myInstance = myContract.at(contract_NFTReward);
			    	 }
			    	 else if( this.stakepool_sel == 2){
			        	var myInstance = myContract.at(contract_NFTReward2);
			    	 }
				     var self0 = this;          
				     myInstance.getReward( function (error, result) {
					          if (error) {
					               console.log(error);
					               return false;
					          } else { 
					          	 if( result != 0)
					          	 {
					          	 		 self0.GetrewardDialog_seen = false
							             self0.TxPendingDialog_seen = true
							             self0.ophash = result	
							             self0.timeIntev = setInterval( self0.check_TxReceipt, 4000 );  	
							             self0.txpending = true
					          	 } 
					          }
				      });   
				}
        },
       //---------------------------------------------
       Metamask_add_token( name ){ 

       		var tokenAddr = ''
       		var tokenSymbol = ''
       		var tokenDecimals = 18
       		var tokenImage = ''
       		if ( name == "ARTD")
       		{
				tokenAddr = contract_ARTD;
				tokenSymbol = 'ARTD';
				tokenDecimals = 18;
				tokenImage = 'https://imgur.com/1kuyyFy.png';
		    }
		    else if( name == "ARTT_ETH")
		    {
				tokenAddr = contract_UniPair_1;
				tokenSymbol = 'UNI_V2';
				tokenDecimals = 18;
				tokenImage = 'https://i.imgur.com/bxqLVsp.png';
		    }
		    else if( name == "APWR_ETH")
		    {
				tokenAddr = contract_UniPair_1;
				tokenSymbol = 'UNI_V2';
				tokenDecimals = 18;
				tokenImage = 'https://i.imgur.com/bxqLVsp.png';
		    }
		    else if( name == "ARTNFT")
		    {
				tokenAddr = contract_ANFT;
				tokenSymbol = 'ANFT';
				tokenDecimals = 0;
				tokenImage = 'https://imgur.com/L94xoE6.png';
		    }
		    else if( name == "ArtPower")
		    {
				tokenAddr = contract_APWR;
				tokenSymbol = 'APWR';
				tokenDecimals = 18;
				tokenImage = 'https://imgur.com/doKtYoq.png';
		    }
		    else if( name == "ARTT")
		    {
				tokenAddr = contract_ARTT;
				tokenSymbol = 'ARTT';
				tokenDecimals = 18;
				tokenImage = 'https://i.imgur.com/bxqLVsp.png';
		    }
			try {
			  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
			    const wasAdded =  window.ethereum.request({
			    method: 'wallet_watchAsset',
			    params: {
			      type: 'ERC20', // Initially only supports ERC20, but eventually more!
			      options: {
			        address: tokenAddr, // The address that the token is at.
			        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
			        decimals: tokenDecimals, // The number of decimals in the token
			        image: tokenImage, // A string url of the token logo
			      },
			    },
			  });

			  if (wasAdded) {
			  	console.log( 'ARTD ICON added!' );
			   // console.log('Thanks for your interest!');
			  } else {
			    console.log('Your loss!');
			  }
			} catch (error) {
			  console.log(error);
			}
       },
       //---------------------------------------------
       open_stack_result( ){

       		this.gallery_active = 1
       		this.NFTpoolx_earned = [ 0, 0 ]
       		this.NFTpoolx_earned_str = [ "0" , "0" ]       		

       		this.gen_NFTstaked_ids();
       		this.getEarned_NFTReward();
       		this.getPlayerLinkID();
       },
       //---------------------------------------------
       open_challenge( ){

       		this.gallery_active = 2
       	},
       //---------------------------------------------
       stakepoolSelect( sel_val ){

       		this.stake_layer = 1
       		this.stakepool_sel = sel_val+1
       		
       		this.reload_mynft=true
       		this.id_forstake = 0

	       	this.checkNFTapproved() // NFTReward-1
	       	this.open_MyNFT_direct()
	       	this.gen_NFTstaked_ids()

	       	setTimeout(() => {  this.get_NftWeight( this.cards[0].id) }, 2000 );
    		
       },
       //---------------------------------------------
       stakeIDSelect(){
       		this.id_forstake = this.id_forstake + 1
       		if( (this.id_forstake) == this.cards_sum )
       			this.id_forstake = 0;

       		this.checkNFTapproved();  // NFTReward-1
       		this.get_NftWeight( this.cards[this.id_forstake].id)
       		//console.log( '** id_forstake='+this.id_forstake );
       },
       //---------------------------------------------
       storeARTD_IDSelect(){
       		this.id_storeartd = this.id_storeartd + 1
       		if( (this.id_storeartd) == this.cards_sum )
       			this.id_storeartd = 0;
       		//console.log( '** id_storeartd='+this.id_storeartd );
       },
       //---------------------------------------------
       upgradeNFT_IDSelect(){
       		this.id_upgradenft = this.id_upgradenft + 1
       		if( (this.id_upgradenft) == this.cards_sum )
       			this.id_upgradenft = 0;

       		this.checkAllowance_your_NftFactory();
       },
       //---------------------------------------------
       getGalleysrc(sel){
       	    
       	   // console.log( " Galley SRC = "+this.Gallery_template_items[sel].src)

       		return this.Gallery_template_items[sel].src
       },
        //---------------------------------------------
        hex2a(hex) {
		    var str = '';
		    for (var i = 0; i < hex.length; i += 2) {
		        var v = parseInt(hex.substr(i, 2), 16);
		        if (v) str += String.fromCharCode(v);
		    }
		    return str;
		},       
       //---------------------------------------------
        checkNFTapproved(){   //查詢 ARTNFT, 目前帳戶是否已有 Approve 給 NFTReward-1 or 2 合約　

        	if( this.mynfts.length > 0)
        	{
        		 var contract_NFTRW_target = ''
        		 if( this.stakepool_sel == 1)
        		 {
        		 	contract_NFTRW_target = contract_NFTReward.toLowerCase();
        		 }
        		 else if( this.stakepool_sel == 2)
        		 {
        		 	contract_NFTRW_target = contract_NFTReward2.toLowerCase();
        		 }
        		 var myContract =  web3.eth.contract(abi_anft);
		         const myInstance = myContract.at( contract_ANFT);
			     var self0 = this;          
			     
			     myInstance.getApproved(this.mynfts[this.id_forstake].id, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             //console.log("NFTapproved="+allow);
				             if( allow == 0 ){
				             	self0.stakeNFTApprove_pass = false

				             }
				             else
				             {
				             	if( allow == contract_NFTRW_target )
				             	{
				             	    self0.stakeNFTApprove_pass = true
				             	    //console.log("OK! Approved done.");
				             	}
				             	else
				             	{
					             	self0.stakeNFTApprove_pass = false
					             	//console.log("Must Re-Approve");
					             	//console.log("allow="+allow);
					             	//console.log("contract="+contract_NFTReward.toLowerCase() );
					             }
				             }
				         }
				 })   
			}

			var myContract2;
       		myContract2 =  web3.eth.contract( abi_PlayerBook );		
		    const myInstance2 = myContract2.at( contract_PlayerBook );
			var self1 = this; 
			myInstance2.getPlayerName( this.metaMaskAddress, function (error2, namebyte32) {
			          if (error2) {
			               console.log(error2);
			               return false;
			          } else {
			          		
			          		const nameb32 = namebyte32;
			          		if( nameb32 != 0)
				            {
				            	var myname = self1.hex2a(nameb32)
				             	self1.playername = myname;
				             	//console.log( 'Name='+myname );	

				            }
				            else{
				            	self1.playername = ''
			          			console.log("No Player name");
				            }
			          }
			})	

			var self2 = this;
			myInstance2.getPlayerLaffName( this.metaMaskAddress, function (error2, namebyte32) {
			          if (error2) {
			               console.log(error2);
			               return false;
			          } else {
			          		
			          		const nameb32 = namebyte32;
			          		if( nameb32 != 0)
				            {
				            	var myname = self2.hex2a(nameb32)
				             	self2.laffname = myname;
				             	//console.log( 'Affiliate='+myname );	

				            }
				            else{
				            	self2.laffname = ''
			          			//console.log("No LAff name");
				            }
			          }
			})	 
       },
       //---------------------------------------------
       getPlayerLinkID(){      // 更新 PlayerLink 的跟隨者
       		var myContract;
       		myContract =  web3.eth.contract( abi_PlayerBook );		
		    const myInstance = myContract.at( contract_PlayerBook );
			var self0 = this; 

			myInstance._pIDxAddr( this.metaMaskAddress, function (error2, myid) {
			          if (error2) {
			               console.log(error2);
			               return false;
			          } else {

			          		 self0.id_playerLink = myid;
			          		 self0.my_rreward = 0
      						 self0.my_followersCount = 0
      						 self0.laffname = ''
      						 self0.my_ToRefername = ''
			          		 //console.log( 'id_playerLink='+self0.id_playerLink );

			          		 if( self0.id_playerLink >= 1 ){

			          		 		    var self1 = self0; 
			          		 			myInstance._plyr( self0.id_playerLink, function (error3, resarray) {
										          if (error3) {
										               console.log(error3);
										               return false;
										          } else {
										          		 self1.my_rreward = resarray[5]/Math.pow(10,18);
										          		 self1.my_followersCount = resarray[7];
										          		 //console.log( 'my_followersCount='+self1.my_followersCount );
										          		 const nameb32 = resarray[1];
											          	 if( nameb32 != 0)
												         {
												            	var myname = self1.hex2a(nameb32)
												             	self1.laffname = myname;
												             	//console.log( 'Affiliate='+myname );	
												         }
												         else{
												            	self1.laffname = ''
												         }

												         var refto = resarray[3];  //laff
												         if( refto > 1 )  // User link to Special Player (not default)
												         {
												         		var self2 = self1; 
									          		 			myInstance._plyr( refto, function (error4, arry_x){
																          if (error4) {
																               console.log(error4);
																               return false;
																          } else {
																	          	 const nameb32x = arry_x[1];
																	          	 if( nameb32x != 0)
																		         {
																		             	self1.my_ToRefername = self2.hex2a(nameb32x)
																		             	//console.log( 'ToRefername='+self1.my_ToRefername );	
																		         }
																          }
																});	          	

												         }

											       }
										});	 
			          		 }

				      }
			});	 




       },
       //---------------------------------------------
       enableApprove_NFTReward(){  // 讓目前帳戶有的 Token ID 通過 Approve

       			console.log("enable NFT_reward="+this.mynfts[this.id_forstake].id);
 				console.log("stakepool_sel="+this.stakepool_sel);
		         var myContract =  web3.eth.contract(abi_anft);
		         const myInstance = myContract.at( contract_ANFT );
        		 if( this.stakepool_sel == 1){
		        	var contract_nft_Reward = contract_NFTReward;
		    	 }
		    	 else if( this.stakepool_sel == 2){
		        	var contract_nft_Reward = contract_NFTReward2;
		    	 }		         
			     var self0 = this;          
				 myInstance.approve( contract_nft_Reward, this.mynfts[this.id_forstake].id, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             	 //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			     });   

       },
       //---------------------------------------------	
       exec_NFT_stake(){
       			 
       			// console.log("enable NFT_reward="+this.mynfts[this.id_forstake].id);
       			// console.log("refcode="+this.refcode_value);

       			 var myContract;
       			 myContract =  web3.eth.contract( abi_NFTReward );		
        		 if( this.stakepool_sel == 1){
		        	var myInstance = myContract.at(contract_NFTReward);
		    	 }
		    	 else if( this.stakepool_sel == 2){
		        	var myInstance = myContract.at(contract_NFTReward2);
		    	 }
			     var self0 = this;
			     if(this.refcode_value==""){
			     	this.refcode_value =0;
			     	console.log("refcode=0x0");
			     }  
				 myInstance.stakeAnft( this.mynfts[this.id_forstake].id, this.refcode_value, function (error, result) {
			          if (error) {
			               console.log(error);
			               return false;
			          } else {
			             //console.log("Pool-1 stake="+result);
			             self0.stakepool_sel=0
			             self0.StakeDialog_seen = false

			             self0.TxPendingDialog_seen = true
			             self0.ophash = result	
			             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
			             self0.txpending = true
						          
			          }
		        })
       },
       //---------------------------------------------	
		getEarned_NFTReward(){  // 查詢 目前帳戶在 NFTReward 挖到(earned)的數量
		       	 var myContract =  web3.eth.contract(abi_NFTReward);
		       	 var self0 = this;

		         var myInstance = myContract.at(contract_NFTReward);       
			     myInstance.earned( this.metaMaskAddress, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else {
				             //console.log("earned 0 result="+result); 
				             self0.NFTpoolx_earned[0] =  result/Math.pow(10,18)
				             self0.NFTpoolx_earned_str[0] = self0.NFTpoolx_earned[0].toFixed(8)
				          }
			      }); 

			     var myInstance2 = myContract.at(contract_NFTReward2);   
			     myInstance2.earned( this.metaMaskAddress, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else {
				             //console.log("earned 1 result="+result); 
				             self0.NFTpoolx_earned[1] =  result/Math.pow(10,18)
				             self0.NFTpoolx_earned_str[1] = self0.NFTpoolx_earned[1].toFixed(8)
				          }
			      });   
        },
        //---------------------------------------------
        genRandom(){

        	if( this.lucky_running )
        	{
	        	var num = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
	        	this.lucky_num += num
	        	if( this.lucky_num > 999 ) this.lucky_num -= 1000
	        }		

        },
        //---------------------------------------------
        gen_NFTstaked_ids(){  // 查詢 目前帳戶已經 staked存入, 在 NFTReward合約的id編號

        		this.stakednfts = []
        		var myContract =  web3.eth.contract(abi_NFTReward);
        		if( this.stakepool_sel == 1){
		        	var myInstance = myContract.at(contract_NFTReward);
		    	}
		    	else if( this.stakepool_sel == 2){
		        	var myInstance = myContract.at(contract_NFTReward2);
		    	}
			    var self0 = this;          
			    myInstance.getPlayerIds( this.metaMaskAddress, function (error, resarray) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else {

				          	     if( resarray.length <= 1  )
				          	         self0.staking_count = 0;
				          	     else
				          	     	 self0.staking_count = resarray.length - 1

				          		 for( var i in resarray)
					             {
					             	if( i != 0 )
					             	{
					             		//console.log("NFTstaked="+resarray[i]); 
					             		self0.stakednfts.push(resarray[i])
					             	}
					             }
					             setTimeout(() => {  self0.open_stakedNFT(); }, 2000 );
				          }
			      });
		},
        //---------------------------------------------
        open_stakedNFT(){

       		this.staked_cards = []

       			 var myContract;
       			 myContract =  web3.eth.contract( abi_nftfactory );		
		         const myInstance = myContract.at( contract_nftfactory );

		        //console.log("open_MyNFT_direct")
		        var jj=0;
		        var jjj= 0;
       		    for(var j in this.stakednfts){

       		    	setTimeout(() => {
	       			    console.log("stakednfts_ID="+this.stakednfts[jj])
	       			    var self0 = this;  
					    myInstance.getMeta( this.stakednfts[jj], function (error, resarray) {

					     		if (error) {
								          console.log(error);
								               return false;
								} else {
										/*
					             		console.log("Array 0="+resarray[0])	
					             		console.log("Array 1="+resarray[1])
					             		console.log("Array 2="+resarray[2])						             	
					             		console.log("Array 3="+resarray[3])	
					             		console.log("Array 4="+resarray[4])
					             		console.log("Array 5="+resarray[5])	
					             		console.log("Array 6="+resarray[6])	
										*/
										var g2 = parseInt(resarray[1]);
										var image_pos = (resarray[0]-1)*10+g2;
					             		self0.staked_cards.push({
					             			    id: self0.stakednfts[jjj],
						                        link: "",
						                        title: self0.get_NFT_name(resarray[1]),
						                        issuer: 0,
						                        src: 'https://imgnft.chainbacon.com/img/nftview/'+image_pos+'/?t=1',
						                        grade: resarray[1],
						                        promote:  resarray[2],
						                        artdamount:  resarray[3]/Math.pow(10,18),
						                        apwramount: resarray[4]/Math.pow(10,18),
						                        skill:resarray[5],
						                        contract_id:"",
					                     });
					             		 jjj = jjj + 1;
		                      	
						                   //self0.cards_sum = self0.cards_sum + 1;
						                   //setTimeout(() => {  self0.mynft_loading = false; }, 3000 );
								}
					    })
					    jj = jj + 1

					}, j*2000 );    

       			}

       },	     
       //---------------------------------------------
       Join_funding(){

       		this.FundingDialog_seen = true
       },
       //---------------------------------------------       
        copyTextFunction() {
        
		  var copyText = document.getElementById("myInput");
		  copyText.select();
		  document.execCommand("copy");
		  
		  //console.log( "-------- Copied ! --------" );
		  var tooltip = document.getElementById("myTooltip");
		  tooltip.innerHTML = "Copied !"// + copyText.value;
		   
		},
       //---------------------------------------------   
	    mouseoutFunc() {
		  var tooltip = document.getElementById("myTooltip");
		  tooltip.innerHTML = "Copy to clipboard";
		},
       //---------------------------------------------   
       loading_new_Language(){

		 this.NFT_template_items[0].title = this.$t("Mold Artwork")
		 this.NFT_template_items[0].artist = this.$t('Create Art and Faith')
		 this.NFT_template_items[0].use1 = this.$t('')
		 this.NFT_template_items[0].use2 = 'ERA-2 ArtNFT'	 

		 this.NFT_template_items[1].title = this.$t('Collect')
		 this.NFT_template_items[1].artist = this.$t('Get a taste of ArtNFT')
		 this.NFT_template_items[1].use1 = this.$t('Pay')
		 this.NFT_template_items[1].use2 = 'ARTT'

		 this.NFT_template_items[2].title = this.$t('Up of generations')
		 this.NFT_template_items[2].artist = this.$t('Choice classic or modern')
		 this.NFT_template_items[2].use1 = this.$t('Upgrade')
		 this.NFT_template_items[2].use2 = 'ArtNFT'

		 this.NFT_template_items[3].title = this.$t('Complex')
		 this.NFT_template_items[3].artist = this.$t('Artwork synthesis process')
		 this.NFT_template_items[3].use1 = ''
		 this.NFT_template_items[3].use2 = ''

		 this.NFT_template_items[4].title = this.$t('Value-added')
		 this.NFT_template_items[4].artist = this.$t('Store value in Art')
		 this.NFT_template_items[4].use1 = this.$t('Use')
		 this.NFT_template_items[4].use2 = 'ARTD'

		 this.NFT_template_items[5].title = this.$t('Strength')
		 this.NFT_template_items[5].artist = this.$t('Thinking ability')
		 this.NFT_template_items[5].use1 = this.$t('Use')
		 this.NFT_template_items[5].use2 = 'APWR'

		 this.NFT_template_items[6].title = this.$t('Skill')
		 this.NFT_template_items[6].artist = this.$t('Superb performance')
		 this.NFT_template_items[6].use1 = this.$t('Use')
		 this.NFT_template_items[6].use2 = 'ARTT'
 
         this.Gallery_template_items[0].title = this.$t('Gallery 1 title')
         this.Gallery_template_items[0].artist = this.$t('Gallery 1 memo')
         this.Gallery_template_items[1].title = this.$t('Gallery 2 title')
         this.Gallery_template_items[1].artist = this.$t('Gallery 2 memo')

         this.paste_tip = this.$t('Paste target address')
         this.leader_tip = this.$t('Leader who I follow')
       },
       //--------------------------------------------- 
       gen_selection(value){
       	   this.now_genpage = value
       	   if(this.now_genpage > 2 )
       	   {
       	   	     setTimeout(() => {
				  			this.now_genpage = 1
				  },500)    
       	   }
       },
       //--------------------------------------------- 
	   nextStep (n) {
	        if (n === this.ico_steps) {
	          this.e1 = 1
	        } else {
	          this.e1 = n + 1
	        }
       },
       //---------------------------------------------
       ico_more() {
	        this.funding_page=2
       }, 
       //---------------------------------------------
       go_Twitter() {
       	    const LINK_HEAD = "https://t.me/ArtemProtocol"
       		window.open( LINK_HEAD, '_blank');
       },
       //---------------------------------------------
       go_opensea( nft_id ) {
       	    var link = ''
       	    if( nft_id == 0)
       	    {   
       	       link = 'https://opensea.io/collection/artnft'
       	    }	
       	    else{
       	    		const LINK_HEAD = "https://opensea.io/assets/"+contract_ANFT+"/"
       				link = LINK_HEAD + nft_id+"/"
       		}
       		window.open( link, '_blank');
       },
       //---------------------------------------------     
       input_refcode(){
       			console.log("Code="+this.refcode_value)     
       },
       //---------------------------------------------     
       input_txNFT_addr(){
       			//console.log("Address="+this.transferNFT_to)     
       },
       //---------------------------------------------     
       input_ARTD_num(){
       			//console.log("storeARTD_num="+this.storeARTD_num)
       			if( this.balance_artd >= this.storeARTD_num )
       				 this.storeARTD_noenough = false 
       			else
       			     this.storeARTD_noenough = true	
       },
       input_ARTT_num(){
       			//console.log("ARTT="+this.spentARTT_num)
       			if( this.balance_artt >= this.spentARTT_num )
       				 this.storeARTT_noenough = false 
       			else
       			     this.storeARTT_noenough = true	     
       },
       input_APWR_num(){
       			//console.log("APWR="+this.storeARTD_num)
       			if( this.balance_apwr >= this.storeAPWR_num )
       				 this.storeAPWR_noenough = false 
       			else
       			     this.storeAPWR_noenough = true	     
       },
       input_ETH_num(){
       			//console.log("ETH="+this.spentETH_num)     
       			if( this.balance_eth >= this.spentETH_num )
       				 this.storeETH_noenough = false 
       			else
       			     this.storeETH_noenough = true	   
       },
       //--------------------------------------------- 
       exit_stake(num){

       		console.log("Exit Stake="+num)
       		this.ExitStakeid = num
       		this.ExitStakeDialog_seen = true     
       },
       //---------------------------------------------
       go_transferNFT( nft_id ) {
       			//console.log("go_transferNFT="+nft_id)
       			this.transferNFT_id = nft_id
       			this.TxInputdDialog_seen = true
       },
       //---------------------------------------------
       sendNFT_submit(){
       			 var myContract =  web3.eth.contract(abi_anft);
		         const myInstance = myContract.at( contract_ANFT );
			     var self0 = this;          
				 myInstance.safeTransferFrom( this.metaMaskAddress, this.transferNFT_to, this.transferNFT_id, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				            	 self0.TxInputdDialog_seen = false
					             self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			     });   
       },
 	   //---------------------------------------------
       NFT_storeAPWR(){
       			this.mint_active = 0; //Not show Mold 
       			//console.log("start NFT_storeAPWR");
       	        this.open_MyNFT_internal();
       			//console.log("NFT_storeARTD(#)")
       			this.storeAPWR_num = 0
       			this.StoreApwrDialog_seen=true;
       			this.checkAllowance_Apwr_NftFactory();
       			this.getBalance_APWR();
       },    
       //---------------------------------------------
        checkAllowance_Apwr_NftFactory(){   //查詢 ARTD合約, 目前帳戶是否已有 Approve 給 NFTFactory 合約　

        		 var myContract =  web3.eth.contract(abi_APWR);
		         const myInstance = myContract.at( contract_APWR);
			     var self0 = this;          
			     myInstance.allowance( this.metaMaskAddress, contract_nftfactory, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             //console.log("apwr-Factory allowance="+allow);
				             if( allow == 0 ){
				             	self0.apwrNftFactoryApprove_pass = false
				             }
				             else{
				             	self0.apwrNftFactoryApprove_pass = true
				             }
				         }
				  })       
       },
       //---------------------------------------------      	
       enableApprove_Apwr_NftFactory(){  // 讓目前帳戶通過ARTD合約approve 給NFTReward

		         var myContract =  web3.eth.contract(abi_APWR);
		         const myInstance = myContract.at( contract_APWR );
			     var self0 = this;          
				 myInstance.approve( contract_nftfactory, 0xfffffffffffffffffffffff, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				                //console.log("Factory-approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
        }, 
       //---------------------------------------------            
       store_APWR_process(){  // 經由 Factory 合約, 把 APWR 存入 NFT 內
		         var myContract =  web3.eth.contract(abi_nftfactory);
		         const myInstance = myContract.at( contract_nftfactory );
			     var self0 = this; 
			     const amount = this.storeAPWR_num * Math.pow(10,18)         
				 myInstance.raisePower( amount, this.cards[this.id_storeartd].id,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
        },                 
       //---------------------------------------------
       NFT_storeARTD(){
       			this.mint_active = 0; //Not show Mold 
       	        this.open_MyNFT_internal();
       			//console.log("NFT_storeARTD(#)")
       			this.storeARTD_num = 0
       			this.StoreArtdDialog_seen=true;
       			this.checkAllowance_Artd_NftFactory();
       			this.getBalance_ARTD();
       },
       //---------------------------------------------       
       go_withdrawARTD( nft_id , serial ) {
       			//console.log("go_withdrawARTD="+nft_id)
       			this.checkAllowance_Artd_NftFactory();
       			this.checkAllowance_Fundpool();
       			this.withdrawARTD_id = nft_id
       			this.withdrawARTD_serial = serial
       			this.withdrawARTDDialog_seen = true
       },
       //---------------------------------------------
        checkAllowance_Artd_NftFactory(){   //查詢 ARTD合約, 目前帳戶是否已有 Approve 給 NFTFactory 合約　

        		 var myContract =  web3.eth.contract(abi_ARTD);
		         const myInstance = myContract.at( contract_ARTD);
			     var self0 = this;          
			     myInstance.allowance( this.metaMaskAddress, contract_nftfactory, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             //console.log("artd-Factory allowance="+allow);
				             if( allow == 0 ){
				             	self0.artdNftFactoryApprove_pass = false
				             }
				             else{
				             	self0.artdNftFactoryApprove_pass = true
				             }
				         }
				  })       
       },
       //---------------------------------------------      	
       enableApprove_Artd_NftFactory(){  // 讓目前帳戶通過ARTD合約approve 給NFTReward

		         var myContract =  web3.eth.contract(abi_ARTD);
		         const myInstance = myContract.at( contract_ARTD );
			     var self0 = this;          
				 myInstance.approve( contract_nftfactory, 0xfffffffffffffffffffffff, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				                 //console.log("Factory-approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
        }, 
       //---------------------------------------------
        checkAllowance_Artt_NftFactory(){   //查詢 ARTD合約, 目前帳戶是否已有 Approve 給 NFTFactory 合約　

        		 var myContract =  web3.eth.contract(abi_ARTT);
		         const myInstance = myContract.at( contract_ARTT);
			     var self0 = this;          
			     myInstance.allowance( this.metaMaskAddress, contract_nftfactory, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             //console.log("artd-Factory allowance="+allow);
				             if( allow == 0 ){
				             	self0.arttNftFactoryApprove_pass = false
				             }
				             else{
				             	self0.arttNftFactoryApprove_pass = true
				             }
				         }
				  })       
       },
       //---------------------------------------------      	
       enableApprove_Artt_NftFactory(){  // 讓目前帳戶通過ARTD合約approve 給NFTReward

		         var myContract =  web3.eth.contract(abi_ARTT);
		         const myInstance = myContract.at( contract_ARTT );
			     var self0 = this;          
				 myInstance.approve( contract_nftfactory, 0xfffffffffffffffffffffff, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				                console.log("Factory-approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
        },        
       //---------------------------------------------            
       spent_ARTT_process(){  // 經由 Factory 合約, 把 ARTT 存入 NFT 內
		         var myContract =  web3.eth.contract(abi_nftfactory);
		         const myInstance = myContract.at( contract_nftfactory );
			     var self0 = this; 
			     var amount = this.spentARTT_num * Math.pow(10,18)         
				 myInstance.AddSkill( amount, this.cards[this.id_storeartd].id,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
        }, 
       //---------------------------------------------
        checkAllowance_Artd_nftReward(){   //查詢 ARTD合約, 目前帳戶是否已有 Approve 給 NFTReward 合約　

        		 var myContract =  web3.eth.contract(abi_ARTD);
		         const myInstance = myContract.at( contract_ARTD);
			     var self0 = this;          
			     myInstance.allowance( this.metaMaskAddress, contract_NFTReward, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             console.log("artdNftReward allowance="+allow);
				             if( allow == 0 ){
				             	self0.artdNftRwApprove_pass = false
				             }
				             else{
				             	self0.artdNftRwApprove_pass = true
				             }
				         }
				  })       
       },
       //---------------------------------------------      	
       enableApprove_Artd_nftReward(){  // 讓目前帳戶通過ARTD合約approve 給NFTReward

		         var myContract =  web3.eth.contract(abi_ARTD);
		         const myInstance = myContract.at( contract_ARTD );
			     var self0 = this;          
				 myInstance.approve( contract_NFTReward, 0xfffffffffffffffffffffff, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
        },  
       //---------------------------------------------            
       store_ARTD_process(){  // 經由 Factory 合約, 把 ARTD 存入 NFT 內
		         var myContract =  web3.eth.contract(abi_nftfactory);
		         const myInstance = myContract.at( contract_nftfactory );
			     var self0 = this; 
			     const amount = this.storeARTD_num * Math.pow(10,18)         
				 myInstance.store( amount, this.cards[this.id_storeartd].id,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
       },  
       //---------------------------------------------   
       preload_reward_count(){
       		this.load_NFTstakecount( 1 );
       		this.load_NFTstakecount( 2 );
       		this.load_LPstakecount(101);  //LP staking pool 1
       },
       //---------------------------------------------   
       get_NftReward_count(){  // 取得 參加 NftReward 的人數

       			this.load_NFTstakecount( this.stakepool_sel );
       			this.load_NFTstakePlayers('');
       		/*	
       		if( !this.ethwallet_ready)
       		{
       			this.load_NFTstakecount();
       			this.load_NFTstakePlayers('');
       		}   
       		else{
       			
		         var myContract =  web3.eth.contract(abi_NFTReward);
		         const myInstance = myContract.at( contract_NFTReward );
			     var self0 = this;      
				 myInstance.stakeCount(  function (error, result) {
				          if (error) {

				               console.log(error);
				               return false;
				          } else { 
				                //console.log("stakeCount result="+result);
				                self0.nftrw_stakeCount = result
				                self0.load_NftReward_partner();
				          }
			      });  
			}   
		   */      
       },
       //---------------------------------------------   
       load_NftReward_partner(){  // 取得 參加 NftReward 的帳戶清單(列表)

       			 this.nftrw_user = []
       			 this.nftrw2_user = []
       			 this.nftRW_users = [ this.nftrw_user, this.nftrw2_user ]
       			 
       			 //this.nftrw_user = []
       			 var self0 = this;
		         var myContract =  web3.eth.contract(abi_NFTReward);
		         var myInstance = myContract.at(contract_NFTReward);
		         
			     var ii=0;
			     var i=0;
			     while( i < this.nftRW_stakeCount[0] ) {
			     	setTimeout(() => {
						 myInstance.stakeInfo( ii,  function (error, resarray) {
						          if (error) {
						               console.log(error);
						               return false;
						          } else { 
						                	var obj = {
								             	 id: resarray[0],
									             staker: resarray[1],
									             weight: resarray[2],
									             earned: (resarray[3]/Math.pow(10,18)).toFixed(2),
								                };
								            self0.nftrw_user.push(obj);
						          }
					      });  
					     ii = ii + 1  
					 }, 400*i );

					 i=i+1	 
				  } //while
                
                //----------------------------------------------------
                 var myInstance2 = myContract.at(contract_NFTReward2);
			     var jj=0;
			     var j=0;
			     while( j < this.nftRW_stakeCount[1] ) {
			     	setTimeout(() => {
						 myInstance2.stakeInfo( jj,  function (error, resarray) {
						          if (error) {
						               console.log(error);
						               return false;
						          } else { 
						                	var obj = {
								             	 id: resarray[0],
									             staker: resarray[1],
									             weight: resarray[2],
									             earned: (resarray[3]/Math.pow(10,18)).toFixed(2),
								                };
								            self0.nftrw2_user.push(obj);
						          }
					      });  
					     jj = jj + 1  
					 }, 400*j );

					 j=j+1	 
				  } //while


       },
       //---------------------------------------------   
       load_NftReward_partner_old(){  // 取得 參加 NftReward 的帳戶清單(列表)

       	  
       			 this.nftrw_user = []
		         var myContract =  web3.eth.contract(abi_NFTReward);
		         if( this.stakepool_sel == 1){
		        	var myInstance = myContract.at(contract_NFTReward);
		    	 }
		    	 else if( this.stakepool_sel == 2){
		        	var myInstance = myContract.at(contract_NFTReward2);
		    	 }
			     var self0 = this;
			     var jj=0;
			     var j=0;
			     while( j < this.nftrw_stakeCount ) {
			     	setTimeout(() => {
						 myInstance.stakeInfo( jj,  function (error, resarray) {
						          if (error) {
						               console.log(error);
						               return false;
						          } else { 
						                	var obj = {
								             	 id: resarray[0],
									             staker: resarray[1],
									             weight: resarray[2],
									             earned: (resarray[3]/Math.pow(10,18)).toFixed(2),
								                };
								            self0.nftrw_user.push(obj);
								            //console.log("id="+resarray[0])
								            //console.log("staker="+resarray[1])
								            //console.log("weight="+resarray[2])
								            //console.log("earned="+resarray[3]/Math.pow(10,18))
						          }
					      });  
					     jj = jj + 1  
					 }, 500*j );

					 j=j+1	 
				} //while
       },
       //---------------------------------------------   
       get_NftWeight( nft_id ){  // 預先計算 Nft 的權重
       	
       			this.nftid_reward_weight = 0 
		        var myContract =  web3.eth.contract(abi_NFTReward);
        		if( this.stakepool_sel == 1){
		        	var myInstance = myContract.at(contract_NFTReward);
		    	}
		    	else if( this.stakepool_sel == 2){
		        	var myInstance = myContract.at(contract_NFTReward2);
		    	}
			    var self0 = this;
				myInstance.getNftWeight( nft_id,  function (error, result) {
						          if (error) {
						          	   //console.log(" get_NftWeight(). return ERROR ");
						               //console.log(error);
						               self0.nftid_reward_weight = -1;
						               return false;
						          } else { 
						          	   self0.nftid_reward_weight = result
								       //console.log("Nft Weight="+result);
						          }
				  });  

       },       
       //---------------------------------------------   
       ListNftReward(pool_num){

       		this.stakepool_sel = pool_num + 1;
       		//console.log(" this.stakepool_sel =  "+this.stakepool_sel);
       		this.get_NftReward_count();
       		this.nftrw_PartnerDialog_seens = true;

       },
       //---------------------------------------------  
       checkAllowance_Fundpool(){
       			 var myContract =  web3.eth.contract(abi_ARTD);
		         const myInstance = myContract.at( contract_ARTD);
			     var self0 = this;          
			     myInstance.allowance( contract_FundPool, contract_nftfactory, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             //console.log("FundPool_artd allowance="+allow);
				             if( allow == 0 ){
				             	self0.withdrawFundApprove_pass = false
				             }
				             else{
				             	self0.withdrawFundApprove_pass = true
				             }
				         }
				  })       
       },
       //---------------------------------------------  
       enableApprove_Fundpool(){


		         var myContract =  web3.eth.contract(abi_FundPool);
		         const myInstance = myContract.at( contract_FundPool );
			     var self0 = this;          
				 myInstance.approve( contract_nftfactory, 0xfffffffffffffffffffffff, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
       },
       //---------------------------------------------  
       withdraw_ARTD_process(){  // 從 Factory 合約,  把 NFT 內的 ARTD 取出
       			 var myContract =  web3.eth.contract(abi_nftfactory);
		         const myInstance = myContract.at( contract_nftfactory );
			     var self0 = this; 
			     const amount = this.storeARTD_num * Math.pow(10,18)         
				 myInstance.withdraw( amount, this.withdrawARTD_id,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
					             self0.storeARTD_num = 0
				          }
			      });   
       },
       //--------------------------------------------- 
       NFT_buySkill(){
       			this.mint_active = 0; //Not show Mold 
       	        this.open_MyNFT_internal();
       		    
       		    this.spentARTT_num = 0
       			this.spentArttDialog_seen=true;
       			this.checkAllowance_Artt_NftFactory();
       			this.getBalance_ARTT();
       },
       //--------------------------------------------- 
       Funding_close(){

       		if( this.funding_page==2 )
       			this.funding_page = 1;
       		else{
       			this.FundingDialog_seen = false
       		}

       },
       //--------------------------------------------- 
       SendETH_toFund(){

       	var eth_value = web3.toWei( parseFloat(this.spentETH_num), 'ether');
       	//console.log("ETH="+eth_value);
       		var self0 = this; 
       		web3.eth.sendTransaction({
			  from: this.metaMaskAddress,
			  to: contract_OpenSwap,
			  value: eth_value
			}, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
				}
		   );

       },
       //--------------------------------------------- 
       getBalance_ARTD(){
       		     var myContract =  web3.eth.contract(abi_ARTD);
		         const myInstance = myContract.at( contract_ARTD);
			     var self0 = this;          
			     myInstance.balanceOf( this.metaMaskAddress, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             	self0.balance_artd = result / Math.pow(10,18)
				           }  		
				  })   			     
       },
       //--------------------------------------------- 
       getBalanceRewardPool_ARTD(){
				 var myContract =  web3.eth.contract(abi_ARTD);
		         const myInstance = myContract.at( contract_ARTD);
			     var self0 = this;            
			     myInstance.balanceOf( contract_NFTReward, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             	self0.balanceRW_artd[0] = result / Math.pow(10,18)
				           }  		
				  })  
			     myInstance.balanceOf( contract_NFTReward2, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             	self0.balanceRW_artd[1] = result / Math.pow(10,18)
				           }  		
				  })         	
       },
       //--------------------------------------------- 
       getBalance_APWR(){
       		     var myContract =  web3.eth.contract(abi_APWR);
		         const myInstance = myContract.at( contract_APWR);
			     var self0 = this;          
			     myInstance.balanceOf( this.metaMaskAddress, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             	self0.balance_apwr = result / Math.pow(10,18)
				           }  		
				  })  
       },
       //--------------------------------------------- 
       getBalance_ARTT(){
       		     var myContract =  web3.eth.contract(abi_ARTT);
		         const myInstance = myContract.at( contract_ARTT);
			     var self0 = this;          
			     myInstance.balanceOf( this.metaMaskAddress, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             	self0.balance_artt = result /Math.pow(10,18)
				           }  		
				  })  
       },
       //--------------------------------------------- 
       getBalance_ETH(){
				 var self0 = this;
       		     web3.eth.getBalance( this.metaMaskAddress, function(err, resp){
			 		if (err) {
					       console.log(err);
					       return false;
					 } else { 
					 	  const bal_raw = JSON.stringify(resp);
					 	  const bal_str = bal_raw.replace('"', '').replace('"', '');
					 	  const bal_d = parseInt(bal_str,10); 
					 	  var balance = (bal_d / Math.pow(10,18));
					 	  self0.balance_eth = balance
					 }
				});
       },        
       //--------------------------------------------- 
		getStage_Fund(){
       		     var myContract =  web3.eth.contract(abi_OpenSwap);
		         const myInstance = myContract.at( contract_OpenSwap);
			     var self0 = this;          
			     myInstance.getStage( function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				          	    //console.log("getStage_Fund()="+result);
				             	self0.fund_stage = result
				           }  		
				  })  
       },
       //--------------------------------------------- 
		getEnable_Fund(){
       		     var myContract =  web3.eth.contract(abi_OpenSwap);
		         const myInstance = myContract.at( contract_OpenSwap);
			     var self0 = this;          
			     myInstance.paused( function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 

				          		//console.log("getEnable_Fund()="+!result);
				             	self0.fund_enable = !result;
				           }  		
				  })  
       },
       //--------------------------------------------- 
		getETHbalance_Fund(){

				 var self0 = this;
       		     web3.eth.getBalance( contract_OpenSwap, function(err, resp){
			 		if (err) {
					       console.log(err);
					       return false;
					 } else { 
					 	  const bal_raw = JSON.stringify(resp);
					 	  const bal_str = bal_raw.replace('"', '').replace('"', '');
					 	  const bal_d = parseInt(bal_str,10); 
					 	  var balance = (bal_d / Math.pow(10,18)).toFixed(4);
					 	  //console.log("OpenSWAP ETH= "+balance);
					 	  self0.ethbalance_fund = balance
					 }
				});
       },
       //---------------------------------------------
		open_InitFund(){

			this.fund_active = 0
		},
       //---------------------------------------------
		open_LeadProgram(){

			this.fund_active = 1
		},
       //---------------------------------------------
        hex2a(hex) {
		    var str = '';
		    for (var i = 0; i < hex.length; i += 2) {
		        var v = parseInt(hex.substr(i, 2), 16);
		        if (v) str += String.fromCharCode(v);
		    }
		    return str;
		},
        //---------------------------------------------  
         getIsRegistered(){  // 是否已經註冊 ?

			         var myContract =  web3.eth.contract(abi_PlayerBook);
			         const myInstance = myContract.at(contract_PlayerBook);
			         var self0 = this;       
			         myInstance.getPlayerName( this.metaMaskAddress, function (error, namebyte32) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else {

				             const nameb32 = namebyte32;
				             //console.log('namebyte32:'+ nameb32 );
				             if( nameb32 != 0)
				             {
				             	var myname = self0.hex2a(nameb32)
				             	//console.log('YES');
				             	console.log( 'Name='+myname );
				             	self0.isRegisted = true
						        self0.myRefCode = myname
				             }
				             else{
				             	self0.isRegisted = false
						        self0.myRefCode = ''
				             }
				         }
				     })
		},
        //---------------------------------------------
         checkNameOK(){  // 名字是否可用 ?

			         var myContract =  web3.eth.contract(abi_PlayerBook);
			         const myInstance = myContract.at(contract_PlayerBook);
			         //console.log( '*code='+this.customrefcode_value );
            	     if( this.customrefcode_value.toLowerCase() == "artdeco")
            	     {
            	     	 this.codecheck_result = false
            	     } 
            	     else{

				         var self0 = this;       
				         myInstance.checkIfNameValid( this.customrefcode_value, function (error, result) {
					          if (error) {
					               console.log(error);
					               return false;
					          } else {
					          	   if( result == false ){
					          	   		// Name is inValid , someone be registered it
					          	   		//console.log( 'result=False' );
					          	   		self0.codecheck_result = false
					          	   }
					          	   else{
					          	   	    // Name is Valid , no anyone used
					          	   	    //console.log( 'result=True' );
					          	   	    self0.codecheck_result = true
					          	   }
					          		
					          }
					     }) 
				     }     		     

		},
        //---------------------------------------------
        ref_buy_page(value){
       		this.rerbuy_Dialog_seen = true
       　},
        //---------------------------------------------
         pay_refcode(){

         	this.check_loading = true
         	this.checkNameOK();

         	setTimeout(() => {
         		this.check_loading = false
         		if(  this.codecheck_result == false)
         		 {
         		 	this.codecheck_dialog = true
         		 }
				 else{
				 		//this.rerbuy_Dialog_seen = false;
		         		//console.log( 'OK Ready !!'	);
		         		var ext_code = this.metaMaskAddress.slice(2,6);
		         		var affcode = this.customrefcode_value+ext_code
		         		console.log( 'affcode='+affcode	);

		         		
		         		var myContract =  web3.eth.contract(abi_PlayerBook);
			            const myInstance = myContract.at(contract_PlayerBook);
			         	var self0 = this;       
		         		// myInstance.registerNameXName( { value: "10000000000000000000" }, this.refcode_value, affcode, function (error, result) {
		         		myInstance.registerNameXName( this.customrefcode_value, affcode, { value: '100000000000000000' }, function (error, result) {	
						          if (error) {
						               console.log(error);
						               return false;
						          } else {
						          	 self0.rerbuy_Dialog_seen = false;
						             self0.TxPendingDialog_seen = true
						             self0.ophash = result	
						             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
						             self0.txpending = true
						          }
					     })
						
		         }

			 },4000) 

         	//console.log('Code:'+ this.refcode_value	);

         },
        //---------------------------------------------
     	load_NFTstakecount( pool_num ){

     		   var self0 = this;
     		   var _stakecountlink =  _StakeCount + pool_num
     		   //console.log( "_stakecountlink="+_stakecountlink  );

	           axios.get( _stakecountlink ).then(response => {

	             let sum = response.data.count
	          
	                //console.log( "_StakeCount="+sum  );
	                if( pool_num == 1 )
	                {
		                self0.nftrw_stakeCount = sum
		                self0.nftRW_stakeCount[0] = sum
		                self0.pagination_len = parseInt((self0.nftrw_stakeCount/self0.stakerw_psize))+1
		            }
		            else if( pool_num == 2 )
	                {
		                self0.nftrw2_stakeCount = sum
		                self0.nftRW_stakeCount[1] = sum
		                self0.pagination_len = parseInt((self0.nftrw2_stakeCount/self0.stakerw_psize))+1
		            }
	                //console.log( "pagination_len ="+self0.pagination_len );
	           }); //axios.get(

     	},
		//---------------------------------------------
     	load_LPstakecount( pool_num ){

     		   var self0 = this;
     		   var _stakecountlink =  _StakeCount + pool_num
     		   //console.log( "_stakecountlink="+_stakecountlink  );

	           axios.get( _stakecountlink ).then(response => {

	             let sum = response.data.count
	          
	                //console.log( "_StakeCount="+sum  );
	                if( pool_num == 101 )
	                {
		                self0.lprw_stakeCount = sum
		                self0.lpRW_stakeCount[0] = sum
		                self0.pagination_len = parseInt((self0.lprw_stakeCount/self0.stakerw_psize))+1
		            }
		            else if( pool_num == 102 )
	                {
		                self0.lprw2_stakeCount = sum
		                self0.lpRW_stakeCount[1] = sum
		                self0.pagination_len = parseInt((self0.lprw2_stakeCount/self0.stakerw_psize))+1
		            }
	                //console.log( "pagination_len ="+self0.pagination_len );
	           }); //axios.get(

     	},     	
        //---------------------------------------------
     	get_NftTotalsupply(){
     		   var self0 = this;	
	           axios.get( _NftSupply ).then(response => {
	             let sum = response.data.totalsupply
	                self0.nftTotalSupply = sum
	           }); //axios.get(
     	},     	
        //---------------------------------------------
        load_NFTstakePlayers( search_addr ){

        	//console.log("=======> load_NFTstakePlayers()");
        	   var stakeinfo = ''
        	   if( search_addr != '')
        	   {
        	   	   stakeinfo = _StakeInfo+this.stakepool_sel+"&s=0&count=100&search="+search_addr
        	   }
        	   else
        	   {
        	   		stakeinfo = _StakeInfo+this.stakepool_sel+"&s="+((this.stakerw_page-1)*this.stakerw_psize)+"&count="+this.stakerw_psize
        	   }
        	   //console.log(" link =======> "+stakeinfo);
        	   this.new_nftrw_user = []	
     		   var self0 = this;	
	           axios.get( stakeinfo ).then(response => {

	             	  let sum = response.data.length
			          

			          for( var i in response.data){

			           			var obj = {
					         	 id: response.data[i].nftid,
					             staker: response.data[i].staker,
					             weight: response.data[i].weight,
					             earned: (response.data[i].earn/Math.pow(10,18)).toFixed(2),
					            };
					        self0.new_nftrw_user.push(obj);

			          } // for
			          	  self0.nftrw_user = []
				          self0.nftrw_user = self0.new_nftrw_user

			          if( self0.stakepool_sel == 1)
			          {
				          //self0.nftrw_user = []
				          //self0.nftrw_user = self0.new_nftrw_user
				          self0.nftRW_users[0] = self0.nftrw_user
				       }
				       else if( self0.stakepool_sel == 2)
			          {
				          //self0.nftrw2_user = []
				          //self0.nftrw2_user = self0.new_nftrw_user
				          self0.nftRW_users[1] = self0.nftrw2_user
				       }

			        // console.log(self0.cards)
	           }); //axios.get(

     	},
        //---------------------------------------------
        rwpage_selection(value){
       	   this.stakerw_page = value
       	   //console.log("stakerw_page="+ this.stakerw_page)
       	   this.load_NFTstakePlayers('');
       	   this.search_addr = '';
       },
       //---------------------------------------------
       input_search(){

       		 this.stakerw_page = 0
       		 //console.log("search_addr="+this.search_addr);
       		 this.load_NFTstakePlayers(this.search_addr);

       },
       //---------------------------------------------        
       	countdown_end(){
       		this.countdown = ( OPENING_TIME*1000 -  Math.floor(Date.now()) );
       },
       //---------------------------------------------        
       	countdown_end2(){
       		this.countdown2 = ( OPENING_TIME2*1000 -  Math.floor(Date.now()) );
       },
       //---------------------------------------------
       upgradeDialog(){
       	        this.open_MyNFT_internal();
       			this.upgradeNFTDialog_seen = true
       			setTimeout(() => {  this.checkAllowance_your_NftFactory(); }, 3000 );
       },  
       //---------------------------------------------
        checkAllowance_your_NftFactory(){   //查詢 ANFT合約, 目前帳戶是否已有 Approve 給 Factory 合約　

        		 var myContract =  web3.eth.contract(abi_anft);
		         const myInstance = myContract.at( contract_ANFT);
			     var self0 = this;          
				 myInstance.getApproved( this.mynfts[this.id_upgradenft].id, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("-------------------");
				             //console.log("NFTapproved="+allow);
				             if( allow == 0 ){
				             	self0.yournftFactoryApprove_pass = false

				             }
				             else
				             {
				             	if( allow == contract_nftfactory.toLowerCase() )  // 最好是取得 getFactory()的值來比對
				             	{
				             	    self0.yournftFactoryApprove_pass = true
				             	    //console.log("OK! Approved done.");
				             	}
				             	else
				             	{
					             	self0.yournftFactoryApprove_pass = false
					             	//console.log("Must Re-Approve");
					             	//console.log("allow="+allow);
					             	//console.log("contract="+contract_NFTReward.toLowerCase() );
					            }
				             }
				         }
				 })     
       },
       //---------------------------------------------      	
       enableApprove_your_NftFactory(){  // 讓目前帳戶通過ANFT合約, approve 給Factory

						         var myContract =  web3.eth.contract(abi_anft);
						         const myInstance = myContract.at( contract_ANFT );
							     var self1 = this;          
								 myInstance.approve( contract_nftfactory, this.mynfts[this.id_upgradenft].id, function (error, result) {
								          if (error) {
								               console.log(error);
								               return false;
								          } else { 
								             	 //console.log("approve result="+result);
								             	 self1.TxPendingDialog_seen = true
									             self1.ophash = result	
									             self1.timeIntev = setInterval( self1.check_TxReceipt, 5000 );  	
									             self1.txpending = true
								          }
							     }); 

       			 /*
       			 var myContract =  web3.eth.contract(abi_nftfactory);
		         const myInstance = myContract.at( contract_nftfactory );
			     var self0 = this;     
				 myInstance.getFactory( this.mynfts[this.id_upgradenft].id,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 

				                 //console.log("getFactory="+result);
						         var myContract =  web3.eth.contract(abi_anft);
						         const myInstance = myContract.at( contract_ANFT );
							     var self1 = self0;          
								 myInstance.approve( result, self0.mynfts[self0.id_upgradenft].id, function (error, result) {
								          if (error) {
								               console.log(error);
								               return false;
								          } else { 
								             	 //console.log("approve result="+result);
								             	 self1.TxPendingDialog_seen = true
									             self1.ophash = result	
									             self1.timeIntev = setInterval( self1.check_TxReceipt, 5000 );  	
									             self1.txpending = true
								          }
							     }); 
				          }
			      });   
				  */
  
        },
       //--------------------------------------------- 
		upgrade_NFT_process(){   // 升級 ANFT 到新一代 ERA

				 var myContract =  web3.eth.contract(abi_nftfactory);
		         const myInstance = myContract.at( contract_nftfactory );
			     var self0 = this;         
				 myInstance.renewNFT( this.mynfts[this.id_upgradenft].id,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
					             self0.storeARTD_num = 0
				          }
			      });   
		},
       //--------------------------------------------- 		
		collectNftbyArttDialog()
		{
		     this.claimNftbyArttDialog_seen = true
		     this.checkAllowance_Artt_Relay();
		},
       //--------------------------------------------- 
        checkAllowance_Artt_Relay() //查詢 ARTT 合約, 目前帳戶是否已有 Approve 給 Relay 合約
        {   　

        		 var myContract =  web3.eth.contract(abi_ARTT);
		         const myInstance = myContract.at( contract_ARTT);
			     var self0 = this;          
			     myInstance.allowance( this.metaMaskAddress, contract_NftRelay, function (error, allow) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             if( allow == 0 ){
				             	self0.arttRelayApprove_pass = false
				             }
				             else{
				             	self0.arttRelayApprove_pass = true
				             }
				         }
				  })       
       },
       //---------------------------------------------      	
       enableApprove_Artt_Relay(){  // 讓目前帳戶通過 ARTT合約 approve 給 Relay 合約

		         var myContract =  web3.eth.contract(abi_ARTT);
		         const myInstance = myContract.at( contract_ARTT );
			     var self0 = this;          
				 myInstance.approve( contract_NftRelay, 0xfffffffffffffffffffffff, function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				                 //console.log("Factory-approve result="+result);
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });   
        }, 
		//---------------------------------------------
		Relay_paidARTT_process(){   //支付 1 ARTT 給Relay合約,取得 NFT
				 var myContract =  web3.eth.contract(abi_NftRelay);
		         const myInstance = myContract.at( contract_NftRelay );
			     var self0 = this; 
			     var amount = 1.0 * Math.pow(10,18)         
				 myInstance.claimNFTbytokens( amount,  function (error, result) {
				          if (error) {
				               console.log(error);
				               return false;
				          } else { 
				             //console.log("approve result="+result);
				             	 self0.claimNftbyArttDialog_seen = false
				             	 self0.TxPendingDialog_seen = true
					             self0.ophash = result	
					             self0.timeIntev = setInterval( self0.check_TxReceipt, 5000 );  	
					             self0.txpending = true
				          }
			      });  


		}, 
		//---------------------------------------------


   }
   
}
</script>

<style scoped>

.v-btn {
  text-transform:none !important;
}

h2 {
  font-weight: normal;
}
.ellipsis-style{
    width: 200px;
}
.ellipsis-style{
    width: 80%;
}
.ellipsis-style{
    max-width: 200px;
}
.v-list-item__title {
      font-size: 0.9rem !important;
 }
 .v-list-item__subtitle {
      font-size: 1.1rem !important;
 }
 .cardColor {
   background-color: rgba(70, 40, 110, 0.5) !important;
   border-color: white !important;
 } 

 .container {
  position: relative;
  text-align: center;
  color: white;
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}

/* Top left text */
.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}

/* Top right text */
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}

/* Bottom right text */
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bottom-centered {
  position: absolute;
  top: 30%;
  left: 45%;
  transform: translate(-95%, -95%);
}

</style> 

<style>
.row {
    display: flex;
    flex-flow: row wrap;
    margin-right: -0.665rem;
    margin-left: -0.665rem;
}
.centered-input input {
  text-align: center
}
.transparent {
   background-color: white!important;
   opacity: 0.65;
   border-color: transparent!important;
 }

 .tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.left-btn { float: left; }
.right-btn { float: right; }

</style> 


