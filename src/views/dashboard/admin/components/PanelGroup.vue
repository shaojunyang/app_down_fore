<template>
    <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <router-link to="/table/CompanyListTable">
                <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                    <div class="card-panel-icon-wrapper icon-people">
                        <svg-icon icon-class="peoples" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <!--<div class="card-panel-text">New Visits</div>-->
                        <div class="card-panel-text">公司总数</div>
                        <count-to :start-val="0" :end-val="companyCount" :duration="2600" class="card-panel-num"/>
                    </div>
                </div>
            </router-link>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">

            <router-link to="/table/asset">
                <!--点击验证动画效果-->
                <div class="card-panel" @click="handleSetLineChartData('messages')">
                    <div class="card-panel-icon-wrapper icon-message">
                        <svg-icon icon-class="message" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">资产个数</div>
                        <count-to :start-val="0" :end-val="assetCount" :duration="3000" class="card-panel-num"/>
                    </div>
                </div>
            </router-link>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">

            <router-link to="/table/log">
                <div class="card-panel" @click="handleSetLineChartData('purchases')">
                    <div class="card-panel-icon-wrapper icon-money">
                        <svg-icon icon-class="money" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">操作记录</div>
                        <count-to :start-val="0" :end-val="systemLogCount" :duration="3200" class="card-panel-num"/>
                    </div>
                </div>
            </router-link>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">

            <router-link to="/table/notice">
                <div class="card-panel" @click="handleSetLineChartData('shoppings')">
                    <div class="card-panel-icon-wrapper icon-shopping">
                        <svg-icon icon-class="shopping" class-name="card-panel-icon"/>
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">已发通告</div>
                        <count-to :start-val="0" :end-val="sendCount" :duration="3600" class="card-panel-num"/>
                    </div>
                </div>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
    import CountTo from 'vue-count-to'
    import {getAssetCount, getSendCount, getCompanyCount, getSystemLogCount} from "../../../../api/article";

    export default {
        components: {
            CountTo
        },
        created() {
            this.getCount()
        },
        data() {
            return {
                assetCount: 0,
                sendCount: 0,
                companyCount: 0,
                systemLogCount: 0
            }
        },
        methods: {
            // 获取资产个数和公司个数
            getCount() {
                getAssetCount().then(response => {
                    console.log("response:", response);
                    this.assetCount = response.data.data;
                })
                getCompanyCount().then(response => {
                    this.companyCount = response.data.data;
                })
                getSystemLogCount().then(response => {
                    this.systemLogCount = response.data.data;
                })
                getSendCount().then(response => {
                    this.sendCount = response.data.data;
                })
            },
            handleSetLineChartData(type) {
                this.$emit('handleSetLineChartData', type)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .panel-group {
        margin-top: 18px;
        .card-panel-col {
            margin-bottom: 32px;
        }
        .card-panel {
            height: 108px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            border-color: rgba(0, 0, 0, .05);
            &:hover {
                .card-panel-icon-wrapper {
                    color: #fff;
                }
                .icon-people {
                    background: #40c9c6;
                }
                .icon-message {
                    background: #36a3f7;
                }
                .icon-money {
                    background: #f4516c;
                }
                .icon-shopping {
                    background: #34bfa3
                }
            }
            .icon-people {
                color: #40c9c6;
            }
            .icon-message {
                color: #36a3f7;
            }
            .icon-money {
                color: #f4516c;
            }
            .icon-shopping {
                color: #34bfa3
            }
            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }
            .card-panel-icon {
                float: left;
                font-size: 48px;
            }
            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px;
                margin-left: 0px;
                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }
</style>
