<template>
    <el-container :class="classObj">

        <el-aside  class="sidebar-container">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <el-menu
                        :collapse="isCollapse"
                        :show-timeout="200"
                        :default-active="$route.path"
                        :router="true"
                        class="el-menu"
                        mode="vertical"
                        text-color="#bfcbd9"
                        background-color="#304156"
                        active-text-color="#409EFF">

                    <template v-for="route in permission_routers">
                        <el-submenu :index="route.path" v-if="route.children && route.children.length && !route.hidden"
                                    :key="route.path">

                            <template slot="title">
                                <svg-icon :icon-class="route.meta.icon"></svg-icon>
                                {{route.meta.title}}
                            </template>
                            <el-menu-item v-for="(itemChild , index) in route.children" :index="itemChild.path"
                                          :key="index">
                                {{itemChild.meta.title}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item :index="route.path" :key="route.path" v-else-if="!route.hidden">
                            {{route.meta.title}}
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-scrollbar>

        </el-aside>
        <el-container>
            <el-header>
                <div class="left-button">
                    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
                </div>
                <div class="right-button">

                    <el-dropdown trigger="click" @command="handleCommand">
                          <span class="el-dropdown-link">
                            <i class="avatar"><img src="../assets/logo.png"></i><i
                                  class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(item) in levelList" :key="item.path">
                        {{item.meta.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Hamburger from "../components/Hamburger";

    export default {
        name: 'layout',
        components: {
            Hamburger
        },
        computed: {
            ...mapGetters([
                'permission_routers',
                'sidebar'
            ]),
            isCollapse() {
                return !this.sidebar.opened
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened
                }
            }
        },
        data() {
            return {
                ok: true,
                levelList: null
            }
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            handleCommand(command) {
                switch (command) {
                    case "logOut":
                        this.loginOut();
                        break;
                }
            },
            loginOut() {
                this.$store.dispatch("LogOut").then(() => {
                    location.reload();
                });
            },
            getBreadcrumb() {
                this.levelList = this.$route.matched.filter(item => item.path)
            }
        },
        created() {
            this.getBreadcrumb()
        },
        watch: {
            $route() {
                this.getBreadcrumb();
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    // 侧边栏
    .sidebar-container {
        transition: width 0.28s;
        width: 200px !important;
        height: 100%;
        position: fixed;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        overflow: hidden;
        //reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }
        .scrollbar-wrapper {
            overflow-x: hidden!important;
            .el-scrollbar__view {
                height: 100%;
            }
        }
        .el-scrollbar__bar.is-vertical{
            right: 0px;
        }
        .is-horizontal {
            display: none;
        }
        a {
            display: inline-block;
            width: 100%;
            overflow: hidden;
        }
        .svg-icon {
            margin-right: 16px;
        }
        .el-menu {
            border: none;
            height: 100%;
            width: 100% !important;
        }
        .is-active > .el-submenu__title{
            color: #f4f4f5!important;
        }
    }

    .el-container {

        .el-header, .el-footer {
            margin-left: 200px;
            background-color: #ffff;
            color: #333;
            text-align: center;
            line-height: 60px;
        }

        .el-aside {
            background-color: #304156;
            color: #333;
            line-height: 200px;
            .el-menu {
                border: none;
                height: 100%;
                width: 100% !important;
            }
            .svg-icon {
                margin-right: 16px;
            }
        }

        .el-main {
            margin-left: 200px;
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
            height: 100%;
            line-height: 160px;
        }

    }



    //隐藏侧边栏样式
    .hideSidebar {
        .sidebar-container {
            width: 36px !important;
        }
        .el-header, .el-footer,.el-main {
            margin-left: 36px;
        }
        .submenu-title-noDropdown {
            padding-left: 10px !important;
            position: relative;
            .el-tooltip {
                padding: 0 10px !important;
            }
        }
        .el-submenu {
            overflow: hidden;
            &>.el-submenu__title {
                padding-left: 10px !important;
                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }
        .el-menu--collapse {
            .el-submenu {
                &>.el-submenu__title {
                    &>span {
                        height: 0;
                        width: 0;
                        overflow: hidden;
                        visibility: hidden;
                        display: inline-block;
                    }
                }
            }
        }
    }
    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .right-button {
        float: right;
        .el-dropdown {
            cursor: pointer;
        }
    }
    .avatar {
        float: left;
        border-radius: 30px;
        width: 60px;
        height: 60px;
        img {
            border-radius: 30px;
            width: 60px;
            height: 60px;
        }
    }

    .left-button {
        float: left;
    }
    .el-scrollbar {
        height: 100%;
    }

</style>