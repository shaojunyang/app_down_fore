<template>
    <div class="app-container">
        <div class="filter-container">
            <el-input placeholder="输入应用名称" v-model="listQuery.keyword" style="width: 200px;"
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
            <!--<el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">-->
            <!--<el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key"/>-->
            <!--</el-select>-->
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
                搜索
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-add"
                       @click="addApp">新增
            </el-button>
            <!--<el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"-->
            <!--@click="exportList">{{ $t('table.export') }}-->
            <!--</el-button>-->
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

            <el-table-column label="应用名称" prop="name" width="100px" align="center">
                <template slot-scope="scope">
                    <span class="cuosor">{{ scope.row.name }}</span>
                </template>
            </el-table-column>


            <el-table-column label="版本号" prop="version" width="80px" align="center">
                <template slot-scope="scope">
                    <span class="cuosor">{{ scope.row.version }}</span>
                </template>
            </el-table-column>

            <!--<el-table-column label="大小" prop="size" width="200px" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.size }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column label="安装url" prop="installUrl" width="200px" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.installUrl }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column label="plist地址" prop="appPlist" width="200px" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.appPlist }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column label="安装短链接" prop="shortIdDesc" width="500px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.shortIdDesc }}</span>
                </template>
            </el-table-column>
            <el-table-column label="密码" prop="password" width="60px" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.password }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column label="复制" width="60px" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--<el-tag>复制</el-tag>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="查看详情" width="100px" align="center">
                <template slot-scope="scope">
                    <el-tag>查看详情</el-tag>
                </template>
            </el-table-column>

            <!--<el-table-column label="下载短链接" prop="shortId" width="200px" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.shortId }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column label="appStrogeUrl" prop="appStrogeUrl" width="200px" align="center">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.appStrogeUrl }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->


            <el-table-column label="操作" width="280" fixed="right">
                <template slot-scope="scope">

                    <el-button class="tag-read" type="primary" @click="copy(scope.row)">复制通知链接</el-button>
                    <el-button type="primary"
                               @click="edit( scope.row,1)">编辑
                    </el-button>
                    <el-button
                            type="danger" @click="delete ( scope.row,0)">
                        删除
                    </el-button>

                </template>
            </el-table-column>

        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
                    @pagination="getList"/>


        <!--   新增   -->

        <el-dialog @dragDialog="" v-el-drag-dialog :visible.sync="dialogPvVisible" title="新增app" width="50%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title" size="large">
                    <el-input v-model="ruleForm.name" placeholder="名称"></el-input>
                </el-form-item>
                <!--<el-form-item label="标题" prop="title" size="large">-->
                <!--<el-input v-model="ruleForm.name" placeholder="名称"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="版本号" prop="content" size="large">
                    <!--<el-input :autosize="{ minRows: 3, maxRows: 30}" type="textarea"-->
                    <!--placeholder="请输入公告内容" v-model="ruleForm.content"></el-input>-->
                    <el-input v-model="ruleForm.version" placeholder="版本号"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" size="large">
                    <!--<el-input :autosize="{ minRows: 3, maxRows: 30}" type="textarea"-->
                    <!--placeholder="请输入公告内容" v-model="ruleForm.content"></el-input>-->
                    <el-input v-model="ruleForm.password" placeholder="版本号"></el-input>
                </el-form-item>
                <el-form-item label="上传安装包" size="large">
                    <el-upload
                            class="upload-demo"
                            drag
                            :on-success="handleAvatarSuccess"
                            action="/api/back/app/upload"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传ipa/apk文件，且不超过100MB</div>
                    </el-upload>

                </el-form-item>
                <!--<el-form-item label="发送给" prop="receiverId">-->
                <!--<el-select v-model="ruleForm.receiverIds" clearable multiple-->
                <!--placeholder="请选择要发送的公司">-->
                <!--<el-option :key="item.userId" v-for="item in adminListData" :label="item.name"-->
                <!--:value="item.userId"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">提交
                    </el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button @click="dialogPvVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


        <!--   编辑  -->

        <el-dialog @dragDialog="" v-el-drag-dialog :visible.sync="editStatus" title="编辑app" width="50%">
            <el-form :model="editObj" :rules="rules" ref="editObj" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标题" prop="title" size="large">
                    <el-input v-model="editObj.name" placeholder="名称"></el-input>
                </el-form-item>
                <!--<el-form-item label="标题" prop="title" size="large">-->
                <!--<el-input v-model="ruleForm.name" placeholder="名称"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="版本号" prop="content" size="large">
                    <!--<el-input :autosize="{ minRows: 3, maxRows: 30}" type="textarea"-->
                    <!--placeholder="请输入公告内容" v-model="ruleForm.content"></el-input>-->
                    <el-input v-model="editObj.version" placeholder="版本号"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password" size="large">
                    <!--<el-input :autosize="{ minRows: 3, maxRows: 30}" type="textarea"-->
                    <!--placeholder="请输入公告内容" v-model="ruleForm.content"></el-input>-->
                    <el-input v-model="editObj.password" placeholder="版本号"></el-input>
                </el-form-item>
                <el-form-item label="上传安装包" size="large">
                    <el-upload
                            class="upload-demo"
                            drag
                            :on-success="handleAvatarSuccess"
                            action="/api/back/app/upload"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传ipa/apk文件，且不超过100MB</div>
                    </el-upload>

                </el-form-item>
                <!--<el-form-item label="发送给" prop="receiverId">-->
                <!--<el-select v-model="ruleForm.receiverIds" clearable multiple-->
                <!--placeholder="请选择要发送的公司">-->
                <!--<el-option :key="item.userId" v-for="item in adminListData" :label="item.name"-->
                <!--:value="item.userId"></el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="update('editObj')">更新
                    </el-button>
                    <el-button @click="resetForm('editObj')">重置</el-button>
                    <el-button @click="editStatus = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


        <!--   详情   -->

        <el-dialog @dragDialog="" v-el-drag-dialog :visible.sync="dialogItemVisable" title="详情" width="70%">
            <el-form>

                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="标题" size="large">
                            <el-input :disabled="true" v-model="assetDetail.name" placeholder="名称"></el-input>
                        </el-form-item>
                        <el-form-item label="版本号" size="large">
                            <el-input :disabled="true" v-model="assetDetail.version" placeholder="名称"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="安装包存储路径" size="large">
                            <el-input :disabled="true" v-model="assetDetail.appStrogeUrl" placeholder="名称"></el-input>
                        </el-form-item>
                        <el-form-item label="plist存储路径" size="large">
                            <el-input :disabled="true" v-model="assetDetail.appPlist" placeholder="名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="安装链接" size="large">
                            <el-input :disabled="true" v-model="assetDetail.shortIdDesc" placeholder="名称"></el-input>
                        </el-form-item>
                        <el-form-item label="item安装链接" size="large">
                            <el-input :disabled="true" v-model="assetDetail.installUrl" placeholder="名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </el-dialog>

    </div>
