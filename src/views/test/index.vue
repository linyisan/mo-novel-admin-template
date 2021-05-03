<template>
  <div class="search">
<!--    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
          <FormItem label="用户名" prop="username">
            <Input type="text" v-model="searchForm.username" placeholder="请输入用户名" clearable style="width: 200px"/>
          </FormItem>
          <FormItem label="性别" prop="sex">
            <dict v-model="searchForm.sex" dict="sex" transfer style="width:200px"/>
          </FormItem>
          <span v-if="drop">
            <FormItem label="邮箱" prop="email">
              <Input type="text" v-model="searchForm.email" placeholder="请输入邮箱" clearable style="width: 200px"/>
            </FormItem>
            <FormItem label="手机" prop="mobile">
              <Input type="text" v-model="searchForm.mobile" placeholder="请输入手机" clearable style="width: 200px"/>
            </FormItem>
            <FormItem label="角色" prop="roleId">
              <Select v-model="searchForm.roleId" placeholder="请选择" clearable style="width: 200px">
                <Option value="0">请自行编辑下拉菜单</Option>
              </Select>
            </FormItem>
          </span>
          <FormItem style="margin-left:-35px;" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
            <a class="drop-down" @click="dropDown">
              {{dropDownContent}}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </FormItem>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="add" type="primary" icon="md-add">添加</Button>
        <Button @click="delAll" icon="md-trash">批量删除</Button>
        <Button @click="getDataList" icon="md-refresh">刷新</Button>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>
      </Row>
      <Alert show-icon v-show="openTip">
        已选择 <span class="select-count">{{selectList.length}}</span> 项
        <a class="select-clear" @click="clearSelectAll">清空</a>
      </Alert>
      <Table :loading="loading" border :columns="columns" :data="data" ref="table" sortable="custom" @on-sort-change="changeSort" @on-selection-change="changeSelect"></Table>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]" size="small" show-total show-elevator show-sizer></Page>
      </Row>
    </Card>
    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable='false' :width="500">
      <Form ref="form" :model="form" :rules="formValidate" :label-width="100" label-position="left">
        <FormItem label="用户名" prop="username" >
          <Input v-model="form.username" clearable/>
        </FormItem>
        <FormItem label="密码" prop="password" >
          <password v-model="form.password"></password>
        </FormItem>
        <FormItem label="头像" prop="avatar" class="form-noheight">
          <upload-pic-input v-model="form.avatar"></upload-pic-input>
        </FormItem>
        <FormItem label="性别" prop="sex" >
          <Select v-model="form.sex" clearable>
            <Option value="0">请自行编辑下拉菜单</Option>
          </Select>
        </FormItem>
        <FormItem label="邮箱" prop="email" >
          <Input v-model="form.email" clearable/>
        </FormItem>
        <FormItem label="手机" prop="mobile" >
          <Input v-model="form.mobile" clearable/>
        </FormItem>
        <FormItem label="角色" prop="roleId" >
          <dict v-model="form.roleId" dict="priority" transfer></dict>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalVisible=false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>-->
  </div>
</template>

<script>
  // 根据你的实际请求api.js位置路径修改
