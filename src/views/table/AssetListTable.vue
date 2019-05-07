<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="输入资产编号或名称" v-model="listQuery.keyword" style="width: 200px;"
                      class="filter-item" @keyup.enter.native="handleFilter"/>
            <!--<el-select v-model="listQuery.importance" :placeholder="$t('table.importance')" clearable-->
            <!--style="width: 90px" class="filter-item">-->
            <!--<el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"/>-->
            <!--</el-select>-->
            <!--<el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item"-->
            <!--style="width: 130px">-->
            <!--<el-option v-for="item in calendarTypeOptions" :key="item.key"-->
            <!--:label="item.display_name+'('+item.key+')'" :value="item.key"/>-->
            <!--</el-select>-->
            <!---->
            <!--<el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">-->
            <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>-->
            <!--</el-select>-->

            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{
                $t('table.search') }}
            </el-button>
            <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"-->
            <!--@click="handleCreate">{{ $t('table.add') }}-->
            <!--</el-button>-->
            <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                       @click="downloadAllFile">{{ $t('table.export') }}
            </el-button>
            <!--<el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;"-->
            <!--@change="tableKey=tableKey+1">{{ $t('table.reviewer') }}-->
            <!--</el-checkbox>-->


            <!--   高级搜索   -->
            <el-popover
                    @show="willShowSearchPopover"
                    placement="bottom"
                    width="500"
                    trigger="click"
                    v-model="showSearchVisible">
                <div class="table">
                    <div class="crumbs" style="margin-bottom: 10px;">
                        分字段搜索
                    </div>
                    <div class="container">
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-input v-model="listQuery.assetCode" placeholder="资产编码"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-input v-model="listQuery.assetName" placeholder="资产名称"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-input v-model="listQuery.model" placeholder="型号"></el-input>
                            </el-col>
                        </el-row>
                        <br>
                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-input v-model="listQuery.assetCode" placeholder="渠道"></el-input>
                            </el-col>
                            <!--<el-col :span="8">-->
                            <!--<el-input v-model="listQuery.assetName" placeholder="使用期限"></el-input>-->
                            <!--</el-col>-->
                            <el-col :span="8">
                                <el-input v-model="listQuery.snNo" placeholder="SN号"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-input v-model="listQuery.remarks" placeholder="备注信息"></el-input>
                            </el-col>
                        </el-row>
                        <br>
                        <el-row :gutter="20">

                        </el-row>
                        <br>
                        <div class="crumbs" style="margin-bottom: 10px;">
                            条件筛选
                        </div>

                        <el-row :gutter="20">
                            <el-col :span="8">
                                <el-select v-model="listQuery.assetStatus" placeholder="资产状态">
                                    <el-option
                                            v-for="item in assetStatusEnum"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-select v-model="listQuery.source" placeholder="资产来源">
                                    <el-option
                                            v-for="item in assetSourceEnum"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="8">
                                <el-select v-model="listQuery.companyId" placeholder="公司">
                                    <el-option
                                            v-for="item in companyList"
                                            :key="item.id"
                                            :label="item.companyName"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>

                        <br>
                        <!--<el-row :gutter="20">-->
                        <!--<el-col :span="8">-->
                        <!--<el-select v-model="listQuery.useDepartmentId" placeholder="部门">-->
                        <!--<el-option-->
                        <!--v-for="item in department"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-col>-->
                        <!--<el-col :span="8">-->
                        <!--<el-select v-model="listQuery.categoryId" placeholder="类别">-->
                        <!--<el-option-->
                        <!--v-for="item in categoryList"-->
                        <!--:key="item.id"-->
                        <!--:label="item.companyName"-->
                        <!--:value="item.id">-->
                        <!--</el-option>-->
                        <!--</el-select>-->
                        <!--</el-col>-->
                        <!--</el-row>-->
                        <br>
                        <el-row :gutter="20">

                            <el-col :span="12">
                                <el-date-picker
                                        v-model="listQuery.receiveTimeStart"
                                        type="date"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="领用开始时间">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="12">
                                <el-date-picker
                                        v-model="listQuery.receiveTimeEnd"
                                        type="date"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="领用结束时间">
                                </el-date-picker>
                            </el-col>
                        </el-row>

                        <br>

                        <el-row :gutter="20">

                            <el-col :span="12">
                                <el-date-picker
                                        v-model="listQuery.joinStockTimeStart"
                                        type="date"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="入库开始时间">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="12">
                                <el-date-picker
                                        v-model="listQuery.joinStockTimeEnd"
                                        type="date"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        placeholder="入库结束时间">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                        <br>


                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="searchSelect()">查询</el-button>
                            <el-button size="mini" @click="resetSearchFixed()">重置</el-button>
                        </div>
                    </div>
                </div>
                <el-tag size="medium" style="float: right;margin-right: 30px;" slot="reference">高级搜索</el-tag>
            </el-popover>

            <!--   列设置   -->
            <el-popover
                    placement="bottom"
                    width="100"
                    trigger="hover"
                    v-model="showSetColumnVisible">
                <div class="table">
                    <div class="container">
                        <el-checkbox :indeterminate="columnObj.isIndeterminate" v-model="columnObj.checkAll"
                                     @change="handleCheckAllChange">
                            全选
                        </el-checkbox>
                        <div style="margin: 10px 0;"></div>
                        <el-checkbox-group v-model="columnObj.checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in columnObj.cities" :label="city" :key="city">
                                {{city}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <el-tag size="medium" style="float: right;margin-right: 30px;" slot="reference">列设置</el-tag>
            </el-popover>
        </div>

        <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="list"
                border
                fit
                @sort-change="sortChange"
                @cell-click="cellClick"
                highlight-current-row
                style="width: 100%;" :default-sort="{prop: 'date', order: 'descending'}"
        >
            <!--<el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.id }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column v-if="columnObj.checkedCities.includes('ID')" prop="id" align="center"
                             :label="$t('table.id')" width="100px" sortable>
                <template slot-scope="scope">
                    {{((listQuery.pageNum-1)*listQuery.pageSize)+scope.$index + 1}}
                    <!--{{// scope.$index}}-->
                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('资产名称')" prop="assetName" :label="$t('资产名称')"
                             width="330px" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.assetName}}</span>

                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('资产编码')" prop="assetCode" label="资产编码"
                             width="250px" align="center" sortable>
                <template slot-scope="scope">
                    <el-tag type="primary">{{ scope.row.assetCode}}</el-tag>

                    <el-tag type="success" style="float: right;">查看详情</el-tag>
                    <!--<span>{{ scope.row.assetCode}}</span>-->
                    <!--<span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.companyAddress }}</span>-->
                    <!--<el-tag>{{ scope.row.type | typeFilter }}</el-tag>-->
                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('资产状态')" prop="assetStatus" label="资产状态"
                             min-width="170px" sortable>
                <template slot-scope="scope">
                    <!--<span>{{ // scope.row.assetStatusStr}}</span>-->
                    <!--<span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.companyAddress }}</span>-->
                    <!--<el-tag>{{ // scope.row.assetStatusStr}}</el-tag>-->
                    <el-tag :type="statusColor[scope.row.assetStatus]"
                            disable-transitions>{{scope.row.assetStatusStr}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column v-if="columnObj.checkedCities.includes('创建时间')" prop="createTime" label="创建时间"
                             width="170px" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('领用时间')" prop="receiveTime" label="入库时间"
                             width="170px" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.receiveTime }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('资产类别')" prop="categoryName" label="资产类别"
                             width="150px" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.categoryName }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('品牌')"
                             prop="brandName" label="品牌" width="150px" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.brandName }}</span>
                </template>
            </el-table-column>


            <el-table-column v-if="columnObj.checkedCities.includes('品牌')" prop="SN号" label="SN号" width="150px"
                             align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.snNo }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('保修起始时间')" prop="warrantyStartTime" label="保修起始时间"
                             width="170px" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.warrantyStartTime }}</span>
                </template>
            </el-table-column>

            <el-table-column v-if="columnObj.checkedCities.includes('过保时间')" prop="warrantyEndTime" label="过保时间"
                             width="170px" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.warrantyEndTime }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('来源')" prop="sourceStr" label="来源" width="150px"
                             align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.sourceStr }}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="columnObj.checkedCities.includes('金额')" prop="amount" label="金额" width="150px"
                             align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.amount }}</span>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
                    @pagination="getList"/>


        <el-dialog @dragDialog="handleDrag" width="60%" v-el-drag-dialog :visible.sync="dialogPvVisible" title="资产详情">
            <div class="table">
                <div class="crumbs">
                </div>
                <div class="container">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            资产名称:
                            <el-button type="text"> {{ assetDetail.assetName}}</el-button>
                        </el-col>
                        <el-col :span="8">
                            资产类目:
                            <el-button type="text"> {{ assetDetail.categoryName}}</el-button>
                        </el-col>
                        <el-col :span="8">
                            SN号
                            <el-button type="text"> {{ assetDetail.snNo}}</el-button>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            品牌:
                            <el-button type="text"> {{ assetDetail.brandName}}</el-button>
                        </el-col>
                        <el-col :span="8">
                            购入时间
                            <el-button type="text"> {{ assetDetail.purchaseTime}}</el-button>
                        </el-col>
                        <el-col :span="8">
                            使用期限
                            <el-button type="text"> {{ assetDetail.duration}}</el-button>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            入库时间
                            <el-button type="text"> {{ assetDetail.joinStockDateTime}}</el-button>
                        </el-col>
                        <el-col :span="8">
                            保修起始:
                            <el-button type="text"> {{ assetDetail.warrantyEndTime}}</el-button>
                        </el-col>
                        <el-col :span="8">
                            过保时间
                            <el-button type="text"> {{ assetDetail.warrantyStartTime}}</el-button>
                        </el-col>
                    </el-row>

                    <br>

                    <el-row :gutter="20">
                        <el-col :span="8">
                            备注:
                            <el-button type="text"> {{ assetDetail.remarks}}</el-button>
                        </el-col>
                    </el-row>

                    <br>
                    <hr>

                    <br>
                    扩展信息
                    <el-row :gutter="20">
                        <br>
                        <el-col :span="8" :key="item.id"
                                v-for=" (item,index) in  assetDetail.assetExtendInfoDetailList">
                            {{item.extentPropertiesKey }}:
                            <el-button type="text">{{item.extentPropertiesValue}}</el-button>
                        </el-col>
                    </el-row>

                    <br>

                </div>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
        </span>
        </el-dialog>


    </div>