</template>

<script>

    import Clipboard from 'clipboard';
    import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
    import {toLine, blobDownloadExcelFile} from "../../utils/constApi";
    import {fetchList, fetchPv, createArticle, updateArticle, companyList} from '@/api/article'
    import {
        addApp,
        appList,
        deleteAppApi,
        downloadExcelFileApi,
        startOrDisabledApi,
        updateApp
    } from "../../api/article";
    import waves from '@/directive/waves' // Waves directive
    import {parseTime} from '@/utils'
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

    // const calendarTypeOptions = [
    //     {key: 'CN', display_name: 'China'},
    //     {key: 'US', display_name: 'USA'},
    //     {key: 'JP', display_name: 'Japan'},
    //     {key: 'EU', display_name: 'Eurozone'}
    // ]

    // arr to obj ,such as { CN : "China", US : "USA" }
    // const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    //     acc[cur.key] = cur.display_name
    //     return acc
    // }, {})

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
                // fileList: [],
                ruleForm: {
                    version: "",
                    password: "",
                    name: "",
                    appStrogeUrl: ""
                },
                assetDetail: {},
                dialogItemVisable: false,
                dialogPvVisible: false,
                tableKey: 0,
                list: null,
                total: 0,
                loading: false,
                listLoading: true,
                listQuery: {
                    pageSize: 10,
                    pageNum: 1,
                    // limit: 20,
                    // importance: undefined,
                    orderBy: "update_time-desc",
                    keyword: undefined,
                    // type: undefined,
                    // sort: '+id'
                },
                // importanceOptions: [1, 2, 3],
                // calendarTypeOptions,
                sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
                statusOptions: ['published', 'draft', 'deleted'],
                showReviewer: false,
                // temp: {
                //     id: undefined,
                //     importance: 1,
                //     remark: '',
                //     timestamp: new Date(),
                //     title: '',
                //     type: '',
                //     status: 'published'
                // },
                dialogFormVisible: false,
                dialogStatus: '',
                editStatus: false,
                editObj: {},
                textMap: {
                    update: 'Edit',
                    create: 'Create'
                },
                // dialogPvVisible: false,
                pvData: [],
                rules: {
                    name: [{required: true, message: 'type is required', trigger: 'blur'}],
                    version: [{required: true, message: 'timestamp is required', trigger: 'blur'}],
                    app_stroge_url: [{required: true, message: 'timestamp is required', trigger: 'change'}],
                    password: [{required: true, message: 'title is required', trigger: 'blur'}]
                },
                downloadLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {

            delete(row) {
                var that = this
                this.$confirm('确定要删除吗? 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 确定批准该申请
                    that.comfirmDelete(row);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            comfirmDelete(row) {
                deleteAppApi(row).then(res=>{
                    this.$message.success(res.data.msg)
                })

            },
            edit(row) {
                this.editStatus = true
                this.editObj = row
            },
            // 操作：复制通知链接
            copy(row) {
                var Url = row.shortIdDesc;
                var clipboard = new Clipboard('.tag-read', {
                    text: function () {
                        return Url;
                    }
                });
                clipboard.on('success', e => {
                    this.$message.success("复制成功")
                    // 释放内存
                    clipboard.destroy()
                })
                clipboard.on('error', e => {
                    // 不支持复制
                    this.$message.warning("该浏览器不支持自动复制!")
                    // 释放内存
                    clipboard.destroy()
                })
            },

            //点击订单单号时间
            cellClick(row, column, cell, event) {

                console.log("row:", row);
                // console.log("column:", column);
                // console.log("cell:", cell);
                if (column.label === "查看详情") {
                    //显示领用单详情弹出框
                    this.dialogItemVisable = true;
                    this.assetDetail = row;
                }
                if (column.label === "复制") {

                }

            },

            update(formName) {


                // if (!this.editObj.appStrogeUrl) {
                //     this.$message.error("等带图片上传完成")
                //     return
                // }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交按钮置为 加载中
                        this.loading = true;
                        // 提交
                        updateApp(this.editObj).then(res => {
                            console.log("res:", res);
                        }).finally(() => {
                            this.loading = false;
                            this.editStatus = false
                            this.getList()
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },


            submitForm(formName) {


                if (!this.ruleForm.appStrogeUrl) {
                    this.$message.error("等带图片上传完成")
                    return
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交按钮置为 加载中
                        this.loading = true;
                        // 提交
                        addApp(this.ruleForm).then(res => {
                            console.log("res:", res);
                        }).finally(() => {
                            this.loading = false;
                            this.dialogPvVisible = false
                            this.getList()
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },

            handleAvatarSuccess(res, file) {
                // console.log("res:", res);
                // console.log("file:", file);
                // this.ruleForm.app_stroge_url = URL.createObjectURL(file.raw);
                this.ruleForm.appStrogeUrl = res.msg
            },
            // beforeAvatarUpload(file) {
            //     const isJPG = file.type === 'image/jpeg';
            //     const isLt2M = file.size / 1024 / 1024 < 200;
            //
            //     if (!isJPG) {
            //         this.$message.error('上传头像图片只能是 JPG 格式!');
            //     }
            //     if (!isLt2M) {
            //         this.$message.error('上传头像图片大小不能超过 200MB!');
            //     }
            //     return isJPG && isLt2M;
            // },
            addApp() {
                this.dialogPvVisible = true
            },
            // 启用公司 或者禁用公司
            // startOrDisabled(row) {
            //     this.loading = true
            //     // 禁用公司或者启用公司
            //     startOrDisabledApi({
            //         id: row.id
            //     }).then(response => {
            //         console.log("response:", response);
            //         this.$message.success(response.data.msg)
            //         // 刷新
            //     }).finally(() => {
            //         this.getList()
            //         this.loading = false;
            //     })
            //
            // },
            getList() {
                this.listLoading = true
                appList(this.listQuery).then(response => {
                    console.log("response:", response);
                    this.list = response.data.data.list
                    this.total = response.data.data.total
                    console.log("this.list:", this.list);
                    console.log("this.total:", this.total);
                    //
                    // Just to simulate the time of the request
                    // setTimeout(() => {
                    // }, 1.5 * 1000)
                }).finally(() => {
                    this.listLoading = false
                })
            },

            // exportList() {
            //     // 创建链接。并触发下载
            //     let href = "/api/back/export/export_all_company";
            //     // trigerDownloadFile(href);
            //
            //     downloadExcelFileApi(href).then(res => {
            //         const fileName = "公司列表_" + new Date().getTime().toString() + ".xlsx"
            //         blobDownloadExcelFile(res, fileName);
            //     })
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
                console.log("sortData:", sortData);
                //组装排序字段
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
            // resetTemp() {
            //     this.temp = {
            //         id: undefined,
            //         importance: 1,
            //         remark: '',
            //         timestamp: new Date(),
            //         title: '',
            //         status: 'published',
            //         type: ''
            //     }
            // },
            // handleCreate() {
            //     this.resetTemp()
            //     this.dialogStatus = 'create'
            //     this.dialogFormVisible = true
            //     this.$nextTick(() => {
            //         this.$refs['dataForm'].clearValidate()
            //     })
            // },
            // createData() {
            //     this.$refs['dataForm'].validate((valid) => {
            //         if (valid) {
            //             this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            //             this.temp.author = 'vue-element-admin'
            //             createArticle(this.temp).then(() => {
            //                 this.list.unshift(this.temp)
            //                 this.dialogFormVisible = false
            //                 this.$notify({
            //                     title: '成功',
            //                     message: '创建成功',
            //                     type: 'success',
            //                     duration: 2000
            //                 })
            //             })
            //         }
            //     })
            // },
            // handleUpdate(row) {
            //     this.temp = Object.assign({}, row) // copy obj
            //     this.temp.timestamp = new Date(this.temp.timestamp)
            //     this.dialogStatus = 'update'
            //     this.dialogFormVisible = true
            //     this.$nextTick(() => {
            //         this.$refs['dataForm'].clearValidate()
            //     })
            // },
            // updateData() {
            //     this.$refs['dataForm'].validate((valid) => {
            //         if (valid) {
            //             const tempData = Object.assign({}, this.temp)
            //             tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            //             updateArticle(tempData).then(() => {
            //                 for (const v of this.list) {
            //                     if (v.id === this.temp.id) {
            //                         const index = this.list.indexOf(v)
            //                         this.list.splice(index, 1, this.temp)
            //                         break
            //                     }
            //                 }
            //                 this.dialogFormVisible = false
            //                 this.$notify({
            //                     title: '成功',
            //                     message: '更新成功',
            //                     type: 'success',
            //                     duration: 2000
            //                 })
            //             })
            //         }
            //     })
            // },
            // handleDelete(row) {
            //     this.$notify({
            //         title: '成功',
            //         message: '删除成功',
            //         type: 'success',
            //         duration: 2000
            //     })
            //     const index = this.list.indexOf(row)
            //     this.list.splice(index, 1)
            // },
            // handleFetchPv(pv) {
            //     fetchPv(pv).then(response => {
            //         this.pvData = response.data.pvData
            //         this.dialogPvVisible = true
            //     })
            // },
        }
    }
</script>
<style>
    .cuosor {
        cursor: pointer;
    }
</style>
