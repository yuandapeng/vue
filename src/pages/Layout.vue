<template>
    <el-container :class="classObj">
        <el-aside  class="sidebar-container">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <el-menu
                        :collapse="isCollapse"
                        :show-timeout="200"
                        :default-active="$route.path"
                        class="el-menu"
                        mode="vertical"
                        text-color="#bfcbd9"
                        background-color="#304156"
                        active-text-color="#409EFF">
                       <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
                </el-menu>
            </el-scrollbar>
        </el-aside>
        <el-container>
            <el-header>
                <div class="left-button">
                    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
                    <Breadcrumb/>
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
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Hamburger from "../components/Hamburger";
    import SidebarItem from '../components/SidebarItem';
    import Breadcrumb from "../components/Breadcrumb";

    export default {
        name: 'layout',
        components: {
            Hamburger,
            SidebarItem,
            Breadcrumb
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
            }
        },

    }
</script>

<style rel="stylesheet/less" lang="less">
    // 侧边栏
    .sidebar-container {
        transition: width 0.28s;
        box-shadow: 2px 0 6px rgba(0,21,41,.35);
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
        min-height:100vh;
        .el-header{
            position: relative;
            box-shadow: 0 1px 4px rgba(0,21,41,.08);
            .hamburger-container{
                float:left;
                line-height: 60px;
            }
        }

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
            background-color: #f0f2f5;
            color: #333;
        }

    }


    .sidebar-container {
        .nest-menu .el-submenu > .el-submenu__title{
                background: #1f2d3d !important;
        }
        .el-submenu{
            .el-menu-item{
                background: #1f2d3d !important;
                &.is-active{
                    background:rgb(64, 158, 255) !important;
                    color:#fff !important;
                }
            }
        }
    }
    //隐藏侧边栏样式
    .hideSidebar {
        .sidebar-container {
            width: 36px !important;
        }
        .el-header, .el-footer,.el-main {
            margin-left: 36px!important;
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
    .warn-content{
        background: rgba(66,185,131,.1);
        border-radius: 2px;
        padding: 16px;
        padding: 1rem;
        line-height: 1.6rem;
        word-spacing: .05rem;
        a{
            color: #42b983;
            font-weight: 600;
        }
    }

    a, a:focus, a:hover {
        cursor: pointer;
        color: inherit;
        text-decoration: none;
    }

</style>