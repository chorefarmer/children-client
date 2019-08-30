import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);


/**
 *
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/Files',
      name: 'Files',
      component: Files
    }
  ]
})
 *
 * **/

const router = new Router({
  // 去除地址中的哈希值 #
  // mode: "history",
  routes: [
    {
      path: '/',
      name: HelloWorld,
      component: HelloWorld,
      children: [
        {
          path: '/Home',  // 1、新建档案 - 主页
          component: resolve => require(['@/components/Home'], resolve)
        },
        {
          path: '/geneMeasures',  // 新建档案 - 主页 - 新增基因检测
          component: resolve => require(['@/personal/geneMeasures'], resolve)
        },
        {
          path: '/baseInfo',  // 1）个人基本信息
          component: resolve => require(['@/personal/baseInfo'], resolve)
        },
        {
          path: '/symptom',  // 2）主诉与症状
          component: resolve => require(['@/personal/symptom'], resolve)
        },
        {
          path: '/laboratory',  // 3）实验室检测
          component: resolve => require(['@/personal/laboratory'], resolve)
        },
        {
          path: '/foodAvoid',  // 4）食物过敏
          component: resolve => require(['@/personal/foodAvoid'], resolve)
        },
        {
          path: '/eating',  // 5）膳食调查
          component: resolve => require(['@/personal/eating'], resolve)
        },
        {
          path: '/sportsExamine',  // 6）运动调查
          component: resolve => require(['@/personal/sportsExamine'], resolve)
        },
        {
          path: '/analysis',  // 7）系统分析
          component: resolve => require(['@/personal/analysis'], resolve),
          children: [
            {
              path: '/userInformation',  // 7 - 1 展示用户信息
              component: resolve => require(['@/personal/analysisModule/userInformation'], resolve)
            },
            {
              path: '/userOrganization',  // 7 - 2 人体成分
              component: resolve => require(['@/personal/analysisModule/userOrganization'], resolve)
            },
            {
              path: '/userGrowCurve',  // 7 - 3 - 0 生长曲线
              component: resolve => require(['@/personal/analysisModule/userGrowCurve'], resolve)
            },
            {
              path: '/userGrowCurveOfBmi',  // 7 - 3 - 1 BMI曲线
              component: resolve => require(['@/personal/analysisModule/userGrowCurveOfBmi'], resolve)
            },
            {
              path: '/userGrowCurveOfCircumference',  // 7 - 3 - 1 BMI曲线
              component: resolve => require(['@/personal/analysisModule/userGrowCurveOfCircumference'], resolve)
            },
            {
              path: '/dietGuidance',  // 7 - 4 膳食指导
              component: resolve => require(['@/personal/analysisModule/dietGuidance'], resolve)
            },
            {
              path: '/sportsSuggestion',  // 7 - 5 运动建议
              component: resolve => require(['@/personal/analysisModule/sportsSuggestion'], resolve)
            },
            {
              path: '/doctorSuggestion',  // 7 - 6 医生建议
              component: resolve => require(['@/personal/analysisModule/doctorSuggestion'], resolve)
            },
            {
              path: '/reportPreview',  // 7 - 7 报告预览
              component: resolve => require(['@/personal/analysisModule/reportPreview'], resolve)
            }
          ]
        },
        {
          path: '/bodyComposition',  // 8）体成分分析
          component: resolve => require(['@/personal/bodyComposition'], resolve)
        },
        {
          path: '/About',  //  2、检测管理
          name: 'searchTable',
          component: resolve => require(['@/components/About'], resolve)
        },
        {
          path:'/Contact',  // 3、备份与归档
          component: resolve => require(['@/components/Contact'], resolve)
        },
        {
          path:'/Files',  // 4、系统管理
          component: resolve => require(['@/components/Files'], resolve)
        }
      ]
    }
  ]
})

export default router;
