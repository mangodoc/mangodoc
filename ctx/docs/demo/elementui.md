<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

> 请参考[elementui](https://element.eleme.cn/#/zh-CN/component/layout)官方文档。

## 图标
<i class="el-icon-edit"></i>
<i class="el-icon-share"></i>
<i class="el-icon-delete"></i>
<el-button type="primary" icon="el-icon-search">搜索</el-button>

## 卡片
<el-row>
  <el-col :span="6" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 0 : 0">
    <el-card :body-style="{ padding: '0px' }">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        <div style="padding: 14px;">
        <span>好吃的汉堡</span>
        <div class="bottom clearfix">
            <time class="time">xx</time>
            <el-button type="text" class="button">操作按钮</el-button>
        </div>
        </div>
    </el-card>
</el-col>
</el-row>

## 链接
<el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
  <el-link type="primary">主要链接</el-link>
  <el-link type="success">成功链接</el-link>
  <el-link type="warning">警告链接</el-link>
  <el-link type="danger">危险链接</el-link>
  <el-link type="info">信息链接</el-link>

## 徽章
<el-badge :value="12" class="item">
  <el-button size="small">评论</el-button>
</el-badge>

<el-badge value="v1.0" class="item">
  测试
</el-badge>

## alert
<el-alert
    title="成功提示的文案"
    type="success"
    description="文字说明文字说明文字说明文字说明文字说明文字说明"
    show-icon
    :closable="tt">
</el-alert>

## 轮播
<el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4">
      <span>{{ item }}</span>
    </el-carousel-item>
  </el-carousel>

## 手风琴
<el-collapse v-model="activeNames" v-on:change="handleChange" accordion>
  <el-collapse-item title="一致性 Consistency" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title="反馈 Feedback" name="2">
    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
  </el-collapse-item>
  <el-collapse-item title="效率 Efficiency" name="3">
    <div>简化流程：设计简洁直观的操作流程；</div>
    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
  </el-collapse-item>
  <el-collapse-item title="可控 Controllability" name="4">
    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
  </el-collapse-item>
</el-collapse>

## tab选项卡
<el-tabs v-model="activeName" v-on:tab-click="handleClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>

## 时间线

<el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline>

## 步骤条

<el-steps :active="2" align-center>
  <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
  <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
</el-steps>

<script>
(
    {
        data(){
            return {
                "tt" : true,
                "activeNames": ['1'],
                "activeName": 'second',
                activities: [{
                    content: '支持使用图标',
                    timestamp: '2018-04-12 20:46',
                    size: 'large',
                    type: 'primary',
                    icon: 'el-icon-more'
                    }, {
                    content: '支持自定义颜色',
                    timestamp: '2018-04-03 20:46',
                    color: '#0bbd87'
                    }, {
                    content: '支持自定义尺寸',
                    timestamp: '2018-04-03 20:46',
                    size: 'large'
                    }, {
                    content: '默认样式的节点',
                    timestamp: '2018-04-03 20:46'
                }]
            }
        },
        methods: {
            handleChange(val) {
                console.log(val);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
)
</script>