/*  import { getUserList, addUser, editUser, deleteUser } from "@/api/index";
  import uploadPicInput from "@/views/my-components/xboot/upload-pic-input";
  import password from "@/views/my-components/xboot/set-password";
  import dict from "@/views/my-components/xboot/dict";
  import { shortcuts } from "@/libs/shortcuts";*/
  export default {
/*    name: "user",
    components: {
      uploadPicInput,
      password,
      dict,
    },
    data() {
      return {
        openSearch: true, // 显示搜索
        openTip: true, // 显示提示
        loading: true, // 表单加载状态
        modalType: 0, // 添加或编辑标识
        modalVisible: false, // 添加或编辑显示
        modalTitle: "", // 添加或编辑标题
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        searchForm: { // 搜索框初始化对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          sort: "createTime", // 默认排序字段
          order: "desc", // 默认排序方式
        },
        form: { // 添加或编辑表单对象初始化数据
          username: "",
          password: "",
          avatar: "",
          sex: "",
          email: "",
          mobile: "",
          roleId: "",
        },
        // 表单验证规则
        formValidate: {
          username: [{ required: true, message: "不能为空", trigger: "change" }],
          password: [{ required: true, message: "不能为空", trigger: "change" }],
          avatar: [{ required: true, message: "不能为空", trigger: "change" }],
          sex: [{ required: true, message: "不能为空", trigger: "change" }],
          email: [{ required: true, message: "不能为空", trigger: "change" }],
          mobile: [{ required: true, message: "不能为空", trigger: "change" }],
          roleId: [{ required: true, message: "不能为空", trigger: "change" }],
        },
        submitLoading: false, // 添加或编辑提交状态
        selectList: [], // 多选数据
        columns: [
          // 表头
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "用户名",
            key: "username",
            minWidth: 120,
            sortable: false,
          },
          {
            title: "密码",
            key: "password",
            minWidth: 120,
            sortable: false,
          },
          {
            title: "头像",
            key: "avatar",
            minWidth: 120,
            sortable: false,
          },
          {
            title: "性别",
            key: "sex",
            minWidth: 120,
            sortable: true,
          },
          {
            title: "邮箱",
            key: "email",
            minWidth: 120,
            sortable: false,
          },
          {
            title: "手机",
            key: "mobile",
            minWidth: 120,
            sortable: false,
          },
          {
            title: "角色",
            key: "roleId",
            minWidth: 120,
            sortable: true,
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            width: 150,
            render: (h, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.edit(params.row);
                      }
                    }
                  },
                  "编辑"
                ),
                h("Divider", {
                  props: {
                    type: "vertical",
                  },
                }),
                h(
                  "a",
                  {
                    on: {
                      click: () => {
                        this.remove(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        data: [], // 表单数据
        total: 0 // 表单数据总数
      };
    },
    methods: {
      init() {
        this.getDataList();
      },
      changePage(v) {
        this.searchForm.pageNumber = v;
        this.getDataList();
        this.clearSelectAll();
      },
      changePageSize(v) {
        this.searchForm.pageSize = v;
        this.getDataList();
      },
      handleSearch() {
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.getDataList();
      },
      handleReset() {
        this.$refs.searchForm.resetFields();
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        // 重新加载数据
        this.getDataList();
      },
      changeSort(e) {
        this.searchForm.sort = e.key;
        this.searchForm.order = e.order;
        if (e.order === "normal") {
          this.searchForm.order = "";
        }
        this.getDataList();
      },
      clearSelectAll() {
        this.$refs.table.selectAll(false);
      },
      changeSelect(e) {
        this.selectList = e;
      },
      dropDown() {
        if (this.drop) {
          this.dropDownContent = "展开";
          this.dropDownIcon = "ios-arrow-down";
        } else {
          this.dropDownContent = "收起";
          this.dropDownIcon = "ios-arrow-up";
        }
        this.drop = !this.drop;
      },
      getDataList() {
        this.loading = true;
        getUserList(this.searchForm).then(res => {
          this.loading = false;
          if (res.success) {
            this.data = res.result.content;
            this.total = res.result.totalElements;
            if (this.data.length == 0 && this.searchForm.pageNumber > 1) {
              this.searchForm.pageNumber -= 1;
              this.getDataList();
            }
          }
        });
      },
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            if (this.modalType === 0) {
              // 添加 避免编辑后传入id等数据 记得删除
              delete this.form.id;
              addUser(this.form).then(res => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("操作成功");
                  this.getDataList();
                  this.modalVisible = false;
                }
              });
            } else {
              // 编辑
              editUser(this.form).then(res => {
                this.submitLoading = false;
                if (res.success) {
                  this.$Message.success("操作成功");
                  this.getDataList();
                  this.modalVisible = false;
                }
              });
            }
          }
        });
      },
      add() {
        this.modalType = 0;
        this.modalTitle = "添加";
        this.$refs.form.resetFields();
        delete this.form.id;
        this.modalVisible = true;
      },
      edit(v) {
        this.modalType = 1;
        this.modalTitle = "编辑";
        this.$refs.form.resetFields();
        // 转换null为""
        for (let attr in v) {
          if (v[attr] === null) {
            v[attr] = "";
          }
        }
        let str = JSON.stringify(v);
        let data = JSON.parse(str);
        this.form = data;
        this.modalVisible = true;
      },
      remove(v) {
        this.$Modal.confirm({
          title: "确认删除",
          // 记得确认修改此处
          content: "您确认要删除该条数据?",
          loading: true,
          onOk: () => {
            // 删除
            deleteUser({ids: v.id}).then(res => {
              this.$Modal.remove();
              if (res.success) {
                this.$Message.success("操作成功");
                this.clearSelectAll();
                this.getDataList();
              }
            });
          }
        });
      },
      delAll() {
        if (this.selectList.length <= 0) {
          this.$Message.warning("您还未选择要删除的数据");
          return;
        }
        this.$Modal.confirm({
          title: "确认删除",
          content: "您确认要删除所选的 " + this.selectList.length + " 条数据?",
          loading: true,
          onOk: () => {
            let ids = "";
            this.selectList.forEach(function(e) {
              ids += e.id + ",";
            });
            ids = ids.substring(0, ids.length - 1);
            // 批量删除
            deleteUser({ids: ids}).then(res => {
              this.$Modal.remove();
              if (res.success) {
                this.$Message.success("操作成功");
                this.clearSelectAll();
                this.getDataList();
              }
            });
          }
        });
      }
    },
    mounted() {
      this.init();
    }*/
  };
</script>
<style lang="less">
  // 建议引入通用样式 具体路径自行修改 可删除下面样式代码
  // @import "@/styles/table-common.less";
  .search {
    .operation {
      margin-bottom: 2vh;
    }
    .select-count {
      font-weight: 600;
      color: #40a9ff;
    }
    .select-clear {
      margin-left: 10px;
    }
    .page {
      margin-top: 2vh;
    }
    .drop-down {
      margin-left: 5px;
    }
  }
</style>