</template>

<script>

    import {
        fetchList,
        fetchPv,
        createArticle,
        exportAssetList,
        updateArticle,
        companyList,
        assetList
    } from '@/api/article'
    import waves from '@/directive/waves' // Waves directive
    import {parseTime} from '@/utils'
    import {toLine, objValueSetNull, createURL, blobDownloadExcelFile} from "../../utils/constApi";
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    // import {trigerDownloadFile} from "../../utils/constApi";

    import elDragDialog from '@/directive/el-dragDialog'
    import {downloadExcelFileApi} from "../../api/article"; // base on element-ui
    const calendarTypeOptions = [
        {key: 'CN', display_name: 'China'},
        {key: 'US', display_name: 'USA'},
        {key: 'JP', display_name: 'Japan'},
        {key: 'EU', display_name: 'Eurozone'}
    ]


    const cityOptions = ['ID', '资产名称', '资产编码', '资产状态', '领用时间', '资产类别', '品牌', '保修起始时间', '过保时间', '来源', '金额'];
    // arr to obj ,such as { CN : "China", US : "USA" }
    const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
        acc[cur.key] = cur.display_name
        return acc
    }, {})

    export default {
        name: 'ComplexTable',
        components: {Pagination},
        directives: {waves, elDragDialog},
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'info',
                    deleted: 'danger'
                }
                return statusMap[status]
            },
            typeFilter(type) {
                return calendarTypeKeyValue[type]
            }
        },
        data() {
            return {
                // 列设置
                columnObj: {
                    checkAll: false,
                    // checkedCities: ['上海', '北京'],
                    checkedCities: localStorage.getItem("columnSetAdmin") === null ? cityOptions : localStorage.getItem("columnSetAdmin").split(","),
                    cities: cityOptions,
                    isIndeterminate: true,
                    columnSet: localStorage.getItem("columnSetAdmin"),
                    // columnSetArr: localStorage.getItem("columnSet").split(",")
                },


                companyList: [],
                assetStatusEnum: [
                    {label: "在用", value: 10},
                    {label: "闲置", value: 20},
                    {label: "维修", value: 30},
                    {label: "报废", value: 40},
                    {label: "审核", value: 50},
                    {label: "申请领用中", value: 60},
                    {label: "申请退库中", value: 70},
                ],
                assetSourceEnum: [
                    {label: "自购", value: 0},
                    {label: "租赁", value: 10},
                    {label: "赠送", value: 20},
                    {label: "借用", value: 30},
                    {label: "自产", value: 40},
                    {label: "其他", value: 50}
                ],
                showSetColumnVisible: false,
                showSearchVisible: false,
                statusColor: {
                    10: "success",
                    20: "primary",
                    30: "info",
                    40: "danger",
                    50: "warning",
                    60: "warning"
                },
                assetDetail: {},
                tableKey: 0,
                list: null,
                total: 0,
                listLoading: true,
                listQuery: {
                    // 是否高级搜索
                    isHighSearch: false,
                    pageSize: 10,
                    pageNum: 1,
                    orderBy: "update_time-desc",
                    keyword: undefined,

                    // 高级搜索字段
                    assetName: undefined,
                    companyId: undefined,
                    // 公司id
                    assetCode: undefined,
                    model: undefined,
                    source: undefined,
                    assetStatus: undefined,
                    snNo: undefined,
                    remarks: undefined,
                    // 入库开始和入库结束
                    joinStockTimeStart: undefined,
                    joinStockTimeEnd: undefined,
                    // 领用开始时间
                    receiveTimeStart: undefined,
                    // 领用结束时间
                    receiveTimeEnd: undefined
                },
                importanceOptions: [1, 2, 3],
                calendarTypeOptions,
                sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
                statusOptions: ['published', 'draft', 'deleted'],
                showReviewer: false,
                temp: {
                    id: undefined,
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    type: '',
                    status: 'published'
                },
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                dialogPvVisible: false,
                pvData: [],
                rules: {
                    type: [{required: true, message: 'type is required', trigger: 'change'}],
                    timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
                    title: [{required: true, message: 'title is required', trigger: 'blur'}]
                },
                downloadLoading: false
            }
        },
        created() {
            this.getList()
        },
        computed: {},
        methods: {

            // 列全选
            handleCheckAllChange(val) {
                this.listLoading = false
                this.columnObj.checkedCities = val ? cityOptions : [];
                this.columnObj.isIndeterminate = false;
            },
            // 选择某个城市
            handleCheckedCitiesChange(value) {
                this.listLoading = true
                let checkedCount = value.length;
                this.columnObj.checkAll = checkedCount === this.columnObj.cities.length;
                this.columnObj.isIndeterminate = checkedCount > 0 && checkedCount < this.columnObj.cities.length;
                console.log("this.columnObj.cities:", this.columnObj.checkedCities);
                // 存储 列设置到 localStorage
                localStorage.setItem("columnSetAdmin", this.columnObj.checkedCities.toString())
                this.columnObj.columnSet = this.columnObj.checkedCities.toString()
                this.columnObj.columnSetArr = this.columnObj.checkedCities
                console.log(":this.columnObj.checkedCities", this.columnObj.checkedCities);
                this.listLoading = false
            },


            // 高级查询
            searchSelect() {
                this.showSearchVisible = false
                // 重新查询数据库列表
                // 设置为高级搜索
                this.listQuery.isHighSearch = true

                this.getList()

                // setTimeout(() => {
                // 设置普通搜索
                // this.listQuery.isHighSearch = false
                // }, 3000)

            },
            // 显示高级搜索pop时触发
            willShowSearchPopover() {
                // 获取公司列表
                companyList({}).then(response => {
                    this.companyList = response.data.data.list
                    console.log("this.total:", this.total);
                })

            },

            // 重置高级查询字段
            resetSearchFixed() {

                this.showSearchVisible = true

                // 把查询对象字段置为空
                objValueSetNull(this.listQuery)

                // 初始化对象中的几个字段的默认值
                this.listQuery.pageSize = 10
                this.listQuery.pageNum = 1
                this.listQuery.orderBy = "update_time-desc"
            },
            filterHandler(value, row, column) {
                console.log("value:", value);
                console.log("row:", row);
                console.log("column:", column);
                const property = column['property'];
                return row[property] === value;
            },
            // 点击单元行
            cellClick(row, column, cell, event) {
                //显示操作数据详情弹出框
                console.log("row:", row);
                console.log("column:", column);
                console.log("cell:", cell);
                // if (column.property === "assetCode") {
                //     alert("11");
                //     // this.dialogPvVisible = true;
                //     // let jsonObj = eval('(' + row.params + ')');
                //     // this.params = JSON.stringify(jsonObj, null, 4);
                // }


                if (column.label === "资产编码") {
                    //显示领用单详情弹出框
                    this.dialogPvVisible = true;
                    // console.log("row:", row);
                    this.assetDetail = row;
                    // console.log("assetDetail:", this.assetDetail);
                }


                // console.log("pa:", this.params);
            },
            getList() {
                this.listLoading = true
                assetList(this.listQuery).then(response => {
                    console.log("response:", response);
                    this.list = response.data.data.list
                    this.total = response.data.data.total
                    console.log("this.list:", this.list);
                    console.log("this.total:", this.total);
                    //
                    // Just to simulate the time of the request
                    // setTimeout(() => {
                    this.listLoading = false
                    // }, 1.5 * 1000)
                })
            },

            // 导出所有资产
            downloadAllFile() {
                // exportAssetList(this.listQuery).then(response => {
                //     console.log("response:", response);
                //     console.log("rresponse.data:", response.data);
                //     var binaryData = [];
                //     //
                //     binaryData.push(response.data);
                //     let fileType = "application/ms-excel"
                //     this.url = window.URL.createObjectURL(new Blob(binaryData, {type: fileType}));
                //
                //     console.log(this.url);
                //
                // })
                // 创建链接。并触发下载
                let url = createURL("/export/export_all_asset",this.listQuery)
                // trigerDownloadFile(url);
                downloadExcelFileApi(url).then(res => {
                    const fileName = "公司列表_" + new Date().getTime().toString() + ".xlsx"
                    blobDownloadExcelFile(res, fileName);
                })

                // console.log("parseParam:", parseParam(this.listQuery));
            },
            // 导出本页资产
            // exportCurrentPageAsset() {
            //     // 创建链接。并触发下载
            //     let href = "/export/export_current_page_asset?pageSize=" + this.currentPageSize;
            //     trigerDownloadFile(href);
            // },
            handleFilter() {
                this.listQuery.pageNum = 1
                this.getList()
            },
            handleModifyStatus(row, status) {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                row.status = status
            },
            sortChange(sortData) {
                //组装排序字段
                console.log("sortDate:", sortData);
                let newProp = toLine(sortData.prop);
                let newOrder;
                if (sortData.order.includes("desc")) {
                    newOrder = "desc";
                } else {
                    newOrder = "asc";
                }
                this.listQuery.orderBy = newProp + "-" + newOrder;
                //查询
                this.listQuery.pageNum = 1
                this.getList()
                // this.getData();

            },

            handleDrag() {

            },
            // sortChange(data) {
            //     const {prop, order} = data
            //     if (prop === 'id') {
            //         this.sortByID(order)
            //     }
            // },
            sortByID(order) {
                if (order === 'ascending') {
                    this.listQuery.sort = '+id'
                } else {
                    this.listQuery.sort = '-id'
                }
                this.handleFilter()
            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    importance: 1,
                    remark: '',
                    timestamp: new Date(),
                    title: '',
                    status: 'published',
                    type: ''
                }
            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            createData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
                        this.temp.author = 'vue-element-admin'
                        createArticle(this.temp).then(() => {
                            this.list.unshift(this.temp)
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row) // copy obj
                this.temp.timestamp = new Date(this.temp.timestamp)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
                this.$nextTick(() => {
                    this.$refs['dataForm'].clearValidate()
                })
            },
            updateData() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        const tempData = Object.assign({}, this.temp)
                        tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                        updateArticle(tempData).then(() => {
                            for (const v of this.list) {
                                if (v.id === this.temp.id) {
                                    const index = this.list.indexOf(v)
                                    this.list.splice(index, 1, this.temp)
                                    break
                                }
                            }
                            this.dialogFormVisible = false
                            this.$notify({
                                title: '成功',
                                message: '更新成功',
                                type: 'success',
                                duration: 2000
                            })
                        })
                    }
                })
            },
            handleDelete(row) {
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                const index = this.list.indexOf(row)
                this.list.splice(index, 1)
            },
            handleFetchPv(pv) {
                fetchPv(pv).then(response => {
                    this.pvData = response.data.pvData
                    this.dialogPvVisible = true
                })
            },
            handleDownload() {
                this.downloadLoading = true
                import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = ['资产名称']
                    const filterVal = ['assetName']
                    const data = this.formatJson(filterVal, this.list)
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: 'table-list'
                    })
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
        }
    }
</script>
