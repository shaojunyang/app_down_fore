<template>

    <div class="app-container">
        <div class="filter-container">
            <el-button type="primary" @click=" dialogPvVisible = true">新增</el-button>

        </div>
        <!--<el-input v-model="listQuery.content">-->
        <!--</el-input>-->
        <!--<el-button @click="getList">发送给所有人</el-button>-->

        <!--<el-input v-model="listQuery.msg">-->
        <!--</el-input>-->
        <!--<el-button @click="send">发送给所有人</el-button>-->


        <!--<el-input v-model="listQuery.msg">-->
        <!--</el-input>-->
        <!--<el-button @click="receive">发送给所有人</el-button>-->


        <el-dialog @dragDialog="" v-el-drag-dialog :visible.sync="dialogPvVisible" title="新增公告" width="50%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title" size="large">
                    <el-input v-model="ruleForm.title" placeholder="请输入公告标题"></el-input>
                </el-form-item>
                <el-form-item label="发送内容" prop="content" size="large">
                    <el-input :autosize="{ minRows: 3, maxRows: 30}" type="textarea"
                              placeholder="请输入公告内容" v-model="ruleForm.content"></el-input>
                </el-form-item>
                <!--<el-form-item label="发送给" prop="receiverId">-->
                <!--<el-select v-model="ruleForm.receiverIds" clearable multiple-->
                <!--placeholder="请选择要发送的公司">-->
                <!--<el-option :key="item.userId" v-for="item in adminListData" :label="item.name"-->
                <!--:value="item.userId"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="addPublicNotice('ruleForm')">提交
                    </el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="dialogPvVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


        <el-table
                v-loading="listLoading"
                :key="tableKey"
                :data="noticeList"
                border
                fit
                @sort-change="sortChange"
                highlight-current-row
                style="width: 100%;" :default-sort="{prop: 'date', order: 'descending'}"
        >
            <!--<el-table-column :label="$t('table.id')" prop="id" sortable="custom" align="center" width="65">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.id }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="id" align="center" label='编号' width="100px" sortable>
                <template slot-scope="scope">
                    {{((listQuery.pageNum-1)*listQuery.pageSize)+scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column prop="title" :label="$t('通告标题')" width="150px" align="center" sortable>
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="通告内容" min-width="400px" sortable>
                <template slot-scope="scope">
                    <span class="detail-content">
                    {{ scope.row.content}}
                    </span>
                    <!--<span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.description }}</span>-->
                    <!--<el-tag>{{ scope.row.type | typeFilter }}</el-tag>-->
                </template>
            </el-table-column>

            <el-table-column prop="sendTime" label="发送时间" min-width="250px" sortable>
                <template slot-scope="scope">
                    <span>
                    {{ scope.row.sendTime }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="id" label="接收方" min-width="250px" sortable>
                <template slot-scope="scope">
                    <span>全部客户</span>
                </template>
            </el-table-column>

        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
                    @pagination="getNoticeList"/>

    </div>
</template>

<script>

    import {toLine} from "../../utils/constApi";
    import {sendNotice, noticeList} from '../../api/article'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
    export default {
        name: 'notice',
        components: {Pagination},
        directives: {elDragDialog},
        data() {
            return {
                loading: false,
                dialogPvVisible: false,
                noticeList: [],
                tableKey: 0,
                total: 0,
                listLoading: false,
                listQuery: {
                    pageSize: 10,
                    pageNum: 1,
                    orderBy: "create_time-desc",
                    keyword: undefined,
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入内容', trigger: 'blur'}
                    ],
                    // receiverIds: [
                    //     {required: true, message: '请选择发送人', trigger: 'change'}
                    // ]
                },
                ruleForm: {
                    app_stroge_url: undefined,
                    name: undefined,
                    title: '',
                },
            }
        },
        mounted() {
            // 获取通知列表
            this.getNoticeList()
        },
        methods: {
            addPublicNotice(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        // 发送公告
                        sendNotice(this.ruleForm).then(response => {
                            console.log('response:', response)
                            let msg = response.data.msg
                            this.$message.success(msg)
                            // 刷新数据
                            this.getNoticeList();
                            this.dialogPvVisible = false
                        })
                        this.loading = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            getNoticeList() {
                this.listLoading = true
                noticeList(this.listQuery).then(response => {
                    console.log('response:', response)
                    this.noticeList = response.data.data.list
                    this.total = response.data.data.total
                    this.listLoading = false
                })
            },
            resetForm() {

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
                this.getNoticeList()
                // this.getData();

            },
        }
    }
</script>

<style scoped lang="scss">
    .detail-content {
        display: inline-block;
        width: 300px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
