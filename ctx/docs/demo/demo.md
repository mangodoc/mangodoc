## plantuml示例
``` plantuml
@startuml
应用进程 -> 系统内核: 1.发起IO系统调用，应用进程被阻塞
系统内核 -> 系统内核: 2.内核开始等待数据
系统内核 -> 应用进程: 3.系统内核等待到数据后copy到用户内存并返回
应用进程 -> 应用进程: 4.应用进程解除阻塞状态，继续运行业务逻辑
@enduml
```

## iconfont示例

### 基础用法
<i class="iconfont icon-code" style="color:red;"></i>
<i class="iconfont icon-log" style="color:green;font-size:20px;"></i>

### 图标列表
| 图标 | 类名 | 说明 |
|------|------|------|
| <i class="iconfont icon-code"></i> | icon-code | 代码 |
| <i class="iconfont icon-log"></i> | icon-log | 日志 |
| <i class="iconfont icon-home"></i> | icon-home | 首页 |
| <i class="iconfont icon-search"></i> | icon-search | 搜索 |
| <i class="iconfont icon-setting"></i> | icon-setting | 设置 |
| <i class="iconfont icon-user"></i> | icon-user | 用户 |
| <i class="iconfont icon-star"></i> | icon-star | 星标 |
| <i class="iconfont icon-heart"></i> | icon-heart | 收藏 |
| <i class="iconfont icon-link"></i> | icon-link | 链接 |
| <i class="iconfont icon-image"></i> | icon-image | 图片 |
| <i class="iconfont icon-file"></i> | icon-file | 文件 |
| <i class="iconfont icon-folder"></i> | icon-folder | 文件夹 |

### 自定义样式
<i class="iconfont icon-star" style="color:gold;font-size:24px;"></i>
<i class="iconfont icon-heart" style="color:pink;font-size:24px;"></i>
<i class="iconfont icon-home" style="color:#409EFF;font-size:24px;"></i>
<i class="iconfont icon-setting" style="color:#67C23A;font-size:24px;"></i>

### 箭头图标
<i class="iconfont icon-arrow-left"></i>
<i class="iconfont icon-arrow-right"></i>
<i class="iconfont icon-arrow-up"></i>
<i class="iconfont icon-arrow-down"></i>

### 状态图标
<i class="iconfont icon-success" style="color:#67C23A;"></i> 成功
<i class="iconfont icon-warning" style="color:#E6A23C;"></i> 警告
<i class="iconfont icon-error" style="color:#F56C6C;"></i> 错误
<i class="iconfont icon-info" style="color:#409EFF;"></i> 信息

## java代码高亮
``` java
import java.sql.*;

/**
 * @Author: mango
 * @Date: 2022/12/31 7:58 PM
 */
public class App {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        // 1. 加载驱动
        Class.forName("com.mysql.jdbc.Driver");
        // 2. 获取链接
        Connection connection = DriverManager.getConnection("jdbc:mysql://127.0.0.1:33306/url_function?useUnicode=true&characterEncoding=UTF-8",
                "root", "123456");
        // 3. 执行sql
        PreparedStatement preparedStatement = connection.prepareStatement("select * from t_user");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()){
            String userId = resultSet.getString("userId");
            String userName = resultSet.getString("userName");
            String email = resultSet.getString("email");
            String phone = resultSet.getString("phone");
            System.out.println("userId="+userId+",userName="+userName+",email="+email+",phone="+phone);
        }
        // 4. 关闭链接资源
        connection.close();
    }
}
```