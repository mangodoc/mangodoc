<el-result style="margin:0 auto;" title="mangodoc" sub-title="一个简单的doc文档构建器，采用微内核架构风格实现，使用插件机制来支持扩展。">
  <template slot="icon">
    <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-image>
  </template>
  <template slot="extra">
    <!-- <el-button type="default" size="medium">快速开始</el-button> -->
    <el-button type="primary" class="theme-color" size="medium" @click="handleClick">快速开始</el-button>
  </template>
</el-result>

<script type="text/javascript">
(
  {
    data(){
      return {
          
      }
    },
    methods: {
        handleClick() {
          window.location.href = "/#/README";
          window.location.reload();
        }
    }
  }
)
</script>