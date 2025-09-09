<!--<template>-->
<!--    <div class="mainBodyOfHome">-->
<!--&lt;!&ndash;      {{user}}&ndash;&gt;-->
<!--&lt;!&ndash;    数据展示&ndash;&gt;-->
<!--        <div class="dataDisplayOfHome">-->
<!--&lt;!&ndash;          标题  &ndash;&gt;-->
<!--            <div class="headOfDataDisplay">-->
<!--                <span style="flex: 9;font-size: 22px;font-weight: bold">{{ user.sysUser.userName }}</span>-->
<!--            </div>-->
<!--&lt;!&ndash;            数据具体展示&ndash;&gt;-->
<!--            <div class="detailedData">-->
<!--                &lt;!&ndash;            Rank榜&ndash;&gt;-->
<!--                <div class="demoOfDivInDetailedData" style="background-color: #e1f3d8" @click="ranks">-->
<!--                  <div class="sp-center" style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">-->
<!--                    <span>Rank榜</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--                &lt;!&ndash;            Map榜&ndash;&gt;-->
<!--                <div class="demoOfDivInDetailedData" style="background-color: #FAECD8">-->
<!--                  <div class="sp-center" style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">-->
<!--                    <span>Map榜</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--                &lt;!&ndash;            Test&ndash;&gt;-->
<!--                <div class="demoOfDivInDetailedData" style="background-color:#FDE2E2">-->
<!--                    <div class="sp-center" style="font-family: PingFangSC-Semibold,PingFang SC;font-size: 25px;font-weight: bold; flex: 2;width: 100%;height: 100%;display: flex;align-items: center;padding-left: 10px">-->
<!--                        <span>偷懒了~</span>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--&lt;!&ndash;        数据可视化区域&ndash;&gt;-->
<!--        <div class="visualizationOfHome">-->
<!--&lt;!&ndash;          <ranks-list class="ranks-list"></ranks-list>&ndash;&gt;-->
<!--        </div>-->

<!--    </div>-->

<!--</template>-->

<!--<script>-->
<!--    import RanksList from "@/views/tableViews/RanksList";-->
<!--    export default {-->
<!--        name: "Home",-->
<!--      components: {RanksList},-->
<!--      data(){-->
<!--            return {-->
<!--                inforOfDaPeng:{},-->

<!--                user: {-->
<!--                  sysUser: {-->
<!--                    userName: null-->
<!--                  }-->
<!--                }-->
<!--            }-->
<!--        },-->
<!--        methods:{-->

<!--          loadInforOfDaPeng(){-->
<!--            this.request.get("http://localhost:9090/inforofdapeng/newData").then(res=>{-->
<!--              this.inforOfDaPeng = res.data-->
<!--            })-->
<!--          },-->

<!--          ranks() {-->
<!--              console.log("懒~懒~懒~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")-->

<!--          },-->
<!--        },-->
<!--        created() {-->
<!--          this.user = JSON.parse(sessionStorage.getItem("loginUserInfo"));-->
<!--        }-->
<!--    }-->
<!--</script>-->


<!--<style lang="scss" scoped>-->
<!--    .mainBodyOfHome{-->
<!--        display: flex;-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        //background-image: radial-gradient(circle farthest-side at 10% 90%, #f8e2e4, #f0e2fd 70%, #d9e2ef);-->
<!--        background-image: radial-gradient(circle farthest-side at 0% 80%, #f1faff, #e9d9f8 60%, #efe7fa);-->
<!--        flex-direction: column;-->
<!--        align-items: center;-->
<!--        justify-content: center;-->
<!--    }-->
<!--    .dataDisplayOfHome{-->
<!--        flex: 3;-->
<!--        height: 100%;-->
<!--        width: 100%;-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--        align-items: center;-->
<!--        padding: 0 50px;-->
<!--    }-->
<!--    .visualizationOfHome{-->
<!--        flex: 6;-->
<!--        width: 95%;-->
<!--        margin: 20px 0;-->
<!--        border-radius: 25px;-->
<!--        background-color: #ffffff;-->
<!--      box-shadow: 2px 2px 15px #bbb;-->


<!--      .ranks-list {-->
<!--        width: 100%;-->
<!--        height: 100%;-->

<!--      }-->
<!--    }-->
<!--    .dataTableOfHome{-->
<!--        flex: 5;-->
<!--        height: 100%;-->
<!--        width: 100%;-->
<!--        background-color: red;-->
<!--    }-->
<!--    .headOfDataDisplay{-->
<!--        flex: 2;-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        display: flex;-->
<!--        align-items: end;-->
<!--    }-->
<!--    .detailedData{-->
<!--        flex: 5;-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        margin-top: 20px;-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        justify-content: center;-->
<!--        gap: 20px;-->
<!--    }-->
<!--    .demoOfDivInDetailedData{-->
<!--        flex: 1;-->
<!--        width: 100%;-->
<!--        height: 100%;-->
<!--        border-radius: 25px;-->
<!--        box-shadow: 2px 2px 15px #bbb;-->
<!--        display: flex;-->
<!--        justify-content: center;-->
<!--        align-items: center;-->
<!--        flex-direction: column;-->
<!--        overflow: hidden;-->

<!--        .sp-center{-->
<!--          display: flex;-->
<!--          align-items: center;-->
<!--          justify-content: center;-->
<!--        }-->
<!--    }-->

<!--</style>-->
